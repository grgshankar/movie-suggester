import React from "react";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SingleMovie = (props) => {
  return (
    <>
      <Col className="movie_list" sm={12} md={6} lg={3}>
        <div className="img-wrapper">
          <img src={props.data.image} alt="Pics" />
        </div>
        <strong>{props.data.name}</strong>
        <p>{props.data.info}</p>
        <p>Rating: {props.data.rating}</p>
        <Button className="bg-dark">
          <Link
            to={`/view/${props.data.id}`}
            style={{ color: "#fff", textDecoration: "none" }}
          >
            View More
          </Link>
        </Button>
      </Col>
    </>
  );
};

export default SingleMovie;
