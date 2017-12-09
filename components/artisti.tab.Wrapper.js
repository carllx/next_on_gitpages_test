import { css } from 'glamor'
import {TweenMax} from "gsap";
import { PureComponent } from 'react'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
/*
 Wrapper Function(VERSION redux )
 Usage: import 该 Wrapper ,
 例如嵌套组件 'Biography' , 组件为 TAB()(Biography)

 Usage:
 export default   connect(mapStateToProps,null)(TAB()(Biography ,'BIOGRAPHY'))

 @this.props.tabName ----'BIOGRAPHY'(从page artisti 调入)
 @this.props.on ----true/false (从 redux 映射 )
 */


const TAB =()=>
     (Comp)=>{
        class Tab extends PureComponent {
            constructor(props){
                super(props);
            }

            componentWillReceiveProps(nextProps){
                // 不需要
                // if(this.props.onTab===nextProps.onTab)
                // if(this.props.onTab!==nextProps.onTab)

                // 点击了该Tab , 当 nexprops  = 'BIOGRAPHY'
                if(nextProps.onTab === this.props.tabName){
                    TweenMax.fromTo(
                        `.${this.props.tabName}`,
                        0.5,
                        {
                            y:150,
                            opacity:0,
                            autoAlpha:0,
                            // display: 'none',
                        },{
                            y:0,
                            ease: Power4.easeOut,
                            autoAlpha:1,//opacity:1,visibility:'visible'
                            // display: 'block',
                        },
                        0.2);/*TweenMax*/
                }

                // 从这个Tab退出 , 激活其他Tabs 时
                if(this.props.onTab === this.props.tabName){
                    TweenMax.to(
                        `.${this.props.tabName}`,
                        0.5,
                        {
                            y:150,
                            opacity:0,
                            autoAlpha:0,
                            // display: 'none',
                            ease: Power4.easeOut,
                        },
                        0.2);/*TweenMax*/
                }
            }

            // 过滤与这个Tab 无关的更新, 避免on 一更改就渲染一次
            // // 实测不需要
            // componentshouldupdate(nextProps){
            //     if(this.props.onTab!==this.props.tabName&&
            //         nextProps.onTab!==this.props.tabName){
            //         return false
            //     }else{return true}
            // }

            render(){

                return (
                    <div
                     {...css({
                        position:'absolute',

                        width:this.props.width,
                        // display: 'none',// 初始阶段
                        visibility:'hidden'
                     })}
                     className = {this.props.tabName}
                     key = {`TAB_${this.props.tabName}`}
                    >
                        <Comp
                         tabName = {this.props.tabName}
                         contents = {this.props.contents}
                         size = {this.props.width}
                        />
                    </div>
                )
            }
        }

        const mapStateToProps = (state) => {

            return ({
                onTab:state.Tab.on,
            });
        }
        return connect(mapStateToProps,null)(Tab)
     }












export default  TAB
// export default connect(mapStateToProps,null)(TAB)
