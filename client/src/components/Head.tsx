import React from 'react';

export default function Head({ children }: { children: React.ReactNode }) {
  // This is just a wrapper component - the actual head manipulation is done in HomePage.tsx
  return <>{children}</>;
}