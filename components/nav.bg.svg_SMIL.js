import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PureComponent } from 'react'

import { css } from 'glamor'
import { ui, GR } from '~/utils/ui'
import { setBackGroundPoints } from '~/reducers/nav'


import { setPanelOn } from '~/reducers/nav'
 /**
 * NAV底部 BACKGROUND梯形
 * @props  {[FLOAT]} width 一般恒定vw
 * @props  {[FLOAT]} height 一般恒定vh
 * @props  {[FLOAT]} pts.pt_1 (mobile)右↓||(landscape)上→ --1倾斜度
 * @props  {[FLOAT]} pts.pt_2 (mobile)左↓||(landscape)上→ --1倾斜度
 * @props  {[STRING]} color 颜色
 * @return {[component]}
 */
import {perspZ}  from '~/utils/ui'



class SVG_BACKGROUND extends PureComponent {
    constructor(props) {
        super(props);
        this._pts_data = this.setPtsData() //将计算结果储存数据
        this.state= this.makeKeyFrames(this.props.nav_on,this.props.nav_on,true)
    }
    /*
        pt_1-------pt_2
        |           |
        |           |
        pt_4-------pt_3
    */
    /*若props(外)更新服从外部*/
    componentWillReceiveProps(nextProps){
        // nav 状态发生改变
        if(nextProps.nav_on!==this.props.nav_on){
            //响应一次
            this.makeKeyFrames(this.props.nav_on,nextProps.nav_on)
        }
    }

    makeKeyFrames( pre_on,next_on,dontSetState){
        const pre  = this._ObjectToSVGPts (this._pts_data[pre_on])
        const next = this._ObjectToSVGPts (this._pts_data[next_on])
        const obj ={
            pre_points:pre,
            next_points:next
        }
        if (dontSetState) return obj
        this.setState(obj)

    }

    close=()=>{
        this.props.setPanelOn('close')
    }




    setPtsData = () => {
        const landscape = this.props.is_landscape;
        const vw = this.props.vw;
        const vh = this.props.vh;

        if (landscape) {
            return {
                close: {
                    pt_1_x:vw, pt_1_y:0,
                    pt_2_x:vw,pt_2_y:0,
                    pt_3_x:vw,pt_3_y:0,
                    pt_4_x:vw, pt_4_y:0,
                },show:{
                    pt_1_x:GR.px(2,vw), pt_1_y:0,
                    pt_2_x:vw,pt_2_y:0,
                    pt_3_x:vw,pt_3_y:GR.px(3,vh),
                    pt_4_x:vw, pt_4_y:GR.px(3,vh),
                },artisti:{
                    pt_1_x:0, pt_1_y:GR.px(4,vw),
                    pt_2_x:vw,pt_2_y:GR.px(5,vw),
                    pt_3_x:GR.px(6,vw),pt_3_y:vw,
                    pt_4_x:0, pt_4_y:vw,
                },mostre:{
                    pt_1_x:0, pt_1_y:GR.px(4,vw),
                    pt_2_x:vh,pt_2_y:vh,
                    pt_3_x:vw,pt_3_y:vh,
                    pt_4_x:0, pt_4_y:vh,
                },news:{
                    pt_1_x:0, pt_1_y:GR.px(6,vw),
                    pt_2_x:vw,pt_2_y:GR.px(3,vw),
                    pt_3_x:vw,pt_3_y:vh,
                    pt_4_x:0, pt_4_y:vh,
                },contact:{
                    pt_1_x:0, pt_1_y:GR.px(6,vw),
                    pt_2_x:vw,pt_2_y:GR.px(4,vw),
                    pt_3_x:vw,pt_3_y:vw,
                    pt_4_x:0, pt_4_y:GR.px(2,vw),
                }
            }//this._pts_data
        }else{ //
            return {
                close:{
                    pt_1_x:0, pt_1_y:vh,//left_top
                    pt_2_x:vw,pt_2_y:vh,//right_top
                    pt_3_x:vw,pt_3_y:vh,
                    pt_4_x:0, pt_4_y:vh,
                },show:{
                    pt_1_x:0, pt_1_y:(GR.px(3,vh)-vh)*-1,
                    pt_2_x:vw,pt_2_y:(GR.px(4,vh)-vh)*-1,
                    pt_3_x:vw,pt_3_y:vh+500,//right_bottom 修复positioned incorrectly when dropdown search box display,
                    pt_4_x:0, pt_4_y:vh+500,//right_bottom 修复positioned incorrectly when dropdown search box display,
                },artisti:{
                    pt_1_x:0, pt_1_y:GR.px(6,vh),
                    pt_2_x:vw,pt_2_y:GR.px(2,vh),
                    pt_3_x:vw,pt_3_y:vh,
                    pt_4_x:0, pt_4_y:vh,
                },mostre:{
                    pt_1_x:0, pt_1_y:GR.px(4,vh),
                    pt_2_x:vw,pt_2_y:GR.px(2,vh),
                    pt_3_x:vw,pt_3_y:vh,
                    pt_4_x:0, pt_4_y:vh,
                },news:{
                    pt_1_x:0, pt_1_y:GR.px(6,vh),
                    pt_2_x:vw,pt_2_y:GR.px(3,vh),
                    pt_3_x:vw,pt_3_y:vh,
                    pt_4_x:0, pt_4_y:vh,
                },contact:{
                    pt_1_x:0, pt_1_y:GR.px(5,vh),
                    pt_2_x:vw,pt_2_y:0,
                    pt_3_x:vw,pt_3_y:vh,
                    pt_4_x:0, pt_4_y:vh,
                }
            }//this._pts_data
        }//if
    }//this.setPtsData


