import {PureComponent} from 'react'
import {ui,GR}  from '~/utils/ui'

const SVG= (props) => (

    <svg

     width={props.size||32}
     height={props.size||32}
     viewBox="0 0 32 32">
        <title>{'mobile'}</title>
        <line class="cls-1" x1="8.21" y1="24.75" x2="24.79" y2="24.75" />
        <path class="cls-1" d="M9.13,30.53h14.5A1.36,1.36,0,0,0,25,29.17V2.89a1.36,1.36,0,0,0-1.36-1.36H9.13A1.36,1.36,0,0,0,7.77,2.89V29.17A1.36,1.36,0,0,0,9.13,30.53Zm6.2-2.72a1.5,1.5,0,1,0,1.5-1.5A1.5,1.5,0,0,0,15.33,27.81Z" />
    </svg>
)



export default SVG
