import express from "express";
import { checkUserAndPass, getUserByName, getAllProducts } from "./DAL.js";

const router = express.Router();

router.post('/login', async (req, res) => {
    const { user_name, password } = req.body;

    try {
        const ok = await checkUserAndPass(user_name, password);

        if (ok) {
            return res.status(401).json({error: "Wrong username or password"})
        } else {         
            const user = await getUserByName(user_name);
            res.json({ message: "login successful", user: { user_name: user.user_name, password: user.password } })
            router.get('/products',  async (req, res) => {
                const products = await getAllProducts();
                res.json(products)
            })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }

})

export default router;