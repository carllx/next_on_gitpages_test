import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PureComponent } from 'react'

import { css } from 'glamor'
import { ui, GR } from '~/utils/ui'
import { setBackGroundPoints } from '~/reducers/nav'
 /**
 * NAV底部 BACKGROUND梯形
 * @props  {[FLOAT]} width 一般恒定vw
 * @props  {[FLOAT]} height 一般恒定vh
 * @props  {[FLOAT]} pts.pt_1 (mobile)右↓||(landscape)上→ --1倾斜度
 * @props  {[FLOAT]} pts.pt_2 (mobile)左↓||(landscape)上→ --1倾斜度
 * @props  {[STRING]} color 颜色
 * @return {[component]}
 */

class SVG_BACKGROUND extends PureComponent{
    constructor(props){
        super(props);
        this._pts_data= this.setPtsData()//将计算结果储存数据
    }
    /*
        pt_1-------pt_2
        |           |
        |           |
        pt_4-------pt_3
    */
    setPtsData=()=>{
        const landscape = this.props.is_landscape;
        const vw = this.props.vw;
        const vh = this.props.vh;

        if(landscape){
            return {
                close:{

                pt_1_x:vw, pt_1_y:0,
                pt_2_x:vw,pt_2_y:0,
                pt_3_x:vw,pt_3_y:0,
                pt_4_x:vw, pt_4_y:0,
              },show:{
                pt_1_x:GR.px(2,vw), pt_1_y:0,
                pt_2_x:vw,pt_2_y:0,
                pt_3_x:vw,pt_3_y:GR.px(5,vh),
                pt_4_x:GR.px(1,vw), pt_4_y:GR.px(4,vh),
                // pt_1_x:vw, pt_1_y:0,
                // pt_2_x:vw,pt_2_y:vh,
                // pt_3_x:vw-GR.px(4,vw),pt_3_y:vh,
                // pt_4_x:GR.px(1,vw), pt_4_y:GR.px(6,vh),
              },artisti:{
                pt_1_x:0, pt_1_y:GR.px(4,vw),
                pt_2_x:vw,pt_2_y:GR.px(5,vw),
                pt_3_x:GR.px(6,vw),pt_3_y:vw,
                pt_4_x:0, pt_4_y:vw,
              },mostre:{
                pt_1_x:0, pt_1_y:GR.px(4,vw),
                pt_2_x:vh,pt_2_y:GR.px(2,vw),
                pt_3_x:vh,pt_3_y:vh,
                pt_4_x:0, pt_4_y:vh,
              },eventi:{
                pt_1_x:0, pt_1_y:GR.px(6,vw),
                pt_2_x:vh,pt_2_y:GR.px(3,vw),
                pt_3_x:vh,pt_3_y:vh,
                pt_4_x:0, pt_4_y:vh,
              },about:{
                pt_1_x:0, pt_1_y:GR.px(6,vw),
                pt_2_x:vw,pt_2_y:GR.px(4,vw),
                pt_3_x:vw,pt_3_y:vw,
                pt_4_x:0, pt_4_y:GR.px(2,vw),
              },menu:{
                pt_1_x:vw-GR.px(5,vw), pt_1_y:0,
                pt_2_x:vw,pt_2_y:0,
                pt_3_x:vw,pt_3_y:GR.px(4,vh),
                pt_4_x:vw, pt_4_y:GR.px(4,vh),
              }
            }//this._pts_data
        }else{ //
            return {
                close:{
                pt_1_x:0, pt_1_y:vh,//left_top
                pt_2_x:vw,pt_2_y:vh,//right_top
                pt_3_x:vw,pt_3_y:vh,//right_bottom
                pt_4_x:0, pt_4_y:vh,//left_bottom
              },show:{
                pt_1_x:0, pt_1_y:(GR.px(3,vh)-vh)*-1,
                pt_2_x:vw,pt_2_y:(GR.px(4,vh)-vh)*-1,
                pt_3_x:vw,pt_3_y:vh,
                pt_4_x:0, pt_4_y:vh,
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
              },eventi:{
                pt_1_x:0, pt_1_y:GR.px(6,vh),
                pt_2_x:vw,pt_2_y:GR.px(3,vh),
                pt_3_x:vw,pt_3_y:vh,
                pt_4_x:0, pt_4_y:vh,
              },about:{
                pt_1_x:0, pt_1_y:GR.px(4,vh),
                pt_2_x:vw,pt_2_y:GR.px(5,vh),
                pt_3_x:vw,pt_3_y:vh,
                pt_4_x:0, pt_4_y:vh,
              }
            }//this._pts_data
        }//if
    }//this.setPtsData


