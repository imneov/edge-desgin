/**
 * Edge Design System — Motion Tokens
 */

export const duration = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
  slowest: '800ms',
} as const

export const easing = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const

export const keyframes = {
  'accordion-down': {
    from: { height: '0' },
    to: { height: 'var(--radix-accordion-content-height)' },
  },
  'accordion-up': {
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: '0' },
  },
  'ring-fill': {
    from: { strokeDashoffset: '251' },
  },
  'status-pulse': {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.6' },
  },
  'count-fade-in': {
    from: { opacity: '0', transform: 'translateY(2px)' },
    to: { opacity: '1', transform: 'translateY(0)' },
  },
  'fade-in': {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  'fade-out': {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },
  'slide-in-from-top': {
    from: { transform: 'translateY(-100%)' },
    to: { transform: 'translateY(0)' },
  },
  'slide-in-from-bottom': {
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(0)' },
  },
  'scale-in': {
    from: { opacity: '0', transform: 'scale(0.95)' },
    to: { opacity: '1', transform: 'scale(1)' },
  },
} as const

export const animation = {
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out',
  'ring-fill': 'ring-fill 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
  'status-pulse': 'status-pulse 2s ease-in-out infinite',
  'count-fade-in': 'count-fade-in 0.3s ease-out',
  'fade-in': 'fade-in 0.2s ease-out',
  'fade-out': 'fade-out 0.2s ease-out',
  'slide-in-from-top': 'slide-in-from-top 0.2s ease-out',
  'slide-in-from-bottom': 'slide-in-from-bottom 0.2s ease-out',
  'scale-in': 'scale-in 0.2s ease-out',
} as const

export type DurationKey = keyof typeof duration
export type EasingKey = keyof typeof easing
export type AnimationKey = keyof typeof animation
