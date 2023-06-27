"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
;
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    username: {
        type: String,
        require: true,
        trim: true,
    },
});
//Este es un middleware para verificar si se modifico el password del usuario
userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified('password'))
        return next();
    const salt = await bcrypt_1.default.genSalt(10);
    const hash = await bcrypt_1.default.hash(user.password, salt);
    user.password = hash;
    next();
});
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt_1.default.compare(password, this.password);
};
exports.default = (0, mongoose_1.model)("User", userSchema);
