import { Container } from "inversify"
import "reflect-metadata"
import { DataLoader, SystemConfigProvider, TimeConverter } from "../../interfaces/utils"
import { TYPES } from "./types"
import { TimeConverterImpl } from "../../impl/utils/TimeConverter"
import { SystemConfigProviderImpl } from "../SystemConfigProvider"
import { DataBaseContext } from "../../interfaces/database"
import { DataBaseContextImpl } from "../../impl/database/DataBaseContext"
import { CsvDataLoader } from "../../impl/utils/CsvDataLoader"
import { AppImpl } from "../../impl/app/App"
import { App } from "../../interfaces/app"
import { AppRouter } from "../../interfaces/routers"
import { NavRouterImpl } from "../../impl/routers/NavRouter"
import { NavRepo } from "../../interfaces/repos"
import { NavRepoImpl } from "../../impl/repos/NavRepo"
import { PathAlgorithm } from "../../interfaces/algorithms"
import { DijkstraAlgorithmImpl } from "../../impl/algorithms/DijkstraAlgorithm"

const appContainer = new Container()
appContainer.bind<TimeConverter>(TYPES.TimeConverter).to(TimeConverterImpl)
appContainer.bind<SystemConfigProvider>(TYPES.SystemConfigProvider).to(SystemConfigProviderImpl)
appContainer.bind<DataBaseContext>(TYPES.DataBaseContext).to(DataBaseContextImpl)
appContainer.bind<DataLoader>(TYPES.CsvDataLoader).to(CsvDataLoader)
appContainer.bind<App>(TYPES.App).to(AppImpl)
appContainer.bind<AppRouter>(TYPES.NavRouter).to(NavRouterImpl)
appContainer.bind<NavRepo>(TYPES.NavRepo).to(NavRepoImpl)
appContainer.bind<PathAlgorithm>(TYPES.DijkstraAlgorithm).to(DijkstraAlgorithmImpl)

export { appContainer }