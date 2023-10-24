import React from 'react';
import { Svg, Path } from 'react-native-svg';

const WaveBackground = ({ color }) => (
  <Svg width="100%" height="100%" viewBox="0 0 320 320">
    <Path
      fill={color}
      d="M0,0L320,0L320,160C320,238,252.4,320,168,320C83.6,320,0,238,0,160L0,0Z"
      />
  </Svg>
);

export default WaveBackground;
