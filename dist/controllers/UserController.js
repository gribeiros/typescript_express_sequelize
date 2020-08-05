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
const HttpException_1 = __importDefault(require("../api/handler/HttpException"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class UserController {
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let users = yield user_1.default.findAll({
                    attributes: ['id', 'name', 'cpf', 'email', 'createdAt', 'updatedAt'],
                    order: [
                        ['name', 'ASC']
                    ],
                });
                res.status(http_status_codes_1.default.OK).json(users);
            }
            catch (error) {
                next(new HttpException_1.default(error, http_status_codes_1.default.INTERNAL_SERVER_ERROR));
            }
        });
    }
    getAllByName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(http_status_codes_1.default.OK).json(yield user_1.default.findAll({
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
                next(new HttpException_1.default(error, http_status_codes_1.default.INTERNAL_SERVER_ERROR));
            }
        });
    }
    findByName(req, res, next) {
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
                    res.status(http_status_codes_1.default.OK).json(user);
                }
                else {
                    next(new HttpException_1.default('Not Found', http_status_codes_1.default.NOT_FOUND));
                }
            }
            catch (error) {
                next(new HttpException_1.default(error, http_status_codes_1.default.INTERNAL_SERVER_ERROR));
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, cpf, email, password } = req.body;
                yield user_1.default.create({ name, cpf, email, password });
                res.json({ msg: 'Save' }).status(http_status_codes_1.default.OK);
            }
            catch (error) {
                next(new HttpException_1.default(error, http_status_codes_1.default.INTERNAL_SERVER_ERROR));
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, email, password } = req.body;
                yield user_1.default.update({ name, email, password }, {
                    where: {
                        id: req.params.id
                    }
                });
                res.json({ msg: 'Update' }).status(http_status_codes_1.default.OK);
            }
            catch (error) {
                next(new HttpException_1.default(error, http_status_codes_1.default.INTERNAL_SERVER_ERROR));
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_1.default.destroy({ where: { name: req.params.name } });
                res.status(http_status_codes_1.default.OK).json({ msg: 'Deleted' });
            }
            catch (error) {
                next(new HttpException_1.default(error, http_status_codes_1.default.INTERNAL_SERVER_ERROR));
            }
        });
    }
}
exports.default = new UserController();
