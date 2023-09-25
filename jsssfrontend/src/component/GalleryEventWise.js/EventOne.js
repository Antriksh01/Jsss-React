import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useAuth } from "../../context/Index";
import cogoToast from "cogo-toast";

const EventOne = (year, event) => {
  const [allImages, setAllImages] = useState([]);
  const [auth] = useAuth();
  const [cartItems, setCartItems] = useState([]);

  console.log(year.year);
  console.log(event);

  const getImages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/auth/getallImages"
      );
      console.log(res.data);
      setAllImages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredImages = allImages.filter((image) => {
    return image.year === year.year && image.event === year.event;
  });

  console.log(filteredImages);

  const addToCart = async (item) => {
    console.log("clicked");
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
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
      cogoToast.error("Item already added to the cart");
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent the default context menu from showing
    return false;
  };
  return (
    <>
      <Container>
        <div
          className="container mt-5 d-flex card-row"
          onContextMenu={handleContextMenu}
        >
          {filteredImages?.map((item, index) => (
            <>
              <div class="card card-td" key={index}>
                <img
                  class="card-img-top img-height"
                  src={item.image}
                  alt="Card cap"
                />
                <div class="card-body">
                  <h5 class="card-title text-center m-0">{item.img_name}</h5>
                  <p class="card-text text-center m-0"> ₹ {item.price}</p>

                  <div className="d-flex justify-content-evenly flex-column">
                    <button
                      class="btn btn-danger mb-1"
                      onClick={() => addToCart(item)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </Container>
    </>
  );
};

export default EventOne;
const Container = styled.div``;
