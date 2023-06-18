import { inject, injectable } from "inversify"
import { TYPES } from "../../system/dependency/types"
import express, { Application, NextFunction, Request, Response } from "express"
import { Server, IncomingMessage, ServerResponse } from "http"
import { App } from "../../interfaces/app"
import { appContainer } from "../../system/dependency/container"
import { AppRouter } from "../../interfaces/routers"
import { DataBaseContext } from "../../interfaces/database"

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
        await this.startAsyncInitTasks()
		this.app.use(express.json())
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