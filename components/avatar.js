
import React, {Component} from 'react'
import glamorous,{withTheme} from 'glamorous'
import {css} from 'glamor'
import NoSSR from 'react-no-ssr';

import {ui  ,GR}  from '../utils/ui'
import {IMG_WithLoader} from './img'

const Triangle = (props)=>
    <svg
     {...css({
        width:props.SizeWidth,
        position:'absolute'
     })}
     viewBox= {`0 0 1 1`}
    >
        <polygon
         fill={ui.color.b_o1}
         // display = {!props.isLandscape}
         stroke="none"
         points={
            `0,0 `+//left_top
            `1,0 `+//right_top
            `0,1 `//right_bottom
        }
        />

    </svg>


// const Img = glamorous.div({

// },(props)=>{
//   width:   props.width,
//   height:  props.height,
//   //在这里找渐变模板 https: //webgradients.com/
//   // backgroundColor:  props.src?`url(${props.src})`:'white',
//   backgroundImage:  props.src?`url(${props.src})`:'white',
// })
//
//


// IMG_WithLoader
export class AVATAR extends Component {
    constructor(props){
        super(props)
        // this.state={}
    }

    render(){
        const rem =this.props.SizeWidth/10;
        return(
            <div {...css({
                    position:'relative',
                 })}>


                <Triangle
                 SizeWidth = {this.props.SizeWidth}
                />

                {/*NAME*/}
                <div
                 {...css({
                    position:'absolute',
                    top:`${GR.px(7,this.props.SizeWidth)}px`,
                    left:`${GR.px(7,this.props.SizeWidth)}px`,
                    fontSize:`${GR.px(5,this.props.SizeWidth)}px`,
                    color:ui.color.w_2,
                    fontWeight:100
                 })}
                >{this.props.name}</div>

                {/*IMG*/}
                {/*需要 <NoSSR>*/}
                <IMG_WithLoader
                 src={this.props.src}
                 width = {GR.px(1,this.props.SizeWidth)}//Math.round(gr(1)*rem)
                 height = {GR.px(1,this.props.SizeWidth)}
                 top = {GR.px(3,this.props.SizeWidth)}
                 left = {GR.px(4,this.props.SizeWidth)}
                 active = {true}
                />
                {/*</NoSSR>*/}
            </div>
            )

    }

}

export default AVATAR;
