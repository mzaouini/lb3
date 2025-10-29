type Theme = 'light' | 'dark';

class ThemeStore {
  private theme: Theme;
  private listeners: Set<(theme: Theme) => void> = new Set();

  constructor() {
    // Load from localStorage or default to light
    const saved = localStorage.getItem('theme') as Theme;
    this.theme = saved || 'light';
    this.applyTheme();
  }

  getTheme(): Theme {
    return this.theme;
  }

  setTheme(theme: Theme) {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme();
    this.notifyListeners();
  }

  toggleTheme() {
    this.setTheme(this.theme === 'light' ? 'dark' : 'light');
  }

  subscribe(listener: (theme: Theme) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private applyTheme() {
    if (this.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.theme));
  }
}

export const themeStore = new ThemeStore();
