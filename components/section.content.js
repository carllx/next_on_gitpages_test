// import  {Component} from 'react'
import fetch from 'isomorphic-fetch'
import { css } from 'glamor'
import {ui, GR, perspZ, makeKEY}  from '~/utils/ui'
// import _IMG from './img.skew'
import _IMG from './img.parallax'
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import {setSectionPostionY} from '~/reducers/section'
import {findPos} from '~/utils/mouse'
// import {parallaxInView} from '~/utils/inView'
/*
参考 https://wangwang.taobao.com/+
    div transform: skew(0deg,-5deg) relative
        div transform: skew(0deg,5deg); absolute
 */
const BACKGROUND_COLOR = ui.color.w_1;
const _pubblic_key= makeKEY()


export class _CONTENT extends PureComponent{
    constructor(props){
        super(props),
        this.PERSP = 1000;
        this.Zp = {
            pc:{
                contents : perspZ(250,this.PERSP),
            },
            mobile:{
                contents : perspZ(150,this.PERSP),
            }
        }
    }

    render(){

        const {img,vw,fetch,is_landscape,marginW,content}=this.props
        const zp = this.props.is_landscape?this.Zp.pc:this.Zp.mobile
        const zParraller = perspZ(200*this.props.index,this.PERSP)
        console.log(`translateZ(${zParraller.translateZ}px) scale(${zParraller.scale})`)
        return(
            <div {...css({
                    transformStyle: 'preserve-3d',
                    // position:'absolute',
                    //position: '-webkit-sticky',// @safari
                    // top:1/this.props.index*200,
                    perspectiveOrigin: '50% 50%',
                    transform: 'translate3d(0, 0, 0)',
                    // transform:`translateZ(${zParraller.translateZ}px) scale(${zParraller.scale})`,
                    backfaceVisibility: 'hidden',//防止闪烁(flicker)
                })}
             className = {'_CONTENT'}
             key={`_CONTENT${_pubblic_key}`}
             >

                {/*opts-图片IMG*/}
                {img?

                    <_IMG
                     src = {img}
                     width = {vw}
                     height={is_landscape?`${GR.px(2,vw)}`:`${GR.px(1,vw)}`}
                     fetch={fetch}
                     is_landscape = {is_landscape}
                     // key={`content_image_${_pubblic_key}`}
                    />
                :null}



                {/*text文字*/}
                <div
                 {...css({
                    // position:'absolute',
                    // bottom:0,
                    fontSize:is_landscape?`${GR.vw(9)}vw`:`1rem`,
                    fontWeight:100,
                    backgroundColor:BACKGROUND_COLOR,
                    paddingLeft:marginW,
                    paddingRight:marginW,
                    paddingTop:is_landscape?`${GR.vw(8)}vw`:`${GR.vw(5)}vw`,
                    paddingBottom:is_landscape?`${GR.vw(8)}vw`:`${GR.vw(6)}vw`,
                    transformStyle: 'preserve-3d',
                    transition: `all 1s cubic-bezier(0, 0.6, 0, 1)`,
                    transform:`translateZ(${zp.contents.translateZ}px) scale(${zp.contents.scale})`,
                    backfaceVisibility: 'hidden',//防止闪烁(flicker)
                })}
                 className= '_content_word'
                 // key={`content_word_${_pubblic_key}`}
                 >
                    {content
                        .split('\n')
                        .map((p, key) =>
                            <div
                             {...css({
                                backfaceVisibility: 'hidden',//防止闪烁(flicker)
                             })}
                             key={`Section_content_`+key}
                             {...css({
                                transform:`skew(0deg,5deg) translate3d(0, 0, 0)`
                             })}
                             >
                                {p}
                                <br/>
                             </div>
                        )}
                </div>{/*text文字*/}
            </div>
        )
    }
}


const mapStateToProps = (state,ownProps) => {

    // const onClose = state.Section[ownProps.name].onClose
    return ({
        vw:state.Root.view_size.vw,
        vh:state.Root.view_size.vh,
        is_landscape:state.Root.view_size.is_landscape,
        language:state.Root.language,
    });
}


// const mapDisp0000atchToProps = (dispatch ) =>{
//     return {
//         // setSectionPostionY:bindActionCreators(setSectionPostionY, dispatch ),
//     }
// }

// export default Nav;
export default connect(mapStateToProps ,null)(_CONTENT)
