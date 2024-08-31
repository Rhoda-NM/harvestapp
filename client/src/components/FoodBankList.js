import React, { useEffect, useState } from "react";
import FoodBankCard from "./FoodBankCard";
import "./FoodBankCard.css";

function FoodBanksList() {
  const [foodbanks, setFoodbanks] = useState([]);
  const [filteredFoodbanks, setFilteredFoodbanks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFoodbanks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/foodbanks");
        const allFoodBanks = await response.json();
        setFoodbanks(allFoodBanks);
      } catch (err) {
        console.log("Fetch foodbanks error: ", err);
      }
    };

    fetchFoodbanks();
  }, []);

  useEffect(() => {
    const filtered = foodbanks.filter((foodbank) =>
      foodbank.location.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredFoodbanks(filtered);
  }, [search, foodbanks]);

  return (
    <div>
      <h1>Food Banks</h1>
      <input
        type="text"
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search item"
      />
      {filteredFoodbanks.length > 0
        ? filteredFoodbanks.map((foodbank) => (
            <FoodBankCard
              key={foodbank._id}
              name={foodbank.name}
              image={foodbank.image}
              description={foodbank.description}
              email={foodbank.email}
              location={foodbank.location}
            />
          ))
        : foodbanks.map((foodbank) => (
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
