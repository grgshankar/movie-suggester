import axios from "axios";
import React, { useRef, useState } from "react";
import {
  Button,
  Container,
  Form,
  Modal,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AiFillCloseCircle } from "react-icons/ai";
import Profile from "./Profile";

const MyNavBar = (props) => {
  const history = useHistory();
  const getEmail = useRef();
  const getPassword = useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const loginHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email: getEmail.current.value,
      password: getPassword.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData,
        {
          timeout: 10000,
        }
      );
      const accessToken = response.data.accessToken;
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("accessToken", accessToken);

      history.replace("/");
    } catch (error) {
      alert(error.response.data.errors[0].message);
    }
  };
  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedIn");
    history.push("/");
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} className="login_modal">
        <Modal.Body>
          <Form onSubmit={loginHandler}>
            <Button
              variant="secondary"
              onClick={handleClose}
              className="btn_close"
            >
              <AiFillCloseCircle />
            </Button>
            <h2 className="center">Login</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={getEmail}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={getPassword}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* nav bar */}
      <Navbar bg="light" expand="lg" className="bg-dark">
        <Container>
          <Link to="/home" className="logo-wrapper">
            Movie Suggester
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {window.location.pathname === "/home" ? (
              <>
                <Form className="d-flex movie_search_field">
                  <Form.Control
                    type="search"
                    placeholder="Search Movie"
                    className="me-2"
                    aria-label="Search"
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                  />
                </Form>
              </>
            ) : (
              <></>
            )}

            <Navbar.Text className="me-2">
              <Link to="/add_movie">Add Movie</Link>
            </Navbar.Text>
            <Navbar.Text>
              {localStorage.getItem("loggedIn") ? (
                <>
                  <NavDropdown title="Profile" id="navbarScrollingDropdown">
                    <Profile />
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Button to="" onClick={handleShow}>
                    Login
                  </Button>
                </>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavBar;
