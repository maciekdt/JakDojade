import { ConnectionEdge } from "./ConnectionEdge";

export class StopNode{

    public connections: ConnectionEdge[]

    constructor(public name: string, public lon: number, public lat: number){
        this.connections = []
    }

    public addConnection(connection: ConnectionEdge){
        this.connections.push(connection)
    }
}

