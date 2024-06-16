import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ imgSrc, title, description }) => (
  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
    <a href="#">
      <img className="rounded-t-lg w-full h-48 object-cover " src={imgSrc} alt={title} />
    </a>
    <div className="p-5">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      <Link
        to={'/seatbooking'}
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
);

const MovieCardContainer = () => {
  const movies = [
    {
      imgSrc: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-Ny4xLzEwICAyNS41SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00318249-lzmzmtrgcb-portrait.jpg",
      title: "mr and mrs mahi",
      description: "This is a short description of movie 1.",
    },
    {
      imgSrc: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@like_202006280402.png,lx-24,ly-617,w-29,l-end:l-text,ie-NjguN0sgTGlrZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00363650-ycbpksuxsh-portrait.jpg",
      title: "Chandu Champion",
      description: "This is a short description of movie 2.",
    },
    {
      imgSrc: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/munjya-et00398936-1716358299.jpg",
      title: "Munjya",
      description: "This is a short description of movie 3.",
    },
    {
      imgSrc: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/alyad-palyad-et00398653-1716022280.jpg",
      title: "Alyad Palyad",
      description: "This is a short description of movie 4.",
    },
  ];

  

  return (
    <div className="flex flex-wrap justify-center">
      {movies.map((movie, index) => (
        <MovieCard 
          key={index}
          imgSrc={movie.imgSrc}
          title={movie.title}
          description={movie.description}
        />
      ))}
    </div>
  );
};

export default MovieCardContainer;
