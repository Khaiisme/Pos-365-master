const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Order = require('./Order');
const app = express();
const Note = require('./Note');

// Middleware to handle CORS and JSON parsing
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
require('dotenv').config();
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// POST /api/orders - save all table orders

app.post('/api/orders', async (req, res) => {
  try {
    const { table, orders } = req.body;

    if (!table || !Array.isArray(orders)) {
      return res.status(400).json({ error: 'Invalid format. Expecting {table, orders}' });
    }

    console.log("Updating table:", table);

    const updated = await Order.findOneAndUpdate(
      { table },       // match by table
      { orders },      // update the orders for that table
      { new: true, upsert: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: 'Failed to save order' });
  }
});
// GET /api/orders - fetch all orders
app.get('/api/orders', async ( req , res) => {
  try {
    const allOrders = await Order.find();
    res.status(200).json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.post('/api/notes', async (req, res) => {
  try {
    const { tableName, note } = req.body;

    console.log("Received note for table:", tableName, "Note:", note);

    // Create and save the note
    const newNote = new Note({ tableName, note });
    await newNote.save();

    res.status(201).json({ 
      message: 'Note saved successfully.', 
      note: newNote 
    });

  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


app.get('/health', async (req, res) => {
  const isConnected = mongoose.connection.readyState === 1; // 1 = connected

  if (isConnected) {
    res.status(200).json({ status: 'ok', db: 'connected' });
  } else {
    res.status(503).json({ status: 'fail', db: 'disconnected' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});