// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { styled } from "styled-components";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import cogoToast from "cogo-toast";
// // import Popup from "../GalleryUpdate";


// const AdminViewImages = () => {
//   const { event_name } = useParams();
//   const [allImages, setAllImages] = useState([]);
//   // const [selectedItem, setSelectedItem] = useState({ img_name: "", price: "" });
//   // const [popupVisible, setPopupVisible] = useState(false);
//   console.log(event_name);

//   const getImages = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:4000/api/auth/getAllImagesViaEventName/${event_name}`
//       );
//       console.log(res.data);
//       setAllImages(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getImages();
//   }, []);

//   const handleImageDelete = async (id) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:4000/api/auth/deleteImages/${id}`
//       );
//       cogoToast.success("images deleted successfully");
//       window.location.reload();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//     // Define functions to open and close the popup for image updates
//     // const openUpdatePopup = (item) => {
//     //   setSelectedItem(item);
//     //   setPopupVisible(true);
//     // };
  
//     // const closeUpdatePopup = () => {
//     //   setSelectedItem({ img_name: "", price: "" });
//     //   setPopupVisible(false);
//     // };
//   return (
//     <>
//       <Container>
//         <h1 class="text-center">View Images</h1>
//         <div className="d-flex justify-content-center">
//           <Link to="/admin-home">
//             <button className="btn btn-success">Admin Dashboard</button>
//           </Link>
//         </div>
//         <div className="container mt-5">
//           <div className="row">
//             {allImages?.map((item, index) => (
//               <div className="col-md-4" key={index}>
//                 <div class="card card-td">
//                   <img
//                     class="card-img-top img-height"
//                     src={item.image}
//                     alt="Card cap"
//                   />
//                   <div class="card-body">
//                     <h5 class="card-title text-center m-0">{item.img_name}</h5>
//                     <p class="card-text text-center m-0"> ₹ {item.price}</p>
//                     <p class="card-text text-center m-0"> year : {item.year}</p>
//                     <p class="card-text text-center m-0">
//                       {" "}
//                       event : {item.event}
//                     </p>

//                     <div className="d-flex justify-content-evenly flex-column">
//                       <button
//                         class="btn btn-danger mb-1"
//                         onClick={() => handleImageDelete(item.item_id)}
//                       >
//                         Delete
//                       </button>
//                       <button
//                         class="btn btn-warning"
//                         // onClick={() => openUpdatePopup(item)}  
//                       >
//                         Edit
//                       </button>
//                     </div>
//                   </div>
//                   {/* <Popup
//               selectedItem={selectedItem}
//               onClose={closeUpdatePopup}
//             /> */}
//                 </div>
//                 {/* {popupVisible && (
//           <Popup selectedItem={selectedItem} onClose={closeUpdatePopup} />
//         )} */}
//               </div>
//             ))}
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default AdminViewImages;
// const Container = styled.div`
//   img {
//     height: 15rem;
//   }
// `;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import cogoToast from "cogo-toast";

const AdminViewImages = () => {
  const { event_name } = useParams();
  const [allImages, setAllImages] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const [img_name, setImgName] = useState("");
  const [imgYear, setImgYear] = useState("");
  const [imgEvent, setImgEvent] = useState("");
  const [price, setPrice] = useState("");
  const [eventsList, setEventsList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState({ img_name: "", price: "" });
  const [popupVisible, setPopupVisible] = useState(false);
  console.log(event_name);

  const getImages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/auth/getAllImagesViaEventName/${event_name}`
      );
      console.log(res.data);
      setAllImages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  const handleImageDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/auth/deleteImages/${id}`
      );
      cogoToast.success("images deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
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

  const Popup = ({ selectedItem, onClose }) => {
    const [updatedImgName, setUpdatedImgName] = useState(selectedItem.img_name);
    const [updatedPrice, setUpdatedPrice] = useState(selectedItem.price);
    console.log(updatedImgName);

    console.log(selectedItem.item_id);
    console.log(selectedItem);
    const handleUpdateImage = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.put(
          `http://localhost:4000/api/auth/update-image/${selectedItem}`,
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
        <h1 class="text-center">View Images</h1>
        <div className="d-flex justify-content-center">
          <Link to="/admin-home">
            <button className="btn btn-success">Admin Dashboard</button>
          </Link>
        </div>
        <div className="container mt-5">
          <div className="row">
            {allImages?.map((item, index) => (
              <div className="col-md-4" key={index}>
                <div class="card card-td">
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
                        class="btn btn-primary"
                        onClick={() => openUpdatePopup(item.item_id)}
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
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminViewImages;
const Container = styled.div`
  img {
    height: 15rem;
  }

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
`;