// nav.js
// import Link from 'next/link'
import {Component} from 'react'
import { css } from 'glamor'
import glamorous from 'glamorous'
import {TimelineMax ,TweenMax} from "gsap";

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {ui  ,GR}  from '~/utils/ui'
import SVG_BACKGROUND  from './components/nav.bg.svg'
import {BUTTONS}  from './components/nav.buttons'
import ArtistiNav  from './nav.artisti'
import AboutNav  from './nav.about'


import { setPanelOn } from '~/reducers/nav'

// // DATA
const CONFIG = [{
        'title':{zh:'艺术家',en:'ARTISTS',it:'ARTISTI'},
        'id':'artisti',
    },{
        'title':{zh:'展览',en:'EXHIBITIONS',it:'MOSTRE'},
        'id':'mostre',
    },{
        'title':{zh:'新闻',en:'NEWS',it:'EVENTI'},
        'id':'eventi',
    },{
        'title':{zh:'关于',en:'ABOUT',it:'DI NOI'},
        'id':'about',
    }
]



/**
 * NAV 组件
 * @props  {[FLOAT]} show_on_init 初始时是否显示?
 * @props  {[FLOAT]} height 一般恒定vh
 * @props  {[FLOAT]} pts.pt_1 (mobile)右↓||(landscape)上→ --1倾斜度
 * @props  {[FLOAT]} pts.pt_2 (mobile)左↓||(landscape)上→ --1倾斜度
 * @props  {[STRING]} color 颜色
 * @return {[component]}
 */
class Nav extends Component {

    constructor (props) {
      super(props)
      //this._onAnimating =false;//避免tweening时重叠tweening
      // this._on = this.props.show_on_init?'show':'close'
    }
// NAV_BG_ST
    componentDidMount(){
        this.props.show_on_init?this.onPanel('show'):this.onPanel('close');
    }

    componentWillReceiveProps(nextProps){
      /*若props(外)更新服从外部*/
      // debugger
      if(nextProps.is_Scroll_up!==this.props.is_Scroll_up){
          nextProps.is_Scroll_up
          ?this.onPanel('show')
          :this.onPanel('close');
      }
    }

    onPanel =(next_on)=>{//切换 场景 //artisti,mostre,eventi,about
      //--如果和目前状态不一致才切换

      if (next_on !== this._on) {
        console.log('run onPanel'+next_on)
        this.props.setPanelOn(next_on)
        this._on= next_on
        //--滚动
        if(next_on=='show'||next_on=='close') {//artisti,mostre,eventi 禁止滚动
          document.body.style.overflow = "auto"}else{
          document.body.style.overflow = "hidden"
          }
      }
    }

    render(){
        const { view_size, nav, language, islandscape } = this.props
        return(
            <div
             {...css({
                position: 'fixed',
                bottom: '0',
                width: '100vw',
                height:'100vh',
                zIndex:9,
                pointerEvents:'none', //避免遮挡Logo点击
                // pointerEvents:nav.on!=='close'?'none':'auto',
                // opacity:nav.on!=='close'?1:0,
             })}
             className = 'nav'
             onClick={()=>{this.onPanel('close')}}
             /*在close的状态下 结合pointerEvents 和 this.onPanel('close') 点击nav会关闭 nav */
            >
              {/*BACKGROUNF*/}
              <SVG_BACKGROUND/>

              {/*ARTISTA*/}
              <ArtistiNav
               show = {nav.on=='artisti'}
               // closeNavFunc = {()=>{this.onPanel('close')}}
              />

              <AboutNav
                show = {nav.on=='about'}
                showLogo={true}
              />

              <BUTTONS
              language={language}
              is_landscape = {view_size.is_landscape}
              show = {nav.on!=='close'}
              foo = {this.onPanel}
              />
            </div>
        );
    };// render
};


const mapStateToProps = (state) => ({
    view_size:state.Root.view_size,
    device:state.Root.device,
    language:state.Root.language,
    is_Scroll_up:state.Root.is_Scroll_up,
    nav:state.nav
});

const mapDispatchToProps = (dispatch ) =>{
    return {
        setPanelOn:bindActionCreators(
            setPanelOn, dispatch )
    }
}



// export default Nav;
export default connect(mapStateToProps,mapDispatchToProps)(Nav)


