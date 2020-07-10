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
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../models/index"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class User extends sequelize_1.Model {
    checkPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt_1.default.compare(password, this.passwordHash);
        });
    }
}
User.init({
    id: {
        type: new sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(120),
        allowNull: false,
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(80),
        allowNull: false,
    },
    password: {
        type: new sequelize_1.DataTypes.STRING(25),
        allowNull: false,
    },
    passwordHash: {
        type: new sequelize_1.DataTypes.STRING(125),
        allowNull: false,
    },
}, {
    tableName: "User",
    sequelize: index_1.default.connection,
});
User.addHook('beforeSave', (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.password) {
        user.passwordHash = yield bcrypt_1.default.hash(user.password, 8);
    }
}));
exports.default = User;
