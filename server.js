require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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

// Setup Multer for Admin Image Uploads
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ 
    storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50 MB limit
});

app.post('/api/upload', upload.single('image'), (req, res) => {
    if(!req.file) return res.status(400).json({message: 'No file uploaded'});
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Global Error Handler to force JSON responses on crashes instead of HTML stack traces
app.use((err, req, res, next) => {
    console.error("Express Error:", err.message);
    res.status(500).json({ message: err.message || "Internal Server Error" });
});

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
