
import {Component} from 'react'
import { css } from 'glamor'
import {TweenMax} from "gsap";

import {ui  ,GR}  from '../utils/ui'
import LOGO  from './logo.svg'



export default class AboutNav extends Component {

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
        TweenMax.set(
            ".about",
            {
                y:`${this.props.vh}`,
                opacity:0,
                visbility:'hidden',
                pointerEvents: 'none',
            })
    }

    componentDidUpdate(){

        this.props.show?this.onShow():this.onClose();
        // console.log('ArtistiNav componentDidUpdate this.props',this.props)

    }

    onShow(){
        console.log('nav-Artisti -onShow()')
        TweenMax.staggerFromTo(
            ".about",
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
        TweenMax.staggerTo(".about",
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
                 // width: '100vw',
                 // height: '70vh',
                 position: 'absolute',
                 top:`${GR.px(4,this.props.vh)+GR.px(8,this.props.vh)}px`,//nav bg 斜边的高度+margin
                 left:0,
                 marginLeft:`${this.props.marginW}vw`,
                 marginRight:`${this.props.marginW}vw`,
                 pointerEvents:'none',
                 alignContent: 'center',
             })}
             className = 'about'
            >
                {/*LOGO*/}
                {
                    this.props.showLogo
                    ?<div
                     {...css({
                        /*居中*/
                         position:'relative',
                         width: `${GR.vw(1)}vw`,//暂时
                    })}
                    >
                        <LOGO/>
                    </div>
                    :null
                }




                {/*主要信息*/}
                <div
                 {...css({
                    fontSize:`${GR.vw(8)}vw`,
                    marginTop:`${GR.vw(9)}vw`,
                 })}
                >
                    {
                        `Via del Giglio, 10-50123 ,Firenze, Italia
                        Tel./Fax +39 055 268308
                        Cell. +39  32721  83721
                        gianni.zhang@hotmail.com
                        Presidente 张修中
                        `.split('\n')
                        .map((item, key) =>
                            <span key={key}>{item}<br/></span>)
                    }

                </div>
                {/*详细描述*/}
                <div
                 {...css({
                    // position:'relative',
                    fontSize:'14px',
                    overflowY:'scroll',
                    // height:'48vh',
                    maxHeight: '40vh',
                 })}
                >
                    {aboutInfo[`${this.props.language}`].split('\n')
                .map((item, key) =>
                    <span key={key}>{item}<br/></span>
                )}
                </div>
            </div>
    )}

}



const aboutInfo ={
  "it": "Zhong Art International è una realtà dedicata principalmente alla diffusione della cultura artistica cinese in Italia: il nostro obiettivo è quello di farci propagatori, far conoscere l’arte e la cultura della Cina, sia tradizionale che contemporanea, promuoverle affinché siano debitamente apprezzate anche in Italia. D’altra parte lavoriamo per raggiungere gli stessi obiettivi in Cina, in una logica di scambio e reciprocità tra due Paesi geograficamente lontani, ma vicini nello spirito",
  "zh": "中艺国际是一个致力于在意大利传播中国艺术文化的现实：我们的目标是让我们的传播者介绍中国传统和现代的艺术和文化，促进他们在意大利得到适当的赞赏。另一方面，我们在中国实现同样的目标，在两个地理遥远的国家之间的交流与互惠的逻辑，但接近精神。",
  "en": "Zhong Art International is a reality devoted mainly to the diffusion of Chinese art culture in Italy: our goal is to make us propagators, to introduce China's art and culture, both traditional and contemporary, to promote them to be duly appreciated in Italy . On the other hand, we are working to achieve the same goals in China, in a logic of exchange and reciprocity between two geographically distant countries, but close to the spirit."
}
