import {  useSelector } from "react-redux";
import "./Dashboard.css";
import Navbar from "../../components/navbar/Navbar";
import Books from "../../components/books/Books";

const Dashboard = () => {
    const user = useSelector((state)=>state.user_details["user"])
    const books = useSelector((state)=>state.user_details["books"])


    return (
        <>
            <Navbar />
            <div className="user-details">
                <h2>Hi {user.name}!</h2>

                <h4>Deatils:</h4>
                <p>Phone : {user.phone}</p>
                <p>Email : {user.email}</p>
                <p>Address : {user.address}</p>
                <p>College : {user.college}</p>
            </div>
            <div className="books-container">
                <h2>Books</h2>
                <Books books={books} />
            </div>
        </>             
    )
}

export default Dashboard;