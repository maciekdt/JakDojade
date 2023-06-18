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

    public async getAllLines(): Promise<Line[]>{
        return await Line.findAll()
    }

    public async findConnection(startNodeId: number, endNodeId: number, startTime: number): Promise<ConnectionEdge[]>{
        let c = await this.createGraph()
        let r = c.getBusConnections(startNodeId) as ConnectionEdge[]
        return r
        /*return this.alg.compute(
            await this.createGraph(), 
            startNodeId,
            endNodeId,
            startTime
        )*/
    }

    private async createGraph(): Promise<CityGraph>{
        let graph = new CityGraph()
        for(const edge of await Connection.findAll()){
            let connectionEdge = new ConnectionEdge(
                this.conv.convert(edge.departureTime),
                this.conv.convert(edge.arrivalTime),
                edge.startNodeId,
                edge.endNodeId
            )

            if(graph.getBusConnections(connectionEdge.start)){
                graph.addConnection(connectionEdge.start, connectionEdge)
            }
            else{
                graph.addBusStop(connectionEdge.start)
                graph.addConnection(connectionEdge.start, connectionEdge)
            }
            if(graph.getBusConnections(connectionEdge.destination)){
                graph.addBusStop(connectionEdge.destination)
            }
        }
        return graph
    }
}