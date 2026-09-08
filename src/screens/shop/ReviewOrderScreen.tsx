import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';

import { ScreenContainer } from '../../components/ScreenContainer';
import { ScreenHeader } from '../../components/ScreenHeader';
import { ProductArt } from '../../components/ProductArt';
import { PrimaryButton } from '../../components/PrimaryButton';
import { StickyFooter } from '../../components/StickyFooter';
import { LoadingState } from '../../components/LoadingState';
import { ErrorState } from '../../components/ErrorState';
import { Badge } from '../../components/Badge';
import { colors, radius, spacing, typography } from '../../theme';
import { categoryById } from '../../data/categories';
import { useProductDetail } from '../../hooks/useMarketplace';
import { buildEmiPlans } from '../../utils/emi';
import { formatINR } from '../../utils/currency';
import type { ShopStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<ShopStackParamList, 'ReviewOrder'>;

export function ReviewOrderScreen({ route, navigation }: Props) {
  const { productId, variantId, emiPlanId } = route.params;
  const { data: product, isLoading, isError, refetch } = useProductDetail(productId);

  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (isLoading) {
    return (
      <ScreenContainer>
        <ScreenHeader title="Review order" onBack={navigation.goBack} />
        <LoadingState label="Loading order summary..." />
      </ScreenContainer>
    );
  }

  if (isError || !product) {
    return (
      <ScreenContainer>
        <ScreenHeader title="Review order" onBack={navigation.goBack} />
        <ErrorState message="We couldn't load your order summary." onRetry={refetch} />
      </ScreenContainer>
    );
  }

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const plan = buildEmiPlans(variant.price).find((p) => p.id === emiPlanId);
  const category = categoryById(product.categoryId);

  if (!plan) {
    return (
      <ScreenContainer>
        <ScreenHeader title="Review order" onBack={navigation.goBack} />
        <ErrorState message="This EMI plan is no longer available." onRetry={refetch} />
      </ScreenContainer>
    );
  }

  const handleConfirm = () => {
    setSubmitting(true);
    // Simulated submit - stands in for the real order/EMI-activation call.
    setTimeout(() => {
      setSubmitting(false);
      setConfirmed(true);
    }, 900);
  };

  const goToMarketplace = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'ShopHome' }],
      })
    );
  };

  if (confirmed) {
    return (
      <ScreenContainer>
        <ScreenHeader title="Order confirmed" onBack={goToMarketplace} />
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark" size={36} color={colors.textOnPrimary} />
          </View>
          <Text style={styles.successTitle}>Your no-cost EMI is confirmed</Text>
          <Text style={styles.successSubtitle}>
            {product.name} . {variant.label} is on its way. Your first instalment of{' '}
            {formatINR(plan.monthlyAmount)} is backed by your mutual fund holdings - no credit
            score, no interest.
          </Text>
          <View style={styles.successButton}>
            <PrimaryButton label="Back to Marketplace" onPress={goToMarketplace} />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScreenHeader title="Review order" onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.productRow}>
            <ProductArt
              icon={product.icon}
              gradient={category?.gradient ?? ['#4C1D95', '#7C3AED']}
              size={64}
              borderRadius={radius.md}
            />
            <View style={styles.productInfo}>
              <Text style={styles.brand}>{product.brand.toUpperCase()}</Text>
              <Text style={styles.name} numberOfLines={2}>
                {product.name}
              </Text>
              <Text style={styles.variantLabel}>
                {product.variantAttribute}: {variant.label}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>EMI plan</Text>
            <Badge label="No-Cost" tone="success" />
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tenure</Text>
            <Text style={styles.summaryValue}>{plan.tenureMonths} months</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Monthly instalment</Text>
            <Text style={styles.summaryValue}>{formatINR(plan.monthlyAmount)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Interest</Text>
            <Text style={styles.summaryValue}>0%</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Processing fee</Text>
            <Text style={styles.summaryValue}>{formatINR(0)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryRowTotal]}>
            <Text style={styles.totalLabel}>Total payable</Text>
            <Text style={styles.totalValue}>{formatINR(plan.totalAmount)}</Text>
          </View>
        </View>

        <View style={styles.noteCard}>
          <Ionicons name="information-circle-outline" size={18} color={colors.primary} />
          <Text style={styles.noteText}>
            Your EMI limit is secured against your existing mutual fund holdings. No units are
            sold - you keep earning returns on your investments while you repay.
          </Text>
        </View>
      </ScrollView>

      <StickyFooter>
        <View style={styles.footerButtonFull}>
          <PrimaryButton label="Confirm & Continue" loading={submitting} onPress={handleConfirm} />
        </View>
      </StickyFooter>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
  },
  productRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  brand: {
    ...typography.overline,
    color: colors.textMuted,
  },
  name: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  variantLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xxs,
  },
  summaryRowTotal: {
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    marginTop: spacing.xxs,
    paddingTop: spacing.xs,
  },
  summaryLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  summaryValue: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  totalLabel: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  totalValue: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  noteCard: {
    flexDirection: 'row',
    gap: spacing.xs,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    padding: spacing.sm,
  },
  noteText: {
    ...typography.caption,
    color: colors.textPrimary,
    flex: 1,
  },
  footerButtonFull: {
    flex: 1,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  successIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  successTitle: {
    ...typography.h1,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  successSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  successButton: {
    marginTop: spacing.md,
    alignSelf: 'stretch',
  },
});
