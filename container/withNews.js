import {PureComponent} from 'react'
import {bindActionCreators} from 'redux'
import withRedux from 'next-redux-wrapper'
import {css} from 'glamor'
import NoSSR from 'react-no-ssr';
import Head from 'next/head'
import {GR , makeKEY , perspZ}  from '~/utils/ui'
import {isMobile  ,isTablet , getLanguer}  from '~/utils/device'
import {switchLanguage,onDevice} from'~/reducers/root'

import Scroller from '~/components/controller.scroll'
import Resizer from '~/components/controller.resize'
import Nav from '~/components/nav'
import Seczione from '~/components/section'
import {initStore} from '~/store'

import Copyright from '~/components/copyright'

export default function WithNews (options) {
  return function (content) {
    class News extends PureComponent {
      // getUrl(slug) {
      //   return `${ROOT_URL}/blog/${options.slug}`
      // }

      getShareLink(link) {
        return `/share?slug=${options.slug}&redirectTo=${encodeURIComponent(link)}`
      }

      render () {

        const {language } = this.props ||{language:'zh'}
        const {is_landscape} = this.props.view_size||{view_size:{is_landscap:false}}

        return (
            <main>

                <Head>
                    <title>{options.title[language]}</title>
                    {/*meta 不支持重复 property*/}
                    <meta content={`ZAI - ${options.title[language]}`} name='title' />
                    <meta content={`ZAI - ${options.title[language]}`} property='og:title' />
                    <meta content={`ZAI - ${options.title.zh} ${options.title[language]} ${options.title.en}`} name='description' />
                    <meta content={`ZAI - ${options.title.zh} ${options.title[language]} ${options.title.en}`} property='og:description' />
                    <meta content={`${options.keywords} ZAI,中艺国际, zhongart, firenze, Gallery, arte, 佛罗伦萨 `} name='keywords' />
                    <meta content='article' property='og:type' />
                    <meta content={`http://www.zhongart.it/news/${options.slug}`} property='og:url' />

                    {/*
                    <meta content='//s3.amazonaws.com/所用的图片' property='og:image' />
                    */}

                    {/*<style dangerouslySetInnerHTML={{ __html: options.css }} />*/}

                </Head>

                <div
                {
                ...css({
                overflowY: 'auto',
                // height: '100%',
                // weight:'100%',
                marginTop: `${is_landscape?GR.vw(4):GR.vw(6)}vw`,
                marginBottom: is_landscape?`${GR.vw(7)}vh`:`${GR.vw(7)}vw`,
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                })}


                >
                    {/*TITLE*/}
                    <div
                    {...css({
                      margin:is_landscape?'0 20em 1em 20em':'0 1em 1em 1em',
                    })}
                    >
                    <h1 {
                      ...css({
                        textAlign:"center",
                      })
                    }>{options.title[language]}</h1>
                    </div>
                    {/*TITLE*/}




                    <div
                    {...css({
                      // is_landscape
                      display:'flex',
                      flexDirection:'column',
                      margin:is_landscape?'0 20em 15em 20em':'0 1em 15em 1em',

                      // transform: `rotate3d(${this.state.tiltx},${this.state.tilty},0,${this.state.degree}deg)`,
                      // transition: `transform 1s cubic-bezier(0.1, 0.5, 0.4, 1)`,
                    })}
                    key= {`${options.slug}-${this.props.language}`}
                    id ='win_scroller'
                    >
                    {content}
                    </div>


                    <Copyright/>

                </div>


                <NoSSR>
                    <Nav show_on_init = {!is_landscape}/>
                </NoSSR>
                <NoSSR>
                  <Scroller />
                </NoSSR>
                <Resizer/>
            </main>
        )
      }
    }

    const mapStateToProps = (state) => ({
        view_size:state.Root.view_size,
        language:state.Root.language,
    });

    const mapDispatchToProps = (dispatch) => {
      return {
        // root
        switchLanguage: bindActionCreators(switchLanguage, dispatch),
        onDevice: bindActionCreators(onDevice, dispatch),
        // setBrowser: bindActionCreators(setBrowser, dispatch),
      }
    }

    return withRedux(initStore, mapStateToProps, mapDispatchToProps)(News)
  }
}

// export const components = {
//   p: P,
//   code: InlineCode
// }
