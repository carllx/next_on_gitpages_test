/**
 * 适用于
 *  :img (全屏图片)
 *  :AVATAR(艺术家)
 *  支持png
 *
 *
 * 组件 IMG_WithLoader
 *  + _IMG
 *  + _LOADER
 *
 *
 * active {false} 在未(可见)到的时候 隐藏,
 * active {true} loader三角形动画转动
 * state , loaded {true}的时候显示img
 *  NoSSR, 需要使用 NoSSR (import NoSSR from 'react-no-ssr';)
 *
 */

import {PureComponent} from 'react'
import { css } from 'glamor'
import XHRProgress from '~/utils/Progress'
import {ui ,makeKEY,perspZ}  from '~/utils/ui'
import {wix} from '~/utils/img'




/**
 * simple Image
 *   @ display
 *   @ src
 */
export class _IMG extends PureComponent{

  constructor(props){
    super(props)
  }

  render(){

    return(
      <div
         {...css({
          // position:'relative',//文件流识别
          // justifyContent:   'space-around',
          backgroundRepeat: 'no-repeat',
          backgroundSize:   'cover',
          // overflow:         'hidden',
          backgroundColor:  'transparent',
          backgroundPosition: 'center',
          // backgroundAttachment: 'fixed',

          // transformStyle: 'preserve-3d',//@parallax
          // transform: 'translateZ(0px)',
          transform: 'skew(0deg,-5deg) translateZ(1px)',
          //position: 'sticky',//@parallax
          left:this.props.left,
          top:this.props.top,
          opacity: this.props.show?1:0,
          width:'100%',
          height: '100%',
          //在这里找渐变模板 https: //webgradients.com/
          // backgroundColor:  this.props.src?`url(${this.props.src})`:'white',
          backgroundImage:  this.props.show?`url(${this.props.src})`:null,
          transition: `opacity 1s cubic-bezier(0.24, 0.49, 0.82, 0.6)`,
          })}
        >
        </div>
      )
  }
}



/**
 *  svg style
 */
/**/

const _LoadingKeyframe = css.keyframes({
  from: {transform: 'rotate(0deg)'},
  to: {transform: 'rotate(360deg)'}
})


const _Loading =(props)=>

      <div
       {...css({
        position: 'absolute',

        zIndex: 1,
        fontWeight: 100,

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',

        left:props.left?props.left:0,
        top:props.top?props.top:0,
        width: '100%',
        height:props.height,
        opacity:props.show?1:0,

        })}
      >
        <svg
         {...css({
          width:'20%',
          height:'20%',
          transformOrigin:'48% 48%',
          animation: `${_LoadingKeyframe} 1s cubic-bezier(0.24, 0.49, 0.82, 0.6) infinite`,
          animationPlayState: props.show?'running':'paused',
         })}
          viewBox="1 1 50.1 43.4"
        >
          <polygon
           fill = {ui.color.secondary}
           points="1,43.4 50.1,43.4 25.1,1"
          />
        </svg>

        <p {...css({
          color:ui.color.disabled_on_light,
          fontSize:'0.2rem',
        })}
        className={"loader"}
        >
          {props.percent+'%'}
        </p>
      </div>



/**
     <IMG_WithLoader
     @props width [FLOAT]  |定义 _w render/wix请求 包括 img &&loading
     @props height [FLOAT]  |定义 _h render/wix请求 包括 img &&loading
     @props top [FLOAT]  |自定义 位置 包括 img &&loading
     @props left [FLOAT]  |自定义 位置 包括 img &&loading
     @props src [STRING]  |图片数据地址=> state.src =>_src
     @props fetch [BOOLEAN]  |true 会触发一次加载
    />
*/

export default class IMG_WithLoader extends PureComponent {

  constructor (props) {

    super(props);
    this.PERSP = 1;
    this.state = {
      percent: 0,
      src:this.props.src,
      loaded:false
    };
    this._src= this.props.src;//辨认是否刷新变动
    this.progress = this.onProgress.bind(this);
    this.key=makeKEY();
    this.Zp = {
            pc:{
                img : perspZ(-0.03,this.PERSP),
            },
            mobile:{
                img : perspZ(-0.03,this.PERSP),
            }
        }
  }


