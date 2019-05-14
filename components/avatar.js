
import {PureComponent} from 'react'
// import glamorous,{withTheme} from 'glamorous'
import {css} from 'glamor'

import {ui, GR, perspZ}  from 'utils/ui'
import {IMG_WithLoader} from './img'

import { connect } from 'react-redux'

// const Triangle = (props)=>
class Triangle extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        const size = this.props.size
        return(
            <svg
             {...css({
                width:size,
                position:'absolute'
             })}
             viewBox= {`0 0 1 1`}
            >
                <polygon
                 fill={ui.color.b_o2}
                 stroke="none"
                 points={
                    `0,0 `+//left_top
                    `1,0 `+//right_top
                    `0,1 `//right_bottom
                }
                />
            </svg>
        )
    }
}



// const Img = glamorous.div({
// },(props)=>{
//   width:   props.width,
//   height:  props.height,
//   //在这里找渐变模板 https: //webgradients.com/
//   // backgroundColor:  props.src?`url(${props.src})`:'white',
//   backgroundImage:  props.src?`url(${props.src})`:'white',
// })
//





// IMG_WithLoader
export class AVATAR extends PureComponent {
    constructor(props){
        super(props)
        this.PERSP = 1000;
        this.Zp = {
            pc:{
                title : perspZ(30,this.PERSP),
                img : perspZ(50,this.PERSP),
                tiangle : perspZ(10,this.PERSP),
            },
            mobile:{
                img : perspZ(30,this.PERSP),
                title : perspZ(50,this.PERSP),
                tiangle : perspZ(10,this.PERSP),
            }
        }
    }

    // perspZ =(translateZ , perspective)=>{
    //     const scale = 1 + (translateZ * -1) / perspective
    //     return `translateZ(${zp.translateZ}px) scale(${zp.scale});`
    // }

    render(){
        const zp = this.props.landscape?this.Zp.pc:this.Zp.mobile
        return(
            <div {...css({
                    position:'relative',
                    height:this.props.SizeWidth,
                    width:this.props.SizeWidth,
                    transformStyle: 'preserve-3d',
                 })}>

                {/*Triangle*/}
                <div
                {...css({
                    transform:`translateZ(${zp.tiangle.translateZ}px) scale(${zp.tiangle.scale})`
                 })}>
                    <Triangle
                     size = {this.props.SizeWidth}
                    />
                </div>
                {/*Triangle*/}

                {/*IMG*/}
                <div
                {...css({
                    transform:`translateZ(${zp.img.translateZ}px) scale(${zp.img.scale})`
                 })}>
                    <IMG_WithLoader
                     src={this.props.src}
                     height = {GR.px(1,this.props.SizeWidth)}
                     width = {GR.px(1,this.props.SizeWidth)}
                     top = {GR.px(3,this.props.SizeWidth)}
                     left = {GR.px(4,this.props.SizeWidth)}
                     fetch = {true}
                    />
                </div>
                {/*IMG*/}


                {/*TITLE*/}
                <div
                 {...css({
                    position:'absolute',
                    top:`${GR.px(5,this.props.SizeWidth)}px`,
                    left:`${GR.px(5,this.props.SizeWidth)}px`,
                    fontSize:`${GR.px(5,this.props.SizeWidth)}px`,
                    color:ui.color.w_2,
                    fontWeight:100,
                    transform:`translateZ(${zp.title.translateZ}px) scale(${zp.title.scale})`
                 })}
                >{this.props.name}</div>
                {/*TITLE*/}
            </div>
            )
    }
}




const mapStateToProps = (state) => {

    // const onClose = state.Section[ownProps.name].onClose
    return ({
        landscape:state.Root.view_size.is_landscape,
    });
}

// export default Nav;
export default connect(mapStateToProps ,null)(AVATAR)
