import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';
import type { Category } from '../types/product';
import { AppIcon } from './AppIcon';

interface CategoryChipProps {
  category: Category;
  active: boolean;
  onPress: () => void;
}

export function CategoryChip({ category, active, onPress }: CategoryChipProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
    >
      <AppIcon icon={category.icon} size={15} color={active ? colors.textOnPrimary : colors.textSecondary} />
      <Text style={[styles.label, active && styles.labelActive]}>{category.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs + 4,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    ...typography.captionBold,
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.textOnPrimary,
  },
});
