import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { format, parseISO } from "date-fns";

const ViewStudentData = () => {
  const [details, setDetails] = useState([]);
  const [currentAge, setCurrentAge] = useState(null);
  const [regDate, setRegDate] = useState("");
  const { id } = useParams();

  const getSelectedStudentData = async () => {
    console.log(id);
    try {
      const res = await axios.get(
        `http://localhost:4000/api/auth/getstudentviaid/${id}`
      );
      setDetails(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSelectedStudentData();
  }, []);

  console.log(details);

  function printDocument() {
    const printContents =
      document.getElementById("printable-section").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    document.body.classList.add("print-mode");
    window.print();
    document.body.innerHTML = originalContents;
  }

  // console.log(details.date_of_birth);
  useEffect(() => {
    if (details.date_of_birth) {
      const dob = new Date(details.date_of_birth);
      const currentDate = new Date();

      const yearDiff = currentDate.getFullYear() - dob.getFullYear();
      const monthDiff = currentDate.getMonth() - dob.getMonth();
      const dayDiff = currentDate.getDate() - dob.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        setCurrentAge(yearDiff - 1);
      } else {
        setCurrentAge(yearDiff);
      }
    }
  }, [details.date_of_birth]);

  console.log(currentAge);

  console.log(details.time);
  const dateString = details.time;
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = dateObj.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);

  const downloadBirthCertificate = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/auth/getStudentBirthCertificateviaId/${id}`,
        {
          responseType: "blob", // Request binary data
        }
      );

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Open the URL in a new tab
      window.open(url, "_blank");

      // Release the URL when it's no longer needed to free up memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <button
          className="btn btn-success m-3"
          style={{ float: "right" }}
          onClick={printDocument}
        >
          Print
        </button>
        <div id="printable-section">
          <div className="headimg">
            <div className="pt-1 pb-1">
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3">
                  <div className="d-flex justify-content-center">
                    <img
                      src="https://res.cloudinary.com/dsujv9zbq/image/upload/v1695391166/Untitled_design__2_-removebg-preview_x4uxij.png"
                      alt="jsss"
                      width="120px"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="titleWoj">
                    <h1
                      className="text-center mb-0"
                      style={{ fontSize: "1.5rem" }}
                    >
                      Joy Senior Secondary School
                    </h1>
                    <h1
                      className="text-center mb-0"
                      style={{ fontSize: "1.2rem" }}
                    >
                      Jabalpur
                    </h1>
                    <p className="text-center mb-0">
                      Phone No. : +91 7614055270 | Email : jssschool@gmail.com
                      Website : http://test.doaguru/jss.com
                    </p>
                    <h2 className="text-center" style={{ fontSize: "1.2rem" }}>
                      Registration Form({details.class_for_admission}) 2024 -
                      2025
                    </h2>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3">
                  <div className="d-flex justify-content-center">
                    <img
                      src="https://res.cloudinary.com/antrix/image/upload/v1690363004/unnamed-removebg-preview_cura3c.png"
                      alt="jsss"
                      width="120px"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-2 mb-1 mt-1">
              <p className="text-end mb-0">
                Application Date : {formattedDate}
              </p>
            </div>
          </div>
          <div className="student-section">
            <h3 className="mt-1 mb-1">STUDENT DETAILS</h3>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">
                      Class into which admission is sought:{" "}
                    </p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">
                    {details.class_for_admission}
                  </p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Student Name :</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">
                    {details.firstname + " " + details.lastname}
                  </p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">DOB:</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.date_of_birth}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">DOB in words:</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.dob_in_words}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>

            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Age</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{currentAge}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Gender</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.gender}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Religion</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.Religion}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Caste</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.caste}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Category</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.category}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Mobile No.</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.mobile}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Aadhar No.</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.adhar_number}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
          </div>
          {/* father */}
          <hr />
          <div className="student-section">
            <h3 className="mt-1 mb-1">FATHER'S DETAILS</h3>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Name: </p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.father_name}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">
                      Educational Qualification :
                    </p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">
                    {details.father_qualification}
                  </p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Occupation :</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.father_occupation}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Profession</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.father_profession}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Employer</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.father_employer}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Business details</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">
                    {details.father_business_details}
                  </p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Email</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.father_email}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Mobile</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.father_mobile}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Annual Income</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">
                    {details.father_annual_income}
                  </p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Residential Address</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">
                    {details.father_residential_address}
                  </p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Office Address</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">
                    {details.father_office_address}
                  </p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
          </div>
          {/* mother */}
          <hr />
          <div className="student-section">
            <h3 className="m-1 mb-1">MOTHER'S DETAILS</h3>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Name: </p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.mother_name}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">
                      Educational Qualification :
                    </p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">
                    {details.mother_qualification}
                  </p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Occupation :</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.mother_occupation}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Profession</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.mother_profession}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Employer</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.mother_employer}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Business details</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">
                    {details.mother_business_details}
                  </p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Email</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.mother_email}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Mobile</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.mother_mobile}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Annual Income</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">
                    {details.mother_annual_income}
                  </p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Residential Address</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">
                    {details.mother_residential_address}
                  </p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Office Address</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">
                    {details.mother_office_address}
                  </p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
          </div>

          {/* siblings details */}
          <hr />
          <div className=" student-section py-2">
            <h3 className="my-1" style={{ textDecoration: "underline" }}>
              Brother / Sister studying in Joy Sr. Sec. School, Jabalpur
            </h3>
            <h3 className="mb-0">Sibling details 1 :</h3>
            <div className=" mt-1">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Child Name: </p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.child_one_name}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Roll no :</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">
                    {details.child_one_addmission_no}
                  </p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Class :</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.child_one_class}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Section</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.child_one_section}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <h3 className="mb-0">Sibling details 2 :</h3>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Child Name :</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.child_two_name}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Roll No. :</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">
                    {details.child_two_addmission_no}
                  </p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Class :</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.child_two_section}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="row heightRow">
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"></div> */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
                  <div className="">
                    <p className="text-start mb-0">Section :</p>
                  </div>
                </div>
                <div
                  className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6"
                  style={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  {" "}
                  <p className="text-start mb-0">{details.child_two_section}</p>
                  {/* <hr /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-success mt-5 mb-2" onClick={printDocument}>
            Print
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-info mb-2"
            onClick={() => downloadBirthCertificate(details.id)}
          >
            Download Birth Certificate
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <Link to="/admin-home">
            <button className="btn btn-success">Admin Dashboard</button>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default ViewStudentData;
const Container = styled.div`
  .headimg {
    background-color: #fff;
  }
  .titleWoj {
    h1,
    h2,
    p {
      color: #7e7474;
    }
  }
  h3 {
    color: #3e409b;
  }

  .student-section {
    border: 1px solid black;
    margin-top: 5px;
    margin-right: 10px;
    margin-left: 10px;
    padding: 5px;
  }

  @media print {
    .heightRow {
      height: 1.2rem !important;
    }
    hr {
      margin: 0rem;
    }
  }

  // .heightRow {
  //   height: 1.2rem;
  // }

  // hr {
  //   margin: 0rem;
  // }
`;
