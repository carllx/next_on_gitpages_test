
import { css } from 'glamor'
import glamorous from 'glamorous'
import NoSSR from 'react-no-ssr';

import Nav from '~/components/nav'
import {IMG_WithLoader} from '~/components/img'
import Logo from '~/components/logo.svg'



import {throttle, debounce}  from '~/utils/throttle'
import {ui}  from '~/utils/ui'



export const SectionWelcome = (props)=>(

    <NoSSR>
        <div
         style={{
          position: 'absolute',
          top:0
         }}
        >
            <IMG_WithLoader
             width={props.width}
             height={props.height}
             org={'1f2952_85a2098e58c240a58d4a04613ec9369c~mv2.png'}
             active= {true}
            />
        </div>
    </NoSSR>




)
