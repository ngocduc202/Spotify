import {Router} from 'express';

const router = Router();

router.get("/" , (req , res) => {
    res.send("song get mothod")
})

export default router;