// import  {Component} from 'react'
import fetch from 'isomorphic-fetch'
import { css } from 'glamor'
import {ui  ,GR ,makeKEY}  from '../utils/ui'
import {IMG_WithLoader} from './img'
import { PureComponent } from 'react'

const _pubblic_key= makeKEY()
/**
 * _SVG_Top
 * @props  {float} width
 * @props  {float} height
 * @props  {string} color
 * @return {component}
 */

class _SVG_TopTriangle extends PureComponent{
    render(){
        const {width, height, color}=this.props
        return(
            <svg
             {...css({
                width:`${width}px`,
                height:`${height}px`,
            })}>
                <polygon
                 fill = {color}
                 points={
                    `0,0`+
                    ` ${width},0`+
                    ` 0,${height}`
                 }
                 />
                 <line
                  x1="0"
                  y1={height}
                  x2={width}
                  y2="0"
                  strokeWidth="1"
                  stroke={ui.color.b_o3}
                  />
            </svg>
        )
    }
}
// const _SVG_TopTriangle =( props )=>


/**
 * _SVG_Bottom
 * @props  {float} width
 * @props  {float} height
 * @props  {string} color
 * @return {component}
 */
// const _SVG_BottomTriangle = ( props ) =>
class _SVG_BottomTriangle extends PureComponent{
    render(){
        const { width, height, color}=this.props
        return(
            <svg {...css({
                width:`${width}px`,
                height:`${height}px`,
            })}>

                <polygon
                 fill = {color}

                 points={
                     `0,${height}`+
                     ` ${width},0`+
                     ` ${width},${height}`
                 }/>
                 <line
                  x1="0"
                  y1={height}
                  x2={width}
                  y2="0"
                  strokeWidth="1"
                  stroke={ui.color.b_o3}
                  />
            </svg>

        )
    }
}



/**
 * IMG
 * @props  {string} src  图片的地址
 * @props  {float} width
 * @props  {int} offset 是内嵌footer SVG 高度,是自身需要偏移
 * @props  {int} footColor 是内嵌footer SVG 颜色
 * @return {component}
 */
// const _ImgSection =(props)=>
class _ImgSection extends PureComponent{
    render(){
        const {
            offset,
            width,
            footColor,
            src,
            is_landscape,
            fetch
        } = this.props

        return(
            <div
             {...css({
                position:'relative',
                top:-offset,//IMG一律需要上移
                left:0,
                // zIndex:-1,
            })}>
                {/*Header*/}
                <div {...css({
                    width:'100vw',
                    height:`${offset}px`,
                    position:'absolute',
                    left:0,
                    zIndex:1,
                    top:`-1px`,// ????Img
                    /*????Img 背景下看到有误差
                    (和SVG无关 因为添加stroke strokeWidth依然无效)*/
                })}
                >
                    <_SVG_TopTriangle
                     width={width}
                     height= {offset}
                     color ={footColor}

                    />
                </div>
                <IMG_WithLoader
                 src={src}
                 width = {width}
                 height = {is_landscape?`${GR.px(2,width)}`:`${GR.px(1,width)}`}
                 left= {0}
                 top={0}
                 //active = {active}//初始false,避免请求导致setState on unMount
                 fetch={fetch}
                 key = {`${_pubblic_key}_sec_WithLoader`}
                />
                {/*footer*/}
                <div {...css({
                    width:'100%',
                    height:`${offset}px`,
                    position:'absolute',
                    left:0,
                    /*????Img 背景下看到有误差
                    (和SVG无关 因为添加stroke strokeWidth依然无效)*/
                    bottom:`-1px`,//
                })}
                >
                    <_SVG_BottomTriangle
                     width={width}
                     height= {offset}
                     color ={footColor}
                    />
                </div>{/*footer*/}
            </div>

        )
    }
}



/**
 * CONTENT 可容纳 IMG
 * @props  {string} title  内容标题(暂时不添加)
 * @props  {string} img  内容图片地址
 * @props  {string} content  内容叙述
 * @props  {float} width 一般指设备屏幕宽度
 * @props  {string} color 是内嵌SVG 颜色
 * @props  {int} marginW 文本左右 margin
 * @props  {int} key 允许迭代生成
 * @return {component}
 */
