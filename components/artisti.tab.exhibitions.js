import { css } from 'glamor'
import { PureComponent } from 'react'
import {ui  ,GR , makeKEY , perspZ}  from '~/utils/ui'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TAB from '~/components/artisti.tab.Wrapper'

class Button extends PureComponent {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div
             {...css({
                marginRight:'3rem',
                cursor:'pointer',
                color:this.props.on?ui.color.b_o1:ui.color.b_o2,
                fontWeight:this.props.on?900:100,
             })}
             onClick={this.props.onClick}
            >{this.props.name}</div>
        )
    }
}

class Exhibitions extends PureComponent {
    constructor(props){
        super(props);
        this.state = {on:'ALL'}
        this.handleClick  = this.onClick.bind(this)
    }
/*    componentDidMount(){
        this.setState({on:'ALL'})
    }*/
    onClick(name){
        this.setState({on:name})
    }
    render(){
        console.log('Exhibitions',this.props)
        let content=[]
        if (this.state.on ==='Solo'){
            content = this.props.contents[0]
        }else if (this.state.on ==='Group'){
            content = this.props.contents[1]
        }else if(this.state.on ==='ALL'){
            // 遗憾 array 的数据没有合并在一起
            content = Object.assign({},{...this.props.contents[0]},{...this.props.contents[1]})
        }
        // const soloContents = this.props.contents[0]
        // const groupContents = this.props.contents[1]
        // debugger
        return(
            <div
             {...css({
                    display:'flex',
                    flexDirection:'column'
                 })}
            >

                <div
                  {...css({
                    justifyContent:'flex-start',
                    display:'flex',
                    flexDirection:'row',
                    marginTop:'2rem',
                    marginBottom:'3rem',
                })}
                >
                    <Button name = 'ALL' onClick={()=>{this.handleClick('ALL')}} on = {this.state.on ==='ALL'}/>
                    <Button name = 'Solo Exhibitions'onClick={()=>{this.handleClick('Solo')}} on = {this.state.on ==='Solo'}/>
                    <Button name = 'Group Exhibitions'onClick={()=>{this.handleClick('Group')}} on = {this.state.on ==='Group'}/>
                </div>



                {/* 个展&群展 */}
                {
                     Object.keys(content).map((item, index) =>
                            <div
                             {...css({
                                justifyContent:'flex-start',
                                display:'flex',
                                flexDirection:'row'
                             })}
                             key={`${this.props.tabName}_${Object.keys(item)}_${index}`}
                            >
                                <div
                                 {...css({
                                    color:ui.color.b_o2,
                                    fontWeight:900,

                                 })}
                                >{item}</div>
                                <div
                                 {...css({
                                    justifyContent:'flex-start',
                                    display:'flex',
                                    flexDirection:'column',
                                    marginLeft:'2rem',
                                    marginBottom:'1rem',
                                 })}
                                >
                                    {content[item].map((s,i)=>
                                        <div
                                         key = {`${this.props.tabName}_${Object.keys(item)}_${index}_${i}`}
                                         >{`${s}`}</div>
                                    )}
                                </div>

                            </div>
                        )
                }
            </div>


        )/*return*/
    }/*render*/
}

// const mapStateToProps = (state) => {

//     return ({
//         on:state.Tab.on,
//     });
// }

// export default connect(mapStateToProps,null)(TAB()(Exhibitions))
// const Comp = connect(mapStateToProps,null)(Exhibitions)
// export default TAB()(Comp)
//
export default TAB()(Exhibitions)
