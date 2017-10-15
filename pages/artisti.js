import  {PureComponent} from 'react'
// import fetch from 'isomorphic-fetch' //
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { css } from 'glamor'
import {ui  ,GR , makeKEY}  from '~/utils/ui'
import {isMobile  ,isTablet , isLandscape, getLanguer }  from '~/utils/device'
import {setScroll,switchLanguage,setViewSize,onDevice,setBrowser } from'~/reducers/root'

import {throttle, debounce}  from '~/utils/throttle'

import NoSSR from 'react-no-ssr';
import Head from 'next/head'
import AVATAR from '~/components/avatar'
import Nav from '~/container/nav'
import Seczione from '~/components/seczione'
import {initStore} from '~/store'
import Perf from 'react-addons-perf'





class Artisti extends PureComponent {

    static async getInitialProps ({isServer,query}) {
      //es: query :{ id: 'EnzoCucchi' }
      // console.log(jsonPageRes )
      const post = require(`../static/contents/artisti/${query.id}`);
      return { ...post }
    }

    constructor(props){
        super(props)
        // this.handleScrollonY = debounce(this.isScrollUp ,300 );
        this.lazyResize = debounce(this.handleReSize ,300 );
    }
    isScrollUp = ()=>{
        console.log('dddsad')
        if(this._scrollY == this._prevScrollY) return

        if(this._scrollY - this._prevScrollY<=0) {// is up ?
          console.log('↑');
          this.props.setScroll(true)
        }else{
          console.log('↓');
          this.props.setScroll(false)
        }
        // 刷新当前scroll所在位置
        this._prevScrollY = this._scrollY;
      }

      handleScrollonY=()=>{
        this._scrollY = window.scrollY;
        debounce(this.isScrollUp(),300 );

      }

      setLanguage=(language)=>{
        this.props.switchLanguage(language)
      }

      setViewSize=()=>{
        console.info('Resize - setViewSize on redux')
        this.props.setViewSize({
          vh:  window.innerHeight,//window.innerHeight,//document.documentElement.clientHeight,
          vw:  window.innerWidth,//window.innerWidth,//document.documentElement.clientWidth,
          is_landscape:isLandscape()
          })
      }
      setDevice=()=>{
          let whatDevice ;
          if(isMobile()) {whatDevice = 'mobile'}
          else if(isTablet()) {whatDevice = 'tablet'}
          else {whatDevice = 'desktop'}
          this.props.onDevice(whatDevice)
        }



      componentDidMount () {
        window.Perf = Perf
        // LISTENERS
        this._prevScrollY = window.scrollY;
        window.addEventListener('scroll', this.handleScrollonY)
        window.addEventListener('resize', this.lazyResize);

        // DEVICE
        this.setDevice()

        /* LANGUGE */
        this.setLanguage(getLanguer())

        /* VIEW_SIZE */
        console.log(`初始化的VIEWSIZE vh=${this.props.view_size.vh}`)
        if(this.props.view_size.vh===0){
          this.setViewSize()
        }
      }

      componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScrollonY);
        window.removeEventListener('resize', this.lazyResize);
      }

      componentWillUnMount(){
        if (typeof window == 'undefined') return
    //首次访问会出现无法识别windows
        window.removeEventListener('scroll', this.handleScrollonY)
        window.removeEventListener('resize', this.lazyResize)
      }

    render () {

    const {language } = this.props ||{language:'zh'}
    const {vw,vh,is_landscape} = this.props.view_size||{view_size:{vw:0,vh:0,is_landscap:false}}
    const MarginW = `${is_landscape?GR.vw(3):GR.vw(5)}vw`

    // debugger
    return (
      <main
      key = {`page-${this.props.id}-${language}` }
       >
        <Head>
            <title>{this.props.name[language]}</title>
            {/*meta 不支持重复 property*/}
            <meta content={`ZAI - ${this.props.name[language]}`} name='title' />
            <meta content={`ZAI - ${this.props.name[language]}`} property='og:title' />
            <meta content={`ZAI - ${this.props.description.zh} ${this.props.description[language]} ${this.props.description.en}`} name='description' />
            <meta content={`ZAI - ${this.props.description.zh} ${this.props.description[language]} ${this.props.description.en}`} property='og:description' />
            <meta content={`${this.props.keywords} ZAI, zhongart internationale, Gallery, arte,中艺国际, 佛罗伦萨 `} name='keywords' />
            <meta content='article' property='og:type' />

            <meta content={`http://www.zhongart.it/artisti/${this.props.name[language]}`} property='og:url' />

            {/*
            <meta content='//s3.amazonaws.com/所用的图片' property='og:image' />
            */}

            {/*<style dangerouslySetInnerHTML={{ __html: this.props.css }} />*/}

        </Head>


      {/* 头像和描述
      宽屏--横向2列 竖屏--1列 */}

        <NoSSR>
        <div
        {...css({
            // is_landscape
            display:'flex',
            flexDirection:is_landscape?'row':'column',
            alignItems:is_landscape?'flex-start':'left',// iphone
            marginLeft: is_landscape?`${GR.vw(4)}vw`:MarginW,
            marginRight: is_landscape?`${GR.vw(1)}vh`:MarginW,
            marginTop: `${is_landscape?GR.vw(7):GR.vw(6)}vw`,
            marginBottom: is_landscape?`${GR.vw(7)}vh`:`${GR.vw(7)}vw`,
        })}
        >
            {/* 头像 */}
            <div
             {...css({
                // height:`inherit`,
                width:`${is_landscape?GR.px(4,vw):GR.px(1,vw)}px`,
                height:`${is_landscape?GR.px(4,vw):GR.px(1,vw)}px`,
                marginBottom:`${is_landscape?0:GR.vw(6)}vw`
             })}
            >
                <AVATAR
                 src = {this.props.avatar}
                 SizeWidth = {is_landscape?GR.px(4,vw):GR.px(1,vw)}
                 name = {this.props.name[language]}
                 />
            </div>

            {/*描述 DESCRIPTION*/}
            <div
             {...css({
                fontSize:is_landscape?`${GR.px(5,this.props.SizeWidth)}px`:`1rem`,
                fontWeight:100,
                marginLeft: is_landscape?`${GR.vw(7)}vw`:0,
             })}
            >
                {
                    this.props.description[language]
                    .split('\n')
                    .map((item, key) =>
                        <span key={key}>{item}<br/></span>
                    )
                }
            </div>

        </div>
        </NoSSR>



        {/* MENUS-section */}

        {/*EVENTS*/}
        <NoSSR>
        <Seczione
         items = {this.props.events}
         language = {language}
         name = {'EVENTS'}
         color = {ui.color.w_1}
         vw = {vw}
         marginW = {MarginW}
         is_landscape={is_landscape}
         z= {9}
        />
        </NoSSR>

        {/*EXHIBITIONS*/}
        <NoSSR>
        <Seczione
         items ={this.props.exhibitions}
         language = {language}
         name = {'EXHIBITIONS'}
         color={ui.color.w_1}
         vw = {vw}
         marginW = {MarginW}
         is_landscape={is_landscape}
         z= {8}
        />
        </NoSSR>


        {/*WORKS*/}
        <NoSSR>
        <Seczione
         items ={this.props.works}
         language = {language}
         name = {'WORKS'}
         color={ui.color.w_1}
         vw = {vw}
         marginW = {MarginW}
         is_landscape={is_landscape}
         z= {7}
        />
        </NoSSR>



        {/*保证section最后一项在窗口上方*/}
        <div
         {...css({
            position: 'relative',
            bottom: '0',
            height:`${GR.px(3,vh)}px`,
         })}
        ></div>

        <NoSSR>
            <Nav show_on_init = {!is_landscape}/>
        </NoSSR>
      </main>
      )
}
 }





const mapStateToProps = (state) => ({
    view_size:state.Root.view_size,
    // device:state.Root.device,
    language:state.Root.language,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // root
    switchLanguage: bindActionCreators(switchLanguage, dispatch),
    setScroll: bindActionCreators(setScroll, dispatch),
    setViewSize: bindActionCreators(setViewSize, dispatch),
    onDevice: bindActionCreators(onDevice, dispatch),
    setBrowser: bindActionCreators(setBrowser, dispatch),

  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Artisti)
