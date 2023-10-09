import React, { useEffect, useState } from 'react';
//import ReactTable from 'react-table';
//import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios'

//import styled from 'styled-components';

import 'react-table/react-table.css';

// const Wrapper = styled.div`
//   padding: 0 40px 40px 40px;
// `;

// const Update = styled.div`
//   color: #ef9b0f;
//   cursor: pointer;
// `;

// const Delete = styled.div`
//   color: #ff0000;
//   cursor: pointer;
// `;



// const DeleteMovie = ({ id }) => {
  
//     if (window.confirm(`Do you want to delete the movie ${id} permanently?`)) {
//       api.deleteMovieById(id);
//       window.location.reload();
//     }


  
// };

const MoviesList = () => {
    //const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading)
//const history = useHistory();

const handleDeleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/movie/${id}`);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error('Error deleting movie:', error);
      window.alert('Error deleting movie');
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      axios.get('http://localhost:5000/api/movies')
      .then(response => {
        setMovies(response.data.data);
        console.log(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
    };

    fetchMovies();
  }, []);

  // const handleUpdateClick = (movieId) => {
  //   // Replace '/edit' with the path to your update page
  //   history.push(`/movies/update/${movieId}`);
  // };

  console.log('TCL: MoviesList -> movies', movies);

  return (
    <div>
         <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            {movie.name} - Rating: {movie.rating}
            {"id id->"+movie._id}
            <button onClick={() => handleDeleteMovie(movie._id)} >Delete</button>
            <Link to={`/movies/update/${movie._id}`}>Update</Link>
          </li>
        ))}
        
      </ul>
    </div>
    
  );
};

export default MoviesList;