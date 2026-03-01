import React from 'react';
import Svg, { Path, Circle, G, Line, Ellipse } from 'react-native-svg';

/**
 * Pillar of Law / Justice Pillar SVG — a classical column with laurel & shield motif.
 * Represents the pillars of constitutional law.
 * @param {number} size - Width/height of the SVG
 * @param {string} color - Stroke color
 * @param {number} opacity - Overall opacity
 */
export default function PillarSvg({ size = 200, color = '#888', opacity = 0.15 }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      opacity={opacity}
    >
      {/* === TOP: SHIELD / CREST === */}
      <Path
        d="M82 12 L82 48 Q82 68 100 76 Q118 68 118 48 L118 12 Z"
        stroke={color} strokeWidth="2.5" fill={color} opacity={0.18}
        strokeLinejoin="round"
      />
      <Path
        d="M86 16 L86 47 Q86 64 100 71 Q114 64 114 47 L114 16 Z"
        stroke={color} strokeWidth="1.2" fill="none" opacity={0.5}
      />
      {/* Scales inside shield */}
      <Line x1="100" y1="24" x2="100" y2="50" stroke={color} strokeWidth="1.2" opacity={0.6} />
      <Line x1="89" y1="32" x2="111" y2="32" stroke={color} strokeWidth="1.5" opacity={0.6} />
      <Path d="M86 38 Q89 44 92 38" stroke={color} strokeWidth="1" fill="none" opacity={0.5} />
      <Path d="M108 38 Q111 44 114 38" stroke={color} strokeWidth="1" fill="none" opacity={0.5} />
      <Circle cx="100" cy="56" r="2.5" fill={color} opacity={0.5} />

      {/* === LAUREL WREATH === */}
      <G opacity={0.6}>
        <Path d="M78 20 Q72 28 76 36" stroke={color} strokeWidth="1.2" fill="none" />
        <Path d="M76 16 Q68 26 72 36" stroke={color} strokeWidth="1.2" fill="none" />
        <Path d="M74 14 Q64 26 70 38" stroke={color} strokeWidth="1.2" fill="none" />
        <Path d="M72 38 Q68 46 72 54" stroke={color} strokeWidth="1.2" fill="none" />
        <Path d="M70 38 Q64 48 68 58" stroke={color} strokeWidth="1.2" fill="none" />
        <Path d="M68 58 Q72 66 80 70" stroke={color} strokeWidth="1.2" fill="none" />
        <Path d="M122 20 Q128 28 124 36" stroke={color} strokeWidth="1.2" fill="none" />
        <Path d="M124 16 Q132 26 128 36" stroke={color} strokeWidth="1.2" fill="none" />
        <Path d="M126 14 Q136 26 130 38" stroke={color} strokeWidth="1.2" fill="none" />
        <Path d="M128 38 Q132 46 128 54" stroke={color} strokeWidth="1.2" fill="none" />
        <Path d="M130 38 Q136 48 132 58" stroke={color} strokeWidth="1.2" fill="none" />
        <Path d="M132 58 Q128 66 120 70" stroke={color} strokeWidth="1.2" fill="none" />
      </G>

      {/* === COLUMN CAPITAL === */}
      <Path
        d="M72 82 L128 82 L132 88 L68 88 Z"
        stroke={color} strokeWidth="1.8" fill={color} opacity={0.2}
      />
      <Path
        d="M68 88 Q62 86 60 90 Q58 94 64 94"
        stroke={color} strokeWidth="1.5" fill="none" opacity={0.6}
      />
      <Path
        d="M132 88 Q138 86 140 90 Q142 94 136 94"
        stroke={color} strokeWidth="1.5" fill="none" opacity={0.6}
      />

      {/* === COLUMN SHAFT === */}
      <Path
        d="M76 94 L76 158 L124 158 L124 94"
        stroke={color} strokeWidth="2" fill={color} opacity={0.12}
      />
      <G opacity={0.4}>
        <Line x1="84" y1="94" x2="84" y2="158" stroke={color} strokeWidth="1" />
        <Line x1="92" y1="94" x2="92" y2="158" stroke={color} strokeWidth="1" />
        <Line x1="100" y1="94" x2="100" y2="158" stroke={color} strokeWidth="1" />
        <Line x1="108" y1="94" x2="108" y2="158" stroke={color} strokeWidth="1" />
        <Line x1="116" y1="94" x2="116" y2="158" stroke={color} strokeWidth="1" />
      </G>

      {/* === COLUMN BASE === */}
      <Ellipse cx="100" cy="160" rx="28" ry="4"
        stroke={color} strokeWidth="1.8" fill={color} opacity={0.18}
      />
      <Path
        d="M66 166 L134 166 L138 172 L62 172 Z"
        stroke={color} strokeWidth="1.5" fill={color} opacity={0.15}
      />
      <Path
        d="M56 172 L144 172 L148 180 L52 180 Z"
        stroke={color} strokeWidth="2" fill={color} opacity={0.12}
      />
      <Line x1="60" y1="176" x2="140" y2="176"
        stroke={color} strokeWidth="1" opacity={0.4}
      />

      {/* === BANNER === */}
      <Path
        d="M60 186 Q100 194 140 186"
        stroke={color} strokeWidth="1.5" fill="none" opacity={0.4}
      />
      <Line x1="60" y1="186" x2="54" y2="183" stroke={color} strokeWidth="1.5" opacity={0.4} />
      <Line x1="140" y1="186" x2="146" y2="183" stroke={color} strokeWidth="1.5" opacity={0.4} />
    </Svg>
  );
}
