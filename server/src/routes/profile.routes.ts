import { Router } from "express";
import { createImageProfile, deleteImageProdile, getImagesProfilebyId, changeUserImageProfile, updateNameProfile } from "../controllers/profile.Controller";
import upload from "../middleware/upload";
import { authRequired } from "../middleware/validatorToken";

const proRoute = Router();

proRoute.get("/profile/image/:id", authRequired, getImagesProfilebyId)
proRoute.post("/profile/image", authRequired, upload, createImageProfile)
proRoute.put("/profile/image/:id", authRequired, changeUserImageProfile)
proRoute.put("/profile/name/:id", authRequired, updateNameProfile)
proRoute.delete("/profile/image/:id", authRequired, deleteImageProdile)

export default proRoute