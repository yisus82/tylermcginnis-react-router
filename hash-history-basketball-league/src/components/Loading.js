import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ text = 'Loading', speed = 300 }) => {
  const [loadingText, setLoadingText] = React.useState(text);

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLoadingText(oldText =>
        oldText === `${text}...` ? text : `${oldText}.`
      );
    }, speed);

    return () => window.clearInterval(intervalId);
  }, [text, speed]);

  return (
    <div className="container">
      <p className="text-center loading-text">{loadingText}</p>
    </div>
  );
};

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};

export default Loading;
