import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import MyNavBar from "./MyNavBar";

const ViewMovie = () => {
  const [movieHolder, setMovieHolder] = useState({});
  const getParams = useParams();
  const getId = getParams.id;

  useEffect(() => {
    viewDetails();
  }, []);
  const viewDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getId}`
      );
      setMovieHolder(response.data.singleMovieData);
    } catch (error) {
      //
      alert(error.response.data.errors[0].message);
    }
  };
  return (
    <>
      <MyNavBar />
      <Container className="details_page">
        <div className="img_wrap">
          <img src={movieHolder.image} alt="pics" />
        </div>
        <strong>{movieHolder.name}</strong>
        <p>Info: {movieHolder.info}</p>
        <p>{movieHolder.desc}</p>
        <p>Rating: {movieHolder.rating}</p>
      </Container>
    </>
  );
};

export default ViewMovie;
