const PORT = 3001
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./src/assets/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(router)
server.listen(PORT, () => {
  console.log(`JSON Server is running on PORT ${PORT}`)
})
