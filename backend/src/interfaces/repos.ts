import { BusStop } from "../impl/database/db-models/BusStop";
import { Line } from "../impl/database/db-models/Line";
import { Connection } from "../impl/database/db-models/Connection";
import { ConnectionEdge } from "../impl/data-models/ConnectionEdge";

export interface NavRepo{
    getAllBusStopes(): Promise<BusStop[]>
    getAllLines(): Promise<Line[]>
    getBusStopById(id: number): Promise<BusStop | null>
    findConnection(startNodeId: number, endNodeId: number, startTime: number): Promise<ConnectionEdge[]>
}