/*

 静态网页生成
 静态文件传放

*/
const fetch = require('isomorphic-fetch')
const cp = require('recursive-copy')
const artisti =  require('./static/contents/artisti/')
// const news =  require('./static/contents/news/')



module.exports = {
  async exportPathMap () {
    cp('./static/CNAME','./out/CNAME');
    cp('./static/robots.txt','./out/robots.txt');
    cp('./static/sitemap.xml','./out/sitemap.xml');
    cp('./static/baidu_verify_BWMAZPDlTw.html','./out/baidu_verify_BWMAZPDlTw.html');

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

    const newsPages = {
      '/news/2018_artists_plan':{
        page: '/news/2018_artists_plan',
      },'/news/2018_accademia':{
        page: '/news/2018_accademia',
      },'/news/2018_Actuality_of_the_past':{
        page: '/news/2018_Actuality_of_the_past',
      }
    }

    // const newsPages = news.newsInfo.reduce(
    //   (newsPages, obj) =>
    //     Object.assign({}, newsPages, {
    //       [`/news/${obj.id}`]: {
    //         page: '/news',
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
      newsPages ,
      {'/': { page: '/' }
    })
  }


}






