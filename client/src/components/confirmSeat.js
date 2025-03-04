import axios from "axios";

const confirmSeat = async (selectedSeats) => {
    
    try {
        const response = await axios.post('http://localhost:8080/seat/bookings', { seats: selectedSeats });
        
      } catch (error) {
        alert('Failed to book seats. Please try again.');
        console.error('Error booking seats:', error);
      } 
}

export default confirmSeat;