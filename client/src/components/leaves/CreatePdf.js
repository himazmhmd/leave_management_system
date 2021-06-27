import React, { Component } from "react";

import ReactToPrint from "react-to-print";
import Leave from "../leave/Leave";

class ComponentToPrint extends Component {
  render() {
    return (
      
        <div>
          <Leave />
        </div>
      
    );
  }
}

export default class example extends Component {
  
  

  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            return <button>Print</button>;
          }}
          content={() => this.componentRef}
          copyStyles
          pageStyle={false}
        />
        <ComponentToPrint ref={(e1) => (this.componentRef = e1)} />
      </div>
    );
  }
}