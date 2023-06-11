import { SystemConfig } from "../system/SystemConfig"

export interface TimeConvertert{
    convertToSecondsBeforeNoon(time: string): number
}

export interface SystemConfigProvider{
    getSystemConfig(): Promise<SystemConfig>
}