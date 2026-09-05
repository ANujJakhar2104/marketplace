/**
 * Colors sampled from the live 1Fi app's Shop page screens so the
 * Marketplace section feels native to the rest of the product.
 */
export const colors = {
  // Brand purple (hero gradient, active states, CTAs)
  primary: '#7C3AED',
  primaryDark: '#4C1D95',
  primaryDeep: '#2C0F5E',
  primaryLight: '#EDE7FB',
  primarySoft: '#F5F2FC',
  primaryBorder: '#DCD1F5',

  // Status / semantic
  success: '#16A34A',
  successSoft: '#E7F8ED',
  warning: '#B45309',
  warningSoft: '#FDF3E3',
  danger: '#DC2626',
  dangerSoft: '#FBEAEA',

  // Neutrals
  background: '#F5F5F7',
  card: '#FFFFFF',
  border: '#EAEAEF',
  divider: '#F0F0F3',

  textPrimary: '#15131C',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textOnPrimary: '#FFFFFF',

  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(21, 19, 28, 0.5)',
} as const;

export type AppColor = keyof typeof colors;
