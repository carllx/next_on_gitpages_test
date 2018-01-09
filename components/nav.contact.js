import { connect } from 'react-redux'
import {PureComponent} from 'react'
import { css } from 'glamor'
import {TweenMax} from "gsap";

import {perspZ  ,GR}  from '~/utils/ui'

// import LOGO  from '~/components/svg/icons_logo'
import LOGO  from '~/components/svg/icons_logo_marca'


import {Mobile,Address,Mail,Phone}  from '~/components/svg/icons_static_svg'

import {Twitter,WeiChat,Youtube,Viemo,Weibo,Facebook,Instagram}  from '~/components/svg/icons_social_svg'

class MapIframe extends PureComponent {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1359.939041885581!2d11.251240249295027!3d43.77398979302729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb39cef323dcfa7e0!2zWkFJIOS4reiJuuWbvemZhQ!5e0!3m2!1szh-CN!2sit!4v1514654536015" width="400" height="200" frameborder="0"  allowfullscreen></iframe>);
  }
}


class NavContact extends PureComponent {

    constructor(props){
        super(props)
        this.PERSP = 1000;
    }

    componentDidMount(){

        // 初始关闭 artisti显示
        TweenMax.set(
            "#nav_contact",
            {
                y:`${this.props.view_size.vh}`,
                autoAlpha:0,
                pointerEvents: 'none',
            })

    }

    //Immutable??redux
    componentWillReceiveProps(nextProps){
        if(nextProps.nav_on !== this.props.nav_on) {
            //避免在打开父NAV时也执行
            // nextProps.nav_on==='contact'?this.show():this.close();
            //
            if(nextProps.nav_on==='contact') { //如果contact激活
                this.show();
            }else if(this.props.nav_on==='contact'){ //如果之前的是contact现在状态已经切换
                this.close();
            }
        }
    }

    show(){
        console.log('nav-Artisti -show()')
        TweenMax.staggerFromTo(
            "#nav_contact",
            0.5,
            {
                y:`${this.props.view_size.vh}`,
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
    close(){
        console.log('nav-About-close()')
        TweenMax.staggerTo("#nav_contact",
            0.3,
            {
                y:`${this.props.view_size.vh/9}`,
                // ease: Power4.easeOut,
                pointerEvents: 'none',
                autoAlpha:0,//opacity:0,visibility:'hidden'
            },
            0.05);
    }

    render(){
        const { view_size, language, device ,nav_on } = this.props
        const desktop = device ==='desktop';
        const {vw,vh,is_landscape} = view_size;
        const show =  nav_on==='contact'
        const mapWidth =  is_landscape?`${GR.px(1,vw)}`:`${GR.px(1,vw)}`
        const margin_w = is_landscape?`${GR.vw(3)}`:`${GR.vw(5)}`
        // const zp = is_landscape?this.Zp.pc:this.Zp.mobile
        const top = is_landscape?`${GR.px(3,vh)}px`:`${GR.px(4,vh)+GR.px(8,vh)}px`//手机端  nav bg 斜边的高度+margin

        return(
            <div
             {...css({
                display:'flex',
                flexDirection:'column',
                /*居中*/
                 position: 'absolute',
                 top:top,//手机端 nav bg 斜边的高度+margin
                 left:0,
                 marginLeft:`${margin_w}vw`,
                 marginRight:`${margin_w}vw`,
                 pointerEvents:'none',
                 alignContent: 'center',
                 //初始, 隐藏
                 visbility:'hidden',
             })}
             className = 'contact'
             id = 'nav_contact' // 3D 效果
            >
                {/*LOGO*/}
                {/*<div
                 {...css({
                    position:'relative',
                    width:`${w}vw`,//暂时
                    backfaceVisibility:'hidden',
                    transform:`translateZ(${zp.logo.translateZ}px) scale(${zp.logo.scale})`
                 })}
                >
                    <LOGO/>
                </div>*/}

                <div {...css({
                    display:'flex',
                    justifyContent:'center',
                    width:'100%',
                })}>
                    <LOGO size= {60}/>
                </div>

                <div {...css({
                    display:'flex',
                    justifyContent:'center',
                    width:'100%',
                })}>
                    Presidente: Xiuzhong Zhang
                </div>
                {/* SOCIAL App */}
                <div {...css({
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center',
                    width:'100%',
                })}>

                    <Twitter/>
                    <WeiChat/>
                    <Weibo/>
                    <Facebook/>
                    <Instagram/>
                    <Youtube/>
                    <Viemo/>

                </div>




                {/*主要信息*/}
                    {/*Mail*/}
                    <div {...css({display:'flex',flexDirection:'row'})}>
                        <div {...css({marginRight:'1.5em'})}><Mail size={18}/></div>
                        info@zhongart.it
                    </div>
                    {/*Tel./Fax */}
                    <div {...css({display:'flex',flexDirection:'row'})}>
                        <div {...css({marginRight:'1.5em'})}><Phone size={18}/></div>
                        +39  055 268308
                    </div>
                    {/*Cell. */}
                    <div {...css({display:'flex',flexDirection:'row'})}>
                        <div {...css({marginRight:'1.5em'})}><Mobile size={18}/></div>
                        +39  32721  83721
                    </div>
                    {/*Address*/}
                    <div {...css({display:'flex',flexDirection:'row'})}>
                        <div {...css({marginRight:'1.5em'})}><Address size={18}/></div>
                        Via del Giglio, 10-50123 ,Firenze, Italia
                    </div>



                    {/*<MapIframe/>*/}
                    <iframe
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1359.939041885581!2d11.251240249295027!3d43.77398979302729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb39cef323dcfa7e0!2zWkFJIOS4reiJuuWbvemZhQ!5e0!3m2!1szh-CN!2sit!4v1514654536015"
                     width={mapWidth}
                     height="200"
                     frameborder="0"
                     ></iframe>
                {/*主要信息*/}



                 {/*desktop?

                        <MOUSE_POS_DISPATCHER
                         track={show} //开启
                         windowId={'nav'} //监听元素
                        />
                    :

                        <DEVICE_ORIEN_DISPATCHER
                         track={show} //开启
                        />
                */}
            </div>
    )}

}






const mapStateToProps = (state) => ({
    view_size:state.Root.view_size,
    language:state.Root.language,
    device:state.Root.device,
    // mouse:state.Root.mouse,
    // gyo:state.Root.gyo,
    nav_on:state.nav.on,
});




// export default Nav;
export default connect(mapStateToProps)(NavContact)







/*
icons_mobile.js
icons_Weibo.js
icons_youtube.js
icons_Address.js
icons_Facebook.js
icons_Instagram.js
icons_Mail.js
icons_Phone.js
icons_Twitter.js
icons_Video.js
icons_Viemo.js
icons_Wechat.js
icons-site.js
icons-Weibo.js
icons_info.js
icons_logo.js
icons_quote_right.js
icons_quote_left.js
icons_chevron-left.js
icons_chevron-right.js
 */
