import React, { useEffect, useState } from "react";
import DonationsCard from "./DonationsCard";
import './Donations.css';

function Donations() {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedQuantity, setUpdatedQuantity] = useState("");
  const [updatedType, setUpdatedType] = useState("");
  const [updateImage, setUpdateImage] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/donations");
        const allDonations = await response.json();

        if (Array.isArray(allDonations)) {
          setDonations(allDonations);
        } else {
          setDonations([allDonations]);
        }
      } catch (err) {
        console.log("Fetch donations error: ", err);
      }
    };

    fetchDonations();
  }, []);

  const handleSelectDonation = (donation) => {
    setSelectedDonation(donation);
    setUpdatedName(donation.name);
    setUpdatedQuantity(donation.quantity);
    setUpdatedType(donation.type);
    setUpdateImage(donation.image);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (selectedDonation) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/donations/${selectedDonation.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: updatedName,
            quantity: updatedQuantity,
            type: updatedType,
            image: updateImage,
          }),
        });

        if (response.ok) {
          const updatedDonation = await response.json();
          setDonations((prevDonations) =>
            prevDonations.map((donation) =>
              donation.id === updatedDonation.id ? updatedDonation : donation
            )
          );
          setSelectedDonation(null);
        } else {
          console.error("Failed to update donation");
        }
      } catch (err) {
        console.error("Update donation error: ", err);
      }
    }
  };

  const handleDelete = async (donationId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/donations/${donationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDonations((prevDonations) =>
          prevDonations.filter((donation) => donation.id !== donationId)
        );
        setSelectedDonation(null);
      } else {
        console.error("Failed to delete donation");
      }
    } catch (err) {
      console.error("Delete donation error: ", err);
    }
  };

  return (
    <div>
      <div className="donations-container">
        {donations.map((donation) => (
          <DonationsCard
            key={donation.id}
            id={donation.id}
            name={donation.name}
            quantity={donation.quantity}
            type={donation.type}
            image={donation.image}
            onEdit={() => handleSelectDonation(donation)}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {selectedDonation && (
        <div className="update-form">
          <h2>Update Donation</h2>
          <form onSubmit={handleUpdate}>
            <div>
              <label>
                Name:
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Quantity:
                <input
                  type="number"
                  value={updatedQuantity}
                  onChange={(e) => setUpdatedQuantity(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Type:
                <input
                  type="text"
                  value={updatedType}
                  onChange={(e) => setUpdatedType(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Image URL:
                <input
                  type="text"
                  value={updateImage}
                  onChange={(e) => setUpdateImage(e.target.value)}
                />
              </label>
            </div>
            <button type="submit">Update</button>
            <button type="button" onClick={() => handleDelete(selectedDonation.id)}>Delete</button>
            <button type="button" onClick={() => setSelectedDonation(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Donations;
