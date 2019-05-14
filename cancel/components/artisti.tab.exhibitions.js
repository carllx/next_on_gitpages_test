import { css } from 'glamor'
import { PureComponent } from 'react'
import {ui }  from '~/utils/ui'

import { connect } from 'react-redux'
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
                // width:'3rem',/*居中*/
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
        // console.log('Exhibitions',this.props)
        let content={}
        if (this.state.on ==='Solo'){
            content = this.props.contents[this.props.language][0]
        }else if (this.state.on ==='Group'){
            content = this.props.contents[this.props.language][1]
        }else if(this.state.on ==='ALL'){
            // 遗憾 array 的数据没有合并在一起
            // 1.
            /*let obj = Object.assign({},{...this.props.contents[this.props.language][0]},{...this.props.contents[this.props.language][1]})*/

            const solo = this.props.contents[this.props.language][0]
            const group = this.props.contents[this.props.language][1]
            // console.log(solo)
            // console.log(group)
            let all = Object.assign({},{...solo})
            for(let key in all){
                if(group[key]){
                    all[key]= all[key].concat(group[key])
                }
            }
            content = Object.assign({},{...group},{...all})
            // console.error(content)
        }
        // const soloContents = this.props.contents[this.props.language][0]
        // const groupContents = this.props.contents[this.props.language][1]
        // debugger
        return(
            <div
             {...css({
                display:'flex',
                flexDirection:'column',
                width:this.props.width,
                margin:'auto',//居中
                userSelect: 'none',
            })}
        >

                <div
                  {...css({

                    display:'flex',
                    flexDirection:'row',
                    justifyContent:this.props.landscape?'flex-start':'center',/*如果是手机居中*/
                    // marginLeft:'auto',
                    // marginRight:'auto',
                    marginTop:'2rem',
                    marginBottom:'3rem',
                })}
                >
                    <Button name = 'ALL Exhibitions' onClick={()=>{this.handleClick('ALL')}} on = {this.state.on ==='ALL'}/>
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
                                flexDirection:'row',
                             })}
                             key={`${this.props.tabName}_${Object.keys(item)}_${this.props.language}_${index}`}
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
const mapStateToProps = (state) => {

    return ({
        landscape:state.Root.view_size.is_landscape,
        language:state.Root.language,
        on:state.Tab.on,
    });
}


const Comp = connect(mapStateToProps,null)(Exhibitions)
export default TAB()(Comp)
