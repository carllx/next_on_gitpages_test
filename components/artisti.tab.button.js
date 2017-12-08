import { css } from 'glamor'
import {ui  ,GR ,makeKEY ,perspZ}  from '../utils/ui'
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {initTabs , touchOnTab} from '~/reducers/artisti.tabs'
import {findPos} from '~/utils/mouse'
/**
 * 位于Avatar 右侧 的tab 导航栏
 * *** Component
 * COMP-1.TABS.BUTTONS 按钮
 * COMP-2.TBS.LINE 灰色斜线
 * *** 初始化工作
 * - 根据每个 ARTISTI 存在的Key生成 TAB.BUTTONS 按钮
 * - 储存每个TAB.BUTTONS 按钮位置 , 作为灰线移动依据
 * - 默认停留在第一个KEY - biography 上
 * *** Touch 选定交互
 * - 某个KEY (高亮) ,
 * - 灰色斜线(fixed) 移动至选定 Tab/Button 上
 * - reducer 发射通知 Artisti.Tab.section 组件 ,显示对相应KEY 的 value
 *
 */

/* COMP-1.TABS.BUTTONS 按钮 */

class TABS extends PureComponent {

    constructor (props) {

        super(props)
        this.handleClick = this._onClickTab
    }

    componentDidMount(){

        let obj ={}
        this.props.tabs.map((tab)=>
            obj[tab] = findPos(this[`$${tab}`])
        )

        this.props.initTabs(obj)


        // 默认选择第一个Tab
        const firstTab = this.props.tabs[0]
        this.props.touchOnTab(firstTab)
    }

    _onClickTab(tabName){
        // debugger
        this.props.touchOnTab(tabName)
    }


    render(){
        return(
            [
                <div

                 {...css({
                    position:'relative',
                    top:0,
                    right:0,
                    width:this.props.width,
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'space-around',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                 })}
                 key = {`TABS`}
                 className = {'Buttons'}
                >
                    {this.props.tabs.map((tab,index)=>
                        <div
                         {...css({// button
                            transformStyle: 'preserve-3d',//@parallax
                            cursor: 'pointer',
                            marginBottom:'.5em',
                            textAlign:'right',
                         })}
                         ref = {c => this[`$${tab}`] = c}
                         key = {`tabs_${index}`}
                         // ref = {c => this.pppp = c}
                         id = {tab}
                         className = {'tabsButtons'}
                         onClick = {this._onClickTab.bind(this,tab)}//传入tabName
                        >
                            {tab}
                        </div>
                    )}

                </div>,

                <div
                 {...css({
                    position:'absolute',
                })}
                 key = {'tabs_line'}
                >
                </div>
        ]
        )//return
    }
}



const mapDispatchToProps = (dispatch ) =>{
    return {
        initTabs:bindActionCreators(initTabs, dispatch ),
        touchOnTab:bindActionCreators(touchOnTab, dispatch ),
    }
}

// export default Nav;
export default connect(null ,mapDispatchToProps)(TABS)
