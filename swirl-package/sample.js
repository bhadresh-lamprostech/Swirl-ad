import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const AdComponent = () => {
  const [showAd, setShowAd] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const componentElement = componentRef.current;
    const componentRect = componentElement.getBoundingClientRect();
    const componentArea = componentRect.width * componentRect.height;

    const contentArea = Array.from(componentElement.childNodes)
      .map(node => node.getBoundingClientRect())
      .reduce((total, rect) => total + (rect.width * rect.height), 0);

    const emptyArea = componentArea - contentArea;
    const threshold = 0.5; // threshold to determine when to show the ad, as a fraction of the empty area

    if (emptyArea > 0 && (emptyArea / componentArea) > threshold) {
      setShowAd(true);
    }
  }, []);

  return (
    <div ref={componentRef}>
      {showAd && (
        <div className="ad">
          <Image height={30} width={30} src="https://example.com/ad.png" alt="Advertisement" />
        </div>
      )}
      <div className="content">
        {/* Your component content goes here */}
      </div>
    </div>
  );
};

export default AdComponent;