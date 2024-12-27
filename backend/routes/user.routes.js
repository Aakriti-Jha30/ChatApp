import Router from "express"
import protectRoute from "../middleware/protectRoute.js";
import { getUsersforSidebar } from "../controllers/user.controller.js";


const router=Router();

router.get("/",protectRoute,getUsersforSidebar) //=>Everytime we ensure that we do not let unauthenticated users do anything

export default router
