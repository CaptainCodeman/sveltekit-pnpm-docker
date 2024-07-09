import http from 'http'
import compression from 'http-compression'
import { handler } from './build/handler.js'

const compress = compression()

console.log('listening on port 8080 ...')

http
	.createServer((req, res) => {
		compress(req, res, () => {
			handler(req, res, err => {
				if (err) {
					res.writeHead(500)
					res.end(err.toString())
				} else {
					res.writeHead(404)
					res.end()
				}
			})
		})
	})
	.listen(8080)
