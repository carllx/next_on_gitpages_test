import Document, { Head, Main, NextScript } from 'next/document'
import { renderStatic  } from 'glamor/server'
import { css ,style ,rehydrate} from 'glamor'

import {ui}  from '../utils/ui'

if (typeof window !== 'undefined') {
  rehydrate(window.__NEXT_DATA__.ids)
}

const ralewayFont = css.fontFace({
  fontFamily      :'raleway',
  src             :'url(/static/font/Raleway-Light.woff2) format("woff2"),'+
  'url(/static/font/Raleway-Light.woff) format("woff"),'+
  'url(/static/font/Raleway-Light.svg) format("svg")',
})




const _css = {
  global:style({
    background: ui.color.w_1,
    margin: 0,
    fontSize: '100%',
    fontWeight      :100,
    fontFamily:`${ralewayFont}, Microsoft JhengHei`,
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
      <html{..._css.global} lang = {`${this.props.language?this.props.language:'zh'}`}>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="Content-Type" content="text/html; charSet=utf-8" />
          <meta name="baidu-site-verification" content="BWMAZPDlTw" />
          <meta name="viewport" content="width=device-width,maximum-scale=1,minimum-scale=1,user-scalable=no" />

           {/*favicon*/}
          <link rel="apple-touch-icon" sizes="57x57" href="/static/favicon/apple-icon-57x57.png"/>
          <link rel="apple-touch-icon" sizes="60x60" href="/static/favicon/apple-icon-60x60.png"/>
          <link rel="apple-touch-icon" sizes="72x72" href="/static/favicon/apple-icon-72x72.png"/>
          <link rel="apple-touch-icon" sizes="76x76" href="/static/favicon/apple-icon-76x76.png"/>
          <link rel="apple-touch-icon" sizes="114x114" href="/static/favicon/apple-icon-114x114.png"/>
          <link rel="apple-touch-icon" sizes="120x120" href="/static/favicon/apple-icon-120x120.png"/>
          <link rel="apple-touch-icon" sizes="144x144" href="/static/favicon/apple-icon-144x144.png"/>
          <link rel="apple-touch-icon" sizes="152x152" href="/static/favicon/apple-icon-152x152.png"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-icon-180x180.png"/>
          <link rel="icon" type="image/png" sizes="192x192"  href="/static/favicon/android-icon-192x192.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon/favicon-96x96.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png"/>
          <link rel="manifest" href="/static/favicon/manifest.json"/>
          <meta name="msapplication-TileColor" content="#ffffff"/>
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
          <meta name="theme-color" content="#ffffff"/>
          {/* CSS */}

          {/*百度主动推送*/}
          <script dangerouslySetInnerHTML={{__html: `{(function(){
                          var bp = document.createElement('script');
                          var curProtocol = window.location.protocol.split(':')[0];
                          if (curProtocol === 'https') {
                              bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
                          }
                          else {
                              bp.src = 'http://push.zhanzhang.baidu.com/push.js';
                          }
                          var s = document.getElementsByTagName("script")[0];
                          s.parentNode.insertBefore(bp, s);
                      })()
            }`}} />
          {/*百度主动推送*/}

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
  //
  //

// <script dangerouslySetInnerHTML={{__html:`function initMap() {
//     // Styles a map in night mode.
//     console.log('carllx init map...')
//     var map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: 43.7738564, lng: 11.2512034 },
//         zoom: 12,
//         styles: [{
//                 "elementType": "geometry",
//                 "stylers": [{
//                     "color": "#f5f5f5"
//                 }]
//             },
//             {
//                 "elementType": "labels.icon",
//                 "stylers": [{
//                     "visibility": "off"
//                 }]
//             },
//             {
//                 "elementType": "labels.text.fill",
//                 "stylers": [{
//                     "color": "#616161"
//                 }]
//             },
//             {
//                 "elementType": "labels.text.stroke",
//                 "stylers": [{
//                     "color": "#f5f5f5"
//                 }]
//             },
//             {
//                 "featureType": "administrative.land_parcel",
//                 "elementType": "labels.text.fill",
//                 "stylers": [{
//                     "color": "#bdbdbd"
//                 }]
//             },
//             {
//                 "featureType": "poi",
//                 "elementType": "geometry",
//                 "stylers": [{
//                     "color": "#eeeeee"
//                 }]
//             },
//             {
//                 "featureType": "poi",
//                 "elementType": "labels.text.fill",
//                 "stylers": [{
//                     "color": "#757575"
//                 }]
//             },
//             {
//                 "featureType": "poi.park",
//                 "elementType": "geometry",
//                 "stylers": [{
//                     "color": "#e5e5e5"
//                 }]
//             },
//             {
//                 "featureType": "poi.park",
//                 "elementType": "labels.text.fill",
//                 "stylers": [{
//                     "color": "#9e9e9e"
//                 }]
//             },
//             {
//                 "featureType": "road",
//                 "elementType": "geometry",
//                 "stylers": [{
//                     "color": "#ffffff"
//                 }]
//             },
//             {
//                 "featureType": "road.arterial",
//                 "elementType": "labels.text.fill",
//                 "stylers": [{
//                     "color": "#757575"
//                 }]
//             },
//             {
//                 "featureType": "road.highway",
//                 "elementType": "geometry",
//                 "stylers": [{
//                     "color": "#dadada"
//                 }]
//             },
//             {
//                 "featureType": "road.highway",
//                 "elementType": "labels.text.fill",
//                 "stylers": [{
//                     "color": "#616161"
//                 }]
//             },
//             {
//                 "featureType": "road.local",
//                 "elementType": "labels.text.fill",
//                 "stylers": [{
//                     "color": "#9e9e9e"
//                 }]
//             },
//             {
//                 "featureType": "transit.line",
//                 "elementType": "geometry",
//                 "stylers": [{
//                     "color": "#e5e5e5"
//                 }]
//             },
//             {
//                 "featureType": "transit.station",
//                 "elementType": "geometry",
//                 "stylers": [{
//                     "color": "#eeeeee"
//                 }]
//             },
//             {
//                 "featureType": "water",
//                 "elementType": "geometry",
//                 "stylers": [{
//                     "color": "#c9c9c9"
//                 }]
//             },
//             {
//                 "featureType": "water",
//                 "elementType": "labels.text.fill",
//                 "stylers": [{
//                     "color": "#9e9e9e"
//                 }]
//             }
//         ]
//     });
// }`}}/>
//     <script src={`https://maps.googleapis.com/maps/api/js?key=${`AIzaSyBLIIP0K4ol3mGOc57ocfpA1jgmmxhIRTk`}&callback=initMap`}
//     async defer></script>
