// import  {Component} from 'react'
import fetch from 'isomorphic-fetch'
import { css } from 'glamor'
import {ui  ,GR ,makeKEY}  from '../utils/ui'
import _IMG_SKEW from './section.img'
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {setSectionPostionY,setClose,setFetch} from '~/reducers/section'
import {findPos} from '~/utils/mouse'
import {parallaxInView} from '~/utils/inView'
/*
参考 https://wangwang.taobao.com/+
    div transform: skew(0deg,-5deg) relative
        div transform: skew(0deg,5deg); absolute
 */

const _pubblic_key= makeKEY()



export class _CONTENT extends PureComponent{
    constructor(props){
        super(props),
        this.state = {
            parallaxY:0,
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.onScrollingY!==nextProps.onScrollingY){
            const opt = {
                vw:this.props.vw,vh:this.props.vh,
                element:this._$CONTENT,
                scrollY:nextProps.onScrollingY,
                lag:.02,
            }
            const pos = parallaxInView(opt)
            if(pos){
                this.setState({
                    parallaxY:pos,
                })
            }
        }
    }
    shouldComponentUpdate(nextProps){
        if(this.props.onScrollingY!==nextProps.onScrollingY) {return true}
            else {return false}

    }

    render(){
        const {close,img,vw,fetch,is_landscape,marginW,content}=this.props
        return(
            <div
             {...css({
                    transform: 'translateZ(-0.2px) scale(1.0666666666666667)',//@parallax
                })}
             className = {'_CONTENT'} key={`_CONTENT${_pubblic_key}`}>
                {/*opts-图片IMG*/}
                {img?
                    <_IMG_SKEW
                     src = {img}
                     width = {vw}
                     height={is_landscape?`${GR.px(2,vw)}`:`${GR.px(1,vw)}`}
                     fetch={fetch}
                     is_landscape = {is_landscape}
                     // key={`content_image_${_pubblic_key}`}
                    />
                :null}

                {/*文字*/}
                <div
                 {...css({
                    position:'relative',
                    top:0,
                    fontSize:is_landscape?`${GR.vw(9)}vw`:`1rem`,
                    fontWeight:100,
                    marginLeft:marginW,
                    marginRight:marginW,
                    marginTop:is_landscape?`${GR.vw(8)}vw`:`${GR.vw(5)}vw`,
                    marginBottom:is_landscape?`${GR.vw(8)}vw`:`${GR.vw(6)}vw`,
                    transform:`translate3d(0,${this.state.parallaxY}px,0)`,
                    transition: `all 1s cubic-bezier(0, 0.6, 0, 1)`,
                    willChange: 'margin-top,margin-bottom,transform',

                })}
                 className= '_content_word'
                 // key={`content_word_${_pubblic_key}`}
                 ref={c => this._$CONTENT = c}
                 >
                    {content
                        .split('\n')
                        .map((p, key) =>
                            <div key={`Section_content_`+key}>
                                {p}
                                <br/>
                             </div>
                        )}
                </div>
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
        RePosTrigger:state.Section.RePosTrigger,
        // onClose:onClose,
        onScrollingY:state.Root.scroll.y,
    });
}


const mapDispatchToProps = (dispatch ) =>{
    return {
        // setSectionPostionY:bindActionCreators(setSectionPostionY, dispatch ),
    }
}

// export default Nav;
export default connect(mapStateToProps ,null)(_CONTENT)
