"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageProdile = exports.changeUserImageProfile = exports.createImageProfile = exports.getImagesProfilebyId = exports.updateNameProfile = void 0;
const connectiondb_1 = __importDefault(require("../utils/connectiondb"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const seachFile_1 = require("../utils/seachFile");
const updateNameProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const pgClient = yield connectiondb_1.default.connect();
        yield pgClient.query("update users set name = $1 where id = $2", [name, req.params.id]);
        pgClient.release();
        res.json({ msg: "nombre modificado" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateNameProfile = updateNameProfile;
//images
const getImagesProfilebyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pgClient = yield connectiondb_1.default.connect();
        const response = yield pgClient.query('SELECT * FROM images WHERE id = $1', [req.params.id]);
        if (Array.isArray(response.rows) && response.rows.length == 0)
            res.status(404).json({ msg: "no hay archivos" });
        const file = response.rows;
        fs_1.default.writeFileSync(path_1.default.join(__dirname, '../dbImages/' + file[0].id + "-facichat.png"), file[0].data);
        const images = fs_1.default.readdirSync(path_1.default.join(__dirname, '../dbImages/'));
        let fileFound = (0, seachFile_1.getElementByNumber)(images, parseInt(req.params.id));
        pgClient.release();
        res.json(fileFound);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getImagesProfilebyId = getImagesProfilebyId;
const createImageProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const type = (_a = req.file) === null || _a === void 0 ? void 0 : _a.mimetype;
    const name = (_b = req.file) === null || _b === void 0 ? void 0 : _b.originalname;
    const data = fs_1.default.readFileSync(path_1.default.join(__dirname, '../images/' + ((_c = req.file) === null || _c === void 0 ? void 0 : _c.filename)));
    try {
        const pgClient = yield connectiondb_1.default.connect();
        //subimos la img a la db
        yield pgClient.query('INSERT INTO images(type, name, data)  VALUES($1, $2, $3)', [type, name, data]);
        //seleccionamos la ultima img de la tabla
        const myImages = yield pgClient.query('SELECT * FROM images ORDER BY id DESC LIMIT 1');
        pgClient.release();
        if (Array.isArray(myImages.rows))
            res.json(myImages.rows[0]);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createImageProfile = createImageProfile;
const changeUserImageProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imgId = req.params.id;
    const { id } = req.body;
    try {
        const pgClient = yield connectiondb_1.default.connect();
        yield pgClient.query("update users set id_image = $1 where id = $2", [imgId, id]);
        pgClient.release();
        res.send("mensaje modificado");
    }
    catch (error) {
        console.log(error);
    }
});
exports.changeUserImageProfile = changeUserImageProfile;
const deleteImageProdile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pgClient = yield connectiondb_1.default.connect();
        yield pgClient.query("DELETE FROM images WHERE id = $1", [req.params.id]);
        pgClient.release();
        res.send("mensaje eliminado");
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteImageProdile = deleteImageProdile;
