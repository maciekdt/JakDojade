import { Sequelize } from "sequelize"

export interface DataBaseContext{
    connect(): Promise<void>
    build(): Promise<void>
    closeConnection(): Promise<void>
    getClient(): Sequelize
}