import React ,{useState} from 'react';
import { MdEmail, MdPassword } from "react-icons/md";
import styled from "styled-components";
import cogoToast from "cogo-toast";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/Index';


function GalleryLogin() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [auth, setAuth] = useAuth([]);
const navigate = useNavigate();

console.log(auth);
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      "http://localhost:4000/api/auth/gallery-login",
      {
        email,
        password,
      }
    );
    console.log(res);
    const data = res.data.user;

    setAuth({
      user: data,
    });
    console.log(auth, "res.data.user :", res.data.user);
    const userId = res.data.user_id;
    console.log(userId);
    cogoToast.success("login successful");
    navigate("/gallery");
    localStorage.setItem("auth", JSON.stringify(res.data.user));
  } catch (error) {
    console.error("Login error:", error);
    cogoToast.error("Login failed");
  }
};

console.log(auth);

  return (
    <Container>
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-12 col-xl-9">
                  <div
                    className="card text-black m-5"
                    style={{ borderRadius: "25px" }}
                  >
                    <div className="card-body p-md-5">
                      <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-12 col-xl-12 order-2 order-lg-1">
                          <div className="d-flex justify-content-center align-items-center mb-4">
                          <h1 className="text-center h1 fw-bold mx-1 mx-md-4 mt-4 galleryhead text-primary">
                            Gallery Login
                          </h1>
                          <span>
                            <img src="https://res.cloudinary.com/dryojfw4w/image/upload/v1694942254/icons8-access-64_ljbsgw.png" alt="img" className='img-thumbnail border-0 pt-3'/>
                          </span>
                          </div>
                          <p className="text-center">Please login with ERP application crediential</p>

                          <form
                          onSubmit={handleSubmit}
                            className="mx-1 mx-md-4 mt-5"
                          >
                            <div className="d-flex flex-row align-items-center mb-4">
                              <MdEmail className="icon-cont" />
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="email"
                                  id="email"
                                  className="form-control"
                                  name="email"
                                  onChange={(e) => setEmail(e.target.value)}
                                  value={email}
                                  required
                                />
                                <label
                                  className="form-label text-start"
                                  for="form3Example3c"
                                >
                                  Your Email
                                </label>
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <MdPassword className="icon-cont" />
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="password"
                                  id="pass"
                                  className="form-control"
                                  name="password"
                                  onChange={(e) => setPassword(e.target.value)}
                                  value={password}
                                  required
                                />
                                <label className="form-label" for="form3Example4c">
                                  Password
                                </label>
                              </div>
                            </div>

                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button
                                type="submit"
                                className="btn btn-primary px-5"
                              >
                                Login
                              </button>
                            </div>
                            <p className="text-center">
                              In case you forget password please reset it from
                              ERP software.
                            </p>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
    </Container>
  )
}

export default GalleryLogin;
const Container = styled.div`
  p {
    font-family: "Bricolage Grotesque", sans-serif;
  }
  .galleryhead {
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