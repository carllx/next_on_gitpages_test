import { css } from 'glamor'
import {TweenMax} from "gsap";
import { PureComponent } from 'react'
import {ui}  from '~/utils/ui'

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
                        `.WRAPPER_${this.props.tabName}`,
                        0.5,
                        {
                            y:150,
                            opacity:0,
                            autoAlpha:0,
                            display: 'none',
                        },{
                            y:0,
                            ease: Power4.easeOut,
                            autoAlpha:1,//opacity:1,visibility:'visible'
                            display: 'flex',
                        },
                        0.2);/*TweenMax*/
                }

                // 从这个Tab退出 , 激活其他Tabs 时
                if(this.props.onTab === this.props.tabName){
                    TweenMax.to(
                        `.WRAPPER_${this.props.tabName}`,
                        0.5,
                        {
                            y:150,
                            opacity:0,
                            autoAlpha:0,
                            display: 'none',
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
                const {language } = this.props ||{language:'zh'}
                let copyRight ;
                if(language === 'zh') {
                  copyRight = 'Copyright © 2017 中艺国际有限公司.All rights reserved'
                }else if(language === 'it'){
                  copyRight = 'Copyright © 2017 ZHONG ART INTERNATIONAL SRL.All rights reserved'
                }else{
                  copyRight = 'Copyright © 2017 ZHONG ART INTERNATIONAL LTD.All rights reserved'
                }
                return (
                    <div
                     {...css({
                        position:'absolute',
                        /*居中*/
                        display:'flex',
                        width: '100vw',
                        flexDirection:'column',
                        // justifyContent:'center',
                        /*居中*/
                        visibility:'hidden',
                     })}
                     className = {`WRAPPER_${this.props.tabName}`}
                     key = {`TAB_${this.props.tabName}_${language}`}
                    >
                        <Comp
                         tabName = {this.props.tabName}
                         contents = {this.props.contents}
                         width = {this.props.width}
                        />

                        {/*COPYRIGHT*/}
                        <div
                         {...css({
                          color:ui.color.b_o2,
                          // display:'flex',
                          // justifyContent:'center',
                          // alignItems:'center',
                          // flexDirection:'row',
                          // width:`${this.props.vw}px`,
                          // height:`${this.props.landscape?'10rem':'5rem'}`,
                          //


                          position: 'absolute',
                          right: 0,
                          bottom: 0,
                          left: 0,
                          textAlign:'center',
                          paddingTop: '3rem',
                          paddingBottom: '1.5rem',
                          // marginBottom:`${is_landscape?GR.vw(6):GR.vw(6)}vw`,
                         })}
                         key= {`COPYRIGHT_${language}`}
                        >
                          <div>
                            {copyRight}
                          </div>
                        </div>
                    </div>
                )
            }
        }

        const mapStateToProps = (state) => {

            return ({
                onTab:state.Tab.on,
                vw:state.Root.view_size.vw,
                landscape:state.Root.view_size.landscape,
                language:state.Root.language,
            });
        }
        return connect(mapStateToProps,null)(Tab)
     }












export default  TAB
// export default connect(mapStateToProps,null)(TAB)
