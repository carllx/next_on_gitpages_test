import { Component } from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-fetch'
import { css  } from 'glamor'
import glamorous from 'glamorous'
import {ThemeProvider} from 'glamorous'
import NoSSR from 'react-no-ssr';

import Post from '../components/post'
import Nav from '../components/nav'
import LOGO from '../components/logo.svg'
import {ThreeInit} from'../components/section.welcome.THREE.sphere.js'

import {isMobile  ,isTablet , isLandscape, getLanguer }  from '../utils/device'
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
    //(); 点击链接跳转回复制已定义的样式
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
        <Head>
          <title>{'ZAI,中艺国际'}</title>
          <meta content={`ZAI,中艺国际,zhongart internationale`} name='title' />
            <meta content={`ZAI,中艺国际,zhongart internationale`} property='og:title' />
            <meta content={`中艺国际是一个致力于在意大利传播中国艺术文化的现实：我们的目标是让我们的传播者介绍中国传统和现代的艺术和文化，促进他们在意大利得到适当的赞赏。另一方面，我们在中国实现同样的目标，在两个地理遥远的国家之间的交流与互惠的逻辑，但接近精神`} name='description' />
            <meta content={`中艺国际是一个致力于在意大利传播中国艺术文化的现实：我们的目标是让我们的传播者介绍中国传统和现代的艺术和文化，促进他们在意大利得到适当的赞赏。另一方面，我们在中国实现同样的目标，在两个地理遥远的国家之间的交流与互惠的逻辑，但接近精神`} property='og:description' />
            <meta content={`ZAI,中艺国际,zhongart internationale,意大利,佛罗伦萨,firenze,arte,Gallery`} name='keywords' />
        </Head>


        {/*服务器初始内容*/}
        <NoSSR onSSR={ <h1>{'ZAI中艺国际'}</h1>}>
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
             marginLeft:`${GR.vw(6)}vw`,
             marginTop:`${GR.vw(6)}vw`,
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

