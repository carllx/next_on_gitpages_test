import Link from 'next/link'
import React, {Component} from 'react'
import { rehydrate, css } from 'glamor'
import glamorous from 'glamorous'

import {ui}  from '../utils/ui'





// FONT

const ZaiFont = css.fontFace({
  fontFamily      :'ZAI',
  fontStyle       :'normal',
  fontWeight      :400,
  src             :"url('../static/font/SFElectrotome-Bold.woff2') format('woff2'),"+
  "url('../static/font/SFElectrotome-Bold.woff') format('woff'),"+
  "url('../static/font/SFElectrotome-Bold.svg') format('svg')",
  unicodeRange    :"U+0000-00FF, U+0131, ... U+E0FF, U+EFFD, U+F000"
})

const ZhoFont = css.fontFace({
  fontFamily      :'Zho',
  fontStyle       :'normal',
  fontWeight      :400,
  src             :"url('../static/font/SquadaOne-Regular.woff2') format('woff2'),"+
  "url('../static/font/SquadaOne-Regular.woff') format('woff'),"+
  "url('../static/font/SquadaOne-Regular.svg') format('svg')",
  unicodeRange    :"U+0000-00FF, U+0131, ... U+E0FF, U+EFFD, U+F000"
})







// ELEMENT

const LogoZAI = glamorous.div({

  fontFamily      :ZaiFont,
  lineHeight      :`0.8em`,//为了和右边对齐
  display         :'flex',
  alignItems      :'flex-end',
  padding         :'0 0.1em 0 0',
});

const LogoRight = glamorous.div({

    fontFamily    :ZhoFont,
    fontSize      :`0.4em`,

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

const _Logo = glamorous.div({
// alignItems:'baseline',
    display:       'flex',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:    'flex-end',
    position:      'fixed',
    zIndex:2,
    textAlign:     'left',
    boxShadow:     `0 9px 46px 8px rgba(0,0,0,.14),0 11px 15px -7px rgba(0,0,0,.12),0 24px 38px 3px rgba(0,0,0,.2)`,
    padding:       '0.8em 1em 1em 0.8em'
  },(props)=>{

    const Default = {
      fontSize:        props.size?`${props.size}rem`:`0.8rem`,
      color:           props.color,
      backgroundColor: props.bg_color
    }

    const isLandscape = props.isLandscape;

    const isDesktop ={
      fontSize       : props.size?`${props.size}rem`:`0.5rem`
    }

    const isMobile ={
      fontSize:  isLandscape?'0.8rem':            '1rem',
      width:     isLandscape?'auto':              '100%',
      left:      isLandscape?'50%':               0,
      top:       isLandscape?'0%':                0,
      transform: isLandscape?'translate(-50%, 0)':0,
    }

    const isTablet ={
      fontSize: '1rem',
    }
    switch (props.device){
      case 'isDesktop':
        return Object.assign(Default,isDesktop);


      case 'isMobile':
        return Object.assign(Default,isMobile);
        break;
      case 'isTablet':
        return Object.assign(Default,isTablet);
        break;
    }
  }
)






class Logo extends Component {

  constructor (props) {

      super(props)
      this.state = {}

  }

  render(){

    return(
      <div>
        <_Logo {...this.props}>
          <LogoZAI>{'ZAI'}</LogoZAI>
          <LogoRight>
            <div>{'Zhong Art'}</div>
            <div>{'Internazionale'}</div>
          </LogoRight>
        </_Logo>
      </div>

      );

  }

}

export default Logo
