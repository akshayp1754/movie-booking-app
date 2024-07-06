import React, { useState, useEffect } from "react";
import axios from "axios";
// import axios from '../../utils/axios/index.js'

function AssignMovieToScreen() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [timing, setTiming] = useState("");
  const [theatreId, setTheatreId] = useState("");

  useEffect(() => {
    const fetchMoviesAndTheatre = async () => {
      try {
        const moviesResponse = await axios.get(
          "http://ec2-13-51-204-106.eu-north-1.compute.amazonaws.com/admin/getMovies"
        );
        setMovies(moviesResponse.data.data);

        const theatreResponse = await axios.get(
          "http://ec2-13-51-204-106.eu-north-1.compute.amazonaws.com/admin/theatre"
        );
        setTheatreId(theatreResponse.data.data[0]._id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMoviesAndTheatre();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://ec2-15-206-69-49.ap-south-1.compute.amazonaws.com/admin/assignMovie",
        {
          movieId: selectedMovie,
          timing: timing,
          theaterId: theatreId,
        }
      );

      console.log("Response:", response);
    } catch (error) {
      console.error("Error assigning movie:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">Assign Movie to Screen</h1>
        <div className="mb-4">
          <label
            htmlFor="movie"
            className="block text-gray-700 font-medium mb-2"
          >
            Select Movie:
          </label>
          <select
            id="movie"
            value={selectedMovie}
            onChange={(e) => setSelectedMovie(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select a movie</option>
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.Name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="timing"
            className="block text-gray-700 font-medium mb-2"
          >
            Enter Timing:
          </label>
          <input
            type="time"
            id="timing"
            value={timing}
            onChange={(e) => setTiming(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Assign Movie to Screen
        </button>
      </form>
    </div>
  );
}

export default AssignMovieToScreen;

