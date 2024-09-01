import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DonationsCard from "./DonationsCard";

function DonationsByDonor() {
  const { id } = useParams(); // Get donor ID from URL
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/donations?donorId=${id}`
        );
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
  }, [id]);

  return (
    <div>
      <h1>Donations for Donor ID: {id}</h1>
      {donations.map((donation) => (
        <DonationsCard
          key={donation.id}
          name={donation.name}
          quantity={donation.quantity}
          type={donation.type}
          image={donation.image}
        />
      ))}
    </div>
  );
}

export default DonationsByDonor;