  componentDidMount(){
    //如果 #Daddy 激活后开始请求
    if(this.props.fetch ==true) {
      // debugger
      // this.fetchImg(this.props.src);
      this.fetchImg();
    }
  }

  componentWillReceiveProps(nextProps,nextState){
    // debugger
    // update 过程 #Daddy 随时刷新地址后开始请求
    // if(nextProps.fetch ==true && nextProps.src!=this.props.src){
    if(nextProps.fetch!==this.props.fetch&&nextProps.fetch === true ){

      this.fetchImg(nextProps.src);
      return
    }


  }




  onProgress(xhr){

    this._fetching  =  true;
    if(xhr.lengthComputable){ // false的话total返回是0 ,github 上 json , js , txt
        let percentComplete = Math.round(xhr.loaded / xhr.total * 100)
        console.log(percentComplete,'%')
        // debugger
        this.setState({
          percent: `${percentComplete}`,
          loaded:false,
        });
    }else{
      console.log('@onProgress 该资源无法计算byte长度')
    }
  }

  async fetchImg (nextSrc) {

    const w = this.props.width;
    const h = this.props.height;
    const new_src = nextSrc?nextSrc:this.props.src;//父亲变动后传下来的
    /**
      @{wix}  from '../utils/img'
     {wix}转换src
     需要<NoSSR> 否则这里的 w h 取回来是 0
     */
    const full_src = wix (new_src,w,h)
    // const full_src = wix (new_src,w,h,'fill')
    let XHR = new XHRProgress();
    XHR.onProgress = this.progress;
    /*若要测试logder 高质量图片
    let isOk = await XHR.send(`http://cdn.wallpapersafari.com/23/11/clBNRq.jpg`)*/
    const Done = await XHR.send(full_src)

    if(Done) {
      this.setState({
        src:full_src,
        loaded:true,
      },()=>{
        this._src= new_src;//帮助辨认是否刷新变动
         });

    }else{
      console.error('图片fetchImg 发送不成功')
    }

  }
  render(){
    const zp = this.props.is_landscape?this.Zp.pc:this.Zp.mobile
      return(
          <div
           {...css({
            position: 'relative',
            overflow:'hidden',
            width : `${this.props.width}px`,//'100%',//this.props.width,
            height : `${this.props.height}px`,
            //transform: 'inherit',//为了section上层skew
            transformStyle: 'preserve-3d',//@parallax
            // transform: 'skew(0deg,-5deg)',//
            ':before':{
                  display: 'block',
                  zIndex:-1,
                  position:'absolute',
                  // top:'-50%',
                  content:'""',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize:   'cover',
                  // backgroundAttachment: 'fixed',
                  // backgroundColor:  'transparent',
                  backgroundPosition: 'center',
                  transform: `skew(0deg,-5deg) translateZ(${zp.img.translateZ}px) scale(${zp.img.scale*1.2})`,
                  // left:this.props.left,
                  // top:this.props.top,
                  opacity: this.state.loaded?1:0,
                  width:'100%',
                  height: '100%',
                  backgroundImage:  this.state.loaded?`url(${this.state.src})`:null,
                  transition: `opacity 1s cubic-bezier(0.24, 0.49, 0.82, 0.6)`,
            }
            })}
           key={`_IMG_${this.key}`}
           className = 'imgLoader'



          >
 {/*             <_IMG
               width = {this.props.width}
               height = {this.props.height}
               src = {this.state.src}
               show = {this.state.loaded}//显示Img
               left = {this.props.left}
               top = {this.props.top}
               key={`_IMG_${this.key}`}
               />*/}

              <_Loading
               width = {this.props.width}
               height = {this.props.height}
               show = {(this.state.loaded==false)}
               percent = {this.state.percent}
               left = {this.props.left}
               top = {this.props.top}
               key={`_LOADIMGER_${this.key}`}

              />
          </div>
          );
  }
}





