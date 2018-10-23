/*  参考:  https://threejs.org/examples/webgl_materials_cubemap
使用:

<MOUSEROTELEMENT
 track={this.props.show} //开启
 windowId={'nav'} //监听元素
 targetId={'nav_artist'} //变换元素
 // @this.props.vw //已经通过reducer得到
 // @this.props.vh //已经通过reducer得到
/>


*/

import  {PureComponent} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import  debounce  from 'lodash/debounce'
import { setMousePos } from 'reducers/root'
// import * as THREE from 'three';
class mousePosDispatcher extends PureComponent {

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
        // this._$window (@componentDidMount)
        this.mouse = { x: 0, y: 0 };
        this.reqAnimFrame =null;
        this.haddleMouseTrackOn =  (e)=>{this.startMouseTrack(e)};
        this.haddleMouseTrackOff =  debounce(this.stopMouseTrack, 100,{ leading: false, trailing: true });
    }

    dispatch(){
        // {three - camera}
        // init Three - camera pos
        // this.camera.position.z = 50;
        // this.camera.position.y = 100;
        // this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
        // this.camera.position.z = 2000;
        // {three}
        //

        this._$window.addEventListener('mousemove', this.haddleMouseTrackOn, false);//onDocumentMouseMove
        // for debounce
        this._$window.addEventListener('mousemove', this.haddleMouseTrackOff, false);//onDocumentMouseMove

    }

    dispose(){
        // 未加载window 无法识别
        // debugger
        if (typeof this._$window === 'undefined') return
        // 监听清理
        this._$window.removeEventListener("mousemove", this.haddleMouseTrackOn,false)
        this._$window.removeEventListener("mousemove", this.haddleMouseTrackOff,false)
        // 进一步确保组件销毁后结束循环
        this.stopMouseTrack()
    }

    update=()=>{
        this.props.setMousePos({x:this.mouse.x,y:this.mouse.y})
        // this.camera.position.x += (this.mouse.x - this.camera.position.x) * .03;
        // this.camera.position.y += (-this.mouse.y - this.camera.position.y) * .03;
        // this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );// Opt可以 lookAt( scene.position );
        //

    }



    startMouseTrack=(e)=>{
        //清楚前一个 requestAnimationFrame
        window.cancelAnimationFrame(this.reqAnimFrame);
        e.preventDefault();  // 阻止事件继续传播
        e.stopPropagation(); // 取消事件的默认行为
        this.mouse.x = e.pageX;
        this.mouse.y = e.pageY;
        // redux 发送数据
        this.reqAnimFrame = window.requestAnimationFrame(this.update);
    }

    stopMouseTrack=()=>{
        window.cancelAnimationFrame(this.reqAnimFrame);
    }


    componentWillMount(){
        this.dispose();
    }


    componentDidMount(){
        // 如果有沒有指定windowId ,使用window
        this._$window = this.props.windowId?document.getElementById(this.props.windowId):window
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    // root
    setMousePos: bindActionCreators(setMousePos, dispatch),
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(mousePosDispatcher)
