import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import axios from "axios"
const Title = styled.h1.attrs({
  className: 'h1',
})``;

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px;
`;

const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`;

const MoviesUpdate = ({ match }) => {
  const id = match.params.id
  console.log("id is ->"+id);
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [time, setTime] = useState('');

  const handleChangeInputName = (event) => {
    const name = event.target.value;
    setName(name);
  };

  const handleChangeInputRating = (event) => {
    const rating1 = event.target.validity.valid ? event.target.value : rating;
    setRating(rating1);
  };

  const handleChangeInputTime = (event) => {
    const time = event.target.value;
    setTime(time);
  };

  const handleUpdateMovie = async () => {
   
    const payload = { name, rating,time };
    console.log(payload);
    try {
        const response = await axios.put(`http://localhost:5000/api/movie/${id}`, payload);
        console.log('Updated movie:', response.data.data);
        window.alert('Movie updated successfully');
      
      } catch (error) {
        console.error('Error updating movie:', error);
        window.alert('Error updating movie');
      }
  };

  const getMovieById = async (id) => {
    console.log(id);
   await axios.get(`http://localhost:5000/api/movie/${id}`)
    .then(response => {
        setName(response.data.data.name);
        setRating(response.data.data.rating);
        setTime(response.data.data.time);
     // setMovies(response.data.data);
      console.log(response.data.data)
    })
    .catch(error => {
      console.error('Error fetching movies:', error);
    });
  };

  useEffect(() => {
    const fetchMovie = async () => {
       await getMovieById(id);
    //   setName(movie.data.data.name);
    //   setRating(movie.data.data.rating);
    //   setTime(movie.data.data.time.join('/'));
    };

    fetchMovie();
  }, [id]);

  return (
    <Wrapper>
      <Title>Create Movie</Title>

      <Label>Name: </Label>
      <InputText type="text" value={name} onChange={handleChangeInputName} />

      <Label>Rating: </Label>
      <InputText
        type="number"
        step="0.1"
        lang="en-US"
        min="0"
        max="10"
        pattern="[0-9]+([,\.][0-9]+)?"
        value={rating}
        onChange={handleChangeInputRating}
      />

      <Label>Time: </Label>
      <InputText type="text" value={time} onChange={handleChangeInputTime} />

      <Button onClick={handleUpdateMovie}>Update Movie</Button>
      <CancelButton href={'/movies/list'}>Cancel</CancelButton>
    </Wrapper>
  );
};

export default MoviesUpdate;