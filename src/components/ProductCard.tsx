import React, { useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';
import type { Product } from '../types/product';
import { categoryById } from '../data/categories';
import { formatINR } from '../utils/currency';
import { lowestMonthlyEmi } from '../utils/emi';
import { ProductArt } from './ProductArt';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const ART_HEIGHT = 110;

export function ProductCard({ product, onPress }: ProductCardProps) {
  const baseVariant = product.variants.find((v) => v.inStock) ?? product.variants[0];
  const category = categoryById(product.categoryId);
  const gradient = category?.gradient ?? ['#4C1D95', '#7C3AED'];

  const monthlyFrom = useMemo(() => lowestMonthlyEmi(baseVariant.price), [baseVariant.price]);

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.card}>
      <ProductArt
        icon={product.icon}
        gradient={gradient}
        height={ART_HEIGHT}
        borderRadius={0}
      />
      <View style={styles.body}>
        <Text style={styles.brand} numberOfLines={1}>
          {product.brand.toUpperCase()}
        </Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color={colors.warning} />
          <Text style={styles.ratingText}>
            {product.rating.toFixed(1)} ({product.reviewCount})
          </Text>
        </View>

        <Text style={styles.price}>{formatINR(baseVariant.price)}</Text>
        <Text style={styles.emiTeaser}>No-cost EMI from {formatINR(monthlyFrom)}/mo</Text>
      </View>
    </TouchableOpacity>
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
  body: {
    padding: spacing.sm,
    gap: 2,
  },
  brand: {
    ...typography.overline,
    color: colors.textMuted,
  },
  name: {
    ...typography.h3,
    color: colors.textPrimary,
    minHeight: 40,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  ratingText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  price: {
    ...typography.h3,
    color: colors.textPrimary,
    marginTop: spacing.xxs,
  },
  emiTeaser: {
    ...typography.captionBold,
    color: colors.primary,
    marginTop: 2,
  },
});
