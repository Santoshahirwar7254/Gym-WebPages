const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


const app = express();
const router = express.Router();
const sendEmail = require("./utils/sendEmails");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5177"],
  methods: ["GET","POST"],
  credentials: true,
}));


app.use("/send/mail", router);

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    await sendEmail({
      email: "santoshahirwar7254@gmail.com",
      subject: "GYM WEBSITE CONTACT",
      message,
      userEmail: email,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Email sending failed",
    });
  }
});


app.listen(4000, () => console.log("Server running on port 4000"));
