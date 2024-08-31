import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LoginForm from "./components/Login";
import DonorForm from "./components/DonorSignup";
import FoodBankForm from "./components/FoodBankSignup";
import FoodbankPage from "./pages/FoodbankPage";
import FoodbankList from "./components/FoodBankList";
import NewDonationForm from "./components/NewDonation";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/donor/register" element={<DonorForm />} />
          <Route exact path="/bank/register" element={<FoodBankForm />} />
          <Route exact path="/foodbank-dashboard" element={<FoodbankPage />} />
          <Route exact path="/foodbanklist" element={<FoodbankList />} />
          <Route exact path="/newdonation" element={<NewDonationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
