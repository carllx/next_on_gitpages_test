// import {PureComponent} from 'react'
import {ui,GR}  from 'utils/ui'
import { css } from 'glamor'

const Svg = (props) =>
            <svg
             {...css({
                fill: 'none',
                stroke: props.strokeColor||'#000',
                strokeMiterlimit: 10,
                cursor:'pointer',
                strokeLinejoin: 'round',
                strokeLinecap: 'square',
                strokeWidth:1/2 ,
             })}
             width={props.size||32}
             height={props.size||32}
             viewBox="0 0 32 32">
            <title>ZAI ,carllx</title>
            <polyline id="Z" points="1.7 1.5 30.5 1.5 1.5 30.5 30.3 30.5" />
            <polyline id="A" points="1.5 30.5 30.5 1.5 30.5 30.5 16.07 15.86" />
            <line id="I" x1="1.74" y1="30.5" x2="1.74" y2="1.5" />
        </svg>

export default Svg
