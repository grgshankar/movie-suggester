import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import MyNavBar from "../components/MyNavBar";
import SingleMovie from "./SingleMovie";

const Home = (props) => {
  const [movies, setMovies] = useState([]);
  const [searchMovieText, setSearchMovieText] = useState("");
  //   const [errorText, setErrorText] = useState("");
  useEffect(() => {
    getMovies();
  }, []);
  useEffect(() => {
    const fetchTimer = setTimeout(() => {
      if (searchMovieText.length > 2) {
        getMovies();
      } else if (searchMovieText.length < 1) {
        getMovies();
      } else {
        alert("Please type at list 3 characters");
      }
    }, 500);
    return () => {
      clearTimeout(fetchTimer);
    };
  }, [searchMovieText]);
  const getMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovieText}`
      );
      setMovies(response.data.moviesData);
      // console.log(response.data.moviesData);
    } catch (error) {
      //
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("something went wrong");
      }
    }
  };
  return (
    <>
      <MyNavBar value={searchMovieText} onChange={setSearchMovieText} />
      <Container>
        <Row className="movie_row mt-4 mb-4">
          {movies.map((data) => (
            <SingleMovie key={data.id} data={data} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
