const express = require('express')
const next = require('next')
const nextI18NextMiddleware = require('next-i18next/middleware')
const { parse } = require('url')
const pathMatch = require('path-match')()

const nextI18next = require('./i18n')

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()
const productRoute = pathMatch('/products/:id')

const getParams = (req, pathname) => {
  if (typeof pathname === 'undefined') {
    return productRoute(req.url)
  } else {
    return productRoute(pathname)
  }
}

const parseUrl = (req, pathname, query) => {
  const parsedUrl = parse(pathname || req.url, true)
  parsedUrl.query = { ...parsedUrl.query, ...query }

  return parsedUrl
}

const render = (req, res, pathname, query) => {
  const params = getParams(req, pathname)

  if (params) {
    app.render(req, res, `/product-page`, { ...query, id: +params.id })

    return
  }

  const parsedUrl = parseUrl(req, pathname, query)
  handle(req, res, parsedUrl)
}

(async () => {
  await app.prepare()
  const server = express()

  nextI18NextMiddleware(nextI18next, { render }, server)

  server.get('*', (req, res) => render(req, res))

  await server.listen(3000)
  console.log('> Ready on http://localhost:3000')
})()
