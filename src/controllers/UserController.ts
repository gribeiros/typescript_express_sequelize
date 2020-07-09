import { Request, Response } from 'express'
import User from '../db/models/user'

class UserController {

    public async index(req: Request, res: Response): Promise<any> {

        const foundUser = await User.findAll();
        res.json(foundUser)
    }

    public async create(req: Request, res: Response) {

    }

    public async findOne(req: Request, res: Response) {

    }

    public async update(req: Request, res: Response) {

    }

    delete(req: Request, res: Response) {

    }

}

export default new UserController();