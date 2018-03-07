
import {PureComponent} from 'react'
import {css} from 'glamor'
import {ui}  from '~/utils/ui'
import { connect } from 'react-redux'

class Copyright extends PureComponent{
    constructor(props){
        super(props)
        this.ctx ={
            'zh':'Copyright © 2017 中艺国际 All rights reserved',
            'it':'Copyright © 2017 ZHONG ART INTERNATIONAL All rights reserved',
            'en':'Copyright © 2017 ZHONG ART INTERNATIONAL All rights reserved',
        }
    }

    /*
    this.ctx ={
            'zh':'Copyright © 2017 中艺国际有限公司.All rights reserved',
            'it':'Copyright © 2017 ZHONG ART INTERNATIONAL SRL.All rights reserved',
            'en':'Copyright © 2017 ZHONG ART INTERNATIONAL LTD.All rights reserved',
        }
     */

    render(){
        return(
          <div
           {...css({
            color:ui.color.b_o2,
            position: 'relative',
            right: 0,
            left: 0,
            bottom: 0,
            textAlign:'center',
            paddingBottom: '0.5rem',
            textAlign:"center",
            margin:this.props.landscape?'0 5em 1em 5em':'0 1em 1em 1em',
           })}
           key= {`COPYRIGHT_${this.props.language}`}
          >

              {this.ctx[this.props.language]}

          </div>
        )
    }
}



const mapStateToProps = (state) => {

    return ({
        // vw:state.Root.view_size.vw,
        landscape:state.Root.view_size.is_landscape,
        language:state.Root.language,
    });
}



export default connect(mapStateToProps,null)(Copyright)
