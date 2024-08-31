import React, { useEffect, useState } from "react";
import DonorCard from "./DonorCard";

function Donors() {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    const filtered = donors.filter((donor) =>
      donor.location.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDonors(filtered);
  }, [search, donors]);

  return (
    
    <div className="donors">
      <input
        type="text"
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by location"
      />
      <div className="donors-container">
      {filteredDonors.length > 0
        ? filteredDonors.map((donor) => (
            <DonorCard
              key={donor.id}
              name={donor.name}
              email={donor.email}
              location={donor.location}
            />
          ))
        : donors.map((donor) => (
            <DonorCard
              key={donor.id}
              name={donor.name}
              email={donor.email}
              location={donor.location}
            />
          )
          )}
    </div>  
    </div>
  );
}

export default Donors;
