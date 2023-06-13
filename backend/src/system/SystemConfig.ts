import { Dialect } from "sequelize"

export interface SystemConfig {
    development: {
        username: string,
        password: string,
        database: string,
        host: string,
        dialect: Dialect
    }
}