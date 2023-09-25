import React, { useState } from "react";
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

const Testeregisteration = () => {
  const navigate = useNavigate();
  const [Razorpay, isLoaded] = useRazorpay();
  // const [selectedDate, setSelectedDate] = useState(null);
  const [payStats, setPayStats] = useState("Pending");
  const [data, setData] = useState({
    class: "",
    school: "",
    present_class: "",
    present_school_city: "",
    firstname: "",
    lastname: "",
    birth_certificate_file: "",
    mobile: "",
    gender: "",
    religion: "",
    caste: "",
    category: "",
    selectedDate: null,
    // adhar_card: "",
    // dateInput: "",
    father_name: "",
    father_qualification: "",
    father_occupation: "",
    father_profession: "",
    father_employer: "",
    father_business: "",
    father_email: "",
    father_mobile: "",
    father_annual_income: "",
    father_res_address: "",
    father_office_address: "",
    // mother
    mother_name: "",
    mother_qualification: "",
    mother_occupation: "",
    mother_profession: "",
    mother_employer: "",
    mother_business: "",
    mother_email: "",
    mother_mobile: "",
    mother_annual_income: "",
    mother_res_address: "",
    mother_office_address: "",
    // siblings
    // first
    first_childname: "",
    first_child_addmission_number: "",
    first_child_class: "",
    first_child_section: "",

    // second
    second_childname: "",
    second_child_addmission_number: "",
    second_child_class: "",
    second_child_section: "",
  });

  console.log(payStats);
  // const studentName = data.firstname + " " + data.lastname;
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    // Update the state when the checkbox is clicked
    setIsChecked(!isChecked);
  };

//   const isAgeValid = (selectedDate, selectedClass) => {
//     const dateOfBirth = new Date(selectedDate);
//     const currentDate = new Date();
//     const ageInMonths =
//       (currentDate.getFullYear() - dateOfBirth.getFullYear()) * 12 +
//       (currentDate.getMonth() - dateOfBirth.getMonth());

//     const ageRanges = {
//       Nursery: { min: 2 * 12 + 9, max: 3 * 12 + 8 },
//       KG_Lower: { min: 3 * 12 + 9, max: 4 * 12 + 8 },
//       KG_Upper: { min: 4 * 12 + 9, max: 5 * 12 + 8 },
//     };

