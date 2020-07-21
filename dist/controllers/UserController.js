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
const user_1 = __importDefault(require("../db/models/user"));
const sequelize_1 = require("sequelize");
class UserController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let users = yield user_1.default.findAll({
                    attributes: ['id', 'name', 'cpf', 'email', 'createdAt', 'updatedAt'],
                    order: [
                        ['name', 'ASC']
                    ],
                });
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ msg: "Server error", err: error });
            }
        });
    }
    getAllByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield user_1.default.findAll({
                    attributes: ['id', 'name', 'cpf', 'email', 'createdAt', 'updatedAt'],
                    where: {
                        name: { [sequelize_1.Op.like]: `${req.params.name}%` }
                    },
                    order: [
                        ['name', 'ASC']
                    ]
                }));
            }
            catch (error) {
                res.status(500).json({ msg: "Server error", err: error });
            }
        });
    }
    findByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield user_1.default.findOne({
                    attributes: ['id', 'name', 'cpf', 'email', 'createdAt', 'updatedAt'],
                    where: {
                        name: {
                            [sequelize_1.Op.like]: `${req.params.name}%`
                        }
                    }
                });
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ error: 'Not Found' });
                }
            }
            catch (error) {
                res.status(500).json({ msg: "Don't updated", err: error });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, cpf, email, password } = req.body;
                yield user_1.default.create({ name, cpf, email, password });
                res.json({ msg: 'Save' }).status(200);
            }
            catch (error) {
                res.status(500).json({ msg: "Don't saved", err: error });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, email, password } = req.body;
                yield user_1.default.update({ name, email, password }, {
                    where: {
                        id: req.params.id
                    }
                });
                res.json({ msg: 'Update' }).status(200);
            }
            catch (error) {
                res.status(500).json({ msg: "Don't updated", err: error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_1.default.destroy({ where: { name: req.params.name } });
                res.status(200).json({ msg: 'Deleted' });
            }
            catch (error) {
                res.status(500).json({ msg: "Don't deleted", err: error });
            }
        });
    }
}
exports.default = new UserController();
