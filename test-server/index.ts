import http from 'http'
import ngrok from 'ngrok'

async function main() {
  const url = await ngrok.connect(8080)

  http
    .createServer(function (req, res) {
      console.log(req.socket.remoteAddress)

      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.write('Hello World!')
      res.end()
    })
    .listen(8080, () => console.log(`Server running at ${url}`))
}

main()
