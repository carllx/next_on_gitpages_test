import  {Component} from 'react'
// import Link from 'next/link'
// import fetch from 'isomorphic-fetch'
import Head from 'next/head'
import { css } from 'glamor'

import {ui  ,GR , makeKEY}  from '../utils/ui'
import {isMobile  ,isTablet , isLandscape, getLanguer }  from '../utils/device'
import {throttle, debounce}  from '../utils/throttle'

import NoSSR from 'react-no-ssr';
import AVATAR from '../components/avatar'
import Nav from '../components/nav'
import Seczione from '../components/seczione'





export default class extends Component {

    static async getInitialProps ({ query}) {
      //es: query :{ id: 'EnzoCucchi' }
      // console.log(jsonPageRes )
      const post = require(`../static/contents/artisti/${query.id}`);
      return { ...post }
    }

    constructor(props){
        super(props)
        this.state = {
        /*
        device   : desktop / moblie / tablet    --2.
        direction: portrait / landscape
        OS       : android / ios / windows / blackberry   --1.
        browser  : chrome /  firefox / safari / IE / wechat /
        language : zh / en / it
        */
        device: '',
        isLandscape: '',
        language: 'en',
        scrolledUp:'',

       }
       this.onScorll = debounce(this.handleScroll ,500 );
       this.onReSize = debounce(this.handleReSize ,500 );

       this._keyCtx=makeKEY()


    }

      handleScroll=()=>{

        const ScrollY = window.scrollY;
        //  ↑ or ↓ ???
        const isScrollUp = ( ScrollY - this.prevScrollY)<0 ;

        if(isScrollUp) {
          console.log('↑');
          this.setState({scrolledUp:true})
        }else{
          console.log('↓');
          this.setState({scrolledUp:false})
        }
        // 刷新当前scroll所在位置
        this.prevScrollY = ScrollY;

    };


    handleReSize=()=>{
    console.info('onResize -in Page artisti.js-handleReSize')
    this.setState({vh : screen.height})
    this.setState({vw : screen.width})

    };

    componentWillMount(){

        if (typeof window == 'undefined') return;

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
        if (typeof navigator === 'undefined') {}

        // DEVICE
        if(isMobile()==true){//isMobile
          this.setState({device : 'isMobile'})
        }else if (isTablet()==true){
          this.setState({device : 'isTablet'})
        }else{
          this.setState({device : 'isDesktop'})
        };
        // DIRECTION
        this.setState({isLandscape : (isLandscape()?true:false) })
        // LANGUAGE
        this.setState({language : getLanguer()})

        // height width
        this.setState({vh : screen.height})
        this.setState({vw : screen.width})

        // this.setState({language : 'it'})




    }

    render () {

    // const images = this.props.works.map(works=>[works.img])
    // debugger;

    // debugger

    return (
      <main
      key = {`page-${this.props.id}-${this.state.language}` }
       >
        <Head>
            <title>{this.props.name[this.state.language]}</title>
            {/*meta 不支持重复 property*/}
            <meta content={`ZAI - ${this.props.name[this.state.language]}`} name='title' />
            <meta content={`ZAI - ${this.props.name[this.state.language]}`} property='og:title' />
            <meta content={`ZAI - ${this.props.description.zh} ${this.props.description[this.state.language]} ${this.props.description.en}`} name='description' />
            <meta content={`ZAI - ${this.props.description.zh} ${this.props.description[this.state.language]} ${this.props.description.en}`} property='og:description' />
            <meta content={`${this.props.keywords} ZAI, zhongart internationale, Gallery, arte,中艺国际, 佛罗伦萨 `} name='keywords' />
            <meta content='article' property='og:type' />

            <meta content={`http://www.zhongart.it/artisti/${this.props.name[this.state.language]}`} property='og:url' />

            {/*
            <meta content='//s3.amazonaws.com/所用的图片' property='og:image' />
            */}

            {/*<style dangerouslySetInnerHTML={{ __html: this.props.css }} />*/}

        </Head>


        {/* CSS */}


      {/*
      头像和描述
      宽屏--横向2列
      竖屏--1列
    */}

        <NoSSR>
        {/* 头像 */}
        <div
         {...css({
            height:`${GR.px(1,this.state.vw)}px`,
            marginLeft: `${GR.vw(5)}vw`,
            marginRight: `${GR.vw(5)}vw`,
            marginTop: `${GR.vw(6)}vw`,
         })}

        >
            <AVATAR
             src = {this.props.avatar}
             SizeWidth = {GR.px(1,this.state.vw)}
             name = {this.props.name[this.state.language]}

             />
        </div>
        </NoSSR>

        <NoSSR>
        {/*描述 DESCRIPTION*/}
        <div
         {...css({
            fontSize:`1rem`,
            marginLeft: `${GR.vw(5)}vw`,
            marginRight: `${GR.vw(5)}vw`,
            marginTop: `${GR.vw(6)}vw`,
            marginBottom: `${GR.vw(7)}vw`,
            fontWeight:100,
         })}
        >
            {
                this.props.description[this.state.language]
                .split('\n')
                .map((item, key) =>
                    <span key={key}>{item}<br/></span>
                )
            }
        </div>
        </NoSSR>
        {/* MENUS-section */}

        {/*EVENTS*/}
        <NoSSR>
        <Seczione
         items = {this.props.events}
         language = {this.state.language}
         name = {'EVENTS'}
         color = {ui.color.w_1}
         vw = {this.state.vw}
         marginW = {`${GR.vw(5)}vw`}
        />
        </NoSSR>

        {/*EXHIBITIONS*/}
        <NoSSR>
        <Seczione
         items ={this.props.exhibitions}
         language = {this.state.language}
         name = {'EXHIBITIONS'}
         color={ui.color.w_1}
         vw = {this.state.vw}
         marginW = {`${GR.vw(5)}vw`}
        />
        </NoSSR>


        {/*WORKS*/}
        <NoSSR>
        <Seczione
         items ={this.props.works}
         language = {this.state.language}
         name = {'WORKS'}
         color={ui.color.w_1}
         vw = {this.state.vw}
         marginW = {`${GR.vw(5)}vw`}
        />
        </NoSSR>



        {/*保证section最后一项在窗口上方*/}
        <div
         {...css({
            position: 'relative',
            bottom: '0',
            height:`${GR.px(3,this.state.vh)}px`,

         })}
        ></div>

        <NoSSR>

          <Nav
           vw = {this.state.vw}
           vh = {this.state.vh}
           isLandscape={this.state.isLandscape}
           language= {this.state.language}
           show = {this.state.scrolledUp==undefined?false:(this.state.scrolledUp)}//初始没有scroll时,close
           marginW = {GR.vw(5)}// for content
           showLogo={true}
          />
        </NoSSR>
      </main>
      )
}
 }





