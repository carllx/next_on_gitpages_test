import React, {Component} from 'react'
import glamorous from 'glamorous'
// import Logo from './logo'
// import {ui}  from '../utils/ui'
import {debounce} from '../utils/throttle'
import {mouseCenterElement} from '../utils/mouse'




export const Cycle = glamorous.span({

        background: 'rgba(0,0,0,.12)',

        borderRadius: '50%',
        position: 'absolute',
        // top: 0,
        // left: 0,
        // display: 'inline-block',
        height:    '247px',
        width:     '247px',
        // transform: 'translate(-50%,-50%)',
        // transformOrigin:'50% 50%',

        backgroundColor:'rgba(33,33,33,.26)',
        // pointerEvents: 'none',//
        transitionDuration: '.45s',
        transitionProperty: 'opacity,transform',
        // animationDirection:'alternate',
        transitionTimingFunction: 'cubic-bezier(.4,0,1,1)',

    },(props)=>({
        // left:      props.x,//-6.96774px;
        // top:       props.y,//-101.968px;
        opacity:   props.active?1:0,

        // height:    props.size?props.size+'px':'10px',//247.935px;
        // width:     props.size?props.size+'px':'10px',//247.935px;
        transform: props.active?`scale(.9) `:`scale(0)`,

        // transition: props.active?'all 0.3s cubic-bezier(.4,0,1,1)',
        // opacity: props.active?'all 0.3s cubic-bezier(.4,0,1,1)',
        top:props.active?props.y:0,
        left:props.active?props.x:0,
        // transform: props.active?`scale(${props.size*10},${props.size*10})`:`scale(0,0)`,
        // left:props.x?props.x:0,
        // top:props.y?props.y:0,

    })
)






const HOC_Button = function(Comp){

    return class BB extends Component {
        constructor(props){
            super(props);
            this.state = {
                x:0,
                y:0,
                active:false,
                // size:1,
            };

            this.ms= 450;

        };

        cleanXbtn = ()=>{
            this.setState({active:false});
            // console.log(this);
        }

        handleObtn = (e)=>{

            // @ mouse.js 计算鼠标在元素中的相对位置
            const position = mouseCenterElement(e);

            const x = position.x;
            const y = position.y;
            // 清理之前的等待响应 , 防止重复点击
            if (this.timeoutFn) clearTimeout(this.timeoutFn);

            this.setState({
                x:x,
                y:y,
                active:true
            })
            // 间隔事假
            this.timeoutFn = setTimeout(this.cleanXbtn,this.ms)

        }

        render(){

            return(
                <div>
                    <Comp
                     style={{
                        overflow:'hidden',
                        position: 'absolute',
                        width:'247px',
                        height:'3rem',
                        fontSize:'2rem',
                        }}

                     onClick= {this.handleObtn}
                     >

                        <Cycle
                         x= {this.state.x}
                         y= {this.state.y}
                         active= {this.state.active}
                         size={this.state.size}
                        />

                        <span
                         style={{
                        userSelect:  'none',
                        }}

                        >{'kkkkkkk'}</span>



                    </Comp>
                </div>
        )}
    }
}





const KK = glamorous.div({


    // margin:'.8em',

})

export let Test =  HOC_Button(KK)


