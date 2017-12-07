import React, { Component } from 'react';
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

export default class Toggle extends Component {
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
