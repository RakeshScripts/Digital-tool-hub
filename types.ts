// Fix: Import React to resolve 'Cannot find namespace "React"' error.
import React from 'react';

export interface Tool {
  id: string;
  title: string;
  navTitle?: string;
  description: string;
  path: string;
  icon: React.ReactNode;
}