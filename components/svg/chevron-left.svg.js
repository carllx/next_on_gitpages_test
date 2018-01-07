
import { css } from 'glamor'
import {ui,GR}  from '~/utils/ui'

const SVG= (props) => (
    <svg

     width={props.size||32}
     height={props.size||32}
     viewBox="0 0 31 31">
        <title>chevron-left</title>
        <polyline
         {...css({
            fill: 'none',
            stroke: props.color||'black',
            strokeMiterlimit: 10,
            strokeWidth: `${props.strokeWidth ||1}px`,
           })}
         points="19.82 23.82 11.19 15.19 19.7 6.68" />

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
