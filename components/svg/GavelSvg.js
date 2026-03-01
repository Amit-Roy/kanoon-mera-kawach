import React from 'react';
import Svg, { Path, Rect, Circle, Ellipse, G, Line } from 'react-native-svg';

/**
 * Gavel SVG — sophisticated line-art watermark with fine details.
 * @param {number} size - Width/height of the SVG
 * @param {string} color - Stroke/fill color
 * @param {number} opacity - Overall opacity
 */
export default function GavelSvg({ size = 200, color = '#888', opacity = 0.15 }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      opacity={opacity}
    >
      {/* Gavel head — main block with rounded ends */}
      <Path
        d="M42 28 L42 62 Q42 68 48 68 L152 68 Q158 68 158 62 L158 28 Q158 22 152 22 L48 22 Q42 22 42 28 Z"
        stroke={color} strokeWidth="2.5" fill={color} opacity={0.2}
      />
      {/* Gavel head inner bevel */}
      <Path
        d="M50 28 L150 28 L150 62 L50 62 Z"
        stroke={color} strokeWidth="1.2" fill="none" opacity={0.6}
      />
      {/* Metal band left */}
      <Rect x="48" y="24" width="12" height="42" rx="2"
        stroke={color} strokeWidth="1.5" fill={color} opacity={0.35}
      />
      {/* Metal band right */}
      <Rect x="140" y="24" width="12" height="42" rx="2"
        stroke={color} strokeWidth="1.5" fill={color} opacity={0.35}
      />
      {/* Band rivet dots */}
      <Circle cx="54" cy="35" r="2" fill={color} opacity={0.6} />
      <Circle cx="54" cy="55" r="2" fill={color} opacity={0.6} />
      <Circle cx="146" cy="35" r="2" fill={color} opacity={0.6} />
      <Circle cx="146" cy="55" r="2" fill={color} opacity={0.6} />
      {/* Handle socket */}
      <Path
        d="M92 68 L92 76 Q92 80 96 80 L104 80 Q108 80 108 76 L108 68"
        stroke={color} strokeWidth="2" fill={color} opacity={0.3}
      />
      {/* Handle shaft */}
      <Path
        d="M96 80 Q96 82 97 82 L97 145 Q97 148 100 148 Q103 148 103 145 L103 82 Q104 82 104 80"
        stroke={color} strokeWidth="2" fill={color} opacity={0.25}
      />
      {/* Handle decorative grip — wrapped lines */}
      <G opacity={0.7}>
        <Path d="M94 108 Q100 104 106 108" stroke={color} strokeWidth="1.5" fill="none" />
        <Path d="M94 114 Q100 110 106 114" stroke={color} strokeWidth="1.5" fill="none" />
        <Path d="M94 120 Q100 116 106 120" stroke={color} strokeWidth="1.5" fill="none" />
        <Path d="M94 126 Q100 122 106 126" stroke={color} strokeWidth="1.5" fill="none" />
        <Path d="M94 132 Q100 128 106 132" stroke={color} strokeWidth="1.5" fill="none" />
      </G>
      {/* Handle end cap */}
      <Ellipse cx="100" cy="148" rx="6" ry="3"
        stroke={color} strokeWidth="1.5" fill={color} opacity={0.35}
      />
      {/* Sound block — rounded rectangular base */}
      <Path
        d="M55 163 Q55 158 62 158 L138 158 Q145 158 145 163 L145 172 Q145 177 138 177 L62 177 Q55 177 55 172 Z"
        stroke={color} strokeWidth="2.5" fill={color} opacity={0.2}
      />
      {/* Sound block top surface highlight */}
      <Path
        d="M60 160 L140 160"
        stroke={color} strokeWidth="1.2" opacity={0.5}
      />
      {/* Sound block inner line */}
      <Path
        d="M65 168 L135 168"
        stroke={color} strokeWidth="1" opacity={0.4}
      />
    </Svg>
  );
}
