const fetch = require('isomorphic-fetch')
const cp = require('recursive-copy')
const artisti =  require('./static/contents/artisti/')



module.exports = {
  async exportPathMap () {

    cp('./static/CNAME','./out/CNAME');
    cp('./static/robots.txt','./out/robots.txt');
    cp('./static/sitemap.xml','./out/sitemap.xml');
    cp('./static/baidu_verify_BWMAZPDlTw','./out/baidu_verify_BWMAZPDlTw');



    // tranform the list of posts into a map of pages with the pathname `/post/:id`

    const artistPages = artisti.artistInfo.reduce(
      (artistPages, obj) =>
        Object.assign({}, artistPages, {
          [`/artisti/${obj.id}`]: {
            page: '/artisti',
            query: { id: obj.id }
          }
        }),
      {},

    )
    // 尝试递交路由修正?id=FangLijun的形式2
    // http://localhost:3000/artisti?id=FangLijun
    // const artistPages2 = artisti.artistInfo.reduce(
    //   (artistPages, obj) =>
    //     Object.assign({}, artistPages, {
    //       [`/artisti/?id=${obj.id}`]: {
    //         page: '/artisti',
    //         query: { id: obj.id }
    //       }
    //     }),
    //   {},

    // )
    //  const eventsPages = artisti.artistInfo.reduce(
    //   (artistPages, obj) =>
    //     Object.assign({}, artistPages, {
    //       [`/events/${obj.id}`]: {
    //         page: '/events',
    //         query: { id: obj.id }
    //       }
    //     }),
    //   {},
    // )
    // combine the map of post pages with the home
    return Object.assign(
      {},
      // pages,
      artistPages ,
      // artistPages2 ,
      // eventsPages,
      {
      '/': { page: '/' }
    })
  }


}






