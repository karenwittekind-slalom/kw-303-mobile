import { defineStore } from 'pinia'

type ThemeMode = 'Light' | 'Dark' | 'High Contrast'
type TextSize = 'Standard' | 'Large' | 'Extra Large'
type Density = 'Comfortable' | 'Compact'
type MotionPreference = 'Standard' | 'Reduced Motion'
type ActiveTab = 'Updates' | 'Patients' | 'Tasks' | 'My Profile'
type AppView = 'updates' | 'patients' | 'tasks' | 'profile' | 'patient'

const getStoredValue = <T extends string>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback
  const value = window.localStorage.getItem(key)
  return value === null ? fallback : (value as T)
}

export const usePatientStore = defineStore('patientStore', {
  state: () => ({
    selectedPatientId: 1 as number,
    theme: getStoredValue<ThemeMode>('wholeStory-theme', 'Light'),
    textSize: getStoredValue<TextSize>('wholeStory-text-size', 'Standard'),
    density: getStoredValue<Density>('wholeStory-density', 'Comfortable'),
    motion: getStoredValue<MotionPreference>('wholeStory-motion', 'Standard'),
    showIntro: true,
    activeTab: 'Updates' as ActiveTab,
    currentView: 'updates' as AppView,
    profileOpen: false
  }),
  actions: {
    selectPatient(id: number) {
      this.selectedPatientId = id
      this.currentView = 'patient'
    },
    setTheme(theme: ThemeMode) {
      this.theme = theme
      window.localStorage.setItem('wholeStory-theme', theme)
    },
    setTextSize(size: TextSize) {
      this.textSize = size
      window.localStorage.setItem('wholeStory-text-size', size)
    },
    setDensity(density: Density) {
      this.density = density
      window.localStorage.setItem('wholeStory-density', density)
    },
    setMotion(motion: MotionPreference) {
      this.motion = motion
      window.localStorage.setItem('wholeStory-motion', motion)
    },
    dismissIntro() {
      this.showIntro = false
    },
    setActiveTab(tab: ActiveTab) {
      this.activeTab = tab
      this.currentView = tab === 'My Profile' ? 'profile' : tab.toLowerCase() as AppView
    },
    setCurrentView(view: AppView) {
      this.currentView = view
    },
    toggleProfileOpen(open?: boolean) {
      this.profileOpen = open ?? !this.profileOpen
    }
  }
})
