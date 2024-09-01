import React, { useEffect, useState } from "react";
import FoodBankList from "../components/FoodBankList";
import Donors from "../components/Donors";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function FoodBankDashboard() {
  return (
    <>
    <Navbar />
    <div>
      <Donors />
    </div>
    <Footer />
    </>
  );
}

export default FoodBankDashboard;
