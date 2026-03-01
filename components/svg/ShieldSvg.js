import React from 'react';
import Svg, { Path, Circle, G, Line, Rect } from 'react-native-svg';

/**
 * Shield / Kavach SVG — a protective shield with law motifs.
 * Represents "Kavach" (shield/armor) from the app name.
 * @param {number} size - Width/height of the SVG
 * @param {string} color - Stroke color
 * @param {number} opacity - Overall opacity
 */
export default function ShieldSvg({ size = 200, color = '#888', opacity = 0.15 }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      opacity={opacity}
    >
      {/* === MAIN SHIELD OUTLINE === */}
      <Path
        d="M100 10 L38 38 L38 90 Q38 140 100 185 Q162 140 162 90 L162 38 Z"
        stroke={color} strokeWidth="3" fill={color} opacity={0.12}
        strokeLinejoin="round"
      />
      {/* Inner shield border */}
      <Path
        d="M100 20 L46 44 L46 90 Q46 134 100 175 Q154 134 154 90 L154 44 Z"
        stroke={color} strokeWidth="1.8" fill="none" opacity={0.5}
        strokeLinejoin="round"
      />
      {/* Second inner border — decorative */}
      <Path
        d="M100 30 L54 50 L54 90 Q54 128 100 165 Q146 128 146 90 L146 50 Z"
        stroke={color} strokeWidth="0.8" fill="none" opacity={0.3}
        strokeLinejoin="round" strokeDasharray="4,3"
      />

      {/* === CENTRAL MOTIF: Scales of Justice === */}
      {/* Vertical pillar */}
      <Line x1="100" y1="55" x2="100" y2="120"
        stroke={color} strokeWidth="2" opacity={0.7}
      />
      {/* Crossbeam */}
      <Line x1="72" y1="68" x2="128" y2="68"
        stroke={color} strokeWidth="2" opacity={0.7}
      />
      {/* Top finial */}
      <Circle cx="100" cy="52" r="4"
        stroke={color} strokeWidth="1.5" fill={color} opacity={0.3}
      />
      {/* Left chain */}
      <Path d="M72 68 L66 88" stroke={color} strokeWidth="1.2" opacity={0.6} />
      <Path d="M72 68 L78 88" stroke={color} strokeWidth="1.2" opacity={0.6} />
      {/* Left pan */}
      <Path
        d="M62 88 Q72 100 82 88"
        stroke={color} strokeWidth="1.5" fill={color} opacity={0.12}
      />
      {/* Right chain */}
      <Path d="M128 68 L122 88" stroke={color} strokeWidth="1.2" opacity={0.6} />
      <Path d="M128 68 L134 88" stroke={color} strokeWidth="1.2" opacity={0.6} />
      {/* Right pan */}
      <Path
        d="M118 88 Q128 100 138 88"
        stroke={color} strokeWidth="1.5" fill={color} opacity={0.12}
      />

      {/* === SHIELD CROSS PATTERN === */}
      {/* Horizontal divider */}
      <Path
        d="M54 105 Q100 100 146 105"
        stroke={color} strokeWidth="1.5" opacity={0.4}
      />

      {/* === LOWER SECTION: Book of Law === */}
      {/* Open book shape */}
      <Path
        d="M80 118 L80 145 Q90 140 100 142 Q110 140 120 145 L120 118"
        stroke={color} strokeWidth="1.5" fill={color} opacity={0.1}
      />
      {/* Book spine */}
      <Line x1="100" y1="118" x2="100" y2="142"
        stroke={color} strokeWidth="1.2" opacity={0.5}
      />
      {/* Book page lines — left */}
      <G opacity={0.35}>
        <Line x1="84" y1="124" x2="97" y2="124" stroke={color} strokeWidth="0.8" />
        <Line x1="84" y1="129" x2="97" y2="129" stroke={color} strokeWidth="0.8" />
        <Line x1="84" y1="134" x2="97" y2="134" stroke={color} strokeWidth="0.8" />
      </G>
      {/* Book page lines — right */}
      <G opacity={0.35}>
        <Line x1="103" y1="124" x2="116" y2="124" stroke={color} strokeWidth="0.8" />
        <Line x1="103" y1="129" x2="116" y2="129" stroke={color} strokeWidth="0.8" />
        <Line x1="103" y1="134" x2="116" y2="134" stroke={color} strokeWidth="0.8" />
      </G>

      {/* === CORNER RIVETS / STUDS === */}
      <Circle cx="100" cy="15" r="2.5" fill={color} opacity={0.5} />
      <Circle cx="44" cy="42" r="2" fill={color} opacity={0.4} />
      <Circle cx="156" cy="42" r="2" fill={color} opacity={0.4} />
      <Circle cx="44" cy="88" r="2" fill={color} opacity={0.4} />
      <Circle cx="156" cy="88" r="2" fill={color} opacity={0.4} />

      {/* === BOTTOM POINT ACCENT === */}
      <Path
        d="M90 160 L100 175 L110 160"
        stroke={color} strokeWidth="1.5" fill={color} opacity={0.2}
      />
    </Svg>
  );
}
