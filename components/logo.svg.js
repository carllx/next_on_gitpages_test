import React, {Component} from 'react'
import { rehydrate, css } from 'glamor'
import glamorous from 'glamorous'


import {ui  ,gr}  from '../utils/ui'



// const GR = gr()
//////////
// FONT //
//////////


const DOSIS = css.fontFace({
  fontFamily      :'DOSIS',
  fontStyle       :'normal',
  fontWeight      :50,
  src             :
  "url('../static/font/dosis.extralight.woff2') format('woff2'),"+
  "url('../static/font/dosis.extralight.woff') format('woff'),"+
  "url('../static/font/dosis.extralight.svg') format('svg')",
  unicodeRange    :"U+0000-00FF, U+0131, ... U+E0FF, U+EFFD, U+F000"
})







/////////////
// ELEMENT //
/////////////


const Container = glamorous.div({

    // display:       'flex',
    // flexDirection: 'row',
    // justifyContent:'flex-start',//center
    position:      'fixed',
    zIndex:2,
    textAlign:     'left',
  },(props)=>({
    top:props.isLandscape?
    `${gr(8)}rem`:
    `${gr(6)}rem`,
    left:props.isLandscape?
    `${gr(7)}rem`:
    `${gr(6)}rem`,

  })

)


const logo_default  = css({
  fill:'none',
  stroke:ui.color.secondary_secondary
})

const SVGLogo = glamorous.svg(
  {

  },(props)=>(
  {
    width:props.isLandscape?
    `${gr(3)}rem`:
    `${gr(1)}rem`,
    height:props.isLandscape?
    `${gr(3)/5.7205}rem`:
    `${gr(1)/5.7205}rem`,
  })
)

// const logo_l_bottom = css({...logo_default,fill:'#CCCCCC'});

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
      <Container {...this.props}>

        <SVGLogo
         {...css(logo_default)}
         // width="240px"
         // height="240px"
         x="0px"
         y="0px"
         viewBox="8 0 174.8 33.5"
         >

          <g id="ICON" {...css({
            strokeLinejoin:'bevel',
            strokeLinecap:'round',
            strokeLinejoin:'round'
          })}>
            <polyline
            points="1.4,2 29.5,2 1.2,30.3 29.3,30.3"/>
            <polyline
            points="1.2,30.3 29.5,2 29.5,30.3 15.4,16"/>
            <line
             x1="1.4" y1="30.3" x2="1.4" y2="2"/>
          </g>
          <g id="ZAI">
            <polyline id="Z"
            points="41.9,2 70.1,2 41.7,30.3 69.9,30.3"/>
            <polyline id="A"
            points="69.7,30.2 98,1.9 98,30.2 84.7,17  "/>
            <line id="I"
            x1="108.9" y1="30.2" x2="108.9" y2="1.9"/>
          </g>
          <g {...css({fontSize:'9.4033px',fill:ui.color.secondary_secondary,stroke:'none',fontFamily:DOSIS}, )}>
            <text transform="matrix(1 0 0 1 124.6943 20.4883)"
            >Zhong Art</text>
            <text transform="matrix(1 0 0 1 124.6943 29.8906)"
            >Internationale</text>
            <text transform="matrix(1 0 0 1 124.6943 9.8975)"
            >中艺国际</text>
          </g>


        </SVGLogo>


      </Container>
      );

  }

}

export default Logo




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
