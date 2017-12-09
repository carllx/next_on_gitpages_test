import { css } from 'glamor'
import { PureComponent } from 'react'
import {ui  ,GR , makeKEY , perspZ}  from '~/utils/ui'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TAB from '~/components/artisti.tab.Wrapper'
import {IMG_WithLoader} from '~/components/img'


/*Button_IMG */
// class Button_IMG extends PureComponent {
//     constructor(props){
//         super(props);
//     }

//     render(){
//         return(
//             <div
//              {...css({
//                 marginRight:'3rem',
//                 cursor:'pointer',
//                 opacity:this.props.on?1:0,
//                 fontWeight:this.props.on?900:100,
//              })}
//             >{this.props.name}</div>
//         )
//     }
// }

class Works extends PureComponent {
    constructor(props){
        super(props);
    }

    render(){

        const size = this.props.size
        const vw = this.props.vw
        const shouldFetch = vw === undefined ? false:true;

        // const soloContents = this.props.contents[0]
        // const groupContents = this.props.contents[1]
        return(
            <div
             {...css({
                    display:'flex',
                    flexDirection:'row',
                    flexWrap:'wrap',
                 })}
            >
                {/*Img*/}
                {
                    this.props.contents.map((item,index)=>
                        <div
                          {...css({
                            justifyContent:'flex-start',
                            margin:'0.1rem',
                        })}
                        key = {`workimg_${index}`}
                        >
                            <IMG_WithLoader
                             src = {item.img}
                             height = {size/3.05}
                             width = {size/3.05}
                             fullWidth = {true}
                             fetch = {shouldFetch}
                            />
                        </div>
                    )
                }
            </div>
        )/*return*/
    }/*render*/
}


const mapStateToProps = (state) => {

    return ({
        vw:state.Root.view_size.vw,
        landscape:state.Root.view_size.is_landscape,
        language:state.Root.language,
        on:state.Tab.on,
    });
}


const Comp = connect(mapStateToProps,null)(Works)
export default TAB()(Comp)
