import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes/routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const serverConfig = {
  port: 3333,
  hostname: 'localhost'
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req
  
  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }
  
  res
    .writeHead(404)
    .end()
})

server.listen(
  serverConfig.port,
  serverConfig.hostname,
  () => {
    console.log(`Server is running at http://${serverConfig.hostname}:${serverConfig.port}. You can manage your tasks.`)
  }
)
