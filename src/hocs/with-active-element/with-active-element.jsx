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

    componentWillUnmount() {
      this.setState = () => {};
    }

    setActiveElement(target) {
      this.setState({activeElement: target});
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
