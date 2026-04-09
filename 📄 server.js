const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('InsurAI Backend Running');
});

// GET API - Fetch available insurance policies
app.get('/api/policies', (req, res) => {
  res.json({
    success: true,
    policies: [
      { id: 1, name: "Health Insurance" },
      { id: 2, name: "Life Insurance" },
      { id: 3, name: "Vehicle Insurance" }
    ]
  });
});

// POST API - Receive user details
app.post('/api/user', (req, res) => {
  const { name, age, income } = req.body;

  if (!name || !age) {
    return res.status(400).json({
      success: false,
      message: "Name and Age are required"
    });
  }

  res.json({
    success: true,
    message: "User data received successfully",
    user: {
      name,
      age,
      income
    }
  });
});

// POST API - Risk analysis logic
app.post('/api/risk', (req, res) => {
  const { age, income } = req.body;

  let riskLevel = "Low";

  if (age > 50 || income < 20000) {
    riskLevel = "High";
  } else if (age > 30) {
    riskLevel = "Medium";
  }

  res.json({
    success: true,
    riskLevel: riskLevel
  });
});

// 404 route (if API not found)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Server setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});