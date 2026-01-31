const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const filePath = path.join(__dirname, "../data/alerts.json");

const readData = () => {
  return JSON.parse(fs.readFileSync(filePath));
};

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};



// GET (with filters and pagination)
router.get("/", (req, res) => {

  let alerts = readData();

  const { country, status, page = 1, limit = 5 } = req.query;

  // Filters
  if (country) {
    alerts = alerts.filter(a => a.country === country);
  }

  if (status) {
    alerts = alerts.filter(a => a.status === status);
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedData = alerts.slice(startIndex, endIndex);

  res.json({
    total: alerts.length,
    page: Number(page),
    limit: Number(limit),
    data: paginatedData
  });
});




// POST
router.post("/", (req, res, next) => {
  try {

    const { country, city, visaType } = req.body;

    if (!country || !city || !visaType) {
      const err = new Error("All fields required");
      err.status = 400;
      throw err;
    }

    const alerts = readData();

    const newAlert = {
      id: uuidv4(),
      country,
      city,
      visaType,
      status: "Active",
      createdAt: new Date()
    };

    alerts.push(newAlert);
    writeData(alerts);

    res.status(201).json(newAlert);

  } catch (err) {
    next(err); // send to centralized handler
  }
});


// UPDATE
router.put("/:id", (req, res) => {

  const alerts = readData();

  const index = alerts.findIndex(
    a => a.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Not found"
    });
  }

  alerts[index].status = req.body.status;

  writeData(alerts);

  res.json(alerts[index]);
});




// DELETE
router.delete("/:id", (req, res) => {

  const alerts = readData();

  const newAlerts = alerts.filter(
    a => a.id !== req.params.id
  );

  writeData(newAlerts);

  res.json({ message: "Deleted" });
});


module.exports = router;
