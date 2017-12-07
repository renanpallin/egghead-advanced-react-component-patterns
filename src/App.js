import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Toggle from './patterns/compound/01-compound';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <div className="App-intro">
                    <h1>Compound Components</h1>
                    <div className="flex-center">
                        <Toggle onToggle={on => console.log('toggle', on)}>
                            <Toggle.On>on</Toggle.On>
                            <Toggle.Button />
                            <Toggle.Off>off</Toggle.Off>
                        </Toggle>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
