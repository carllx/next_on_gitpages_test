import React, {Component} from 'react'
import { rehydrate, css } from 'glamor'
// import glamorous from 'glamorous'


import {ui,GR}  from '../utils/ui'

// const GR = gr()
//////////
// FONT //
//////////



// const ralewayFont = css.fontFace({
//   fontFamily      :'raleway',
//   fontStyle       :'normal',
//   fontWeight      :100,
//   src             :"url('../static/font/Raleway-Light.woff2') format('woff2'),"+
//   "url('../static/font/Raleway-Light.woff') format('woff'),"+
//   "url('../static/font/Raleway-Light.svg') format('svg')",
//   // unicodeRange    :"U+0000-00FF, U+0131, ... U+E0FF, U+EFFD, U+F000"
// })


/////////////
// ELEMENT //
/////////////
const _SVG =(props)=>
  <svg
   {...css({
    fill:'none',
    stroke:'#333',
    strokeWidth:'0.5px',
    strokeLinejoin:'round',/*round bevel*/
    strokeLinecap:'round',
   })}
   viewBox="0 0 58.31 16.5"
   x="0px"
   y="0px"
   >
    <title>中艺国际,ZAI,carllx,林昕</title>
    <g className='zai'>
      <polyline points="20.08 0.25 35.97 0.25 19.97 16.25 35.86 16.25"/>
      <polyline points="35.7 16.25 51.7 0.25 51.7 16.25 44.17 8.75"/>
      <line x1="58.06" y1="16.25" x2="58.06" y2="0.25"/>
    </g>
    <g className='icon'>
      <polyline points="0.36 0.25 16.25 0.25 0.25 16.25 16.14 16.25"/>
      <polyline points="0.25 16.25 16.25 0.25 16.25 16.25 8.29 8.17"/>
      <line x1="0.38" y1="16.25" x2="0.38" y2="0.25"/>
    </g>
  </svg>



const LOGO = (props)=>
  <div>
    <_SVG/>
    {/*logo文字*/}
    <div
      {...css({
      // fontFamily:ralewayFont,
      fontSize:`${GR.vw(9)}vw`,
      color:ui.color.b_o2,
      marginTop:`${GR.vw(9)}vw`,
     })}
    >
      中艺国际 ZHONG ART INTERNAZIONAL
    </div>
  </div>

export default LOGO




// const svg_style = css({
//     width:`${gr(5)}rem`,
//     height:`${gr(5)}rem`
// });
// const logo_default  = {filter:'url(#dropshadow)'}
// const logo_s_top    = css({...logo_default,fill:'#E6E6E6'});
// const logo_s_bottom = css({...logo_default,fill:'#E6E6E6'});
// const logo_l_top    = css({...logo_default,fill:'#B3B3B3'});
// const logo_l_bottom = css({...logo_default,fill:'#CCCCCC'});





// const LogoRight = glamorous.div({

//     fontSize      :`${gr(8)}rem`,
//     fontFamily    :ZhoFont,

//     color:'#B3B3B3',
//     marginBottom:`${gr(10)}rem`,
//     marginLeft:`${gr(9)}rem`,

// });


/*
const SVGLogoCarta ()=>(
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
          <LogoRight>
          <div>{'中艺国际'}</div>
          <div>{'Zhong Art'}</div>
          <div>{'Internazionale'}</div>
        </LogoRight>
)

*/


