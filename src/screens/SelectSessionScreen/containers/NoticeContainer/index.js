import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import NoticeView from '../../../../common/NoticeView/NoticeView';

const NoticeContainer = ({ notices }) => {
  return (
    <NoticeView
      notices={notices}
      direction="down"
    />
  );
};

NoticeContainer.propTypes = {
  notices: PropTypes.object.isRequired,
};

NoticeContainer.defaultProps = {};

export default NoticeContainer;
