/**
 * Shared styling constants for reusable UI elements across the portfolio.
 * These ensure consistent styling for commonly used patterns.
 */

/**
 * Icon button base class (Tailwind).
 * Used for social icons, theme toggle, and other icon-based buttons.
 */
export const ICON_BTN_CLASS =
  'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110';

/**
 * Icon button inline styles (CSS variables).
 * Applied alongside ICON_BTN_CLASS for themed colors and borders.
 */
export const ICON_BTN_STYLE: React.CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  color: 'var(--text-secondary)',
};
