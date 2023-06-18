import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize"
import { BusStop } from "./BusStop"
import { Line } from "./Line"

export class Connection
extends Model<InferAttributes<Connection>, InferCreationAttributes<Connection>>{

    declare id: CreationOptional<number>

    declare arrivalTime: string
    declare departureTime: string

    declare validFrom: Date
    declare validTo: Date

    declare startNodeId: ForeignKey<BusStop['id']>
    declare endNodeId: ForeignKey<BusStop['id']>
    declare lineId: ForeignKey<Line['id']>
}