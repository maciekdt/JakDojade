import { inject, injectable } from "inversify"
import { PathAlgorithm } from "../../interfaces/algorithms"
import { BusStop } from "../database/db-models/BusStop"
import { Connection } from "../database/db-models/Connection"
import { TYPES } from "../../system/dependency/types"
import { TimeConverter } from "../../interfaces/utils"
import { NavRepo } from "../../interfaces/repos"
import { ConnectionEdge } from "../data-models/ConnectionEdge"
import { CityGraph } from "../data-models/CityGraph"

@injectable()
export class DijkstraAlgorithmImpl implements PathAlgorithm{

    constructor(
        @inject(TYPES.TimeConverter) private conv: TimeConverter,
    ){}
    
    public compute(graph: CityGraph,
        startTrevelNode: number,
        endTrevelNode: number,
        startTrevelTime: number): ConnectionEdge[]{

            const DAY_IN_SECONDS = this.conv.convert("24:00:00")
            const distances = new Map<number, number>()
            const prev = new Map<number, ConnectionEdge | null>()
            const visited = new Set<number>()
    
            for (const node of graph.stops.keys()) {
                distances.set(node, Infinity)
                prev.set(node, null)
            }
            distances.set(startTrevelNode, 0)
            const stopsNumber = graph.stops.size
    
            while (visited.size < stopsNumber) {
                let current: number | null = null
                let minDistance = Infinity
                for (const node of graph.stops.keys()) {
                    if (!visited.has(node) && distances.get(node) as number < minDistance) {
                        current = node
                        minDistance = distances.get(node)!
                    }
                }
                if (current === null) break
                visited.add(current)
    
                for (const edge of graph.getBusConnections(current) as ConnectionEdge[]) {
                    let weight: number
                    const currentArrivalTime = startTrevelTime + (distances.get(current) as number)
                    if((currentArrivalTime % DAY_IN_SECONDS) <= edge.departureTime)
                        weight = edge.arrivalTime - (currentArrivalTime % DAY_IN_SECONDS)
                    else 
                        weight = DAY_IN_SECONDS + edge.arrivalTime - (currentArrivalTime % DAY_IN_SECONDS)
                    const neighbor = edge.destination;
                    const tentativeDistance = distances.get(current)! + weight
                    if (tentativeDistance < distances.get(neighbor)!) {
                        distances.set(neighbor, tentativeDistance)
                        prev.set(neighbor, edge)
                    }
                }
            }
            console.error("Cost : " + distances.get(endTrevelNode))
            
            const path: ConnectionEdge[] = []
            for (let i = endTrevelNode; i != startTrevelNode; i = prev.get(i)?.start as number)
                path.push(prev.get(i) as ConnectionEdge)
            return path.reverse();
    }
}
