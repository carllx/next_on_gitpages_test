/**
 * 分类
 * cat
 *  :background
 *  :img
 *  :icon_artist
 *
 * scroll未看到的时候隐藏,加载完毕的时候显示
 * display:{boolean}
 *
 */

import React, {Component} from 'react'
import { rehydrate, css } from 'glamor'
import glamorous, {ThemeProvider} from 'glamorous'
import XHRProgress  from '../utils/Progress'
import {ui}  from '../utils/ui'
import {wix}  from '../utils/img'



/**
 * simple Image
 *   @ display
 *   @ src
 */

const _IMG  = glamorous.div({
  justifyContent:   'space-around',

  backgroundRepeat: 'no-repeat',
  backgroundSize:   'cover',
  overflow:         'hidden',
  backgroundColor:  'white',

},(props)=>({
  // isLandscape  --或 居中
  opacity: props.display?1:0,
  width:   props.width?`${props.width}`:'100%',
  height:  props.height?`${props.height}`:'100%',
  //在这里找渐变模板 https: //webgradients.com/
  // backgroundColor:  props.src?`url(${props.src})`:'white',
  backgroundImage:  props.src?`url(${props.src})`:'white',
}))



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

const _LoadingDefaultstyle = glamorous.div({

    position:         'absolute',
    left:             0,
    top:              0,
    zIndex:           1,
    fontWeight:     400,
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
    display:        'flex',
    backgroundColor:'rgba(0,0,0,.15)',

},(props)=>({
    fontSize:        props.size?props.size:'0.4em',
    // color:           props.color?props.color:ui.color.secondary_on_light,
    // color:           props.color?props.color:ui.color.secondary_on_dark,
    // 为了居中
    //
    width:props.width,
    height:props.height,
})
)




/**
 *  svg style
 */


const triangleContainer = css({
  position:         'absolute',
  left:             0,
  top:              0,
  zIndex:           1,
  fontWeight:     100,
  width: '100%',
  height: '100%',
  flexDirection:  'column',
  alignItems:     'center',
  justifyContent: 'center',
  display:        'flex',
  backgroundColor:'rgba(0,0,0,.15)',
})
const triangleKeyframe = css.keyframes({
  from: {transform: 'rotate(0deg)'},
  to: {transform: 'rotate(360deg)'}
})

const triangleDefaultStyle = css({
  fill:ui.color.secondary,
  width:'0.45rem',
  height:'0.45rem',
  transformOrigin:'48% 48%',
  // opacity:0,
  animation: `${triangleKeyframe} 1s cubic-bezier(0.24, 0.49, 0.82, 0.6) infinite`
})



/**
 * @display?
 * @percent?
 */
class _Loading extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return(

      <div
       {...css(triangleContainer)}
       style={{
        opacity:this.props.display?1:0 }}
      >
        <svg
          {...css(triangleDefaultStyle)}
          viewBox="1 1 50.1 43.4"
        >
          <polygon
           {...css(triangleDefaultStyle)}
           points="1,43.4 50.1,43.4 25.1,1"
          />
        </svg>

        <glamorous.P
         color = {ui.color.disabled_on_light}
         fontSize = '0.2rem'
        >{this.props.percent+'%'}</glamorous.P>
      </div>
    )
  }
}



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
      active:this.props.active,
      loaded:false,
      percent: 0
    };

    this.progress = this.onProgress.bind(this);
  }

  componentDidMount(){
    if(this.props.active) this.fethImg();
  }

  componentWillUpdate(){
    // if(this.props.active==true && this.state.loaded==false) this.fethImg();
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
      const h = this.props.height;
      const w = this.props.width;
      // @{wix}  from '../utils/img'
      const src = wix(this.props.org,w,h )

      let XHR = new XHRProgress();
      XHR.onProgress = this.progress;
      // 测试logder 高质量图片
      // let isOk = await XHR.send(`http://cdn.wallpapersafari.com/23/11/clBNRq.jpg`)
      const isOk = await XHR.send(src)

      if(isOk==true) this.setState({loaded:true});
      this.setState({src:src});
  }
  render(){
      return(
          <div>

              <_IMG
               width = {this.props.width}
               height = {this.props.height}
               src = {this.state.src}

               display = {this.state.loaded}//显示Img
               >
                  {this.props.width}
              </_IMG>

              <_Loading
               display = {!this.state.loaded}
               percent = {this.state.percent}
              />
          </div>
          );
  }
}





export default IMG_WithLoader;





// export let IMG = HOC_WithLoad(_BG_IMG)




