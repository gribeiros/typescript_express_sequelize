import { Request, Response } from 'express'
import User from '../db/models/user'

class UserController {

    public async index(req: Request, res: Response): Promise<any> {
        res.status(200).json(await User.findAll({
            order: [
                ['id', 'ASC']
            ]
        }))
    }

    public async create(req: Request, res: Response): Promise<any> {
        let { id, name, cpf, email, password, passwordHash } = req.body
        try {
            await User.create({ id, name, cpf, email, password, passwordHash })
            res.json({ msg: 'Save' }).status(200)
        } catch (error) {
            res.status(500).json({ msg: "Don't saved", err: error })
        }

    }

    public async findByName(req: Request, res: Response): Promise<any> {

        let user = await User.findOne({ where: { name: req.params.name } });
        try {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ error: 'Not Found' })
            }
        } catch (error) {
            res.status(500).json({ msg: "Don't updated", err: error })
        }

    }

    public async update(req: Request, res: Response): Promise<any> {
        let { id, name, email, password, passwordHash } = req.body

        try {
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