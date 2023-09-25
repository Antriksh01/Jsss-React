import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const GalleryUpdate = ({ year, event }) => {
  const [imageFile, setImageFile] = useState([]);
  const [img_name, setImgName] = useState("");
  const [imgYear, setImgYear] = useState("");
  const [imgEvent, setImgEvent] = useState("");
  const [price, setPrice] = useState("");
  const [eventsList, setEventsList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [selectedItem, setSelectedItem] = useState({ img_name: "", price: "" });
  const [popupVisible, setPopupVisible] = useState(false);
  //   const [renderCount, setRenderCount] = useState(0);

  // console.log(year, event);

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

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const openUpdatePopup = (item) => {
    setSelectedItem(item);
    console.log(item.item_id);
    setPopupVisible(true);
  };

  const closeUpdatePopup = () => {
    setSelectedItem({ img_name: "", price: "" }); // Reset the selectedItem
    setPopupVisible(false);
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
    formData.append("year", imgYear);
    formData.append("event", imgEvent);

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

  const filteredImages = allImages.filter((image) => {
    return image.year === year && image.event === event;
  });

  // console.log(filteredImages);

  useEffect(() => {
    if (filteredImages) {
      getImages();
    }
  }, [filteredImages]);

  const handleImageDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/auth/deleteImages/${id}`
      );
      cogoToast.success("images deleted successfully");
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const Popup = ({ selectedItem, onClose }) => {
    const [updatedImgName, setUpdatedImgName] = useState(selectedItem.img_name);
    const [updatedPrice, setUpdatedPrice] = useState(selectedItem.price);
    console.log(updatedImgName);

    // console.log(selectedItem.item_id);
    // console.log(selectedItem);
    const handleUpdateImage = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.put(
          `http://localhost:4000/api/auth/update-image/${selectedItem.item_id}`,
          { img_name: updatedImgName, price: updatedPrice }
        );
        // console.log(res);
        cogoToast.success("Image Updated Successfully");
        onClose(); // Close the popup after successful update
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div className={`popup-container${popupVisible ? " active" : ""}`}>
        <div className="popup">
          <h2>Update image details</h2>
          <form className="d-flex flex-column" onSubmit={handleUpdateImage}>
            <div className="d-flex justify-content-evenly flex-column">
              <label htmlFor="imgName" className="fw-bold">
                Image Name
              </label>
              <input
                type="text"
                placeholder="Image name"
                className="mb-3 rounded p-1"
                value={updatedImgName}
                onChange={(e) => setUpdatedImgName(e.target.value)}
              />
              <label htmlFor="imgPrice" className="fw-bold">
                Image Price
              </label>
              <input
                type="text"
                placeholder="Image Price"
                className="mb-3 rounded p-1"
                name="imgPrice"
                value={updatedPrice}
                onChange={(e) => setUpdatedPrice(e.target.value)}
              />

              <button type="submit" className="btn btn-success mt-2 mb-2">
                update
              </button>
              <button
                type="button"
                className="btn btn-danger mt-2"
                onClick={onClose}
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
    <>
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
                  value={imgYear}
                  maxLength={4}
                  onChange={(e) => setImgYear(e.target.value)}
                />
                <label htmlFor="imgEvent" className="fw-bold">
                  Event (ex:independance_day)
                </label>
                {/* <input
                  type="text"
                  placeholder="Image event"
                  className="mb-3 rounded p-1"
                  name="imgEvent"
                  value={imgEvent}
                  onChange={(e) => setImgEvent(e.target.value)}
                /> */}
                <select
                  className="mb-3 rounded p-1"
                  name="imgEvent"
                  value={imgEvent}
                  onChange={(e) => setImgEvent(e.target.value)}
                >
                  <option value="">Select an Image Event</option>
                  {eventsList.map((event) => (
                    <option value={event.event_name}>{event.event_name}</option>
                  ))}
                </select>

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
        <div className="container">
          <button className="btn btn-danger" onClick={openPopup}>
            Add new Images
          </button>

          <div className="container mt-5 d-flex card-row">
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
                    <p class="card-text text-center m-0"> year : {item.year}</p>
                    <p class="card-text text-center m-0">
                      {" "}
                      event : {item.event}
                    </p>

                    <div className="d-flex justify-content-evenly flex-column">
                      <button
                        class="btn btn-danger mb-1"
                        onClick={() => handleImageDelete(item.item_id)}
                      >
                        Delete
                      </button>
                      <button
                        class="btn btn-warning"
                        onClick={() => openUpdatePopup(item)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  {/* <Popup
                    selectedItem={selectedItem}
                    onClose={closeUpdatePopup}
                  /> */}
                </div>
                {popupVisible && (
                  <Popup
                    selectedItem={selectedItem}
                    onClose={closeUpdatePopup}
                  />
                )}
              </>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default GalleryUpdate;
const Container = styled.div`
  height: 100%;

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
  .img-height {
    height: 10rem !important;
    border-radius: 2rem 2rem 0 0;
  }
  .card-td {
    border-radius: 2rem;
    background-color: #e0e0e0;
    border: none;
    box-shadow: 1px 1px 20px #000;
    width: 18rem;
    margin-bottom: 1rem;
    @media screen and (max-width: 500px) {
      width: 100%;
    }
    @media screen and (min-width: 501px) and (max-width: 900px) {
      width: 20rem;
    }
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  }
  .card-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 2rem;
  }
`;
