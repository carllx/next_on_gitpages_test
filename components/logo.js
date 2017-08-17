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
},(props)=>{

  fontSize        :props.size?`${props.size}em`:`0.8em`
});

const LogoRight = glamorous.div({

    fontFamily    :ZhoFont,
    fontSize      :`0.3em`,


});

const LogoContainer = glamorous.div({

    color          :ui.color.primary_on_dark,
    backgroundColor:ui.color.secondary,

    display       :'flex',
    flexDirection :'row',
    justifyContent:'center',
    alignItems    :'flex-end',
    // alignItems:'baseline',
  	position       :'fixed',
  	zIndex         :2,
    textAlign      :'left',

    boxShadow      :`0 9px 46px 8px rgba(0,0,0,.14),0 11px 15px -7px rgba(0,0,0,.12),0 24px 38px 3px rgba(0,0,0,.2)`,
    padding        :'0.5em 0.5em 0.5em 0.5em',
  },(props)=>{

    let isLandscape = props.isLandscape;

    if(props.device == 'isDesktop'){
      return ({
        fontSize      : '1rem',
        width         : 'auto',
      })
    }else if(props.device =='isMobile'){
      return ({
        fontSize      : isLandscape?'0.8rem':'1rem',
        width         : isLandscape?'auto':'100%',

        left          : isLandscape?'50%':0,
        top           : isLandscape?'0%':0,
        transform     : isLandscape?'translate(-50%, 0)' :0,
      })
    }else if(props.device =='isTablet'){
      return ({
        fontSize      :'1rem',
        width         :'auto',


      })
    }

  }
    // width         :props.isCenter? '100%':'auto',
    // left          :props.isCenter? '50%':0,
    // top           :props.isCenter? '0%':0,
    // transform     :props.isCenter? 'translate(-50%, 0)':0 ,
)








class Logo extends Component {

  constructor (props) {

      super(props)
      this.state = {}

  }

  render(){

    return(
      <div>
        <LogoContainer {...this.props}>
          <LogoZAI>{'ZAI'}</LogoZAI>
          <LogoRight>
            <div>{'Zhong Art'}</div>
            <div>{'Internazionale'}</div>
          </LogoRight>
        </LogoContainer>
      </div>

      );

  }

}

export default Logo
