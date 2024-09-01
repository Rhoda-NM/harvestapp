import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LoginForm from "./components/Login";
import DonorForm from "./components/DonorSignup";
import FoodBankForm from "./components/FoodBankSignup";
import FoodbankDashboard from "./pages/FoodbankDashboard.js";
import Donors from "./components/Donors";
import NewDonationForm from "./components/NewDonation";
import FoodBanksList from "./components/FoodBankList";
import Donations from "./components/Donations";
import Dashboard from "./pages/DonorDashboard.js";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/donor/register" element={<DonorForm />} />
          <Route exact path="/bank/register" element={<FoodBankForm />} />
          <Route exact path="/foodbank-dashboard" element={<FoodbankDashboard />} />
          <Route exact path="/donor-dashboard" element={<Dashboard />} />
          <Route exact path="/donors" element={<Donors />} />
          <Route exact path="/donor-dashboard" element={<Dashboard/>} />
          <Route exact path="/newdonation" element={<NewDonationForm />} />
          <Route exact path="/foodbanklist" element={<FoodBanksList />} />
          <Route exact path="/donations" element={<Donations />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
