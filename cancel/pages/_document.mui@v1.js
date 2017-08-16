// import Document, { Head, Main, NextScript } from 'next/document'
// import { renderStatic } from 'glamor/server'

// export default class MyDocument extends Document {
//   static async getInitialProps ({ renderPage }) {
//     const page = renderPage()
//     const styles = renderStatic(() => page.html)
//     return { ...page, ...styles }
//   }

//   constructor (props) {
//     super(props)
//     const { __NEXT_DATA__, ids } = props
//     if (ids) {
//       __NEXT_DATA__.ids = this.props.ids
//     }
//   }

//   render () {
//     return (
//       <html>
//         <Head>
//           <title>With Glamorous</title>
//           <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </html>
//     )
//   }
// }

import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { getContext, setContext } from '../styles/context'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    // Reset the context for handling a new request.
    setContext()
    const page = ctx.renderPage()
    // Get the context with the collected side effects.
    const context = getContext()
    return {
      ...page,
      styles: <style id='jss-server-side' dangerouslySetInnerHTML={{ __html: context.sheetsRegistry.toString() }} />
    }
  }

  render () {
    const context = getContext()
    return (
      <html lang='en'>
        <Head>
          <title>My page</title>
          <meta charSet='utf-8' />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name='viewport'
            content={
              'user-scalable=0, initial-scale=1, maximum-scale=1, ' +
                'minimum-scale=1, width=device-width, height=device-height'
            }
          />
          {/* PWA primary color */}
          <meta name='theme-color' content={context.theme.palette.primary[500]} />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}