import {PureComponent} from 'react'
import { css } from 'glamor'
import {ui,GR}  from 'utils/ui'

const SVG= (props) => (

    <svg

     width={props.size||32}
     height={props.size||32}
     viewBox="0 0 31 31">
        <title>chevron-right</title>
        <polyline
         {...css({
            fill: 'none',
            stroke: props.color||'black',
            strokeMiterlimit: 10,
            strokeWidth: `${props.strokeWidth ||1}px`,
           })}
         points="11.19 6.68 19.82 15.31 11.3 23.82" />

        <circle
         {...css({
            fill: 'none',
            stroke: props.color||'black',
            strokeMiterlimit: 10,
            strokeWidth: `${props.strokeWidth ||1}px`,
           })}
         cx="15.25"
         cy="15.25"
         r="15" />

    </svg>
)



export default SVG
