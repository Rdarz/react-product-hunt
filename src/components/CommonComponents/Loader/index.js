import React from 'react';
import './style.scss';

const Loader = props => {
  return (
    <div className="loader">
      <div className="loader-text">
        <img
          src="src/common/assets/images/loader.gif"
          width="100"
          height="100"
        />
      </div>
    </div>
  );
};

export default Loader;
