import './App.css';
import Login from './pages/login/Login';
import Logout from './pages/logout/Logout';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { useSelector } from 'react-redux';
import Dashboard from './pages/dashboard/Dashboard';


function App() {
  const user = useSelector((state)=>state.user_details.user)
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element= { user ? <Home /> : <Navigate to="/login" replace/>} />
      <Route path="/login" element= {user ? <Navigate to="/" replace /> :  <Login />} />
      <Route path="/logout" element= {user ? <Logout /> : <Navigate to="/" replace />} />
      <Route path="/dashboard" element= {user ? <Dashboard /> : <Navigate to="/login" replace />} />
      <Route path="/register" element= {user ?<Navigate to="/" replace /> :  <Register />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
