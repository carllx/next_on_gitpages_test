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

import {Component} from 'react'
import { css } from 'glamor'
// import glamorous, {ThemeProvider} from 'glamorous'
import XHRProgress from '../utils/Progress'
import {ui}  from '../utils/ui'
import {wix} from '../utils/img'


/**
 * simple Image
 *   @ display
 *   @ src
 */

const _IMG =(props)=>

      <div
       {...css({
        position:'absolute',//文件流识别
        justifyContent:   'space-around',
        backgroundRepeat: 'no-repeat',
        backgroundSize:   'cover',
        overflow:         'hidden',
        backgroundColor:  'transparent',

        left:props.left,
        top:props.top,
        opacity: props.loaded?1:0,
        width:   props.width?`${props.width}`:'100%',
        height:  props.height?`${props.height}`:'100%',
        //在这里找渐变模板 https: //webgradients.com/
        // backgroundColor:  props.src?`url(${props.src})`:'white',
        backgroundImage:  props.src?`url(${props.src})`:'white',
        transition: `opacity 1s cubic-bezier(0.24, 0.49, 0.82, 0.6)`,
        })}
      >
      </div>




/**
 *  svg style
 */


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
        width: props.width,
        height:props.height,
        opacity:props.loaded?1:0,

        })}
      >
        <svg
         {...css({
          width:'20%',
          height:'20%',
          transformOrigin:'48% 48%',
          animation: `${_LoadingKeyframe} 1s cubic-bezier(0.24, 0.49, 0.82, 0.6) infinite`,
          animationPlayState: props.loaded?'running':'paused',
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
        })}>
          {props.percent+'%'}
        </p>
      </div>



/**
     <IMG_WithLoader
     width = {...} //=>图片服务器
     height = {...} //=>图片服务器
     src = {...} //=>图片服务器
     active = {...} //loading 转
    />
*/

export class IMG_WithLoader extends Component {

  constructor (props) {

    super(props);

    this.state = {
      loaded:false,
      percent: 0
    };

    this.progress = this.onProgress.bind(this);
  }

  componentDidMount(){
    if(this.props.active && this.props.width !=0 ) {
      this.fethImg();
    }
  }


  onProgress(xhr){
      if(xhr.lengthComputable){ // false的话total返回是0 ,github 上 json , js , txt
          let percentComplete = Math.round(xhr.loaded / xhr.total * 100)
          console.log(percentComplete,'%')
          this.setState({percent: `${percentComplete}`});

      }else{
        console.log('@onProgress 该资源无法计算byte长度')
      }

  }

  async fethImg () {
      const w = this.props.width;
      const h = this.props.height;
      const org = this.props.src;
      // @{wix}  from '../utils/img'
      // {wix}转换src
      // 需要<NoSSR> 否则这里的 w h 取回来是 0
      const src = wix(org,w,h)
      // console.error('org,w,h',org,w,h)
      let XHR = new XHRProgress();
      XHR.onProgress = this.progress;
      // 若要测试logder 高质量图片
      // let isOk = await XHR.send(`http://cdn.wallpapersafari.com/23/11/clBNRq.jpg`)
      const isOk = await XHR.send(src)

      if(isOk==true) {
        this.setState({loaded:true});
        this.setState({src:src});
      }else{
        console.error('图片fethImg 发送不成功')
      }
  }
  render(){
      return(
          <div {...css({
            position: 'relative',
            width : this.props.width,
            height : this.props.height,
            })}
          >
              <_IMG
               width = {this.props.width}
               height = {this.props.height}
               src = {this.state.src}
               loaded = {this.state.loaded}//显示Img
               left = {this.props.left}
               top = {this.props.top}
               />

              <_Loading
               width = {this.props.width}
               height = {this.props.height}
               loaded = {!this.state.loaded&&this.props.active}//激活后loaded前才显示
               percent = {this.state.percent}
               left = {this.props.left}
               top = {this.props.top}
              />
          </div>
          );
  }
}





export default IMG_WithLoader;





// export let IMG = HOC_WithLoad(_BG_IMG)



/**
 * Backgroud Image
 *   @ opacity
 *   @ src
 */

// const _BG_IMG = glamorous.div({

//     position:         'absolute',
//     zIndex:           -1,
//     left:             0,
//     top:              0,
//     zIndex:           1,
//     display:          'flex',

//     justifyContent:   'space-around',
//     backgroundColor:  '#3b444f',
//     backgroundRepeat: 'no-repeat',
//     backgroundSize:   'cover',
//     overflow:         'hidden',

//     width:            '100%',
//     height:           '100%',

//     transitionProperty: 'opacity',
//     transitionTimingFunction: 'linear',//cubic-bezier(.4,0,.2,1)
//     transitionDuration: '600ms',

//   },(props)=>({
//     // isLandscape  --或 居中

//     //在这里找渐变模板 https: //webgradients.com/
//     opacity: props.loaded?1:0,
//     backgroundImage:  props.src?`url(${props.src})`:'white',
//   })
// )



/**
 *  Loading style...的显示界面
 *  @src  {[type]} options.position:
 *
 */



