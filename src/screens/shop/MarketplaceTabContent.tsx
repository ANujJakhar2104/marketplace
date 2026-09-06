import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { colors, spacing, typography } from '../../theme';
import { categories } from '../../data/categories';
import { useProducts } from '../../hooks/useMarketplace';
import type { ShopStackParamList } from '../../navigation/types';
import { CategoryChip } from '../../components/CategoryChip';
import { ProductCard } from '../../components/ProductCard';
import { SkeletonCard } from '../../components/SkeletonCard';
import { ErrorState } from '../../components/ErrorState';
import { EmptyState } from '../../components/EmptyState';

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

const SKELETON_COUNT = 6;

export function MarketplaceTabContent({ searchQuery }: { searchQuery: string }) {
  const navigation = useNavigation<NativeStackNavigationProp<ShopStackParamList>>();
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: products, isLoading, isError, refetch, isFetching } = useProducts(activeCategory);

  const visibleProducts = useMemo(() => {
    if (!products) return [];
    const query = searchQuery.trim().toLowerCase();
    if (!query) return products;
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) || product.brand.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.categoryRow}
        renderItem={({ item }) => (
          <CategoryChip
            category={item}
            active={item.id === activeCategory}
            onPress={() => setActiveCategory(item.id)}
          />
        )}
      />

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>1Fi Marketplace</Text>
        <Text style={styles.sectionSubtitle}>No-cost EMIs backed by your mutual funds</Text>
      </View>

      {isLoading ? (
        <View style={styles.grid}>
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <View key={index} style={styles.gridItem}>
              <SkeletonCard />
            </View>
          ))}
        </View>
      ) : isError ? (
        <ErrorState
          message="We couldn't load the Marketplace right now."
          onRetry={refetch}
        />
      ) : visibleProducts.length === 0 ? (
        <EmptyState
          icon="search-outline"
          title="No products found"
          subtitle="Try a different search term or category."
        />
      ) : (
        // Rendered as a plain chunked grid (not a nested FlatList) since this
        // screen already lives inside a vertical ScrollView, and the full
        // mock catalog is small enough that virtualization isn't needed.
        <View style={styles.grid}>
          {chunk(visibleProducts, 2).map((row, rowIndex) => (
            <View key={rowIndex} style={styles.gridRow}>
              {row.map((item) => (
                <View key={item.id} style={styles.gridItem}>
                  <ProductCard
                    product={item}
                    onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
                  />
                </View>
              ))}
              {row.length === 1 && <View style={styles.gridItem} />}
            </View>
          ))}
          {isFetching && !isLoading && <Text style={styles.refreshingHint}>Refreshing\u2026</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.md,
  },
  categoryRow: {
    gap: spacing.xs,
    paddingBottom: spacing.md,
  },
  sectionHeaderRow: {
    marginBottom: spacing.sm,
    gap: 2,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  grid: {
    gap: spacing.sm,
  },
  gridRow: {
    gap: spacing.sm,
  },
  gridItem: {
    flex: 1,
    marginBottom: spacing.sm,
  },
  refreshingHint: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
