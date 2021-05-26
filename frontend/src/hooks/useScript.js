import { useEffect } from 'react';

const useScript = (url) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.type = "text/javascript"
    script.async = true;

    const next = document.querySelector('#root');

    // document.body.appendChild(script);
    document.body.prepend(script);
    // document.body.insertBefore(script,next);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default useScript;