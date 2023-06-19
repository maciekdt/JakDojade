import { inject, injectable } from "inversify"
import { TYPES } from "../../system/dependency/types"
import express, { Router } from "express"
import { AppRouter } from "../../interfaces/routers"
import { NavRepo } from "../../interfaces/repos"
import { Connection } from "../database/db-models/Connection"
import { PathAlgorithm } from "../../interfaces/algorithms"
import { BusStop } from "../database/db-models/BusStop"
import { TimeConverter } from "../../interfaces/utils"
import { ConnectionEdge } from "../data-models/ConnectionEdge"
import { Line } from "../database/db-models/Line"

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
                let startNodeId = parseInt(req.params.startNodeId)
                let endNodeId = parseInt(req.params.endNodeId) 
                let startTime = req.params.startTime

                let result = await this.repo.findConnection(startNodeId, endNodeId, this.conv.convert(startTime))

                type BusRouteJson = {
                    startBustStop: BusStop
                    endBustStop: BusStop
                    connection: Connection
                    line: Line|null
                }

                let resultJson: BusRouteJson[]  = []
                for(let connection of result){
                    resultJson.push({
                        startBustStop: (await this.repo.getBusStopById(connection.start))!!,
                        endBustStop: (await this.repo.getBusStopById(connection.destination))!!,
                        connection: (await this.repo.getConnectionById(connection.id))!!,
                        line: connection.line == "foot" ? null : await this.repo.getLineById(connection.line)
                    })
                }
			    res.status(200).json(resultJson)
            }
            catch(err){
                console.error(err)
                res.status(500)
            }
		})


		return router
	}
}