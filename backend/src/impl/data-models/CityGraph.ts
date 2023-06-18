import { Connection } from "../database/db-models/Connection";
import { ConnectionEdge } from "./ConnectionEdge";

export class CityGraph{
    public stops = new Map<number, ConnectionEdge[]>()

    public addBusStop(busStopId: number){
        this.stops.set(busStopId, [])
    }

    public addConnection(busStopId: number, connection: ConnectionEdge){
        this.stops.get(busStopId)?.push(connection)
    }

    public getBusConnections(busStopId: number): ConnectionEdge[]|undefined{
        return this.stops.get(busStopId)
    }
}