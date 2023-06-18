import { CityGraph } from "../impl/data-models/CityGraph";
import { ConnectionEdge } from "../impl/data-models/ConnectionEdge";
import { BusStop } from "../impl/database/db-models/BusStop";
import { Connection } from "../impl/database/db-models/Connection";

export interface PathAlgorithm{
    compute(graph: CityGraph,
        startTrevelNode: number,
        endTrevelNode: number,
        startTrevelTime: number): ConnectionEdge[]
}