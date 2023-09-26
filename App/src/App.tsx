import React, {Component} from 'react';
import Name from './Name';
import {SDKName} from '@pruforce/SDK1';
export default class App extends Component {
  render() {
    return (
      <>
        <Name />
        <SDKName />
      </>
    );
  }
}
