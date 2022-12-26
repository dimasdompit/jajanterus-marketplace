import { filename } from 'pathe/utils';

export const loadBanner = (name) => {
  const glob = import.meta.glob(`~/assets/**/*.webp`, { eager: true });
  const images = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), value.default])
  );

  return images[name];
}