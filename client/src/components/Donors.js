import React, { useEffect, useState } from "react";
import DonorCard from "./DonorCard";

function Donors() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/donors");
        const allDonors = await response.json();
        setDonors(allDonors);
      } catch (err) {
        console.log("Fetch foodbanks error: ", err);
      }
    };
    console.log(donors);

    fetchDonors();
  }, []);

  return (
    <div>
      {donors.map((donor) => (
        <DonorCard
          key={donor.id}
          name={donor.name}
          email={donor.email}
          location={donor.location}
        />
      ))}
    </div>
  );
}

export default Donors;
