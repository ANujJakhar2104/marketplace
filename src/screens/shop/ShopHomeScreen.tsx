import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '../../components/ScreenContainer';
import { ShopHero } from '../../components/ShopHero';
import { SegmentedTabs } from '../../components/SegmentedTabs';
import { SearchBar } from '../../components/SearchBar';
import { EmptyState } from '../../components/EmptyState';
import { spacing } from '../../theme';
import { MarketplaceTabContent } from './MarketplaceTabContent';

type ShopTabId = 'topBrands' | 'nearbyStores' | 'marketplace';

const TABS: { id: ShopTabId; label: string }[] = [
  { id: 'topBrands', label: 'Top Brands' },
  { id: 'nearbyStores', label: 'Nearby Stores' },
  { id: 'marketplace', label: '1Fi Marketplace' },
];

const SEARCH_PLACEHOLDER: Record<ShopTabId, string> = {
  topBrands: 'Search online stores...',
  nearbyStores: 'Search nearby stores...',
  marketplace: 'Search products, brands...',
};

export function ShopHomeScreen() {
  const [activeTab, setActiveTab] = useState<ShopTabId>('marketplace');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScreenContainer edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ShopHero />

        <View style={styles.body}>
          <View style={styles.tabsWrap}>
            <SegmentedTabs
              tabs={TABS}
              activeId={activeTab}
              onChange={(id) => setActiveTab(id as ShopTabId)}
            />
          </View>

          <SearchBar
            placeholder={SEARCH_PLACEHOLDER[activeTab]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {activeTab === 'topBrands' && (
            <EmptyState
              icon="storefront-outline"
              title="Top Brands, coming soon"
              subtitle="Browse no-cost EMI offers from your favourite brands, right here."
            />
          )}

          {activeTab === 'nearbyStores' && (
            <EmptyState
              icon="location-outline"
              title="Nearby Stores, coming soon"
              subtitle="Find partner stores near you offering no-cost EMIs in person."
            />
          )}

          {activeTab === 'marketplace' && <MarketplaceTabContent searchQuery={searchQuery} />}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  body: {
    paddingHorizontal: spacing.md,
    marginTop: -spacing.lg,
    gap: spacing.md,
  },
  tabsWrap: {
    // pulls the pill tabs up so they sit astride the hero's rounded edge,
    // matching the live app's layout
    marginTop: -spacing.sm,
  },
});
