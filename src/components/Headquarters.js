import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'


class Headquarters extends Component {
  // Remember, there's many ways to do this. This doesn't have to be a class component. It's up to you.

  state = {
    log: []
  }

  addLog = (event) => {
    this.setState({
      logEvents: [event, ...this.state.logEvents]
    })
  }

  render(){
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>

          <ColdStorage hosts={this.props.hosts} currentHostId={this.props.currentHostId} currentHost={this.props.currentHostId} handleCurrentHost={this.props.handleCurrentHost}/>

        </Grid.Column>
        <Grid.Column width={5}>
          <Details currentHost={this.props.currentHost} updateArea={this.props.updateArea} handleActivation={this.props.handleActivation} currentHostId={this.props.currentHostId} areas={this.props.areas}/>
        </Grid.Column>
        <Grid.Column width={3}>

          <LogPanel logs={this.props.logs} activated={this.props.activated} deactivateAll={this.props.deactivateAll} activateAll={this.props.activateAll}/>

        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
