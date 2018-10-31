
import WithDoc from 'container/withNews'
import MD from './2018_artists_plan_1.mdx'

export const outline = {
  "title": {
    "it": "Bando 2018 per progetto Residenze Artistiche",
    "zh": "2018中国青年艺术家赴意大利佛罗伦萨驻留计划",
    "en": "Artist In Residence Program"
  },
  slug: '2018_artists_plan',
  date: '2018-2-4',
  image: 'https://user-images.githubusercontent.com/50838/28487049-1f6156ac-6ea7-11e7-99cc-0ee227c40ba1.png',
  description: '2018年，由佛罗伦萨市政府、中国国家画院当代艺术档案库、中国国家画院文化产业研究中心、佛罗伦萨Le Murate 当代艺术中心、时代美术馆、腾控股集团以及中艺国际联合推出中意青年艺术家驻留计划项目，具体内容如下',
  "keywords": [
    "中艺国际",
    "驻留计划",
    "艺术家",
    "artisti",
    "artist",
    "佛罗伦萨",
    "中国艺术家赴意大利",
  ],
  links: {
    // twitter: 'https://twitter.com/arunoda/status/876828315570421761',
    facebook: 'https://www.facebook.com/zhong.art.it'
  }
}

export default WithDoc(outline)(<MD/>)