import csvParser from 'csv-parser'
import fs from 'fs'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../system/dependency/types'
import { DataBaseContext } from '../../interfaces/database'
import { Line } from '../database/db-models/Line'
import { BusStop } from '../database/db-models/BusStop'
import { Connection } from '../database/db-models/Connection'
import { DataLoader } from '../../interfaces/utils'

interface CsvRow {
    company: string
    line: string
    departure_time: string
    arrival_time: string
    start_stop: string
    end_stop: string
    start_stop_lat: number
    start_stop_lon: number
    end_stop_lat: number
    end_stop_lon: number
}

@injectable()
export class CsvDataLoader implements DataLoader{

    public async loadData(validFrom: Date, validTo: Date){
        const stream = fs.createReadStream('upload/connection_graph.csv')
            .pipe(csvParser())

        let i = 0;
        for await (const data of stream){
                let startStopAttr = { 
                    name: data.start_stop,
                    lat: data.start_stop_lat,
                    lon: data.start_stop_lon 
                }

                let endStopAttr = { 
                    name: data.end_stop,
                    lat: data.end_stop_lat,
                    lon: data.end_stop_lon 
                }

                let connectionAttr = {
                    arrivalTime: data.arrival_time,
                    departureTime: data.departure_time,
                    validFrom: validFrom,
                    validTo: validTo
                }

                let lineAttr = {
                    name: data.line,
                    company: data.company
                }

                
                let [startStop] = await BusStop.findCreateFind({where: startStopAttr})
                let [endStop] = await BusStop.findCreateFind({where: endStopAttr})
                let [line] = await Line.findCreateFind({where: lineAttr})
                let connection = await Connection.create(connectionAttr)

                await line.addConnectionEdge(connection, undefined)
                await startStop.addStartEdge(connection, undefined)
                await endStop.addEndEdge(connection, undefined)

                i++
                if(i%100 == 0) console.log("row : " + i)
            }
    }
}