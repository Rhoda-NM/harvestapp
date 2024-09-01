import React, { useEffect, useState } from "react";
import DonationDropdown from "./DonationDropdown";
import Modal from "./Modal";
import './Donations.css';

function DonationsList() {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSelect = (id) => {
    const donation = donations.find(d => d.id === id);
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const handleSave = (updatedDonation) => {
    setDonations(donations.map(d => d.id === updatedDonation.id ? updatedDonation : d));
  };

  return (
    <div className="donations">
      <DonationDropdown donations={donations} onSelect={handleSelect} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        donation={selectedDonation}
        onSave={handleSave}
      />
    </div>
  );
}

export default DonationsList;
