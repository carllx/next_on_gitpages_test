import {PureComponent} from 'react'
import { css } from 'glamor'
import {ui,GR}  from '~/utils/ui'

const SVG= (props) => (

    <svg

     width={props.size||32}
     height={props.size||32}
     viewBox="0 0 32 32">
        <title>address</title>
        <path class="cls-1" d="M15.85,30.48l-.57-.28a47.38,47.38,0,0,1-4.06-6.36,41.34,41.34,0,0,1-2.79-6.4,23.47,23.47,0,0,1-1.28-7.26,8.7,8.7,0,0,1,17.4,0,23.47,23.47,0,0,1-1.28,7.26,41.34,41.34,0,0,1-2.79,6.4,47.38,47.38,0,0,1-4.06,6.36Z" />
        <path class="cls-1" d="M15.85,14.53a4.35,4.35,0,1,1,4.35-4.35A4.35,4.35,0,0,1,15.85,14.53Z" />
    </svg>
)



export default SVG
