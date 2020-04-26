import React, { Component } from 'react';

export default class Home extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <iframe src="http://127.0.0.1:3000/d/n6lchbIWz/gai-lan?orgId=1&refresh=5s" frameBorder="0" width="100%"  style={{height: '100%'}}></iframe>
    );
  }
}