import React, {PureComponent} from 'react';

const withActiveElement = (Component) => {
  class WithActiveElement extends PureComponent {
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
        />
      );
    }
  }

  return WithActiveElement;
};

export default withActiveElement;