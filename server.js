const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
const path = require('path');

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
const MONGO_URI = process.env.MONGO_URI || 'mongodb://lyduclam2003_db_user:0328580497@ac-k4vaknf-shard-00-00.j5ccipx.mongodb.net:27017,ac-k4vaknf-shard-00-01.j5ccipx.mongodb.net:27017,ac-k4vaknf-shard-00-02.j5ccipx.mongodb.net:27017/?ssl=true&replicaSet=atlas-umwqkn-shard-0&authSource=admin&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => console.log(' Đã kết nối MongoDB thành công!'))
  .catch(err => console.error(' Lỗi kết nối MongoDB:', err));

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: [{ type: String }],
  image: { type: String, required: true },
  description: { type: String, default: "Mẫu giày thể thao thiết kế hiện đại, chất liệu thoáng khí, đệm êm ái hỗ trợ vận động cả ngày dài." },
  stock: { type: Number, default: 50 }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const orderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Pending' 
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);



app.get('/api/products', async (req, res) => {
  try {
    const { brand, size } = req.query;
    let filter = {};

    if (brand && brand !== 'all') filter.brand = brand;
    if (size && size !== 'all') filter.sizes = size;

    const products = await Product.find(filter);
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


app.post('/api/orders', async (req, res) => {
  try {
    const { customer, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Giỏ hàng trống!' });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ success: false, message: `Không tìm thấy sản phẩm ID: ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Sản phẩm ${product.name} không đủ số lượng trong kho!` });
      }

      product.stock -= item.quantity;
      await product.save();

      totalAmount += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });
    }

    const order = new Order({
      customer,
      items: orderItems,
      totalAmount
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Đặt hàng thành công!',
      orderId: order._id,
      totalAmount
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server đang chạy tại: http://localhost:${PORT}`);
});