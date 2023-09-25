import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Dropdown } from "react-bootstrap";
import EventOne from "../../GalleryEventWise.js/EventOne";
import EventTwo from "../../GalleryEventWise.js/EventTwo";
import GalleryUpdate from "../GalleryUpdate";
import axios from "axios";
import cogoToast from "cogo-toast";
import { Link, useNavigate } from "react-router-dom";

const GalleryMainPart = () => {
  const [selectedYear, setSelectedYear] = useState("select-year");
  const [selectedEvent, setSelectedEvent] = useState("select-event");
  const [showPopup, setShowPopup] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventYear, setEventYear] = useState("");
  const [eventsList, setEventsList] = useState([]);
  const navigate = useNavigate();

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const insertEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/add-eventlist",
        { eventName, eventYear, eventDesc }
      );
      console.log(res);
      cogoToast.success("event added to event list");
      setShowPopup(false);
      navigate("/eventList");
    } catch (error) {
      console.log(error);
    }
  };

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

  // console.log(selectedYear, selectedEvent);
  return (
    <>
      <Container>
        <div className={`popup-container${showPopup ? " active" : ""}`}>
          <div className="popup w-25">
            <h2 className="text-center">Add event list</h2>
            <form className="d-flex flex-column" onSubmit={insertEvent}>
              <div className="d-flex justify-content-evenly flex-column">
                <label htmlFor="imgName" className="fw-bold">
                  Event Name
                </label>
                <input
                  type="text"
                  placeholder="event name"
                  className="mb-3 rounded p-1"
                  name="eventName"
                  value={eventName}
                  required
                  onChange={(e) => setEventName(e.target.value)}
                />
                <label htmlFor="imgYear" className="fw-bold">
                  Event year
                </label>
                <input
                  type="text"
                  placeholder="event year"
                  className="mb-3 rounded p-1"
                  name="eventYear"
                  value={eventYear}
                  required
                  onChange={(e) => setEventYear(e.target.value)}
                />
                <label htmlFor="imgDesc" className="fw-bold">
                  Event Description
                </label>
                <textarea
                  type="text"
                  placeholder="event description"
                  className="mb-3 rounded p-1"
                  name="eventDesc"
                  value={eventDesc}
                  required
                  onChange={(e) => setEventDesc(e.target.value)}
                />

                <button type="submit" className="btn btn-success mt-2 mb-2">
                  create
                </button>
                <button
                  type="button"
                  className="btn btn-danger mt-2"
                  onClick={closePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        <h1 className='text-center fw-semibold my-3' style={{color:"#4d4dff", fontFamily:"gumela"}}>Welcome To Student Gallery</h1>

        <div className="container d-flex flex-column justify-content-center align-items-center h-100">
          <div className="d-flex contmobile">
            <div>
              <button className="btn btnex" onClick={openPopup} id='add-event'>
                Add new event
              </button>
            </div>
            <div>
              <Link to="/eventList">
                <button className="btn btnex" id="event-list">Event List</button>
              </Link>
            </div>
          </div>

          {/* <div className="d-flex">
            <Dropdown
              onSelect={(selectedKey) => setSelectedYear(selectedKey)}
              className="mx-2"
            >
              <Dropdown.Toggle variant="dark" id="galleryEventDropdown">
                {selectedYear ? selectedYear : "Select Year"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="2023-24">2023-24</Dropdown.Item>
                <Dropdown.Item eventKey="2024-25">2024-25</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown onSelect={(selectedKey) => setSelectedEvent(selectedKey)}>
              <Dropdown.Toggle variant="success" id="galleryEventDropdown">
                {selectedEvent ? selectedEvent : "Select Event"}
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
          <div className="container">
            <div className="flex-grow-1 p-3">
              {selectedYear && selectedEvent && (
                <>
                  <GalleryUpdate year={selectedYear} event={selectedEvent} />
                </>
              )}
            </div>
          </div> */}
        </div>
      </Container>
    </>
  );
};

export default GalleryMainPart;
const Container = styled.div`
  height: 100vh;
  .popup-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
  }

  .popup-container.active {
    display: flex;
    background-color: #00000075;
    z-index: 1;
  }

  .popup {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  .btnex {
    height: 18rem;
    width: 20rem;
    font-size: 3rem;
    box-shadow: 1px 5px 17px #000;
    margin-left: 2rem;

    @media screen and (min-width: 501px) and (max-width: 900px) {
      height: 12rem;
      width: 15rem;
      font-size: 2rem;
      margin-left: 2rem;
    }
    @media screen and (max-width: 500px) {
      height: 8rem;
      width: 8rem;
      font-size: 1rem;
      margin-left: 0rem;
      margin-top: 1rem;
    }
  }

  .contmobile {
    @media screen and (max-width: 500px) {
      flex-direction: column;
    }
  }
  #add-event
  {
    background: linear-gradient( #4d7db7, #2c4a6e );
    color: white;
    font-family: gumela;
  }
  #event-list
  {
    background: linear-gradient( #4d7db7, #2c4a6e );
    color: white;
    font-family: gumela;
  }
`;
