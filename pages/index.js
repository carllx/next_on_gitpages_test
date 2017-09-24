import { Component } from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-fetch'
import { css  } from 'glamor'
import glamorous from 'glamorous'
import {ThemeProvider} from 'glamorous'
import NoSSR from 'react-no-ssr';

import Post from '../components/post'
// import {SectionWelcome} from '../components/section.welcome'
import Nav from '../components/nav'
// import {IMG} from '../components/img'
import LOGO from '../components/logo.svg'
// import {changelog,Concept} from '../components/changelog'
import {ThreeInit} from'../components/section.welcome.THREE.sphere.js'

import {isMobile  ,isTablet , isLandscape, getLanguer,setREM }  from '../utils/device'
import {throttle, debounce}  from '../utils/throttle'

import {ui ,GR }  from '../utils/ui'
/**
 * [fontSize description]
 * @type {String}
 */

/**
 * [color description]
 * @type {[type]}
 */
// css.global(

//   'h1,h2,h4',{
//     color:ui.color.primary_on_light,
//   }
// )


export default class extends Component {

  constructor (props) {
      super(props)

      this.state = {
        /*
        device   : desktop / moblie / tablet    --2.
        direction: portrait / landscape
        OS       : android / ios / windows / blackberry   --1.
        browser  : chrome /  firefox / safari / IE / wechat /
        language : cn / en / it
        */
        device: '',
        isLandscape: '',
        language: 'en',
        vw:'',
        vh:'',

       }
       this.onScorll = debounce(this.handleScroll ,500 );
       this.onReSize = debounce(this.handleReSize ,500 );
    }

  // };
  // shouldComponentUpdate(){
  //   return false
  // }
  handleScroll=()=>{

    const ScrollY = window.scrollY;
    //  ↑ or ↓ ???
    const isScrollUp = ( ScrollY - this.prevScrollY)<=0 ;

    if(isScrollUp) {
      console.log('↑');
    }else{
      console.log('↓');
    }
    // 刷新当前scroll所在位置
    this.prevScrollY = ScrollY;

   };


  handleReSize=()=>{
    console.info('onResize -in Page index.js-handleReSize')
    this.setState({vh : screen.height})
    this.setState({vw : screen.width})
  };


  componentWillMount(){

    if (typeof window == 'undefined') return;
    // setREM(); 点击链接跳转回复制已定义的样式
    window.removeEventListener('scroll', this.onScorll, false);
    window.removeEventListener('resize', this.onReSize);

  }


  componentWillUnMount(){
    window.removeEventListener('scroll', this.onScorll)
    window.removeEventListener('resize', this.onScorll)
  }


  componentDidMount(){

    window.addEventListener('scroll', this.onScorll, false)
    window.addEventListener('resize', this.onReSize );

    // SCROLL
    this.prevScrollY = window.scrollY;

     // 检测移动硬件 还是 server端
    if (typeof navigator === 'undefined') {
      console.error( '检测移动硬件 \ntypeof navigator === undefined\n this.state:'+ this.state)
      return;
    }
    // device
    if(isMobile()==true){//isMobile
      this.setState({device : 'isMobile'})
    }else if (isTablet()==true){
      this.setState({device : 'isTablet'})
    }else{
      this.setState({device : 'isDesktop'})
    };
    // direction
    this.setState({isLandscape : (isLandscape()?true:false) })
    // language
    this.setState({language : getLanguer()})

    // height width
    this.setState({vh : screen.height})
    this.setState({vw : screen.width})

    ThreeInit();

  }


  render () {
    return (
      <main >
        <Head></Head>


        {/*服务器初始内容*/}
        <NoSSR onSSR={ <ABS>{'服务器'}</ABS>}>
          <ABS>{'客户端'}</ABS>
        </NoSSR>



        {/*<SectionWelcome
         width = {this.state.width}
         height= {this.state.height}
         isLandscape = {this.state.isLandscape}
         />*/}


         <canvas
          {...css({position:'absolute',top:0,left:0})}
          id = "scene"
          width = {this.state.vw}
          height = {this.state.vh}/>



        {/*LOGO*/}
        <div
         {...css({
            /*居中*/
             position:'relative',
             width: `${GR.vw(1)}vw`,//暂时
        })}
        >
            <LOGO/>
        </div>

        <NoSSR>
        <Nav
         vw = {this.state.vw}
         vh = {this.state.vh}
         isLandscape={this.state.isLandscape}
         language= {this.state.language}
         show ={true}
         marginW = {GR.vw(5)}
         showLogo ={false}
        />
        </NoSSR>


      </main>



    )
  }

}

const ABS = (props)=>
   <div
    {...css({
         position:'absolute',
         zIndex:-1,
    })}
    >
        {props.children}
    </div>

