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

import markdown from 'markdown-in-js'
import Copyright from '~/components/copyright'


class News extends PureComponent {

  static async getInitialProps({ isServer, query }) {
      /*es: query :{ id: 'EnzoCucchi' }*/
      const post = require(`../static/contents/news/${query.id}`);
      return { ...post }
  }

  constructor(props) {
    super(props)
  }

  setLanguage = (language) => {
      this.props.switchLanguage(language)
  }


  setDevice = () => {
      let whatDevice;
      if (isMobile()) { whatDevice = 'mobile' } else if (isTablet()) { whatDevice = 'tablet' } else { whatDevice = 'desktop' }
      this.props.onDevice(whatDevice)
  }


  componentDidMount() {
      // DEVICE
      this.setDevice()
      /* LANGUGE */
      this.setLanguage(getLanguer())
  }

  render () {

    const {language } = this.props ||{language:'zh'}
    const {is_landscape} = this.props.view_size||{view_size:{is_landscap:false}}

    return (
      <main
       key = {`page-${this.props.id}` }
       >
        <Head>
            <title>{this.props.title[language]}</title>
            {/*meta 不支持重复 property*/}
            <meta content={`ZAI - ${this.props.title[language]}`} name='title' />
            <meta content={`ZAI - ${this.props.title[language]}`} property='og:title' />
            <meta content={`ZAI - ${this.props.title.zh} ${this.props.title[language]} ${this.props.title.en}`} name='description' />
            <meta content={`ZAI - ${this.props.title.zh} ${this.props.title[language]} ${this.props.title.en}`} property='og:description' />
            <meta content={`${this.props.keywords} ZAI,中艺国际, zhongart, firenze, Gallery, arte, 佛罗伦萨 `} name='keywords' />
            <meta content='article' property='og:type' />

            <meta content={`http://www.zhongart.it/news/${this.props.id}`} property='og:url' />

            {/*
            <meta content='//s3.amazonaws.com/所用的图片' property='og:image' />
            */}

            {/*<style dangerouslySetInnerHTML={{ __html: this.props.css }} />*/}

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
          margin:is_landscape?'0 5em 1em 5em':'0 1em 1em 1em',
       })}
      >
        <h1 {
          ...css({
            textAlign:"center",
          })
        }>{this.props.title[language]}</h1>
      </div>
      {/*TITLE*/}


        {/* 头像和描述
        宽屏--横向2列 竖屏--1列 */}

          <div
          {...css({
              // is_landscape
              display:'flex',
              flexDirection:'column',
              margin:is_landscape?'0 5em 15em 5em':'0 1em 15em 1em',

              // transform: `rotate3d(${this.state.tiltx},${this.state.tilty},0,${this.state.degree}deg)`,
              // transition: `transform 1s cubic-bezier(0.1, 0.5, 0.4, 1)`,
            })}
           key= {`${this.props.id}-${this.props.language}`}
           id ='win_scroller'
          >

            {markdown`${()=>this.props.content[language]}`}








          </div>


      <Copyright></Copyright>



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

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(News)
