import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DonorDashboard.css";
import NewDonationForm from "../components/NewDonation";
import { useNavigate } from "react-router-dom";


const Dashboard = ({ userId }) => {
  const [donations, setDonations] = useState([]);
  const [foodBanks, setFoodBanks] = useState([]);
  
  useEffect(() => {
    // Fetch donations and available food banks
    const fetchData = async () => {
      try {
        const donationsResponse = await axios.get(`/donations/${userId}`);
        const foodBanksResponse = await axios.get("/foodBanks");
        setDonations(donationsResponse.data);
        setFoodBanks(foodBanksResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const [showForm, setShowForm] = useState(false);

  const handlePostDonation = () => {
    setShowForm(!showForm); // Toggle the form visibility
  };
  const handleDeleteDonation = async (donationId) => {
    try {
      await axios.delete(`/donations/${donationId}`);
      setDonations(donations.filter((donation) => donation.id !== donationId)); // Optimistic update
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
      <button onClick={handlePostDonation}>
        {showForm ? 'Hide Donation Form' : 'Post Donation'}
      </button>
      {showForm && <NewDonationForm />}
    </div>
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
