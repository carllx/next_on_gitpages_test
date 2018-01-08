import {PureComponent} from 'react'
import {ui,GR}  from '~/utils/ui'

const SVG= (props) => (

    <svg

     width={props.size||32}
     height={props.size||32}
     viewBox="0 0 32 32">
        <title>{'weibo'}</title>
            <path class="cls-1" d="M30.5,26.88V16H23.25A7.26,7.26,0,0,1,30.5,8.75V5.12A10.89,10.89,0,0,0,19.62,16V26.88Zm-18.12,0V16H5.12a7.26,7.26,0,0,1,7.26-7.25V5.12A10.89,10.89,0,0,0,1.5,16V26.88Z" />

    </svg>
)



export default SVG
