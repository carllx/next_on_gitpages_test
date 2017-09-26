const fetch = require('isomorphic-fetch')
const cp = require('recursive-copy')
const artisti =  require('./static/contents/artisti/')



module.exports = {
  async exportPathMap () {

    cp('./CNAME','./out/CNAME');
    cp('./robots.txt','./out/robots.txt');
    cp('./sitemap.xml','./out/sitemap.xmlt');

    // we fetch our list of posts, this allow us to dynamically generate the exported pages
    const response = await fetch('http://jsonplaceholder.typicode.com/posts?_page=1')
    const postList = await response.json()

    /*{
      "userId": 1,
      "id": 1,
      "title": "...",
      "body": "...."
    },
    {
      "userId": 1,
      "id": 2,
      "title": "...",
      "body": "...."
    },*/


    console.log('postList: ',postList)
    console.log('artisti: ',artisti)
    // tranform the list of posts into a map of pages with the pathname `/post/:id`
    const pages = postList.reduce(
      (pages, post) =>
        Object.assign({}, pages, {
          [`/post/${post.id}`]: {
            page: '/post',
            query: { id: post.id }
          }
        }),
      {},
    )

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
    // combine the map of post pages with the home
    return Object.assign({}, pages, artistPages ,{
      '/': { page: '/' }
    })
  }


}






