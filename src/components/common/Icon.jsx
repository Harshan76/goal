import React from 'react';
import * as Icons from 'lucide-react';

export function DynamicIcon({ name, className = 'w-5 h-5', fallback = 'Activity' }) {
  const IconComponent = Icons[name] || Icons[fallback] || Icons.Activity;
  return <IconComponent className={className} />;
}
