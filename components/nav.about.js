import { connect } from 'react-redux'
import {PureComponent} from 'react'
import { css } from 'glamor'
import {TweenMax} from "gsap";

import {perspZ  ,GR}  from '~/utils/ui'
import LOGO  from '~/components/logo.svg'

import MOUSE_POS_DISPATCHER from '~/components/controller.mousePosDispatcher'
import DEVICE_ORIEN_DISPATCHER from '~/components/controller.deviceOrienDispatcher'


class MapIframe extends PureComponent {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1359.939041885581!2d11.251240249295027!3d43.77398979302729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb39cef323dcfa7e0!2zWkFJIOS4reiJuuWbvemZhQ!5e0!3m2!1szh-CN!2sit!4v1514654536015" width="400" height="200" frameborder="0"  allowfullscreen></iframe>);
  }
}


class AboutNav extends PureComponent {

    constructor(props){
        super(props)
        this.PERSP = 1000;
        this.Zp = {
            pc:{
                logo : perspZ(10,this.PERSP),
                contact : perspZ(20,this.PERSP),
                description : perspZ(-30,this.PERSP),
            },
            mobile:{
                logo : perspZ(10,this.PERSP),
                contact : perspZ(20,this.PERSP),
                description : perspZ(-30,this.PERSP),
            }
        }
    }

    componentDidMount(){

        // 初始关闭 artisti显示
        TweenMax.set(
            "#nav_about",
            {
                y:`${this.props.view_size.vh}`,
                // opacity:0,
                // visbility:'hidden',
                display:'block',
                autoAlpha:0,
                pointerEvents: 'none',
            })
    }

    //Immutable??redux
    componentWillReceiveProps(nextProps){
        if(nextProps.nav_on !== this.props.nav_on) {
            //避免在打开父NAV时也执行
            // nextProps.nav_on==='about'?this.show():this.close();
            //
            if(nextProps.nav_on==='about') { //如果about激活
                this.show();
            }else if(this.props.nav_on==='about'){ //如果之前的是about现在状态已经切换
                this.close();
            }
        }

        // EVERNT Dipatcher
        if(nextProps.nav_on==='about'){

            if(this.props.device ==='desktop'){
                if (this.props.mouse!==nextProps.mouse) this.onMouseRot();
            }else{ // mobile || tablet
                if (this.props.gyo!==nextProps.gyo) this.onDeviceRot();
            }
        }
    }

    show(){
        console.log('nav-Artisti -show()')
        TweenMax.staggerFromTo(
            "#nav_about",
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
        TweenMax.staggerTo("#nav_about",
            0.3,
            {
                y:`${this.props.view_size.vh/9}`,
                // ease: Power4.easeOut,
                pointerEvents: 'none',
                autoAlpha:0,//opacity:0,visibility:'hidden'
            },
            0.05);
    }


    /* EVENT */
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
        TweenMax.to(`#nav_about`, 1, {transform:'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)', ease:Power2.easeOut});
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
        //

        // debugger
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


        const direction = window.orientation || window.screen.orientation.angle || 0;
        let {alpha,beta,gamma} = this.props.gyo


        // console.log(`gamma:${gamma} , beta:${beta} , alpha:${alpha}`)
        const rot3d = this.getRotate3d( alpha , beta - direction- 30   , gamma) // 手持角度 30
        // debugger
        // android chrome work!
        TweenMax.to(`#nav_about`, 1, {transform:`rotate3d(${rot3d.x},${-rot3d.y},${rot3d.z},${rot3d.rotate}deg)`, ease:Power2.easeOut});
    }
    /* EVENT */


    render(){
        const { view_size, language, device ,nav_on } = this.props
        const desktop = device ==='desktop';
        const {vw,vh,is_landscape} = view_size;
        const show =  nav_on==='about'
        const mapWidth =  is_landscape?`${GR.px(1,vw)}`:`${GR.px(1,vw)}`
        const margin_w = is_landscape?`${GR.vw(3)}`:`${GR.vw(5)}`
        const zp = is_landscape?this.Zp.pc:this.Zp.mobile
        const top = is_landscape?`${GR.px(2,vh)}px`:`${GR.px(4,vh)+GR.px(8,vh)}px`//nav bg 斜边的高度+margin

        return(
            <div
             {...css({
                /*居中*/
                 position: 'absolute',
                 top:top,//nav bg 斜边的高度+margin
                 left:0,
                 marginLeft:`${margin_w}vw`,
                 marginRight:`${margin_w}vw`,
                 pointerEvents:'none',
                 alignContent: 'center',
                 //初始状态,减少渲染
                 visbility:'hidden',
                 display:'none',
                 // 3D 效果
                 transformStyle: 'preserve-3d',
             })}
             className = 'about'
             id = 'nav_about' // 3D 效果
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





                {/*详细描述*/}
                <div
                 {...css({
                    fontSize:'14px',
                    overflowY:'scroll',
                    maxHeight: '40vh',
                    transform:`translateZ(${zp.description.translateZ}px) scale(${zp.description.scale})`
                 })}
                >
                    {aboutInfo[`${language}`].split('\n')
                .map((item, key) =>
                    <span key={key}>{item}<br/></span>
                )}
                </div>


                {/*主要信息*/}
                <div
                 {...css({
                    position:'relative',
                    transformStyle: 'preserve-3d',
                    marginTop:'2rem',
                 })}
                >
                    {
                        `
                        info@zhongart.it
                        Tel./Fax +39 055 268308
                        Cell. +39  32721  83721
                        Presidente XiuzhongZhang
                        Via del Giglio, 10-50123 ,Firenze, Italia
                        `.split('\n')
                        .map((item, key) =>
                            <div
                             key={`nav_about_content_${key}`}
                             {...css({

                                transform:`translateZ(${zp.contact.translateZ-key*10}px) scale(${zp.contact.scale})`
                             })}
                            >
                             {item}
                             <br/>
                             </div>)
                    }

                    {/*<MapIframe/>*/}
                    <iframe
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1359.939041885581!2d11.251240249295027!3d43.77398979302729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb39cef323dcfa7e0!2zWkFJIOS4reiJuuWbvemZhQ!5e0!3m2!1szh-CN!2sit!4v1514654536015"
                     width={mapWidth}
                     height="200"
                     frameborder="0"
                     ></iframe>
                </div>
                {/*主要信息*/}



                 {desktop?

                        <MOUSE_POS_DISPATCHER
                         track={show} //开启
                         windowId={'nav'} //监听元素
                        />
                    :

                        <DEVICE_ORIEN_DISPATCHER
                         track={show} //开启
                        />
                }
            </div>
    )}

}



