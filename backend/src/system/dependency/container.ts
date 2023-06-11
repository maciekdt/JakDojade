import { Container } from "inversify"
import "reflect-metadata"
import { SystemConfigProvider, TimeConvertert } from "../../interfaces/helpers"
import { TYPES } from "./types"
import { TimeConverterImpl } from "../../impl/utils/TimeConverter"
import { SystemConfigProviderImpl } from "../SystemConfigProvider"
import { DataBaseContext } from "../../interfaces/database"
import { DataBaseContextImpl } from "../../impl/database/DataBaseContext"

const appContainer = new Container()
appContainer.bind<TimeConvertert>(TYPES.TimeConverter).to(TimeConverterImpl)
appContainer.bind<SystemConfigProvider>(TYPES.SystemConfigProvider).to(SystemConfigProviderImpl)
appContainer.bind<DataBaseContext>(TYPES.DataBaseContext).to(DataBaseContextImpl)

export { appContainer }