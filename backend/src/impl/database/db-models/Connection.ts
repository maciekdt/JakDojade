import { CreationOptional, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize"

export class Connection
extends Model<InferAttributes<Connection>, InferCreationAttributes<Connection>>{

    declare id: CreationOptional<number>

    declare arrivalTime: string
    declare departureTime: string

    declare validFrom: Date
    declare validTo: Date
}