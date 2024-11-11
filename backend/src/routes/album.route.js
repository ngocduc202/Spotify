import {Router} from 'express';

const router = Router();

router.get("/" , (req , res) => {
    res.send("album get mothod")
})

export default router;