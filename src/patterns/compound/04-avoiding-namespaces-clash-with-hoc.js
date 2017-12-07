import React, { Component } from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';

const TOGGLE_CONTEXT = '__toggle__';

const ToggleOn = withToggle(({ on, children }) => on ? children : null)
const ToggleOff = withToggle(({ on, children }) => on ? null : children)
const ToggleButton = withToggle(({ on, toggle, ...props }) =>  <Switch checked={on} onChange={toggle} {...props} />);

/*
High Order Components
This function allow other developers to write a component that interacts with our Toggle
without exposing the context feature of react (similar to ReactRedux.connect).
 */
export function withToggle(Component) {
    function Wrapper(props, context) {
        const toggleContext = context[TOGGLE_CONTEXT];
        return <Component {...toggleContext} {...props} />;
    }
    Wrapper.contextTypes = {
        [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
    };

    return Wrapper;
}

export function MyEventComponent({ on, event }) {
    const props = { [event]: on };
    return <button {...props}>The {event} event</button>;
}

export default class Toggle extends Component {
    static Off = ToggleOff;
    static On = ToggleOn;
    static Button = ToggleButton;
    static defaultProps = { onToggle: () => {} };
    static childContextTypes = {
        [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
    };

    getChildContext() {
        return {
            [TOGGLE_CONTEXT]: {
                on: this.state.on,
                toggle: this.toggle,
            },
        };
    }

    state = { on: false };
    toggle = () =>
        this.setState(
            ({ on }) => ({ on: !on }),
            () => this.props.onToggle(this.state.on)
        );

    render() {
        return <div>{this.props.children}</div>;
    }
}

