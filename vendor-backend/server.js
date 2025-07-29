// vendor-backend/server.js

const express = require('express');
const { Pool } = require('pg'); // Import the pg library
const app = express();
const PORT = 5001;

// --- Middleware ---
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Make sure DELETE is included in the allowed methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json());

// --- PostgreSQL Connection Pool ---
// IMPORTANT: Replace 'YOUR_PASSWORD' with your actual PostgreSQL password.
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'vendordb',
  password: '1212',
  port: 5432,
});

// --- API Endpoints ---

// GET route to fetch all vendors
app.get("/api/vendors", async (req, res) => {
    try {
        const allVendors = await pool.query("SELECT * FROM vendors ORDER BY id ASC");
        const formattedVendors = allVendors.rows.map(row => ({
            id: row.id,
            formData: {
                storeName: row.store_name, ownerName: row.owner_name, phone: row.phone, email: row.email, location: row.location, address: row.address, state: row.state, city: row.city, pincode: row.pincode, landmark: row.landmark, description: row.description,
            },
            timings: row.timings,
            businessDetails: {
                gst: row.gst, pan: row.pan, commission: row.commission_percent, bankName: row.bank_name, accountType: row.account_type, accountHolderName: row.account_holder_name, accountNumber: row.account_number, ifscCode: row.ifsc_code,
            }
        }));
        res.status(200).json(formattedVendors);
    } catch (err) {
        console.error("Database Error:", err.message);
        res.status(500).json({ success: false, message: "Failed to fetch vendors." });
    }
});

// POST route to create a new vendor
app.post("/api/vendors", async (req, res) => {
    const { formData, timings, businessDetails } = req.body;
    try {
        const newVendor = await pool.query(
            `INSERT INTO vendors (store_name, owner_name, phone, email, location, address, state, city, pincode, landmark, description, gst, pan, commission_percent, bank_name, account_type, account_holder_name, account_number, ifsc_code, timings) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING *`,
            [
                formData.storeName, formData.ownerName, formData.phone, formData.email, formData.location, formData.address, formData.state, formData.city, formData.pincode, formData.landmark, formData.description,
                businessDetails.gst, businessDetails.pan, businessDetails.commission,
                businessDetails.bankName, businessDetails.accountType, businessDetails.accountHolderName,
                businessDetails.accountNumber, businessDetails.ifscCode, timings
            ]
        );
        res.status(201).json({ success: true, vendor: newVendor.rows[0] });
    } catch (err) {
        console.error("Database Error:", err.message);
        res.status(500).json({ success: false, message: "Failed to save data to database." });
    }
});

// PUT route to update an existing vendor
app.put("/api/vendors/:id", async (req, res) => {
    const { id } = req.params;
    const { formData, timings, businessDetails } = req.body;
    try {
        const updatedVendor = await pool.query(
            `UPDATE vendors SET store_name = $1, owner_name = $2, phone = $3, email = $4, location = $5, address = $6, state = $7, city = $8, pincode = $9, landmark = $10, description = $11, gst = $12, pan = $13, commission_percent = $14, bank_name = $15, account_type = $16, account_holder_name = $17, account_number = $18, ifsc_code = $19, timings = $20 WHERE id = $21 RETURNING *`,
            [
                formData.storeName, formData.ownerName, formData.phone, formData.email, formData.location, formData.address, formData.state, formData.city, formData.pincode, formData.landmark, formData.description,
                businessDetails.gst, businessDetails.pan, businessDetails.commission,
                businessDetails.bankName, businessDetails.accountType, businessDetails.accountHolderName,
                businessDetails.accountNumber, businessDetails.ifscCode, timings,
                id
            ]
        );
        res.status(200).json({ success: true, vendor: updatedVendor.rows[0] });
    } catch (err) {
        console.error("Database Error:", err.message);
        res.status(500).json({ success: false, message: "Failed to update data in database." });
    }
});

// DELETE route to remove a vendor
app.delete("/api/vendors/:id", async (req, res) => {
    // ADDED: This new log will tell us if the request is being received.
    console.log(`DELETE request received for vendor ID: ${req.params.id}`);
    
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM vendors WHERE id = $1", [id]);
        res.status(200).json({ success: true, message: "Vendor deleted successfully" });
    } catch (err) {
        console.error("Database Error:", err.message);
        res.status(500).json({ success: false, message: "Failed to delete data." });
    }
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
