/**
 * Theme constants shared by the server layout (inline script) and the
 * client ThemeProvider. Kept in a plain module so the server can import
 * the script string without pulling in client code.
 */
export const THEME_STORAGE_KEY = 'theme';

/**
 * Runs before first paint. Applies the stored theme, or the system
 * preference, so there is no flash of the wrong theme.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=(s==='light'||s==='dark')?s:(d?'dark':'light');var r=document.documentElement;r.setAttribute('data-theme',t);r.style.colorScheme=t;}catch(e){}})();`;
