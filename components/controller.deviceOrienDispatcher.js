/*  参考:  https://threejs.org/examples/webgl_materials_cubemap
使用:

<MOUSEROTELEMENT
 track={this.props.show} //开启
 targetId={'nav_artist'} //变换元素
 // @this.props.vw //已经通过reducer得到
 // @this.props.vh //已经通过reducer得到
/>
*/


import  {PureComponent} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import  debounce  from 'lodash/debounce'
import {Math as THREE_Math ,Vector3 as THREE_Vector3 ,Quaternion as THREE_Quaternion ,Euler as THREE_Euler ,Matrix4 as THREE_Matrix4 } from 'three'

import { setgyo } from 'reducers/root'

class deviceOrienDispatcher extends PureComponent {

    constructor(props){

        super(props)
        // @this.props.track// 开启
        // @this.props.windowId 监听元素
        // @this.props.targetId 变换元素
        //
        // @this.props.camera (three)
        // @this.props.vw //通过reducer
        // @this.props.vh //通过reducer
        // this.windowHalfX (@componentDidMount)
        // this.windowHalfY (@componentDidMount)

        //初始化 Camera Position
        this.initPos = new THREE_Vector3( -2, 0, 45 ); // 镜头的初始值坐标
        this.mouse = { x: 0, y: 0 };
        this.reqAnimFrame =null;
        this.haddleMouseTrackOn =  (e)=>{this.startOrientTrack(e)};
        this.haddleMouseTrackOff =  debounce(this.stopMouseTrack, 100,{ leading: false, trailing: true });
    }

    dispatch(){
        // {three - camera}
        // init Three - camera pos
        // this.camera.position.z = 50;
        // this.camera.position.y = 100;
        // this.camera = new THREE_PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
        // this.camera.position.z = 2000;
        // {three}
        if (typeof window === 'undefined') return;
        window.addEventListener('deviceorientation', this.haddleMouseTrackOn, false);//onDocumentMouseMove
        // for debounce
        window.addEventListener('deviceorientation', this.haddleMouseTrackOff, false);//onDocumentMouseMove

    }

    dispose(){
        // 未加载window 无法识别
        // debugger
        if (typeof window === 'undefined') return
        // 监听清理
        window.removeEventListener("deviceorientation", this.haddleMouseTrackOn,false)
        window.removeEventListener("deviceorientation", this.haddleMouseTrackOff,false)
        // 进一步确保组件销毁后结束循环
        this.stopMouseTrack()
    }

    update=()=>{
        this.props.setgyo({alpha:this.alpha,beta:this.beta,gamma:this.gamma})
    }

    normaliserOrientation(e) {
        /* Thanks to ajfisher
            https://github.com/ajfisher/deviceapi-normaliser/blob/6f739a6e2cd24d7d61cf4b787b4e0847151d62db/deviceapi-normaliser.js
        */
        // normalise the values for the orientation event.

        // TODO:
        // these values need further normalisation because I know safari
        // breaks them but haven't got a device to test with.

        this.gamma = e.gamma;
        this.beta = e.beta;
        this.alpha = e.alpha; // compass

        this.absolute = false;
        if (e.absolute !== null) { this.absolute = e.absolute; }

        return(this);
    }




    startOrientTrack=(e)=>{

        e.preventDefault();  // 阻止事件继续传播
        e.stopPropagation(); // 取消事件的默认行为
        window.cancelAnimationFrame(this.reqAnimFrame);
        console.log('webkitCompassHeading:',e.webkitCompassHeading)
        if(e.alpha===null) return
        this.alpha = e.alpha
        this.beta = e.beta
        this.gamma = e.gamma
        this.reqAnimFrame = window.requestAnimationFrame(this.update);
    }

    stopMouseTrack=()=>{

        window.cancelAnimationFrame(this.reqAnimFrame);
    }


    componentWillMount(){
        this.dispose();
    }


    componentDidMount(){
        // debugger
        // init dom
        const {vw,vh} =this.props.view_size
        this.windowHalfX = vw / 2;
        this.windowHalfY = vh / 2;
    }

    componentWillReceiveProps(nextProps){
        // 父组件激活监听和操作
        if(nextProps.track!==this.props.track){
            if(nextProps.track) {
                this.dispatch()
            }else{
                this.dispose()
            }
        }
    }

    componentWillUnmount(){
        this.dispose();
    }

    render(){
        return (null)
    }
}


const mapStateToProps = (state) => ({
    view_size:state.Root.view_size,
    device:state.Root.device, //
});

const mapDispatchToProps = (dispatch) => {
  return {
    // root
    setgyo: bindActionCreators(setgyo, dispatch),
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(deviceOrienDispatcher)



