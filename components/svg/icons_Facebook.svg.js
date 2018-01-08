import {PureComponent} from 'react'
import {ui,GR}  from '~/utils/ui'

const SVG= (props) => (

    <svg

     width={props.size||32}
     height={props.size||32}
     viewBox="0 0 32 32">
        <title>{'facebook'}</title>
        <path class="cls-1" d="M18.72,6.94h4.53V1.5H18.72a6.35,6.35,0,0,0-6.34,6.34v2.72H8.75V16h3.63V30.5h5.43V16h4.53l.91-5.44H17.81V7.84A.92.92,0,0,1,18.72,6.94Z" />

    </svg>
)



export default SVG
