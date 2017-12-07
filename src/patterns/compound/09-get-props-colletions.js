import React, { Component } from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';

const componse = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

class Toggle extends Component {
    state = { on: false };
    toggle = () =>
        this.setState(
            ({ on }) => ({ on: !on }),
            () => this.props.onToggle(this.state.on)
        );

    /*
    Here you specify what props can be composed
     */
    getToggleProps = ({onClick, ...props} = {}) => {
        return {
            'aria-expanded': on,
            /* Manually composing */
            // onClick: (...args) => {
            //     // in case there's no other onClick
            //     onClick && onClick(...args)
            //     this.toggle(...args)
            // },
            /* With a compose helper */
            onClick: compose(onClick, this.toggle)
            ...props
        }
    }

    render() {
        const { state: { on }, toggle, getToggleProps } = this;
        return this.props.render({ on, toggle, getToggleProps });
    }
}

    <Switch
        checked={on}
        onChange={toggle}
        whatever={'I'}
        fucking={'want'}

        {...getToggleProps()}


/*
Problem: What if you want your button to implement another onClick, but keeping the onClick passed in toggleProps?
Like:

<MyAwsomeeButton on={on} toggle={toggle} {...toggleProps} onClick={...}/>

Now we're composing all functions that would be overriden with a compose of functions.
Could be impleented to className too when you need to put some classes and want let the user put others
 */
