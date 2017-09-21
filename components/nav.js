import Link from 'next/link'
import {Component} from 'react'
import { css } from 'glamor'
import glamorous from 'glamorous'
import {TimelineMax ,TweenMax} from "gsap";

import {ui  ,GR}  from '../utils/ui'
import ArtistiNav  from './nav.artisti'
import AboutNav  from './nav.about'






// DATA

const CONFIG = [
	{
        'title':{zh:'艺术家',en:'ARTISTS',it:'ARTISTI'},
        'url':'/artisti',
    },{
        'title':{zh:'展览',en:'EXHIBITIONS',it:'MOSTRE'},
        'url':'/mostre',
    },{
        'title':{zh:'新闻',en:'NEWS',it:'EVENTI'},
        'url':'/eventi',
    },{
        'title':{zh:'关于',en:'ABOUT',it:'DI NOI'},
        'url':'/about',
    }
]


/**
 * 放置屏幕底部的梯形
 * @props  {[FLOAT]} width 一般恒定vw
 * @props  {[FLOAT]} height 一般恒定vh
 * @props  {[FLOAT]} top_left 右边向下 --1倾斜度
 * @props  {[FLOAT]} top_left 左边向下 --1倾斜度
 * @props  {[STRING]} color 颜色
 * @return {[component]}       [description]
 */
class _SVG extends Component {
    constructor(props){
        super(props)
        // this._svg
        this._to_pts=this.props.to_pts//中介值(setState/TweenMax){left,right}
        this._onAnimating =false;
        this.state={
            to_pts:this.props.to_pts //初始值
        }

    }
    componentDidMount(){

        // this.setState({to_pts:this.props.to_pts})

    }
    // shouldComponentUpdate(){

    // }

    componentDidUpdate(){//父元素setState ,该元素prpos刷新后
        if (this._onAnimating==true) { return }
        if (this._to_pts.left==this.props.to_pts.left) { return }
        this.animate()
    }

    animate(){


        this._onAnimating = true;
        TweenMax
        .to(this._to_pts,0.6, {
            left:this.props.to_pts.left,
            right:this.props.to_pts.right,
            onUpdate:()=> {this.setState({to_pts:this._to_pts})},
            onComplete:()=> {this._onAnimating =false},
            ease: Power4.easeOut,
        })
    }

    render(){

        return(


            <div
             {...css({
                pointerEvents: 'none',
             })}
            >
                <svg
                 {...css({
                    width:  `${this.props.width}px`,
                    height: `${this.props.height}px`,
                })}>
                    <polygon
                        {...css({
                            width:  `${this.props.width}px`,
                            height: `${this.props.height}px`,
                            pointerEvents:'visiblePainted',//auto 相同svg 禁用了pointerEvents
                        })}
                     fill={this.props.color}
                     stroke="none"
                     points= {
                          `0,${this.state.to_pts.left} `+//left_top
                          `${this.props.width},${this.state.to_pts.right} `+//right_top
                          `${this.props.width},${this.props.height} `+//right_bottom
                          `0,${this.props.height} `//left_bottom
                          }
                     // ref={c => this._svg = c}
                    />
                </svg>
            </div>

        );
    }
}









class Nav extends Component {

	constructor (props) {
      super(props)
      this.state = {
      	isLandscape: this.props.isLandscape,
        vw : this.props.vw,
		vh : this.props.vh,
        _bg_to_pts:{//初始值close

            // left:this.props.vh,
            // right:this.props.vh
            left:0,
            right:0
        },
        // onStatus:this.props.close?'CLOSE':'SHOW',
        show : this.props.show, //供内外共同管理
        onStatus:'CLOSE',
      }
      this._requireChange = false;
      // this._onStatus=this.props.close?'CLOSE':'SHOW'//初始显示状态,判断更新是否与close有关在是否在componentDidUpdate执行操作
    }

    componentDidMount(){

        // debugger
        this.props.show?this.onShow():this.onClose();
    }

