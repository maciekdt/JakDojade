import { inject, injectable } from "inversify"
import { TYPES } from "../../system/dependency/types"
import express, { Application, NextFunction, Request, Response } from "express"
import { Server, IncomingMessage, ServerResponse } from "http"
import { App } from "../../interfaces/app"
import { appContainer } from "../../system/dependency/container"
import { AppRouter } from "../../interfaces/routers"
import { DataBaseContext } from "../../interfaces/database"
import { Line } from "../database/db-models/Line"
import cors from "cors"

@injectable()
export class AppImpl implements App {
	
	private app: Application = express()
	private PORT = 8000
	private server: Server<typeof IncomingMessage, typeof ServerResponse>|null = null

	constructor(
		@inject(TYPES.NavRouter) private navRouter: AppRouter,
        @inject(TYPES.DataBaseContext) private dbContext: DataBaseContext
    ){}

	public async start(): Promise<Application> {
		let conect = false
		while(!conect){
			await new Promise(resolve => setTimeout(resolve, 5000))
			try{
				await this.dbContext.connect()
				console.log("Connected to SQL server")
				conect = true
			}
			catch(err){
				console.error("SQL server refuses connection")
			}
		}
		this.app.use(express.json())
		this.app.use(cors())
		this.app.get("/test-connection", (req, res) => { res.status(200).send() })

		this.app.use("/nav", this.navRouter.getRouter())
		
		this.server = this.app.listen(this.PORT, async(): Promise<void> => {
			console.log(`Server Running here 👉 ${this.getBaseUrl()}`)
		})

        return this.app
	}

    private async startAsyncInitTasks(): Promise<[void]>{
        return Promise.all([
            this.dbContext.connect()
        ])
    }

	public stop(): void {
		this.server?.close()
	}

	public getBaseUrl(): string {
		return "http://localhost:8000"
	}
}