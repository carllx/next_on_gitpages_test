import { Component } from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-fetch'
import { css } from 'glamor'
import glamorous from 'glamorous'
import {ThemeProvider} from 'glamorous'
import NoSSR from 'react-no-ssr';

import Post from '../components/post'
import Nav from '../components/nav'
import {IMG} from '../components/img'
import Logo from '../components/logo'
// import TT from '../components/TP'

import {isMobile  ,isTablet , isLandscape, getLanguer, setREM }  from '../utils/device'
import {throttle, debounce}  from '../utils/throttle'

import {ui}  from '../utils/ui'

/**
 * [fontSize description]
 * @type {String}
 */
css.global(

  'html, body', {
    fontSize: '100%',
    color:ui.color.secondary_on_light,
  },
)
/**
 * [color description]
 * @type {[type]}
 */
css.global(

  'h1,h2,h3',{
    color:ui.color.primary_on_light,
  }
)



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
        language: '',
        h:'',
        w:'',

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

    this.setState({h : window.innerHeight})
    this.setState({w : window.innerWidth})
    console.log('resize!')

  };


  componentWillMount(){

    if (typeof window == 'undefined') return;
    setREM();
    window.removeEventListener('scroll', this.onScorll, false);
    window.removeEventListener('resize', this.onReSize);

  }

  // componentWillUnmount(){
  //   window.removeEventListener('scroll', this.onScorll, false);
  //   window.removeEventListener('resize', this.onReSize);
  // }


  componentDidMount(){

    window.addEventListener('scroll', this.onScorll, false)
    window.addEventListener('resize', this.onReSize );

    // SCROLL
    this.prevScrollY = window.scrollY;

    // 检测移动硬件
    if (typeof navigator === 'undefined') {
      console.log(this.state)
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
    this.setState({h : window.innerHeight})
    this.setState({w : window.innerWidth})

    // const screen= window.orientation||window.screen.orientation.angle
    // if(window.screen.orientation.angle!==undefined ){
    //   console.log(
    //                 '方向:   ',screen.orientation,
    //                 '\n高度: ',window.innerHeight,
    //                 '\n宽度: ',window.innerWidth
    //                 );
    // }


  }


  render () {
    return (
      <main >
        <Head>
          <title>中艺国际</title>
        </Head>

        <NoSSR>
            <Logo
             device={this.state.device}
             isLandscape = {this.state.isLandscape}
             color={ui.color.primary_on_dark}
             bg_color={ui.color.secondary}
            />
        </NoSSR>

        <NoSSR onSSR={<h2>中艺国际</h2>}>
          <Nav
           device= {this.state.device}
           isLandscape={this.state.isLandscape}
           language= {this.state.language}/>
        </NoSSR>

        <NoSSR>
          <IMG
           w={this.state.w}
           h={this.state.h}
           org={'v1502792912/00_Tempio_Malatestiano_gwfwy4.jpg'}
           active={'true'}
           />
        </NoSSR>

        <content onScroll={this.handleScroll}>
          <glamorous.Div
           fontSize='0.25rem'
           margin='10em 0.8em 0 0.8em'>

            <glamorous.Div
             display='flex'
             alignItems='center'
             justifyContent='center'
             width='100%'
             height='38em'>
              We are comming...
            </glamorous.Div>

            <h2>设计特色</h2>
            <glamorous.Span color='#717171'>更新于2017-8-16</glamorous.Span>
            <h3>Z + AI</h3>
            <p>{`
              ZAI is alive, 每个网页元素 (例如"按钮,图片卡,导航栏,Logo"), 分别视为有生命的独立元素. 它们不只是存在, 更是活着的.\n
              Z + AI 的实现思路是为元素注入AI特性,强化每个元素各自的个性,改进与用户交互的反应.
              \r\n该特性是我们的长期目标,将在网站第二期工程由ZAI团队共同设计.`}</p>

            <h3>NULL DESIGN</h3>
            <p>{`纸张的空能召唤创造者的灵感,当它载满灵感的时候也是他最有价值的, 因此我们网站设计将特别关注空白的地方`}</p>

            <h3>感应式布局</h3>
            <p>{`我们关心你会在什么场合,使用什么新设备访问我们, 不论你们在使用电脑 / 手机 / 平板 / 网络TV,
              或者你的设备90度/180度,我们都会考虑到,我们会分别为你定义不一样的网页布局
              `}</p>

            <h3>流量节约</h3>
            <p>{`我们知道你们的访问是有代价, 所以我们在设计一套流量节制系统,
              例如当你的访问涉及图片内容时,我们会先根据你的设备先定制合适的像素,再发送到你的设备上.
              你屏幕以外的图片,我们是不会让它占用你们的流量,尽管它就在一个页面内,
              它们只有在你需要的时候我们才会传送给你.`}</p>
            <h3>硬件检测</h3>
            <span>为感应式布局,根据用户访问设备,电脑 / 手机 / 平板 ,及这些设备的横屏和竖屏定义合适的网页布局,</span>
            <span>识别你的设备是 <glamorous.Span color='#d14'>{ /*this.state.device*/}</glamorous.Span></span>
            <h3>ZAI further away(渐行渐远)</h3>
            <p>{`我们非常在乎你未来的浏览方式,对已经成为主流的技术/方式, 我们会不惜进行改造,就如我们不会为求选用已经发展成熟的
              wordpress框架制作我们的网站,尽管它更简单和更有效率. 我们分析未来趋向,不惜花费大量的学习/排错成本,
              探索2017+最新的框架和开发语言, 所以我们可以不断为你提供最新的服务和更多的可能性`}</p>



            <h2>Change Log 网站进度</h2>



            <h3>2017-8-16</h3>
            <p>把项目托管至git</p>
            <p>尝试修复git log中文现实问题</p>

            <h3>2017-8-11</h3>
            <p>开始dpr检测脚本, 为iphone,mac等苹果的 retina屏幕匹配, </p>
            <p>脚本尝试加入根据dpr,自动定义fontsize的逻辑,为实现以rem和em字体单位定义排版</p>
            <p></p>

            <h3>2017-8-15</h3>
            <p>试用构建图片自动裁剪系统,于服务器中</p>


            <h3>2017-8-14</h3>
            <p>规范化网站颜色,分为Primary,Secondary,字体分别在深/浅颜色背景各定义三级透明度89%,55%30%</p>


            <h3>2017-8-13</h3>
            <p>尝试调试微信端不支持Object.assign(未解决)</p>



            <h3>2017-8-12</h3>
            <p>修复Link不能跳转到指定网页的问题</p>
            <p>dpr检测脚本完成</p>


            <h3>2017-8-10</h3>
            <p>参考Aframe框架,device.js 将原来的函数式方程重新改写成组建管理模式</p>
            <p>忽略原来对TV的识别(暂时不需要) </p>
            <p></p>

            <h3>2017-8-9</h3>
            <p>修复Nav 组件, 用glamorous对Nav做初步样式 </p>
            <p></p>
            <p></p>


            <h3>2017-8-8</h3>
            <p>引入device.js 硬件检测脚本</p>
            <p>/艺术家 carta组件样式改动</p>


            <h3>Sat Jul 29 00:21:57 2017 +0200</h3>
            <p>添加.nojekyll,尝试修复js请求失败</p>
            <h3>Tue Jul 25 12:42:45 2017 +0200</h3>
            <p>第一次递交</p>
            <p></p>
          </glamorous.Div>
        </content>

      </main>

    )
  }

}

//<section>
//  {this.props.postList.map(post => <Post {...post} key={post.id} />)}
//</section>

