"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post('/add', [
    (0, express_validator_1.check)('username', 'El username es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Agrega un email valido').isEmail(),
    (0, express_validator_1.check)('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
], usersController_1.newUser);
exports.default = router;