    setBGPts=(prev_on,next_on)=>{
        // console.log(prev_on,next_on)
        this.props.setBackGroundPoints({...this._pts_data[prev_on]},this._pts_data[next_on])
    }

    componentWillReceiveProps(nextProps){
        /*若props(外)更新服从外部*/

        if(nextProps.nav_on!==this.props.nav_on){
            this.setBGPts(this.props.nav_on,nextProps.nav_on)
        }
    }
    /*一维数组 转换成 多维*/
    _splicePtsObjectVectorArr =(arr, d )=>{
        let newArr = [];
        let clone = [...arr]
        while(clone.length) newArr.push(clone.splice(0,d));
        return newArr
        // newArr.reduce((prev, curr)=> prev+' '+curr)
        // "1,1 2,2 3,3 4,4"
    }

    /*
        arr = [1,1,2,2,3,3,4,4] =>
        [[1,1], [2,2], [3,3], [4,4]]
     */
    _ObjectToVectorArry = (obj,d) =>{
        const arr = Object.values(obj);
        /*{"1":5,"2":7,"3":0,"4":0}
        [5, 7, 0, 0]*/
        return this._splicePtsObjectVectorArr(arr,d)


    }
     /*pts对象 转换成 svg可用的string格式 */
    _arrayToSVGPts=(obj)=>{
        const arr = this._ObjectToVectorArry(obj,2)
        return arr.reduce((prev, curr)=> prev+' '+curr)
        /*"1,1 2,2 3,3 4,4"*/
        // debugger
    }

    render(){

        const pts = this._arrayToSVGPts(this.props.nav_BG_PTs);
        const pts_arr = this._ObjectToVectorArry(this.props.nav_BG_PTs,2);
        const vh = this.props.vh


        return(
            <div
             {...css({
                pointerEvents: 'none',
                width:  `100%`,
                height: `100%`,})}
            >
                <svg
                 {...css({
                    width:  `100%`,

                    // @ 修复 iphone safari svg上移问题
                    // height: `100vh`, //@
                    height: '100%',//@
                    position: 'fixed' ,//@
                    top: 0,//@
                })}>
                    <polygon
                        {...css({
                            width:  `100%`,
                            height: `100%`,
                            pointerEvents:'visiblePainted',//auto 相同svg 禁用了pointerEvents
                            cursor:'pointer',// 提示可关闭
                        })}
                     fill={ui.color.w_o1}
                     stroke="none"
                     points= {pts}
                    />
                </svg>
                {
                    pts_arr.map((item,index)=>
                        <div
                         {...css({
                            position:'absolute',
                            left:0,
                            top:0,
                            transform:`translate(${item[0]}px,${item[1]}px)`
                         })}
                         key= {`ptc_acr_index_${index}`}
                        >{index+1}</div>
                    )
                }
            </div>
        )
    }
}



const mapStateToProps = (state) => ({
    vw:state.Root.view_size.vw,
    vh:state.Root.view_size.vh,
    is_landscape:state.Root.view_size.is_landscape,
    // device:state.Root.device,
    // is_Scroll_up:state.Root.is_Scroll_up,
    nav_on:state.nav.on,
    nav_BG_PTs:state.nav.background_pts
});


const mapDispatchToProps = (dispatch ) =>{
    return {
        setBackGroundPoints:bindActionCreators(
            setBackGroundPoints, dispatch ),
    }
}

// export default Nav;
export default connect(mapStateToProps ,mapDispatchToProps)(SVG_BACKGROUND)




