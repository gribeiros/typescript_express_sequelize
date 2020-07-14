import { Request, Response } from 'express'
import User from '../db/models/user'
import { Op } from 'sequelize'

class UserController {

    public async getAll(req: Request, res: Response): Promise<any> {

        try {

            res.status(200).json(await User.findAll({
                order: [
                    ['name', 'ASC']
                ]
            }))
        } catch (error) {
            res.status(500).json({ msg: "Server error", err: error })
        }
    }

    public async getAllByName(req: Request, res: Response): Promise<any> {
        try {

            res.status(200).json(await User.findAll({
                where: {
                    name: { [Op.like]: `${req.params.name}%` }
                },
                order: [
                    ['name', 'ASC']
                ]
            }))
        } catch (error) {
            res.status(500).json({ msg: "Server error", err: error })
        }
    }

    public async findByName(req: Request, res: Response): Promise<any> {

        try {
            let user = await User.findOne({ where: { name: { [Op.like]: `${req.params.name}%` } } });
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ error: 'Not Found' })
            }
        } catch (error) {
            res.status(500).json({ msg: "Don't updated", err: error })
        }

    }

    public async create(req: Request, res: Response): Promise<any> {
        try {
            let { name, cpf, email, password } = req.body
            await User.create({ name, cpf, email, password })
            res.json({ msg: 'Save' }).status(200)
        } catch (error) {
            res.status(500).json({ msg: "Don't saved", err: error })
        }

    }


    public async update(req: Request, res: Response): Promise<any> {

        try {
            let { id, name, email, password, passwordHash } = req.body
            await User.update({ id, name, email, password, passwordHash }, {
                where: {
                    id: req.params.id
                }
            })
            res.json({ msg: 'Update' }).status(200)
        } catch (error) {
            res.status(500).json({ msg: "Don't updated", err: error })
        }
    }

    public async delete(req: Request, res: Response): Promise<any> {
        try {
            await User.destroy({ where: { name: req.params.name } })
            res.status(200).json({ msg: 'Deleted' })
        } catch (error) {
            res.status(500).json({ msg: "Don't deleted", err: error })
        }


    }

}

export default new UserController();