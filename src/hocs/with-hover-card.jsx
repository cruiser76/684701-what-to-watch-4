import React, {PureComponent} from 'react';

const withHoverCard = (Component) => {
  class WithHoverCard extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeElement: null
      };
      this.setActiveElement = this.setActiveElement.bind(this);
    }

    setActiveElement(target) {
      this.setState({activeElement: target});
    }

    componentWillUnmount() {
      this.setState = () => {};
    }

    render() {

      return (
        <Component
          {...this.props}
          setActiveElement={this.setActiveElement}
          activeElement={this.state.activeElement}
        />
      );
    }
  }

  return WithHoverCard;
};

export default withHoverCard;
