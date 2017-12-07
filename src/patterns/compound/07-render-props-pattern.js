import React, { Component } from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';

const MyToggleButton =  ({ on, toggle }) => (
    <button onClick={toggle}>{on ? 'on' : 'off'}</button>
)

class Toggle extends Component {
    state = { on: false };
    toggle = () =>
        this.setState(
            ({ on }) => ({ on: !on }),
            () => this.props.onToggle(this.state.on)
        );

    render() {
        const { state: { on }, toggle } = this;
        return this.props.render({ on, toggle });
    }
}

/* This could be outside of API, I'm just keeping in this file instead of App.js */
export default class RenderPropsPattern extends Component {
    render() {
        return (
            <Toggle
                onToggle={on => console.log('toggle', on)}
                render={({ on, toggle }) => (
                    <div>
                        <div>Whatever I want here</div>
                        <MyToggleButton on={on} toggle={toggle} />
                        <Switch checked={on} onChange={toggle} whatever={'I'} fucking={'want'} />
                    </div>
                )}
            />
        );
    }
}


/*
This pattern consists of passing a functional component as props to render whatever you want.
In this example we getting the 'on' and 'toggle' in the props of this functional component we're passing.

High Order Components Pattern
    - Name clash in HOC
    - Don't know from were a prop is comming from
    - Need to use the HOC everywhere
 */