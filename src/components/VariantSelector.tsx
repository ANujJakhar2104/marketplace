import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';
import type { ProductVariant } from '../types/product';

interface VariantSelectorProps {
  label: string;
  variants: ProductVariant[];
  selectedId: string;
  onSelect: (variantId: string) => void;
}

export function VariantSelector({ label, variants, selectedId, onSelect }: VariantSelectorProps) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {variants.map((variant) => {
          const selected = variant.id === selectedId;
          const disabled = !variant.inStock;
          return (
            <TouchableOpacity
              key={variant.id}
              disabled={disabled}
              activeOpacity={0.8}
              onPress={() => onSelect(variant.id)}
              style={[
                styles.chip,
                selected && styles.chipSelected,
                disabled && styles.chipDisabled,
              ]}
            >
              <Text
                style={[
                  styles.chipLabel,
                  selected && styles.chipLabelSelected,
                  disabled && styles.chipLabelDisabled,
                ]}
              >
                {variant.label}
              </Text>
              {disabled && <Text style={styles.outOfStock}>Out of stock</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.card,
  },
  chipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  chipDisabled: {
    opacity: 0.5,
  },
  chipLabel: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  chipLabelSelected: {
    color: colors.primary,
  },
  chipLabelDisabled: {
    color: colors.textMuted,
  },
  outOfStock: {
    ...typography.caption,
    color: colors.danger,
    marginTop: 2,
  },
});
