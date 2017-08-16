import React, {Component} from 'react'
import Button from 'material-ui/Button'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from 'material-ui/Dialog'

// import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography'
import withRoot from '../components/withRoot'

// import {Nav} from '../components/nav'

import {Tabs} from 'material-ui/Tabs/Tabs';
// import {Tab} from 'material-ui/Tabs/Tab';

const styles = {
  title:{
    height:120,
    width:100

  },
  container: {
    textAlign: 'center',
    paddingTop: 200
  },
  button:{
    marginTop:'1rem'
  }
}

const AppBarExampleIcon = () => (
  <div><AppBar title="hi"/></div>
);

class Index extends Component {
  state = {
    open: false
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    })
  };

  handleClick = () => {
    this.setState({
      open: true
    })
  };

  render () {
    return (
      <div style={styles.container}>
        <Tabs></Tabs>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>Z.A.I:</DialogTitle>
          <DialogContent>
            <DialogContentText>注意: 您正使用微信浏览器, 这可能导致部分功能会失效, 我们建议您选用其他浏览器登录.</DialogContentText>
            <DialogContentText>是否继续?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color='primary' onClick={this.handleRequestClose}>OK</Button>
          </DialogActions>
        </Dialog>
        
        <AppBarExampleIcon />
        
        <Typography type='display1'>中艺国际欢迎你</Typography>
        {/*<Typography type='subheading' gutterBottom>example project</Typography>*/}
        <Button style={styles.button} raised color='accent' onClick={this.handleClick}>
          进入
        </Button>
      </div>
    )
  }
}

export default withRoot(Index)