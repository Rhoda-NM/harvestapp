import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DonorDashboard.css";
import NewDonationForm from "../components/NewDonation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FoodBanksList from "../components/FoodBankList";
import Donations from "../components/Donations";
import ConversationView from "../components/ConversationView";

const Dashboard = ({ userId }) => {
  const [donations, setDonations] = useState([]);
  const [foodBanks, setFoodBanks] = useState([]);
  const [activeSection, setActiveSection] = useState("donations");
  const [showForm, setShowForm] = useState(false);
  const [selectedFoodBank, setSelectedFoodBank] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donationsResponse = await axios.get(`/donations/${userId}`);
        const foodBanksResponse = await axios.get("/foodBanks");
        const messagesResponse = await axios.get(`/messages/${userId}`);
        
        setDonations(donationsResponse.data);
        setFoodBanks(foodBanksResponse.data);
        setMessages(messagesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handlePostDonation = () => {
    setShowForm(!showForm);
  };

  const handleDeleteDonation = async (donationId) => {
    try {
      await axios.delete(`/donations/${donationId}`);
      setDonations(donations.filter((donation) => donation.id !== donationId));
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };

  const handleFoodBankSelect = (foodBank) => {
    setSelectedFoodBank(foodBank);
    setActiveSection("conversation");
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
          {selectedFoodBank && (
            <button onClick={() => setActiveSection("conversation")}>
              Message {selectedFoodBank.name}
            </button>
          )}
        </aside>
        <main className="main-content">
          {showForm && <NewDonationForm />}
          {activeSection === "donations" && (
            <div>
              <h2>My Donations</h2>
              <Donations donations={donations} onDelete={handleDeleteDonation} />
            </div>
          )}
          {activeSection === "foodBanks" && (
            <div>
              <h2>Available Food Banks</h2>
              <FoodBanksList foodBanks={foodBanks} onSelect={handleFoodBankSelect} />
            </div>
          )}
          {activeSection === "conversation" && selectedFoodBank && (
            <div>
              <h2>Conversation with {selectedFoodBank.name}</h2>
              <ConversationView 
                donorId={userId}
                foodBankId={selectedFoodBank.id}
                messages={messages}
              />
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
