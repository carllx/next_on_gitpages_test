/*
  参考:https://github.com/camwiegert/in-view (star 3,889)
  迭代一个 elements group,保证同一时间请求getBoundingClientRect',
  避免getBoundingClientRect'过程中如果某个element触发浏览器的paint,
  浏览器会 recalculate style 一次
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

/**
props 输入group_Name

view :{
    group_Name:{
        active,[
            {inView,top},
            {inView,top},
            {inView,top},
            .....
        ]
    },
    group_otherName:{},
}
*/
class IS_IN_View extends PureComponent{
    constructor(props){
        super(props)
        // this.props.groupName='section_event'
        // this.props.zGroup = ;// 识别深度0:group_root
        // this.props.parentHeight //更改了,自动更新state
        this.props.top = ;
    }

    componentWillReceiveProps(){
        // 组件的高度 ,如果更改, 触发重计算 ,发送 top
        if(nextProps.top!==this.props.top){
            this.isInview()
        }
    }

    shouldComponentUpdate(nextProps){
        if(nextProps.top==this.props.top) return false;
        if(!nextProps.active) return false;
    }

    componentDidMount(){
        /*拟定index,提供索引?*/

    }

    isInview=(element)=>{
        this.props.scrollY
    }

    _control=(selector)=>{
        if (typeof selector !== 'string') return;

        // 获取elements元素的最新列表 .
        // .slice.call 使 elements  拥有 array 的push等方法
        // [如何理解和熟练运用js中的call及apply？]https://www.zhihu.com/question/20289071
        let elements = [].slice.call(document.querySelectorAll(selector));

        // If the registry exists, update the elements.
        if (selectors.history.indexOf(selector) > -1) {
            selectors[selector].elements = elements;
        }

        // If it doesn't exist, create a new registry.
        else {
            selectors[selector] = Registry(elements, options);
            selectors.history.push(selector);
        }

        return selectors[selector];
    }

    _findTop=()=>{
        //  element 在page 的 位置 is on the page
        // 参考 http://www.quirksmode.org/js/findpos.html
        let curtop  = 0;
        if (element.offsetParent) {
            do {
                curtop += element.offsetTop;
            } while (element = element.offsetParent);
        }
        return curtop
    }

    render(){
        const winY = this.props.scrollY //目前scroll的坐标
        const top = this.props.top // 父组件的高度 ,如果更改, 触发重计算 calcPos ,发送 isInview
        return null
    }
}



const mapStateToProps = (state,ownProps) => {
    // const inView = state.view[ownProps.name]!==undefined?state.Section[ownProps.name].onClose:true
    const active = state.view[ownProps.group_name]['active']
    const inView = state.view[ownProps.group_name]['inView']

    // const onClose = state.Section[ownProps.name].onClose
    return ({
        is_landscape:state.Root.view_size.is_landscape,
        RePosTrigger:state.Section.RePosTrigger,
    });
}


const mapDispatchToProps = (dispatch ) =>{
    return {
        setY:bindActionCreators(setInVew, dispatch ),
        setClose:bindActionCreators(setClose, dispatch ),
    }
}

// export default Nav;
export default connect(mapStateToProps ,mapDispatchToProps)(Seczione)
