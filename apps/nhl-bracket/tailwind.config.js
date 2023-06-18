const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        title: [ 'Cabin', 'sans-serif' ],
        body: [ 'Cabin', 'sans-serif' ]
      },
      colors: {
        action: '#60a5fa',
        'action-contrast': '#ffffff',
        'action-dark': '#5499ea',
        warning: '#ef4444',
        'warning-contrast': '#ffffff',
        'warning-dark': '#da3c3c',
      }
    }
  },
  plugins: [
    require('@tailwindcss/container-queries')
  ],
};
