import { useEffect } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { Toaster } from "react-hot-toast";
import { loadUser } from "./redux/actions/auth";
import { useDispatch } from "react-redux";
import SeatBooking from "./components/SeatBooking";
import MovieCardContainer from "./components/MovieCard";
import Grid from "./components/Grid";
import SidebarComponent from "./components/admin/SidebarComponent";
import Movies from "./components/admin/Movies";
import Theatre from "./components/admin/Theatre";
import Payment from "./components/Payment";
import Screen from "./components/admin/Screen";
import AssignMovieToScreen from "./components/admin/AssignMovieToScreen";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <div
      style={{
        height: "auto",
      }}
    >
      <Toaster />
      <Navbar />

      <Routes>
        <Route path="/grid" element={<MovieCardContainer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/seatbooking" element={<SeatBooking />} />
        <Route path="/" element={<Grid/>} />
        <Route path="/admin" element={<SidebarComponent/>} />
        <Route path="/admin/movies" element={<Movies/>} />
        <Route path="/admin/theatre" element={<Theatre/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/theatre" element={<Screen/>} />
        <Route path="/assignmovies" element={<AssignMovieToScreen/>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
