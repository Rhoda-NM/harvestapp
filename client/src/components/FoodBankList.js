import React, { useEffect, useState } from "react";
import FoodBankCard from "./FoodBankCard";
import './FoodbankList.css'; // Make sure to create this file for custom styles

function FoodBanksList() {
  const [foodbanks, setFoodbanks] = useState([]);
  const [filteredFoodbanks, setFilteredFoodbanks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

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

  useEffect(() => {
    const filtered = foodbanks.filter((foodbank) =>
      foodbank.location.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredFoodbanks(filtered);
  }, [search, foodbanks]);

  const itemsToDisplay = (filteredFoodbanks.length > 0 ? filteredFoodbanks : foodbanks)
    .slice(currentIndex, currentIndex + itemsPerPage);

  const nextPage = () => {
    if (currentIndex + itemsPerPage < (filteredFoodbanks.length > 0 ? filteredFoodbanks.length : foodbanks.length)) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <div>
      <input
        type="text"
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search item"
      />
      <div className="foodbank-container">
        <button
          className="arrow-button"
          onClick={prevPage}
          disabled={currentIndex === 0}
        >
          &#8592;
        </button>
        <div className="foodbank-cards">
          {itemsToDisplay.map((foodbank) => (
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
        <button
          className="arrow-button"
          onClick={nextPage}
          disabled={currentIndex + itemsPerPage >= (filteredFoodbanks.length > 0 ? filteredFoodbanks.length : foodbanks.length)}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}

export default FoodBanksList;
