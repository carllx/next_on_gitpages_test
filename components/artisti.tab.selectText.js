import { css } from 'glamor'
import { PureComponent } from 'react'
import {ui }  from '~/utils/ui'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TAB from '~/components/artisti.tab.Wrapper'


// Author
// class AuthorButton extends PureComponent {
//     constructor(props){
//         super(props);
//     }
//     render(){
//         return(
//             <div
//              {...css({
//                 marginRight:'3rem',
//                 cursor:'pointer',
//                 // width:'3rem',/*居中*/
//                 color:this.props.on?ui.color.b_o1:ui.color.b_o2,
//                 fontWeight:this.props.on?900:100,
//              })}

//              onClick={this.props.onClick}
//             >{this.props.name}</div>
//         )
//     }
// }



class SelectText extends PureComponent {
    constructor(props){
        super(props);
        this.state = {on:0}
        this.handleClick  = this.onClick.bind(this)
    }

    onClick(index){
        this.setState({on:index})
    }

    render(){
        // debugger
        // /*author*/
        const CONTENTS = this.props.contents
        const titles = CONTENTS.map(item =>item.title)

        const content = CONTENTS[this.state.on]
        // const author={}


        return(
            <div
            {...css({
                  position:'relative',
                  width:`${this.props.width}`,
                  margin:'auto',//居中
                  minHeight:'60vh',//为了footer
              })}
            className = {this.props.tabName}
            >


                {
                    BIOGRAPHY[this.props.language]
                        .split('\n')
                        .map((item, key) =>
                          <span key={`${this.props.tabName}_${key}_${this.props.language}`}>{item}<br/><br/></span>
                        )
                }




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
                     Object.keys(exhibitions).map((item, index) =>
                            <div
                             {...css({
                                justifyContent:'flex-start',
                                display:'flex',
                                flexDirection:'row',
                             })}
                             key={`${this.props.tabName}_exhibitions_${Object.keys(item)}_${this.props.language}_${index}`}
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
                                    {exhibitions[item].map((s,i)=>
                                        <div
                                         key = {`${this.props.tabName}_exhibitions_${Object.keys(item)}_${index}_${i}`}
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

const mapStateToProps = (state) => {

    return ({
        // vw:state.Root.view_size.vw,
        // landscape:state.Root.view_size.is_landscape,
        language:state.Root.language,
        landscape:state.Root.view_size.is_landscape,
        // on:state.Tab.on,
    });
}


const Comp = connect(mapStateToProps,null)(SelectText)
export default TAB()(Comp)
