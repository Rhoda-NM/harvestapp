from faker import Faker
from config import app, db
from models import Donor, FoodBank, Donation, Message, Feedback, Community
from datetime import datetime

fake = Faker()

def create_donors(num=5):
    donors = []
    for _ in range(num):
        donor = Donor(
            username=fake.user_name(),
            email=fake.email(),
            name=fake.name(),
            location=fake.city(),
            role='donor'  # Assuming role defaults to 'donor'
        )
        donor.password_hash = 'password123'  # Set password using the setter
        donors.append(donor)
    db.session.bulk_save_objects(donors)
    db.session.commit()

def create_food_banks(num=5):
    food_banks = []
    for _ in range(num):
        food_bank = FoodBank(
            username=fake.user_name(),
            email=fake.email(),
            name=fake.company(),
            description=fake.text(),
            image=fake.image_url(),
            location=fake.city(),
            role='food_bank'  # Assuming role defaults to 'food_bank'
        )
        food_bank.password_hash = 'password123'  # Set password using the setter
        food_banks.append(food_bank)
    db.session.bulk_save_objects(food_banks)
    db.session.commit()

def create_donations(num=6):
    donors = Donor.query.all()
    food_banks = FoodBank.query.all()
    donations = []

    # Define possible farm product types
    product_types = [
        'Vegetable', 'Fruit', 'Grain', 'Dairy', 'Meat', 'Poultry', 'Eggs'
    ]

    for _ in range(num):
        donation = Donation(
            donor_id=fake.random_element(donors).id,
            foodBank_id=fake.random_element(food_banks).id,
            quantity=fake.random_number(digits=4),  # Quantity in units
            date=fake.date_time_this_year(),
            name=fake.word().capitalize(),  # Capitalize for proper noun
            type=fake.random_element(product_types),  # Randomly select from defined product types
            image=fake.image_url(width=400, height=300)  # Image URL with specific dimensions
        )
        donations.append(donation)
    db.session.bulk_save_objects(donations)
    db.session.commit()

def create_messages(num=5):
    donors = Donor.query.all()
    food_banks = FoodBank.query.all()
    messages = []
    for _ in range(num):
        message = Message(
            sender_id=fake.random_element(donors).id,
            recipient_id=fake.random_element(food_banks).id,
            content=fake.text(),
            timestamp=fake.date_time_this_year(),
            read=fake.boolean()
        )
        messages.append(message)
    db.session.bulk_save_objects(messages)
    db.session.commit()

def create_feedback(num=10):
    donors = Donor.query.all()
    food_banks = FoodBank.query.all()
    feedbacks = []
    for _ in range(num):
        feedback = Feedback(
            content=fake.text(),
            timestamp=fake.date_time_this_year(),
            donor_id=fake.random_element(donors).id,
            foodBank_id=fake.random_element(food_banks).id
        )
        feedbacks.append(feedback)
    db.session.bulk_save_objects(feedbacks)
    db.session.commit()

def create_communities(num=3):
    communities = []
    for _ in range(num):
        community = Community(
            name=fake.word(),
            description=fake.text(),
            members=fake.random_number(digits=3),
            impact_stories=fake.text(),
            events=fake.text(),
            banner=fake.image_url(),
            category=fake.word()
        )
        communities.append(community)
    db.session.bulk_save_objects(communities)
    db.session.commit()

def seed_database():
    with app.app_context():
        db.create_all()
        create_donors()
        create_food_banks()
        create_donations()
        create_messages()
        create_feedback()
        create_communities()
        print("Database seeded!")

if __name__ == '__main__':
    seed_database()