'use client';
import { Metadata } from 'next';

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link 
        href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" 
        rel="stylesheet" 
      />
      {children}
    </>
  );
} 