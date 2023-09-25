import React, { useCallback, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import styled from "styled-components";
import { useAuth } from "../context/Index";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CartContext";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import cogoToast from "cogo-toast";

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

const Cart = () => {
  const [cart, setCart] = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [auth, setAuth] = useAuth([]);
  const navigate = useNavigate();
  const [Razorpay, isLoaded] = useRazorpay();
  const [payStats, setPayStats] = useState("Pending");

  console.log(auth.user?.id);

  const getAllCartItems = async () => {
    const userId = auth.user?.id;

    console.log(userId);
    try {
      const res = await axios.get(
        `http://localhost:4000/api/auth/getCartItems/${userId}}`
      );
      console.log(res);
      setCartItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(cartItems.length);
  const totalPrice = () => {
    try {
      let total = 0;
      cartItems.forEach((item) => {
        total = total + parseFloat(item.price);
      });
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const initializeRazorpay = async () => {
    await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    try {
      // Make a request to your backend to create a new order
      const response = await axios.post(
        "http://localhost:4000/api/auth/create-order",
        {
          amount: totalPrice(),
          currency: "INR",
          status: payStats,
        }
      );

      console.log(response);
      console.log(payStats);
      const { amount, currency, id } = response.data;
      console.log(response);

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
            console.log(id);
            // Update payment status in the database
            const payResponse = await axios.put(
              `http://localhost:4000/api/auth/update-order/${id}`,
              {
                status: paymentStatus,
              }
            );
            setPayStats(paymentStatus);
            console.log(payResponse);
            console.log(payStats);
            if (paymentStatus === "success") {
              const downloadResponse = await axios.get(
                "http://localhost:4000/api/auth/downloadImages",
                {
                  params: {
                    user_id: auth.user?.id,
                  },
                  responseType: "blob",
                }
              );

              // Create a blob URL and trigger the download
              const blob = new Blob([downloadResponse.data]);
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "cartimages.zip";
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
            }

            console.log(
              payStats,
              "Payment verification response:",
              paymentVerificationResponse.data
            );
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

  const deleteItemAfterPayment = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/auth/deleteCartItems/${auth.user.id}`
      );
      console.log(res);
      navigate("/gallery");
    } catch (error) {
      console.log(error);
    }
  };
  // delete item
  const removeCartItem = async (item_id) => {
    console.log(item_id);
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/auth/cart-items-delete/${auth.user.id}/${item_id}`
      );
      console.log(res);
      setCartItems(cartItems);
    } catch (error) {
      console.log(error);
    }
  };
console.log(cartItems.length);
  console.log(auth.user);
  const datause = auth.user;

  useEffect(() => {
    const fetchCartData = async () => {
      if (datause) {
        await getAllCartItems();
      }
    };

    const pollInterval = 3000; // Poll every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchCartData, pollInterval);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [datause]);

  useEffect(() => {
    if (payStats === "success") {
      deleteItemAfterPayment();
    }
  }, [payStats]);

  return (
    <Container>
      <Layout title={"ca  "}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center bg-light p-2 mb-1">
                {`Hello ${auth?.user?.email}`}
              </h1>
              <h4 className="text-center">
                {cartItems?.length > 0
                  ? `You have ${cartItems.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout"
                    }`
                  : "your cart is empty"}
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              {cartItems?.map((p) => (
                <div className="row card m-3 flex-row">
                  <div className="col-md-4">
                    <img
                      className="card-img-top m-3"
                      src={p.image}
                      alt={p.name}
                      height={200}
                    />
                  </div>
                  <div className="col-md-8 pro-details">
                    <h4>{p.img_name}</h4>
                    <h4>Price : ₹{p.price}</h4>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p.item_id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <h4>Cart Summary</h4>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total :{totalPrice()}</h4>

              <button className="btn btn-success" onClick={initializeRazorpay}>
                make payment
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </Container>
  );
};

export default Cart;
const Container = styled.div`
  .pro-details {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: flex-start;
    padding-left: 4rem;
    padding-top: 2rem;
  }
`;
