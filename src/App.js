import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap';
import Headquarters from './components/Headquarters'
import { Log } from './services/Log'

class App extends Component {

  // As you go through the components given you'll see a lot of functional components.
  // But feel free to change them to whatever you want.
  // It's up to you whether they should be stateful or not.

  state = {
    hosts: [],
    areas: [],
    currentHostId: '',
    currentHost: '',
    activated: false,
    logs: [],
  }

  activateAll = () => {
    let newLogs = this.state.logs.slice()
    newLogs.unshift(Log.warn("Activating all hosts."))
    this.setState({
      logs: newLogs,
      activated: true,
      hosts: this.state.hosts.map(host => {
        host.active = true
        return host
      })
    })
  }

  deactivateAll = () => {
    let newLogs = this.state.logs.slice()
    newLogs.unshift(Log.notify("Decommissiong all hosts."))
    this.setState({
      activated: false,
      logs: newLogs,
      hosts: this.state.hosts.map(host => {
        host.active = false
        return host
      })
    })
  }

  handleActivation = () => {
    let currentHost = this.state.currentHost
    currentHost.active = (currentHost.active ? false : true)
    let newLogs = this.state.logs.slice()
    newLogs.unshift((currentHost.active ? Log.warn(`Activated ${currentHost.firstName}`) : Log.notify(`Decommissioned ${currentHost.firstName}`)))
    this.setState({
      currentHost: currentHost,
      logs: newLogs,
    })
  }

  updateArea = (area) => {
    let currentHost = this.state.currentHost
    const areaObj = this.state.areas.filter(a => a.name === area)[0]
    if (this.state.hosts.filter(host => host.area === area).length < areaObj.limit) {
    currentHost.area = area
    let newLogs = this.state.logs.slice()
    newLogs.unshift(Log.notify(`${currentHost.firstName} set in area ${area.split('_').map(string => string[0].toUpperCase() + string.slice(1)).join(' ')}`))
    this.setState({
      currentHost: currentHost,
      logs: newLogs,
    })
  } else {
    let newLogs = this.state.logs.slice()
    newLogs.unshift(Log.error(`Too many hosts. Cannot add ${currentHost.firstName} to ${area}`))
    this.setState({
      logs: newLogs
    })
  }
  }

  componentDidMount() {
    fetch('http://localhost:4000/hosts')
    .then(resp => resp.json())
    .then(hosts => {
      this.setState({
        hosts: hosts,
      })
    })
    fetch('http://localhost:4000/areas')
    .then(resp => resp.json())
    .then(areas => {
      this.setState({
        areas: areas,
      })
    })
  }

  handleCurrentHost = (id) => {
    this.setState({currentHostId: id, currentHost: this.state.hosts.filter(host => host.id === id)[0]})
  }

  render(){
    return (
      <Segment id='app'>
        <WestworldMap currentHost={this.state.currentHost} currentHostId={this.state.currentHostId} handleCurrentHost={this.handleCurrentHost} hosts={this.state.hosts.filter(host => host.active)} areas={this.state.areas}/>
        <Headquarters activated={this.state.activated} logs={this.state.logs} deactivateAll={this.deactivateAll} activateAll={this.activateAll} currentHost={this.state.currentHost} updateArea={this.updateArea} handleActivation={this.handleActivation} currentHostId={this.state.currentHostId} handleCurrentHost={this.handleCurrentHost} hosts={this.state.hosts.filter(host => !host.authorized)} areas={this.state.areas}/>
      </Segment>
    )
  }
}

export default App;
