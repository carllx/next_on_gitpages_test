import { connect } from 'react-redux'
import {PureComponent} from 'react'
import { css } from 'glamor'
import {TweenMax} from "gsap";
import Link from 'next/link';
import {ui,GR}  from '~/utils/ui'

import markdown from 'markdown-in-js'

class NavNews extends PureComponent {
    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.nav_on !== this.props.nav_on) {
            //避免在打开父NAV时也执行
            if(nextProps.nav_on==='news') { //如果about激活
                this.show();
            }else if(this.props.nav_on==='news'){ //如果之前的是about现在状态已经切换
                this.close();
            }
        }
    }

    componentDidMount(){
        this.close();
    }

    render(){

        return(
            <div
                 {...css({
                    position:'fixed',
                    width: '100vw',
                    height:'100vh',
                    zIndex:9,
                    top:0,
                    left:0,
                    display: 'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    pointerEvents:'none', //避免遮挡Logo点击
                    overflow: 'hidden',//@parallax
                 })}
                >
                <div
                 {...css({
                    display:'flex',
                    justifyContent:'center',
                    backgroundColor:this.props.backgroundColor||ui.color.w_o2,
                    padding:'7em 5em',
                 })}
                 className = {'News'}
                >
                    {markdown`
                        ## This is a title
                        This is a paragraph`
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    view_size:state.Root.view_size,
    language:state.Root.language,
    device:state.Root.device,
    nav_on:state.nav.on,
});


export default connect(mapStateToProps)(NavNews)
