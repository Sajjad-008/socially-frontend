import darkLogo from '@/assets/dark logo.png'
import lightLogo from '@/assets/light logo .png'
import { useThemeStore } from '@/store/themeStore'

export default function AuthBrandPanel() {
  const theme = useThemeStore((state) => state.theme)

  return (
    <div className="flex h-full items-center justify-center">
      <img
        src={theme === 'dark' ? darkLogo : lightLogo}
        alt="Socially logo"
        className="h-64 w-64 object-contain dark:mix-blend-lighten"
      />
    </div>
  )
}