const aboutInfo ={
  "it": "Zhong Art International siamo una realtà con sede in Italia e in Cina che opera nel campo dell'Arte e delle Attività Culturali la cui Mission consiste nell’organizzare mostre d’arte ed eventi. Abbiamo parternship con Enti ed Istituzioni, tra cui il Ministero della Cultura cinese, i Consolati e le Ambasciate in Cina in Italia ed siamo impegnati inoltre a favorire scambi culturali tra Università ed Accademie, Musei statali e privati. \nOltre all’organizzazione di mostre temporanee ci dedichiamo alla realizzazione di tutte quelle attività che possono creare un ponte culturale tra Italia e Cina e favorire rapporti di scambio tra Enti ed Istituti dei due Paesi, progetti e collaborazioni che uniscono realtà che hanno come fondamento l’Arte e la Cultura.\nLo scopo che guida tutta la nostra attività è quello di creare un collegamento tra due antiche culture quali la Cina e l’Italia.\nCrediamo che l’arte sia il mezzo di comunicazione più efficace ed immediato, l’unico in grado di superare ogni difficoltà e barriere linguistiche. Stimolare, incuriosire e far conoscere nuove realtà: questo è il nostro proposito, e ci auguriamo di farlo sempre al  meglio lasciando qualcosa di importante alle generazioni future.\nPartendo da quelle che sono le esigenze ed i desideri del cliente siamo in grado di progettare, organizzare e realizzare Eventi e Mostre di alto profilo scientifico, con elevata creatività ed esperienza professionale, offrendo servizi e consulenze su misura per ogni occasione.\nFondata nel 2017 Zhong Art International, Agenzia di Organizzazione Eventi, fortemente radicata nel territorio fiorentino e a Beijing, offre un ventaglio di servizi completo. Un team di professionisti al tuo fianco per assicurare qualità, serietà e risultati. ",
  "zh": "中艺国际是一个位于意大利佛罗伦萨的国际性艺术与文化交流机构。成立于2017年，在中国北京和意大利佛罗伦萨均有办事机构，我们的宗旨是为中国和意大利两国提供文化领域的交流与合作，通过积极为两国的艺术机构之间和艺术家之间策划展览和艺术家之间的学术交流活动，推动促进两国文化积极友好的发展。我们与意大利很多国家级的很多重要文化机构如文化部、大使馆等都有长期项目往来，与一些艺术类高等院校如罗马美术学院、佛罗伦萨大学美术学院、欧洲设计学院等都有校际合作关系。我们为专业人士提供专业性对接交流，旨在为中国和意大利两国的艺术发展建立文化沟通的桥梁。",
  "en": " Zhong Art International is a reality based in Italy and China, which operates in the field of Arts and Cultural Activities Italy-China. Our main activity is organizing art exhibitions and cultural events. We have parternships with Entities and Institutions, including the Chinese Ministry of Culture, Consulates and Embassies both in China and in Italy, as well as cultural exchanges between Universities and Academies, State and Private Museums, and the most important artistic organization of the country.\nIn addition to exhibitions, we are dedicated to the realization of all those activities that can create a cultural bridge between Italy and China: for example, we work to create new and lasting exchanges between institutions and institutes of the two countries, projects and collaborations that combine similar realities the basis of Art and Culture.\nThe root of our work, the will that drives our whole business, is the commitment to create a strong link between two ancient cultures—China and Italy. We believe that art is the most effective and immediate ways of communication, the only one able to overcome every difficulty and language barriers. Our purpose today is to stimulate the culture’s vitality, to excite our curiosity and to create some new meaningful activities,  and we hope that in the future we can make a prosperous world for our next generation.\nStarting from the demands of our customers, we are able to organize quality events with high creativity and professional experience, offering customized services and practical consultations for every occasions.\nFounded in 2017, Zhong Art International, a highly organized event agency in the Florence and Beijing areas, offers a full range of services.We are the propagators of Chinese art and culture, we strive to promote them to be duly appreciated in Italy. A team of professionals beside you to ensure the quality, reliability and results. "
}


const mapStateToProps = (state) => ({
    view_size:state.Root.view_size,
    language:state.Root.language,
    device:state.Root.device,
    mouse:state.Root.mouse,
    gyo:state.Root.gyo,
    nav_on:state.nav.on,
});




// export default Nav;
export default connect(mapStateToProps)(AboutNav)





