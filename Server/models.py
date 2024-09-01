from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db, bcrypt
from datetime import datetime
import re

class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages'
    serialize_rules = ('-sender', '-recipient')

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('donors.id'), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey('food_banks.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now)
    read = db.Column(db.Boolean, default=False)

    sender = db.relationship('Donor', foreign_keys=[sender_id], back_populates='sent_messages')
    recipient = db.relationship('FoodBank', foreign_keys=[recipient_id], back_populates='received_messages')

    def __repr__(self):
        return f'<Message {self.id}>'

class Donor(db.Model, SerializerMixin):
    __tablename__ = 'donors'
    serialize_rules = ('-donations.donor', '-_password_hash', '-sent_messages', '-feedback')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    name = db.Column(db.String(128), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), default='donor')

    #donations = db.relationship('Donation', back_populates='donor', lazy='dynamic', cascade='all, delete-orphan')
    sent_messages = db.relationship('Message', foreign_keys=[Message.sender_id], back_populates='sender', order_by=Message.timestamp.desc())
    feedback = db.relationship('Feedback', back_populates='donor', cascade='all, delete-orphan')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        if isinstance(self._password_hash, str):
            self._password_hash = self._password_hash.encode('utf-8')
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    @validates('username', 'email')
    def validate_fields(self, key, value):
        if not value or not value.strip():
            raise ValueError(f"{key} cannot be empty")
        if key == 'email':
            pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
            if not re.match(pattern, value):
                raise ValueError("Invalid email format")
        return value.strip()

    def get_unread_messages(self):
        return Message.query.filter(Message.recipient_id == self.id, Message.read == False).order_by(Message.timestamp.desc()).all()

    def __repr__(self):
        return f"<Donor {self.id}: {self.username}>"

class FoodBank(db.Model, SerializerMixin):
    __tablename__ = 'food_banks'
    serialize_rules = ('-donations.foodBank', '-_password_hash', '-received_messages', '-feedback')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(128), unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    description = db.Column(db.Text)
    image = db.Column(db.String(255))
    location = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), default='food_bank')

    #donations = db.relationship('Donation', back_populates='foodBank', lazy='dynamic', cascade='all, delete-orphan')
    received_messages = db.relationship('Message', foreign_keys=[Message.recipient_id], back_populates='recipient', order_by=Message.timestamp.desc())
    feedback = db.relationship('Feedback', back_populates='foodBank', cascade='all, delete-orphan')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        if isinstance(self._password_hash, str):
            self._password_hash = self._password_hash.encode('utf-8')
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    @validates('username', 'email')
    def validate_fields(self, key, value):
        if not value or not value.strip():
            raise ValueError(f"{key} cannot be empty")
        if key == 'email':
            pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
            if not re.match(pattern, value):
                raise ValueError("Invalid email format")
        return value.strip()

    def get_unread_messages(self):
        return Message.query.filter(Message.sender_id == self.id, Message.read == False).order_by(Message.timestamp.desc()).all()

    def __repr__(self):
        return f"<FoodBank {self.id}: {self.username}>"

class Donation(db.Model, SerializerMixin):
    __tablename__ = 'donations'
    serialize_rules = ('-donor', '-foodBank')

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Float, nullable=True)
    date = db.Column(db.DateTime, default=datetime.now)
    name = db.Column(db.String(128), nullable=False)
    type = db.Column(db.Text)
    image = db.Column(db.String(255))

    def __repr__(self):
        return f"<Donation {self.id}: {self.name}>"

class Feedback(db.Model, SerializerMixin):
    __tablename__ = 'feedback'
    serialize_rules = ('-donor', '-foodBank')

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now)
    donor_id = db.Column(db.Integer, db.ForeignKey('donors.id'), nullable=False)
    foodBank_id = db.Column(db.Integer, db.ForeignKey('food_banks.id'), nullable=False)

    donor = db.relationship('Donor', back_populates='feedback')
    foodBank = db.relationship('FoodBank', back_populates='feedback')

    def __repr__(self):
        return f'<Feedback {self.id}>'

class Community(db.Model, SerializerMixin):
    __tablename__ = 'communities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    members = db.Column(db.Integer, nullable=False)
    impact_stories = db.Column(db.Text, nullable=False)
    events = db.Column(db.Text, nullable=False)
    banner = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False, default='General')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "members": self.members,
            "impactStories": self.impact_stories.replace(';', '').split(';;') if self.impact_stories else [],
            "events": self.events.replace(';', '').split(';;') if self.events else [],
            "banner": self.banner,
            "category": self.category
        }

    def __repr__(self):
        return f"<Community {self.id}: {self.name}>"