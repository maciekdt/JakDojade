import { inject, injectable } from "inversify";
import { DataBaseContext } from "../../interfaces/database";
import { DataTypes, Sequelize } from "sequelize";
import { TYPES } from "../../system/dependency/types";
import { SystemConfigProvider } from "../../interfaces/utils";
import { BusStop } from "./db-models/BusStop";
import { Connection } from "./db-models/Connection";
import { Line } from "./db-models/Line";

@injectable()
export class DataBaseContextImpl implements DataBaseContext {

    constructor(
        @inject(TYPES.SystemConfigProvider) private system: SystemConfigProvider
    ){}

    private client: Sequelize|null = null
    
    public async connect(): Promise<void> {
        let config = (await this.system.getSystemConfig()).development
        this.client = new Sequelize(
            config.database, 
            config.username, 
            config.password, 
            {
                dialect: config.dialect,
                host: config.host,
                logging: false
            }
        )
        await this.client.authenticate()
        this.initTables()
        this.createAssociations()
    }

    public async closeConnection(): Promise<void> {
        this.getClient().close()
    }

    public getClient(): Sequelize {
        return this.client as Sequelize
    }

    private createAssociations(){
        BusStop.associations = {
            startEdges: BusStop.hasMany(Connection, { as: 'startEdges', foreignKey: 'startNodeId' }),
            endEdges: BusStop.hasMany(Connection, { as: 'endEdges', foreignKey: 'endNodeId' }),
        }

        Line.hasMany(Connection, {as: 'connectionEdges', foreignKey: 'lineId'}, )

    }

    private initTables(): void {
        BusStop.init(
            {
                id:{
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name:{
                    type: DataTypes.STRING,
                    allowNull: false
                },
                lon:{
                    type: DataTypes.DOUBLE,
                    allowNull: false
                },
                lat: {
                    type: DataTypes.DOUBLE,
                    allowNull: false
                }
            },
            { 
                tableName: 'BusStopes',
                sequelize: this.client as Sequelize,
                timestamps: false
            }
        )

        Connection.init(
            {
                id:{
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                arrivalTime: {
                    type: DataTypes.TIME,
                    allowNull: false
                },
                departureTime: {
                    type: DataTypes.TIME,
                    allowNull: false
                },
                validFrom: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                validTo: {
                    type: DataTypes.DATE,
                    allowNull: false
                }
            },
            { 
                tableName: 'Connections',
                sequelize: this.client as Sequelize,
                timestamps: false
            }
        )

        Line.init(
            {
                id:{
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                company: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            { 
                tableName: 'Lines',
                sequelize: this.client as Sequelize,
                timestamps: false
            }
        )

        
    }

}