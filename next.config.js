/*
  静态网页生成
  静态文件传放
  */
const fs = require('fs')
// const fetch = require('isomorphic-fetch')
// const cp = require('recursive-copy')
const { promisify } = require('util')
const copyFile = promisify(fs.copyFile)
const artisti =  require('./static/contents/artisti/')

/*IMPORT markdown*/ 
const images = require('remark-images')
const emoji = require('remark-emoji')
const withMDX = require('@zeit/next-mdx')({options: {mdPlugins: [images,emoji]},extension: /.mdx?$/})

/*NEWS*/
// const news = require('./')

/*Copying custom files
参考 https://github.com/zeit/next.js/#copying-custom-files*/
const moveFiles = async function(){
  // await copyFile(join(dir, 'robots.txt'), join(outDir, 'robots.txt'))
  await copyFile('./static/CNAME','./out/CNAME');
  await copyFile('./static/robots.txt','./out/robots.txt');
  await copyFile('./static/sitemap.xml','./out/sitemap.xml');
  await copyFile('./static/baidu_verify_BWMAZPDlTw.html','./out/baidu_verify_BWMAZPDlTw.html');
}
moveFiles()


module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  
  exportPathMap:async function () {

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
    /*用 map/reduce 的方法生成路由....*/
    const newsPages = {
      '/news/2018_artists_plan':{page: '/news/2018_artists_plan'},
      '/news/2018_accademia':{page: '/news/2018_accademia'},
      '/news/2018_Actuality_of_the_past':{page: '/news/2018_Actuality_of_the_past'},
      '/news/2018_Actuality_of_the_past2':{page: '/news/2018_Actuality_of_the_past'},
    }

    return Object.assign(
      {},
      artistPages ,
      newsPages ,
      {'/': { page: '/' },
    })
  }
})