//     const validAgeRange = ageRanges[selectedClass];
//     return (
//       validAgeRange &&
//       ageInMonths >= validAgeRange.min &&
//       ageInMonths <= validAgeRange.max
//     );
//   };

  const handleSubmit = async (e, paymentStatus) => {
    e.preventDefault();

    const user = {
      data,
    };
    // console.log(user.data.firstname, user.data.lastname);
    // const studentName = user.data.firstname + " " + user.data.lastname;
    // console.log(studentName);
    // const isOtherTaskSuccessful = await initializeRazorpay(studentName);
    console.log(payStats);
    if (paymentStatus === "success") {
      try {
        const formData = await axios.post(
          "http://localhost:4000/api/auth/e-register",
          user.data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(user);
        cogoToast.success("User registered successfully!");
        navigate("/response-receipt");

        setData({
          class: "",
                    school: "",
                    present_class: "",
                    present_school_city: "",
                    firstname: "",
                    middlename: "",
                    lastname: "",
                    date_of_birth: "",
                    dob_in_words: "",
                    Age: "",
                    gender: "",
                    religion: "",
                    caste: "",
                    category: "",
                    mobile: "",
                    birth_certificate_file: "",
                    no_of_boys: "",
                    No_of_girls: "",
                    adhar_number: "",
                    father_name: "",
                    father_qualification: "",
                    father_occupation: "",
                    father_profession: "",
                    father_employer: "",
                    father_business: "",
                    father_email: "",
                    father_mobile: "",
                    father_annual_income: "",
                    father_res_address: "",
                    father_office_address: "",
                    // mother
                    mother_name: "",
                    mother_qualification: "",
                    mother_occupation: "",
                    mother_profession: "",
                    mother_employer: "",
                    mother_business: "",
                    mother_email: "",
                    mother_mobile: "",
                    mother_annual_income: "",
                    mother_res_address: "",
                    mother_office_address: "",
                    // siblings
                    // first
                    first_childname: "",
                    first_child_addmission_number: "",
                    first_child_class: "",
                    first_child_section: "",

                    // second
                    second_childname: "",
                    second_child_addmission_number: "",
                    second_child_class: "",
                    second_child_section: "",
        });
      } catch (error) {
        // console.error(error.response.status); // Log the HTTP status code
        // console.error(error.response.data);
        cogoToast.error(error);
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
          status: payStats,
        }
      );

      console.log(response);
      const { amount, currency, id } = response.data;

      const options = {
        key: "rzp_test_BGDch2dcTs1gNs",
        amount: amount * 100,
        currency: currency,
        name: "Wings of Joy",
        description: "Description of the purchase",
        handler: async function (response) {
          try {
            const { razorpay_payment_id, orderId } = response;

            console.log(response);
            // Send payment details to your backend for verification
            const paymentVerificationResponse = await axios.post(
              "http://localhost:4000/api/auth/verify-payment",
              {
                paymentId: razorpay_payment_id,
              }
            );

            console.log(paymentVerificationResponse);
            const paymentStatus = paymentVerificationResponse.data.status;
            console.log(paymentStatus);
            setPayStats(paymentStatus);
            console.log(id);
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
              payStats,
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

  const handleDateChange = (date) => {
    setData({
      ...data,
      selectedDate: date,
    });
  };

  console.log(data);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const selectedDate = data.selectedDate; // Make sure to get the selectedDate from your form data
    const selectedClass = data.class; // Make sure to get the class from your form data

    // if (!isAgeValid(selectedDate, selectedClass)) {
    //   // Age is not valid, show an error message or prevent form submission
    //   cogoToast.error(
    //     "Nursery : Minimum age 2 years and 9 months, maximum age 3 years and 8 months. KG Lower : Minimum age 3 years and 9 months, maximum age 4 years and 8 months. KG Upper : Minimum age 4 years and 9 months, maximum age 5 years and 8 months."
    //   );
    //   return;
    // }

    const studentName = data.firstname + " " + data.lastname;

    // Initialize Razorpay and pass the paymentStatus to handleSubmit
    initializeRazorpay(studentName, (paymentStatus) => {
      handleSubmit(e, paymentStatus);
    });
  };

  return (
    <>
      <Container>
        <Layout title={"E-registeration - wings of joy"}>
          <div className="container-fluid">
            <form onSubmit={handleFormSubmit}>
              <div class="container student-sec">
                <h2>Student Details</h2>
                <div class="form-group nursery-sec">
                  <label for="class">
                    Class into which admission is sought{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    class="form-control"
                    id="class"
                    name="class"
                    value={data.class}
                    onChange={handleInputChange}
                  >
                    <option>--select--</option>
                    <option value="Nursery">Nursery</option>
                    <option value="KG_Lower">Kindergartan Lower</option>
                    <option value="KG_Upper">Kindergartan Upper</option>
                  </select>
                </div>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="school">
                          Present School(if any)
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="school"
                          id="school"
                          value={data.school}
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
                        <input
                          type="text"
                          class="form-control"
                          name="present_class"
                          value={data.present_class}
                          id="present_class"
                          onChange={handleInputChange}
                          required
                        />
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
                  <div class="row">
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
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="birth_certificate_file">
                          Upload Birth Certificate
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="file"
                          class="form-control"
                          name="birth_certificate_file"
                          value={data.birth_certificate_file}
                          id="birth_certificate_file"
                          accept=".jpg, .jpeg, .png .pdf"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="mobile">
                          Mobile No<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="mobile"
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
                          <option value="male">male</option>
                          <option value="female">female</option>
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
                          name="religion"
                          value={data.religion}
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
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row">
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
                      <label for="dateInput">Select or Enter Date:</label>
                      <div class="input-group">
                        <DatePicker
                          selected={data.selectedDate}
                          onChange={handleDateChange} // No need to pass event here
                          className="form-control"
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Select a date"
                        />
                        {/* <div class="input-group-append">
                          <span class="input-group-text">
                            <i class="fas fa-calendar-alt"></i>
                          </span>
                        </div> */}
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      {/* <div class="form-group">
                        <label for="adhar_card">Adhar Number</label>
                        <input
                          type="text"
                          class="form-control"
                          name="adhar_card"
                          value={data.adhar_card}
                          id="adhar_card"
                          onChange={handleInputChange}
                          pattern="[0-9]{12}"
                          maxlength="12"
                        />
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>

              <div class="container student-sec mt-5">
                <h2>Father Details</h2>
                <div class="container-fluid mt-3">
                  <div class="row">
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
                  <div class="row">
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
                          name="father_business"
                          value={data.father_business}
                          id="father_business"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="father_email">
                          Email ID<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="email"
                          class="form-control"
                          value={data.email}
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
                  <div class="row">
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
                          name="father_res_address"
                          value={data.father_res_address}
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

              <div class="container student-sec mt-5">
                <h2>Mother Details</h2>
                <div class="container-fluid mt-3">
                  <div class="row">
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
                  <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="mother_profession">
                          Profession<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="mother_profession"
                          value={data.mother_profession}
                          id="mother_profession"
                          required
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
                          name="mother_business"
                          value={data.mother_business}
                          id="mother_business"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row">
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
                          required
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="mother_mobile">
                          Mobile No. *<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="mother_mobile"
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
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row">
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
                          name="mother_res_address"
                          value={data.mother_res_address}
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
                          name="mother_office_address"
                          value={data.mother_office_address}
                          id="mother_office_address"
                        />
                      </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"></div>
                  </div>
                </div>
              </div>

              <div class="container student-sec mt-5">
                <h2 style={{ fontSize: "1.5rem" }}>
                  Brother / Sister Studying In Joy Sr. Sec. / Wings Of Joy
                  School, Jabalpur
                </h2>
                <div class="container-fluid mt-3">
                  <div class="row">
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="first_childname">First Child name</label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="first_childname"
                          value={data.first_childname}
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
                          name="first_child_addmission_number"
                          value={data.first_child_addmission_number}
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
                          name="first_child_class"
                          value={data.first_child_class}
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
                          name="first_child_section"
                          value={data.first_child_section}
                          id="first_child_section"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container-fluid mt-3">
                  <div class="row">
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                      <div class="form-group">
                        <label for="second_childname">Second Child name</label>
                        <input
                          onChange={handleInputChange}
                          type="text"
                          class="form-control"
                          name="second_childname"
                          value={data.second_childname}
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
                          name="second_child_addmission_number"
                          value={data.second_child_addmission_number}
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
                          name="second_child_class"
                          value={data.second_child_class}
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
                          name="second_child_section"
                          value={data.second_child_section}
                          id="second_child_section"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="container mt-5">
                <h2>Document Required</h2>
                <p className="text-start">
                  The following documents are must at the time of Admission.
                </p>
                <ol>
                  <li>Birth Certificate of the child.</li>
                  <li>
                    Caste Certificate of the child. (For ST / SC /OBC
                    Candidates)
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
                  <li>
                    In case of remaining / absent on due Date / Time of
                    interview or test the registration charges get forfeited.
                  </li>
                  <li className="fw-bold">
                    Nursery: Minimum age 2 years and 9 months, maximum age 3
                    years and 8 months. <br />
                    Lower Kindergartan : Minimum age 3 years and 9 months,
                    maximum age 4 years and 8 months. <br />
                    Upper Kindergartan: Minimum age 4 years and 9 months,
                    maximum age 5 years and 8 months.
                  </li>
                </ol>
              </div>
              <div class="container mt-5">
                <div class="boxnot">
                  <h2 class="text-center mb-3"> PLEASE NOTE</h2>
                  <h3>
                    ✓ DONATIONS/RECOMMENDATIONS ARE NOT TAKEN AGAINST
                    ADMISSIONS.
                  </h3>
                  <h3>
                    ✓ WITHOUT THE COMPLETE DOCUMENTATION THE ADMISSION WILL NOT
                    BE GRANTED.
                  </h3>
                  <h3>✓ FEES ARE NOT REFUNDABLE.</h3>
                </div>
              </div>

              <div className="d-flex justify-content-center align-items-center">
                {/* Render the checkbox input */}
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="m-2"
                />

                {/* Display a message based on the checkbox state */}
                {isChecked ? (
                  <p className="mt-2">Thank you.</p>
                ) : (
                  <p className="mt-2">
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
                  // onClick={initializeRazorpay}
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

export default Testeregisteration;
const Container = styled.div`
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
    color: #e74c3c;
    text-decoration: underline;
    font-family: cursive;
    text-align: start;
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

  label {
    display: flex;
    text-align: left;
  }
  h3 {
    font-size: 1rem;
  }
`;
