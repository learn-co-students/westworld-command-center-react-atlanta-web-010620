import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList'
import PropTypes from 'prop-types';

const Area = (props) => (

  <div className='area' id={props.area.name}>
    <h3 className='labels'>{props.area.name.split('_').map(string => string[0].toUpperCase() + string.slice(1)).join(' ')}</h3>

    <HostList handleCurrentHost={props.handleCurrentHost} currentHostId={props.currentHostId} hosts={props.hosts}/>
    {/* {props.hosts.map(host => <Host key={host.id} handleClick={props.handleCurrentHost} currentHostId={props.currentHostId} host={host}/>)} */}

  </div>

)

Area.propTypes = {
  hosts: function(props, propName, componentName){
    if(props.hosts.length > props.area.limit){
      throw Error(
        `HEY!! You got too many hosts in ${props.area.name}. The limit for that area is ${props.area.limit}. You gotta fix that!`
      )
    }
  }
}

export default Area;
