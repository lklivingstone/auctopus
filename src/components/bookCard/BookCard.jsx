import React from "react";
import { Grid, Container } from "@mui/material";
import { Button } from "../button/Button";
import "./BookCard.css"; 

const BookCard = ({ book, ownedBooksMap, OrderBook }) => {
  return (
    <Grid
      item
      key={book.id}
      className="book-card" 
      xs={12}
      sm={6}
      md={4}
    >
      <div className="card-content">
        <img
          className="card-image"
          onClick={() => window.open(book.description, "_blank")}
          src={book.img}
          alt="download"
          border="0"
        />
        <p className="card-text">{book.name}</p>
        {
            ownedBooksMap &&
            <Button
            label={ownedBooksMap[book.id] ? "Owned" : "Order"} 
            disabled={ownedBooksMap[book.id]} 
            onClick={() => OrderBook(book)}
            >
            {ownedBooksMap[book.id] ? "Owned" : "Order"}
            </Button>
        }
      </div>
    </Grid>
  );
};

export default BookCard;
