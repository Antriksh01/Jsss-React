import express from "express";
import multer from "multer";
import {
  NoticeDelete,
  addBlockedStudent,
  addImage,
  addTOCart,
  adminLogin,
  adminRegister,
  blockedStudentList,
  createNotice,
  createOrder,
  deleteCart,
  deleteEvent,
  deleteImages,
  deleteSingleCartItem,
  deleteStudentFromBlock,
  downloadImages,
  downloadgetAllRegStudent,
  downloadgetOnlyRegStudent,
  eventlist,
  galleryLogin,
  getAllImages,
  getAllImagesViaEventId,
  getAllListItems,
  getAllNotices,
  getAllRegStudent,
  getAllStudent,
  getCartItems,
  getLastReceipt,
  getLastStudent,
  getReceiptViaID,
  getStudentBirthCertificateviaId,
  getStudentViaID,
  register,
  registerPayment,
  registerPaymentStatus,
  updateEventList,
  updateImages,
  updateNotice,
  updateStatus,
  verifyPayment,
} from "../controller/userAuth.js";
import { db } from "../connect.js";
import { extname } from "path";

const router = express.Router();
// gallery-image-upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const fileName =
      file.fieldname + "-" + Date.now() + extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });
router.post("/e-register", upload.single("birth_certificate"), register);

const otherStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "gallery/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + extname(file.originalname));
  },
});

const gallery = multer({ storage: otherStorage });
router.post("/add-gallery-image", gallery.array("image"), addImage);
router.put("/update-image/:id", updateImages);
router.delete("/deleteImages/:id", deleteImages);
router.post("/admin-login", adminLogin);
router.post("/add-eventlist", eventlist);
router.delete("/event-delete/:eventId", deleteEvent);
router.put("/updateEventList/:id", updateEventList);
router.post("/createNotice", createNotice);
router.get("/getAllNotice", getAllNotices);
router.put("/updateNotice/:id", updateNotice);
router.delete("/noticeDelete/:id", NoticeDelete);
router.get("/getAllStudent", getAllStudent);
router.get("/getLastStudent", getLastStudent);
router.get("/getstudentviaid/:id", getStudentViaID);
router.post("/registerPayment", registerPayment);
router.put("/registerPaymentStatus/:payId", registerPaymentStatus);

router.get("/getallImages", getAllImages);
router.post("/create-order", createOrder);
router.post("/gallery-login", galleryLogin);
router.post("/add-to-cart", addTOCart);
router.get("/getCartItems/:userId", getCartItems);
router.delete("/deleteCartItems/:userId", deleteCart);
router.delete("/cart-items-delete/:userId/:itemId", deleteSingleCartItem);
router.get("/getAllListItems", getAllListItems);
router.get("/getAllImagesViaEventName/:event", getAllImagesViaEventId);
router.delete("/deleteCartItems/:userId", deleteCart);
router.post("/verify-payment", verifyPayment);
router.put("/update-order/:orderId", updateStatus);
router.get("/downloadImages", downloadImages);
router.get("/getLastReceipt", getLastReceipt);
router.post("/adminRegister", adminRegister);
router.get("/getReceiptViaID/:id", getReceiptViaID);
router.get(
  "/getStudentBirthCertificateviaId/:id",
  getStudentBirthCertificateviaId
);
router.post("/addBlockedStudent", addBlockedStudent);
router.get("/blockedStudentList", blockedStudentList);
router.delete("/deleteStudentFromBlock/:id", deleteStudentFromBlock);
router.get("/getAllRegStudent", getAllRegStudent);
router.get("/downloadgetAllRegStudent", downloadgetAllRegStudent);
router.get("/downloadgetOnlyRegStudent", downloadgetOnlyRegStudent);

export { router as authRoutes };
