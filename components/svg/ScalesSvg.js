import React from 'react';
import Svg, { Path, Circle, Line, G, Rect, Ellipse } from 'react-native-svg';

/**
 * Scales of Justice SVG — sophisticated line-art watermark with chains & details.
 * @param {number} size - Width/height of the SVG
 * @param {string} color - Stroke color
 * @param {number} opacity - Overall opacity
 */
export default function ScalesSvg({ size = 200, color = '#888', opacity = 0.15 }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      opacity={opacity}
    >
      {/* Top finial */}
      <Path
        d="M100 8 L97 18 L100 16 L103 18 Z"
        stroke={color} strokeWidth="1.5" fill={color} opacity={0.6}
      />
      {/* Top ornament circle */}
      <Circle cx="100" cy="22" r="5"
        stroke={color} strokeWidth="2" fill="none"
      />
      <Circle cx="100" cy="22" r="2" fill={color} opacity={0.5} />
      {/* Center pillar */}
      <Path
        d="M98 27 L97 165 Q97 167 100 167 Q103 167 103 165 L102 27"
        stroke={color} strokeWidth="2" fill={color} opacity={0.2}
      />
      {/* Pillar decorative nodes */}
      <Circle cx="100" cy="50" r="3" stroke={color} strokeWidth="1.2" fill={color} opacity={0.3} />
      <Circle cx="100" cy="90" r="2" stroke={color} strokeWidth="1" fill={color} opacity={0.4} />
      <Circle cx="100" cy="130" r="2" stroke={color} strokeWidth="1" fill={color} opacity={0.4} />
      {/* Crossbeam */}
      <Path
        d="M30 50 L170 50"
        stroke={color} strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Crossbeam center diamond */}
      <Path
        d="M96 46 L100 42 L104 46 L100 50 Z"
        stroke={color} strokeWidth="1.2" fill={color} opacity={0.4}
      />

      {/* === LEFT SIDE === */}
      <G opacity={0.85}>
        <Ellipse cx="32" cy="58" rx="2.5" ry="4" stroke={color} strokeWidth="1.2" fill="none" />
        <Ellipse cx="30" cy="66" rx="2.5" ry="4" stroke={color} strokeWidth="1.2" fill="none" />
        <Ellipse cx="28" cy="74" rx="2.5" ry="4" stroke={color} strokeWidth="1.2" fill="none" />
        <Ellipse cx="26" cy="82" rx="2.5" ry="4" stroke={color} strokeWidth="1.2" fill="none" />
        <Ellipse cx="48" cy="58" rx="2.5" ry="4" stroke={color} strokeWidth="1.2" fill="none" />
        <Ellipse cx="50" cy="66" rx="2.5" ry="4" stroke={color} strokeWidth="1.2" fill="none" />
        <Ellipse cx="52" cy="74" rx="2.5" ry="4" stroke={color} strokeWidth="1.2" fill="none" />
        <Ellipse cx="54" cy="82" rx="2.5" ry="4" stroke={color} strokeWidth="1.2" fill="none" />
      </G>
      {/* Left pan */}
      <Path
        d="M16 90 L24 88 L56 88 L64 90"
        stroke={color} strokeWidth="1.8" fill="none"
      />
      <Path
        d="M16 90 Q20 108 40 112 Q60 108 64 90"
        stroke={color} strokeWidth="2" fill={color} opacity={0.15}
      />
      <Path d="M20 91 L60 91" stroke={color} strokeWidth="0.8" opacity={0.5} />

      {/* === RIGHT SIDE === */}
      <G opacity={0.85}>
        <Ellipse cx="152" cy="58" rx="2.5" ry="4" stroke={color} strokeWidth="1.2" fill="none" />
        <Ellipse cx="150" cy="66" rx="2.5" ry="4" stroke={color} strokeWidth="1.2" fill="none" />
        <Ellipse cx="148" cy="74" rx="2.5" ry="4" stroke={color} strokeWidth="1.2" fill="none" />
        <Ellipse cx="146" cy="82" rx="2.5" ry="4" stroke={color} strokeWidth="1.2" fill="none" />
        <Ellipse cx="168" cy="58" rx="2.5" ry="4" stroke={color} strokeWidth="1.2" fill="none" />
        <Ellipse cx="170" cy="66" rx="2.5" ry="4" stroke={color} strokeWidth="1.2" fill="none" />
        <Ellipse cx="172" cy="74" rx="2.5" ry="4" stroke={color} strokeWidth="1.2" fill="none" />
        <Ellipse cx="174" cy="82" rx="2.5" ry="4" stroke={color} strokeWidth="1.2" fill="none" />
      </G>
      {/* Right pan */}
      <Path
        d="M136 90 L144 88 L176 88 L184 90"
        stroke={color} strokeWidth="1.8" fill="none"
      />
      <Path
        d="M136 90 Q140 108 160 112 Q180 108 184 90"
        stroke={color} strokeWidth="2" fill={color} opacity={0.15}
      />
      <Path d="M140 91 L180 91" stroke={color} strokeWidth="0.8" opacity={0.5} />

      {/* === BASE === */}
      <Path
        d="M90 165 Q90 170 80 172 L120 172 Q110 170 110 165"
        stroke={color} strokeWidth="1.5" fill={color} opacity={0.2}
      />
      <Path
        d="M68 172 L132 172 L138 178 L62 178 Z"
        stroke={color} strokeWidth="2" fill={color} opacity={0.18}
      />
      <Path
        d="M56 178 L144 178 Q148 178 148 182 L52 182 Q52 178 56 178 Z"
        stroke={color} strokeWidth="2" fill={color} opacity={0.15}
      />
      <Path d="M65 180 L135 180" stroke={color} strokeWidth="1" opacity={0.4} />
    </Svg>
  );
}
