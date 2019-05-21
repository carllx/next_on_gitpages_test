const express = require('express')
const next = require('next')
// import { sendFile } from 'next/server'
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()




app.prepare().then(() => {
  const server = express()

  // custom route for posts
  server.get('/artisti/:id', (req, res) => {
    return app.render(req, res, '/artisti', {
      id: req.params.id
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})



// function renderPost(app, req, res) {
//   if (dev) {
//     handle(req, res)
//     return
//   }

//   // if (pageCache.has(req.path)) {
//   //   res.send(pageCache.get(req.path))
//   //   return
//   // }

//   app
//     .renderToHTML(req, res, req.path, req.query)
//     .then(html => {
//       // // Let's cache this page
//       // // eslint-disable-next-line no-console
//       // console.log(`CACHE MISS: ${req.path}`);
//       // pageCache.set(req.path, html);

//       // send it
//       res.send(html);
//     })
//     .catch(err => {
//       console.error(err.stack)
//       app.renderError(err, req, res, req.path, req.query);
//     });
// }
