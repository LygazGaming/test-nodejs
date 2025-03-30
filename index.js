const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/userRoutes");

// Middleware để parse JSON
app.use(express.json());

// Kết nối MongoDB (chuyển đổi sang IPv4 nếu gặp lỗi IPv6)
const mongoURI = "mongodb://127.0.0.1:27017/demonodejs"; // Chuỗi kết nối MongoDB cục bộ

mongoose
  .connect(mongoURI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/users", userRoutes);

// Lắng nghe server (hardcode port)
const PORT = 3000; // Port cố định
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
