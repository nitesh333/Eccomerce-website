require('dotenv').config();
const { sequelize } = require('./config/db');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const products = [
    {
        name: "Vintage Sapphire Pendant",
        description: "An exquisite 1920s sapphire pendant set in genuine 18k yellow gold. Comes with a complimentary appraisal certificate. The craftsmanship reflects the peak of the Art Deco period.",
        price: 3800,
        category: "Jewelry",
        imageUrl: "https://images.unsplash.com/photo-1599643477874-ce444bf42fd7?auto=format&fit=crop&w=800&q=80",
        stock: 1
    },
    {
        name: "Artisan Handwoven Linen Tunic",
        description: "Made entirely by hand on a traditional loom, this natural linen tunic features delicate embroidery inspired by ancestral motifs. Perfect for a sophisticated, relaxed aesthetic.",
        price: 320,
        category: "Clothing",
        imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
        stock: 5
    },
    {
        name: "Heritage Chronograph Watch",
        description: "A meticulously restored mid-century chronograph. Features a mechanical hand-wound movement, deep brown leather strap, and a patina dial that tells a story of time.",
        price: 1550,
        category: "Watches",
        imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
        stock: 2
    },
    {
        name: "Oud & Silk Extract Perfume",
        description: "A masterful blend of rare Cambodian Oud, Damask rose, and subtle hints of aged sandalwood. Bottled in a hand-blown artisan glass flacon.",
        price: 245,
        category: "Perfumes",
        imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
        stock: 15
    },
    {
        name: "Raw Wildflower Mountain Honey",
        description: "Harvested from remote Himalayan apiaries. Unfiltered, unheated, and incredibly rich in medicinal properties and profound floral notes.",
        price: 65,
        category: "Honey",
        imageUrl: "https://images.unsplash.com/photo-1587049352847-4d4b12bba3f5?auto=format&fit=crop&w=800&q=80",
        stock: 30
    },
    {
        name: "Hammered Silver Decorative Bowl",
        description: "A solid 925 sterling silver artisan bowl. Hand-hammered for over 40 hours by master silversmiths to create an organic, textural surface.",
        price: 1250,
        category: "Other",
        imageUrl: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80",
        stock: 3
    }
];

const seedDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        console.log("Database synchronized.");

        // Create Admin User
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('admin123', salt);
        await User.create({
            name: "Admin User",
            email: "admin@thecurator.com",
            password: adminPassword,
            role: "admin"
        });
        console.log("Admin user created (admin@thecurator.com / admin123)");

        // Insert Products
        await Product.bulkCreate(products);
        console.log("Products seeded successfully.");

        process.exit();
    } catch (error) {
        console.error("Error seeding database: ", error);
        process.exit(1);
    }
};

seedDB();
