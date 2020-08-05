import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withActiveElement = (Component) => {
  class WithActiveElement extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeElement: this.props.activeElement,
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
          activeElement={this.state.activeElement}
          setActiveElement={this.setActiveElement}
        />
      );
    }
  }

  WithActiveElement.propTypes = {
    activeElement: PropTypes.string
  };

  return WithActiveElement;
};

export default withActiveElement;
