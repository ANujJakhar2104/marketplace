import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { radius } from '../theme';
import type { IconSpec } from '../types/product';
import { AppIcon } from './AppIcon';

interface ProductArtProps {
  icon: IconSpec;
  gradient: [string, string];
  /** Square tile side length. Ignored if `height` is provided. */
  size?: number;
  /** Explicit height for a non-square (e.g. full-width card header) tile. */
  height?: number;
  /** Explicit width; defaults to 100% when `height` is provided. */
  width?: number | `${number}%`;
  iconSize?: number;
  borderRadius?: number;
}

/**
 * Real product photography isn't available for this assignment, so items
 * render as a branded gradient tile with a representative icon instead of
 * a broken image or a stock photo. `Product`/`Category` still expose an
 * `icon` field, so swapping this for an <Image> once real photography or
 * asset URLs exist is a one-file change.
 */
export function ProductArt({
  icon,
  gradient,
  size = 96,
  height,
  width,
  iconSize,
  borderRadius = radius.lg,
}: ProductArtProps) {
  const resolvedHeight = height ?? size;
  const resolvedWidth = width ?? (height ? '100%' : size);
  const resolvedIconSize = iconSize ?? Math.min(resolvedHeight, size) * 0.4;

  return (
    <LinearGradient
      colors={gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.container,
        { width: resolvedWidth, height: resolvedHeight, borderRadius },
      ]}
    >
      <View style={styles.iconWrap}>
        <AppIcon icon={icon} size={resolvedIconSize} color="#FFFFFF" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  iconWrap: {
    opacity: 0.95,
  },
});
