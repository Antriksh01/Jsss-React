import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../Layout/Layout";
import { Dropdown, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import cogoToast from "cogo-toast";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/Index";
import FirstYear from "../component/GalleryYearWise/FirstYear";
import EventOne from "../component/GalleryEventWise.js/EventOne";
import bannerImage from "./../Images/banner.png";

const Gallery = () => {
  const [allImages, setAllImages] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2023");

  const [totalCartItems, setTotalCartItems] = useState(0);
  const [eventsList, setEventsList] = useState([]);

  const [auth] = useAuth();
  // const [cart, setCart] = useCart();
  const navigate = useNavigate();
  // // console.log(auth.user.id);

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

  console.log(eventsList);
  useEffect(() => {
    getEventData();
  }, []);

  const getImages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/auth/getallImages"
      );
      setAllImages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (item) => {
    try {
      const userId = auth.user.id;
      const itemData = item.item_id;
      console.log(userId, itemData);
      // Backend: Send request to add item to the user's cart
      const response = await axios.post(
        "http://localhost:4000/api/auth/add-to-cart",
        {
          item: {
            id: itemData,
          },
          userId: userId,
        }
      );

      console.log(response);
      if (response.status === 200) {
        // Update local state or context after successful API call
        const updatedCartItems = [...cartItems, item];
        console.log(updatedCartItems);
        setCartItems(updatedCartItems);
        cogoToast.success("Item Added to Cart!");
      }
    } catch (error) {
      console.log(error);
      cogoToast.error("Item already added to the cart");
    }
  };

  const logoutHandler = (e) => {
    // get-request
    localStorage.removeItem("auth");
    navigate("/gallery-login");
    window.location.reload();
  };

  const getAllCartItems = async () => {
    console.log("clicked");
    console.log(auth.user?.id);
    try {
      const res = await axios.get(
        `http://localhost:4000/api/auth/getCartItems/${auth.user.id}`
      );
      console.log(res);
      const itemCount = res.data.length; // Check the item count
      setTotalCartItems(itemCount);
    } catch (error) {
      console.log(error);
    }
  };

  const datause = auth.user;
  console.log(datause);
  console.log(totalCartItems);
  useEffect(() => {
    const fetchCartData = async () => {
      if (datause) {
        await getAllCartItems();
      }
    };

    const pollInterval = 2000; // Poll every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchCartData, pollInterval);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [datause]);

  useEffect(() => {
    getImages();
  }, []);

  const lastEvent =
    eventsList.length > 0
      ? eventsList[eventsList.length - 1]
      : "No events available";

  console.log(lastEvent.event_name);
  const [selectedEvent, setSelectedEvent] = useState("");

  useEffect(() => {
    setSelectedEvent(lastEvent.event_name);
  }, [lastEvent.event_name]);

  console.log(selectedEvent);

  return (
    <>
      <Container>
        <Layout title={"Gallery - Joy Senior Secondary School"}>
          <div className="hdiv">
            <div className="bannerGallery">
              <img src={bannerImage} alt="gallery-banner" />
            </div>
            <div className="container h1-cont">
              {/* <h1>Student Gallery</h1> */}
            </div>
          </div>
          <div className="container pt-5">
            <h1>Student Gallery</h1>
            <Link to={{ pathname: "/cartPage", state: { cartItems } }}>
              <button type="button" className="btn btn-primary">
                Your cart{" "}
                <span className="badge badge-light bg-dark">
                  {totalCartItems}
                </span>
              </button>
            </Link>
            <button onClick={logoutHandler} className="btn btn-danger m-3">
              Logout
            </button>

            <div className="container d-flex justify-content-center me-3">
              <Dropdown
                onSelect={(selectedKey) => setSelectedYear(selectedKey)}
                className="mx-2"
              >
                <Dropdown.Toggle variant="dark" id="galleryEventDropdown">
                  {selectedYear ? selectedYear : "2023"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="2023">2023</Dropdown.Item>
                  <Dropdown.Item eventKey="2024">2024</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="hrbrd"></div>

              <Dropdown
                onSelect={(selectedKey) => setSelectedEvent(selectedKey)}
              >
                <Dropdown.Toggle variant="success" id="galleryEventDropdown">
                  {selectedEvent ? selectedEvent : lastEvent.event_name}
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

            {/* <div
              className="container mt-5 d-flex card-row"
              onContextMenu={handleContextMenu}
            >
              {allImages?.map((item, index) => (
                <>
                  <div class="card" style={{ width: "18rem" }} key={index}>
                    <img
                      class="card-img-top img-height"
                      src={item.image}
                      alt="Card cap"
                    />
                    <div class="card-body">
                      <h5 class="card-title text-center m-0">
                        {item.img_name}
                      </h5>
                      <p class="card-text text-center m-0"> ₹ {item.price}</p>

                      <div className="d-flex justify-content-evenly flex-column">
                        <button
                          class="btn btn-primary mb-1"
                          onClick={() => addToCart(item)}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div> */}
          </div>
        </Layout>
      </Container>
    </>
  );
};

export default Gallery;
const Container = styled.div`
  background: url("");
  .bannerGallery {
    height: 35rem;
    width: 100%;
    position: absolute;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .h1-cont {
    h1 {
      position: relative;
      text-align: center;
      padding-top: 10rem;
      font-size: 7rem;
      // text-shadow: 1px 15px 13px #00e8ff;
      font-size: 7rem;
      font-family: "Bricolage Grotesque", sans-serif;
      color: #21505c;
    }
  }
  .navsect {
    background-color: transparent;
  }
  .hdiv {
    height: 35rem;
  }
  .navlink {
    background-color: #3d3f99;
    border-radius: 0.5rem;
    border-bottom: 1px solid black;
    color: white;
    margin-bottom: 1rem;
    width: 8rem;
    height: 4rem;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
  .navlink::before {
    background-color: red;
  }

  .active {
    background-color: #f53237;
  }
  .img-height {
    height: 10rem !important;
    // border-radius: 2rem 2rem 0 0;
    transition: 0.25s ease;
    // &:hover {
    //   transform: scale(1.1);
    // }
  }
  .card-td {
    border-radius: 0.5rem;
    background-color: #e0e0e0;
    border: none;
    box-shadow: 0 8px 8px -4px lightblue;
    width: 18rem;
    margin-bottom: 1rem;
    @media screen and (max-width: 500px) {
      width: 100%;
    }
    @media screen and (min-width: 501px) and (max-width: 900px) {
      width: 20rem;
    }
    transition: 0.25s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
  .card-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 1rem;
  }
`;
