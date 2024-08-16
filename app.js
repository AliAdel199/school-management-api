const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/school_management', {

});

// Routes
const studentRoutes = require('./routes/students');
const employeeRoutes = require('./routes/employees');

app.use(studentRoutes);
app.use(employeeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
