import {PureComponent} from 'react'
import {ui,GR}  from '~/utils/ui'

const SVG= (props) => (

    <svg

     width={props.size||32}
     height={props.size||32}
     viewBox="0 0 32 32">
        <title>{'right quote'}</title>
        <path class="cls-1" d="M1.5,5.12V16H8.75A7.26,7.26,0,0,1,1.5,23.25v3.63A10.89,10.89,0,0,0,12.38,16V5.12Zm18.12,0V16h7.26a7.26,7.26,0,0,1-7.26,7.25v3.63A10.89,10.89,0,0,0,30.5,16V5.12Z" />
    </svg>
)



export default SVG
