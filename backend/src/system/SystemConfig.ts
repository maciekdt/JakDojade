import { Dialect } from "sequelize"

export interface SystemConfig {
    mode: "remote"|"local"
    dbConfig: {
        pass: string|null
        user: string
        name: string
        options: {
            host: string|null
            dialect: Dialect
            storage: string|null
            logging: boolean
        }
    }
}