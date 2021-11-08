import Router from "express";
import usersController from "../controllers/usersController.js";
import { body } from "express-validator";
const router = new Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  usersController.registration
);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.get("/refresh", usersController.refresh);

export default router;
