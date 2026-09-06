import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../theme';

interface LoadingStateProps {
  label?: string;
  compact?: boolean;
}

export function LoadingState({ label = 'Loading...', compact }: LoadingStateProps) {
  return (
    <View style={[styles.container, compact && styles.compact]}>
      <ActivityIndicator color={colors.primary} size={compact ? 'small' : 'large'} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.xs,
  },
  compact: {
    flex: undefined,
    paddingVertical: spacing.lg,
  },
  label: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
