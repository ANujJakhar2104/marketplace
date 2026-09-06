import React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import type { IconSpec } from '../types/product';

interface AppIconProps {
  icon: IconSpec;
  size?: number;
  color?: string;
}

export function AppIcon({ icon, size = 20, color = '#111' }: AppIconProps) {
  if (icon.family === 'material-community') {
    return <MaterialCommunityIcons name={icon.name as never} size={size} color={color} />;
  }
  return <Ionicons name={icon.name as never} size={size} color={color} />;
}
