import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = (props) => {

  return(
    <Card
      className={(props.currentHostId === props.host.id) ? "host selected" : "host"}
      onClick={props.handleClick}
      id={props.host.id}
      image={props.host.imageUrl}
      raised
    />
  )
}

export default Host
