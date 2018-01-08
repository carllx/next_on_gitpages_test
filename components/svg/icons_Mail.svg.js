import {PureComponent} from 'react'
import {ui,GR}  from '~/utils/ui'

const SVG= (props) => (

    <svg

     width={props.size||32}
     height={props.size||32}
     viewBox="0 0 32 32">
        <title>Mail</title>
            <path id="letter" class="cls-1" d="M3,9.79l11.28,7.52a3.22,3.22,0,0,0,3.38,0L29,9.79m.24-2.95H2.79c-1.26,0-1.29,1-1.29,2.29V22.87c0,1.26,0,2.29,1.29,2.29H29.21c1.26,0,1.29-1,1.29-2.29V9.13C30.5,7.87,30.47,6.84,29.21,6.84Z" />
    </svg>
)



export default SVG
