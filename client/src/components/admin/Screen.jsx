import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import axios from '../../utils/axios/index.js'

function Screen() {
  const [theatreDetails, setTheatreDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  const getTheatreDetails = async () => {
    try {
      const theatreResponse = await axios.get("http://localhost:8080/admin/theatre");
      console.log("Theatre Response:", theatreResponse.data);
      setTheatreDetails(theatreResponse.data.data);

      const movieResponse = await axios.get("http://localhost:8080/admin/getMovie");
      console.log("Movie Response:", movieResponse.data.data);
      setMovies(movieResponse.data.data);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching theatre details:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTheatreDetails();
  }, []);

  return (
    <div className="p-5 font-sans">
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="space-y-5">
          {theatreDetails.map((theatre, index) => (
            <div
              key={index}
              className="p-5 border border-gray-300 rounded shadow-sm bg-white"
            >
              <h2 className="text-2xl font-bold">{theatre.name}</h2>
              <p className="text-gray-700">{theatre.location}</p>

              <div className="mt-4">
                <ul className="flex flex-wrap gap-4">
                  {movies.map((movie) => (
                    <Link to="/seatbooking">

                    <li
                      key={movie._id}
                      className="text-green-500 border border-gray-300 rounded p-2 shadow-sm text-center w-24"
                    >
                      {movie.timing}
                    </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Screen;
