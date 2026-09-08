import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';
import type { EMIPlan } from '../types/product';
import { formatINR } from '../utils/currency';
import { Badge } from './Badge';

interface EMIPlanCardProps {
  plan: EMIPlan;
  selected: boolean;
  onSelect: () => void;
}

export function EMIPlanCard({ plan, selected, onSelect }: EMIPlanCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onSelect}
      style={[styles.card, selected && styles.cardSelected]}
    >
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.tenure}>{plan.tenureMonths} months</Text>
          {plan.recommended && <Badge label="Recommended" tone="primary" />}
        </View>
        <Text style={styles.monthly}>{formatINR(plan.monthlyAmount)}/month</Text>
        <Text style={styles.total}>Total payable {formatINR(plan.totalAmount)} · 0% interest </Text>
      </View>

      <Badge label="No-Cost" tone="success" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.sm,
    backgroundColor: colors.card,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  tenure: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  monthly: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  total: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
