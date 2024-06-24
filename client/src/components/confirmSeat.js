import axios from "axios";

const confirmSeat = async (selectedSeats) => {
    
    try {
        const response = await axios.post('http://ec2-15-206-69-49.ap-south-1.compute.amazonaws.com/seat/bookings', { seats: selectedSeats });
        
      } catch (error) {
        alert('Failed to book seats. Please try again.');
        console.error('Error booking seats:', error);
      } 
}

export default confirmSeat;