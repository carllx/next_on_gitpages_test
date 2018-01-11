import {PureComponent} from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { css } from 'glamor'
import Router from 'next/router'
import {TweenMax} from "gsap";

import {GR ,perspZ}  from '~/utils/ui'
import AVATAR from '~/components/avatar'
import {artistInfo} from '~/static/contents/artisti'
import { initStore } from '~/store'

import MOUSE_POS_DISPATCHER from '~/components/controller.mousePosDispatcher'
import DEVICE_ORIEN_DISPATCHER from '~/components/controller.deviceOrienDispatcher'

class ArtistiNav extends PureComponent {

    constructor(props){
        super(props)
        this.PERSP = 1000;
        // this.Zp = {
        //       pc:{
        //           description: perspZ(-20,this.PERSP),
        //           events: perspZ(-90,this.PERSP),
        //           exhibitions: perspZ(-90,this.PERSP),
        //           works: perspZ(-90,this.PERSP),
        //       },
        //       mobile:{
        //           description: perspZ(-20,this.PERSP),
        //           events: perspZ(-90,this.PERSP),
        //           exhibitions: perspZ(-90,this.PERSP),
        //           works: perspZ(-90,this.PERSP),
        //       }
        //   }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.nav_on !== this.props.nav_on) {
            //避免在打开父NAV时也执行
            if(nextProps.nav_on==='artisti') { //如果about激活
                this.show();
            }else if(this.props.nav_on==='artisti'){ //如果之前的是about现在状态已经切换
                this.close();
            }
        }

