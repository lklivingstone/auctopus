import React from "react";
import Card from '@mui/material/Card';
import "./Categories.css";

const Categories = ({ categories, categoryID, handleCardClick }) => {
  return (
    <>
      {categories.map((category) => (
        <Card
          key={category.id}
          className={`category-card ${category.id === categoryID ? "active" : ""}`}
          onClick={() => handleCardClick(category.id)}
        >
          {category.name}
        </Card>
      ))}
    </>
  );
};

export default Categories;
