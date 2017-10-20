// import  {Component} from 'react'
import fetch from 'isomorphic-fetch'
import { css } from 'glamor'
import {ui  ,GR ,makeKEY}  from '../utils/ui'
import {IMG_WithLoader} from './img'
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {setSectionPostionY,setClose,setFetch} from '~/reducers/section'
import {findPos} from '~/utils/mouse'


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
                width:'100%',
                height:`${height}px`,
                fontSize: 0,
                whiteSpace: 'nowrap',
            })}>
                <polygon
                 fill = {color}
                 points={
                    `0,0`+
                    ` ${width},0`+
                    ` 0,${height}`
                 }
                 overflow='hidden'
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


/**
 * _SVG_Bottom
 * @props  {float} width
 * @props  {float} height
 * @props  {string} color
 * @return {component}
 */
class _SVG_BottomTriangle extends PureComponent{

    render(){
        const { width, height, color}=this.props
        return(
            <svg {...css({
                width:'100%',//`${width}px`,
                height:`${height}px`,
                fontSize: 0,
                // whiteSpace: 'nowrap',
            })}>

                <polygon
                 fill = {color}

                 points={
                     `0,${height}`+
                     ` ${width},0`+
                     ` ${width},${height}`
                 }
                 overflow='hidden'/>
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
// const _img_in_Section =(props)=>
class _img_in_Section extends PureComponent{

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
            })}>
                {/*TOP*/}
                <div {...css({
                    width:'100%',
                    height:`${offset}px`,
                    position:'absolute',
                    zIndex:1,
                    left:0,
                    top:`-1px`,// ????Img
                    /*????Img 背景下看到有误差
                    (和SVG无关 因为添加stroke strokeWidth依然无效)*/
                })}
                >
                    <_SVG_TopTriangle
                     width= {width}
                     height= {offset}
                     color= {footColor}
                    />
                </div>{/*TOP*/}


                <IMG_WithLoader
                 src={src}
                 width = {width}
                 height = {is_landscape?`${GR.px(2,width)}`:`${GR.px(1,width)}`}
                 left= {0}
                 top={0}
                 fetch={fetch}
                 key = {`${_pubblic_key}_sec_WithLoader`}
                 fullWidth = {true}
                 //active = {active}//初始false,避免请求导致setState on unMount
                />


