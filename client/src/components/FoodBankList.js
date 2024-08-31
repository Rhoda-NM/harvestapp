import React, { useEffect, useState } from "react";
import FoodBankCard from "./FoodBankCard";

function FoodBanksList() {
  const [foodbanks, setFoodbanks] = useState([]);

  useEffect(() => {
    const fetchFoodbanks = async () => {
      try {
        const response = await fetch("/foodbanks");
        const allFoodBanks = await response.json();
        setFoodbanks(allFoodBanks);
      } catch (err) {
        console.log("Fetch foodbanks error: ", err);
      }
    };

    fetchFoodbanks();
  }, []);
  return (
    <div>
      <h1>Food Banks</h1>
      {foodbanks.map((foodbank) => (
        <FoodBankCard
          key={foodbank._id}
          name={foodbank.name}
          image={foodbank.image}
          description={foodbank.description}
          email={foodbank.email}
          location={foodbank.location}
        />
      ))}
    </div>
  );
}

export default FoodBanksList;
