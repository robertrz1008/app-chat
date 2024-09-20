import { Request, Response, Router } from "express";
import { getUsersRequest, loginRrquest, logoutRequest, profileRequest, registerRequest, verifyToken } from "../controllers/authController";
import { authRequired } from "../middleware/validatorToken";
import { requireInput, validateSchema } from "../middleware/validatorMiddleware";
import { loginSchema, registerSchema } from "../schemas/authSchema";

const autRoute = Router()

autRoute.get("/users",  getUsersRequest)
autRoute.post("/register",requireInput , validateSchema(registerSchema),registerRequest)
autRoute.post("/login/", validateSchema(loginSchema), loginRrquest)
autRoute.post("/logout", logoutRequest) 
autRoute.get("/profile", authRequired, profileRequest)
autRoute.get("/verify", verifyToken) 


export default autRoute