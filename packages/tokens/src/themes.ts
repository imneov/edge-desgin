/**
 * Edge Design System — Theme Tokens
 *
 * 6 built-in themes extracted from edge-console.
 * Each theme defines Tailwind utility classes for header, sidebar, and menu styling.
 * The theme system is extensible: consumers can register custom themes.
 */

export interface ThemeColors {
  // Header
  headerBg: string
  headerBorder: string
  hoverBg: string
  divider: string

  // Active state
  activeBg: string
  activeHover: string

  // Text
  text: string
  textMuted: string
  textActive: string

  // Logo
  logoBg: string
  logoText: string

  // Avatar
  avatarBg: string
  avatarText: string

  // Sidebar selector
  selectorBg: string
  selectorBorder: string
  selectorHover: string
  selectorIcon: string
  selectorTitle: string
  selectorSubtitle: string
  selectorChevron: string

  // Sidebar menu items
  menuItemActiveBg: string
  menuItemActiveText: string
  menuItemActiveIcon: string
  menuItemText: string
  menuItemIcon: string
  menuItemHoverBg: string
  menuItemHoverText: string
}

export interface Theme {
  name: string
  label: string
  colors: ThemeColors
}

export const themes: Record<string, Theme> = {
  default: {
    name: 'default',
    label: '经典蓝',
    colors: {
      headerBg: 'bg-[#1e293b]',
      headerBorder: 'border-slate-700',
      hoverBg: 'hover:bg-slate-700',
      divider: 'bg-slate-600',
      activeBg: 'bg-[#2563eb]',
      activeHover: 'hover:bg-[#1d4ed8]',
      text: 'text-white',
      textMuted: 'text-slate-400',
      textActive: 'text-white',
      logoBg: 'bg-[#2563eb]',
      logoText: 'text-white',
      avatarBg: 'bg-[#2563eb]',
      avatarText: 'text-white',
      selectorBg: 'bg-[#1e293b]',
      selectorBorder: 'border-[#1e293b]',
      selectorHover: 'hover:bg-[#1e293b]',
      selectorIcon: 'text-white',
      selectorTitle: 'text-white',
      selectorSubtitle: 'text-white/70',
      selectorChevron: 'text-white',
      menuItemActiveBg: 'bg-blue-50',
      menuItemActiveText: 'text-blue-600',
      menuItemActiveIcon: 'text-blue-600',
      menuItemText: 'text-gray-700',
      menuItemIcon: 'text-gray-600',
      menuItemHoverBg: 'hover:bg-gray-50',
      menuItemHoverText: 'hover:text-gray-900',
    },
  },
  purple: {
    name: 'purple',
    label: '优雅紫色',
    colors: {
      headerBg: 'bg-[#2d1b3d]',
      headerBorder: 'border-purple-900',
      hoverBg: 'hover:bg-purple-900/50',
      divider: 'bg-purple-800',
      activeBg: 'bg-purple-600',
      activeHover: 'hover:bg-purple-700',
      text: 'text-white',
      textMuted: 'text-purple-300',
      textActive: 'text-white',
      logoBg: 'bg-gradient-to-br from-purple-400 to-purple-600',
      logoText: 'text-white',
      avatarBg: 'bg-gradient-to-br from-purple-400 to-purple-600',
      avatarText: 'text-white',
      selectorBg: 'bg-purple-100',
      selectorBorder: 'border-purple-300',
      selectorHover: 'hover:bg-purple-200',
      selectorIcon: 'text-purple-700',
      selectorTitle: 'text-purple-900',
      selectorSubtitle: 'text-purple-700',
      selectorChevron: 'text-purple-700',
      menuItemActiveBg: 'bg-purple-50',
      menuItemActiveText: 'text-purple-600',
      menuItemActiveIcon: 'text-purple-600',
      menuItemText: 'text-gray-700',
      menuItemIcon: 'text-gray-600',
      menuItemHoverBg: 'hover:bg-gray-50',
      menuItemHoverText: 'hover:text-gray-900',
    },
  },
  green: {
    name: 'green',
    label: '清新绿色',
    colors: {
      headerBg: 'bg-[#1a2f2a]',
      headerBorder: 'border-emerald-900',
      hoverBg: 'hover:bg-emerald-900/50',
      divider: 'bg-emerald-800',
      activeBg: 'bg-emerald-600',
      activeHover: 'hover:bg-emerald-700',
      text: 'text-white',
      textMuted: 'text-emerald-300',
      textActive: 'text-white',
      logoBg: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
      logoText: 'text-white',
      avatarBg: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
      avatarText: 'text-white',
      selectorBg: 'bg-emerald-100',
      selectorBorder: 'border-emerald-300',
      selectorHover: 'hover:bg-emerald-200',
      selectorIcon: 'text-emerald-700',
      selectorTitle: 'text-emerald-900',
      selectorSubtitle: 'text-emerald-700',
      selectorChevron: 'text-emerald-700',
      menuItemActiveBg: 'bg-emerald-50',
      menuItemActiveText: 'text-emerald-600',
      menuItemActiveIcon: 'text-emerald-600',
      menuItemText: 'text-gray-700',
      menuItemIcon: 'text-gray-600',
      menuItemHoverBg: 'hover:bg-gray-50',
      menuItemHoverText: 'hover:text-gray-900',
    },
  },
  orange: {
    name: 'orange',
    label: '活力橙色',
    colors: {
      headerBg: 'bg-[#2d1f1a]',
      headerBorder: 'border-orange-900',
      hoverBg: 'hover:bg-orange-900/50',
      divider: 'bg-orange-800',
      activeBg: 'bg-orange-600',
      activeHover: 'hover:bg-orange-700',
      text: 'text-white',
      textMuted: 'text-orange-300',
      textActive: 'text-white',
      logoBg: 'bg-gradient-to-br from-orange-400 to-orange-600',
      logoText: 'text-white',
      avatarBg: 'bg-gradient-to-br from-orange-400 to-orange-600',
      avatarText: 'text-white',
      selectorBg: 'bg-orange-100',
      selectorBorder: 'border-orange-300',
      selectorHover: 'hover:bg-orange-200',
      selectorIcon: 'text-orange-700',
      selectorTitle: 'text-orange-900',
      selectorSubtitle: 'text-orange-700',
      selectorChevron: 'text-orange-700',
      menuItemActiveBg: 'bg-orange-50',
      menuItemActiveText: 'text-orange-600',
      menuItemActiveIcon: 'text-orange-600',
      menuItemText: 'text-gray-700',
      menuItemIcon: 'text-gray-600',
      menuItemHoverBg: 'hover:bg-gray-50',
      menuItemHoverText: 'hover:text-gray-900',
    },
  },
  dark: {
    name: 'dark',
    label: '暗夜黑色',
    colors: {
      headerBg: 'bg-[#0f1419]',
      headerBorder: 'border-gray-900',
      hoverBg: 'hover:bg-gray-800/50',
      divider: 'bg-gray-700',
      activeBg: 'bg-gray-700',
      activeHover: 'hover:bg-gray-600',
      text: 'text-white',
      textMuted: 'text-gray-400',
      textActive: 'text-white',
      logoBg: 'bg-gray-700',
      logoText: 'text-white',
      avatarBg: 'bg-gray-700',
      avatarText: 'text-white',
      selectorBg: 'bg-gray-300',
      selectorBorder: 'border-gray-400',
      selectorHover: 'hover:bg-gray-400',
      selectorIcon: 'text-gray-800',
      selectorTitle: 'text-gray-900',
      selectorSubtitle: 'text-gray-700',
      selectorChevron: 'text-gray-800',
      menuItemActiveBg: 'bg-gray-200',
      menuItemActiveText: 'text-gray-900',
      menuItemActiveIcon: 'text-gray-900',
      menuItemText: 'text-gray-700',
      menuItemIcon: 'text-gray-600',
      menuItemHoverBg: 'hover:bg-gray-50',
      menuItemHoverText: 'hover:text-gray-900',
    },
  },
  cyan: {
    name: 'cyan',
    label: '科技青色',
    colors: {
      headerBg: 'bg-[#0f2a2e]',
      headerBorder: 'border-cyan-900',
      hoverBg: 'hover:bg-cyan-900/50',
      divider: 'bg-cyan-800',
      activeBg: 'bg-cyan-600',
      activeHover: 'hover:bg-cyan-700',
      text: 'text-white',
      textMuted: 'text-cyan-300',
      textActive: 'text-white',
      logoBg: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
      logoText: 'text-white',
      avatarBg: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
      avatarText: 'text-white',
      selectorBg: 'bg-cyan-100',
      selectorBorder: 'border-cyan-300',
      selectorHover: 'hover:bg-cyan-200',
      selectorIcon: 'text-cyan-700',
      selectorTitle: 'text-cyan-900',
      selectorSubtitle: 'text-cyan-700',
      selectorChevron: 'text-cyan-700',
      menuItemActiveBg: 'bg-cyan-50',
      menuItemActiveText: 'text-cyan-600',
      menuItemActiveIcon: 'text-cyan-600',
      menuItemText: 'text-gray-700',
      menuItemIcon: 'text-gray-600',
      menuItemHoverBg: 'hover:bg-gray-50',
      menuItemHoverText: 'hover:text-gray-900',
    },
  },
}

export type ThemeName = keyof typeof themes

/**
 * Get a theme by name, falling back to 'default'.
 */
export function getTheme(name: string): Theme {
  return themes[name] ?? themes.default
}

/**
 * Register a custom theme at runtime.
 */
export function registerTheme(theme: Theme): void {
  themes[theme.name] = theme
}
