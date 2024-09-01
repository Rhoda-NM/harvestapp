import React, { useEffect, useState } from "react";
import DonationsCard from "./DonationsCard";

function Donations() {
  const [donations, setDonations] = useState([]);

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
        console.log("Fetch foodbanks error: ", err);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div>
      <h1>Donor Donations</h1>
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

export default Donations;
