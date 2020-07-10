import React from 'react';
import PropTypes from 'prop-types';

const ShowMore = (props) => {
  const {onMoreBtnClick, isMoreBtnShow} = props;
  return (
    <div className={`catalog__more${isMoreBtnShow ? `` : ` visually-hidden`}`}>
      <button
        className={`catalog__button`}
        type="button"
        onClick={onMoreBtnClick}
      >Show more</button>
    </div>
  );
};

ShowMore.propTypes = {
  onMoreBtnClick: PropTypes.func.isRequired,
  isMoreBtnShow: PropTypes.bool.isRequired
};

export default ShowMore;
