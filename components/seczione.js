import  {Component} from 'react'
import fetch from 'isomorphic-fetch'
import { css } from 'glamor'
import {ui  ,GR ,makeKEY}  from '../utils/ui'
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
         // strokeWidth="5"
         // stroke={ui.color.w_2}
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
        // zIndex:-1,
    })}>
        {/*Header*/}
        <div {...css({
            width:'100vw',
            height:`${props.offset}px`,
            position:'absolute',
            left:0,
            zIndex:1,
            top:`-1px`,// ????Img
            /*????Img 背景下看到有误差
            (和SVG无关 因为添加stroke strokeWidth依然无效)*/
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
         left= {0}
         top={0}
         active = {props.active}//初始false,避免请求导致setState on unMount
         fetch={props.fetch}
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
    <div>
        {/*图片IMG*/}
        {props.img?
            <_img
             src = {props.img}
             width = {props.vw}
             offset = {props.offset}
             footColor = {props.footColor}
             maxHeight = {props.maxHeight}
             active = {!props.close}
             fetch={props.fetch}
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
            marginTop:props.close?`-50px`:`${GR.vw(5)}vw`,
            marginBottom:props.close?`-50px`:`${GR.vw(6)}vw`,

            transition: `all 1s cubic-bezier(0, 0.6, 0, 1)`,
            willChange: 'margin-top,margin-bottom',

        })}

         >
            {props.content
                .split('\n')
                .map((p, key) =>
                    <div
                     {...css({
                        marginBottom:props.close
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

 class Seczione extends Component {

    constructor (props) {
      super(props)
      this.TriangleHeight = GR.px(4,this.props.vw)
      this.ToggleFold=this.toggleFold.bind(this)
      this.state={
        close:false,//先计算_height ,在close
        maxHeight:'auto',//供折叠动画
        fetch:false
      }
      //@this._height
      this._keyCtx=makeKEY()

    }

    componentWillMount(){
        //先计算_height ,在close
        // this.init_Fold()

    }
    componentDidMount(){
        if(this.props.name=="WORKS")console.log('WORKS-componentDidMount')
            // debugger
        this._maxHeight=this._$folder.clientHeight
        this.setState({
                maxHeight:0,
                close:true,
                }
            )

        // console.log('this._$folder',this._$folder)
        // console.log('this._height',this._height)
        // console.log('this._$folder.clientHeight',this._$folder.clientHeight)
        // debugger
        this.init_Fold()
    }

    componentWillReceiveProps(nextProps,nextState){
        if(this.props.name=="WORKS")console.log('WORKS-componentWillReceiveProps',nextProps)

        // this.setState({maxHeight:(nextState.close==true?0:this._height)})


    }

    componentDidUpdate(){
        if(this.props.name=="WORKS")console.log('WORKS-componentDidUpdate')
        // if(this.props.name=='EVENTS'){debugger}
        if(this.state.maxHeight==null) return; //componentDidMount的更新
        // if(this._foldding == false ) this.init_Fold()
    }



    init_Fold = () =>{ // fold 展开后 ,根据情况获取高度

        console.log('init_Fold 高度初始化:',this._$folder.clientHeight)

        this._height = this._$folder.clientHeight;
        // 避免重复setState
        // if (this._$folder.clientHeight != this.state.maxHeight) {
        //     this._foldding = true //避免setState 更新componentDidUpdate死循环循环
        //     // if(this.props.name=="WORKS"){debugger}
        //     // this.setState({
        //     //     maxHeight:this._$folder.clientHeight,
        //     //     // close:true,
        //     //     },
        //     //     ()=>{this._foldding = false}
        //     // )
        // }else {
        //     console.error('init_Fold 重复')
        //     debugger
        // }
    }

    toggleFold(){
        console.log('toggle')
        // debugger
        this.setState(
            {
                close:!this.state.close,
                fetch:true
            },
            ()=>{this._foldding = false}
        )
    }


    render(){
        // const TriangleHeight = GR.px(4,this.props.vw)
        return (
            <div
             // {...fullWidthRelative}
             {...css({
                position:'relative',})}

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
                        cursor: 'auto',

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
                        fontSize:`${GR.vw(6)}vw`,
                        fontWeight:100,
                        top:`${GR.vw(5)}vw`,
                        left:this.props.marginW,
                        zIndex:2,
                        })}>
                        {this.props.name}
                    </div>

                </div>{/*Header*/}


                <div
                 ref={c => this._$folder = c}
                 {...css({
                    position:'relative',
                    zIndex:0,
                    maxHeight:this.state.close?'0px':this._height,
                    transition: `all 1s cubic-bezier(0, 0.6, 0, 1)`,
                    willChange: 'max-height,opacity',
                    opacity:this.state.close?0:1,
                    overflow: this.state.close?'auto':'unset',//消除fold动画时scroll移动
                 })}
                 >
                    {/*image--------------------*/}
                    {this.props.img?
                        <_img
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

                             // maxHeight= {this.state.maxHeight}
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
