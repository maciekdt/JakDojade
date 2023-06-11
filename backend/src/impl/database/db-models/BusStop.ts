import { Association, CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { Connection } from "./Connection";

export class BusStop
    extends Model<InferAttributes<BusStop>, InferCreationAttributes<BusStop>>{
    
    declare id: CreationOptional<number>
    declare name: string
    declare lon: number
    declare lat: number

    declare static associations: {
        startEdges: Association<BusStop, Connection>,
        endEdges: Association<BusStop, Connection>
    }

    declare getStartEdges: () => any
    declare addStartEdge: (e:Connection, options:any) => any

    declare getEndEdges: () => any
    declare addEndEdge: (e:Connection, options:any) => any
}