    componentDidUpdate(){
        /*
        外props close / show
        内state close /artisti / about / ...
         */

        /*若state(内)更新服从内部更改*/
        if(this._requireChange==true) {
            this._requireChange=false;
            return//直接退出, 忽略下面(外)更改
        }


        /*若props(外)更新与state(内)状态一致,忽略*/
        if(this.state.show == this.props.show) return;
        /*若props(外)更新服从外部*/
        this.props.show==true? this.onShow() :this.onClose()


        // if(this.props.show==true) this.onshow
        // this.setState({show:this.props.show})
    }
    onClose = (e)=>{

        console.log('nav-BG-onClose()')
        if (this.props.show != false ) this._requireChange=true//是否外props触发
        // this.setState({close:true})
        //window.e?window.e.cancelBubble=true:e.stopPropagation();//阻止冒泡
        this.setState({
            _bg_to_pts:{
            left:this.props.vh,
            right:this.props.vh
            },
            show:false,
            onStatus:'CLOSE',//为nav-artisti 判断
        })
        //this.setState({onStatus:'CLOSE'})//为nav-artisti 判断
        TweenMax.to('.nav',0.3,{autoAlpha:0})
        document.body.style.overflow = "auto";


    }

    onShow =(e)=>{

        console.log('nav-BG-onShow()')
        if (this.props.show != true ) this._requireChange=true//是否外props触发

        this.setState({
            _bg_to_pts:{
                left:(GR.px(3,this.props.vh)-this.props.vh)*-1,
                right:(GR.px(4,this.props.vh)-this.props.vh)*-1,
            },
            show:true,
            onStatus:'SHOW',
        })
        // this.setState({onStatus:'SHOW'})

        document.body.style.overflow = "auto";
        console.log('truetruetruetruetrue')
        TweenMax.to('.nav',0.3,{autoAlpha:1})
    }

    onArtisti =(e)=>{
        // this._requireChange=true
        //window.e?window.e.cancelBubble=true:e.stopPropagation();//阻止冒泡
        this.setState({
            _bg_to_pts:{
                left:GR.px(4,this.props.vh),
                right:GR.px(5,this.props.vh)
            },
            onStatus:'ARTISTI',
        })
        // this.setState({onStatus:'ARTISTI'})
        document.body.style.overflow = "hidden";

    }
    onAbout =()=>{
        this._requireChange=true
        this.setState({
            _bg_to_pts:{
                left:GR.px(4,this.props.vh),
                right:GR.px(5,this.props.vh),
            },
            onStatus:'ABOUT',
        })
        document.body.style.overflow = "hidden";
    }

