import React, { useState, useEffect } from 'react';

const ScheduleShowtime = () => {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [screens, setScreens] = useState([]);
  const [movie, setMovie] = useState('');
  const [theater, setTheater] = useState('');
  const [screen, setScreen] = useState('');
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    // Fetch movies, theaters, screens
    fetch('http://localhost:8080/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data));
    fetch('http://localhost:8080/api/theaters')
      .then(res => res.json())
      .then(data => setTheaters(data));
    // Assume screens are part of theater data or fetched separately
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Movie:
        <select value={movie} onChange={(e) => setMovie(e.target.value)}>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        Theater:
        <select value={theater} onChange={(e) => setTheater(e.target.value)}>
          {theaters.map((theater) => (
            <option key={theater.id} value={theater.id}>
              {theater.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Screen:
        <select value={screen} onChange={(e) => setScreen(e.target.value)}>
          {/* Populate screens dynamically */}
        </select>
      </label>
      <label>
        Date and Time:
        <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
      </label>
      <button type="submit">Schedule Showtime</button>
    </form>
  );
};

export default ScheduleShowtime;
