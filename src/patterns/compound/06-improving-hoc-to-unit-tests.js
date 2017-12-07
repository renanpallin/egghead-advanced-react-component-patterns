import React, { Component } from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';

const TOGGLE_CONTEXT = '__toggle__';

const ToggleOn = ({ toggle: { on }, children }) => (on ? children : null);
const ToggleOff k= ({ toggle: { on }, children }) => (on ? null : children);
const ToggleButton = ({ toggle: { on, toggle}, ...props }) => (
    <Switch checked={on} onChange={toggle} {...props} />
);


export function withToggle(Component) {
    function Wrapper({innerRef, ...props}, context) {
        const toggleContext = context[TOGGLE_CONTEXT];
        return <Component ref={innerRef} toggle={toggleContext} {...props} />;
    }
    Wrapper.contextTypes = {
        [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
    };
    Wrapper.displayName = `withToggle(${Component.displayName || Component.name})`
    Wrapper.OriginalComponent = Component; // This line @see comment below
    return Wrapper;
}

export const MyEventComponent = withToggle(({ toggle, on, event }) => {
    const props = { [event]: on };
    return toggle.on ? <button {...props}>The {event} event</button> : null;
});

export default class Toggle extends Component {
    static Off = withToggle(ToggleOff);
    static On = withToggle(ToggleOn);
    static Button = withToggle(ToggleButton);
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

/*
We can't use a component passed to our HOC without the apropriate contex,
inside the Toggle component becouse of the use of context that will gonna be
empty.
So to improve unit testing, this file refactor the HOC with a property on the
wrapper that holds a reference to the original component so it can be used in
this cases.
 */