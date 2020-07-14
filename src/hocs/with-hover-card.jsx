import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';


// import {PLAYER_DELAY as delay} from './../const.js';
const withHoverCard = (Component) => {
  class WithHoverCard extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        hoverElementID: null
      };
      this.handleCardMouseEnter = this.handleCardMouseEnter.bind(this);
      this.handleCardMouseLeave = this.handleCardMouseLeave.bind(this);
    }

    handleCardMouseEnter(target) {
      if (target) {
        this.setState({hoverElementID: target});
      }
    }

    handleCardMouseLeave() {
      if (this.state.hoverElementID) {
        this.setState({hoverElementID: null});
      }
    }

    render() {

      return (
        <Component
          {...this.props}
          onCardMouseEnter={this.handleCardMouseEnter}
          onCardMouseLeave={this.handleCardMouseLeave}
          cardId={this.state.hoverElementID}
        />
      );
    }
  }

  WithHoverCard.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    onCardClick: PropTypes.func.isRequired,
    numberMoviesInList: PropTypes.number.isRequired
  };

  return WithHoverCard;
};

export default withHoverCard;
