import React, { useEffect } from 'react';

interface AdSenseProps {
  client: string; // Your Google AdSense publisher ID, e.g., 'ca-pub-XXXXXXXXXXXXXXXX'
  slot: string;   // The specific ad unit slot ID
  format?: string;
  responsive?: string;
  style?: React.CSSProperties;
}

export const AdSense: React.FC<AdSenseProps> = ({
  client,
  slot,
  format = 'auto',
  responsive = 'true',
  style = { display: 'block' }
}) => {
  useEffect(() => {
    try {
      // Initialize the AdSense unit once the component is mounted
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn('AdSense failed to load unit:', e);
    }
  }, [slot]); // Re-run if the slot ID changes (e.g. navigation)

  return (
    <div className="adsense-unit-wrapper" style={{ margin: '32px 0', display: 'flex', justifyContent: 'center', width: '100%', overflow: 'hidden' }}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

export default AdSense;
