from models import db
from functools import wraps
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request
from flask import Flask, make_response,jsonify,session,request, current_app, jsonify
from flask_restful import Api, Resource, reqparse
from sqlalchemy.exc import IntegrityError
import bcrypt
from datetime import datetime, timedelta
from flask_socketio import SocketIO, emit, join_room, leave_room
from requests.auth import HTTPBasicAuth
import base64



from config import app,db,api
from models import db,Donor,FoodBank, Feedback, Message, Community, Donation



class Index(Resource):
    def get(self):
        return jsonify({"Message": "Welcome to HarvestShare API"})

# Views go here!
class checkSession(Resource):
    @jwt_required()
    def get(self):
        claims = get_jwt_identity()
        if claims:
            return {"user is logged in": "True"},200
        else:
            return {"message": "Invalid token user not logged in"}, 401
        
from models import db, Message, Donor, Donation, FoodBank,Feedback, Community

def donor_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt_identity()
            if claims['role'] != 'donor':
                return jsonify(msg='Donors only!'), 403
            else:
                return fn(*args, **kwargs)
        return decorator
    return wrapper

def foodBank_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt_identity()
            if claims['role'] != 'foodBank':
                return jsonify(msg='foodBanks only!'), 403
            else:
                return fn(*args, **kwargs)
        return decorator
    return wrapper

def donor_or_foodBank_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt_identity()
            if claims['role'] not in ['donor', 'foodBank']:
                return jsonify(msg='Unauthorized'), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper

from datetime import timedelta

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return {'message': 'Username and password are required'}, 400

        donor = Donor.query.filter_by(username=username).first()
        foodBank = FoodBank.query.filter_by(username=username).first()
        

        if donor:
            if donor.authenticate(password):
                access_token = create_access_token(
                    identity={'id': donor.id, 'role': 'donor'},
                    expires_delta=timedelta(days=4)
                )
                session['id'] = donor.id
                return {'access_token': access_token, 'role': 'donor', 'id': donor.id}, 200
            else:
                return {'message': 'Invalid password for donor'}, 401
        elif foodBank:
            if foodBank.authenticate(password):
                access_token = create_access_token(
                    identity={'id': foodBank.id, 'role': 'foodBank'},
                    expires_delta=timedelta(days=4)
                )
                session['id'] = foodBank.id
                return {'access_token': access_token, 'role': 'foodBank', 'id': foodBank.id}, 200
            else:
                return {'message': 'Invalid password for foodBank'}, 401    
        else:
            return {'message': 'User not found'}, 404
        
from flask_restful import Resource
from flask import request, jsonify
from datetime import datetime, timedelta

class DonorResource(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('username', type=str, required=True, help='Username is required')
        self.reqparse.add_argument('email', type=str, required=True, help='Email is required')
        self.reqparse.add_argument('password', type=str, required=True, help='Password is required')
        self.reqparse.add_argument('name', type=str, required=True, help='Name is required')
        self.reqparse.add_argument('location', type=str, required=True, help='Location is required')
        super(DonorResource, self).__init__()

    def get(self, donor_id=None):
        if donor_id:
            donor = Donor.query.get_or_404(donor_id)
            return donor.to_dict(), 200
        else:
            donors = Donor.query.all()
            return [donor.to_dict() for donor in donors], 200

    def post(self):
        args = self.reqparse.parse_args()
        
        if Donor.query.filter_by(username=args['username']).first():
            return {'message': 'Username already exists'}, 400
        if Donor.query.filter_by(email=args['email']).first():
            return {'message': 'Email already exists'}, 400

        new_donor = Donor(
            username=args['username'],
            email=args['email'],
            name=args['name'],
            location=args['location']
        )
        new_donor.password_hash = args['password']  # This will use the setter method to hash the password

        db.session.add(new_donor)
        try:
            db.session.commit()
            return new_donor.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'message': 'An error occurred while creating the donor', 'error': str(e)}, 500

    @jwt_required()
    def delete(self, donor_id):
        claims = get_jwt_identity()
        if claims['role'] != 'admin':
            return {'message': 'Only admins can delete donors'}, 403

        donor = Donor.query.get_or_404(donor_id)
        db.session.delete(donor)
        try:
            db.session.commit()
            return {'message': 'Donor deleted successfully'}, 200
        except Exception as e:
            db.session.rollback()
            return {'message': 'An error occurred while deleting the donor', 'error': str(e)}, 500

