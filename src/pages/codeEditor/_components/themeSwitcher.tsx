import { MoonIcon } from 'icons/moon'
import { SunIcon } from 'icons/sun'

interface Props {
  isDark: boolean
  onToggle: () => void
}

const ThemeSwitcher = ({ isDark, onToggle }: Props) => {
  return (
    <div
      onClick={onToggle}
      className="group relative h-8 w-16 cursor-pointer rounded-full border border-neutral-200 bg-white px-1 py-0.5"
    >
      <div
        className={`${
          isDark ? 'translate-x-8' : '-translate-x-0.5'
        } h-6 w-6 transform rounded-full bg-neutral-100 shadow-md transition-transform`}
      />
      <div
        className={`absolute left-1.5 top-1.5 h-6 w-6 transition-colors duration-300 group-hover:text-neutral-950 ${
          isDark ? 'text-neutral-500' : 'text-neutral-950'
        }`}
      >
        <SunIcon />
      </div>
      <div
        className={`absolute -right-1 top-1.5 h-6 w-6 transition-colors duration-300 group-hover:text-neutral-950 ${
          isDark ? 'text-neutral-950' : 'text-neutral-500'
        }`}
      >
        <MoonIcon />
      </div>
    </div>
  )
}

export default ThemeSwitcher
