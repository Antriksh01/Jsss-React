import React, { useState } from "react";
import styled from "styled-components";
import { MdDriveFileRenameOutline, MdEmail, MdPassword } from "react-icons/md";
import axios from "axios";
import cogoToast from "cogo-toast";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const data = {
    name: name,
    email: email,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/api/auth/adminRegister`,
        data
      );
      if (response.status === 200) {
        console.log(response);
        cogoToast.success("Registered successfully!");
        navigate("/admin-home");
      } else {
        cogoToast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      // Handle unexpected response status
      cogoToast.error(error.response.data);
      console.error(error.response.status); // Log the HTTP status code
      console.error(error.response.data);
    }
  };

  console.log({ name, email, password });

  return (
    <>
      <Container>
        <section class="vh-100" style={{ backgroundColor: "#eee" }}>
          <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-lg-12 col-xl-11">
                <div class="card text-black" style={{ borderRadius: "25px" }}>
                  <div class="card-body p-md-5">
                    <div class="row justify-content-center">
                      <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Admin Sign up
                        </p>

                        <form onSubmit={handleSubmit} class="mx-1 mx-md-4">
                          <div class="d-flex flex-row align-items-center mb-4">
                            {/* <i class="fas fa-user fa-lg me-3 fa-fw"></i> */}
                            <MdDriveFileRenameOutline className="icon-cont" />
                            <div class="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                id="form3Example1c"
                                class="form-control"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                              />
                              <label class="form-label" for="form3Example1c">
                                Your Name
                              </label>
                            </div>
                          </div>

                          <div class="d-flex flex-row align-items-center mb-4">
                            <MdEmail className="icon-cont" />
                            <div class="form-outline flex-fill mb-0">
                              <input
                                type="email"
                                id="form3Example3c"
                                class="form-control"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                              />
                              <label class="form-label" for="form3Example3c">
                                Your Email
                              </label>
                            </div>
                          </div>

                          <div class="d-flex flex-row align-items-center mb-4">
                            <MdPassword className="icon-cont" />
                            <div class="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                id="form3Example4c"
                                class="form-control"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                              />
                              <label class="form-label" for="form3Example4c">
                                Password
                              </label>
                            </div>
                          </div>

                          <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              class="btn btn-primary btn-lg"
                            >
                              Register
                            </button>
                          </div>
                        </form>
                      </div>
                      <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                          src="https://res.cloudinary.com/antrix/image/upload/v1692163457/adminReg_bu9kml.png"
                          class="img-fluid"
                          alt="Sample image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default AdminRegister;
const Container = styled.div`
  p {
    font-family: "Bricolage Grotesque", sans-serif;
  }

  .icon-cont {
    font-size: 5rem;
    padding-bottom: 2rem;
    color: #23d1eb;
  }
`;
