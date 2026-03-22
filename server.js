require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public folder (admin dashboard will go here)
app.use(express.static('public'));

// Connect to the Database
connectDB();

// Root API Route
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the Artisanal E-commerce API' });
});

// Import Models and Routes
require('./models/User');
require('./models/Product');
require('./models/Order');
require('./models/CustomRequest');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const customRequestRoutes = require('./routes/customRequestRoutes');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/requests', customRequestRoutes);

// Set Port
const PORT = process.env.PORT || 5000;

// Sync database models and start server
sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to sync database:', err.message);
});
