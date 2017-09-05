import Document, { Head, Main, NextScript } from 'next/document'
import { renderStatic } from 'glamor/server'

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
  polyfill(){
    if (typeof Object.assign != 'function') {
      Object.assign = function(target) {
        'use strict';
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
          var source = arguments[index];
          if (source != null) {
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
        }
        return target;
      };
    }
  }
  render () {

    this.polyfill();
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width,maximum-scale=1,minimum-scale=1,user-scalable=no" />
          <meta content='ZAI Gallery - Loie Hollowell' name='title' />
          <meta content='ZAI Gallery - Loie Hollowell' property='og:title' />
          <meta content='页面描述 ...' name='description' />
          <meta content='ZAI, zhongart internationale, Gallery, arte, 中艺国际, 佛罗伦萨 ' name='keywords' />

          <meta content='页面描述 ...' property='og:description' />
          <meta content='http://www.pacegallery.com/artists/746/loie-hollowell' property='og:url' />
          <meta content='Pace Gallery' property='og:site_name' />
          <meta content='article' property='og:type' />
          <meta content='//s3.amazonaws.com/所用的图片' property='og:image' />
          <title>中艺国际</title>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />

        </Head>
        <body>
          <Main />
          {/*<div >{'document'+this.state.device}</div>*/}
          <NextScript />
        </body>
      </html>
    )
  }
}

//<script src="../static/vconsole.min.js"></script>
