import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, radius, spacing, typography } from '../theme';

/**
 * The real app's hero uses a licensed 3D illustration (shopping bag with a
 * phone, laptop, car and bike). That asset isn't available here, so this
 * recreates the same idea \u2014 a bag anchored by a few floating category
 * icons \u2014 as an original, icon-based composition rather than attempting
 * to reproduce the artwork.
 */
export function ShopHero() {
  return (
    <LinearGradient
      colors={[colors.primaryDeep, colors.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.hero}
    >
      <View style={styles.textBlock}>
        <View style={styles.badge}>
          <Ionicons name="sparkles" size={12} color={colors.textOnPrimary} />
          <Text style={styles.badgeLabel}>NO-COST EMIs</Text>
        </View>

        <Text style={styles.heading}>
          Shop today,{'\n'}
          <Text style={styles.headingItalic}>Pay later</Text> using{'\n'}
          Mutual funds.
        </Text>

        <Text style={styles.subtext}>
          No credit score required. No interest.{'\n'}Backed by your investments.
        </Text>
      </View>

      <View style={styles.artWrap}>
        <View style={styles.bagIcon}>
          <Ionicons name="bag-handle" size={40} color={colors.textOnPrimary} />
        </View>
        <View style={[styles.floatingIcon, styles.floatTopLeft]}>
          <Ionicons name="phone-portrait" size={16} color={colors.primaryDark} />
        </View>
        <View style={[styles.floatingIcon, styles.floatTopRight]}>
          <Ionicons name="laptop" size={16} color={colors.primaryDark} />
        </View>
        <View style={[styles.floatingIcon, styles.floatBottomLeft]}>
          <Ionicons name="car-sport" size={16} color={colors.primaryDark} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
    borderBottomLeftRadius: radius.xxl,
    borderBottomRightRadius: radius.xxl,
  },
  textBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
    marginBottom: spacing.xxs,
  },
  badgeLabel: {
    ...typography.overline,
    color: colors.textOnPrimary,
  },
  heading: {
    ...typography.display,
    color: colors.textOnPrimary,
  },
  headingItalic: {
    fontStyle: 'italic',
  },
  subtext: {
    ...typography.body,
    color: 'rgba(255,255,255,0.85)',
    marginTop: spacing.xs,
  },
  artWrap: {
    width: 88,
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bagIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingIcon: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.textOnPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  floatTopLeft: {
    top: -6,
    left: -4,
  },
  floatTopRight: {
    top: 4,
    right: -10,
  },
  floatBottomLeft: {
    bottom: 6,
    left: -14,
  },
});
