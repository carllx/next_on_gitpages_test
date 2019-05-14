import React from 'react'
import Link from 'next/link'
import {artistInfo} from '../static/contents/artisti'
import {ui}  from '../utils/ui'
import { css} from 'glamor'

console.log(artistInfo)
const SEO =()=>

      <div
       {...css({
        overflow:'hidden',
        color:  ui.color.w_2,
        })}
      >
        <h1>{'中艺国际'}</h1>
        <p>{'中艺国际, ZAI, zhong art international, 是一个致力于在意大利传播中国艺术文化的现实：我们的目标是让我们的传播者介绍中国传统和现代的艺术和文化，促进他们在意大利得到适当的赞赏。另一方面，我们在中国实现同样的目标，在两个地理遥远的国家之间的交流与互惠的逻辑，但接近精神'}</p>
        <h2>{'ZAI'}</h2>
        <h3>{'zhong art international'}</h3>

        <p>{'艺术家'}</p>

            {artistInfo.map( (item,index)=>
                <Link
                 href={{ pathname: '/artisti', query: {id: item.id} }}
                 as={`/artisti/${item.id}`}
                 key={'seo'+item.id + index}
                >
                    <span>
                        {`${item.name.zh} ${item.name.it} `}
                    </span>
                </Link>
            )}
      </div>

export default SEO
