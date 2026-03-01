import React from 'react';
import Svg, { Path, Circle, Rect, Line, G } from 'react-native-svg';

/**
 * Ashoka Emblem / India National Emblem SVG — simplified line-art watermark.
 * A stylized representation of the Lion Capital with the Ashoka Chakra.
 * @param {number} size - Width/height of the SVG
 * @param {string} color - Stroke color
 * @param {number} opacity - Overall opacity
 */
export default function EmblemSvg({ size = 200, color = '#888', opacity = 0.15 }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      opacity={opacity}
    >
      {/* Abacus / Capital platform top */}
      <Path
        d="M60 90 L60 75 Q100 55 140 75 L140 90"
        stroke={color} strokeWidth="2" fill={color} opacity={0.08}
      />
      {/* Lion silhouettes (simplified as a crown-like shape) */}
      <Path
        d="M70 75 L75 40 Q80 25 90 30 L95 20 Q100 12 105 20 L110 30 Q120 25 125 40 L130 75"
        stroke={color} strokeWidth="2" fill={color} opacity={0.1}
        strokeLinejoin="round"
      />
      {/* Lion face details - eyes */}
      <Circle cx="90" cy="50" r="2.5" fill={color} opacity={0.35} />
      <Circle cx="110" cy="50" r="2.5" fill={color} opacity={0.35} />
      {/* Abacus band with Ashoka Chakra */}
      <Rect
        x="58" y="90" width="84" height="20" rx="3"
        stroke={color} strokeWidth="2" fill="none"
      />
      {/* Ashoka Chakra (24-spoke wheel - simplified) */}
      <Circle
        cx="100" cy="100" r="8"
        stroke={color} strokeWidth="1.5" fill="none"
      />
      {/* Chakra spokes (12 lines for 24 spokes visual) */}
      <G opacity={0.6}>
        <Line x1="100" y1="92" x2="100" y2="108" stroke={color} strokeWidth="0.8" />
        <Line x1="92" y1="100" x2="108" y2="100" stroke={color} strokeWidth="0.8" />
        <Line x1="94.3" y1="94.3" x2="105.7" y2="105.7" stroke={color} strokeWidth="0.8" />
        <Line x1="105.7" y1="94.3" x2="94.3" y2="105.7" stroke={color} strokeWidth="0.8" />
        <Line x1="97" y1="92.5" x2="103" y2="107.5" stroke={color} strokeWidth="0.6" />
        <Line x1="103" y1="92.5" x2="97" y2="107.5" stroke={color} strokeWidth="0.6" />
        <Line x1="92.5" y1="97" x2="107.5" y2="103" stroke={color} strokeWidth="0.6" />
        <Line x1="92.5" y1="103" x2="107.5" y2="97" stroke={color} strokeWidth="0.6" />
      </G>
      {/* Decorative animals on abacus (small shapes) */}
      <Circle cx="72" cy="100" r="3" fill={color} opacity={0.2} />
      <Circle cx="128" cy="100" r="3" fill={color} opacity={0.2} />
      {/* Bell-shaped lotus base */}
      <Path
        d="M55 110 Q60 130 70 140 Q85 152 100 155 Q115 152 130 140 Q140 130 145 110"
        stroke={color} strokeWidth="2" fill={color} opacity={0.06}
      />
      {/* Lotus petals */}
      <Path
        d="M62 125 Q72 118 82 125"
        stroke={color} strokeWidth="1.2" fill="none" opacity={0.4}
      />
      <Path
        d="M82 125 Q92 118 102 125"
        stroke={color} strokeWidth="1.2" fill="none" opacity={0.4}
      />
      <Path
        d="M102 125 Q112 118 122 125"
        stroke={color} strokeWidth="1.2" fill="none" opacity={0.4}
      />
      <Path
        d="M122 125 Q132 118 138 125"
        stroke={color} strokeWidth="1.2" fill="none" opacity={0.4}
      />
      {/* Base platform */}
      <Path
        d="M65 155 L135 155"
        stroke={color} strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Satyameva Jayate ribbon (simplified) */}
      <Path
        d="M68 165 Q100 175 132 165"
        stroke={color} strokeWidth="1.5" fill="none" opacity={0.35}
      />
      <Line
        x1="68" y1="165" x2="62" y2="162"
        stroke={color} strokeWidth="1.5" opacity={0.35}
      />
      <Line
        x1="132" y1="165" x2="138" y2="162"
        stroke={color} strokeWidth="1.5" opacity={0.35}
      />
    </Svg>
  );
}
