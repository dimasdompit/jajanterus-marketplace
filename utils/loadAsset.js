import { filename } from 'pathe/utils';

export const loadAsset = (name) => {
  const glob = import.meta.glob(`~/assets/**/*.svg`, { eager: true });
  const images = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), value.default])
  );

  return images[name];
}