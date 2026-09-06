import React, { useEffect, useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenContainer } from '../../components/ScreenContainer';
import { ScreenHeader } from '../../components/ScreenHeader';
import { ProductArt } from '../../components/ProductArt';
import { VariantSelector } from '../../components/VariantSelector';
import { EMIPlanCard } from '../../components/EMIPlanCard';
import { TrustBadgeRow } from '../../components/TrustBadgeRow';
import { PrimaryButton } from '../../components/PrimaryButton';
import { StickyFooter } from '../../components/StickyFooter';
import { LoadingState } from '../../components/LoadingState';
import { ErrorState } from '../../components/ErrorState';
import { colors, spacing, typography } from '../../theme';
import { categoryById } from '../../data/categories';
import { useProductDetail } from '../../hooks/useMarketplace';
import { buildEmiPlans } from '../../utils/emi';
import { formatINR } from '../../utils/currency';
import type { ShopStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<ShopStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({ route, navigation }: Props) {
  const { productId } = route.params;
  const { data: product, isLoading, isError, refetch } = useProductDetail(productId);

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedEmiId, setSelectedEmiId] = useState<string | null>(null);

  // Default to the first in-stock variant once the product loads.
  useEffect(() => {
    if (product && !selectedVariantId) {
      const defaultVariant = product.variants.find((v) => v.inStock) ?? product.variants[0];
      setSelectedVariantId(defaultVariant.id);
    }
  }, [product, selectedVariantId]);

  const selectedVariant = useMemo(
    () => product?.variants.find((v) => v.id === selectedVariantId) ?? product?.variants[0],
    [product, selectedVariantId]
  );

  const emiPlans = useMemo(
    () => (selectedVariant ? buildEmiPlans(selectedVariant.price) : []),
    [selectedVariant]
  );

  // Default to the recommended plan once plans are available for this price.
  useEffect(() => {
    if (emiPlans.length && !emiPlans.some((p) => p.id === selectedEmiId)) {
      const recommended = emiPlans.find((p) => p.recommended) ?? emiPlans[0];
      setSelectedEmiId(recommended.id);
    }
  }, [emiPlans, selectedEmiId]);

  const selectedPlan = emiPlans.find((p) => p.id === selectedEmiId);

  if (isLoading) {
    return (
      <ScreenContainer>
        <ScreenHeader title="Product" onBack={navigation.goBack} />
        <LoadingState label="Loading product..." />
      </ScreenContainer>
    );
  }

  if (isError || !product) {
    return (
      <ScreenContainer>
        <ScreenHeader title="Product" onBack={navigation.goBack} />
        <ErrorState message="We couldn't load this product." onRetry={refetch} />
      </ScreenContainer>
    );
  }

  const category = categoryById(product.categoryId);
  const savings = selectedVariant ? selectedVariant.mrp - selectedVariant.price : 0;

  return (
    <ScreenContainer>
      <ScreenHeader title={product.name} onBack={navigation.goBack} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.artRow}>
          <ProductArt
            icon={product.icon}
            gradient={category?.gradient ?? ['#4C1D95', '#7C3AED']}
            size={140}
          />
        </View>

        <Text style={styles.brand}>{product.brand.toUpperCase()}</Text>
        <Text style={styles.name}>{product.name}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color={colors.warning} />
          <Text style={styles.ratingText}>
            {product.rating.toFixed(1)} \u00b7 {product.reviewCount.toLocaleString('en-IN')} ratings
          </Text>
        </View>

        {selectedVariant && (
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatINR(selectedVariant.price)}</Text>
            {savings > 0 && <Text style={styles.mrp}>{formatINR(selectedVariant.mrp)}</Text>}
            {savings > 0 && <Text style={styles.savings}>Save {formatINR(savings)}</Text>}
          </View>
        )}

        <View style={styles.section}>
          <TrustBadgeRow />
        </View>

        {product.variants.length > 1 && selectedVariantId && (
          <View style={styles.section}>
            <VariantSelector
              label={product.variantAttribute}
              variants={product.variants}
              selectedId={selectedVariantId}
              onSelect={setSelectedVariantId}
            />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose your EMI plan</Text>
          <View style={styles.emiList}>
            {emiPlans.map((plan) => (
              <EMIPlanCard
                key={plan.id}
                plan={plan}
                selected={plan.id === selectedEmiId}
                onSelect={() => setSelectedEmiId(plan.id)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product details</Text>
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.highlightList}>
            {product.highlights.map((point) => (
              <View key={point} style={styles.highlightRow}>
                <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                <Text style={styles.highlightText}>{point}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <StickyFooter>
        <View style={styles.footerSummary}>
          <Text style={styles.footerLabel}>Pay monthly</Text>
          <Text style={styles.footerAmount}>
            {selectedPlan ? `${formatINR(selectedPlan.monthlyAmount)}/mo` : '\u2014'}
          </Text>
        </View>
        <View style={styles.footerButton}>
          <PrimaryButton
            label="Proceed"
            disabled={!selectedVariant || !selectedPlan}
            onPress={() => {
              if (!selectedVariant || !selectedPlan) return;
              navigation.navigate('ReviewOrder', {
                productId: product.id,
                variantId: selectedVariant.id,
                emiPlanId: selectedPlan.id,
              });
            }}
          />
        </View>
      </StickyFooter>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  artRow: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  brand: {
    ...typography.overline,
    color: colors.textMuted,
  },
  name: {
    ...typography.h1,
    color: colors.textPrimary,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.xs,
  },
  ratingText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
    marginTop: spacing.sm,
    flexWrap: 'wrap',
  },
  price: {
    ...typography.display,
    color: colors.textPrimary,
  },
  mrp: {
    ...typography.body,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  savings: {
    ...typography.captionBold,
    color: colors.success,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  emiList: {
    gap: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  highlightList: {
    gap: spacing.xs,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  highlightText: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
  footerSummary: {
    flex: 1,
  },
  footerLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  footerAmount: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  footerButton: {
    flex: 1,
  },
});
