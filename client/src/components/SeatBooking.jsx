import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/style.css";
import screen from "../components/screen-thumb.png";
// import Payment from './Payment'
import PaymentHandler from "./Payment";
import paymentHandler from "./Payment";
import confirmSeat from "./confirmSeat";
import { useNavigate } from "react-router";

const seatPrice = 650; // Price per seat
const rows = 5;
const cols = 8;

function SeatBooking() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBookedSeats();
  }, []);

  const navigate = useNavigate()

  const fetchBookedSeats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/seat/getbookings"
      );
      const fetchedBookings = response.data; // Assuming response.data is an array of booking objects
      // console.log(fetchedBookings);
      const bookedSeatIds = fetchedBookings.flatMap((booking) => booking.seats); // Extract all seat IDs
      setBookedSeats(bookedSeatIds);
    } catch (error) {
      console.error("Error fetching booked seats:", error);
      setBookedSeats([]);
    }
  };

  const handleSeatClick = (rowIndex, colIndex) => {
    const seatId = `${rowIndex}-${colIndex}`;
    if (bookedSeats.includes(seatId)) {
      alert("This seat is already booked.");
      return;
    }
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((seat) => seat !== seatId);
      } else {
        return [...prevSelectedSeats, seatId];
      }
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    paymentHandler(totalPrice, selectedSeats);
    navigate("/")
  };

  const totalPrice = selectedSeats.length * seatPrice;
  console.log(totalPrice);

  return (
    <div className="App">
      <ul className="showcase">
        <li>
          <div className="seat"></div>
          <small>Available</small>
        </li>
        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div className="seat occupied"></div>
          <small>Sold</small>
        </li>
      </ul>

      <div className="container w-full">
        <div className="movie-screen ml-28">
          <img src={screen} alt="screen" />
        </div>

        <div className="row-container">
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div key={rowIndex} className="row">
              {Array.from({ length: cols }, (_, colIndex) => {
                const seatId = `${rowIndex}-${colIndex}`;
                const isSelected = selectedSeats.includes(seatId);
                const isBooked = bookedSeats.includes(seatId);
                const isOccupied = isBooked && !isSelected;
                return (
                  <div
                    key={seatId}
                    className={`seat ${isSelected ? "selected" : ""} ${
                      isOccupied ? "occupied" : ""
                    }`}
                    onClick={() => handleSeatClick(rowIndex, colIndex)}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="text-wrapper">
          <p className="text">
            Selected Seats <span id="count">{selectedSeats.length}</span>
          </p>
          <p className="text">
            Total Price ₹<span id="total">{totalPrice}</span>
          </p>
          <button
            type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleSubmit}
            disabled={isSubmitting || selectedSeats.length === 0}
          >
            {isSubmitting ? "Booking..." : "Book Seats"}
          </button>
        </div>
      </div>
    </div>
  );
}
// function PaymentHandler(totalPrice) {
//   // Call the payment component function
//   const paymentComponent = <Payment totalPrice={totalPrice} />;
//   return paymentComponent;
// }

export default SeatBooking;
