import { appContainer } from "./system/dependency/container"
import { TYPES } from "./system/dependency/types"
import { App } from "./interfaces/app"

var app: App = appContainer.get(TYPES.App)
app.start()
// lt --port 8000 --subdomain maciekdt 