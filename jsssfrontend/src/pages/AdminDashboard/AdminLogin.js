import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../../Layout/Layout";
import { MdDriveFileRenameOutline, MdEmail, MdPassword } from "react-icons/md";
import axios from "axios";
import { useAuth } from "../../context/Index";
import cogoToast from "cogo-toast";
import { Navigate, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/admin-login",
        {
          email,
          password,
        }
      );
      console.log(res);
      setAuth({
        admin: res.data.user,
      });

      const userId = res.data.id;
      console.log(userId);
      cogoToast.success("login successful");
      navigate("/admin-home");
      localStorage.setItem("admin", JSON.stringify(res.data.user));
    } catch (error) {
      console.error("Login error:", error);
      cogoToast.error("Login failed");
    }
  };

  console.log(email, password);

  return (
    <>
      <Container>
        <Layout title={"Gallery login - Joy Senior Secondary School"}>
          <section class="vh-100" style={{ backgroundColor: "#eee" }}>
            <div class="container h-100">
              <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                  <div
                    class="card text-black m-5"
                    style={{ borderRadius: "25px" }}
                  >
                    <div class="card-body p-md-5">
                      <div class="row justify-content-center">
                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                          <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                            Admin Login
                          </p>

                          <form
                            onSubmit={handleSubmit}
                            class="mx-1 mx-md-4 mt-5"
                          >
                            <div class="d-flex flex-row align-items-center mb-4">
                              <MdEmail className="icon-cont" />
                              <div class="form-outline flex-fill mb-0">
                                <input
                                  type="email"
                                  id="email"
                                  class="form-control"
                                  name="email"
                                  onChange={(e) => setEmail(e.target.value)}
                                  value={email}
                                  required
                                />
                                <label
                                  class="form-label text-start"
                                  for="form3Example3c"
                                >
                                  Your Email
                                </label>
                              </div>
                            </div>

                            <div class="d-flex flex-row align-items-center mb-4">
                              <MdPassword className="icon-cont" />
                              <div class="form-outline flex-fill mb-0">
                                <input
                                  type="password"
                                  id="pass"
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
                                login
                              </button>
                            </div>
                          </form>
                        </div>
                        <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                          <img
                            // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                            src="https://res.cloudinary.com/dryojfw4w/image/upload/v1694943053/5188687_51883_ongmcz.jpg"
                            class="img-fluid"
                            alt="Sample"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </Container>
    </>
  );
};

export default AdminLogin;
const Container = styled.div`
  p {
    font-family: "Bricolage Grotesque", sans-serif;
  }

  .icon-cont {
    font-size: 5rem;
    padding-bottom: 2rem;
    color: #23d1eb;
  }
  label {
    width: 100%;
    text-align: left;
  }
`;
