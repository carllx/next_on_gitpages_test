import { css } from 'glamor'
import { PureComponent } from 'react'
import {ui  ,GR , makeKEY , perspZ}  from '~/utils/ui'

import TAB from '~/components/artisti.tab.Wrapper'
import {IMG_WithLoader} from '~/components/img'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {setFocusOn} from'~/reducers/artisti.tabs'
import { setPanelOn } from '~/reducers/nav'

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
        this.state = {ctxLength:9};
        this.ctxMax = 0 ;
        this.handleClick = this.callFullWork.bind(this)
        this.handleClickMore = this.reqMoreWork.bind(this)
    }


    callFullWork(index){
        console.log(index)
        this.props.setFocusOn(index);
        this.props.setPanelOn('close')
    }

    reqMoreWork(){
        this.setState({ctxLength:this.state.ctxLength+9})
    }

    componentDidMount(){
        this.props.setFocusOn(-1);
    }

    componentshouldupdate(nextProps){
        if(this.props.vw!==nextProps.vw||this.props.landscape!==nextProps.landscape
            ){
            return true
        }else{return false}
    }

    render(){
        const vw = this.props.vw
        const width= this.props.landscape?width:vw
        const size = this.props.width/3.1
        const shouldFetch = vw === undefined ? false:true;
        const contents = this.props.contents.filter((item,index)=>index<this.state.ctxLength)
        return(
            <div
             {...css({
                    display:'flex',
                    flexDirection:'row',
                    flexWrap:'wrap',
                    width:`${this.props.width}`,
                    margin:'auto',//居中
                 })}
            >
                {/*Img*/}
                {
                    contents.map((item,index)=>
                        <div
                          {...css({
                            justifyContent:'flex-start',
                            margin:`1px`,
                            cursor:'pointer',
                        })}
                        key = {`working_${index}`}
                        onClick = {()=>{this.handleClick(index)}}
                        >
                            <IMG_WithLoader
                             src = {item.img}
                             height = {size}
                             width = {size}
                             fullWidth = {true}
                             fetch = {shouldFetch}
                            />
                        </div>
                    )
                }


                {/*MORE*/}
                <div
                  {...css({
                    display:'flex',
                    width:'100%',
                    justifyContent:'center',
                    alignItems:'center',
                    cursor:'pointer',
                    height:'20vh',
                    fontSize:'1.5rem',
                })}
                  onClick = {this.handleClickMore}
                  >
                    {'more'}
                </div>

            </div>
        )/*return*/
    }/*render*/
}


const mapStateToProps = (state) => {

    return ({
        vw:state.Root.view_size.vw,
        landscape:state.Root.view_size.is_landscape,
        // on:state.Tab.on,
    });
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFocusOn: bindActionCreators(setFocusOn, dispatch),
    //nav
    setPanelOn:bindActionCreators(setPanelOn, dispatch )
  }
}


const Comp = connect(mapStateToProps,mapDispatchToProps)(Works)
export default TAB()(Comp)