	render(){

		return(
			<div
             {...css({
                position: 'fixed',
                bottom: '0',
                width: '100vw',
                height:'100vh',
                zIndex:9,
                // visibility:this.state.show?'visible':'hidden',
                // pointerEvents: 'none',
             })}
             className = 'nav'

             >




                {/*BACKGROUNF*/}
                <_SVG
                 // isLandscape= {this.props.isLandscape}
                 width = {this.state.vw}
                 height = {this.state.vh}
                 to_pts = {this.state._bg_to_pts}//组件内自动动画
                 color = {ui.color.w_o1}
                />

                {/*CLOSE- BACKGROUNF*/}
                <div
                 {...css({
                    position:'fixed',
                    zIndex:0,
                    top:0,
                    left:0,
                    // backgroundColor:'rgba(0, 0, 0, 0.12)',
                    width:'100vw',
                    height:'100vh',
                    //visibility:this.props.close?'hidden':'visible'

                 })}
                 onClick={this.onClose}
                />

                {/*ARTISTA*/}
                <ArtistiNav
                 vw= {this.state.vw}
                 vh= {this.state.vh}
                 show = {this.state.onStatus=='ARTISTI'}
                 language = {this.props.language}
                />

                <AboutNav
                 vw= {this.state.vw}
                 vh= {this.state.vh}
                 show = {this.state.onStatus=='ABOUT'}
                 language = {this.props.language}
                 marginW = {this.props.marginW}
                 showLogo={this.props.showLogo}
                />


                {/*BUTTONS..*/}
                <div
                 {...css({
                    fontSize:`${GR.vw(7)}vw`,
                    color:ui.color.b_1,
                    pointerEvents: 'auto',//svg 禁用了pointerEvents
                    position:'fixed',
                    display:'flex',
                    flexDirection: 'row',
                    alignItems:'center',
                    justifyContent:'space-around',
                    left: this.props.islandscape? 0:'50%',
                    top: this.props.isLandscape? 0:'100%',
                    transform: this.props.isLandscape? 'translate(0, 0)':'translate(-50%, -100%)' ,
                    width:this.props.isLandscape? 'auto':'100%',
                    // visibility:this.state.close?'hidden':'visible',
                    // backgroundColor:'red',

                 })}

                >
                    {/*ARTISTI*/}
                    <div
                     {...css({
                        paddingTop:`${GR.vw(6)}vw`,
                        paddingBottom:`${GR.vw(6)}vw`,
                        // display:this.props.close?'none':'block'
                    })}
                     onClick = {this.onArtisti}

                    >
                        {CONFIG[0].title[this.props.language]}
                    </div>
                    {/*MOSTRE*/}
                    <div
                     {...css({
                        paddingTop:`${GR.vw(6)}vw`,
                        paddingBottom:`${GR.vw(6)}vw`,
                        // display:this.props.close?'none':'block'
                    })}

                     // onClick = {this.onArtisti}
                    >
                        {CONFIG[1].title[this.props.language]}
                    </div>
                    {/*EVENTI*/}
                    <div
                     {...css({
                        paddingTop:`${GR.vw(6)}vw`,
                        paddingBottom:`${GR.vw(6)}vw`,
                        // display:this.props.close?'none':'block'
                    })}

                     // onClick = {this.onArtisti}
                    >
                        {CONFIG[2].title[this.props.language]}
                    </div>
                    {/*ABOUT*/}
                    <div
                     {...css({
                        paddingTop:`${GR.vw(6)}vw`,
                        paddingBottom:`${GR.vw(6)}vw`,
                        // display:this.props.close?'none':'block'
                    })}
                     onClick = {this.onAbout}

                    >
                        {CONFIG[3].title[this.props.language]}
                    </div>

                </div>


			</div>

		);

	};
};
export default Nav;


/**
 * <Links
                 isLandscape = {this.props.isLandscape}
                 language = {this.props.language}
                />
 */


/**
 *
 *
 * const Links =(props)=>
    <div
     {...css({
        fontSize:`${GR.vw(6)}vw`,
        pointerEvents: 'auto',//svg 禁用了pointerEvents
        position:'fixed',
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-around',
        left: props.isLandscape? 0:'50%',
        top: props.isLandscape? 0:'100%',
        transform: props.isLandscape? 'translate(0, 0)':'translate(-50%, -100%)' ,
        width:props.isLandscape? 'auto':'100%',
     })}
     >

        {
            CONFIG.map((item,index) =>
                <div
                 {...css({
                    position: 'relative',
                    cursor: 'pointer'
                })}
                 key={'Container'+ index}>
                    <Link
                     href= {item.url}
                     key={'link'+ index}
                    >
                        <div{...css({padding:`${GR.rem(6)}rem`})}>
                        {item['title'][`${props.language}`]}
                        </div>
                    </Link>
                </div>
            )
        }

    </div>
 */
/**
 *     animate(){

        TweenMax.to(this._svg,0.8, {
            top_left:  GR.px(5,this.props.vh),
            top_right: GR.px(4,this.props.vh),
            onUpdate:()=>{
             this.setState({top_left:this.top_left})
             this.setState({top_right:this.top_right})
            },
            ease: Linear.easeNone,
        })
 */
