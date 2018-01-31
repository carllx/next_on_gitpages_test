// nav.js
// import Link from 'next/link'
import {PureComponent} from 'react'
import { css } from 'glamor'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {ui }  from '~/utils/ui'
import SVG_BACKGROUND  from '~/components/nav.bg.svg_SMIL'
import Language  from '~/components/nav.language'
import {BUTTONS}  from '~/components/nav.buttons'
import ArtistiNav  from '~/components/nav.artisti'
import ContactNav  from '~/components/nav.contact'
import Info  from '~/components/info'

import { setPanelOn } from '~/reducers/nav'

class Triangle extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        const size = this.props.size
        return(
            <svg
             {...css({
                width:size,
                position:'absolute'
             })}
             viewBox= {`0 0 1 1`}
            >
                <polygon
                 fill={ui.color.w_o2}
                 stroke="none"
                 points={
                    `0,0 `+//left_top
                    `1,0 `+//right_top
                    `0,1 `//right_bottom
                }
                />
            </svg>
        )
    }
}

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
      this.PERSP = 1000;

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
      //console.log(`next_on:\t${next_on}\nthis._on:\t${this._on}\nthis.props.nav_on:\t${this.props.nav_on}`)
      // debugger
      if (next_on !== this.props.nav_on) {

        console.log('switch to Panel '+next_on)
        this.props.setPanelOn(next_on)
      }
    }

    render(){
        const { landscape, nav_on, language} = this.props;

        return(
            <div
             {...css({
                position: 'fixed',
                bottom: '0',
                width: '100%',
                height:'100%',
                zIndex:20,
                pointerEvents:'none', //避免遮挡Logo点击
                // pointerEvents:nav.on!=='close'?'none':'auto',
                background:`rgba(0,0,0,${nav_on!=='close'&&nav_on!=='show'?0.38:0})`,
                transition:'background 1s cubic-bezier(0, 0.6, 0, 1)',
                willChange:'background',

                perspective: '1000px',//@parallax
                perspectiveOrigin: '50% 50%',//@parallax left,top
                overflowX: 'hidden',//@parallax
                overflowY: 'hidden',//@parallax

             })}
             className = 'nav'
             id='nav'
             onClick={(e)=>{
              e.preventDefault();
              e.stopPropagation();
              // if(landscape){
              //   nav_on==='menu'?this.onPanel('show'):this.onPanel('close')
              // }else{
              //   this.onPanel('close')
              // }

            }}
             /*在close的状态下 结合pointerEvents 和 this.onPanel('close') 点击nav会关闭 nav */
            >
              {/*BACKGROUNF*/}
              <SVG_BACKGROUND/>

              {/*ARTISTA*/}
              <ArtistiNav/>
              {/*CONTACT*/}
              <ContactNav />
              {/*语言切换*/}
              <Language is_landscape ={landscape}/>

              {/*Sorry Comming*/}
              { nav_on === 'news'||nav_on === 'mostre'?
                <div
                 {...css({
                    display: 'flex',
                    position:'fixed',
                    top:0,
                    left:0,
                    justifyContent:'center',
                    alignItems:'center',
                    width: '100vw',
                    height:'100vh',
                    zIndex:9,
                    pointerEvents:'none', //避免遮挡Logo点击
                    overflow: 'hidden',//@parallax
                 })}
                >

                  <Info
                   contents = {'Coming soon ...'}
                   backgroundColor = {ui.color.b_o2}
                   contentColor = {ui.color.w_o1}
                  />

                </div>
                :
                null
              }

              {/*艺术家,新闻,关于,*/}
              <BUTTONS
              language = {language}
              is_landscape = {landscape}
              show = {nav_on!=='close'}
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
    nav_on:state.nav.on,

});

const mapDispatchToProps = (dispatch ) =>{
    return {
        setPanelOn:bindActionCreators(
            setPanelOn, dispatch ),

    }
}



// export default Nav;
export default connect(mapStateToProps,mapDispatchToProps)(Nav)


