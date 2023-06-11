import { Association, CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { Connection } from "./Connection"

export class Line
extends Model<InferAttributes<Line>, InferCreationAttributes<Line>>{

    declare id: CreationOptional<number>
    declare name: string
    declare company: string

    declare static associations: {
        connectionEdges: Association<Line, Connection>
    }

    declare getConnectionEdges: () => any
    declare addConnectionEdge: (edge: Connection, options:any) => any
}