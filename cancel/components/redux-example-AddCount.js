import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addCount } from '../redux-example-store'

class AddCount extends Component {
  add = () => {
    this.props.addCount()
  }

  render () {
    const { count } = this.props
    return (
      <div>
        <style jsx>{`
          div {
            padding: 0 0 20px 0;
          }
      `}</style>
        <h1>AddCount: <span>{count}</span></h1>
        <button onClick={this.add}>Add To Count</button>
      </div>
    )
  }
}

const mapStateToProps = ({ count }) => ({ count })

const mapDispatchToProps = (dispatch) => {
  return {
    addCount: bindActionCreators(addCount, dispatch)
  }
}
// connect() 前，需要先定义 mapStateToProps 这个函数来指定如何把当前 Redux store state 映射到展示组件的 props 中
export default connect(mapStateToProps, mapDispatchToProps)(AddCount)
