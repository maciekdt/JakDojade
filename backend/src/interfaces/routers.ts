import { Router } from "express";

export interface AppRouter{
	getRouter(): Router
}