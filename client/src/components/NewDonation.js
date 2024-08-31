import React, { useState } from 'react';

const CreateDonation = () => {
    const [donorId, setDonorId] = useState('');
    const [foodBankId, setFoodBankId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const donation = {
            donor_id: parseInt(donorId),
            foodBank_id: parseInt(foodBankId),
            quantity: parseFloat(quantity),
            date,
            name,
            type,
            image,
        };

        try {
            const response = await fetch('/donations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(donation),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
            setSuccess(true);
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
            setSuccess(false);
        }
    };

    return (
        <div>
            <h1>Create a New Donation</h1>
            {success && <p style={{ color: 'green' }}>Donation created successfully!</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="donorId">Donor ID:</label>
                    <input
                        type="number"
                        id="donorId"
                        value={donorId}
                        onChange={(e) => setDonorId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="foodBankId">Food Bank ID:</label>
                    <input
                        type="number"
                        id="foodBankId"
                        value={foodBankId}
                        onChange={(e) => setFoodBankId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        step="0.01"
                    />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="datetime-local"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="type">Type:</label>
                    <input
                        type="text"
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="text"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateDonation;
