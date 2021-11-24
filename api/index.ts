import { VercelRequest, VercelResponse } from '@vercel/node'
import { createProxyServer } from 'http-proxy'
import { URL } from 'url'

const proxy = createProxyServer({ autoRewrite: true, changeOrigin: true })

export default async function (req: VercelRequest, res: VercelResponse) {
  if (typeof req.query.__api_redirect !== 'string')
    return res.status(400).json({
      message:
        '`__api_redirect` is either missing or not of type string; where do you want to go?',
    })

  const _url = req.query.__api_redirect

  delete req.query.__api_redirect

  const url = new URL(_url)

  url.search = new URLSearchParams(
    req.query as Record<string, string>
  ).toString()

  proxy.web(req, res, { target: url })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
