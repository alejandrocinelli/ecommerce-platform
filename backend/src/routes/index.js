import {Router} from 'express';
import usersRoutes from './usersRoutes.js';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router(); 

router.use('/auth', (usersRoutes));
//router.use('/auth', (usersRoutes));
router.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../../views/index2.html'));
});

export default router;