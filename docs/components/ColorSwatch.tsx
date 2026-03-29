import React from 'react'

interface ColorSwatchProps {
  /** CSS variable name, e.g. "primary" or a hex value e.g. "#3B82F6" */
  value: string
  /** Optional label override */
  label?: string
  /** Show both light and dark mode swatches side by side */
  dark?: string
  /** Width class, defaults to w-8 h-8 */
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
}

/** Renders a single color swatch circle */
export function ColorSwatch({ value, label, dark, size = 'md' }: ColorSwatchProps) {
  const isVar = value.startsWith('hsl(var(--') || !value.startsWith('#')
  const lightStyle = isVar
    ? { background: value }
    : { backgroundColor: value }

  return (
    <span
      className="inline-flex items-center gap-1"
      title={label ?? value}
    >
      <span
        className={`${sizeMap[size]} rounded border border-black/10 inline-block shrink-0`}
        style={lightStyle}
      />
      {dark && (
        <span
          className={`${sizeMap[size]} rounded border border-white/20 inline-block shrink-0`}
          style={{ backgroundColor: `hsl(${dark})` }}
          title={`Dark: ${dark}`}
        />
      )}
    </span>
  )
}

interface SemanticTokenRowProps {
  token: string
  light: string
  dark: string
  usage: string
}

/** A table row with color swatches for a semantic token */
export function SemanticTokenRow({ token, light, dark, usage }: SemanticTokenRowProps) {
  return (
    <tr>
      <td className="px-3 py-2 font-mono text-sm">
        <code>{token}</code>
      </td>
      <td className="px-3 py-2">
        <span className="inline-flex items-center gap-2">
          <span
            className="w-6 h-6 rounded border border-black/10 inline-block shrink-0"
            style={{ background: `hsl(${light})` }}
          />
          <span className="font-mono text-xs text-muted-foreground">{light}</span>
        </span>
      </td>
      <td className="px-3 py-2">
        <span className="inline-flex items-center gap-2">
          <span
            className="w-6 h-6 rounded border border-black/10 inline-block shrink-0"
            style={{ background: `hsl(${dark})` }}
          />
          <span className="font-mono text-xs text-muted-foreground">{dark}</span>
        </span>
      </td>
      <td className="px-3 py-2 text-sm text-muted-foreground">{usage}</td>
    </tr>
  )
}

interface HexSwatchRowProps {
  token: string
  hex: string
  usage: string
  muted?: boolean
}

/** A table row with color swatches for hex-based tokens */
export function HexSwatchRow({ token, hex, usage, muted }: HexSwatchRowProps) {
  const mutedHex = hex + '1a' // ~10% opacity
  return (
    <tr>
      <td className="px-3 py-2 font-mono text-sm">
        <code>{token}</code>
      </td>
      <td className="px-3 py-2">
        <span className="inline-flex items-center gap-2">
          <span
            className="w-6 h-6 rounded border border-black/10 inline-block shrink-0"
            style={{ backgroundColor: hex }}
          />
          <span className="font-mono text-xs text-muted-foreground">{hex}</span>
        </span>
      </td>
      {muted && (
        <td className="px-3 py-2">
          <span className="inline-flex items-center gap-2">
            <span
              className="w-6 h-6 rounded border border-black/10 inline-block shrink-0"
              style={{ backgroundColor: mutedHex }}
            />
            <span className="font-mono text-xs text-muted-foreground">10% opacity</span>
          </span>
        </td>
      )}
      <td className="px-3 py-2 text-sm text-muted-foreground">{usage}</td>
    </tr>
  )
}

interface ThemePreviewProps {
  name: string
  label: string
  headerBg: string
  sidebarBg: string
  accent: string
}

/** Renders a mini theme preview showing header + sidebar colors */
export function ThemePreview({ name, label, headerBg, sidebarBg, accent }: ThemePreviewProps) {
  return (
    <div className="inline-flex flex-col rounded-lg overflow-hidden border border-border shadow-sm w-40">
      {/* Header */}
      <div
        className="h-8 flex items-center px-3 gap-2"
        style={{ backgroundColor: headerBg }}
      >
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: accent }}
        />
        <span className="text-white text-xs font-medium truncate opacity-90">
          {label}
        </span>
      </div>
      {/* Body: sidebar + content */}
      <div className="flex h-16">
        <div
          className="w-8"
          style={{ backgroundColor: sidebarBg }}
        />
        <div className="flex-1 bg-background flex items-center justify-center">
          <span className="text-xs text-muted-foreground">{name}</span>
        </div>
      </div>
    </div>
  )
}
