import {PureComponent} from 'react'
import { css } from 'glamor'
import {ui}  from 'utils/ui'



/////////////
// ELEMENT //
/////////////
///

class LOGO extends PureComponent {
  render(){

    return(
      <svg
       {...css({
        fill:'none',
        stroke:'#333',
        strokeWidth:'.5px',
        strokeLinejoin:'round',/*round bevel*/
        strokeLinecap:'round',
       })}
       viewBox="0 0 58.31 22.5"
       x="0px"
       y="0px"
       >
        <title>中艺国际,ZAI,carllx,林昕</title>
        <g className='icon'>
          <polyline points="0.36 0.25 16.25 0.25 0.25 16.25 16.14 16.25"/>
          <polyline points="0.25 16.25 16.25 0.25 16.25 16.25 8.29 8.17"/>
          <line x1="0.38" y1="16.25" x2="0.38" y2="0.25"/>
        </g>
        <g className='zai'>
          <polyline points="20.08 0.25 35.97 0.25 19.97 16.25 35.86 16.25"/>
          <polyline points="35.7 16.25 51.7 0.25 51.7 16.25 44.17 8.75"/>
          <line x1="58.06" y1="16.25" x2="58.06" y2="0.25"/>
        </g>
        <g>
          <text
           x='0'
           y='22'
           fontFamily='raleway'
           stroke ='none'
           // strokeWidth ='0.1'
           fill= {ui.color.b_o2}
           textLength="16.25"
           lengthAdjust= "spacing"
           fontSize = '2.8'
          >
            中艺国际
          </text>
          <text
           x='20'
           y='22'
           fontFamily='raleway'
           stroke ='none'
           // strokeWidth ='0.1'
           fill= {ui.color.b_o2}
           textLength="37.98" //58.06-20.08
           lengthAdjust= "spacing"
           fontSize = '2.8'
          >
            ZHONG ART INTERNAZIONAL
          </text>
        </g>
      </svg>
    )
  }
}






export default LOGO



