import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Grid() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/getMovies"
        );
        console.log(response.data); 
        setMovies(response.data.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  if (loading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p>Error loading movies: {error}</p>;
  }

  return (
    <>
    

      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <a href="#">
              <img
                src={movie.image}
                alt={movie.Name}
                className="h-96 w-72 object-cover rounded-t-xl "
              />
              <div className="px-4 py-3 w-72">
                {movie.genre && (
                  <span className="text-gray-400 mr-3 uppercase text-xs">
                    {movie.genre}
                  </span>
                )}
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {movie.Name}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {/* {movie.description} */}
                </p>
                <div className="flex items-center">
                  <Link
                    to="/seatbooking"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-500 dark:hover:bg-red-500 dark:focus:ring-red-600"
                  >
                    Book Tickets
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </a>
          </div>
        ))}
      </section>
    </>
  );
}

export default Grid;
