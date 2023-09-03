import React from "react";
import { Grid } from "@mui/material";
import BookCard from "../bookCard/BookCard";
import "./Books.css";

const Books = ({ books, ownedBooksMap, OrderBook }) => {
  return (
    <>
        <Grid container rowSpacing={3} columnSpacing={{xs: 2, sm: 4, md: 8}} >
            {
                books?.map((book, index) => (
                    <BookCard
                        key={book.id}
                        book={book}
                        ownedBooksMap={ownedBooksMap}
                        OrderBook={OrderBook}
                    />
                ))
            }
        </Grid>
    </>
  );
};

export default Books;