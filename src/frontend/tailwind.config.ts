import type { Config } from 'tailwindcss'

import { fontFamily } from 'tailwindcss/defaultTheme'

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },
      colors: {
        dark: {
          1: '#1C1F2E',
          2: '#161925',
        },
        sky: {
          1: '#C9DDFF',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: {
            DEFAULT: 'hsl(var(--destructive-foreground))',
            darker: 'hsl(var(--destructive-darker-foreground))',
            lighter: 'hsl(var(--destructive-lighter-foreground))',
          },
          darker: 'hsl(var(--destructive-darker))',
          lighter: 'hsl(var(--destructive-lighter))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: {
            DEFAULT: 'hsl(var(--warning-foreground))',
            darker: 'hsl(var(--warning-darker-foreground))',
            lighter: 'hsl(var(--warning-lighter-foreground))',
          },
          darker: 'hsl(var(--warning-darker))',
          lighter: 'hsl(var(--warning-lighter))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: {
            DEFAULT: 'hsl(var(--success-foreground))',
            darker: 'hsl(var(--success-darker-foreground))',
            lighter: 'hsl(var(--success-lighter-foreground))',
          },
          darker: 'hsl(var(--success-darker))',
          lighter: 'hsl(var(--success-lighter))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: {
            DEFAULT: 'hsl(var(--info-foreground))',
            darker: 'hsl(var(--info-darker-foreground))',
            lighter: 'hsl(var(--info-lighter-foreground))',
          },
          darker: 'hsl(var(--info-darker))',
          lighter: 'hsl(var(--info-lighter))',
        },

        // Variants...
        destructiveVariant: {
          DEFAULT: 'hsl(var(--destructive-variant))',
          foreground: {
            DEFAULT: 'hsl(var(--destructive-variant-foreground))',
            darker: 'hsl(var(--destructive-variant-darker-foreground))',
            lighter: 'hsl(var(--destructive-variant-lighter-foreground))',
          },
          darker: 'hsl(var(--destructive-variant-darker))',
          lighter: 'hsl(var(--destructive-variant-lighter))',
        },
        warningVariant: {
          DEFAULT: 'hsl(var(--warning-variant))',
          foreground: {
            DEFAULT: 'hsl(var(--warning-variant-foreground))',
            darker: 'hsl(var(--warning-variant-darker-foreground))',
            lighter: 'hsl(var(--warning-variant-lighter-foreground))',
          },
          darker: 'hsl(var(--warning-variant-darker))',
          lighter: 'hsl(var(--warning-variant-lighter))',
        },
        successVariant: {
          DEFAULT: 'hsl(var(--success-variant))',
          foreground: {
            DEFAULT: 'hsl(var(--success-variant-foreground))',
            darker: 'hsl(var(--success-variant-darker-foreground))',
            lighter: 'hsl(var(--success-variant-lighter-foreground))',
          },
          darker: 'hsl(var(--success-variant-darker))',
          lighter: 'hsl(var(--success-variant-lighter))',
        },
        infoVariant: {
          DEFAULT: 'hsl(var(--info-variant))',
          foreground: {
            DEFAULT: 'hsl(var(--info-variant-foreground))',
            darker: 'hsl(var(--info-variant-darker-foreground))',
            lighter: 'hsl(var(--info-variant-lighter-foreground))',
          },
          darker: 'hsl(var(--info-variant-darker))',
          lighter: 'hsl(var(--info-variant-lighter))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      backgroundImage: {
        hero: "url('/images/hero-background.png')",
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
