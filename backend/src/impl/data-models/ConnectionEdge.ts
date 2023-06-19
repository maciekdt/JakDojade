

export class ConnectionEdge{
    constructor(
        public id: number,
        public departureTime: number,
        public arrivalTime: number,
        public start: number,
        public destination: number,
        public line: number|"foot"
    ){}
}