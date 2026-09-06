import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

type BadgeTone = 'primary' | 'success' | 'neutral';

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
}

const TONE_STYLES: Record<BadgeTone, { bg: string; fg: string }> = {
  primary: { bg: colors.primaryLight, fg: colors.primary },
  success: { bg: colors.successSoft, fg: colors.success },
  neutral: { bg: colors.divider, fg: colors.textSecondary },
};

export function Badge({ label, tone = 'primary' }: BadgeProps) {
  const toneStyle = TONE_STYLES[tone];
  return (
    <View style={[styles.container, { backgroundColor: toneStyle.bg }]}>
      <Text style={[styles.label, { color: toneStyle.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 3,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  label: {
    ...typography.captionBold,
  },
});
