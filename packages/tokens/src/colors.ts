/**
 * Edge Design System — Color Tokens
 *
 * All colors are defined as HSL channel values (e.g. "221.2 83.2% 53.3%")
 * so they can be used with Tailwind's opacity modifiers:
 *   bg-primary/50  →  hsl(221.2 83.2% 53.3% / 0.5)
 *
 * CSS custom property names match the Tailwind color keys.
 */

// ---------------------------------------------------------------------------
// Semantic color tokens (HSL channel values, no hsl() wrapper)
// ---------------------------------------------------------------------------

export const lightColors = {
  background: '0 0% 100%',
  foreground: '222.2 84% 4.9%',
  card: '0 0% 100%',
  'card-foreground': '222.2 84% 4.9%',
  popover: '0 0% 100%',
  'popover-foreground': '222.2 84% 4.9%',
  primary: '221.2 83.2% 53.3%',
  'primary-foreground': '210 40% 98%',
  secondary: '210 40% 96%',
  'secondary-foreground': '222.2 84% 4.9%',
  muted: '210 40% 96%',
  'muted-foreground': '215.4 16.3% 46.9%',
  accent: '210 40% 96%',
  'accent-foreground': '222.2 84% 4.9%',
  destructive: '0 84.2% 60.2%',
  'destructive-foreground': '210 40% 98%',
  border: '214.3 31.8% 91.4%',
  input: '214.3 31.8% 91.4%',
  ring: '221.2 83.2% 53.3%',
} as const

export const darkColors = {
  background: '222.2 84% 4.9%',
  foreground: '210 40% 98%',
  card: '222.2 84% 4.9%',
  'card-foreground': '210 40% 98%',
  popover: '222.2 84% 4.9%',
  'popover-foreground': '210 40% 98%',
  primary: '217.2 91.2% 59.8%',
  'primary-foreground': '222.2 84% 4.9%',
  secondary: '217.2 32.6% 17.5%',
  'secondary-foreground': '210 40% 98%',
  muted: '217.2 32.6% 17.5%',
  'muted-foreground': '215 20.2% 65.1%',
  accent: '217.2 32.6% 17.5%',
  'accent-foreground': '210 40% 98%',
  destructive: '0 62.8% 30.6%',
  'destructive-foreground': '210 40% 98%',
  border: '217.2 32.6% 17.5%',
  input: '217.2 32.6% 17.5%',
  ring: '224.3 76.3% 94.1%',
} as const

// ---------------------------------------------------------------------------
// Cockpit / monitoring dashboard colors (hex values)
// ---------------------------------------------------------------------------

export const cockpitColors = {
  bg: '#F8FAFC',
  bgSecondary: '#FFFFFF',
  bgTertiary: '#F9FAFB',
  bgElevated: '#FFFFFF',
  border: '#E2E8F0',
  borderSubtle: '#F1F5F9',
  borderHover: '#CBD5E1',
  text: '#1E293B',
  textSecondary: '#475569',
  textMuted: '#6B7280',
  accent: '#3B82F6',
  accentMuted: 'rgba(59, 130, 246, 0.1)',
  success: '#14B8A6',
  successMuted: 'rgba(20, 184, 166, 0.1)',
  warning: '#F59E0B',
  warningMuted: 'rgba(245, 158, 11, 0.1)',
  danger: '#EF4444',
  dangerMuted: 'rgba(239, 68, 68, 0.1)',
  purple: '#8B5CF6',
  purpleMuted: 'rgba(139, 92, 246, 0.1)',
} as const

// ---------------------------------------------------------------------------
// Topology visualization colors
// ---------------------------------------------------------------------------

export const topologyColors = {
  bg: '#F5F7FA',
  cluster: '#2D3748',
  clusterForeground: '#FFFFFF',
  nodeGroup: '#10B981',
  nodeGroupForeground: '#FFFFFF',
  node: '#10B981',
  nodeForeground: '#065F46',
} as const

// ---------------------------------------------------------------------------
// Status colors (semantic)
// ---------------------------------------------------------------------------

export const statusColors = {
  success: '#14B8A6',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  neutral: '#6B7280',
} as const

export type SemanticColorKey = keyof typeof lightColors
export type CockpitColorKey = keyof typeof cockpitColors
export type TopologyColorKey = keyof typeof topologyColors
export type StatusColorKey = keyof typeof statusColors
