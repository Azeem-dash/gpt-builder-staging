import type { Config } from 'tailwindcss';

import themePreset from './styles/plugins/preset';

const config = {
  content: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'config/variants/*.{js,jsx,ts,tsx}',
    './node_modules/@sohanemon/utils/dist/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [themePreset],
} satisfies Config;

export default config;
