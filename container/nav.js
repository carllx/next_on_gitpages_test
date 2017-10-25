// nav.js
// import Link from 'next/link'
import {PureComponent} from 'react'
import { css } from 'glamor'
import glamorous from 'glamorous'
import {TimelineMax ,TweenMax} from "gsap";

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {ui  ,GR}  from '~/utils/ui'
import SVG_BACKGROUND  from '~/components/nav.bg.svg_SMIL'
import Language  from '~/components/nav.language'
import {BUTTONS}  from '~/components/nav.buttons'
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
class Nav extends PureComponent {

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

          if(this.props.landscape){
            nextProps.is_Scroll_up
            ?this.onPanel('menu')
            :this.onPanel('close');
          }else{
            nextProps.is_Scroll_up
            ?this.onPanel('show')
            :this.onPanel('close');
          }
      }
    }

    onPanel =(next_on)=>{//切换 场景 //artisti,mostre,eventi,about
      //--如果和目前状态不一致才切换

      if (next_on !== this._on) {
        console.log('run onPanel'+next_on)
        this.props.setPanelOn(next_on)
        this._on= next_on
        //--滚动
        // const html = document.getElementsByTagName("html")
        if(next_on=='show'||next_on=='close'||next_on=='menu') {//artisti,mostre,eventi 禁止滚动

          document.body.style.overflow = "auto"
        }else{
          document.body.style.overflow = "hidden"
          }
      }
    }

    render(){
        const { landscape, nav_on, language} = this.props
        return(
            <div
             {...css({
                position: 'fixed',
                bottom: '0',
                width: '100%',
                height:'100%',
                zIndex:9,
                pointerEvents:'none', //避免遮挡Logo点击
                // pointerEvents:nav.on!=='close'?'none':'auto',
                background:`rgba(0,0,0,${nav_on!=='close'&&nav_on!=='show'&&nav_on!=='menu'?0.38:0})`,
                transition:'background 1s cubic-bezier(0, 0.6, 0, 1)',
                willChange:'background',
             })}
             className = 'nav'
             onClick={(e)=>{
              e.stopPropagation();
              e.preventDefault();
              if(landscape){
                nav_on==='menu'?this.onPanel('show'):this.onPanel('close')
              }else{
                this.onPanel('close')
              }

            }}
             /*在close的状态下 结合pointerEvents 和 this.onPanel('close') 点击nav会关闭 nav */
            >
              {/*BACKGROUNF*/}
              <SVG_BACKGROUND/>

              {/*ARTISTA*/}
              <ArtistiNav show={nav_on==='artisti'}/>

              <AboutNav
                show = {nav_on==='about'}
                showLogo={true}
              />

              <Language is_landscape ={landscape}/>
              <BUTTONS
              language={language}
              is_landscape = {landscape}
              show = {nav_on!=='close'&&nav_on!=='menu'}
              foo = {this.onPanel}
              />
            </div>
        );
    };// render
};


const mapStateToProps = (state) => ({
    landscape:state.Root.view_size.is_landscape,
    language:state.Root.language,
    is_Scroll_up:state.Root.scroll.up,
    nav_on:state.nav.on
});

const mapDispatchToProps = (dispatch ) =>{
    return {
        setPanelOn:bindActionCreators(
            setPanelOn, dispatch ),

    }
}



// export default Nav;
export default connect(mapStateToProps,mapDispatchToProps)(Nav)


