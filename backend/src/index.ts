import { appContainer } from "./system/dependency/container"
import { TYPES } from "./system/dependency/types"
import { TimeConvertert } from "./interfaces/helpers"
import { DataBaseContext } from "./interfaces/database"
import { BusStop } from "./impl/database/db-models/BusStop"

var db: DataBaseContext = appContainer.get(TYPES.DataBaseContext)
db.connect().then(() => {
    console.log("END")
})