        // EVERNT MOUSE Dipatcher
        if(nextProps.nav_on==='artisti'){

            if(this.props.device ==='desktop'){
                if (this.props.mouse!==nextProps.mouse) this.onMouseRot();
            }else{ // mobile || tablet
                if (this.props.gyo!==nextProps.gyo) this.onDeviceRot();
            }
        }
    }

    componentDidMount(){
        this.close();
    }

    show(){
        console.log('nav-Artisti -show()')
        TweenMax.staggerFromTo(
            ".avatars",
            0.6,
            {
                rotationZ:15,
                autoAlpha:0,
            },{
                ease: Power4.easeOut,
                rotationZ:0,
                autoAlpha:1,//opacity:1,visibility:'visible'
            },
            0.06);
    }
    close(){
        console.log('nav-Artisti-close()')
        TweenMax.staggerTo(".avatars",
            0.5,
            {
                y:`90vh`,
                rotationZ:-2,
                ease: Power4.easeOut,
                autoAlpha:0,//opacity:0,visibility:'hidden'
            },
            0.06);
    }
    onMouseRot(){// mouse on tweenmax

        const cx = this.props.view_size.vw/ 2;
        const cy = this.props.view_size.vh/ 2;
        const dx = this.props.mouse.x - cx;
        const dy = this.props.mouse.y - cy;
        const tiltx =   ( dy / cx) ;
        const tilty = - ( dx / cy) ;
        const radius = Math.sqrt(Math.pow(tiltx,2) + Math.pow(tilty,2));
        const degree = (radius * 20);
        // animation
        TweenMax.to(`#nav_artist`, 1, {transform:'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)', ease:Power2.easeOut});
    }
    /*
    参考这个鞋 四元数公式 :https://segmentfault.com/a/1190000005988744
     */
    getRotate3d( alpha, beta, gamma ) {  //官方求四元数方法
        // - 转换的范围 PI/2 around the x-axis
        const degtorad = Math.PI / 180;
        // const degtorad = 1;

        // getQuaternion
        const _x = beta  ? beta  * degtorad : 0; // beta value
        const _y = gamma ? gamma * degtorad : 0; // gamma value
        const _z = alpha ? alpha * degtorad : 0; // alpha value

        const cX = Math.cos( _x/2 );
        const cY = Math.cos( _y/2 );
        const cZ = Math.cos( _z/2 );
        const sX = Math.sin( _x/2 );
        const sY = Math.sin( _y/2 );
        const sZ = Math.sin( _z/2 );

        const W = cX * cY * cZ - sX * sY * sZ;
        const X = sX * cY * cZ - cX * sY * sZ;
        const Y = cX * sY * cZ + sX * cY * sZ;
        const Z = cX * cY * sZ + sX * sY * cZ;

        // return [ w, x, y, z ];

        // getRota3d
        const rotate = 2 * Math.acos(W)/degtorad ;

        const x = X / Math.sin(degtorad * rotate/2) || 0;
        const y = Y / Math.sin(degtorad * rotate/2) || 0;
        const z = Z / Math.sin(degtorad * rotate/2) || 0;
        return {x:x,y:y,z:z,rotate:rotate};
    }

    onDeviceRot(){// mouse on tweenmax
        /*
        https://segmentfault.com/a/1190000005988744
        */

        /*
         DIRECTION
         const direction = window.orientation || window.screen.orientation.angle || 0;
         在safari iphone/ipad 始终会导致
        TypeError: undefined is not an object (evaluating 'window.screen.orientation.angle')
         */
        let direction
        if(window.screen.orientation===undefined){//safari
            direction = window.orientation || 0
        }else{
            direction = window.screen.orientation.angle || 0;
        }

        let {alpha,beta,gamma} = this.props.gyo

        const rot3d = this.getRotate3d( alpha , beta - direction- 30   , gamma) // 手持角度 30
        // debugger
        // android chrome work!
        TweenMax.to(`#nav_artist`, 1, {transform:`rotate3d(${rot3d.x},${-rot3d.y},${rot3d.z},${rot3d.rotate}deg)`, ease:Power2.easeOut});
    }

    _fillLinkWith(id){
        Router.push({
            /*
            http://localhost:3000/artisti/EnzoCucchi
            pathname :`/artisti/${id}`
            http://localhost:3000/artisti?id=EnzoCucchi
            */
            pathname: '/artisti',
            query: { id: id },
            asPath :`/artisti/${id}`,
            shallow: true

        })
        this.close()
    }

    render(){

        const { view_size, language, device , nav_on} = this.props
        const { is_landscape ,vw } = view_size
        const show =  nav_on==='artisti' // for --MOUSE_POS_DISPATCHER && DEVICE_ORIEN_DISPATCHER
        const desktop = device ==='desktop';
        // 每个图标按钮总大小
        const SIZE = is_landscape?GR.px(5,vw):GR.px(3,vw)
        // 头像偏移
        // const head_marginLeft = `${is_landscape?GR.vw(7):GR.vw(5)}vw`
        // const head_marginTop = `${is_landscape?GR.vw(7):GR.vw(6)}vw`

        return(
            <div
             {...css({
                /*居中*/
                 width: is_landscape?'35%':'100vw',
                 height: '100vh',
                 position: 'absolute',
                 left: is_landscape?'45%':'0',
                 top: 0,
                 // transform: is_landscape?'translate(0, -50%)':'translate(50%, -50%)',
                 /*flex 阵列往下*/
                 display:'flex',
                 pointerEvents:'none',
                 flexWrap:'wrap',
                 alignContent: 'center',

                 transformStyle: 'preserve-3d',
             })}
             id = 'nav_artist'
            >



                {
                    artistInfo.map( (item,index)=>
                        <div
                         {...css({
                            pointerEvents:'none',
                            transformStyle: 'preserve-3d',
                         })}
                         key={'avatars_'+item.id + index}
                         className ={"avatars"}
                         >
                            {/* 头像 */}
                            <div
                             {...css({
                                height:`${SIZE}px`,
                                marginLeft: `${is_landscape?GR.vw(7):GR.vw(5)}vw`,
                                marginTop: `${is_landscape?GR.vw(7):GR.vw(6)}vw`,
                                backfaceVisibility:'hidden',
                                cursor:'pointer',
                                transformStyle: 'preserve-3d',
                                // 初始化 隐藏 twenmax staggerFrom
                                opacity:show?1:0,
                                pointerEvents:show?'auto':'none',
                             })}
                             onClick = {()=>this._fillLinkWith(item.id)}
                            >
                                <AVATAR
                                 src = {item.avatar}
                                 SizeWidth = {SIZE}
                                 name = {item.name[language]}
                                />
                            </div>
                        </div>
                    ) //artistInfo.map
                }
                {desktop?

                        <MOUSE_POS_DISPATCHER
                         track={show} //开启
                         //windowId={'nav'} //监听元素
                        />
                    :

                        <DEVICE_ORIEN_DISPATCHER
                         track={show} //开启
                        />
                }

            </div>
    )}
}



const mapStateToProps = (state) => ({
    view_size:state.Root.view_size,
    language:state.Root.language,
    device:state.Root.device,
    mouse:state.Root.mouse,
    gyo:state.Root.gyo,
    nav_on:state.nav.on,
});


export default connect( mapStateToProps,null )(ArtistiNav)





// switch (this.direction) {
//     case 0:
//         this.lon = event.alpha + event.gamma + 30;
//         if (event.gamma > 90) {
//             this.lat = 90 - event.beta;
//         } else {
//             this.lat = event.beta - 90;
//         }
//         break;
//     case 90:
//         this.lon = event.alpha - 230;
//         if (event.gamma > 0) {
//             this.lat = 270 - event.gamma;
//         } else {
//             this.lat = -90 - event.gamma;
//         }
//         break;
//     case -90:
//         this.lon = event.alpha - 180;
//         this.lat = -90 + event.gamma;
//         break;
// }
