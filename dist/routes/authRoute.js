"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.post('/', [
    (0, express_validator_1.check)('email', 'Agrega un email valido').isEmail(),
    (0, express_validator_1.check)('password', 'Password no puede ir vacio').not().isEmpty(),
], authController_1.authenticateUser);
router.get('/', auth_1.default, authController_1.userAuthenticate);
exports.default = router;
