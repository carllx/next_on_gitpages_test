const express = require('express')
const next = require('next')
// import { sendFile } from 'next/server'
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

/*静态文件*/
// const robotsOpt = {
//   root: __dirname + '/static/',
//   headers: {
//     'Content-Type': 'text/plain;charset=UTF-8',
//   }
// };
// const siteMapOpt = {
//   root: __dirname + '/static/',
//   headers: {
//     'Content-Type': 'text/xml',//,application/xml
//   }
// };




app.prepare()
.then(() => {
  const server = express()

  // custom route for posts
  // server.get('/post/:id', (req, res) => {
  //   return app.render(req, res, '/post', {
  //     id: req.params.id
  //   })
  // })

  // custom route for posts
  server.get('/artisti/:id', (req, res) => {
    return app.render(req, res, '/artisti', {
      id: req.params.id
    })
  })

  server.get('/news/:id', (req, res) => {
    return app.render(req, res, '/news', {
      id: req.params.id
    })
  })

  /*
    实现不了 custom route for posts http://localhost:3000/artisti?id=EnzoCucchi , 因为 文件夹命名不能使用 '?'
   */
  // server.get('/artisti/?id=:id', (req, res) => {
  //   return app.render(req, res, '/artisti', {
  //     id: req.params.id
  //   })
  // })



  server.get('*', (req, res) => {
    return handle(req, res)
  })


  // server.get('/robots.txt', (req, res) => (
  //   res.status(200).sendFile('robots.txt', robotsOpt)
  // ));

  // server.get('/sitemap.xml', (req, res) => (
  //   res.status(200).sendFile('sitemap.xml', siteMapOpt)
  // ));



  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
