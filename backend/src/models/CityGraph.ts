import { StopNode } from "./StopNode";

export class CityGraph{
    public stops: StopNode[] = []

    public addBusStop(busStopName: string, lon: number, lat: number){
        let stop = new StopNode(busStopName, lon, lat)
        this.stops.push(stop)
        return stop
    }

    public getBusStop(busStopName: string): StopNode|undefined{
        return this.stops.find(b => b.name == busStopName)
    }
}