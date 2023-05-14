import args from "../yargs.js";
import {Router} from 'express';
import { infoController } from "../controllers/info.controller.js";
const router = Router();

router.get('/', infoController.info);

export default router;