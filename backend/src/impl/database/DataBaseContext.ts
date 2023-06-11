import { inject, injectable } from "inversify";
import { DataBaseContext } from "../../interfaces/database";
import { DataTypes, Sequelize } from "sequelize";
import { TYPES } from "../../system/dependency/types";
import { SystemConfigProvider } from "../../interfaces/helpers";
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
        let config = (await this.system.getSystemConfig()).dbConfig
        this.client = new Sequelize(
            config.name, 
            config.user, 
            (config.pass == null) ? undefined : config.pass, 
            {
                dialect: config.options.dialect,
                storage: (config.options.storage == null) ? undefined : config.options.storage,
                host: (config.options.host == null) ? undefined : config.options.host
            }
        )
        await this.client.authenticate()
        this.initTables()
        this.createAssociations()

        //TEST
        await this.build()
        let s = await BusStop.create({name: "test", lat:10.88, lon:23.66})
        let s2 = await BusStop.create({name: "test2", lat:10.88, lon:23.66})
        let e = Connection.build({arrivalTime: "12:32:00", departureTime: "234", validFrom: new Date(1232), validTo: new Date(1111)})
        let l = Line.build({name: "A", company: "WRO"})
        await e.save()
        await l.save()
        await s.addStartEdge(e, undefined)
        await l.addConnectionEdge(e, undefined)
    }

    public async build(): Promise<void> {
        await this.getClient().sync({ force: true })
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
                    unique: true,
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
                tableName: 'ConnectionEdges',
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
                    unique: true,
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