from flask import request, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from flask import request, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

class DonationsResource(Resource):
    def get(self, donation_id=None):
        """
        Retrieve one or all donations.
        
        :param donation_id: Optional ID of a specific donation to retrieve
        :return: JSON response containing donation(s) information
        """
        if donation_id:
            donation = Donation.query.get(donation_id)
            if donation:
                return jsonify(donation.to_dict())
            else:
                return {"error": f"Donation with ID {donation_id} not found"}, 404
        else:
            donations = Donation.query.all()
            return jsonify([d.to_dict() for d in donations])

    def post(self):
        """
        Create a new donation.
        
        :return: JSON response with the newly created donation's ID
        """
        data = request.json
        try:
            donation = Donation(
                quantity=data.get('quantity'),
                name=data['name'],
                type=data.get('type'),
                image=data.get('image')
            )
            db.session.add(donation)
            db.session.commit()
            return {"id": donation.id}, 201
        except KeyError as e:
            return {"error": f"Missing required field: {e}"}, 400
        except IntegrityError:
            db.session.rollback()
            return {"error": "Integrity error occurred"}, 500

    def put(self, donation_id):
        """
        Update an existing donation.
        
        :param donation_id: ID of the donation to update
        :return: JSON response indicating success or failure
        """
        donation = Donation.query.get(donation_id)
        if not donation:
            return {"error": f"Donation with ID {donation_id} not found"}, 404
        
        data = request.json
        donation.quantity = data.get('quantity', donation.quantity)
        donation.name = data.get('name', donation.name)
        donation.type = data.get('type', donation.type)
        donation.image = data.get('image', donation.image)
        
        try:
            db.session.commit()
            return jsonify({"message": "Donation updated successfully"})
        except IntegrityError:
            db.session.rollback()
            return {"error": "Integrity error occurred"}, 500

    def delete(self, donation_id):
        """
        Delete a donation.
        
        :param donation_id: ID of the donation to delete
        :return: JSON response indicating success or failure
        """
        donation = Donation.query.get(donation_id)
        if not donation:
            return {"error": f"Donation with ID {donation_id} not found"}, 404
        
        try:
            db.session.delete(donation)
            db.session.commit()
            return jsonify({"message": "Donation deleted successfully"})
        except IntegrityError:
            db.session.rollback()
            return {"error": "Integrity error occurred"}, 500


        
class FoodBankResource(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('username', type=str, required=True, help='Username is required')
        self.reqparse.add_argument('email', type=str, required=True, help='Email is required')
        self.reqparse.add_argument('password', type=str, required=True, help='Password is required')
        self.reqparse.add_argument('name', type=str, required=True, help='Name is required')
        self.reqparse.add_argument('description', type=str)
        self.reqparse.add_argument('image', type=str)
        self.reqparse.add_argument('location', type=str, required=True, help='Location is required')
        super(FoodBankResource, self).__init__()

    def get(self, foodbank_id=None):
        if foodbank_id:
            foodbank = FoodBank.query.get_or_404(foodbank_id)
            return foodbank.to_dict(), 200
        else:
            foodbanks = FoodBank.query.all()
            return [foodbank.to_dict() for foodbank in foodbanks], 200

    def post(self):
        args = self.reqparse.parse_args()
        
        if FoodBank.query.filter_by(username=args['username']).first():
            return {'message': 'Username already exists'}, 400
        if FoodBank.query.filter_by(email=args['email']).first():
            return {'message': 'Email already exists'}, 400
        if FoodBank.query.filter_by(name=args['name']).first():
            return {'message': 'Food bank name already exists'}, 400

        new_foodbank = FoodBank(
            username=args['username'],
            email=args['email'],
            name=args['name'],
            description=args.get('description'),
            image=args.get('image'),
            location=args['location']
        )
        new_foodbank.password_hash = args['password']  # This will use the setter method to hash the password

        db.session.add(new_foodbank)
        try:
            db.session.commit()
            return new_foodbank.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'message': 'An error occurred while creating the food bank', 'error': str(e)}, 500

    @jwt_required()
    def delete(self, foodbank_id):
        claims = get_jwt_identity()
        if claims['role'] != 'admin':
            return {'message': 'Only admins can delete food banks'}, 403

        foodbank = FoodBank.query.get_or_404(foodbank_id)
        db.session.delete(foodbank)
        try:
            db.session.commit()
            return {'message': 'Food bank deleted successfully'}, 200
        except Exception as e:
            db.session.rollback()
            return {'message': 'An error occurred while deleting the food bank', 'error': str(e)}, 500