                {/*BOTTOM*/}
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
                     height={offset}
                     color ={footColor}
                    />
                </div>{/*BOTTOM*/}
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
        visibility:props.close?'hidden':'visible',
        height:props.close?0:'auto',
        overflow:props.close?'hidden':'unset',
        transform:`translateY(${props.close?-100:0}px)`,
        pointerEvents:`${props.close?'none':'auto'}`,
        transition: `all 1s cubic-bezier(0, 0.6, 0, 1)`,
        willChange: 'transformvisibility,height,overflow',
     })}
    >
        {/*图片IMG*/}
        {props.img?
            <_img_in_Section
             src = {props.img}
             width = {props.vw}
             offset = {props.offset}
             footColor = {props.footColor}
             fetch={props.fetch}
             is_landscape = {props.is_landscape}
            />
        :null}

        {/*文字*/}
        <div
         {...css({
            position:'relative',
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
// language
// vw
// is_landscape

 class Seczione extends PureComponent {

    constructor (props) {
        super(props)
        this.TriangleHeight = this.props.is_landscape?GR.px(7,this.props.vw):GR.px(4,this.props.vw)
        this.ToggleFold=this.toggleFold.bind(this)
        //@this._height
        this._keyCtx=makeKEY()
    }

    componentWillMount(){
        // debugger
        // console.log('willmount')
        // this.props.setClose(name,this.props.is_landscape?false:true)
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.RePosTrigger>this.props.RePosTrigger){
            if(nextProps.RePosTrigger){
                this.reSetPosition()
            }
        }
    }

    shouldComponentUpdate(nextProps){
        if(this.props.RePosTrigger!==undefined&&nextProps.RePosTrigger!==undefined&&nextProps.RePosTrigger!==this.props.RePosTrigger){
            return false
        }else{
            return true
        }
    }

    componentDidMount(){
        const name = this.props.name
        this.props.is_landscape?this.props.setClose(name,false):this.props.setClose(name,true)
    }
    toggleFold(){
        console.log('toggle')
        this.props.setClose(this.props.name,!this.props.onClose)
    }


    reSetPosition(){
        this.props.setSectionPostionY(this.props.name, findPos(this._$folder));
        //以相对可见位置:.getBoundingClientRect();
    }


    render(){

        // const TriangleHeight = GR.px(4,this.props.vw)
        return (
            <div
             // {...fullWidthRelative}
             {...css({
                position:'relative',
                zIndex:this.props.z
                // zIndex:1
            })}>

                {/*HEADER----------------*/}
                <div {...css({
                        position:'relative',
                        zIndex:2,
                        width:'100%',
                        top:0,
                        left:0,
                        cursor: 'pointer',
                        //视差
                        // transformStyle: 'preserve-3d',
                        // perspectiveOrigin: '0 0',
                        // perspective: '1px',
                        //视差
                    })}
                 onClick={this.ToggleFold}
                 ref={c => this._$folder = c}
                 className = {'SECTION_HEADER'}
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

                        // 视差
                        // transformOrigin: '0 0',
                        // transform: 'translateZ(-4px) scale(3)',
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
                        zIndex:3,
                        // 视差
                        // transformOrigin: '0 0',
                        // transform: 'translateZ(-2px) scale(4)',
                        })}>
                        {this.props.name}
                    </div>

                </div>{/*Header*/}


                <div

                 {...css({
                    position:'relative',
                    zIndex:-1,
                    height:this.props.onClose?0:'auto',//不再需要预算 this._height
                    transition: `all 1s cubic-bezier(0, 0.6, 0, 1)`,
                    willChange: 'max-height,opacity',
                    opacity:this.props.onClose?0:1,
                    // visibility:this.props.onClose?'hidden':'collapse',
                    // display:this.props.onClose?'none':'block',
                    // overflow: this.props.onClose?'auto':'unset',//消除fold动画时scroll移动
                    overflow: 'unset',//消除fold动画时scroll移动
                 })}

                 >
                    {/*image--------------------*/}
                    {this.props.img?
                        <_img_in_Section
                         src = {this.props.img}
                         width = {this.props.vw}
                         offset = {this.TriangleHeight}
                         footColor = {this.props.color}
                         fetch={!this.props.onClose}
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

                             close = {this.props.onClose}
                             fetch={!this.props.onClose}
                            />
                    )}
                </div>
                {/*BOTTOM SVG*/}
                <div {...css({
                    position:'absolute',
                    zIndex:1,
                    width:'100%',
                    height:this.props.onClose?0:this.TriangleHeight,//Content close的时候遮挡出血
                    opacity:this.props.onClose?1:0,//Content close的时候遮挡出血
                    transition: `all 1s cubic-bezier(0, 0.6, 0, 1)`,
                    willChange: 'height,opacity',
                    /*????Img 背景下看到有误差
                    (和SVG无关 因为添加stroke strokeWidth依然无效)*/
                    top:0,// ????Img
                    // whiteSpace: 'nowrap',
                    })}>
                    <_SVG_BottomTriangle
                     width={this.props.vw}
                     height= {this.TriangleHeight}
                     color ={this.props.color}
                     // color ={'red'}
                    />
                </div>
            </div>
        )
    }
}
// language
// vw
// is_landscape
const mapStateToProps = (state,ownProps) => {
    const onClose = state.Section[ownProps.name]!==undefined?state.Section[ownProps.name].onClose:true

    // const onClose = state.Section[ownProps.name].onClose
    return ({
        vw:state.Root.view_size.vw,
        language:state.Root.language,
        is_landscape:state.Root.view_size.is_landscape,
        RePosTrigger:state.Section.RePosTrigger,
        onClose:onClose,
    });
}


const mapDispatchToProps = (dispatch ) =>{
    return {
        setSectionPostionY:bindActionCreators(setSectionPostionY, dispatch ),
        setClose:bindActionCreators(setClose, dispatch ),
    }
}

// export default Nav;
export default connect(mapStateToProps ,mapDispatchToProps)(Seczione)
