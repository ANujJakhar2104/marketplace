import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../theme';

export function SkeletonCard() {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 650, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 650, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.art, { opacity }]} />
      <View style={styles.body}>
        <Animated.View style={[styles.line, styles.lineShort, { opacity }]} />
        <Animated.View style={[styles.line, styles.lineLong, { opacity }]} />
        <Animated.View style={[styles.line, styles.lineMedium, { opacity, marginTop: spacing.xs }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  art: {
    height: 110,
    backgroundColor: colors.divider,
  },
  body: {
    padding: spacing.sm,
    gap: 6,
  },
  line: {
    height: 10,
    borderRadius: 4,
    backgroundColor: colors.divider,
  },
  lineShort: {
    width: '40%',
  },
  lineLong: {
    width: '85%',
  },
  lineMedium: {
    width: '55%',
    height: 14,
  },
});
