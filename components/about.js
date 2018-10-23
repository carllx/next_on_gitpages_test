import {PureComponent} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setPanelOn } from 'reducers/nav'
// import withRedux from 'next-redux-wrapper'
import { css } from 'glamor'

import {ui,GR}  from 'utils/ui'

import LOGO from 'components/svg/icons_logo'
import BGShape from 'components/aboutBackGround'//class=aboutBG





class Logo2About extends PureComponent{
    constructor(props){
        super(props)
        this.state ={showAbout:false}
    }

    LogoClick=()=>{
        this.setState({showAbout:!this.state.showAbout})
    }

    render(){
        const language = this.props.language ||'zh'
        const landscape = this.props.landscape ||false
        const vw = this.props.vw ||0
        const vh = this.props.vh ||0
        return(

            <div
             {...css({
                /*居中*/
                 display:'flex',
                 flexDirection:'column',
                 alignItems:'center',
                 position:'absolute',
                 height: `fit-content`,
                 width: landscape?`${GR.vw(3)}vw`:`${GR.vw(1)}vw`,
                 // display: 'block',
                 marginLeft:landscape?'auto':`${GR.vw(6)}vw`,
                 marginTop:landscape?'auto':`${GR.vw(6)}vw`,
                 marginRight:'auto',
                 marginBottom:'auto',
                 top: 0, left: 0, right: 0, bottom: 0,
                 cursor:'pointer',
            })}
            className= {'index_LOGO'}
            onClick = {this.LogoClick}
            >
                {/*LOGO*/}
                <LOGO/>


                <BGShape
                 showAbout = {this.state.showAbout}
                />
            </div>
        )
    }
}







const mapStateToProps = (state) => {

    return ({
        vw:state.Root.view_size.vw,
        vh:state.Root.view_size.vh,
        landscape:state.Root.view_size.is_landscape,
        language:state.Root.language,
        worksFocusOn:state.Tab.worksFocusOn,
    });
}



export default connect(mapStateToProps,null)(Logo2About)


