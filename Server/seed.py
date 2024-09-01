from app import app
from models import db, Donor, FoodBank, Message, Donation, Feedback, Community
from datetime import datetime, timedelta
import random

def seed_database():
    with app.app_context():
        print("Clearing existing data...")
        db.drop_all()
        db.create_all()

        print("Seeding donors...")
        donors = [
            Donor(username="john_doe", email="john@example.com", name="John Doe", location="New York", role="donor"),
            Donor(username="jane_smith", email="jane@example.com", name="Jane Smith", location="Los Angeles", role="donor"),
        ]
        for donor in donors:
            donor.password_hash = "password123"
        db.session.add_all(donors)

        print("Seeding food banks...")
        food_banks = [
            FoodBank(username="nycfoodbank", email="info@nycfoodbank.org", name="NYC Food Bank", description="Serving NYC", location="New York", role="food_bank"),
            FoodBank(username="lafoodbank", email="info@lafoodbank.org", name="LA Food Bank", description="Serving LA", location="Los Angeles", role="food_bank"),
        ]
        for food_bank in food_banks:
            food_bank.password_hash = "password123"
        db.session.add_all(food_banks)

        print("Seeding messages...")
        messages = [
            Message(sender_id=1, recipient_id=1, content="Hello, I'd like to donate."),
            Message(sender_id=2, recipient_id=2, content="When are you open?"),
        ]
        db.session.add_all(messages)

        print("Seeding donations...")
        donations = [
            Donation(quantity=10, name="Canned Soup", type="Non-perishable"),
            Donation(quantity=5, name="Rice", type="Grains"),
        ]
        db.session.add_all(donations)

        print("Seeding feedback...")
        feedback = [
            Feedback(content="Great experience!", donor_id=1, foodBank_id=1),
            Feedback(content="Very helpful staff.", donor_id=2, foodBank_id=2),
        ]
        db.session.add_all(feedback)

        print("Seeding communities...")
        communities = [
            Community(name="NYC Food Helpers", description="Helping the hungry in NYC", members=100, 
                      impact_stories="Fed 1000 families;;Organized 5 food drives", 
                      events="Monthly meetup;;Annual fundraiser",
                      banner="nyc_banner.jpg", category="Urban"),
            Community(name="LA Food Warriors", description="Fighting hunger in LA", members=80, 
                      impact_stories="Distributed 5000 meals;;Partnered with 10 local restaurants", 
                      events="Weekly volunteer session;;Quarterly strategy meeting",
                      banner="la_banner.jpg", category="Metropolitan"),
        ]
        db.session.add_all(communities)

        db.session.commit()
        print("Seeding completed successfully!")

if __name__ == "__main__":
    seed_database()