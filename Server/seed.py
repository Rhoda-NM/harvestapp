from datetime import datetime
from faker import Faker
from config import db, bcrypt, app  # Adjust the import based on your application structure
from models import Donor, FoodBank, Donation, Message, Feedback, Community

fake = Faker()

def hash_password(password):
    return bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')

def seed_data():
    # Create some sample donors
    donors = []
    for _ in range(5):
        password = fake.password()  # Generate a random password
        donor = Donor(
            username=fake.user_name(),
            email=fake.email(),
            name=fake.name(),
            location=fake.city(),
            _password_hash=hash_password(password)  # Hash the password
        )
        donors.append(donor)

    # Create some sample food banks
    food_banks = []
    for _ in range(5):
        password = fake.password()  # Generate a random password
        food_bank = FoodBank(
            username=fake.user_name(),
            email=fake.email(),
            name=fake.company(),
            description=fake.text(),
            location=fake.city(),
            image=fake.image_url(),
            _password_hash=hash_password(password)  # Hash the password
        )
        food_banks.append(food_bank)

    # Create some sample donations
    donations = []
    for _ in range(5):
        donation = Donation(
            quantity=fake.random_number(digits=3),
            date=fake.date_time_this_year(),
            name=fake.word(),
            type=fake.word(),
            image=fake.image_url()
        )
        donations.append(donation)

    # Create some sample messages
    messages = []
    for donor in donors:
        for food_bank in food_banks:
            message = Message(
                sender=donor,
                recipient=food_bank,
                content=fake.sentence(),
                timestamp=fake.date_time_this_year(),
                read=fake.boolean()
            )
            messages.append(message)

    # Create some sample feedback
    feedbacks = []
    for donor in donors:
        for food_bank in food_banks:
            feedback = Feedback(
                content=fake.text(),
                donor=donor,
                foodBank=food_bank,
                timestamp=fake.date_time_this_year()
            )
            feedbacks.append(feedback)

    # Create some sample communities
    communities = []
    for _ in range(3):
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

    # Add and commit to the database
    with db.session.begin():
        db.session.add_all(donors + food_banks + donations + messages + feedbacks + communities)

if __name__ == '__main__':
    app.app_context().push()  # Push app context to interact with the database
    seed_data()
    print("Database seeded successfully!")
