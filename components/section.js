// import  {Component} from 'react'
import fetch from 'isomorphic-fetch'
import { css } from 'glamor'
import {ui  ,GR ,makeKEY ,perspZ}  from '../utils/ui'
// import _IMG from './img.skew'
import _IMG from './img.parallax'
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
const BACKGROUND_COLOR = ui.color.w_1;
const BORDER_COLOR = ui.color.b_o3;
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
        this.TriangleHeight = this.props.is_landscape?GR.px(7,this.props.vw):GR.px(4,this.props.vw);
        this.PERSP = 1000;
        this.Zp = {
            pc:{
                title_backgound : perspZ(0,this.PERSP),
                title : perspZ(120,this.PERSP),
            },
            mobile:{
                title_backgound : perspZ(0,this.PERSP),
                title : perspZ(120,this.PERSP),
            }
        }
        this.zPos = perspZ(this.props.zPos,this.PERSP)
        this.ToggleFold=this.toggleFold.bind(this)
        //@this._height
        this._keyCtx=makeKEY()
        this.state = {height:'100%'}
    }

    // componentWillMount(){
        // debugger
        // console.log('willmount')
        // this.props.setClose(name,this.props.is_landscape?false:true)
    // }

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
    }


    render(){
        const zp = this.props.is_landscape?this.Zp.pc:this.Zp.mobile

        return (
            <div
             {...css({
                transformStyle: 'preserve-3d',//@parallax
                backgroundColor:BACKGROUND_COLOR,
                transform:`skew(0deg,-5deg) translateZ(${this.props.zPos.translateZ}px) scale(${this.props.zPos.scale})`,
                backfaceVisibility: 'hidden',//防止闪烁(flicker)
             })}
            key={`Section_${this._keyCtx}_${this.props.name}_${this.props.artista}`}

             >

                {/*HEADER----------------*/}
                <div {...css({// button
                        position:'relative',//不设static是因为close时content上移不会叠在上面header
                        top:0,
                        // zIndex:2,
                        width:'100vw',
                        transformStyle: 'preserve-3d',//@parallax
                        cursor: 'pointer',
                        backgroundColor:BACKGROUND_COLOR,
                        height:this.TriangleHeight,

                        transform:`translateZ(${zp.title_backgound.translateZ}px) scale(${zp.title_backgound.scale})`,

                        borderBottomWidth:'1px',
                        borderBottomStyle:'solid ',
                        borderBottomColor:BORDER_COLOR,
                        backfaceVisibility: 'hidden',//防止闪烁(flicker)
                    })}
                 onClick={this.ToggleFold}
                 ref={c => this._$folder = c}
                 className = {'SECTION_HEADER'}
                >
                    {/*title*/}
                    <div {...css({
                        position:'absolute',

                        fontSize:this.props.is_landscape?`${GR.vw(9)}vw`:`${GR.vw(6)}vw`,
                        fontWeight:100,
                        top:this.props.is_landscape?`${GR.vw(8)}vw`:`${GR.vw(5)}vw`,
                        left:this.props.is_landscape?`${GR.vw(4)}vw`:this.props.marginW,// artisti - avatar&& description 的marginLeft/marginWidth
                        // zIndex:3,
                        transform:`skew(0deg,5deg) translateZ(${zp.title.translateZ}px) scale(${zp.title.scale})`,
                        backfaceVisibility: 'hidden',//防止闪烁(flicker)
                        // 视差
                        // transformOrigin: '0 0',
                        // transform: 'translateZ(-2px) scale(4)',
                        })}>
                        {this.props.name}
                    </div>
                    {/*title*/}

                </div>{/*Header*/}

                {/*CONTENT-Warp*/}
                <div

                 {...css({
                    // backgroundColor:BACKGROUND_COLOR,
                    paddingBottom:`${this.TriangleHeight}px`,// 占位避免下方title覆盖内容
                    // 打开时 , 内容下一效果
                    transform:this.props.onClose
                        ?`translateY(-${this.TriangleHeight}px) `
                        :'translateY(0px) ',
                    height:this.props.onClose?'1px':`${this.state.height}`,
                    opacity:this.props.onClose?0:1,// 0.5更好 但关闭时会显示
                    pointerEvents:'none',
                    /*
                        * transformStyle ,willChange 都会造成内容在动画最后一刻位置刷新,闪烁一下
                        * willChange,会使 children 的translateZ效果 会失去
                     */
                    transformStyle: 'preserve-3d',//@parallax
                    transition: `all 1s cubic-bezier(0, 0.6, 0, 1)`,
                    overflowY: this.props.onClose?'hidden':'unset',//消除fold动画时scroll移动, 如果指定了合适的高度,可以只指定 hidden
                    backfaceVisibility: 'hidden',//防止闪烁(flicker)
                 })}
                 className = {'CONTENT_WARPPER'}
                 ref={c => this._$CONTENT = c}
                 >
                    {/*image*/}
                    {this.props.img?
                        <_IMG
                         src = {this.props.img}
                         vw = {this.props.vw}
                         fetch={!this.props.onClose}
                         width = {vw}
                         height={is_landscape?`${GR.px(2,vw)}`:`${GR.px(1,vw)}`}
                         fullWidth
                         key = {`section_head_img_${_keyCtx}`}
                        />
                        :null}
                    {/*image*/}



                    {/*contents */}
                    {this.props.items.map((item,index)=>
                        <_CONTENT
                         img = {item.img}
                         title = {item.title}
                         content = {item.content[`${this.props.language}`]}
                         marginW = {this.props.marginW}
                         key = {this._keyCtx+index+this.props.name}
                         fetch = {!this.props.onClose}
                         className = {'img_&&_content'}
                         index ={index}
                        />
                    )} {/*contents */}
                </div>{/*CONTENTS-Warp*/}
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



// {
//   section:'#0',
//   rect:{top:0,left:0,bottom:0,right:0,height:0,width:0},
//   isClose:false,//如果true,可以忽略这个单元请求
//   element:[
//     {name:'#0',rect:{top:0,left:0,bottom:0,right:0,height:0,width:0}},
//     {name:'#1',rect:{top:0,left:0,bottom:0,right:0,height:0,width:0}},
//     {
//         name:'#1',// 索引element,找到element的方式
//         rect:{top:0,left:0,bottom:0,right:0}},
//   ]
// }
