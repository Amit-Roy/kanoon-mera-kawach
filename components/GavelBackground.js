import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GavelSvg from './svg/GavelSvg';
import ScalesSvg from './svg/ScalesSvg';
import PillarSvg from './svg/PillarSvg';
import ShieldSvg from './svg/ShieldSvg';

/**
 * Justice-themed liquid glass background.
 * Layers: gradient base → children (content) → SVG watermarks
 */
export default function GavelBackground({ isDark, children }) {
  const color = isDark ? '#ffffff' : '#1a1a2e';

  // Liquid glass gradient colors
  const gradientColors = isDark
    ? [
        'rgba(18,10,40,0.95)',    // deep indigo
        'rgba(25,18,52,0.88)',    // dark purple
        'rgba(15,25,55,0.90)',    // navy blue
        'rgba(30,15,45,0.92)',    // plum
        'rgba(12,12,30,0.95)',    // near-black
      ]
    : [
        'rgba(235,240,255,0.7)',  // soft lavender
        'rgba(245,235,250,0.5)',  // light pink/mauve
        'rgba(230,242,255,0.55)', // baby blue
        'rgba(248,240,245,0.5)',  // blush
        'rgba(240,245,255,0.65)', // ice blue
      ];

  return (
    <View style={styles.container}>
      {/* Layer 1: Liquid glass gradient */}
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Layer 2: Content (scrollable screens) */}
      {children}

      {/* Layer 3: SVG watermarks — above content, no touch blocking */}
      <View style={styles.svgLayer} pointerEvents="none">
        <View style={[styles.svgPosition, styles.topRight]}>
          <ScalesSvg
            size={260}
            color={color}
            opacity={isDark ? 0.22 : 0.18}
          />
        </View>

        <View style={[styles.svgPosition, styles.centerLeft]}>
          <PillarSvg
            size={220}
            color={color}
            opacity={isDark ? 0.28 : 0.24}
          />
        </View>

        <View style={[styles.svgPosition, styles.bottomRight]}>
          <GavelSvg
            size={240}
            color={color}
            opacity={isDark ? 0.22 : 0.17}
          />
        </View>

        <View style={[styles.svgPosition, styles.bottomLeft]}>
          <ShieldSvg
            size={200}
            color={color}
            opacity={isDark ? 0.24 : 0.20}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  svgLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  svgPosition: {
    position: 'absolute',
  },
  topRight: {
    top: 60,
    right: -20,
    transform: [{ rotate: '-10deg' }],
  },
  centerLeft: {
    top: 280,
    left: -20,
    transform: [{ rotate: '8deg' }],
  },
  bottomRight: {
    bottom: 80,
    right: 10,
    transform: [{ rotate: '15deg' }],
  },
  bottomLeft: {
    bottom: 220,
    left: -10,
    transform: [{ rotate: '-12deg' }],
  },
});
