import { Application } from "express"

export interface App{
	start(): Promise<Application>
	getBaseUrl(): string
	stop(): void
}