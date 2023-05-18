import express from "express";
import {
  addCustomer,
  deleteCustomer,
  editCustomer,
  getByIdCustomer,
  getCustomer,
} from "../controller/customerController.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // define the storage directory
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/:/g, "-"); // define the filename format
    cb(null, `${timestamp}-${file.originalname}`);
  },
});

// Define the Multer middleware with the storage option
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/", upload.single("image"), addCustomer);
router.get("/", getCustomer);
router.get("/:id", getByIdCustomer);
router.put("/:id", upload.single("image"), editCustomer);
router.delete("/:id", deleteCustomer);

export default router;
