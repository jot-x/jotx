import { jotxe } from '../src/index';
import example from '/examples/demo.md?raw';
import { type Instance, type Values } from '../types/jotx';

declare global {
  interface Window {
    jotxe: Instance;
    // theme helpers
    auto: () => void;
    dark: () => void;
    light: () => void;
  }
}

window.jotxe = jotxe(document.getElementById('app')!, {
  doc: example
});

window.jotxe.focus();

const toggleTheme = (theme: Values.Appearance) => {
  document.documentElement.classList.remove('auto', 'dark', 'light');
  document.documentElement.classList.add(theme);

  window.jotxe.reconfigure({ interface: { appearance: theme } });
};

window.auto = toggleTheme.bind(undefined, 'auto');
window.dark = toggleTheme.bind(undefined, 'dark');
window.light = toggleTheme.bind(undefined, 'light');
window.auto();
