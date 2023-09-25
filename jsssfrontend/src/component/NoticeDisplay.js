import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const NoticeDisplay = ({ items }) => {
  const maxVisibleItems = 4;
  const [noticeData, setNoticeData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:4000/api/auth/getallNotice") // Replace with your API URL
      .then((response) => response.json())
      .then((data) => setNoticeData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div>
      <Header />
      <div className="text-center">
        <h2 className="text-primary py-2 fw-bold">Notice Board</h2>
      </div>
      <div className="container">
        <table class="table">
          <thead class="table-dark">
            <tr>
              <th>Notice</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {noticeData.map((item, index) => (
              <tr key={index}>
                <td>{item.notice}</td>
                <td>
                  <a href={item.link_url} target="_blank" rel="noopener noreferrer">
                    {item.link_url}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default NoticeDisplay;


