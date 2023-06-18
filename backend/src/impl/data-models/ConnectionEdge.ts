

export class ConnectionEdge{
    constructor(
        public departureTime: number,
        public arrivalTime: number,
        public start: number,
        public destination: number
    ){}
}