import {Component} from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { css } from 'glamor'
import Router from 'next/router'
import {TweenMax} from "gsap";

import {ui  ,GR}  from '~/utils/ui'
import AVATAR from './components/avatar'
import {artistInfo} from '~/static/contents/artisti'
import { initStore } from '~/store'


class ArtistiNav extends Component {

    constructor(props){
        super(props)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.show !== this.props.show) {
            //避免在打开父NAV时也执行
            nextProps.show?this.onShow():this.onClose();
        }
    }

    onShow(){
        console.log('nav-Artisti -onShow()')
        TweenMax.staggerFromTo(
            ".avatars",
            0.6,
            {
                rotationZ:15,
                transformOrigin:"-80% -90%",
                autoAlpha:0,
            },{
                ease: Power4.easeOut,
                rotationZ:0,
                transformOrigin:"-450% -90%",
                autoAlpha:1,//opacity:1,visibility:'visible'
            },
            0.06);
    }
    onClose(){
        console.log('nav-Artisti-onClose()')
        TweenMax.staggerTo(".avatars",
            0.5,
            {
                y:`90vh`,
                rotationZ:-2,
                transformOrigin:"0 0",
                ease: Power4.easeOut,
                autoAlpha:0,//opacity:0,visibility:'hidden'
            },
            0.06);
    }

    _switchRouter(id){
        Router.push({
            pathname: '/artisti',
            query: { id: id },
            asPath :`/artisti/${id}`
        })
        this.onClose()
        // this.props.closeNavFunc()
    }

     render(){

        const { view_size, language } = this.props
        const { is_landscape } = view_size
        const itemSize = is_landscape?GR.px(5,view_size.vw):GR.px(3,view_size.vw)
        // debugger
        return(
            <div
             {...css({
                /*居中*/
                 width: is_landscape?'35%':'100vw',
                 height: '100vh',
                 position: 'absolute',
                 right: is_landscape?'0':'50%',
                 top: is_landscape?'45%':'50%',
                 transform: is_landscape?'translate(0, -50%)':'translate(50%, -50%)',

                 /*flex 阵列往下*/
                 display:'flex',
                 pointerEvents:'none',
                 flexWrap:'wrap',
                 alignContent: 'center',

             })}
            >
                {
                    artistInfo.map( (item,index)=>
                        <div
                         {...css({
                            // pointerEvents:this.props.show?'auto':'none',
                            pointerEvents:'none',
                         })}
                         key={'avatars_'+item.id + index}

                         className ={"avatars"}
                         >
                            {/* 头像 */}
                            <div
                             {...css({
                                height:`${itemSize}px`,
                                marginLeft: `${is_landscape?GR.vw(7):GR.vw(5)}vw`,
                                // marginRight: `${is_landscape? GR.vw(7)  :GR.vw(5)}vw`,
                                marginTop: `${is_landscape?GR.vw(7):GR.vw(6)}vw`,
                                // transform:'translateZ(0) rotate(10)',
                                backfaceVisibility:'hidden',
                                perspective:'1000px',
                                willChange: 'transform , opacity ,visibility',
                                //twenmax staggerFrom
                                opacity:this.props.show?1:0,
                                pointerEvents:this.props.show?'auto':'none',
                                cursor:'pointer',
                             })}
                             onClick = {()=>this._switchRouter(item.id)}
                            >
                                <AVATAR
                                 src = {item.avatar}
                                 SizeWidth = {itemSize}
                                 name = {item.name[this.props.language]}
                                />
                            </div>
                        </div>
                    ) //artistInfo.map
                }
            </div>
    )}
}



const mapStateToProps = (state) => ({
    view_size:state.Root.view_size,
    language:state.Root.language,
});


export default connect( mapStateToProps )(ArtistiNav)
