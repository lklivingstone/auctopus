import React, { useState, useEffect } from "react";
import "./Home.css";
import Navbar from "../../components/navbar/Navbar";
import { getBooksFromCategory, getCategories, orderBook } from "../../api/RequestMethods";
import { useDispatch, useSelector } from "react-redux";
import { updateOwnedBooks, updateOwnedBooksMap } from "../../redux/UserRedux";
import Categories from "../../components/categories/Categories";
import Books from "../../components/books/Books";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user_details["user"])
  const token = useSelector((state)=>state.user_details["token"])
  let ownedBooks = useSelector((state)=>state.user_details["books"])
  let ownedBooksMap = useSelector((state)=>state.user_details["booksMap"])


    const [ categoryID, setCategoryID ] = useState();
    const [ categories, setCategories ] = useState([]);
    const [ books, setBooks ] = useState([]);

    const handleCardClick = (selectedCategory) => {
        setCategoryID(selectedCategory);
    };

    useEffect(() => {
      const getCategoriesFunc= async () => {
          try {
              const response = await getCategories(token);
              const resData= await response.data;
              setCategories(resData);
              setCategoryID(resData[0]["id"]);
          } catch(err) {

          }
      }
      getCategoriesFunc()
  }, [])

  useEffect(() => {
    const getBooks = async () => {
      try {
        let categoryName = "";
        categories.map((category, index) => {
          if (category["id"] == categoryID) {
            categoryName = category["name"]
          }
        })

        const response = await getBooksFromCategory({categoryName, token});
        const resData= response.data;
        setBooks(resData);
      }
      catch (err) {

      }
    }
    getBooks();
  }, [categoryID])

      const OrderBook = async (book) => {
        try {
          const response = await orderBook({userID: user.id, token: token, bookID: book.id})
          dispatch(updateOwnedBooks([...ownedBooks, book]))
          dispatch(updateOwnedBooksMap({ ...ownedBooksMap, [book.id]: book.name }));
        }
        catch (err) {

        }
      }

  return (
    <>
      <Navbar />
      <div className="categories-container">
        <Categories
          categories={categories}
          categoryID={categoryID}
          handleCardClick={handleCardClick}
        />
      </div>
      <h2 className="heading-books">
        Books:  
      </h2>
      <Books books={books} ownedBooksMap = {ownedBooksMap} OrderBook = {OrderBook}/>
    </>
  )
}

export default Home