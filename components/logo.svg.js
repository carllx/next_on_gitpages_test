import React, {Component} from 'react'
import { rehydrate, css } from 'glamor'
import glamorous from 'glamorous'

import {ui}  from '../utils/ui'



//////////
// FONT //
//////////


const ZhoFont = css.fontFace({
  fontFamily      :'Zho',
  fontStyle       :'normal',
  fontWeight      :400,
  src             :"url('../static/font/SquadaOne-Regular.woff2') format('woff2'),"+
  "url('../static/font/SquadaOne-Regular.woff') format('woff'),"+
  "url('../static/font/SquadaOne-Regular.svg') format('svg')",
  unicodeRange    :"U+0000-00FF, U+0131, ... U+E0FF, U+EFFD, U+F000"
})







/////////////
// ELEMENT //
/////////////

const logo_default  = {filter:'url(#dropshadow)'}
const logo_s_top    = css({...logo_default,fill:'#E6E6E6'});
const logo_s_bottom = css({...logo_default,fill:'#E6E6E6'});
const logo_l_top    = css({...logo_default,fill:'#B3B3B3'});
const logo_l_bottom = css({...logo_default,fill:'#CCCCCC'});
const svg_style = css({
    width:"1rem",
    height:"1rem"
});
const logo_container = css({

    top:'.5rem',
    left:'.2rem',
    display:       'flex',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:    'flex-end',
    position:      'fixed',
    zIndex:2,
    textAlign:     'left',
})

const LogoRight = glamorous.div({

    fontFamily    :ZhoFont,
    fontSize      :`0.4em`,
    color:'#B3B3B3',
    marginBottom:'0.07rem',
    marginLeft:'0.1rem',

});




/**
 * Logo组件,
 * @param  {float}  fontSize
 * @param  {string} color  [description]
 * @param  {string} bg_color  [description]
 * @return {component}
 */

function isMobile_Logo(){
  return ({
    fontSize      : '1rem',
  })
}



/**
 * <!-- esamper  http://xn--dahlstrm-t4a.net/svg/filters/arrow-with-dropshadow-lighter.svg -->
 */
class Logo extends Component {

  constructor (props) {

      super(props)
      this.state = {}

  }

  render(){

    return(
      <div {...css(logo_container)}>
        <svg
         {...css(svg_style)}
         // width="240px"
         // height="240px"
         x="0px"
         y="0px"
         viewBox="0 0 40 40"
         >
          <filter id="dropshadow" height="130%">

            <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
            <feComponentTransfer xmlns="http://www.w3.org/2000/svg">
              <feFuncA type="linear" slope="0.2"/>
            </feComponentTransfer>

            <feOffset dx="2" dy="2" result="offsetblur"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <g id="LOGO">
            <polygon
             {...css(logo_l_top)}
             class="st0"
             points="35,35 5,35 5,5 35,5"
            />
            <polygon
             {...css(logo_l_bottom)}
             class="st1"
             points="5,35 5,5 35,5"
            />
            <polygon
             {...css(logo_s_top)}
             class="st2"
             points="35,27.9 35,35 27.9,35 "
            />
            <polygon
             {...css(logo_s_bottom)}
             class="st2"
             points="5,16.5 5,5 16.5,5 "
            />
          </g>

        </svg>

        <LogoRight>
          <div>{'Zhong Art'}</div>
          <div>{'Internazionale'}</div>
        </LogoRight>
      </div>
      );

  }

}

export default Logo




