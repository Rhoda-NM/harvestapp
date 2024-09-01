import React from 'react';
import './DonationDropDown.css';

function DonationDropdown({ donations, onSelect }) {
  return (
    <div className="dropdown">
      <select onChange={(e) => onSelect(e.target.value)} defaultValue="">
        <option value="" disabled>Select a donation</option>
        {donations.map(donation => (
          <option key={donation.id} value={donation.id}>
            {donation.name} - {donation.quantity}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DonationDropdown;
