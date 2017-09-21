import  {Component} from 'react'
import fetch from 'isomorphic-fetch'
import { css } from 'glamor'
import {ui  ,GR}  from '../utils/ui'
import {IMG_WithLoader} from './img'




/**
 * _SVG_Top
 * @props  {float} width
 * @props  {float} height
 * @props  {string} color
 * @return {component}
 */
const _SVG_TopTriangle =( props )=>
    <svg
     {...css({
        width:`${props.width}px`,
        height:`${props.height}px`,
    })}>
        <polygon
         fill = {props.color}
         points={
            `0,0`+
            ` ${props.width},0`+
            ` 0,${props.height}`
         }
         />
         <line
          x1="0"
          y1={props.height}
          x2={props.width}
          y2="0"
          strokeWidth="1"
          stroke={ui.color.b_o3}
          />
    </svg>

/**
 * _SVG_Bottom
 * @props  {float} width
 * @props  {float} height
 * @props  {string} color
 * @return {component}
 */
const _SVG_BottomTriangle = ( props ) =>
    <svg {...css({
        width:`${props.width}px`,
        height:`${props.height}px`,
    })}>

        <polygon
         fill = {props.color}
         points={
             `0,${props.height}`+
             ` ${props.width},0`+
             ` ${props.width},${props.height}`
         }/>
         <line
          x1="0"
          y1={props.height}
          x2={props.width}
          y2="0"
          strokeWidth="1"
          stroke={ui.color.b_o3}
          />
    </svg>


/**
 * IMG
 * @props  {string} src  图片的地址
 * @props  {float} width
 * @props  {int} offset 是内嵌footer SVG 高度,是自身需要偏移
 * @props  {int} footColor 是内嵌footer SVG 颜色
 * @return {component}
 */
const _img =(props)=>
    <div
     {...css({
        position:'relative',
        top:-props.offset,//IMG一律需要上移
        left:0,
        zIndex:-1,
        // display:props.close?'none':'block'
    })}>
        {/*Header*/}
        <div {...css({
            width:'100%',
            height:`${props.offset}px`,
            position:'absolute',
            left:0,
            zIndex:1,
            /*????Img 背景下看到有误差
            (和SVG无关 因为添加stroke strokeWidth依然无效)*/
            // top:`-1px`,//
        })}
        >
            <_SVG_TopTriangle
             width={props.width}
             height= {props.offset}
             color ={props.footColor}
            />
        </div>
        <IMG_WithLoader
         src={props.src}
         width = {props.width}
         height = {`${GR.px(1,props.width)}`}
         active = {true}
         left= {0}
         top={0}
        />
        {/*footer*/}
        <div {...css({
            width:'100%',
            height:`${props.offset}px`,
            position:'absolute',
            left:0,
            /*????Img 背景下看到有误差
            (和SVG无关 因为添加stroke strokeWidth依然无效)*/
            bottom:`-1px`,//
        })}
        >
            <_SVG_BottomTriangle
             width={props.width}
             height= {props.offset}
             color ={props.footColor}
            />
        </div>{/*footer*/}
    </div>


/**
 * CONTENT 可容纳 IMG
 * @props  {string} title  内容标题(暂时不添加)
 * @props  {string} img  内容图片地址
 * @props  {string} content  内容叙述
 * @props  {float} width 一般指设备屏幕宽度
 * @props  {float} maxHeight 用于fold折叠动画
 * @props  {string} color 是内嵌SVG 颜色
 * @props  {int} marginW 文本左右 margin
 * @props  {int} key 允许迭代生成
 * @return {component}
 */
const _content = (props)=>
    <div
     {...css({
            opacity:props.close?'0':`1`,
            maxHeight: props.close?'0px':`${props.maxHeight}px`,
            // transform:props.close?`translateY(-20px)`:`translateY(0px)`,
            overflow: props.close?'auto':'scoll',//消除fold动画时scroll移动
            transition: `all 1.2s cubic-bezier(0, 0.6, 0, 1)`,
            willChange: 'overflow  ,opacity , max-height',
        })}

    >

        {/*图片IMG*/}
        {props.img?
            <_img
             src = {props.img}
             width = {props.vw}
             offset = {props.offset}
             footColor = {props.footColor}
             maxHeight = {props.maxHeight}// 动画
             close = {props.close}
            />
            :null}

        {/*文字*/}
        <div
         {...css({
            position:'relative',

            fontSize:`${GR.vw(7)}vw`,
            fontWeight:100,
            top:props.img?`${-props.offset}px`:0,//迟早要还的
            marginLeft:props.marginW,
            marginRight:props.marginW,
            marginTop:props.close?`0px`:`${GR.vw(5)}vw`,
            marginBottom:props.close?`0px`:`${GR.vw(6)}vw`,
            // display:props.close?'none':'block',

            maxHeight: props.close?'0px':`${props.maxHeight}px`,
            transition: `all 2s cubic-bezier(0, 0.6, 0, 1)`,
            willChange: 'margin-top,margin-bottom',
        })}

         >
            {props.content
                .split('\n')
                .map((p, key) =>
                    <div
                     {...css({marginBottom:props.close
                        ?'0px'
                        :`${GR.vw(8)}vw`
                    })}
                     key={key}
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

 class Seczione extends Component {

    constructor (props) {
      super(props)
      this.TriangleHeight = GR.px(4,this.props.vw)
      this.state={
        close:false,
      }
      this.ToggleFold=this.toggleFold.bind(this)
    }

    componentDidMount(){
        this.initFold()
    }

    initFold = () =>{
        console.log('ll',this._folder.clientHeight)
        this.setState({maxHeight:this._folder.clientHeight})
        this.setState({close:true})
    }

    toggleFold(){
        console.log('toggle')
        this.setState({close:!this.state.close})
    }

    getContentHeight(){
        console.log(this._folder)
    }



    render(){
        // const TriangleHeight = GR.px(4,this.props.vw)
        return (
            <div
             // {...fullWidthRelative}
             {...css({position:'relative'})}
             >
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
                        // top:`-1px`,// ????Img
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
                        fontSize:`${GR.vw(6)}vw`,
                        fontWeight:100,
                        top:`${GR.vw(5)}vw`,
                        left:this.props.marginW,
                        zIndex:2,
                        })}>
                        {this.props.name}
                    </div>
                </div>{/*Header*/}

                <div ref={c => this._folder = c}>
                {/*image--------------------*/}
                {this.props.img?
                    <_img
                     src = {this.props.img}
                     width = {this.props.vw}
                     offset = {this.TriangleHeight}
                     footColor = {this.props.color}
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
                         key={index}

                         maxHeight= {this.state.maxHeight}
                         close = {this.state.close}
                        />
                )}
                </div>
            </div>
        )
    }
}




export default Seczione;
