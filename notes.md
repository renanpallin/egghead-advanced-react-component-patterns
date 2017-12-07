## Pattens that I don't implemented

### Controlled Props
When you can pass a prop to control the input or don't pass to make it uncontrolled

### Context Provider
Just like Redux.Provider, but without child, in render props.
Implement a class component to put the prop you need everywhere in the context and a small one to get from context and pass as a props to render prop.
From author: If you have state that needs to exist throughout your application, then you may find yourself passing props all over the application and even "drilling" the prop through components that don't really care about the prop at all. In this lesson, we'll see a sample of a small app that has the "prop drilling problem" and learn how to implement the "Provider pattern" to access context state anywhere in the component tree.

/*
class toggleProvider extends React.Component {
	static contextName = '__toggle__';
	static Renderer = class extends React.Component {
		static childContextTypes = {
			[Toggleprovider.contextName]: PropTypes.object.isRequired
		}

		getChildContext() {
			return {
				[Toggleprovider.contextName]: this.props.toggle
			}
		}

		render() {
			this.props.children
		}
	}

	render() {
		const { children, ...remainingProps } = this.props;
		return (
			<Toogle {RemainingProps} render={toggle => (
				<ToggleProvider.Renderer toggle={toggle} children={children} />
			)} />
		);
	}
}

function ConnectedToggle(props, context) {
	return props.render(context[ToggleProvider.contextName])
}
ConnectedToggle.contextTypes = {
	[ToggleProvider.contextName]: PropTypes.object.isRequired
}


Use:

Before: You pass the props 'toggle' to Header
Now: You use ConnectedToggle to get the props you want
const Header = () => {
	return (
		<div>
			<ConnetedToggle render={toggle => ...} />
		</div>
	)
}

<ToggleProvider>
	<Toggle render={toggle => (
		<div>
			<Header />
			<Post />
		</div>
	)} />
</ToggleProvider>
 */


ReactBroadcast is a library that take cares of all this context stuff to us. You can use to update a child of a component that returns false to shouldComponentUpdate. I need to think better about this, seens to me that you cheating on react and is a sign that is something wrong with your architeture