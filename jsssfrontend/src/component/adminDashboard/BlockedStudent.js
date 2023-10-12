import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const BlockedStudent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [mobile, setMobile] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const insertStudentData = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:4000/api/auth/addBlockedStudent",
      {
        student_name: studentName,
        father_name: fatherName,
        mother_name: motherName,
        mobile,
      }
    );
    console.log(response.data);
    cogoToast.success("student added successfully");
    closePopup();
  };

  const getStudentList = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/auth/blockedStudentList"
      );
      console.log(res.data);
      setStudentList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/auth/deleteStudentFromBlock/${id}`
      );

      console.log(response);
      cogoToast.success("student deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudentList();
  }, []);

  return (
    <>
      <Container>
        <div className={`popup-container${showPopup ? " active" : ""}`}>
          <div className="popup">
            <h2 className="text-center">Add Image</h2>
            <form
              className="d-flex flex-column"
              onSubmit={insertStudentData}
              enctype="multipart/form-data"
            >
              <div className="d-flex justify-content-evenly flex-column">
                <label htmlFor="studentName" className="fw-bold">
                  Student Name
                </label>
                <input
                  type="text"
                  placeholder="Student name"
                  className="mb-3 rounded p-1"
                  name="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
                <label htmlFor="fathername" className="fw-bold">
                  Father Name
                </label>
                <input
                  type="text"
                  placeholder="Father Name"
                  className="mb-3 rounded p-1"
                  name="fathername"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  required
                />
                <label htmlFor="motherName" className="fw-bold">
                  Mother Name
                </label>
                <input
                  type="text"
                  placeholder="Mother Name"
                  className="mb-3 rounded p-1"
                  name="motherName"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  required
                />
                <label htmlFor="Mobile" className="fw-bold">
                  Mobile
                </label>
                <input
                  type="text"
                  placeholder="Mobile"
                  className="mb-3 rounded p-1"
                  name="Mobile"
                  value={mobile}
                  maxLength={10}
                  minLength={10}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />

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
        <h1 className="text-center">Blocked Students Details</h1>
        <div className="container mt-5 mb-5">
          <button className="btn btn-danger mb-1" onClick={openPopup}>
            Add New Student
          </button>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th className="header-cell">Student Name</th>
                  <th className="header-cell">Father's Name</th>
                  <th className="header-cell">Mother's Name</th>
                  <th className="header-cell">Mobile No.</th>
                  <th className="header-cell">More Details</th>
                </tr>
              </thead>
              <tbody>
                {studentList?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Student_Name}</td>
                    <td>{item.Father_Name}</td>
                    <td>{item.Mother_Name}</td>
                    <td>{item.Mobile}</td>
                    <td>
                      <div className="d-flex justify-content-evenly">
                        <button
                          class="btn btn-danger"
                          onClick={() => deleteStudent(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div className="pagination-section mt-3">
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
                disabled={currentStudents.length < studentsPerPage}
              >
                Next
              </button>
            </div>
          </div> */}
        </div>
      </Container>
    </>
  );
};

export default BlockedStudent;
const Container = styled.div`
  height: 100vh;
  width: 95%;

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
  .headDiv {
    background: #ff3f34;
    padding: 1rem 0;
    color: white;
  }

  .table-container {
    overflow-x: auto;
    max-width: 100%;
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
  .pagination-section {
    float: right;
  }
`;
