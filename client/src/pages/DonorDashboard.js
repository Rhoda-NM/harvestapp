import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DonorDashboard.css";

const Dashboard = ({ userId }) => {
  const [donations, setDonations] = useState([]);
  const [foodBanks, setFoodBanks] = useState([]);
  const [newDonation, setNewDonation] = useState("");

  useEffect(() => {
    // Fetch donations and available food banks
    const fetchData = async () => {
      try {
        const donationsResponse = await axios.get(`/api/donations/${userId}`);
        const foodBanksResponse = await axios.get("/api/foodBanks");
        setDonations(donationsResponse.data);
        setFoodBanks(foodBanksResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handlePostDonation = async () => {
    try {
      await axios.post("/api/donations", { userId, donation: newDonation });
      setDonations([...donations, { donation: newDonation }]); // Optimistic update
      setNewDonation("");
    } catch (error) {
      console.error("Error posting donation:", error);
    }
  };

  const handleDeleteDonation = async (donationId) => {
    try {
      await axios.delete(`/api/donations/${donationId}`);
      setDonations(donations.filter((donation) => donation.id !== donationId)); // Optimistic update
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>My Donations</h2>
        <ul>
          {donations.map((donation) => (
            <li key={donation.id}>
              {donation.donation}
              <button onClick={() => handleDeleteDonation(donation.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <textarea
          value={newDonation}
          onChange={(e) => setNewDonation(e.target.value)}
          placeholder="Post a new donation"
        />
        <button onClick={handlePostDonation}>Post Donation</button>
      </div>
      <div>
        <h2>Available Food Banks</h2>
        <ul>
          {foodBanks.map((foodBank) => (
            <li key={foodBank.id}>{foodBank.name}</li>
          ))}
        </ul>
      </div>
      <Link to="/profile">Go to Profile</Link>
    </div>
  );
};

export default Dashboard;
