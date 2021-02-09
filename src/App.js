import React, { Component } from 'react';

import Header from './components/Header';

import DadosBox from './components/DadosBox';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header title="Biblioteca" />
        <br />
        <ProductBox />
      </div>
    );
  }
}

export default App;