import { Sequelize } from "sequelize"

export interface DataBaseContext{
    connect(): Promise<void>
    closeConnection(): Promise<void>
    getClient(): Sequelize
}