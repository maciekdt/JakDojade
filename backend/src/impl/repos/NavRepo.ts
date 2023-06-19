import { inject, injectable } from "inversify";
import { NavRepo } from "../../interfaces/repos";
import { BusStop } from "../database/db-models/BusStop";
import { Line } from "../database/db-models/Line";
import { Connection } from "../database/db-models/Connection";
import { TYPES } from "../../system/dependency/types";
import { PathAlgorithm } from "../../interfaces/algorithms";
import { CityGraph } from "../data-models/CityGraph";
import { ConnectionEdge } from "../data-models/ConnectionEdge";
import { TimeConverter } from "../../interfaces/utils";

@injectable()
export class NavRepoImpl implements NavRepo{

    constructor(
        @inject(TYPES.TimeConverter) private conv: TimeConverter,
        @inject(TYPES.DijkstraAlgorithm) private alg: PathAlgorithm
    ){}

    public async getAllBusStopes(): Promise<BusStop[]>{
        this.createGraph()
        return await BusStop.findAll()
    }

    public async getBusStopById(id: number): Promise<BusStop | null>{
        return await BusStop.findByPk(id)
    }

    public async getLineById(id: number): Promise<Line | null>{
        return await Line.findByPk(id)
    }

    public async getAllLines(): Promise<Line[]>{
        return await Line.findAll()
    }


    public async getConnectionById(id: number): Promise<Connection | null>{
        return await Connection.findByPk(id)
    }

    public async findConnection(startNodeId: number, endNodeId: number, startTime: number): Promise<ConnectionEdge[]>{
        return this.alg.compute(
            await this.createGraph(), 
            startNodeId,
            endNodeId,
            startTime
        )
    }

    private async createGraph(): Promise<CityGraph>{
        let graph = new CityGraph()
        for(const edge of await Connection.findAll()){
            let connectionEdge = new ConnectionEdge(
                edge.id,
                this.conv.convert(edge.departureTime),
                this.conv.convert(edge.arrivalTime),
                edge.startNodeId,
                edge.endNodeId,
                edge.lineId
            )

            if(graph.isBusStop(edge.startNodeId)){
                graph.addConnection(edge.startNodeId, connectionEdge)
            }
            else{
                graph.addBusStop(edge.startNodeId)
                graph.addConnection(edge.startNodeId, connectionEdge)
            }
            if(!graph.isBusStop(edge.endNodeId)){
                graph.addBusStop(edge.endNodeId)
            }
        }
        return graph
    }
}