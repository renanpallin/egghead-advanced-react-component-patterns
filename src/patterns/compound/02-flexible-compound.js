import React, { Component } from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';

const TOGGLE_CONTEXT = '__toggle__';

function ToggleOn({ children }, context) {
    const { on } = context[TOGGLE_CONTEXT];
    return on ? children : null;
}
ToggleOn.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
};

function ToggleOff({ children }, context) {
    const { on } = context[TOGGLE_CONTEXT];
    return on ? null : children;
}
ToggleOff.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
};

function ToggleButton(props, context) {
    const { on, toggle } = context[TOGGLE_CONTEXT];
    return <Switch checked={on} onChange={toggle} {...props} />;
}
ToggleButton.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
};

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

/*
Since we're receiving the on and onToggle from context and not from props cloning element enymore,
we are allowed to put anywhere we want, even if is not the first child
    <Toggle onToggle={on => console.log('toggle', on)}>
        <Toggle.On>on</Toggle.On>
        <Toggle.Button />
        <div className="btn-off">
            <Toggle.Off>off</Toggle.Off>
        </div>
    </Toggle>
This works as expected
 */
