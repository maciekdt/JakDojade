import { inject, injectable } from "inversify"
import { TYPES } from "../../system/dependency/types"
import express, { Router } from "express"
import { AppRouter } from "../../interfaces/routers"
import { NavRepo } from "../../interfaces/repos"
import { Connection } from "../database/db-models/Connection"
import { PathAlgorithm } from "../../interfaces/algorithms"
import { BusStop } from "../database/db-models/BusStop"
import { TimeConverter } from "../../interfaces/utils"

@injectable()
export class NavRouterImpl implements AppRouter{

	constructor(
		@inject(TYPES.NavRepo) private repo: NavRepo,
        @inject(TYPES.TimeConverter) private conv: TimeConverter
    ){}

	public getRouter(){
		const router: Router = express.Router()

		router.get('/busstopes', async(req, res, next) => {
            try{
			    res.status(200).json(await this.repo.getAllBusStopes())
            }
            catch(err){
                console.error(err)
                res.status(500)
            }
		})

        router.get('/lines', async(req, res, next) => {
            try{
			    res.status(200).json(await this.repo.getAllLines())
            }
            catch(err){
                console.error(err)
                res.status(500)
            }
		})

        router.get('/connection/:startNodeId/:endNodeId/:startTime', async(req, res, next) => {
            try{
                let startNodeId = req.params.startNodeId as unknown as number
                let endNodeId = req.params.endNodeId as unknown as number
                let startTime = req.params.startTime as string
                
			    res.status(200).json(
                    //await this.repo.findConnection(startNodeId, endNodeId, this.conv.convert(startTime))
                )
            }
            catch(err){
                console.error(err)
                res.status(500)
            }
		})


		return router
	}
}