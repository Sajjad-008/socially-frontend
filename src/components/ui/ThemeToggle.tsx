import { MoonIcon, SunIcon } from '@/components/icons'
import IconButton from '@/components/ui/IconButton'
import { useThemeStore } from '@/store/themeStore'

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  return (
    <IconButton
      variant="theme"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      icon={theme === 'dark' ? <MoonIcon /> : <SunIcon />}
    />
  )
}

export default ThemeToggle
