import { css } from 'glamor'
import {ui}  from 'utils/ui'
import {PureComponent} from 'react'
import {TweenMax} from "gsap";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import {setFocusOn} from'reducers/artisti.tabs'
import ABOUT_IT from 'components/about.it.md'
import ABOUT_CN from 'components/about.cn.md'
import ABOUT_EN from 'components/about.en.md'
import { setPanelOn } from 'reducers/nav'

const Shape= (props) => (
    <div
     {...css({
        /*初始值*/
        opacity:0,visibility:'hidden',
        // transform: 'scale(0) translate(-50%, -50%)',
        transform: 'scale(0)',
        /*初始值*/
        /*center*/
        zIndex:10,
        position:'absolute',

        /*center*/
        left:0,
        right:0,
        background: props.color||ui.color.w_o2,
        width:`${props.width||1400}px`,
        height:`${props.height||1400}px`,
       })}
     className = {'aboutBG'}
     >

    </div>
)



class AboutBG extends PureComponent {
    constructor(props){
        super(props);

    }

    componentDidMount(){
        // this.close();
    }

    // 两个数之间的随机值
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    /*
                // ease: Power4.easeOut,

                // ease: Elastic.easeOut.config(1, 0.3),

                 ease:Back.easeOut.config(2),

                // ease: Elastic.easeOut.config(1, 0.3),

                ease: Back.easeIn.config(2)

     */
    toInfo(){
        let rot_value = this.props.landscape?500:-122
        // console.log(`toInfo_${rot_value}`)

        this.props.setPanelOn('show')
        TweenMax.staggerTo(".aboutBG",
            0.5,
            {
                scale:1,
                rotationZ:rot_value,
                transformOrigin: "center center",
                ease: Power4.easeOut,
                autoAlpha:1,//opacity:0,visibility:'hidden'
            },
            0.06)
    }
    toLogo(){
        let rot_value =this.getRandomInt(-360,360)
        // console.log(`toLogo_${rot_value}`)

        this.props.setPanelOn('close')
        TweenMax.staggerTo(".aboutBG",
            0.3,
            {
                scale:0.1,
                rotationZ:rot_value,
                transformOrigin: "center center",
                // ease: Power4.easeOut,
                autoAlpha:0,//opacity:0,visibility:'hidden'
            },
            0.06);
    }



    componentWillReceiveProps(nextProps){
        if(nextProps.showAbout !== this.props.showAbout) {
            if(nextProps.showAbout===false) {
                this.toLogo();
            }else{
                this.toInfo();
            }
        }

    }

    render(){
        const {landscape,vw,vh} = this.props
        return(
            <div
             {...css({
                position:'fixed',
                overflow: 'hidden',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                top:0,
                left:0,
                width:'100vw',
                height:'100vh',
             })}
            >

                <Shape
                 width = {vw}
                 height = {vh}/>
                <Shape
                 width = {vw}
                 height = {vh}/>
                <Shape
                 width = {vw}
                 height = {vh}/>
                {/*详细描述*/}
                {this.props.showAbout?
                    <div
                     {...css({
                        // fontSize:'14px',
                        position:'relative',
                        zIndex:13,
                        width:landscape?`45vw`:`80vw`,
                        overflowY:'auto',
                        maxHeight: landscape?'58vh':'58vh',
                        fontSize:'0.8em',
                        // height:'100vh',
                        // zIndex:10,


                     })}
                    >
                        {/* {aboutInfo[`${this.props.language}`]
                            .split('\n')
                            .map((item, key) =>
                                <div
                                 {...css({
                                        // fontSize:'.5em',
                                        // paddingTop:'2em',
                                        // paddingLeft:'2em',
                                        // paddingRight:'2em',
                                 })}
                                 key={`aboutInfo_${this.props.language}_${key}`}
                                 // className = {'aboutBG'}
                                 >
                                    {item}<br/>
                                </div>
                    )} */}
                        {aboutInfo[`${this.props.language}`]}
                    </div>:null

                }





            </div>
        )/*return*/
    }/*render*/
}

//aboutInfo[`en`]
//aboutInfo[`${this.props.language}`]
const mapStateToProps = (state) => {

    return ({
        vw:state.Root.view_size.vw,
        vh:state.Root.view_size.vh,
        landscape:state.Root.view_size.is_landscape,
        language:state.Root.language,
        worksFocusOn:state.Tab.worksFocusOn,
    });
}

/*关闭的时候,切换的时候使用*/
const mapDispatchToProps = (dispatch) => {
  return {
    setPanelOn: bindActionCreators(setPanelOn, dispatch),

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AboutBG)




const aboutInfo ={
//   "it": "Fondata nel 2017 la Zhong Art International è un’agenzia che opera nel campo dell'Arte e delle Attività Culturali. La Mission consiste nell’organizzare di mostre d’arte ed eventi. Abbiamo la parternship con Enti ed Istituzioni, tra cui il Ministero della Cultura cinese, i Consolati e le Ambasciate in Cina in Italia e siamo impegnati inoltre a favorire scambi culturali tra Università ed Accademie, Musei statali e privati. Essa è fortemente radicata nel territorio fiorentino e a Beijing, ed offre un ventaglio di servizi completo. Un team di professionisti al tuo fianco per assicurare qualità, serietà e risultati. \n\nPartendo da quelle che sono le esigenze ed i desideri del cliente siamo in grado di progettare, organizzare e realizzare Mostre ed Eventi di alto profilo scientifico, con elevata creatività ed esperienza professionale, offrendo servizi e consulenze su misura per ogni occasione.\nOltre all’organizzazione di mostre temporanee, ci dedichiamo alla realizzazione di tutte quelle attività che possano creare un ponte culturale tra Italia e Cina e favorire rapporti di scambio tra Enti ed Istituti dei due Paesi, progetti e collaborazioni che uniscono realtà che hanno come fondamento l’Arte e la Cultura.\nCrediamo che l’arte sia un mezzo di comunicazione efficace ed immediato, in grado di superare ogni difficoltà e barriere linguistiche, di stimolare, incuriosire e far conoscere nuove realtà.",
  "it": <ABOUT_IT/>,
  "zh": <ABOUT_CN/>,
  "en": <ABOUT_EN/>
}
