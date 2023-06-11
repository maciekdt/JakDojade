import fs from 'fs/promises'
import { injectable } from 'inversify'
import { SystemConfig } from './SystemConfig'
import { SystemConfigProvider } from '../interfaces/helpers'


@injectable()
export class SystemConfigProviderImpl implements SystemConfigProvider{
    private systemConfigFilePath = process.argv[2]
    public async getSystemConfig(): Promise<SystemConfig>{
        return JSON.parse(await fs.readFile(this.systemConfigFilePath, "utf8"))
    }
    
}