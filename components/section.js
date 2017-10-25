// import  {Component} from 'react'
import fetch from 'isomorphic-fetch'
import { css } from 'glamor'
import {ui  ,GR ,makeKEY}  from '../utils/ui'
import _IMG_SKEW from './section.img'
import _CONTENT from './section.content'
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {setSectionPostionY,setClose,setFetch} from '~/reducers/section'
import {findPos} from '~/utils/mouse'
/*
参考 https://wangwang.taobao.com/+
    div transform: skew(0deg,-5deg) relative
        div transform: skew(0deg,5deg); absolute
 */

const _pubblic_key= makeKEY()


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
        this.state = {height:'100%'}
    }

    componentWillMount(){
        // debugger
        // console.log('willmount')
        // this.props.setClose(name,this.props.is_landscape?false:true)
    }

    componentWillReceiveProps(nextProps){
        if(this.props.onScrollingY!==nextProps.onScrollingY){

        }
        if(nextProps.RePosTrigger>this.props.RePosTrigger){
            if(nextProps.RePosTrigger){
                this.reSetPosition()
            }
        }
    }

    // shouldComponentUpdate(nextProps){
    //     if(this.props.RePosTrigger!==undefined&&nextProps.RePosTrigger!==undefined&&nextProps.RePosTrigger!==this.props.RePosTrigger){
    //         return false
    //     }else{
    //         return true
    //     }
    // }`
    componentDidMount(){
        // debugger
        //计算 section 高度, height 动画必须
        const height = this._$CONTENT.getBoundingClientRect().height
        this.setState({height:`${height}px`})

        // onClose 状态手机和电脑(lanscape)不一样
        const name = this.props.name
        this.props.is_landscape?this.props.setClose(name,false)
                                :this.props.setClose(name,true)



        // mount 后,  随时激活的fetch
        // debugger
        // if(nextProps.fetch ==true && this.props.fetch==false||this.props.fetch==undefined) {
        //   const inView = this._elementInViewport(this._$loaderImg)
        //   // console.log(inView)
        //   if(inView) this.fetchImg()
        //   // this.fetchImg()
        //   return

        // }
    }
    componentWillUnmount(){
        // 卸载时还原到初始状态
        // componentDidMount ,mapStateToProps 分别定义了初始状态
        this.setState({height:`100%`})
        this.props.setClose(this.props.name,false)
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

        return (
            <div
             {...css({
                // height:this.TriangleHeight,
                // position:'relative',
                // zIndex:this.props.z,
                // zIndex:1
            })}
            key={`Section_${this._keyCtx}_${this.props.name}_${this.props.artista}`}

             >

                {/*HEADER----------------*/}
                <div {...css({
                        position:'relative',//不设static是因为close时content上移不会叠在上面header
                        zIndex:2,
                        width:'100vw',
                        // top:0,
                        // left:0,
                        cursor: 'pointer',
                        // height:'auto',
                        backgroundColor:ui.color.w_1,
                        height:this.TriangleHeight,
                        transform:`skew(0deg,5deg) translateZ(0)`,
                        borderBottomWidth:'1px',
                        borderBottomStyle:'solid ',
                        borderBottomColor:ui.color.b_o3,
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
                    {/*name*/}
                    <div {...css({
                        position:'absolute',

                        fontSize:this.props.is_landscape?`${GR.vw(9)}vw`:`${GR.vw(6)}vw`,
                        fontWeight:100,
                        top:this.props.is_landscape?`${GR.vw(8)}vw`:`${GR.vw(5)}vw`,
                        left:this.props.is_landscape?`${GR.vw(4)}vw`:this.props.marginW,// artisti - avatar&& description 的marginLeft/marginWidth
                        zIndex:3,
                        transform:`skew(0deg,-5deg) translateZ(0)`,
                        // 视差
                        // transformOrigin: '0 0',
                        // transform: 'translateZ(-2px) scale(4)',
                        })}>
                        {this.props.name}
                    </div>

                </div>{/*Header*/}

                {/*CONTENT*/}
                <div

                 {...css({
                    // height:'100%',
                    // maxHeight:this.props.onClose?'0px':'2000px',
                    height:this.props.onClose?'1px':`${this.state.height}`,

                    transform:this.props.onClose?`translateZ(0px) translateY(-${this.TriangleHeight}px) scale(1,0.9)`:
                                                'translateZ(0px) translateY(0px) scale(1,1)',
                    transformOrigin: '50% 50%',
                    opacity:this.props.onClose?0.5:1,
                    pointerEvents:'none',
                    transition: `all 1s cubic-bezier(0, 0.6, 0, 1)`,
                    willChange: 'transform,visibility,max-height,height ,overflow,opacity',
                    overflow: this.props.onClose?'hidden':'unset',//消除fold动画时scroll移动, 如果指定了合适的高度,可以只指定 hidden
                    // visibility:this.props.onClose?'hidden':'collapse',
                 })}
                 className = {'SECTION_CONTENT'}
                 ref={c => this._$CONTENT = c}
                 >
                {/*image--------------------*/}
                {this.props.img?
                    <_IMG_SKEW
                     src = {this.props.img}
                     vw = {this.props.vw}
                     fetch={!this.props.onClose}
                     width = {vw}
                     height={is_landscape?`${GR.px(2,vw)}`:`${GR.px(1,vw)}`}
                     key = {`section_head_img_${_keyCtx}`}
                    />
                    :null}

                {/*CONTENTS--------------------*/}
                {/*object 的内容*/}
                {this.props.items.map((item,index)=>
                        <_CONTENT
                         img = {item.img}
                         title = {item.title}
                         content = {item.content[`${this.props.language}`]}
                         marginW = {this.props.marginW}
                         key= {this._keyCtx+index+this.props.name}
                         close = {this.props.onClose}
                         fetch = {!this.props.onClose}
                         className = {'img_in_content'}
                        />
                )}
                </div>

            </div>
        )
    }
}
// language
// vw
// is_landscape
const mapStateToProps = (state,ownProps) => {
    const onClose = state.Section[ownProps.name]!==undefined?state.Section[ownProps.name].onClose:false

    // const onClose = state.Section[ownProps.name].onClose
    return ({
        vw:state.Root.view_size.vw,
        language:state.Root.language,
        is_landscape:state.Root.view_size.is_landscape,
        RePosTrigger:state.Section.RePosTrigger,
        onClose:onClose,
        onScrollingY:state.Root.scroll.y,
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
