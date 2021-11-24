import { VercelRequest, VercelResponse } from '@vercel/node'
import fetch, { Headers, HeadersInit } from 'node-fetch'
import { URL } from 'url'

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

  fetch(url, {
    headers: copyHeaders(req.rawHeaders),
    body: req.body,
    method: req.method,
  })
}

function copyHeaders(headers: VercelRequest['rawHeaders']): HeadersInit {
  const h: string[][] = []

  for (let i = 0; i < headers.length; i++) {
    if (i % 2 === 0) h.push([headers[i]])
    else h[h.length - 1][1] = headers[i]
  }

  return new Headers(h)
}

export const config = {
  api: {
    bodyParser: false,
  },
}
