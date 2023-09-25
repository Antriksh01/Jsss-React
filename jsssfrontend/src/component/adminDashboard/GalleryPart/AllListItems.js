import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const AllListItems = () => {
  const [eventsList, setEventsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imgYear, setImgYear] = useState("");
  const [imgEvent, setImgEvent] = useState("");
  const [price, setPrice] = useState("");
  const [img_name, setImgName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [imageFile, setImageFile] = useState([]);
  const eventsPerPage = 10;
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState({
    name: "",
    year: "",
    desc: "",
  });

  const [eventSelect, setEventSelect] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const handleEventImagesView = (event_name) => {
    console.log(event_name);
    navigate(`/admin-view-images/${event_name}`);
  };

  const getEventData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/auth/getAllListItems`
      );
      const data = response.data;
      console.log(data);
      setEventsList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEventData();
  }, []);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const reversedEventsList = eventsList.slice().reverse(); // Create a reversed copy of the eventsList
  const currentEvents = reversedEventsList.slice(
    indexOfLastEvent - eventsPerPage,
    indexOfLastEvent
  );

  console.log(currentEvents);

  const handleEventList = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/auth/event-delete/${id}`
      );
      console.log(res);
      cogoToast.success("event deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    setImageFile(files);
  };

  const insertImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img_name", img_name);
    formData.append("price", price);
    formData.append("year", selectedEvent.year);
    formData.append("event", selectedEvent.name);

    // Ensure imageFile is an array before iterating
    imageFile.forEach((image, index) => {
      formData.append(`image`, image);
    });

    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/add-gallery-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      cogoToast.success("image added successfully");
      setShowPopup(false);
    } catch (error) {
      console.error(error);
    }
  };

  // second pop-up

  const openUpdatePopup = (item) => {
    setEventSelect(item);
    setPopupVisible(true);
  };

  const closeUpdatePopup = () => {
    setPopupVisible(false);
  };

  const Popup = ({ eventId, eventName, eventYear, eventDesc }) => {
    console.log(eventId, eventName, eventYear, eventDesc);
    const [updatedEventYear, setUpdatedEventYear] = useState(eventYear);
    const [updatedEventName, setUpdatedEventName] = useState(eventName);
    const [updatedEventDesc, setUpdatedEventDesc] = useState(eventDesc);

    const handleUpdateEvent = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.put(
          `http://localhost:4000/api/auth/updateEventList/${eventId}`,
          {
            eventName: updatedEventName,
            eventYear: updatedEventYear,
            eventDesc: updatedEventDesc,
          }
        );
        console.log(res.data);
        cogoToast.success("Image Updated Successfully");
        closeUpdatePopup();
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div className={`popup-container${popupVisible ? " active" : ""}`}>
        <div className="popup">
          <h2>Update image details</h2>
          <form className="d-flex flex-column" onSubmit={handleUpdateEvent}>
            <div className="d-flex justify-content-evenly flex-column">
              <label htmlFor="imgName" className="fw-bold">
                Event Name
              </label>
              <input
                type="text"
                placeholder="Image name"
                className="mb-3 rounded p-1"
                value={updatedEventName}
                onChange={(e) => setUpdatedEventName(e.target.value)}
              />
              <label htmlFor="imgPrice" className="fw-bold">
                Event Year
              </label>
              <input
                type="text"
                placeholder="Event Year"
                className="mb-3 rounded p-1"
                // name="imgPrice"
                maxLength={4}
                value={updatedEventYear}
                onChange={(e) => setUpdatedEventYear(e.target.value)}
              />
              <label htmlFor="imgPrice" className="fw-bold">
                Event Description
              </label>
              <textarea
                type="text"
                placeholder="Event Description"
                className="mb-3 rounded p-1"
                value={updatedEventDesc}
                onChange={(e) => setUpdatedEventDesc(e.target.value)}
              />

              <button type="submit" className="btn btn-success mt-2 mb-2">
                update
              </button>
              <button
                type="button"
                className="btn btn-danger mt-2"
                onClick={closeUpdatePopup}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div id="main-cont-1">
      <Container>
        <div className={`popup-container${showPopup ? " active" : ""}`}>
          <div className="popup">
            <h2 className="text-center">Add Image</h2>
            <form
              className="d-flex flex-column"
              onSubmit={insertImage}
              enctype="multipart/form-data"
            >
              <div className="d-flex justify-content-evenly flex-column">
                <label htmlFor="imgName" className="fw-bold">
                  Image Name
                </label>
                <input
                  type="text"
                  placeholder="Image name"
                  className="mb-3 rounded p-1"
                  name="imgName"
                  value={img_name}
                  onChange={(e) => setImgName(e.target.value)}
                />
                <label htmlFor="imgPrice" className="fw-bold">
                  Image Price
                </label>
                <input
                  type="text"
                  placeholder="Image Price"
                  className="mb-3 rounded p-1"
                  name="imgPrice"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  type="file"
                  placeholder="choose image"
                  className="mb-3"
                  onChange={handleImageChange}
                  multiple
                />
                <label htmlFor="imgYear" className="fw-bold">
                  Year (ex: 2023)
                </label>
                <input
                  type="text"
                  placeholder="Image year"
                  className="mb-3 rounded p-1"
                  name="imgYear"
                  value={selectedEvent.year}
                  maxLength={4}
                  readOnly
                  onChange={(e) => setImgYear(e.target.value)}
                />
                <label htmlFor="imgEvent" className="fw-bold">
                  Event (ex:independance_day)
                </label>
                <input
                  type="text"
                  placeholder="Image event"
                  className="mb-3 rounded p-1"
                  name="imgEvent"
                  value={selectedEvent.name}
                  onChange={(e) => setImgEvent(e.target.value)}
                  readOnly
                />
                {/* <select
                  className="mb-3 rounded p-1"
                  name="imgEvent"
                  value={imgEvent}
                  onChange={(e) => setImgEvent(e.target.value)}
                >
                  <option value="">Select an Image Event</option>
                  {eventsList.map((event) => (
                    <option value={event.event_name}>{event.event_name}</option>
                  ))}
                </select> */}

                <button type="submit" className="btn btn-success mt-2 mb-2">
                  Add
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
        <h1 class="text-center">Event List</h1>
        <div className="d-flex justify-content-center">
          <Link to="/admin-home">
            <button className="btn btn-success">Admin Dashboard</button>
          </Link>
        </div>
                
        <div class="container-fluid mt-5 mb-5">
          <table>
            <thead>
              <tr>
                <th class="header-cell">Event Name</th>
                <th class="header-cell">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEvents?.map((item, index) => (
                <>
                  <tr key={index}>
                    <td style={{ width: "60%" }}>
                      <h3>{item.event_name}</h3>
                      <p>Year - {item.event_year}</p>
                      <p>{item.event_desc}</p>
                    </td>

                    <td style={{ width: "40%" }}>
                      <div className="container d-flex flex-row justify-content-evenly">
                        <button
                          class="btn btn-primary mx-1"
                          onClick={() => handleEventImagesView(item.event_name)}
                        >
                          View Images
                        </button>
                        <button
                          class="btn btn-success mx-1"
                          onClick={() => {
                            setSelectedEvent({
                              name: item.event_name,
                              year: item.event_year,
                            });
                            openPopup();
                          }}
                        >
                          Upload Images
                        </button>
                        <button
                          class="btn btn-warning mx-1"
                          onClick={() => {
                            openUpdatePopup(item);
                          }}
                        >
                          Edit Event
                        </button>
                        <button
                          class="btn btn-danger mx-1"
                          style={{ backgroundColor: "#ff3f34" }}
                          onClick={() => handleEventList(item.event_id)}
                        >
                          Delete Event
                        </button>
                      </div>
                    </td>
                  </tr>
                  {popupVisible && eventSelect && (
                    <Popup
                      eventId={eventSelect.event_id}
                      eventName={eventSelect.event_name}
                      eventYear={eventSelect.event_year}
                      eventDesc={eventSelect.event_desc}
                    />
                  )}
                </>
              ))}
            </tbody>
          </table>
          <div className="pagination-section mt-3">
            <div className="pagination">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="btn btn-danger"
              >
                Previous
              </button>
              <span className="fs-4 mx-3">{currentPage}</span>
              <button
                onClick={nextPage}
                className="btn btn-success"
                disabled={currentEvents.length < eventsPerPage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AllListItems;
const Container = styled.div`
  background-color: #c9d7e;
  height: 100%;
  @media screen and (max-width: 500px) {
    width: fit-content;
  }
  // width: fit-content;
  .headDiv {
    background: #ff3f34;
    padding: 1rem 0;
    color: white;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #ccc;
    background-color: #ffffff6b;
  }

  thead {
    background-color: red;
  }

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
  }

  th.header-cell {
    background-color: #4d4dff;
    /* Change to your preferred color */
    color: white;
  }
  .pagination-section {
    float: right;
  }

  h1 {
    font-family: "Bricolage Grotesque", sans-serif;
  }

  p {
    margin: 0;
  }
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
    background-color: #00000012;
    z-index: 1;
  }

  .popup {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  #
`;
