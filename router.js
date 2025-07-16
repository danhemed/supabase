import express from "express";
import { checkUserAndPass, getAllProducts } from "./DAL.js";

const router = express.Router();

router.post('/login', async (req, res) => {
    const { user_name, password } = req.body;

    try {
        const ok = await checkUserAndPass(user_name, password);

        if (!ok) {
            return res.status(401).json({ error: "Wrong username or password" });
        }

        res.json({ message: "login successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/products', async (req, res) => {
  const { username, password } = req.headers;

  if (!username || !password)
    return res.status(400).json({ error: 'Username and password required in headers' });

  const isValid = await checkUserAndPass(username, password);

  if (!isValid) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export default router;