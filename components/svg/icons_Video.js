import {PureComponent} from 'react'
import {ui,GR}  from '~/utils/ui'

const SVG= (props) => (

    <svg

     width={props.size||32}
     height={props.size||32}
     viewBox="0 0 32 32">
        <title>{'video'}</title>
        <path class="cls-1" d="M16,1.5A14.5,14.5,0,1,1,1.5,16,14.5,14.5,0,0,1,16,1.5ZM23.25,17a1.2,1.2,0,0,0,0-2.08L13,8.92a1.19,1.19,0,0,0-1.21,0,1.22,1.22,0,0,0-.6,1.06V22a1.22,1.22,0,0,0,.6,1.06,1.44,1.44,0,0,0,.61.15,1.21,1.21,0,0,0,.6-.17Z" />

    </svg>
)



export default SVG