const _content = (props)=>
    <div
     {...css({
        position:'relative',
        zIndex:-2,
        // // display:props.close?'none':'inline-block'
        // display:'inline-block',
        visibility:props.close?'hidden':'visible',
        height:props.close?0:'auto',
        overflow:props.close?'hidden':'unset',
        // // // marginBottom:props.close ?'0px':'-100px',
        transform:`translateY(${props.close?-100:0}px)`,
        pointerEvents:`${props.close?'none':'auto'}`,
        transition: `all 1s cubic-bezier(0, 0.6, 0, 1)`,
        willChange: 'transform',
     })}
    >
        {/*图片IMG*/}
        {props.img?
            <_ImgSection
             src = {props.img}
             width = {props.vw}
             offset = {props.offset}
             footColor = {props.footColor}
             // show = {!props.close}
             fetch={props.fetch}
             is_landscape = {props.is_landscape}
            />
        :null}

        {/*文字*/}
        <div
         {...css({
            position:'relative',
            display:'inline-block',//XXX-block的话,不显示的时候会占用高度
            fontSize:props.is_landscape?`${GR.vw(9)}vw`:`1rem`,
            fontWeight:100,
            top:props.img?`${-props.offset}px`:0,//迟早要还的
            marginLeft:props.marginW,
            marginRight:props.marginW,
            marginTop:props.is_landscape?`${GR.vw(8)}vw`:`${GR.vw(5)}vw`,
            marginBottom:props.is_landscape?`${GR.vw(8)}vw`:`${GR.vw(6)}vw`,

            transition: `all 1s cubic-bezier(0, 0.6, 0, 1)`,
            willChange: 'margin-top,margin-bottom',

        })}
         className= '_content_word'
         >
            {props.content
                .split('\n')
                .map((p, key) =>
                    <div
                     {...css({
                        marginBottom:props.close ?
                        '0px'
                        :props.is_landscape?`${GR.vw(9)}
                        vw`:`${GR.vw(8)}vw`})}
                     key={`Section_content_`+key}
                     >
                        {p}<br/>
                     </div>
                )}
        </div>
    </div>



/**
 * SECTION 组件
 * @props  {STRING} name (option) SECTION菜单的(导航标题)
 * @props  {STRING} img  (option)如果有首图,设置图片地址
 * @props  {ARRAY} items 传入数组{Object}对象, 每个对象包含会 {title} {img} {contents}
 * @props  {langueage} 方便组件内 map /过滤 语种内容
 * @props  {INT} vw 设备屏幕宽度
 * @props  {INT} offset 如果组件上放有IMG带有svg,减去SVG的高度,迟早要还的
 * @props  {INT} color 是内嵌 SVG 颜色
 * @props  {INT} marginW 文本左右 margin margin on Width
 * @props  {FLOAT} maxHeight 展开动画必须设置
 *
 * @state  {INT} maxHeight 用于content折叠 fold 动画
 * @return {COMPONENT}
 */

