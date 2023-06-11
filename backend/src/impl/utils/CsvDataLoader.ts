import csvParser from 'csv-parser'
import fs from 'fs'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../system/dependency/types'
import { DataBaseContext } from '../../interfaces/database'
import { Line } from '../database/db-models/Line'
import { BusStop } from '../database/db-models/BusStop'
import { Connection } from '../database/db-models/Connection'

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
export class DataLoader{

    public async loadData(validFrom: Date, validTo: Date){
        fs.createReadStream('data/connection_graph.csv')
            .pipe(csvParser())
            .on('data', (data: CsvRow) => {
                
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

                let connection: Connection
                let startStop: BusStop
                let endStop: BusStop
                let line: Line

                let x
                Promise.all([
                    x = BusStop.findCreateFind({where: startStopAttr})
                ])
            

            })
    }
}