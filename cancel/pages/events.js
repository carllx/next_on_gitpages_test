//没有引用

import {PureComponent} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";//upgrade -- import withRedux from "next-redux-wrapper";
import {css} from 'glamor'
import NoSSR from 'react-no-ssr';
import Head from 'next/head'
import {ui  ,GR , makeKEY , perspZ}  from 'utils/ui'
import {isMobile  ,isTablet , getLanguer}  from 'utils/device'
import {TweenLite} from "gsap";
import {switchLanguage,onDevice} from'reducers/root'

import Scroller from 'components/controller.scroll'
import Resizer from 'components/controller.resize'
import AVATAR from 'components/avatar'
import Nav from 'components/nav'
import Seczione from 'components/section'
import {initStore} from 'store'
import  debounce  from 'lodash/debounce'

class Artisti extends PureComponent {

  static async getInitialProps({ isServer, query }) {
      //es: query :{ id: 'EnzoCucchi' }
      // console.log(jsonPageRes )
      const post = require(`../static/contents/artisti/${query.id}`);
      return { ...post }
  }

  constructor(props) {
    super(props)
    this.PERSP = 1000;
    this.Zp = {
          pc:{
              biography: perspZ(-5,this.PERSP),
              selectTexts: perspZ(-5,this.PERSP),
              news: perspZ(-5,this.PERSP),
              exhibitions: perspZ(-5,this.PERSP),
              works: perspZ(-5,this.PERSP),
          },
          mobile:{
              biography: perspZ(-5,this.PERSP),
              selectTexts: perspZ(-5,this.PERSP),
              news: perspZ(-5,this.PERSP),
              exhibitions: perspZ(-5,this.PERSP),
              works: perspZ(-5,this.PERSP),
          }
      }
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
    const {vw,vh,is_landscape} = this.props.view_size||{view_size:{vw:0,vh:0,is_landscap:false}}

    const zp = is_landscape?this.Zp.pc:this.Zp.mobile
    const MarginW = `${is_landscape?GR.vw(3):GR.vw(5)}vw`

    return (
      <main
      key = {`page-${this.props.id}` }
       >
        <Head>
            <title>{this.props.name[language]}</title>
            {/*meta 不支持重复 property*/}
            <meta content={`ZAI - ${this.props.name[language]}`} name='title' />
            <meta content={`ZAI - ${this.props.name[language]}`} property='og:title' />
            <meta content={`ZAI - ${this.props.biography.zh} ${this.props.biography[language]} ${this.props.biography.en}`} name='biography' />
            <meta content={`ZAI - ${this.props.biography.zh} ${this.props.biography[language]} ${this.props.biography.en}`} property='og:biography' />
            <meta content={`${this.props.keywords} ZAI, zhongart internationale, Gallery, arte,中艺国际, 佛罗伦萨 `} name='keywords' />
            <meta content='article' property='og:type' />

            <meta content={`http://www.zhongart.it/artisti/${this.props.name[language]}`} property='og:url' />

            {/*
            <meta content='//s3.amazonaws.com/所用的图片' property='og:image' />
            */}

            {/*<style dangerouslySetInnerHTML={{ __html: this.props.css }} />*/}

        </Head>



      {/*3D Parallax*/}
      <div
       {...css({
          position: '-webkit-sticky',// @safari
          height: '100vh',//@parallax
          overflowX: 'hidden',//@parallax
          overflowY: 'auto',//@parallax
          perspective: '1000px',//@parallax
          perspectiveOrigin: '50% 50%',//@parallax left,top
          'WebkitOverflowScrolling': 'touch',// @safari
          backfaceVisibility: 'hidden',// @parallax防止闪烁(flicker)
          /*TEST*/
          // transform: `rotate3d(0,1,0,<40></40>deg)`,
       })}
       // ref= {c=>this._$win = c}
       // onMouseMove = {(e)=>{this.onMouse(e)}}
       id ='win_scroller'
       >


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
              transformStyle: 'preserve-3d',//@parallax
              // transform: `rotate3d(${this.state.tiltx},${this.state.tilty},0,${this.state.degree}deg)`,
              // transition: `transform 1s cubic-bezier(0.1, 0.5, 0.4, 1)`,
            })}
           id ='roll'
          >
              {/* 头像 */}
              <div
               {...css({
                  // height:`inherit`,
                  width:`${is_landscape?GR.px(4,vw):GR.px(1,vw)}px`,
                  height:`${is_landscape?GR.px(4,vw):GR.px(1,vw)}px`,
                  marginBottom:`${is_landscape?0:GR.vw(6)}vw`,
                  transform: 'translateZ(0.1px) scale(0.9666666666666667)',//@parallax
                  transformStyle: 'preserve-3d',//@parallax
                  backfaceVisibility: 'hidden',//防止闪烁(flicker)
               })}
              >
                  <AVATAR
                   src = {this.props.avatar}
                   SizeWidth = {is_landscape?GR.px(4,vw):GR.px(1,vw)}
                   name = {this.props.name[language]}
                   />
              </div>




              {/* TAB-SECTION */}

              {/*描述 BIOGRAPHY*/}
              <div
               {...css({
                  fontSize:is_landscape?`${GR.vw(9)}vw`:`1rem`,
                  fontWeight:100,
                  marginLeft: is_landscape?`${GR.vw(7)}vw`:0,
                  transform:is_landscape?
                    `translateZ(${zp.biography.translateZ}px) scale(${zp.biography.scale})`:
                    `translateZ(${zp.biography.translateZ}px) scale(${zp.biography.scale})`,//@parallax
                  backfaceVisibility: 'hidden',//防止闪烁(flicker)

               })}
              >
                  {
                      this.props.biography[language]
                      .split('\n')
                      .map((item, key) =>
                          <span key={key}>{item}<br/></span>
                      )
                  }
              </div>

          </div>
          </NoSSR>

          {/*WORKS*/}
          <NoSSR>
          <Seczione
           items ={this.props.works}
           name = {'WORKS'}
           color={ui.color.w_1}
           marginW = {MarginW}
           zPos= {zp.works}
           testColor = {'rgb(255,200,128)'}

          />
          </NoSSR>

          {/*SELECT TEXTS*/}
          <NoSSR>
          <Seczione
           items ={this.props.selectTexts}
           name = {'SELECT TEXTS'}
           color={ui.color.w_1}
           marginW = {MarginW}
           zPos= {zp.selectTexts}
           testColor = {'rgb(255,130,128)'}
          />
          </NoSSR>

          {/*EXHIBITIONS*/}
          <NoSSR>
          <Seczione
           items ={this.props.exhibitions}
           name = {'EXHIBITIONS'}
           color={ui.color.w_1}
           marginW = {MarginW}
           zPos= {zp.exhibitions}
           testColor = {'rgb(255,130,128)'}

          />
          </NoSSR>



          {/*NEWS*/}
          <NoSSR>
          <Seczione
           items = {this.props.news}
           artista = {this.props.name[language]}
           name = {'NEWS'}
           color = {ui.color.w_1}
           marginW = {MarginW}
           zPos= {zp.news}
           testColor = {'rgb(255,10,128)'}

          />
          </NoSSR>






          {/*保证section最后一项在窗口上方*/}
          <div
           {...css({
              position: 'relative',
              bottom: '0',
              height:`${vh/3}px`,
           })}
          ></div>


        </div>{/*3D Parallax*/}




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

    // device:state.Root.device,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // root
    switchLanguage: bindActionCreators(switchLanguage, dispatch),
    onDevice: bindActionCreators(onDevice, dispatch),
    // setBrowser: bindActionCreators(setBrowser, dispatch),
  }
}

// export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Artisti)
export default connect( mapStateToProps, mapDispatchToProps)(Artisti);
