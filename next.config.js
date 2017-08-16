const fetch = require('isomorphic-fetch')

module.exports = {
  async exportPathMap () {

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
    // combine the map of post pages with the home
    return Object.assign({}, pages, {
      '/': { page: '/' }
    })
  }


}
