
import { css } from 'glamor'
import { PureComponent } from 'react'
import { ui  ,GR , makeKEY , perspZ }  from '~/utils/ui'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {IMG_WithLoader} from '~/components/img.work'
import {setFocusOn} from '~/reducers/artisti.tabs'
import LeftArrow from '~/components/svg/icons_chevron-left'
import RightArrow from '~/components/svg/icons_chevron-right'



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

class FullWork extends PureComponent {
    constructor(props){
        super(props);
        this.handleClickClose = this.closeOnClick.bind(this)

        this.state = {showArrows:false}
    }


    closeOnClick(){
        this.props.setFocusOn(-1);
    }

    nextOnClick(index){
        // debugger
        if(index+1===this.props.contents.length) {index=-1;}
        this.props.setFocusOn(index+1);
    }

    prevOnClick(index){
        // if(index===this.props.contents.length) {index=-1;debugger}
        this.props.setFocusOn(index-1);
    }



    render(){
        if(this.props.worksFocusOn === undefined || this.props.worksFocusOn === -1 ) return null
        const index = this.props.worksFocusOn/*跳转前一张或者后一张*/
        const landscape = this.props.landscape
        // debugger

        return(
            <div
             {...css({
                position:'fixed',
                height:'100vh',
                width:'100vw',
                left:0,
                top:0,
                right: 0,
                zIndex:9,
                // backgroundColor:'rgba(240,240,240,.95)',
                background:'rgba(240,240,240,.99)',
                transition:'background 1s cubic-bezier(0, 0.6, 0, 1)',
                willChange:'background',
                pointerEvents:'none',
             })}
             className ="FullWork"
            >

                {/*控制器Next/Prev*/}
                <div
                 {...css({
                    /*居中*/
                     position: 'fixed',
                     display:'flex',
                     justifyContent:'space-between',
                     left:0,
                     top:0,
                     width:'100vw',
                     height:'100vh',
                     pointerEvents:'auto',
                     zIndex:11,
                     opacity:0,
                     // height: `fit-content`,
                     // width: landscape?`${GR.vw(8)}vw`:`${GR.vw(5)}vw`,
                     cursor:'pointer',
                     ':hover':{
                        opacity:1,
                        transition:'opacity 1s'
                    }
                })}

                >
                    {/*Prev*/}
                    <div
                     {...css({
                        /*居中*/
                         // position: 'fixed',
                         // left:0,
                         // top:0,
                         zIndex:12,
                         display:'flex',
                         alignItems:'center',
                         justifyContent: landscape?'center':'flex-start',
                         margin:landscape?'0':'.6em',
                         height:'100vh',
                         width:'33vw',
                         pointerEvents:'all',
                         cursor:'pointer',
                     })}
                     onClick = {()=>{this.prevOnClick(this.props.worksFocusOn)}}
                    >
                        <LeftArrow
                             size = {30}
                             color = {ui.color.b_o2}
                             strokeWidth = {0.75}
                            />

                    </div>
                    {/*Close*/}
                    <div
                     {...css({
                        /*居中*/
                         // position: 'fixed',
                         zIndex:12,
                         display:'flex',
                         alignItems:'center',
                         height:'100vh',
                         width:'33vw',
                         pointerEvents:'all',

                         cursor:'pointer',
                     })}
                     onClick = {this.handleClickClose}
                    />

                    {/*Next*/}
                    <div
                     {...css({
                        /*居中*/
                         // position: 'fixed',
                         // left:0,
                         // top:0,
                         zIndex:12,
                         display:'flex',
                         alignItems:'center',
                         justifyContent: landscape?'center':'flex-end',
                         margin:landscape?'0':'.6em',
                         height:'100vh',
                         width:'33vw',
                         pointerEvents:'all',
                         cursor:'pointer',
                     })}
                     onClick = {()=>{this.nextOnClick(this.props.worksFocusOn)}}
                    >
                        <RightArrow
                         size = {30}
                         color = {ui.color.b_o2}
                         strokeWidth = {0.75}
                        />
                    </div>

                </div>

                {/*保护 WALL*/}
                <div
                 {...css({
                    position:'absolute',
                    display: 'flex',
                    justifyContent:'center',
                    pointerEvents:'auto',
                    alignItems:landscape?'flex-end':'flex-start',
                    // width:this.props.vw,
                    zIndex:10,
                    top:0,
                    left:0,
                    height:'100vh',
                    width:'100vw',
                 })}

                >

                    {/*作品详细说明*/}
                    <div
                     {...css({
                        position:'absolute',
                        display: 'flex',
                        justifyContent:'center',
                        alignItems:'flex-start',
                        // backgroundColor:ui.color.b_o2,
                        // flexDirection:landscape?'row':'column',
                        width:this.props.vw,
                     })}
                    >
                        {/*三角形*/}
                        {
                            landscape?
                            <div
                             {...css({
                                width:landscape?'2rem':'1rem',
                                height:landscape?'2rem':'1rem',
                                paddingBottom:'2rem',
                                paddingTop:'2rem',
                                // paddingLeft:'2rem',
                             })}>
                                <Triangle size = {landscape?'2rem':'1rem'} />
                            </div>
                            :
                            null
                        }


                        {/*time year*/}
                        <div
                         {...css({
                            color:ui.color.b_o3,
                            fontWeight:1000,
                            fontSize:landscape?'1.5rem':'1rem',
                            paddingBottom:'2rem',
                            paddingTop:'2rem',
                            paddingLeft:'0.8rem',
                         })}
                        >
                            {this.props.contents[this.props.worksFocusOn].time}
                        </div>



                        {/*title text*/}
                        <div
                         {...css({
                            color:ui.color.b_o1,
                            paddingBottom:'2rem',
                            paddingTop:'2rem',
                            paddingLeft:landscape?'1rem':'.5rem',
                            width:landscape?'auto':'13em',
                         })}
                        >
                            {this.props.contents[this.props.worksFocusOn].title[this.props.language]}
                        </div>

                        {/*dim*/}
                        <div
                         {...css({
                            color:ui.color.b_o2,
                            fontSize:landscape?'0.8rem':'0.4rem',
                            paddingBottom:'2rem',
                            paddingTop:'2rem',
                            paddingLeft:'0.8rem',
                         })}
                        >
                            {this.props.contents[this.props.worksFocusOn].dim}
                        </div>
                    </div>

                </div>

                {/*IMG*/}
                <IMG_WithLoader
                 src = {this.props.contents[this.props.worksFocusOn].img}
                 height = {this.props.vh*0.8}
                 width = {this.props.vw*0.8}
                 fullWidth = {true}
                 fetch = {true}
                 key = {this.props.contents[this.props.worksFocusOn].img}
                />




            </div>
        )
    }
}


const mapStateToProps = (state) => {

    return ({
        vw:state.Root.view_size.vw,
        vh:state.Root.view_size.vh,
        landscape:state.Root.view_size.is_landscape,
        language:state.Root.language,
        worksFocusOn:state.Tab.worksFocusOn,
    });
}

/*关闭的时候,切换的时候使用*/
const mapDispatchToProps = (dispatch) => {
  return {
    setFocusOn: bindActionCreators(setFocusOn, dispatch),

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FullWork)

