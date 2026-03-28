/** @type {import('tailwindcss').Config} */
const edgePreset = require('@edge/tokens/tailwind-preset')

module.exports = {
  presets: [edgePreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
}
