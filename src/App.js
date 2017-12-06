import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Switch from 'react-switch';

class Toggle extends Component {
    static defaultProps = { onToggle: () => {} };
    state = { on: false };
    toggle = () =>
        this.setState(
            ({ on }) => ({ on: !on }),
            () => this.props.onToggle(this.state.on)
        );
    render() {
        return (
            <Switch
                checked={this.state.on}
                onChange={this.toggle}
                id="normal-switch"
            />
        );
    }
}

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
                        <Toggle onToggle={on => console.log('toggle', on)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
