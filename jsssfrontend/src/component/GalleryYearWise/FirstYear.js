import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../Layout/Layout";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import cogoToast from "cogo-toast";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/Index";
import EventOne from "../GalleryEventWise.js/EventOne";
import EventTwo from "../GalleryEventWise.js/EventTwo";

const FirstYear = (year) => {
  const [allImages, setAllImages] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("select-event");
  const [selectedYear, setSelectedYear] = useState("select-year");
  const [totalCartItems, setTotalCartItems] = useState([]);
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [eventsList, setEventsList] = useState([]);
  const navigate = useNavigate();

  const getEventData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/auth/getAllListItems`
      );
      const data = response.data;
      // console.log(data);
      setEventsList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEventData();
  }, []);

  console.log(year);
  return (
    <>
      <Container>
        <div className="container d-flex flex-column justify-content-evenly navsect">
          <div className="container d-flex justify-content-center me-3">
            <Dropdown
              onSelect={(selectedKey) => setSelectedYear(selectedKey)}
              className="mx-2"
            >
              <Dropdown.Toggle variant="dark" id="galleryEventDropdown">
                {selectedYear ? selectedYear : "2023-24"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="2023-24">2023-24</Dropdown.Item>
                <Dropdown.Item eventKey="2024-25">2024-25</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className="hrbrd"></div>
            {/* event dropdown */}
            <Dropdown onSelect={(selectedKey) => setSelectedEvent(selectedKey)}>
              <Dropdown.Toggle variant="success" id="galleryEventDropdown">
                {selectedEvent ? selectedEvent : "painting_competition"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {eventsList.map((event) => (
                  <Dropdown.Item eventKey={event.event_name}>
                    {event.event_name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="flex-grow-1 p-3">
            {selectedYear && (
              <>
                <EventOne year={selectedYear} event={selectedEvent} />
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default FirstYear;
const Container = styled.div`
  .hrbrd {
    border: 1px solid red;
    margin-left: 0rem;
    margin-right: 0.5rem;
  }

  .galleryEventTab {
    display: flex;
    flex-direction: row !important;
    justify-content: left;
    width: 100%;
    .navlink {
      margin-left: 1rem;
    }
  }
`;
