import type { TextStyle } from 'react-native';

type Weight = TextStyle['fontWeight'];

const create = (fontSize: number, fontWeight: Weight, lineHeight: number) => ({
  fontSize,
  fontWeight,
  lineHeight,
});

export const typography = {
  display: create(28, '700', 34),
  h1: create(22, '700', 28),
  h2: create(18, '700', 24),
  h3: create(16, '700', 22),
  bodyLg: create(15, '500', 21),
  body: create(14, '400', 20),
  bodyBold: create(14, '700', 20),
  caption: create(12, '500', 16),
  captionBold: create(12, '700', 16),
  overline: create(11, '700', 14),
} as const;
