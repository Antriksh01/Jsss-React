import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import cogoToast from "cogo-toast";

const NoticeBoardUpdate = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [noticeData, setNoticeData] = useState("");
  const [noticeLink, setNoticeLink] = useState("");
  const [allNotice, setAllNotice] = useState([]);
  const [selectedItem, setSelectedItem] = useState({ notice: "" });
  const [popupVisible, setPopupVisible] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const openUpdatePopup = (index, item) => {
    setSelectedItem(item);
    setPopupVisible(true);
  };

  const closeUpdatePopup = () => {
    setPopupVisible(false);
  };

  // create notice
  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/createNotice",
        {
          noticeText: noticeData.noticeText,
          linkURL: noticeData.linkURL,
        }
      );
      console.log(response.data);
      cogoToast.success("notice created");
      window.location.reload();
      setShowPopup(false);
    } catch (error) {
      console.log(error);
    }
  };

  //   getallnotice
  const getAllNotice = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/auth/getAllNotice"
      );
      setAllNotice(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(allNotice);
  useEffect(() => {
    getAllNotice();
  }, []);

  const noticeDelete = async (id) => {
    // e.preventDefault();
    console.log(selectedItem.id);
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/auth/noticeDelete/${id}`
      );
      if (res.status === 200) {
        cogoToast.success("Notice deleted successfully");
        window.location.reload();
      } else {
        cogoToast.error("Failed to delete notice");
      }
    } catch (error) {
      if (error.response) {
        console.log(
          "Server responded with:",
          error.response.status,
          error.response.data
        );
      } else {
        console.log("Request error:", error.message);
      }
    }
  };

  // const Popup = ({ selectedItem, onClose, closeUpdatePopup }) => {
  //   const [noticeText, setNoticeText] = useState(selectedItem.notice);
  //   console.log(selectedItem.id);
  //   console.log(noticeText);
  //   const handleUpdateNotice = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const res = await axios.put(
  //         `http://localhost:4000/api/auth/updateNotice/${selectedItem.id}`,
  //         {
  //           noticeText: noticeData.noticeText,
  //           linkURL: noticeData.linkURL,
  //         }
  //       );
  //       console.log(res);
  //       cogoToast.success("Notice Updated Successfully");
  //       setPopupVisible(false);
  //       window.location.reload();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   return (
  //     <div className={`popup-container${popupVisible ? " active" : ""}`}>
  //       <div className="popup">
  //         <h2>Update Notice</h2>
  //         <form className="d-flex flex-column" onSubmit={handleUpdateNotice}>
  //         <textarea
  //             id="noticeText"
  //             rows="4"
  //             cols="50"
  //             required
  //             value={noticeData.noticeText}
  //             onChange={(e) =>
  //               setNoticeData({
  //                 ...noticeData,
  //                 noticeText: e.target.value,
  //               })
  //             }
  //           />
  //           <input
  //             type="url"
  //             placeholder="Link URL"
  //             value={noticeData.linkURL}
  //             onChange={(e) =>
  //               setNoticeData({
  //                 ...noticeData,
  //                 linkURL: e.target.value,
  //               })
  //             }
  //           />
  //           <div className="d-flex justify-content-evenly">
  //             <button type="submit" className="btn btn-success mt-2">
  //               Update
  //             </button>
  //             <button
  //               type="button"
  //               className="btn btn-danger mt-2"
  //               onClick={onClose}
  //             >
  //               Cancel
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // };

  const Popup = ({ selectedItem, onClose, closeUpdatePopup }) => {
    const [noticeText, setNoticeText] = useState(selectedItem.notice);
    const [linkURL, setLinkURL] = useState(selectedItem.link_url);

    const handleUpdateNotice = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.put(
          `http://localhost:4400/api/auth/updateNotice/${selectedItem.id}`,
          {
            noticeText: noticeText,
            linkURL: linkURL,
          }
        );
        console.log(res);
        cogoToast.success("Notice Updated Successfully");
        setPopupVisible(false);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div className={`popup-container${popupVisible ? " active" : ""}`}>
        <div className="popup">
          <h2>Update Notice</h2>
          <form className="d-flex flex-column" onSubmit={handleUpdateNotice}>
            <textarea
              id="noticeText"
              rows="4"
              cols="50"
              required
              value={noticeText}
              onChange={(e) => setNoticeText(e.target.value)}
            />
            <input
              type="url"
              placeholder="Link URL"
              value={linkURL}
              onChange={(e) => setLinkURL(e.target.value)}
            />
            <div className="d-flex justify-content-evenly">
              <button type="submit" className="btn btn-success mt-2">
                Update
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
        <h1 class="text-center">Notice Board</h1>
        <button className="btn btn-danger m-3" onClick={openPopup}>
          New Notice
        </button>
        {/* pop-up for creating notice */}
        <div className={`popup-container${showPopup ? " active" : ""}`}>
          <div className="popup">
            <h2>Create Notice</h2>
            <form className="d-flex flex-column" onSubmit={handleNoticeSubmit}>
              <textarea
                id="noticeText"
                rows="4"
                cols="50"
                required
                value={noticeData.noticeText}
                onChange={(e) =>
                  setNoticeData({
                    ...noticeData,
                    noticeText: e.target.value,
                  })
                }
              />
              <input
                type="url"
                placeholder="Link URL"
                value={noticeData.linkURL}
                onChange={(e) =>
                  setNoticeData({
                    ...noticeData,
                    linkURL: e.target.value,
                  })
                }
              />
              <div className="d-flex justify-content-evenly">
                <button type="submit" className="btn btn-success mt-2">
                  Create
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

        {/* popup for updating notice */}

        <div class="container mt-2 mb-5">
          <table>
            <thead>
              <tr>
                <th class="header-cell">Notice</th>
                <th class="header-cell">Update/Delete</th>
              </tr>
            </thead>
            <tbody>
              {allNotice?.map((item, index) => (
                <>
                  <tr key={index}>
                    <td style={{ width: "80%" }}>
                      {" "}
                      <h5>{item.notice}</h5> <br />
                      <p>{item.link_url}</p>
                    </td>
                    <td style={{ width: "20%" }}>
                      <button
                        class="btn btn-warning"
                        onClick={() => openUpdatePopup(index, item)}
                        style={{ width: "80%" }}
                      >
                        Edit
                      </button>
                      <br />
                      <button
                        class="btn btn-danger mt-2"
                        style={{ backgroundColor: "#ff3f34", width: "80%" }}
                        onClick={() => noticeDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  <Popup
                    selectedItem={selectedItem}
                    onClose={closeUpdatePopup}
                  />
                </>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
};

export default NoticeBoardUpdate;
const Container = styled.div`
  height: 100vh;
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
    background-color: #00b894;
    /* Change to your preferred color */
    color: white;
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
    background-color: #00000075;
  }

  .popup {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;
