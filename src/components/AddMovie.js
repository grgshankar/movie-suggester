import axios from "axios";
import React, { useRef, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MyNavBar from "./MyNavBar";

const AddMovie = (props) => {
  const history = useHistory();
  const movie_ref = useRef("");
  const rating_ref = useRef("");
  const des_ref = useRef("");

  const addMovieHandler = async (e) => {
    e.preventDefault();
    const postData = {
      movie_name: movie_ref.current.value,
      rating: rating_ref.current.value,
      description: des_ref.current.value,
      // movie_name: "This is Movie title",
      // rating: "9",
      // description: "This is demo desc",
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        postData,
        {
          timeout: 10000,
        }
      );
      console.log(response);
      history.push("/home");
      alert(response.data.message);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("unknown error occurred!!!");
      }
    }
  };
  return (
    <div>
      {localStorage.getItem("loggedIn") ? (
        <>
          <MyNavBar />
          <Container>
            <Card style={{ padding: "29px", marginTop: "30px" }}>
              <Form className="form_wrapper" onSubmit={addMovieHandler}>
                <Form.Group className="mb-3">
                  <Form.Label>Movie Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Movie name"
                    ref={movie_ref}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Rating"
                    ref={rating_ref}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" ref={des_ref} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Add movie
                </Button>
              </Form>
            </Card>
          </Container>
        </>
      ) : (
        <>{history.push("/")}</>
      )}
    </div>
  );
};

export default AddMovie;
