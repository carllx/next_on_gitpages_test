import { connect } from 'react-redux'
import {PureComponent} from 'react'
import { css } from 'glamor'
import {TweenMax} from "gsap";

import {perspZ  ,GR}  from '~/utils/ui'
import LOGO  from '~/components/logo.svg'

import MOUSE_POS_DISPATCHER from '~/components/controller.mousePosDispatcher'
import DEVICE_ORIEN_DISPATCHER from '~/components/controller.deviceOrienDispatcher'

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
            ".about",
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
            ".about",
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
        TweenMax.staggerTo(".about",
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
        const {vh,is_landscape} = view_size;
        const show =  nav_on==='about'
        const w =  is_landscape?`${GR.vw(3)}`:`${GR.vw(1)}`
        const margin_w = is_landscape?`${GR.vw(3)}`:`${GR.vw(5)}`
        const zp = is_landscape?this.Zp.pc:this.Zp.mobile
        const top = is_landscape?`${GR.px(4,vh)}px`:`${GR.px(4,vh)+GR.px(8,vh)}px`//nav bg 斜边的高度+margin

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
                <div
                 {...css({
                    position:'relative',
                    width:`${w}vw`,//暂时
                    backfaceVisibility:'hidden',
                    transform:`translateZ(${zp.logo.translateZ}px) scale(${zp.logo.scale})`
                 })}
                >
                    <LOGO/>
                </div>


                {/*主要信息*/}
                <div
                 {...css({
                    position:'relative',

                    // transform:`translateZ(${zp.contact.translateZ}px) scale(${zp.contact.scale})`,
                    transformStyle: 'preserve-3d',
                 })}
                >
                    {
                        `Via del Giglio, 10-50123 ,Firenze, Italia
                        Tel./Fax +39 055 268308
                        Cell. +39  32721  83721
                        info@zhongart.it
                        Presidente 张修中
                        `.split('\n')
                        .map((item, key) =>
                            <div
                             key={key}
                             {...css({

                                transform:`translateZ(${zp.contact.translateZ-key*10}px) scale(${zp.contact.scale})`
                             })}
                            >
                             {item}
                             <br/>
                             </div>)
                    }

                </div>
                {/*详细描述*/}
                <div
                 {...css({
                    fontSize:'14px',
                    // overflowY:'scroll',
                    maxHeight: '40vh',
                    transform:`translateZ(${zp.description.translateZ}px) scale(${zp.description.scale})`
                 })}
                >
                    {aboutInfo[`${language}`].split('\n')
                .map((item, key) =>
                    <span key={key}>{item}<br/></span>
                )}
                </div>
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
  "it": "Zhong Art International una realtà con sede in Italia e in Cina, che opera nel campo dell'Arte e delle Attività Culturali Italia-Cina. La nostra attività principale consiste nell’organizzare mostre d’arte ed eventi culturali. Abbiamo parternship con Enti ed Istituzioni, tra cui il Ministero della Cultura cinese, Consolati e Ambasciate sia in Cina che in Italia, oltre scambi culturali tra Università ed Accademie, Musei statali e private. \nOltre alle mostre ci dedichiamo alla realizzazione di tutte quelle attività che possono creare un ponte culturale tra Italia e Cina: ad esempio lavoriamo per creare sempre nuovi e duraturi rapporti di scambio tra Enti ed Istituti dei due Paesi, progetti e collaborazioni che uniscono realtà simili sulla base dell’Arte e della Cultura.\nLa radice del nostro lavoro, il fine che guida tutta la nostra attività, è l’impegno a creare un forte collegamento tra due antiche culture quali la Cina e l’Italia.\nCrediamo che l’arte sia il mezzo di comunicazione più efficace ed immediato, l’unico in grado di superare ogni difficoltà e barriera linguistica. Stimolare, incuriosire, far conoscere cose nuove: questo oggi è il nostro proposito, e ci auguriamo per il futuro di farlo sempre meglio, per lasciare qualcosa di importante dopo di noi.\nPartendo da quelle che sono le esigenze ed i desideri del cliente siamo in grado di progettare, organizzare e realizzare Eventi e Mostre di qualità, con elevata creatività ed esperienza professionale, offrendo servizi e consulenze su misura per ogni occasione\nZhong Art International, Agenzia leader nell’ideazione, progettazione, comunicazione e realizzazione  di eventi  culturali e mostre.\nUn team di professionisti al tuo fianco per assicurare qualità, serietà e risultati. \nFondata nel 2017 Zhong Art International, Agenzia di Organizzazione Eventi fortemente radicata nel territorio fiorentino e Beijing, offre un ventaglio di servizi completo.",
  "zh": "中艺国际是一个致力于在意大利传播中国艺术文化的现实：我们的目标是让我们的传播者介绍中国传统和现代的艺术和文化，促进他们在意大利得到适当的赞赏。另一方面，我们在中国实现同样的目标，在两个地理遥远的国家之间的交流与互惠的逻辑，但接近精神。",
  "en": "Zhong Art International is a reality based in Italy and China, which operates in the field of Arts and Cultural Activities Italy-China. Our main activity is organizing art exhibitions and cultural events. We have parternships with Entities and Institutions, including the Chinese Ministry of Culture, Consulates and Embassies both in China and in Italy, as well as cultural exchanges between Universities and Academies, State and Private Museums, and the most important artistic organization of the country.\nIn addition to exhibitions, we are dedicated to the realization of all those activities that can create a cultural bridge between Italy and China: for example, we work to create new and lasting exchanges between institutions and institutes of the two countries, projects and collaborations that combine similar realities the basis of Art and Culture.\nThe root of our work, the will that drives our whole business, is the commitment to create a strong link between two ancient cultures—China and Italy. We believe that art is the most effective and immediate ways of communication, the only one able to overcome every difficulty and language barriers. Our purpose today is to stimulate the culture’s vitality, to excite our curiosity and to create some new meaningful activities,  and we hope that in the future we can make a prosperous world for our next generation.\nStarting from the demands of our customers, we are able to organize quality events with high creativity and professional experience, offering customized services and practical consultations for every occasions.\nFounded in 2017, Zhong Art International, a highly organized event agency in the Florence and Beijing areas, offers a full range of services.We are the propagators of Chinese art and culture, we strive to promote them to be duly appreciated in Italy. A team of professionals beside you to ensure the quality, reliability and results."
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





