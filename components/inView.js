/*
  --> 定义 GROUP
  --> 定义 网页中的 height ,
  --> scrollY
  判断是否在激活GROUP ?
  判断 isInView ?(计算Y的方式)
  <-- index

 */
import { css } from 'glamor'
import {ui  ,GR ,makeKEY}  from '../utils/ui'
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {setSectionPostionY,setClose,setFetch} from '~/reducers/section'
import {findPos} from '~/utils/mouse'

/*

    view :{
        group_Name:[
        {active,inView},
        {active,inView},
        {
            active:false/true,
            inView:false/true,
        }]
    }


 */
class IS_IN_View extends PureComponent{
    constructor(props){
        super(props)
        // this.props.groupName='section_event'
        this.props.top=
    }

    componentWillReceiveProps(){}

    shouldComponentUpdate(){
        if(!nextProps.active) return false
    }

    componentDidMount(){
        /*拟定index,提供索引*/
    }


    isInview=()=>{
        this.props.scrollY
    }

    calcPos=(top,height)=>{

    }

    render(){

    }
}



const mapStateToProps = (state,ownProps) => {
    // const inView = state.view[ownProps.name]!==undefined?state.Section[ownProps.name].onClose:true
    const active = state.view[ownProps.group_name]['active']
    const inView = state.view[ownProps.group_name]['inView']

    // const onClose = state.Section[ownProps.name].onClose
    return ({
        language:state.Root.language,
        is_landscape:state.Root.view_size.is_landscape,
        RePosTrigger:state.Section.RePosTrigger,
        onClose:onClose,
    });
}


const mapDispatchToProps = (dispatch ) =>{
    return {
        setInVew:bindActionCreators(setInVew, dispatch ),
        setClose:bindActionCreators(setClose, dispatch ),
    }
}

// export default Nav;
export default connect(mapStateToProps ,mapDispatchToProps)(Seczione)
