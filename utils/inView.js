
// import {initStore} from '~/store'
// const STORE = initStore()



// let test = 0

const elementInViewport = (vw, vh,element)=>{

  // 一些过滤条件
  if (!element ||!element.offsetParent ) return false;
  //如果 父element 被隐藏, 跳过(会造成 reflow
  // visibility == 'hidden' , display == 'none' , opacity == 0
  // const { visibility,display,opacity } = getComputedStyle(element)
  // if (visibility=='hidden'||
  //   display=='none'||
  //   opacity==0
  //  ) return false;
  // console.log(visibility,display,opacity)
  // debugger
  const { top, left, bottom, right ,width, height} = element.getBoundingClientRect();
  // https://github.com/camwiegert
  // 取替 const inView = top >= 0 && left >= 0 && bottom <= vh && right <= vw

  // const intersection = {
  //       t: bottom,
  //       r: vw - left,
  //       b: vh - top,
  //       l: right
  //   };

  //   // const threshold = {
  //   //     x: options.threshold * width,
  //   //     y: options.threshold * height
  //   // };
  //   const threshold = {
  //       x:  width,
  //       y:  height
  //   };


  //   const inView = intersection.t > (threshold.y)
  //       && intersection.r > (threshold.x)
  //       && intersection.b > (threshold.y)
  //       && intersection.l > (threshold.x);

  let inView ;
  if(top >= 0 ){
    inView = top <= vh
          && right <= vw
          && left >= 0
  }else{
     inView = bottom<=vh
          && right <= vw
          && left >= 0
  }

  return ({inView:inView, top:top, left:left, bottom:bottom, right:right })

}

// export const elementInViewport =()....;
// module.exports.elementInViewport




/*
  @ opt.element -- $dom
  @ opt.scrollY -- 滚动条高度
  @ opt.lag -- 移动比率 .05~.2
  @ opt.max -- 移动 px 最大值
  @
  @ vw, 屏幕宽高(store 提取)
  @ vh, 屏幕宽高(store 提取)
  @
  @ retrun pos 'transform':'translate3d(0,'+pos+'px,0)'
   */
export const parallaxInView = (opt)=>{
  const {vw,vh,element} =  opt
  const answer = elementInViewport(vw,vh,element)

  if (answer.inView) {
    // debugger
    const {scrollY,lag , max} =  <option value=""></option>
    let pos = (scrollY + vh - answer.top) * lag;
    return (pos > max)? max : pos;

  }else{
    // debugger
  }
}
// export default ParallaxInView;




// componect中 设置
//   constructor
//         this.state = {
//             parallaxY:0,
//         }
//     }

//     componentWillReceiveProps(nextProps){
//         if(this.props.onScrollingY!==nextProps.onScrollingY){
//             const opt = {
//                 vw:this.props.vw,vh:this.props.vh,
//                 element:this._$CONTENT,
//                 scrollY:nextProps.onScrollingY,
//                 lag:.02,
//             }
//             const pos = parallaxInView(opt)
//             if(pos){
//                 this.setState({
//                     parallaxY:pos,
//                 })
//             }
//         }
//     }
//     shouldComponentUpdate(nextProps){
//         if(this.props.onScrollingY!==nextProps.onScrollingY) {return true}
//             else {return false}

//     }
