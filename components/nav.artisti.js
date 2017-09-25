
import {Component} from 'react'
import { css } from 'glamor'
import Link from 'next/link'
import {TweenMax} from "gsap";

import {ui  ,GR}  from '../utils/ui'
import AVATAR from './avatar'
import {artistInfo} from '../static/contents/artisti'






export default class ArtistiNav extends Component {

    constructor(props){
        super(props)
        this.state={
            // vw :this.props.vw,
            // vh :this.props.vh,
            // close:this.props.show,
        }
    }

    componentDidMount(){

        // 初始关闭 artisti显示
        console.log(artistInfo)
        TweenMax.set(
            ".avatars",
            {
                y:`${this.props.vh}`,
                opacity:0,
                pointerEvents: 'none',
            })
    }

    componentDidUpdate(){

        this.props.show?this.onShow():this.onClose();
    }

    onShow(){
        console.log('nav-Artisti -onShow()')
        TweenMax.staggerFromTo(
            ".avatars",
            0.5,
            {
                y:`${this.props.vh}`,
                opacity:0,
                pointerEvents: 'none',
            },{
                y:0,
                ease: Power4.easeOut,
                pointerEvents: 'auto',
                autoAlpha:1,//opacity:1,visibility:'visible'
            },
            0.2);
    }
    onClose(){
        console.log('nav-Artisti-onClose()')
        TweenMax.staggerTo(".avatars",
            0.3,
            {
                y:`${this.props.vh/9}`,
                // ease: Power4.easeOut,
                pointerEvents: 'none',
                autoAlpha:0,//opacity:0,visibility:'hidden'
            },
            0.05);

    }

    render(){


        return(
            <div
             {...css({
                /*居中*/
                 width: '100vw',
                 height: '100vh',
                 position: 'absolute',
                 left: '50%',
                 top: '50%',
                 transform: 'translate(-50%, -50%)',

                 /*flex 阵列往下*/
                 display:'flex',
                 pointerEvents:'none',
                 flexWrap:'wrap',
                 alignContent: 'center',

             })}
            >
                {
                    artistInfo.map( (item,index)=>
                        <Link
                         // href= {`/artisti/${item.id}`}
                         prefetch
                         href={{ pathname: '/artisti', query: {id: item.id} }} as={`/artisti/${item.id}`}
                         key={item.id + index}
                         >
                            {/* 头像 */}
                            <div
                             {...css({
                                height:`${GR.px(3,this.props.vw)}px`,
                                marginLeft: `${GR.vw(5)}vw`,
                                marginRight: `${GR.vw(5)}vw`,
                                marginTop: `${GR.vw(6)}vw`,
                                willChange: 'transform , opacity',
                             })}
                             className ={"avatars"}
                            >
                                <AVATAR
                                 src = {item.avatar}
                                 SizeWidth = {GR.px(3,this.props.vw)}
                                 name = {item.name[this.props.language]}

                                />
                            </div>
                        </Link>
                    )//artistInfo.map
                }
            </div>

    )}

}
