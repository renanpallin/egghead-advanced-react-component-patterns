import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Lesson from './Lesson';

import Toggle01 from './patterns/compound/01-compound';
import Toggle02 from './patterns/compound/02-flexible-compound';
import Toggle03, { withToggle } from './patterns/compound/03-high-order-components';

/* Outside of our API. Makes sense with Toggle03 */
const MyToggleButton = withToggle(({ on, toggle }) => (
    <button onClick={toggle}>{on ? 'on' : 'off'}</button>
));

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <Lesson title="Compound Components">
                    <Toggle01 onToggle={on => console.log('toggle', on)}>
                        <Toggle01.On>on</Toggle01.On>
                        <Toggle01.Button />
                        <Toggle01.Off>off</Toggle01.Off>
                    </Toggle01>
                </Lesson>
                <Lesson problem title="Compound Components Structure Problem">
                    <Toggle01 onToggle={on => console.log('toggle', on)}>
                        <Toggle01.On>on</Toggle01.On>
                        <Toggle01.Button />
                        <div className="btn-off">
                            <Toggle01.Off>off</Toggle01.Off>
                        </div>
                    </Toggle01>
                </Lesson>

                <Lesson title="Compound Components Flexible">
                    <Toggle02 onToggle={on => console.log('toggle', on)}>
                        <Toggle02.On>on</Toggle02.On>
                        <Toggle02.Button />
                        <div className="btn-off">
                            <Toggle02.Off>off</Toggle02.Off>
                        </div>
                    </Toggle02>
                </Lesson>

                <Lesson title="High order components">
                    <Toggle03 onToggle={on => console.log('toggle', on)}>
                        <Toggle03.On>on</Toggle03.On>
                        {/* Original toggle button from our API */}
                        {/*<Toggle03.Button />*/}
                        <div className="btn-off">
                            <Toggle03.Off>off</Toggle03.Off>
                        </div>
                        {/* A custom button outside the Toggle API */}
                        <MyToggleButton />
                    </Toggle03>
                </Lesson>

                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

export default App;
