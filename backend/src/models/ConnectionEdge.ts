import { TimeConverter } from "../helpers/TimeConverter";
import { StopNode } from "./StopNode";

export class ConnectionEdge{

    public arrivalTime: number
    public departureTime: number

    constructor(
        public line: string,
        public company: string,
        public departureTimeDisp: string,
        public arrivalTimeDisp: string,
        public start: StopNode,
        public destination: StopNode
    ){
        let converter = new TimeConverter()
        this.arrivalTime = converter.convertToSecondsBeforeNoon(arrivalTimeDisp)
        this.departureTime = converter.convertToSecondsBeforeNoon(departureTimeDisp)
    }
}