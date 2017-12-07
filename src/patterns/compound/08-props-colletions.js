import React, { Component } from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';

const MyToggleButton = ({ on, toggle }) => (
    <button onClick={toggle}>{on ? 'on' : 'off'}</button>
);

class Toggle extends Component {
    state = { on: false };
    toggle = () =>
        this.setState(
            ({ on }) => ({ on: !on }),
            () => this.props.onToggle(this.state.on)
        );

    render() {
        const { state: { on }, toggle } = this;
        return this.props.render({ on, toggle, toggleProps: {
            'aria-expanded': on, // this line is relevant for this file. @see comment below
            onClick: toggle
        } });
    }
}

/* This could be outside of API, I'm just keeping in this file instead of App.js */
export default class RenderPropsPattern extends Component {
    render() {
        return (
            <Toggle
                onToggle={on => console.log('toggle', on)}
                render={({ on, toggle, toggleProps }) => ( // this one too
                    <div>
                        <div>Whatever I want here</div>
                        <MyToggleButton on={on} toggle={toggle} {...toggleProps}/>
                        <Switch
                            checked={on}
                            onChange={toggle}
                            whatever={'I'}
                            fucking={'want'}

                            {...toggleProps}
                        />
                    </div>
                )}
            />
        );
    }
}

/*
Let's say all the buttons needs to have 'aria-expanded' with the value of the state. To not repeat you can pass a list of props that all butons need to have in your render.
Who wants to implement a custom button or switch can simply apply the {...toggleProps}.
 */
