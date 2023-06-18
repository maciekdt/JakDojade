import { SystemConfig } from "../system/SystemConfig"

export interface TimeConverter{
    convert(time: string): number
}

export interface SystemConfigProvider{
    getSystemConfig(): Promise<SystemConfig>
}

export interface DataLoader{
    loadData(validFrom: Date, validTo: Date): Promise<void>
}