    /*一维数组 转换成 多维*/
    _splicePtsObjectVectorArr =(arr, d )=>{
        let newArr = [];
        let clone = [...arr]
        while(clone.length) newArr.push(clone.splice(0,d));
        return newArr
        // newArr.reduce((prev, curr)=> prev+' '+curr)
        // "1,1 2,2 3,3 4,4"
    /*
        arr = [1,1,2,2,3,3,4,4] =>
        [[1,1], [2,2], [3,3], [4,4]]
     */
    }

    _ObjectToVectorArray = (obj,d) =>{
        const arr = Object.values(obj);
        /*{"1":5,"2":7,"3":0,"4":0}
        [5, 7, 0, 0]*/
        return this._splicePtsObjectVectorArr(arr,d)
    }

    /*pts对象 转换成 svg可用的string格式 */
    _ObjectToSVGPts=(obj)=>{
        const arr = this._ObjectToVectorArray(obj,2)
        return arr.reduce((prev, curr)=> prev+' '+curr)
    }

    render(){

        const nav_on = this.props.nav_on

        return(
            <div
             {...css({
                pointerEvents: 'none',
                width:  `100%`,
                height: `100%`,
                // transform:`translateZ(${zp.bg.translateZ}px) scale(${zp.bg.scale})`
              })}
            >
                <svg
                 {...css({
                    // @ 还未修复 iphone safari svg上移问题
                    width:  `100%`,
                    height: '100%',//@
                    position: 'fixed' ,//@
                    top: 0,//@
                })}
                 key = {`${this.props.nav_on}_svg`}//否则没有动画过度效果


                 >
                    <polygon
                        {...css({
                            width:  `100%`,
                            height: `100%`,
                            // pointerEvents:'visiblePainted',//auto 相同svg 禁用了pointerEvents
                            // cursor:'pointer',// 提示可关闭
                            // points:this.state.pointsKayFrame,
                            // animation: 'move 0.7s',
                            // this.state.pointsKayFrame[nav_on]
                            pointerEvents: 'visibleFill',
                        })}
                     onClick = {this.close}
                     fill={ui.color.w_o1}
                     stroke="none"
                     points= {this.state.pre_points}
                    >
                        <animate
                         attributeName="points"
                         // attributeType="points"
                         dur="200ms"
                         to={this.state.next_points}
                         fill='freeze'
                         calcMode="spline"
                         keyTimes="0;1"
                         keySplines=".04,.36,.01,.99"
                          />
                        {/*<animateTransform
                         attributeName="transform"
                         // attributeType="points"
                         dur="300ms"
                         type="rotate"
                         // begin="click"
                         // from="0 500 500"
                         to={'360 500 500'}
                         fill='freeze'
                          />*/}
                </polygon>

                </svg>

            </div>
        )
    }
}



const mapStateToProps = (state) => ({
    vw:state.Root.view_size.vw,
    vh:state.Root.view_size.vh,
    is_landscape:state.Root.view_size.is_landscape,
    nav_on:state.nav.on,
    nav_BG_PTs:state.nav.background_pts
});

/*关闭的时候,切换的时候使用*/
const mapDispatchToProps = (dispatch) => {
  return {
    setPanelOn: bindActionCreators(setPanelOn, dispatch),

  }
}


// export default Nav;
export default connect(mapStateToProps ,mapDispatchToProps)(SVG_BACKGROUND)





/*
mostre:{
                pt_1_x:0, pt_1_y:GR.px(4,vw),
                pt_2_x:vh,pt_2_y:vh,
                pt_3_x:vw,pt_3_y:vh,
                pt_4_x:0, pt_4_y:vh,
              },news:{
                pt_1_x:0, pt_1_y:GR.px(6,vw),
                pt_2_x:vw,pt_2_y:GR.px(3,vw),
                pt_3_x:vw,pt_3_y:vh,
                pt_4_x:0, pt_4_y:vh,

 */
