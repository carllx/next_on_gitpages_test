import Document, { Head, Main, NextScript } from 'next/document'
import { renderStatic  } from 'glamor/server'
import { css ,style ,rehydrate} from 'glamor'

import {ui}  from '../utils/ui'

if (typeof window !== 'undefined') {
  rehydrate(window.__NEXT_DATA__.ids)
}


// css.global('@font-face', {fontFamily      :'raleway',

//   src             :"url('../static/font/Raleway-Light.woff2') format('woff2'),"+
//   "url('../static/font/Raleway-Light.woff') format('woff'),"+
//   "url('../static/font/Raleway-Light.svg') format('svg')",
//   unicodeRange    :"U+0000-00FF, U+0131, ... U+E0FF, U+EFFD, U+F000"
// })


const ralewayFont = css.fontFace({
  fontFamily      :'raleway',
  src             :"url('http://www.zhongart.it/static/font/static/font/Raleway-Light.woff2') format('woff2'),"+
  "url('http://www.zhongart.it/static/font/Raleway-Light.woff') format('woff'),"+
  "url('http://www.zhongart.it/static/font/Raleway-Light.svg') format('svg')",

})




const _css = {
  global:style({
    background: ui.color.w_1,
    margin: 0,
    fontSize: '100%',
    fontWeight      :100,
    fontFamily:`${ralewayFont} Microsoft JhengHei`,
  })
}


export default class MyDocument extends Document {
  static async getInitialProps ({ renderPage }) {
    const page = renderPage()
    const styles = renderStatic(() => page.html)
    return { ...page, ...styles }
  }

  constructor (props) {
    super(props)

    const { __NEXT_DATA__, ids } = props
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids
    }
  }

  render () {


    return (
      <html{..._css.global}>
        <Head>
          <meta name="viewport" content="width=device-width,maximum-scale=1,minimum-scale=1,user-scalable=no" />


          {/* CSS */}

        <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>


        <body {..._css.global}>
          <Main />
          {/*<div >{'document'+this.state.device}</div>*/}
          <NextScript />
        </body>
      </html>
    )
  }
}

//<script src="../static/vconsole.min.js"></script>

  // polyfill(){
  //   if (typeof Object.assign != 'function') {
  //     Object.assign = function(target) {
  //       'use strict';
  //       if (target == null) {
  //         throw new TypeError('Cannot convert undefined or null to object');
  //       }

  //       target = Object(target);
  //       for (var index = 1; index < arguments.length; index++) {
  //         var source = arguments[index];
  //         if (source != null) {
  //           for (var key in source) {
  //             if (Object.prototype.hasOwnProperty.call(source, key)) {
  //               target[key] = source[key];
  //             }
  //           }
  //         }
  //       }
  //       return target;
  //     };
  //   }
  // }