// const button = (props)=>
//     <div
//      {...css({
//         width:'100vw',
//         height:`${props.height}`
//     })}
//      onClick={}
//     />
//
//



 class Seczione extends PureComponent {

    constructor (props) {
      super(props)
      this.TriangleHeight = this.props.is_landscape?GR.px(7,this.props.vw):GR.px(4,this.props.vw)
      this.ToggleFold=this.toggleFold.bind(this)
      this.state={
        close:false,//先计算_height ,在close
        //maxHeight:'auto',//供折叠动画
        fetch:false
      }
      //@this._height
      this._keyCtx=makeKEY()

    }

    // componentWillMount(){
        //先计算_height ,在close
        // this.init_Fold()

    // }
    componentDidMount(){
        // if(this.props.name=="WORKS")console.log('WORKS-componentDidMount')
        //先计算_height ,在close
        // this._maxHeight=this._$folder.clientHeight
        this.setState({
                maxHeight:0,
                close:true,
        })
    }

    // componentWillReceiveProps(nextProps,nextState){
        // console.log(`section ${this.props.name} -componentWillReceiveProps`)
    // }

    // componentDidUpdate(nextProps,nextState){
        // console.log(`section ${this.props.name} -componentDidUpdate`)
        // console.log(`${this.props.name} componentDidUpdate \nnextProps:${JSON.stringify(nextState)}\nthis.props:${JSON.stringify(this.state)}`)
    // }


    //设置 auto 不需要 预展开一次来获取高度
    // init_Fold = () =>{ // fold 展开后 ,根据情况获取高度

        // console.log('init_Fold 高度初始化:',this._$folder.clientHeight)

        // this._height = this._$folder.clientHeight;
    // }

    toggleFold(){
        console.log('toggle')

        // debugger
        this.setState(
            {
                close:!this.state.close,
                fetch:true
            },
            // ()=>{this._foldding = false}
        )
    }


    render(){
        // const TriangleHeight = GR.px(4,this.props.vw)
        return (
            <div
             // {...fullWidthRelative}
             {...css({position:'relative',zIndex:this.props.z})}>

                {/*HEADER--------------------
                    DIV_Click
                        TOP SVG
                        SECTION NAME
                        IMGE(Option?)
                */}
                <div {...css({
                        position:'relative',
                        zIndex:1,
                        width:'100%',
                        top:0,
                        left:0,
                        cursor: 'pointer',
                    })}
                 onClick={this.ToggleFold}
                >

                    {/*TOP SVG*/}
                    <div {...css({
                        position:'relative',
                        zIndex:1,
                        width:'100%',
                        height:this.TriangleHeight,
                        /*????Img 背景下看到有误差
                        (和SVG无关 因为添加stroke strokeWidth依然无效)*/
                        top:`0px`,// ????Img
                        })}>
                        <_SVG_TopTriangle
                         width={this.props.vw}
                         height= {this.TriangleHeight}
                         color ={this.props.color}
                        />
                    </div>






                    {/*name*/}
                    <div {...css({
                        position:'absolute',
                        fontSize:this.props.is_landscape?`${GR.vw(9)}vw`:`${GR.vw(6)}vw`,
                        fontWeight:100,
                        top:this.props.is_landscape?`${GR.vw(8)}vw`:`${GR.vw(5)}vw`,
                        left:this.props.is_landscape?`${GR.vw(4)}vw`:this.props.marginW,// artisti - avatar&& description 的marginLeft/marginWidth
                        zIndex:1,
                        })}>
                        {this.props.name}
                    </div>

                </div>{/*Header*/}


                <div
                 // ref={c => this._$folder = c}
                 {...css({
                    position:'relative',
                    zIndex:0,
                    height:this.state.close?0:'auto',//不再需要预算 this._height
                    maxHeight:this.state.close?0:'auto',//不再需要预算 this._height

                    transition: `all 1s cubic-bezier(0, 0.6, 0, 1)`,
                    willChange: 'max-height,opacity',
                    opacity:this.state.close?0:1,
                    // visibility:this.state.close?'hidden':'collapse',
                    // display:this.state.close?'none':'block',
                    // overflow: this.state.close?'auto':'unset',//消除fold动画时scroll移动
                    overflow: 'unset',//消除fold动画时scroll移动
                 })}

                 >
                    {/*image--------------------*/}
                    {this.props.img?
                        <_ImgSection
                         src = {this.props.img}
                         width = {this.props.vw}
                         offset = {this.TriangleHeight}
                         footColor = {this.props.color}
                         fetch={this.state.fetch}
                        />
                        :null}
                    {/*CONTENTS--------------------*/}
                    {/*object 的内容*/}
                    {this.props.items.map((item,index)=>
                            <_content
                             img = {item.img}
                             title = {item.title}
                             content = {item.content[`${this.props.language}`]}
                             vw = {this.props.vw}
                             offset = {this.TriangleHeight}
                             footColor = {this.props.color}
                             marginW = {this.props.marginW}
                             key={this._keyCtx+index}
                             is_landscape={this.props.is_landscape}

                             close = {this.state.close}
                             fetch={this.state.fetch}
                            />
                    )}
                </div>


            </div>
        )
    }
}




export default Seczione;
