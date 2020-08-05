import { Request, Response, NextFunction } from 'express'
import User from '../db/models/user'
import { Op } from 'sequelize'
import HttpException from '../api/handler/HttpException'
import HttpStatus from 'http-status-codes'

class UserController {

    public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            let users = await User.findAll({
                attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
                order: [
                    ['name', 'ASC']
                ],
            })
            res.status(HttpStatus.OK).json(users)
        } catch (error) {
            next(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR))
        }
    }

    public async getAllByName(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            res.status(HttpStatus.OK).json(await User.findAll({
                attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
                where: {
                    name: { [Op.like]: `${req.params.name}%` }
                },
                order: [
                    ['name', 'ASC']
                ]
            }))
        } catch (error) {
            next(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR))
        }
    }

    public async findByName(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            let user = await User.findOne({
                attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
                where: {
                    name: {
                        [Op.like]: `${req.params.name}%`
                    }
                }
            });
            if (user) {
                res.status(HttpStatus.OK).json(user)
            } else {
                next(new HttpException('Not Found', HttpStatus.NOT_FOUND))
            }
        } catch (error) {
            next(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR))
        }

    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let { name, email, password } = req.body
            await User.create({ name, email, password })
            res.json({ msg: 'Save' }).status(HttpStatus.OK)
        } catch (error) {
            next(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR))
        }
    }


    public async update(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            let { name, email, password } = req.body
            await User.update({ name, email, password }, {
                where: {
                    id: req.params.id
                }
            })
            res.json({ msg: 'Update' }).status(HttpStatus.OK)
        } catch (error) {
            next(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR))
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await User.destroy({ where: { name: req.params.name } })
            res.status(HttpStatus.OK).json({ msg: 'Deleted' })
        } catch (error) {
            next(new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR))
        }


    }

}

export default new UserController();