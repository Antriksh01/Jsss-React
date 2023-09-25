import React, { useEffect, useState } from "react";
// import Layout from "../Layout/Layout";
import { styled } from "styled-components";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ViewReceipt = () => {
  const [details, setDetails] = useState([]);
  const [currentAge, setCurrentAge] = useState(null);
  const [receipt, setReceipt] = useState([]);
  const { id } = useParams();
  console.log(id);

  const getLastData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/auth/getReceiptViaID/${id}`
      );
      console.log(res.data);
      setDetails(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(details);
  useEffect(() => {
    getLastData();
  }, []);

  function printDocument() {
    const printContents =
      document.getElementById("printable-section").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  console.log(details.date_of_birth);
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

  console.log(details);
  console.log(currentAge);

  console.log(details.time);
  const dateString = details.time;
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = dateObj.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);

  return (
    <>
      <Container>
        <div id="printable-section">
          <div className="container receiptBox mt-3 border">
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
                      <h2
                        className="text-center"
                        style={{ fontSize: "1.2rem" }}
                      >
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
                {/* <p className="text-end mb-0">
                  Application Date : {formattedDate}
                </p> */}
              </div>
            </div>
            <div className="secondSec border-bottom">
              <div className="row mt-2">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                        <h4 className="text-start">Receipt No.</h4>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                        <p className="mt-2 text-start">: {details.pay_id}</p>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                        <h4 className="text-start">Candidate's Name</h4>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                        <p className="mt-2 text-start">
                          : {details.firstname + " " + details.lastname}
                        </p>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                        <h4 className="text-start">Form No. </h4>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                        <p className="mt-2 text-start">: {details.receipt}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                        <h4 className="text-start">Date</h4>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                        <p className="mt-2 text-start">: {formattedDate}</p>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                        <h4 className="text-start">Class</h4>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                        <p className="mt-2 text-start">
                          : {details.class_for_admission}
                        </p>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                        <h4 className="text-start">Father's Name</h4>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                        <p className="mt-2 text-start">
                          : Mr. {details.father_name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="descrpt border-bottom">
              <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-6 ">
                  <h5>Description</h5>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 border-left">
                  <h5>Paid Amount</h5>
                </div>
              </div>
            </div>
            <div className="descrpt border-bottom">
              <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-6">
                  <p className="text-start mt-2">Registration Fee</p>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 border-left">
                  <p className="mt-2 amt">750.00</p>
                </div>
              </div>
            </div>
            <div className="text-center border-top border-bottom mt-5">
              <h5>Payment Mode</h5>
            </div>
            <div className="paymode">
              <div className="row">
                <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1"></div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
                  <h6 className="mt-2">Pay Mode</h6>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 border">
                  <h6 className="mt-2">Bank</h6>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 border">
                  <h6 className="mt-2">Chq/DD No.</h6>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 border">
                  <h6 className="mt-2">Date</h6>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 ">
                  <h6 className="mt-2">Amount</h6>
                </div>
                <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1"></div>
              </div>
            </div>
            <div className="paymode">
              <div className="row">
                <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 border-top"></div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 border-top">
                  <h6 className="mt-2">Online/UPI</h6>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 border">
                  {/* <h6 className="mt-2"></h6> */}
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 border">
                  {/* <h6 className="mt-2">Chq/DD No.</h6> */}
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 border">
                  {/* <h6 className="mt-2">Date</h6> */}
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 border-top">
                  <h6 className="mt-2">750.00</h6>
                </div>
                <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 border-top"></div>
              </div>
            </div>
            <div className="d-flex border-top justify-content-evenly">
              <span>
                <strong>Total in words :</strong> Seven Hundred Fifty Rupees
                Only
              </span>
              <span>
                <strong>Total :</strong> 750.00
              </span>
            </div>
            <div className="border-top">
              <div className="row">
                <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-7 border-left">
                  <h6 className="pt-5 text-start">
                    Received By : Joy Senior Secondary School
                  </h6>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5 border-left">
                  <h6 className="pt-5 text-center">Signature</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mb-2">
          <button className="btn btn-success mt-5" onClick={printDocument}>
            Print
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

export default ViewReceipt;
const Container = styled.div`
  .sideLogo {
    height: 7rem;
  }
  .receiptBox {
    border: 1px solid black;
  }
  .border-left {
    border-left: 1px solid grey;
  }
  @media print {
    /* Set the page size to match the content size */
    @page {
      size: auto;
      margin: 3rem;
      padding: 3rem;
    }

    .amt {
      padding-right: 3rem;
    }
    /* Hide unnecessary elements */
    body * {
      visibility: hidden;
    }

    /* Display only the printable section */
    #printable-section,
    #printable-section * {
      visibility: visible;
    }
    .sideLogo {
      height: 1rem;
      width: 1rem;
    }
    .receiptBox {
      border: 1px solid black;
    }
    .border-left {
      border-left: 1px solid grey;
    }
  }
`;
