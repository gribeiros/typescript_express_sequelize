import { DataTypes, Model, Optional } from 'sequelize';
import database from '../models/index';
import bcrypt from 'bcrypt'


interface IUserAttributes {
    id: number;
    cpf: string;
    name: string;
    email: string;
    password: string;
    passwordHash: string;
}

interface IUserCreationAttributes extends Optional<IUserAttributes, "id"|"passwordHash"> {}

class User extends Model<IUserAttributes, IUserCreationAttributes> implements IUserAttributes {

    public id!: number;

    public name!: string;

    public cpf!: string;

    public email!: string;

    public password!: string;

    public passwordHash!: string;

    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;

    public async checkPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.passwordHash);
    }
}

User.init(
    {
        id: {
            type: new DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: new DataTypes.STRING(120),
            allowNull: false,
        },
        cpf: {
            type: new DataTypes.STRING(15),
            allowNull: false,
            unique: true
        },
        email: {
            type: new DataTypes.STRING(80),
            allowNull: false,
            unique: true
        },
        password: {
            type: new DataTypes.STRING(25),
            allowNull: false,
        },
        passwordHash: {
            type: new DataTypes.STRING(125),
        },
    },
    {
        tableName: "User",
        sequelize: database.connection, // passing the `sequelize` instance is required
    }
);

User.addHook(
    'beforeSave',
    async (user: User): Promise<void> => {
        if (user.password) {
            user.passwordHash = await bcrypt.hash(user.password, 8);
        }
    }
);

export default User;
