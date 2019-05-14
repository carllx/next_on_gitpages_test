import { css } from 'glamor'
import {ui}  from 'utils/ui'
import {PureComponent} from 'react'

// SVG
import {QuoteLeft,QuoteRight}  from 'components/svg/icons_static_svg'


// const Shape= (props) => (
//     <div
//      {...css({
//         /*初始值*/
//         opacity:0,visibility:'hidden',
//         // transform: 'scale(0) translate(-50%, -50%)',
//         transform: 'scale(0)',
//         /*初始值*/
//         /*center*/
//         zIndex:10,
//         position:'fixed',

//         /*center*/
//         background: props.color||ui.color.w_o2,
//         width:`${props.width||1400}px`,
//         height:`${props.height||1400}px`,
//        })}
//      className = {'aboutBG'}
//      >

//     </div>
// )



export default class Info extends PureComponent {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        // this.close();
    }

    componentWillReceiveProps(nextProps){
    }

    render(){
        const {landscape,vw,vh} = this.props
        return(
            <div
             {...css({
                display:'flex',
                justifyContent:'center',
                backgroundColor:this.props.backgroundColor||ui.color.b_o2,
                padding:'7em 5em',
             })}
             className = {'Info'}
            >

                {/*Left*/}
                <div
                {...css({
                    position:'relative',
                    top:'-1em',
                    left:'-1em',
                    // marginBottom:'1em'
                })}
                >
                    <QuoteLeft
                     strokeColor = {this.props.contentColor||ui.color.w_o1}
                    />
                </div>

                <div {...css({
                    // marginRight:'1em',
                    // marginLeft:'1em',
                    color: this.props.contentColor||ui.color.w_o1
                })}>
                    {this.props.contents}
                </div>

                {/*Right*/}
                <div
                 {...css({
                    position:'relative',
                    bottom:'-1em',
                    right:'-1em',
                    // marginTop:'1em'
                })}
                >
                    <QuoteRight
                     strokeColor = {ui.color.w_o1}
                    />
                </div>


            </div>
        )/*return*/
    }/*render*/
}

