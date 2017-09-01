import React, {Component} from 'react'
import { rehydrate, css } from 'glamor'
import glamorous from 'glamorous'


import {ui  ,gr}  from '../utils/ui'



// const GR = gr()
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



const logo_container = css({
    // fontSize :`${gr(1)}rem`,
    top: `${gr(8)}rem`,
    left:`${gr(8)}rem`,
    display:       'flex',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:    'flex-end',
    position:      'fixed',
    zIndex:2,
    textAlign:     'left',
})


const logo_default  = {filter:'url(#dropshadow)'}
const logo_s_top    = css({...logo_default,fill:'#E6E6E6'});
const logo_s_bottom = css({...logo_default,fill:'#E6E6E6'});
const logo_l_top    = css({...logo_default,fill:'#B3B3B3'});
const logo_l_bottom = css({...logo_default,fill:'#CCCCCC'});

const svg_style = css({
    width:`${gr(5)}rem`,
    height:`${gr(5)}rem`
});




const LogoRight = glamorous.div({

    fontSize      :`${gr(8)}rem`,
    fontFamily    :ZhoFont,

    color:'#B3B3B3',
    marginBottom:`${gr(10)}rem`,
    marginLeft:`${gr(9)}rem`,

});






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
{/*        <glamorous.Div
         position = 'fixed'
         zIndex = '2'
         top = '-5rem'
         left = '-5rem'
         width = '11rem'
         height = '5rem'
         background = '#212121'
         transform = 'rotate(60deg)'
        />*/}
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

          <g>
            <polygon
             {...css(logo_l_top)}
             points="35,35 5,35 5,5 35,5"
            />
            <polygon
             {...css(logo_l_bottom)}
             points="5,35 5,5 35,5"
            />
            <polygon
             {...css(logo_s_top)}
             points="35,27.9 35,35 27.9,35 "
            />
            <polygon
             {...css(logo_s_bottom)}
             points="5,16.5 5,5 16.5,5 "
            />
          </g>

        </svg>

        <LogoRight>
          <div>{'中艺国际'}</div>
          <div>{'Zhong Art'}</div>
          <div>{'Internazionale'}</div>
        </LogoRight>
      </div>
      );

  }

}

export default Logo




