import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connecetDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

// Connect to DB
await connecetDB();

// 🔍 Middleware to log incoming origins (for debugging CORS)
app.use((req, res, next) => {
  console.log('Incoming Request from:', req.headers.origin);
  next();
});

// ✅ CORS setup (without credentials for public API)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// ✅ Parse JSON body
app.use(express.json());

// ✅ Test route
app.get('/', (req, res) => res.send("API is Working"));

// ✅ API routes
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

// ✅ Start server (comment out if using Vercel)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

export default app;
