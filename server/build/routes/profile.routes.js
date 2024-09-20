"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_Controller_1 = require("../controllers/profile.Controller");
const upload_1 = __importDefault(require("../middleware/upload"));
const validatorToken_1 = require("../middleware/validatorToken");
const proRoute = (0, express_1.Router)();
proRoute.get("/profile/image/:id", validatorToken_1.authRequired, profile_Controller_1.getImagesProfilebyId);
proRoute.post("/profile/image", validatorToken_1.authRequired, upload_1.default, profile_Controller_1.createImageProfile);
proRoute.put("/profile/image/:id", validatorToken_1.authRequired, profile_Controller_1.changeUserImageProfile);
proRoute.put("/profile/name/:id", validatorToken_1.authRequired, profile_Controller_1.updateNameProfile);
proRoute.delete("/profile/image/:id", validatorToken_1.authRequired, profile_Controller_1.deleteImageProdile);
exports.default = proRoute;
