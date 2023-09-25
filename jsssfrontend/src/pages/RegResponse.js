import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const RegResponse = () => {
  const [data, setData] = useState([]);

  const getLastReciept = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/auth/getLastReceipt"
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLastReciept();
  }, []);

  console.log(data);

  return (
    <>
      <Layout title={"Response - Joy Senior Secondary School"}>
        <Container>
          <div className="d-flex justify-content-center">
            <div className="box p-5 rounded shadow">
              <p className="text-justify">
                Dear Parent,
                <br /> <br />
                <strong>Form Number – {data.receipt}</strong> is received. We
                thank you and appreciate your interest for seeking Registration
                in our school. An amount of Rs. 750/- has been received against
                the
                <strong> Receipt No. {data.pay_id}</strong>. We shall go through
                the details/document submitted and if found eligible/illegible
                will inform you accordingly.
                <br />
                <br />
                With Regards{" "}
                <strong>Joy Senior Secondary School, Jabalpur</strong>
              </p>
              <Link to="/" className="btn btn-outline-success">
                Go Home
              </Link>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default RegResponse;
const Container = styled.div`
  background: linear-gradient(#4d7db7, #2c4a6e);
  height: 90vh;
  .box {
    width: 25rem;
    background: #e0e0e0;
    // box-shadow: 0px 11px 30px #988f8f;
    margin-top: 5rem;
    margin-bottom: 3rem;
    p {
      text-align: justify;
    }
  }
`;
