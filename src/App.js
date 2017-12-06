import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Switch from 'react-switch';

class App extends Component {
    state = { checked: false };
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <p className="App-intro">
                    <div className="flex-center">
                        <Switch
                            checked={this.state.checked}
                            onChange={checked => this.setState({ checked })}
                            id="normal-switch"
                        />
                    </div>
                </p>
            </div>
        );
    }
}

export default App;
