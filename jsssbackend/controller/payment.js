import express from "express";
import { db } from "../connect.js";
import mysql from "mysql";
import { extname } from "path";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fs from "fs";
import { log } from "console";
import axios from "axios";
import archiver from "archiver";
import { Readable } from "stream";

// Define your environment variables or configuration management here
const merchantId = process.env.MERCHANT_ID;
const accessCode = process.env.ACCESS_CODE;
const workingKey = process.env.WORKING_KEY;

// Validate and sanitize paymentData here
function validatePaymentData(paymentData) {
  // Implement validation logic as needed
  // Ensure required fields are present and have valid values
  if (!paymentData.amount || isNaN(paymentData.amount)) {
    throw new Error("Invalid amount");
  }

  // Add more validation as necessary
}

export const ccAvenuePay = async (req, res) => {
  try {
    const paymentData = req.body;

    // Validate paymentData
    validatePaymentData(paymentData);

    // Construct the CCAvenue API request
    const ccavenueResponse = await axios.post(
      "https://secure.ccavenue.com/transaction/transaction.do",
      {
        ...paymentData,
        merchant_id: merchantId,
        access_code: accessCode,
        working_key: workingKey,
        // Add other necessary parameters
      }
    );

    // Extract the payment URL from the CCAvenue response
    const paymentUrl = ccavenueResponse.data.payment_url;

    // Return the payment URL to the frontend for redirection
    res.json({ payment_url: paymentUrl });
  } catch (error) {
    console.error("Payment request failed:", error);

    // Handle errors and send an appropriate error response
    res.status(500).json({ error: "Payment request failed" });
  }
};
