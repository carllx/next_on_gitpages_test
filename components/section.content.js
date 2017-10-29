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
        this.PERSP = 1;
        this.Zp = {
            pc:{
                img : perspZ(-0.02,this.PERSP),
                text : perspZ(-0.05,this.PERSP),
            },
            mobile:{
                img : perspZ(-0.05,this.PERSP),
                text : perspZ(-0.04,this.PERSP),
            }
        }
    }

    render(){

        const {img,vw,fetch,is_landscape,marginW,content}=this.props
        const zp = this.props.is_landscape?this.Zp.pc:this.Zp.mobile
        return(
            <div
             {...css({
                    //position:'relative',
                    transformStyle: 'preserve-3d',//@parallax
                    //position: 'sticky',//@parallax
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
                    // position:'relative',
                    // top:0,
                    fontSize:is_landscape?`${GR.vw(9)}vw`:`1rem`,
                    fontWeight:100,
                    backgroundColor:BACKGROUND_COLOR,
                    paddingLeft:marginW,
                    paddingRight:marginW,
                    paddingTop:is_landscape?`${GR.vw(8)}vw`:`${GR.vw(5)}vw`,
                    paddingBottom:is_landscape?`${GR.vw(8)}vw`:`${GR.vw(6)}vw`,
                    transformStyle: 'preserve-3d',
                    transition: `all 1s cubic-bezier(0, 0.6, 0, 1)`,
                    // willChange: 'margin-top,margin-bottom,transform',
                    // willChange: 'margin-top,margin-bottom',
                     transform:`translateZ(${zp.text.translateZ}px) scale(${zp.text.scale})`,

                })}
                 className= '_content_word'
                 // key={`content_word_${_pubblic_key}`}
                 >
                    {content
                        .split('\n')
                        .map((p, key) =>
                            <div
                             key={`Section_content_`+key}
                             {...css({
                             transform:`skew(0deg,-5deg)`,
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


// const mapDispatchToProps = (dispatch ) =>{
//     return {
//         // setSectionPostionY:bindActionCreators(setSectionPostionY, dispatch ),
//     }
// }

// export default Nav;
export default connect(mapStateToProps ,null)(_CONTENT)