class ConversationResource(Resource):
    @jwt_required()
    def post(self,user_id):
        claims = get_jwt_identity()
        user_id = claims['id']
        user_type = claims['role']
        data = request.json
        
        if user_type == 'donor':
            sender = Donor.query.get_or_404(user_id)
            recipient = FoodBank.query.get_or_404(data['recipient_id'])
        elif user_type == 'foodBank':
            sender = FoodBank.query.get_or_404(user_id)
            recipient = Donor.query.get_or_404(data['recipient_id'])
        else:
            return {'error': 'User type not recognized'}, 400

        message = Message(sender=sender, recipient=recipient, content=data['content'])
        db.session.add(message)
        db.session.commit()
        return {'message': 'Conversation started successfully'}, 200

class MessageReadResource(Resource):
    @jwt_required()
    def post(self, message_id):
        claims = get_jwt_identity()
        user_id = claims['id']
        
        message = Message.query.get_or_404(message_id)
        
        # Check if the user is the recipient of the message
        if (claims['role'] == 'donor' and message.recipient_id == user_id) or \
           (claims['role'] == 'foodBank' and message.sender_id == user_id):
            message.read = True
            db.session.commit()
            return {'message': 'Message marked as read'}, 200
        else:
            return {'error': 'Unauthorized to mark this message as read'}, 403

class FeedbackResource(Resource):
    @jwt_required()
    def post(self,user_id):
        claims = get_jwt_identity()
        user_id = claims['id']
        user_type = claims['role']
        data = request.json
        
        if user_type == 'donor':
            user = Donor.query.get_or_404(user_id)
        elif user_type == 'foodBank':
            user = FoodBank.query.get_or_404(user_id)
        else:
            return {'error': 'User type not recognized'}, 400

        feedback = Feedback(content=data['content'], donor_id=user.id, foodBank_id=data.get('foodBank_id'))
        db.session.add(feedback)
        db.session.commit()
        return {'message': 'Feedback submitted successfully'}, 200

    @jwt_required()
    def get(self):
        claims = get_jwt_identity()
        if claims['role'] != 'foodBank':
            return {'error': 'Only food banks can view feedback'}, 403
        
        feedbacks = Feedback.query.all()
        return [fb.to_dict() for fb in feedbacks], 200



 # Routes
api.add_resource(Index, '/')
api.add_resource(Login, '/login'); 
api.add_resource(DonorResource, '/donors', '/donors/<int:donor_id>')
api.add_resource(DonationsResource, '/donations', '/donations/<int:donation_id>', '/donations/donor/<int:donor_id>')
api.add_resource(FoodBankResource, '/foodbanks', '/foodbanks/<int:foodbank_id>')  
api.add_resource(ConversationResource, '/start-conversation/<int:user_id>')
api.add_resource(MessageReadResource, '/mark-message-read/<int:message_id>')
api.add_resource(FeedbackResource, '/feedback/<string:user_type>', '/feedback')


if __name__ == '__main__':
    app.run(debug=True)
