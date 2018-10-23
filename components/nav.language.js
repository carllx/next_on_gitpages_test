// nav.language.js
import {PureComponent} from 'react'
import { css } from 'glamor'
import {ui  ,GR}  from 'utils/ui'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import  {switchLanguage}  from 'reducers/root'

class Language extends PureComponent {
    constructor(props){
        super(props)
    }
    render(){
        const islandscape = this.props.is_landscape;
        return(
            <div {...css({
                position:'fixed',
                // top:islandscape?null:0,
                bottom:0,
                right:0,
                display:islandscape?'flex':'none',
                flexDirection:'row',
                cursor:'pointer',
                pointerEvents:'auto',
                '> span':{
                    marginRight:`${GR.vw(8)}vw`
                },
            })}>
            <span
             onClick={(e)=>{
                e.stopPropagation()
                e.preventDefault()
                this.props.switchLanguage('it')}}

            >ITALIANO</span>
            <span
             onClick={(e)=>{
                e.stopPropagation()
                e.preventDefault()
                this.props.switchLanguage('en')}}

            >ENGLISH</span>
            <span
             onClick={(e)=>{
                e.stopPropagation()
                e.preventDefault()
                this.props.switchLanguage('zh')}}

            >中文</span>
            </div>

        );
    }


}

// const mapStateToProps = (state) => ({
//     islandscape:state.Root.view_size.is_landscape,
// });

const mapDispatchToProps = (dispatch ) =>{
    return {
        switchLanguage: bindActionCreators(switchLanguage, dispatch)
    }
}



// export default Nav;
export default connect(null,mapDispatchToProps)(Language)
