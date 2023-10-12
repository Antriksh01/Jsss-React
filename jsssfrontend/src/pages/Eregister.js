import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cogoToast from "cogo-toast";
import axios from "axios";
import useRazorpay, { RazorpayOptions } from "react-razorpay";

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject(new Error(`Failed to load script: ${src}`));
    };
    document.head.appendChild(script);
  });
};

const Eregister = () => {
  const navigate = useNavigate();
  const [paystatus, setPayStatus] = useState("pending");
  const [dob, setDob] = useState({
    date_of_birth: null,
    dob_in_words: "",
    Age: "",
  });

  const [Razorpay, isLoaded] = useRazorpay();
  const [birth_certificate, setBirthCertificate] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState({
    class_for_admission: "",
    present_school: "",
    present_class: "",
    present_school_city: "",
    firstname: "",
    lastname: "",
    mobile: "",
    gender: "",
    religion: "",
    caste: "",
    category: "",
    father_name: "",
    father_qualification: "",
    father_occupation: "",
    father_profession: "",
    father_email: "",
    father_mobile: "",
    father_annual_income: "",
    father_res_address: "",
    father_office_address: "",
    mother_name: "",
    mother_qualification: "",
    mother_occupation: "",
    mother_profession: "",
    mother_email: "",
    mother_mobile: "",
    mother_annual_income: "",
    mother_res_address: "",
    mother_office_address: "",
    first_childname: "",
    first_child_addmission_number: "",
    first_child_class: "",
    first_child_section: "",
    second_childname: "",
    second_child_addmission_number: "",
    second_child_class: "",
    second_child_section: "",
    adhar_number: "",
    date_of_birth: "",
    dob_in_words: "",
    Age: "",
    no_of_boys: "",
    No_of_girls: "",
  });

  // console.log(payStats);
  // const studentName = data.firstname + " " + data.lastname;
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    // Update the state when the checkbox is clicked
    setIsChecked(!isChecked);
  };

  const handleBirthCertificateChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Update the state with the selected file
      setBirthCertificate(selectedFile);
    }
  };

  console.log(birth_certificate);

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

  useEffect(() => {
    getStudentList();
  }, []);

  const handleSubmit = async (e, paymentStatus) => {
    e.preventDefault();

    const formData = new FormData();

    // Append user.data fields to formData
    for (const key in data) {
      formData.append(key, data[key]);
    }

    formData.append("birth_certificate", birth_certificate);
    console.log(data, birth_certificate);

    if (paymentStatus === "success") {
      setPayStatus(paymentStatus);
      try {
        const registerData = await axios.post(
          "http://localhost:4000/api/auth/e-register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(registerData);
        cogoToast.success("User registered successfully!");
        console.log(data, birth_certificate);
        navigate("/success-msg");

        setData({
          class_for_admission: "",
          present_school: "",
          present_class: "",
          present_school_city: "",
          firstname: "",
          middlename: "",
          lastname: "",
          date_of_birth: "date",
          dob_in_words: "",
          Age: "",
          gender: "",
          Religion: "",
          caste: "",
          category: "",
          mobile: "",
          // birth_certificate: "",
          no_of_boys: "",
          No_of_girls: "",
          adhar_number: "",
          father_name: "",
          father_qualification: "",
          father_occupation: "",
          father_profession: "",
          father_employer: "",
          father_business_details: "",
          father_email: "",
          father_mobile: "",
          father_annual_income: "",
          father_residential_address: "",
          father_office_address: "",
          mother_name: "",
          mother_qualification: "",
          mother_occupation: "",
          mother_profession: "",
          mother_employer: "",
          mother_business_details: "",
          mother_email: "",
          mother_mobile: "",
          mother_annual_income: "",
          mother_residential_address: "",
          office_address: "",
          child_one_name: "",
          child_one_addmission_no: "",
          child_one_class: "",
          child_one_section: "",
          child_two_name: "",
          child_two_addmission_no: "",
          child_two_class: "",
          child_two_section: "",
        });
        // setBirthCertificateFile("");
      } catch (error) {
        if (error.response) {
          // The request was made, but the server responded with a non-2xx status code
          const data = error.response.data;
          console.error(data.error);
          // Handle the error in your frontend UI or take appropriate action
        } else if (error.request) {
          // The request was made but no response was received
          console.error(
            "Network error. The request was made but no response was received."
          );
          // Handle the error in your frontend UI or take appropriate action
        } else {
          // Something else went wrong
          console.error("An error occurred:", error.message);
          // Handle the error in your frontend UI or take appropriate action
        }
      }
    }
  };

  const initializeRazorpay = async (studentName, callback) => {
    // e.preventDefault();
    console.log(studentName);
    await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    try {
      // Make a request to your backend to create a new order
      const response = await axios.post(
        "http://localhost:4000/api/auth/registerPayment",
        {
          name: studentName,
          amount: 750,
          currency: "INR",
          status: paystatus,
        }
      );

      console.log(response);
      const { amount, currency, id } = response.data;

      const options = {
        key: "rzp_test_BGDch2dcTs1gNs",
        amount: amount * 100,
        currency: currency,
        name: "Joy Senior Secondary School",
        description: "Description of the purchase",
        handler: async function (response) {
          try {
            const { razorpay_payment_id, orderId } = response;

            console.log(response);
            console.log(razorpay_payment_id, "razorpay_payment_id");
            console.log(orderId, "orderID");
            // Send payment details to your backend for verification
            const paymentVerificationResponse = await axios.post(
              "http://localhost:4000/api/auth/verify-payment",
              {
                paymentId: razorpay_payment_id,
              }
            );

            console.log(paymentVerificationResponse);
            const paymentStatus = paymentVerificationResponse.data.status;
            console.log(paymentStatus, "done");
            setPayStatus(paymentStatus);
            console.log(id);
            // console.log(payStats);
            // Update payment status in the database
            const payRes = await axios.put(
              `http://localhost:4000/api/auth/registerPaymentStatus/${id}`,
              {
                status: paymentStatus,
              }
            );

            console.log(payRes);
            // if (paymentStatus === "success") {
            //   handleSubmit();
            // }
            console.log(
              // payStats,
              paystatus,
              "Payment verification response:",
              paymentVerificationResponse.data
            );
            callback(paymentStatus);
          } catch (error) {
            console.error("Error verifying payment:", error, error.message);
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Use spread syntax to update only the changed field
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const calculateAge = (date) => {
    if (date) {
      const birthDate = new Date(date);
      const currentDate = new Date("2024-04-01");
      // console.log(currentDate);
      const ageInMilliseconds = currentDate - birthDate;

      const millisecondsInYear = 365 * 24 * 60 * 60 * 1000;
      const millisecondsInMonth = millisecondsInYear / 12;
      const millisecondsInDay = 24 * 60 * 60 * 1000;

      const years = Math.floor(ageInMilliseconds / millisecondsInYear);
      const remainingMilliseconds = ageInMilliseconds % millisecondsInYear;
      const months = Math.floor(remainingMilliseconds / millisecondsInMonth);
      const days = Math.floor(
        (remainingMilliseconds % millisecondsInMonth) / millisecondsInDay
      );

      const ageString = `${years} years, ${months} months, ${days} days`;
      console.log(ageString);
      return ageString;
    }
    return "";
  };
  const calculateDateInWords = (date) => {
    if (!date) return "";

    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    console.log(`${year}-${month}-${day}`);
    const DoBDate = `${year}-${month}-${day}`;
    const age = calculateAge(date);
    console.log(date);

    // Calculate and set the dob_in_words field in the dob state
    const dateInWords = calculateDateInWords(date);

    setData({
      ...data,
      date_of_birth: DoBDate,
      dob_in_words: dateInWords,
      Age: age,
    });
    setDob({
      date_of_birth: date,
      dob_in_words: dateInWords,
      Age: age,
    });
  };

  console.log(data);
  console.log(studentList.Student_Name);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const studentName = data.firstname + " " + data.lastname;
    const isMatch = studentList.some((student) => {
      const studentFullName = studentName === student.Student_Name;
      const fatherNameMatch = data.father_name === student.Father_Name;
      const motherNameMatch = data.mother_name === student.Mother_Name;
      const mobileMatch = data.mobile === student.Mobile;
      console.log(student.Student_Name, student.mobile);

      console.log("Father Name Comparison:", fatherNameMatch);
      console.log("Mother Name Comparison:", motherNameMatch);
      console.log("Mobile Comparison:", mobileMatch);
      console.log("studentName Comparison", studentFullName);

      return (
        fatherNameMatch && motherNameMatch && mobileMatch && studentFullName
      );
    });

    console.log("isMatch:", isMatch);

    console.log("data.father_name:", data.father_name);
    console.log("data.mother_name:", data.mother_name);
    console.log("data.mobile:", data.mobile);

    if (isMatch) {
      cogoToast.error("Oops! Something went wrong...");
    } else {
      // Initialize Razorpay and pass the paymentStatus to handleSubmit
      initializeRazorpay(studentName, (paymentStatus) => {
        console.log("Razorpay initialized successfully");
        handleSubmit(e, paymentStatus);
      });
    }
  };

  return (
    <>
      <Container>
        <Layout title={"E-registeration - Joy Senior Secondary School"}>
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            align="center"
          >
            <tbody>
              <tr>
                <td
                  style={{
                    background: "linear-gradient(#2c4a6e, #4d7db7)",
                    padding: "10px",
                  }}
                >
                  <table
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    width="100%"
                    align="center"
                  >
                    <tbody>
                      <tr valign="top">
                        <td width="20%" align="center">
                          <img
                            src="https://res.cloudinary.com/antrix/image/upload/v1690366105/jsslogo-png_neij4r.png"
                            style={{
                              height: "150px",
                            }}
                            alt="School Logo"
                          />
                        </td>
                        <td
                          width="60%"
                          className="cn clr-wh"
                          style={{ lineHeight: "2em" }}
                        >
                          <span className="org">
                            Joy Senior Secondary School
                          </span>
                          <br />
                          <span className="data">
                            Plot No. A, JDA Scheme No. 5/14, Vijay Nagar,
                            Jabalpur (M. P.) 482002
                          </span>
                          <br />
                          <span className="ftmd b">
                            <u>e-REGISTRATION</u>
                          </span>
                          <br />
                          <span className="ftmd b">SESSION : 2024-25</span>
                        </td>
                        <td width="20%">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="my-2">
            <span className="subhead fw-bold">
              (Please tick in the appropriate boxes and fill in all columns)
            </span>
          </div>
          <div className="container-fluid mt-3">
            <form onSubmit={handleFormSubmit} enctype="multipart/form-data">
              <div
                class="container pb-4 px-0"
                style={{ border: "1px solid #2c4a6e" }}
              >
                <div
                  className="text-start"
                  style={{
                    background: "linear-gradient(#2c4a6e, #4d7db7)",
                    padding: "10px",
                  }}
                >
                  <h2 className="text-decoration-underline text-light">
                    Student Details
                  </h2>
                </div>
                <div class="form-group nursery-sec px-3 py-2">
                  <label for="class pb-2">
                    Class into which admission is sought{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    class="form-control"
                    id="class"
                    name="class_for_admission"
                    value={data.class_for_admission}
                    onChange={handleInputChange}
                  >
                    <option>--select--</option>
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="5th">5th</option>
                    <option value="6th">6th</option>
                    <option value="7th">7th</option>
                    <option value="8th">8th</option>
                    <option value="9th">9th</option>
                    <option value="11th">11th</option>
                  </select>
                </div>
                <div class="container-fluid">
                  <div class="row px-3 py-2">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="school">
                          Present School(if any)
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="present_school"
                          id="school"
                          value={data.present_school}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="present-class">
                          Present Class<span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          class="form-control"
                          name="present_class"
                          value={data.present_class}
                          id="present_class"
                          onChange={handleInputChange}
                          required
                        >
                          <option>--select--</option>
                          <option value="KG-Upper Kindergartan">
                            KG-Upper Kindergartan
                          </option>
                          <option value="1st">1st</option>
                          <option value="2nd">2nd</option>
                          <option value="3rd">3rd</option>
                          <option value="4th">4th</option>
                          <option value="5th">5th</option>
                          <option value="6th">6th</option>
                          <option value="7th">7th</option>
                          <option value="8th">8th</option>
                          <option value="9th">9th</option>
                          <option value="11th">11th</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="present-school-city">
                          Present School City
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="present_school_city"
                          value={data.present_school_city}
                          id="present_school_city"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row px-3 py-2">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="firstname">
                          First Name<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="firstname"
                          value={data.firstname}
                          onChange={handleInputChange}
                          id="firstname"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="Middle Name">
                          Middle Name<span style={{ color: "red" }}></span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="middlename"
                          value={data.middlename}
                          onChange={handleInputChange}
                          id="Middle Name"
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="lastname">
                          Last Name<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="lastname"
                          value={data.lastname}
                          onChange={handleInputChange}
                          id="lastname"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid">
                    <div className="row px-3 py-2">
                      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <label for="dateInput">Date of Birth:</label>
                        <div class="input-group spanDiv">
                          <DatePicker
                            selected={dob.date_of_birth}
                            onChange={(date) => handleDateChange(date)} // No need to pass event here
                            className="form-control"
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select a date"
                            value={dob.date_of_birth}
                            showMonthDropdown={true}
                            showYearDropdown={true}
                            scrollableYearDropdown={false}
                          />
                          {/* <div class="input-group-append">
                                               <span class="input-group-text">
                                           <i class="fas fa-calendar-alt"></i>
                                             </span>
                                           </div> */}
                        </div>
                      </div>
                      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div class="form-group">
                          <label for="DOB in words">
                            DOB in words<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="DOB in words"
                            value={dob.dob_in_words}
                            onChange={handleInputChange}
                            id="DOB in words"
                            readOnly
                          />
                        </div>
                      </div>
                      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div class="form-group">
                          <label for="Age">
                            Age
                            <span style={{ color: "red" }}>
                              * (Age will be on 1st April 2024)
                            </span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="Age"
                            value={dob.Age}
                            onChange={handleInputChange}
                            id="Age"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid">
                    <div className="row px-3 py-2">
                      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div class="form-group">
                          <label for="gender">
                            Gender<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            class="form-control"
                            id="gender"
                            name="gender"
                            value={data.gender}
                            onChange={handleInputChange}
                          >
                            <option>--select gender--</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div class="form-group">
                          <label for="religion">
                            Religion<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            class="form-control"
                            id="religion"
                            name="Religion"
                            value={data.Religion}
                            onChange={handleInputChange}
                          >
                            <option>--select religion--</option>
                            <option value="hindu">Hindu</option>
                            <option value="muslim">Muslim</option>
                            <option value="sikh">Sikh</option>
                            <option value="christian">Christian</option>
                            <option value="jain">Jain</option>
                            <option value="buddhist">Buddhist</option>
                            <option value="punjabi">Punjabi</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div class="form-group">
                          <label for="caste">
                            Caste<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="caste"
                            value={data.caste}
                            onChange={handleInputChange}
                            id="caste"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="container-fluid">
                    <div class="row px-3 py-2">
                      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div class="form-group">
                          <label for="category">
                            Category<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            class="form-control"
                            id="category"
                            name="category"
                            value={data.category}
                            className="form-control"
                            onChange={handleInputChange}
                          >
                            <option>--select--</option>
                            <option value="general">General</option>
                            <option value="obc">OBC</option>
                            <option value="st">ST</option>
                            <option value="sc">SC</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div class="form-group">
                          <label for="mobile">
                            Mobile No<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="mobile"
                            placeholder="mobile number should be only 10 digit"
                            value={data.mobile}
                            id="mobile"
                            onChange={handleInputChange}
                            required
                            pattern="[0-9]{10}"
                            title="Please enter a valid 10-digit mobile number"
                          />
                        </div>
                      </div>
                      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div class="form-group">
                          <label for="birth_certificate">
                            Upload Birth Certificate
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            onChange={handleBirthCertificateChange}
                            type="file"
                            class="form-control"
                            name="birth_certificate"
                            // placeholder="only upload PDF file"
                            id="birth_certificate"
                            accept=".pdf, .jpg, .jpeg, .png"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="container-fluid">
                    <div className="row px-3 py-2">
                      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div class="form-group">
                          <label for="Number of children in the family">
                            Number of children in the family
                            <span style={{ color: "red" }}>*</span>
                          </label>
                        </div>
                      </div>
                      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div class="form-group">
                          <label for="Boy">
                            Boy<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="no_of_boys"
                            value={data.no_of_boys}
                            onChange={handleInputChange}
                            id="Boy"
                          />
                        </div>
                      </div>
                      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div class="form-group">
                          <label for="Girl">
                            Girl<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="No_of_girls"
                            value={data.No_of_girls}
                            onChange={handleInputChange}
                            id="Girl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="container-fluid">
                    <div className="row px-3 py-2">
                      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div class="form-group">
                          <label for="Aadhaar No">Aadhaar No</label>
                          <input
                            type="text"
                            class="form-control"
                            name="adhar_number"
                            value={data.adhar_number}
                            onChange={handleInputChange}
                            id="Aadhaar No"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="container pb-4 px-0 mt-5"
                style={{ border: "1px solid #2c4a6e" }}
              >
                <div
                  className="text-start"
                  style={{
                    background: "linear-gradient(#2c4a6e, #4d7db7)",
                    padding: "10px",
                  }}
                >
                  <h2 className="text-decoration-underline text-light">
                    Fathers Details
                  </h2>
                </div>
                <div class="container-fluid mt-3">
                  <div class="row px-3 py-2">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="father_name">
                          Name<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={handleInputChange}
                          name="father_name"
                          value={data.father_name}
                          id="father_name"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="father_qualification">
                          Educational Qualification
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="father_qualification"
                          value={data.father_qualification}
                          onChange={handleInputChange}
                          id="father_qualification"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="form-group">
                        <label htmlFor="father_occupation">
                          Occupation<span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          className="form-control"
                          name="father_occupation"
                          value={data.father_occupation}
                          onChange={handleInputChange}
                          id="father_occupation"
                          required
                        >
                          <option value="">--Select Occupation--</option>
                          <option value="Central_Government">
                            Central Government
                          </option>
                          <option value="Private_Job">Private Job</option>
                          <option value="Semi_Government">
                            Semi Government
                          </option>
                          <option value="State_Government">
                            State Government
                          </option>
                          <option value="Home_Maker">Home Maker</option>
                          <option value="self_employment">
                            Self-employment
                          </option>
                          <option value="None">None</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row px-3 py-2">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="father_profession">
                          Profession<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="father_profession"
                          value={data.father_profession}
                          onChange={handleInputChange}
                          id="father_profession"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="father_employer">Employer</label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          value={data.father_employer}
                          name="father_employer"
                          id="father_employer"
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="father_business">Business Details</label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="father_business_details"
                          value={data.father_business_details}
                          id="father_business"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row px-3 py-2">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="father_email">
                          Email ID<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="email"
                          class="form-control"
                          value={data.father_email}
                          name="father_email"
                          id="father_email"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="father_mobile">
                          Mobile No.<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="father_mobile"
                          placeholder="mobile number should be only 10 digit"
                          value={data.father_mobile}
                          id="father_mobile"
                          pattern="[0-9]{10}"
                          title="Please enter a valid 10-digit mobile number"
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="father_annual_income">
                          Annual income<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="father_annual_income"
                          value={data.father_annual_income}
                          id="father_annual_income"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row px-3 py-2">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="father_res_address">
                          Residential Address
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="textarea"
                          class="form-control"
                          name="father_residential_address"
                          value={data.father_residential_address}
                          id="father_res_address"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="father_office_address">
                          Office Address
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="textarea"
                          class="form-control"
                          name="father_office_address"
                          value={data.father_office_address}
                          id="father_office_address"
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"></div>
                  </div>
                </div>
              </div>

              <div
                class="container pb-4 px-0 mt-5"
                style={{ border: "1px solid #2c4a6e" }}
              >
                <div
                  className="text-start"
                  style={{
                    background: "linear-gradient(#2c4a6e, #4d7db7)",
                    padding: "10px",
                  }}
                >
                  <h2 className="text-decoration-underline text-light">
                    Mother Details
                  </h2>
                </div>
                <div class="container-fluid mt-3">
                  <div class="row px-3 py-2">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="mother_name">
                          Name<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="mother_name"
                          value={data.mother_name}
                          id="mother_name"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="mother_qualification">
                          Educational Qualification
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="mother_qualification"
                          value={data.mother_qualification}
                          id="mother_qualification"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="form-group">
                        <label htmlFor="mother_occupation">
                          Occupation<span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          className="form-control"
                          name="mother_occupation"
                          value={data.mother_occupation}
                          onChange={handleInputChange}
                          id="mother_occupation"
                          required
                        >
                          <option value="">--Select Occupation--</option>
                          <option value="Central_Government">
                            Central Government
                          </option>
                          <option value="Private_Job">Private Job</option>
                          <option value="Semi_Government">
                            Semi Government
                          </option>
                          <option value="State_Government">
                            State Government
                          </option>
                          <option value="Home_Maker">Home Maker</option>
                          <option value="self_employment">
                            Self-employment
                          </option>
                          <option value="None">None</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row px-3 py-2">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="mother_profession">Profession</label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="mother_profession"
                          value={data.mother_profession}
                          id="mother_profession"
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="mother_employer">Employer</label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="mother_employer"
                          value={data.mother_employer}
                          id="mother_employer"
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="mother_business">Business Details</label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="mother_business_details"
                          value={data.mother_business_details}
                          id="mother_business"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row px-3 py-2">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="mother_email">
                          Email ID<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="email"
                          class="form-control"
                          name="mother_email"
                          value={data.mother_email}
                          id="mother_email"
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="mother_mobile">
                          Mobile No.<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="mother_mobile"
                          placeholder="mobile number should be only 10 digit"
                          value={data.mother_mobile}
                          id="mother_mobile"
                          pattern="[0-9]{10}"
                          title="Please enter a valid 10-digit mobile number"
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="mother_annual_income">
                          Annual income<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="mother_annual_income"
                          value={data.mother_annual_income}
                          id="mother_annual_income"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row px-3 py-2">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="mother_res_address">
                          Residential Address
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="textarea"
                          class="form-control"
                          name="mother_residential_address"
                          value={data.mother_residential_address}
                          id="mother_res_address"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="mother_office_address">
                          Office Address
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="textarea"
                          class="form-control"
                          name="office_address"
                          value={data.office_address}
                          id="mother_office_address"
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"></div>
                  </div>
                </div>
              </div>

              {/* <div class="container student-sec mt-5">
                                <h2 style={{ fontSize: "1.5rem" }}>
                                    Brother / Sister Studying In Joy Sr. Sec. / Wings Of Joy
                                    School, Jabalpur
                                </h2> */}
              <div
                class="container pb-4 px-0 mt-5"
                style={{ border: "1px solid #2c4a6e" }}
              >
                <div
                  className="text-start"
                  style={{
                    background: "linear-gradient(#2c4a6e, #4d7db7)",
                    padding: "10px",
                  }}
                >
                  <h3 className="text-decoration-underline text-light">
                    {" "}
                    Brother / Sister Studying In Joy Sr. Sec. / Wings Of Joy
                    School, Jabalpur
                  </h3>
                </div>
                <div class="container-fluid mt-3">
                  <div class="row px-3 py-2">
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="first_childname">First Child name</label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="child_one_name"
                          value={data.child_one_name}
                          id="first_childname"
                        />
                      </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="first_child_addmission_number">
                          Admission No.{" "}
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="child_one_addmission_no"
                          value={data.child_one_addmission_no}
                          id="first_child_addmission_number"
                        />
                      </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="first_child_class">Class</label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="child_one_class"
                          value={data.child_one_class}
                          id="first_child_class"
                        />
                      </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="first_child_section">Section</label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="child_one_section"
                          value={data.child_one_section}
                          id="first_child_section"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container-fluid mt-3">
                  <div class="row px-3 py-2 ">
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="second_childname">Second Child name</label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="child_two_name"
                          value={data.child_two_name}
                          id="second_childname"
                        />
                      </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="second_child_addmission_number">
                          Admission No.{" "}
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="child_two_addmission_no"
                          value={data.child_two_addmission_no}
                          id="second_child_addmission_number"
                        />
                      </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="second_child_class">Class</label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="child_two_class"
                          value={data.child_two_class}
                          id="second_child_class"
                        />
                      </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="second_child_section">Section</label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="child_two_section"
                          value={data.child_two_section}
                          id="second_child_section"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="container mt-5">
                <h2>Document Required</h2>
                <p className="text-start fw-bold">
                  The following documents are must at the time of Admission.
                </p>
                <ol>
                  <li>Birth Certificate of the child.</li>
                  <li>
                    Caste Certificate of the child. (For ST / SC /OBC
                    Candidates)
                  </li>
                  <li>AADHAAR Card of Child.</li>
                  <li>Samagra Family Card.</li>
                  <li>
                    Child's bank passbook first page with visible Account No.
                    and Bank IFSC Code.
                  </li>
                  <li>
                    Class II onwards without the Original Transfer Certificate
                    (TC) admission will not be given.
                  </li>
                  <li>Previous class result.</li>
                  <li>
                    Blood group of the child (Certified from the recognized
                    pathology)
                  </li>
                </ol>
              </div>
              <div class="container mt-5">
                <h2>NOTE</h2>

                <ol>
                  <li>Limited seats are available.</li>
                  <li>
                    This registration does not entitle a child for admission.
                  </li>
                  <li>
                    Please ensure that the Name of the child and parents are
                    same in all the documents or it may lead to the discrepancy
                    and may result in the rejection of the form.
                  </li>
                  <li>
                    More than one Registration forms for one candidate will be
                    rejected.
                  </li>
                  <li>Incomplete Registration will be summarily rejected</li>
                  <li>
                    No future request will be entertained to have any change in
                    the date of birth of the child.
                  </li>
                  <li>e-Registration charges (Rs. 750/-) is non-refundable.</li>
                  <li>
                    In case of remaining / absent on due Date / Time of
                    interview or test the registration charges get forfeited.
                  </li>
                </ol>
              </div>
              <div class="container mt-5">
                <div class="boxnot">
                  <h3 class="text-center mb-3"> PLEASE NOTE</h3>
                  <h4>
                    ✓ DONATIONS/RECOMMENDATIONS ARE NOT TAKEN AGAINST
                    ADMISSIONS.
                  </h4>
                  <h4>
                    ✓ WITHOUT THE COMPLETE DOCUMENTATION THE ADMISSION WILL NOT
                    BE GRANTED.
                  </h4>
                </div>
              </div>

              <div className="d-flex justify-content-center align-items-center">
                {/* Render the checkbox input */}
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="m-2 checkbx"
                />

                {/* Display a message based on the checkbox state */}
                {isChecked ? (
                  <p className="mt-2 confpara">Thank you.</p>
                ) : (
                  <p className="mt-2 confpara">
                    Please confirm that you have read all the notes carefully
                    and you are agree with our conditions
                  </p>
                )}
              </div>
              <div className="container">
                <button
                  type="submit"
                  class="btn btn-warning mt-3 mx-auto d-block"
                  disabled={!isChecked}
                  onClick={initializeRazorpay}
                >
                  Proceed
                </button>
                {/* <button
                  type="submit"
                  class="btn btn-success mt-3 mb-5 mx-auto d-block"
                  disabled={!isChecked || payStats !== "success"}
                >
                  submit
                </button> */}
              </div>
            </form>
          </div>
        </Layout>
      </Container>
    </>
  );
};

export default Eregister;
const Container = styled.div`
  @media print {
    .page-break {
      display: block;
      page-break-before: always;
    }
    .bottons {
      display: none;
    }
  }
  @page {
    size: A4, Portrait;
    margin: 30px 10px;
  }
  .data {
    font-size: 15px;
    padding-bottom: 10px;
  }
  .b {
    font-weight: bold;
  }
  .org {
    text-transform: uppercase;
    font-size: 24px;
    text-align: center;
    font-family: Times New Roman;
    font-weight: bold;
  }
  .cn {
    text-align: center;
  }

  .und {
    text-decoration: underline;
  }
  .ftmd {
    font-size: 18px;
  }
  .clr-wh {
    color: white;
  }
  h1 {
    font-size: 3rem;
    font-family: "Bricolage Grotesque", sans-serif;
    color: #3c3e97;
    margin-right: 1rem;
    margin-top: 2rem;
  }

  .nursery-sec {
    width: 50%;
  }

  .container-fluid {
    padding-left: 0 !important;
  }

  .student-sec {
    // border: 5px solid #3498db;
    padding: 2rem;
    background-color: #e1e5e6;
    box-shadow: 1px 4px 11px #cec3c3;
  }

  h2 {
  }

  .boxnot {
    border: 1px solid black;
    padding: 2rem;
  }

  @media (max-width: 576px) {
    .form-group {
      width: 100%;
    }
  }
  li {
    text-align: start;
  }

  .checkbx {
    height: 2rem;
    width: 2rem;
  }
  .confpara {
    font-size: 1.5rem;
  }

  label {
    display: flex;
    text-align: left;
  }
  //   h3 {
  //     font-size: 1rem;
  //   }

  .spanDiv {
    padding: 10px 0px;
    color: #bbb;
  }

  .react-datepicker__navigation--years-upcoming::before {
    border-color: #ccc;
    border-style: solid;
    border-width: 3px 3px 0 0;
    content: "";
    display: block;
    height: 11px;
    position: absolute;
    top: 18px;
    width: 11px;
    margin-left: 9px;
    rotate: 317deg;
  }

  .react-datepicker__navigation--years-previous::before {
    border-color: #ccc;
    border-style: solid;
    border-width: 3px 3px 0 0;
    content: "";
    display: block;
    height: 11px;
    position: absolute;
    top: 9px !important;
    width: 11px;
    margin-left: 9px;
    rotate: 137deg !important;
  }
`;
