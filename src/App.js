import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Switch from 'react-switch';

function ToggleOn({ on, children }) {
    return on ? children : null;
}

function ToggleOff({ on, children }) {
    return on ? null : children;
}

function ToggleButton({ on, toggle, ...props }) {
    return <Switch checked={on} onChange={toggle} {...props} />;
}

class Toggle extends Component {
    static Off = ToggleOff;
    static On = ToggleOn;
    static Button = ToggleButton;

    static defaultProps = { onToggle: () => {} };
    state = { on: false };
    toggle = () =>
        this.setState(
            ({ on }) => ({ on: !on }),
            () => this.props.onToggle(this.state.on)
        );
    render() {
        const children = React.Children.map(
            this.props.children,
            child => React.cloneElement(child, {
                on: this.state.on,
                toggle: this.toggle,
            })
        );
        return <div>{children}</div>;
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
