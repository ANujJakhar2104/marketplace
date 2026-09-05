import type { Category } from '../types/product';

export const categories: Category[] = [
  {
    id: 'all',
    label: 'All',
    icon: { family: 'ionicons', name: 'apps-outline' },
    gradient: ['#4C1D95', '#7C3AED'],
  },
  {
    id: 'electronics',
    label: 'Electronics',
    icon: { family: 'ionicons', name: 'phone-portrait-outline' },
    gradient: ['#312E81', '#6366F1'],
  },
  {
    id: 'mobility',
    label: 'Two-Wheelers',
    icon: { family: 'material-community', name: 'motorbike' },
    gradient: ['#1E293B', '#475569'],
  },
  {
    id: 'jewellery',
    label: 'Jewellery',
    icon: { family: 'material-community', name: 'necklace' },
    gradient: ['#9D174D', '#F472B6'],
  },
  {
    id: 'watches',
    label: 'Watches',
    icon: { family: 'ionicons', name: 'watch-outline' },
    gradient: ['#1F2937', '#52525B'],
  },
  {
    id: 'travel',
    label: 'Travel',
    icon: { family: 'ionicons', name: 'airplane-outline' },
    gradient: ['#0369A1', '#38BDF8'],
  },
  {
    id: 'appliances',
    label: 'Appliances',
    icon: { family: 'ionicons', name: 'tv-outline' },
    gradient: ['#0F766E', '#2DD4BF'],
  },
];

export const categoryById = (id: string): Category | undefined =>
  categories.find((category) => category.id === id);
