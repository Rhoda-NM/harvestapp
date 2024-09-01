import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DonorDashboard.css";
import NewDonationForm from "../components/NewDonation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FoodBanksList from "../components/FoodBankList";
import Donations from "../components/Donations";

const Dashboard = ({ userId }) => {
  const [donations, setDonations] = useState([]);
  const [foodBanks, setFoodBanks] = useState([]);
  const [activeSection, setActiveSection] = useState("donations"); // Default to 'donations'
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
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
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <aside className="sidebar">
          <h2>Dashboard</h2>
          <button onClick={() => setActiveSection("donations")}>
            My Donations
          </button><br/>
          <button onClick={() => setActiveSection("foodBanks")}>
            Available Food Banks
          </button><br/>
          <button onClick={handlePostDonation}>
            {showForm ? 'Hide Donation Form' : 'Post Donation'}
          </button>
          {/* Add more buttons or links as needed */}
        </aside>
        <main className="main-content">
          {showForm && <NewDonationForm />}
          {activeSection === "donations" && (
            <div>
              <h2>My Donations</h2>
              <Donations />
            </div>
          )}
          {activeSection === "foodBanks" && (
            <div>
              <h2>Available Food Banks</h2>
              <FoodBanksList />
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
