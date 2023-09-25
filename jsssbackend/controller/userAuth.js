import express from "express";
import { db } from "../connect.js";
import archiver from "archiver";
import axios from "axios";
import { Readable } from "stream";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

const PORT = process.env.PORT;

// POST /api/login
export const galleryLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve the user from the database using their email
    const selectQuery = "SELECT * FROM gallery_login WHERE email = ?";
    db.query(selectQuery, [email], (error, results) => {
      if (error) {
        console.error("Error retrieving user:", error);
        return res.status(500).json({ error: "Error retrieving user" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = results[0];

      // Compare the provided password with the password stored in the database
      if (password === user.password) {
        // Successful login
        console.log("Login successful");
        res.status(200).json({
          message: "Login successful",
          user: { id: user.user_id, email: user.email },
        });
      } else {
        return res.status(401).json({ error: "Invalid email or password" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllListItems = (req, res) => {
  try {
    const getquery = "SELECT * FROM eventlist";
    db.query(getquery, (err, result) => {
      if (err) {
        console.log("Error in fetching data:", err);
        res.status(500).json({ error: "Error in fetching data" });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllImages = (req, res) => {
  try {
    const getquery = "SELECT * FROM student_gallery";

    // Use a promise or async/await to handle the database query
    db.query(getquery, (err, result) => {
      if (err) {
        console.log("Error in fetching data:", err);
        res.status(500).json({ error: "Error in fetching data" });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllImagesViaEventId = async (req, res) => {
  try {
    const event = req.params.event;

    const getQuery = "SELECT * FROM student_gallery WHERE event = ?";

    db.query(getQuery, [event], (err, rows) => {
      if (err) {
        console.error("Error in fetching data:", err);
        res.status(500).json({ error: "Error in fetching data" });
      } else {
        res.status(200).json(rows);
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error in fetching data" });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const userId = req.params.userId;

    const getCartItemsQuery = `
    SELECT student_gallery.*
    FROM cart
    JOIN student_gallery ON cart.item_id = student_gallery.item_id
    WHERE cart.user_id = ?
  `;

    db.query(getCartItemsQuery, [userId], (error, results) => {
      if (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Server error." });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
export const createOrder = async (req, res) => {
  try {
    const { amount, currency, status } = req.body;

    // Retrieve the highest receipt number from the database
    const receiptQuery =
      "SELECT MAX(CAST(SUBSTRING_INDEX(receipt, '-', -1) AS SIGNED)) AS maxReceiptNum FROM orders";
    db.query(receiptQuery, (receiptErr, receiptResult) => {
      if (receiptErr) {
        console.error("Error retrieving receipt:", receiptErr);
        res.status(500).json({ error: "Failed to create order" });
        return;
      }

      const maxReceiptNum = receiptResult[0].maxReceiptNum || 0;
      const newReceiptNum = maxReceiptNum + 1;
      const newReceipt = `order_rec-${newReceiptNum}`;

      // Insert the new order with the generated receipt
      const insertQuery =
        "INSERT INTO orders (amount, currency, receipt, status) VALUES (?, ?, ?, ?)";
      db.query(
        insertQuery,
        [amount, currency, newReceipt, status],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error("Error creating order:", insertErr);
            res.status(500).json({ error: "Failed to create order" });
          } else {
            const orderId = insertResult.insertId;
            const order = {
              id: orderId,
              receipt: newReceipt,
              amount: amount,
              currency: currency,
              status: "pending",
            };
            res.status(201).send(order);
          }
        }
      );
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};
export const addTOCart = async (req, res) => {
  try {
    const { item } = req.body;
    const userId = req.body.userId;

    console.log(userId, item.id);

    // Check if the item is already in the user's cart
    db.query(
      "SELECT * FROM cart WHERE user_id = ? AND item_id = ?",
      [userId, item.id],
      function (err, rows) {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Server error." });
        }

        console.log("rows.length " + rows.length);

        if (rows.length > 0) {
          return res
            .status(400)
            .json({ message: "Item is already in the cart." });
        } else {
          // Add the item to the user's cart
          const addToCartQuery = `
            INSERT INTO cart (user_id, item_id)
            VALUES (?, ?)
          `;

          db.query(
            addToCartQuery,
            [userId, item.id],
            function (addErr, addedToCartResult) {
              if (addErr) {
                console.error(addErr);
                return res
                  .status(500)
                  .json({ message: "Error adding item to cart." });
              }

              if (addedToCartResult.affectedRows === 0) {
                return res
                  .status(400)
                  .json({ message: "Error adding item to cart." });
              }

              res.status(200).json({ message: "Item added to cart." });
            }
          );
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const deleteCart = (req, res) => {
  try {
    const id = req.params.userId;
    try {
      const deleteQuery = "DELETE FROM cart WHERE user_id = ?";
      db.query(deleteQuery, [id], (err, results) => {
        if (err) {
          console.error("Error executing DELETE query:", err);
          return res.status(500).json({ error: "Database query error" });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "user not found" });
        }

        return res.status(200).json({ message: "cart deleted successfully" });
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteSingleCartItem = (req, res) => {
  try {
    try {
      const userid = req.params.userId;
      const itemId = req.params.itemId;
      try {
        const deleteQuery =
          "DELETE FROM cart WHERE user_id = ? AND item_id = ?";
        db.query(deleteQuery, [userid, itemId], (err, results) => {
          if (err) {
            console.error("Error executing DELETE query:", err);
            return res.status(500).json({ error: "Database query error" });
          }

          if (results.affectedRows === 0) {
            return res.status(404).json({ error: "cart item not found" });
          }

          return res
            .status(200)
            .json({ message: "cart item deleted successfully" });
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    const orderQuery = "SELECT * FROM orders WHERE id = ?";
    const orderResult = await db.query(orderQuery, [orderId]);
    const order = orderResult[0];

    const isPaymentVerified = true;

    if (isPaymentVerified) {
      // Update the order status to "success" in the database
      const updateQuery = "UPDATE orders SET status = ? WHERE id = ?";
      await db.query(updateQuery, ["success", orderId]);

      res.status(200).json({ status: "success" });
    } else {
      // If payment verification fails, update the order status to "failed" in the database
      const updateQuery = "UPDATE orders SET status = ? WHERE id = ?";
      await db.query(updateQuery, ["failed", orderId]);

      res.status(400).json({ status: "failed" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateStatus = (req, res) => {
  try {
    const id = req.params.orderId;
    const statusText = req.body.status;

    const updateQuery = "UPDATE orders SET status = ? WHERE id = ?";

    db.query(updateQuery, [statusText, id], (err, result) => {
      if (err) {
        console.error("Error updating status:", err);
        res.status(500).send("Error updating status");
      } else {
        console.log("status updated successfully");
        res.send("status updated successfully");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const downloadImages = async (req, res) => {
  try {
    const userId = req.query.user_id;

    const getQuery = `
      SELECT sg.image
      FROM student_gallery AS sg
      INNER JOIN cart AS c ON sg.item_id = c.item_id
      WHERE c.user_id = ?
    `;

    db.query(getQuery, [userId], async (err, rows) => {
      if (err) {
        console.error("Error in fetching data:", err);
        res.status(500).json({ error: "Error in fetching data" });
        return;
      }

      if (rows.length === 0) {
        res.status(404).send("No matching images found");
        return;
      }

      // Set the content type to ZIP
      res.setHeader("Content-Type", "application/zip");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=cart_images.zip"
      );

      // Create a writable stream for the ZIP file
      const zipStream = archiver("zip");
      zipStream.pipe(res);

      // Iterate through the rows and add each image to the ZIP file
      for (const row of rows) {
        const imageUrl = row.image;

        try {
          // Download the image using axios
          const response = await axios.get(imageUrl, {
            responseType: "stream",
          });

          // Convert the response data stream to a readable stream
          const imageStream = new Readable({ read() {} });
          response.data.on("data", (chunk) => imageStream.push(chunk));
          response.data.on("end", () => imageStream.push(null));

          // Add the image to the ZIP file with a unique filename
          const imageFilename = imageUrl.split("/").pop();
          zipStream.append(imageStream, { name: imageFilename });
        } catch (imageError) {
          console.error("Error downloading image:", imageError);
        }
      }

      // Finalize the ZIP file and end the response
      zipStream.finalize();
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getLastReceipt = (req, res) => {
  try {
    db.query(
      "SELECT * FROM registration_payment ORDER BY recID DESC LIMIT 1",
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: "An error occurred" });
        } else {
          if (results.length > 0) {
            res.send(results[0]);
          } else {
            res.status(404).json({ message: "No records found" });
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
export const addImage = async (req, res) => {
  try {
    const imageUrls = []; // Array to store generated image URLs

    for (const file of req.files) {
      const filename = file.filename;
      const imageUrl = `http://localhost:${PORT}/gallery/${filename}`;
      imageUrls.push(imageUrl);
    }

    const img_name = req.body.img_name;
    const price = req.body.price;
    const year = req.body.year;
    const event = req.body.event;

    const insertQuery =
      "INSERT INTO student_gallery (img_name, image, price, year, event) VALUES (?, ?, ?, ?, ?)";

    // Insert each image's data into the database
    for (const imageUrl of imageUrls) {
      db.query(
        insertQuery,
        [img_name, imageUrl, price, year, event],
        (err, results) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Image added successfully:", results.insertId);
          }
        }
      );
    }

    res.json({ message: "Images added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading images" });
  }
};

export const updateImages = (req, res) => {
  try {
    const id = req.params.id;
    const imgName = req.body.img_name; // Use "img_name" from the request body
    const price = req.body.price;

    const updateQuery =
      "UPDATE student_gallery SET img_name = ?, price = ? WHERE item_id = ?"; // Removed the extra comma

    db.query(updateQuery, [imgName, price, id], (err, result) => {
      if (err) {
        console.error("Error updating image details:", err);
        res.status(500).send("Error updating image details");
      } else {
        console.log("Image details updated successfully", result);
        res.send("Image details updated successfully");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};

export const deleteImages = (req, res) => {
  const id = req.params.id;
  try {
    const deleteQuery = "DELETE FROM student_gallery WHERE item_id = ?";
    db.query(deleteQuery, [id], (err, results) => {
      if (err) {
        console.error("Error executing DELETE query:", err);
        return res.status(500).json({ error: "Database query error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Images not found" });
      }

      return res.status(200).json({ message: "Images deleted successfully" });
    });
  } catch (error) {
    console.log(error);
  }
};
export const adminLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    console.log(email, password);
    const selectQuery = "SELECT * FROM admin_register WHERE email = ?";

    db.query(selectQuery, [email], async (error, results) => {
      if (error) {
        console.error("Error retrieving user:", error);
        return res.status(500).json({ error: "Error retrieving user" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const user = results[0];

      // Compare hashed passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(passwordMatch);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Successful login
      res.status(200).json({
        message: "Login successful",
        user: { id: user.user_id, email: user.email },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error.", error });
  }
};

export const eventlist = (req, res) => {
  try {
    const { eventName, eventYear, eventDesc } = req.body;

    const insertQuery =
      "INSERT INTO eventlist (event_name, event_year, event_desc) VALUES (?, ? ,?)";
    db.query(insertQuery, [eventName, eventYear, eventDesc], (err, result) => {
      if (err) {
        console.error("Error inserting event:", err);
        return res.status(500).json({ error: "Error creating event." });
      } else {
        return res.status(200).send("event created.");
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred." }); // Handle error and send appropriate response
  }
};

export const deleteEvent = (req, res) => {
  try {
    try {
      const eventId = req.params.eventId;
      try {
        const deleteQuery = "DELETE FROM eventlist WHERE event_id = ?";
        db.query(deleteQuery, [eventId], (err, results) => {
          if (err) {
            console.error("Error executing DELETE query:", err);
            return res.status(500).json({ error: "Database query error" });
          }

          if (results.affectedRows === 0) {
            return res.status(404).json({ error: "event not found" });
          }

          return res
            .status(200)
            .json({ message: "event deleted successfully" });
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateEventList = (req, res) => {
  try {
    const id = req.params.id;
    const eventYear = req.body.eventYear;
    const eventName = req.body.eventName;
    const eventDesc = req.body.eventDesc;

    const updateQuery =
      "UPDATE eventlist SET event_name = ?, event_year = ?, event_desc = ? WHERE event_id = ?";

    db.query(
      updateQuery,
      [eventName, eventYear, eventDesc, id],
      (err, result) => {
        if (err) {
          console.error("Error updating status:", err);
          res.status(500).send("Error updating event");
        } else {
          console.log("events details updated successfully");
          res.send("events details updated successfully");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const adminRegister = (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash the password using bcrypt
    bcrypt.hash(password, 10, (hashError, hashedPassword) => {
      if (hashError) {
        console.error("Error hashing password:", hashError);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Check if the user already exists in the database
      const checkUserQuery = "SELECT * FROM admin_register WHERE email = ?";
      db.query(checkUserQuery, [email], (err, results) => {
        if (err) {
          console.error("Error checking user:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        if (results.length > 0) {
          return res.status(400).json({ error: "User already exists" });
        }

        // Insert a new user into the database with hashed password
        const insertUserQuery =
          "INSERT INTO admin_register (username, email, password) VALUES (?, ?, ?)";
        db.query(
          insertUserQuery,
          [name, email, hashedPassword],
          (err, insertResult) => {
            if (err) {
              console.error("Error inserting user:", err);
              return res.status(500).json({ error: "Internal server error" });
            }

            const response = {
              status: 200,
              message: "Registration successful!",
            };
            res.status(200).json(response);
          }
        );
      });
    });
  } catch (error) {
    console.log(error);
  }
};
export const createNotice = (req, res) => {
  try {
    const { noticeText, linkURL } = req.body; // Destructure the properties from the request body
    console.log(noticeText, linkURL);

    const insertQuery =
      "INSERT INTO notice_board (notice, link_url) VALUES (?, ?)";
    db.query(insertQuery, [noticeText, linkURL], (err, result) => {
      if (err) {
        console.error("Error inserting notice:", err);
        return res.status(500).json({ error: "Error creating notice." });
      } else {
        return res.status(200).send("Notice created.");
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred." }); // Handle error and send appropriate response
  }
};

export const getAllNotices = (req, res) => {
  try {
    const getquery = "SELECT * FROM notice_board";

    // Use a promise or async/await to handle the database query
    db.query(getquery, (err, result) => {
      if (err) {
        console.log("Error in fetching data:", err);
        res.status(500).json({ error: "Error in fetching data" });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateNotice = (req, res) => {
  try {
    const id = req.params.id;
    const { noticeText, linkURL } = req.body;

    const updateQuery =
      "UPDATE notice_board SET notice = ?, link_url = ? WHERE id = ?";

    db.query(updateQuery, [noticeText, linkURL, id], (err, result) => {
      if (err) {
        console.error("Error updating notice:", err);
        res.status(500).send("Error updating notice");
      } else {
        console.log("Notice updated successfully");
        res.send("Notice updated successfully");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred."); // Handle error and send appropriate response
  }
};

export const NoticeDelete = (req, res) => {
  const id = req.params.id;
  try {
    const deleteQuery = "DELETE FROM notice_board WHERE id = ?";
    db.query(deleteQuery, [id], (err, results) => {
      if (err) {
        console.error("Error executing DELETE query:", err);
        return res.status(500).json({ error: "Database query error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Notice not found" });
      }

      return res.status(200).json({ message: "Notice deleted successfully" });
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllStudent = (req, res) => {
  try {
    const getquery = `SELECT registration_payment.*, register.*
    FROM registration_payment
    INNER JOIN register ON registration_payment.recID = register.id`;

    // Use a promise or async/await to handle the database query
    db.query(getquery, (err, result) => {
      if (err) {
        console.log("Error in fetching data:", err);
        res.status(500).json({ error: "Error in fetching data" });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLastStudent = (req, res) => {
  try {
    db.query(
      "SELECT * FROM register ORDER BY id DESC LIMIT 1",
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: "An error occurred" });
        } else {
          if (results.length > 0) {
            res.send(results[0]);
          } else {
            res.status(404).json({ message: "No records found" });
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const getStudentViaID = (req, res) => {
  const studentId = req.params.id;

  try {
    db.query(
      "SELECT * FROM register WHERE id = ?",
      [studentId],
      (error, results) => {
        if (error) {
          console.error(error);
          res
            .status(500)
            .json({ error: "An error occurred while fetching student data." });
        } else {
          if (results.length === 0) {
            res.status(404).json({ error: "Student not found." });
          } else {
            res.json(results[0]);
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching student data." });
  }
};
export const registerPayment = async (req, res) => {
  try {
    const { name, amount, currency, status } = req.body;

    // Retrieve the highest receipt number from the database
    const receiptQuery =
      "SELECT MAX(CAST(SUBSTRING_INDEX(receipt, '/', -1) AS SIGNED)) AS maxReceiptNum FROM registration_payment";

    // console.log("Receipt Query:", receiptQuery);
    db.query(receiptQuery, (receiptErr, receiptResult) => {
      if (receiptErr) {
        console.error("Error retrieving receipt:", receiptErr);
        res.status(500).json({ error: "Failed to create order" });
        return;
      }

      const maxReceiptNum = receiptResult[0].maxReceiptNum || 0;
      const newReceiptNum = maxReceiptNum + 1;
      // console.log(newReceiptNum, "849");
      const newReceipt = `FRCP/2024-25/${newReceiptNum}`;

      // Retrieve the highest pay_id from the database with the '23_24' prefix
      const newPayIdQuery =
        "SELECT MAX(CAST(SUBSTRING_INDEX(pay_id, '/', -1) AS SIGNED)) AS maxPayIdNum FROM registration_payment";
      db.query(newPayIdQuery, (newPayIdErr, newPayIdResult) => {
        if (newPayIdErr) {
          console.error("Error retrieving maxPayIdNum:", newPayIdErr);
          res.status(500).json({ error: "Failed to create order" });
          return;
        }

        const maxPayIdNum = newPayIdResult[0].maxPayIdNum;
        console.log(maxPayIdNum, "863");
        const newPayIdNum = maxPayIdNum + 1;
        console.log(newPayIdNum, "864");
        const newPayId = `FRM/2024-25/${newPayIdNum}`;

        // Insert the new order with the generated receipt and updated pay_id
        const insertQuery =
          "INSERT INTO registration_payment (pay_id, student_name, amount, currency, receipt, status) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(
          insertQuery,
          [newPayId, name, amount, currency, newReceipt, status],
          (insertErr, insertResult) => {
            if (insertErr) {
              console.error("Error creating order:", insertErr);
              res.status(500).json({ error: "Failed to create order" });
            } else {
              const orderId = insertResult.insertId;
              const order = {
                id: orderId,
                name: name,
                receipt: newReceipt,
                amount: amount,
                currency: currency,
                status: "pending",
              };
              res.status(201).send(order);
            }
          }
        );
      });
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const registerPaymentStatus = (req, res) => {
  try {
    const id = req.params.payId;
    const statusText = req.body.status;

    const updateQuery =
      "UPDATE registration_payment SET status = ? WHERE recID = ?";

    db.query(updateQuery, [statusText, id], (err, result) => {
      if (err) {
        console.error("Error updating status:", err);
        res.status(500).send("Error updating status");
      } else {
        console.log("status updated successfully");
        res.send("status updated successfully");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const register = (req, res) => {
  try {
    const maxRegistrations = 180;

    const checkRegistrationsQuery =
      "SELECT COUNT(*) AS registrationCount FROM register";

    db.query(checkRegistrationsQuery, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      const registrationsCount = data[0].registrationCount;
      if (registrationsCount >= maxRegistrations) {
        return res.status(400).json({
          error: "Sorry, registrations are closed. All seats have been filled.",
        });
      }

      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded." });
      }

      const imageUrl = `http://localhost:${PORT}/uploads/${file.filename}`;
      const formData = req.body;

      const checkStudentExistsQuery = `
        SELECT COUNT(*) AS studentCount
        FROM register
        WHERE firstname = ? AND father_name = ? AND mother_name = ? AND mobile = ?
      `;

      const queryParams = [
        formData.firstname,
        formData.father_name,
        formData.mother_name,
        formData.mobile,
      ];

      db.query(checkStudentExistsQuery, queryParams, (err, result) => {
        if (err) {
          console.error("Error checking if student exists in MySQL:", err);
          res.status(500).json({ error: "Internal server error" });
        } else {
          const studentCount = result[0].studentCount;
          if (studentCount > 0) {
            return res.status(400).json({
              error:
                "A student with the same name, father's name, mother's name, and mobile number already exists.",
            });
          } else {
            // const filename = formData.birthCertificateFileName;
            // console.log(formData, "971");
            // const imageUrl = `http://localhost:${PORT}/uploads/${filename}`;
            const query = `
  INSERT INTO register (
    class_for_admission, 
    present_school, 
    present_class, 
    present_school_city, 
    firstname, 
    middlename, 
    lastname,
    date_of_birth,
    dob_in_words,
    Age,
    gender, 
    Religion,
    caste,
    category,
    mobile, 
    birth_certificate,
    no_of_boys,
    No_of_girls,
    adhar_number, 
    father_name, 
    father_qualification,
    father_occupation,
    father_profession, 
    father_employer, 
    father_business_details,
    father_email,
    father_mobile,
    father_annual_income,
    father_residential_address,
    father_office_address,
    mother_name, 
    mother_qualification,
    mother_occupation,
    mother_profession, 
    mother_employer, 
    mother_business_details, 
    mother_email,
    mother_mobile, 
    mother_annual_income, 
    mother_residential_address,
    office_address,
    child_one_name, 
    child_one_addmission_no, 
    child_one_class, 
    child_one_section,
    child_two_name,
    child_two_addmission_no,
    child_two_class,
    child_two_section
  )
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) 
`;
            const queryParams = [
              formData.class_for_admission,
              formData.present_school,
              formData.present_class,
              formData.present_school_city,
              formData.firstname,
              formData.middlename,
              formData.lastname,
              formData.date_of_birth,
              formData.dob_in_words,
              formData.Age,
              formData.gender,
              formData.Religion,
              formData.caste,
              formData.category,
              formData.mobile,
              imageUrl,
              formData.no_of_boys,
              formData.No_of_girls,
              formData.adhar_number,
              formData.father_name,
              formData.father_qualification,
              formData.father_occupation,
              formData.father_profession,
              formData.father_employer,
              formData.father_business_details,
              formData.father_email,
              formData.father_mobile,
              formData.father_annual_income,
              formData.father_residential_address,
              formData.father_office_address,
              formData.mother_name,
              formData.mother_qualification,
              formData.mother_occupation,
              formData.mother_profession,
              formData.mother_employer,
              formData.mother_business_details,
              formData.mother_email,
              formData.mother_mobile,
              formData.mother_annual_income,
              formData.mother_residential_address,
              formData.office_address,
              formData.child_one_name,
              formData.child_one_addmission_no,
              formData.child_one_class,
              formData.child_one_section,
              formData.child_two_name,
              formData.child_two_addmission_no,
              formData.child_two_class,
              formData.child_two_section,
            ];
            db.query(query, queryParams, (err, result) => {
              if (err) {
                console.error("Error inserting data into MySQL:", err);
                res.status(500).json({ error: "Internal server error" });
              } else {
                res.status(200).json({ message: "Registration successful!" });
              }
            });
          }
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const getReceiptViaID = (req, res) => {
  const studentId = req.params.id;

  try {
    db.query(
      `SELECT registration_payment.*, register.*
      FROM registration_payment
      INNER JOIN register ON registration_payment.recID = register.id
      WHERE registration_payment.recID = ?`,
      [studentId],
      (error, results) => {
        if (error) {
          console.error(error);
          res
            .status(500)
            .json({ error: "An error occurred while fetching student data." });
        } else {
          if (results.length === 0) {
            res.status(404).json({ error: "Student not found." });
          } else {
            res.json(results[0]);
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching student data." });
  }
};

export const getStudentBirthCertificateviaId = (req, res) => {
  const studentId = req.params.id;

  try {
    const getquery = "SELECT birth_certificate FROM register WHERE id = ?";

    db.query(getquery, [studentId], async (err, result) => {
      if (err) {
        console.log("Error in fetching data:");
        res.status(500).json({ error: "Error in fetching data" });
      } else {
        if (result.length === 0) {
          res.status(404).json({ error: "Student not found" });
        } else {
          const birthCertificateUrl = result[0].birth_certificate;

          try {
            // Download the birth certificate file using Axios
            const response = await axios.get(birthCertificateUrl, {
              responseType: "stream",
            });

            // Set the appropriate headers for downloading the file
            res.setHeader(
              "Content-Disposition",
              "attachment; filename=student_birth_certificate.pdf"
            );
            res.setHeader("Content-Type", "application/pdf");

            // Pipe the response data stream to the response object
            response.data.pipe(res);
          } catch (downloadError) {
            console.error("Error downloading birth certificate:");
            res
              .status(500)
              .json({ error: "Error downloading birth certificate" });
          }
        }
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
