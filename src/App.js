import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Toggle01 from './patterns/compound/01-compound';
import Toggle02 from './patterns/compound/02-flexible-compound';

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
                        <Toggle01 onToggle={on => console.log('toggle', on)}>
                            <Toggle01.On>on</Toggle01.On>
                            <Toggle01.Button />
                            <Toggle01.Off>off</Toggle01.Off>
                        </Toggle01>
                    </div>
                </div>
                <div className="App-intro">
                    <h1>Compound Components Structure Problem</h1>
                    <div className="flex-center">
                        <Toggle01 onToggle={on => console.log('toggle', on)}>
                            <Toggle01.On>on</Toggle01.On>
                            <Toggle01.Button />
                            <div className="btn-off">
                                <Toggle01.Off>off</Toggle01.Off>
                            </div>
                        </Toggle01>
                    </div>
                </div>
                <div className="App-intro">
                    <h1>Compound Components Flexible</h1>
                    <div className="flex-center">
                        <Toggle02 onToggle={on => console.log('toggle', on)}>
                            <Toggle02.On>on</Toggle02.On>
                            <Toggle02.Button />
                            <div className="btn-off">
                                <Toggle02.Off>off</Toggle02.Off>
                            </div>
                        </Toggle02>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
