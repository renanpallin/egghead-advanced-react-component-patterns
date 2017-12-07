import React, { Component } from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';

const TOGGLE_CONTEXT = '__toggle__';

const ToggleOn = ({ toggle: { on }, children }) => (on ? children : null);
const ToggleOff = ({ toggle: { on }, children }) => (on ? null : children);
const ToggleButton = ({ toggle: { on, toggle}, ...props }) => (
    <Switch checked={on} onChange={toggle} {...props} />
);

/*
Namespaced with 'toggle' props
 */
export function withToggle(Component) {
    function Wrapper(props, context) {
        const toggleContext = context[TOGGLE_CONTEXT];
        return <Component toggle={toggleContext} {...props} />;
    }
    Wrapper.contextTypes = {
        [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
    };

    /* Better names in React Dev Tools and in erros */
    Wrapper.displayName = `withToggle(${Component.displayName || Component.name})`
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
Aditional: To improve the error messages and the tree in React Dev Tools,
we're putting displayName property on the wrapper of our HOC and using then in the static declaration in the class to keep the name of the const used.
 */