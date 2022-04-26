import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

const getDeviceConfig = (width) => {
  if (width < 640) {
    return 'xs';
  } else if (width >= 640 && width < 768) {
    return 'sm';
  } else if (width >= 768 && width < 1024) {
    return 'md';
  } else if (width >= 1024 && width < 1280) {
    return 'lg';
  } else if (width >= 1280 && width < 1536) {
    return 'xl';
  } else if (width >= 1536) {
    return '2xl';
  }
};

/**
 * https://betterprogramming.pub/usebreakpoint-hook-get-media-query-breakpoints-in-react-3f1779b73568
 * @returns
 */
const useBreakpoint = () => {
  const [brkPnt, setBrkPnt] = useState(() =>
    getDeviceConfig(window.innerWidth)
  );

  useEffect(() => {
    const calcInnerWidth = throttle(function () {
      setBrkPnt(getDeviceConfig(window.innerWidth));
    }, 200);
    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return brkPnt;
};

export default useBreakpoint;
