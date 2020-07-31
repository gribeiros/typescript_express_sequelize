import { Request, Response, NextFunction } from 'express'
import User from '../db/models/user'
import { Op } from 'sequelize'
import HttpException from '../api/handler/HttpException'

class UserController {

    public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            let users = await User.findAll({
                attributes: ['id', 'name', 'cpf', 'email', 'createdAt', 'updatedAt'],
                order: [
                    ['name', 'ASC']
                ],
            })
            res.status(200).json(users)
        } catch (error) {
            next(new HttpException(error, 500))
        }
    }

    public async getAllByName(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            res.status(200).json(await User.findAll({
                attributes: ['id', 'name', 'cpf', 'email', 'createdAt', 'updatedAt'],
                where: {
                    name: { [Op.like]: `${req.params.name}%` }
                },
                order: [
                    ['name', 'ASC']
                ]
            }))
        } catch (error) {
            next(new HttpException(error, 500))
        }
    }

    public async findByName(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            let user = await User.findOne({
                attributes: ['id', 'name', 'cpf', 'email', 'createdAt', 'updatedAt'],
                where: {
                    name: {
                        [Op.like]: `${req.params.name}%`
                    }
                }
            });
            if (user) {
                res.status(200).json(user)
            } else {
                next(new HttpException('Not Found', 404))
            }
        } catch (error) {
            next(new HttpException(error, 500))
        }

    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let { name, cpf, email, password } = req.body
            await User.create({ name, cpf, email, password })
            res.json({ msg: 'Save' }).status(200)
        } catch (error) {
            next(new HttpException(error, 500))
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
            res.json({ msg: 'Update' }).status(200)
        } catch (error) {
            next(new HttpException(error, 500))
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await User.destroy({ where: { name: req.params.name } })
            res.status(200).json({ msg: 'Deleted' })
        } catch (error) {
            next(new HttpException(error, 500))
        }


    }

}

export default new UserController();