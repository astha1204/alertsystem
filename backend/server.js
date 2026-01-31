const express = require("express");
const cors = require("cors");
require("dotenv").config();

const alertRoutes = require("./routes/alerts");
const logger = require("./middleware/logger");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/alerts", alertRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
