import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import logo from "../../../../assets/img/logo/logo-white.png";
import {
  RiHome3Line,
  RiUser3Line,
  RiCarLine,
  RiFileList3Line,
  RiLogoutCircleRLine,
  RiDashboardLine,
} from "react-icons/ri";
import { useDispatch } from "react-redux";
import { logout } from "../../../../store/slices/auth-slice";
import secureLocalStorage from "react-secure-storage";
import { question } from "../../../../utils/functions/swal";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    question("Are you sure to logout?").then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        secureLocalStorage.removeItem("token");
        navigate("/");
      }
    });
  };


  return (
    <Navbar bg="dark" expand="lg" className="admin-navbar" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/admin">
          <img src={logo} className="img-fluid" alt="Admin" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin">
              <RiDashboardLine /> Dasboard
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/users">
              <RiUser3Line /> Users
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/vehicles">
              <RiCarLine /> Vehicles
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/reservations">
              <RiFileList3Line /> Reservations
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/contact-messages">
              <RiCarLine /> Contact Messages
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              <RiHome3Line /> Web Site
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>
              <RiLogoutCircleRLine/> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SideBar;
