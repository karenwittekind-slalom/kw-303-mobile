<script setup lang="ts">
import { computed, ref } from 'vue'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { AriaComponent, GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import BrandLogo from './components/BrandLogo.vue'
import PatientAvatar from './components/PatientAvatar.vue'
import SeverityBadge from './components/SeverityBadge.vue'
import StatusBadge from './components/StatusBadge.vue'
import { patients } from './data/mockData'
import type { CareStatus } from './data/mockData'
import { usePatientStore } from './stores/patientStore'
import { getTimeOfDayGreeting } from './utils/timeOfDay'

use([LineChart, GridComponent, TooltipComponent, AriaComponent, CanvasRenderer])

const patientStore = usePatientStore()
const navItems = ['Updates', 'Patients', 'Tasks', 'My Profile'] as const
const patientSearch = ref('')
const patientFilter = ref<'All' | CareStatus>('All')
const patientFilters = ['All', 'Needs Review', 'Monitoring', 'Improving'] as const

const selectedPatient = computed(
  () => patients.find((patient) => patient.id === patientStore.selectedPatientId) ?? patients[0]
)

const selectedPatientFirstName = computed(() => selectedPatient.value.name.split(' ')[0])

const currentView = computed(() => patientStore.currentView)

const timeOfDay = computed(() => getTimeOfDayGreeting())

const filteredPatients = computed(() => {
  const query = patientSearch.value.trim().toLowerCase()
  return patients.filter((patient) => {
    const matchesFilter = patientFilter.value === 'All' || patient.status === patientFilter.value
    const matchesSearch = !query || [patient.name, patient.condition, patient.careContext, patient.status]
      .some((value) => value.toLowerCase().includes(query))
    return matchesFilter && matchesSearch
  })
})

const patientFilterCount = (filter: (typeof patientFilters)[number]) =>
  filter === 'All' ? patients.length : patients.filter((patient) => patient.status === filter).length

const statusToneClass = (status: CareStatus) => `tone-${status.toLowerCase().replaceAll(' ', '-')}`

const careTasks = computed(() => patients.flatMap((patient) => {
  const taskCount = patient.status === 'Needs Review' ? 2 : 1
  const dueBase = patient.status === 'Needs Review' ? 0 : patient.status === 'Monitoring' ? 4 : 8
  const dueSlots = [
    'Today, 9:30 AM',
    'Today, 11:00 AM',
    'Today, 1:30 PM',
    'Today, 3:00 PM',
    'Tomorrow, 9:00 AM',
    'Tomorrow, 1:00 PM',
    'Oct 2, 10:00 AM',
    'Oct 2, 2:30 PM',
    'Oct 3, 9:00 AM',
    'Oct 3, 11:30 AM',
    'Oct 4, 10:00 AM',
    'Oct 4, 2:00 PM'
  ]
  const ctaLabels: Record<string, string> = {
    contact: 'Message patient',
    followup: 'Schedule visit',
    note: 'Add note',
    route: 'Route issue'
  }

  return patient.actions.slice(0, taskCount).map((action, actionIndex) => {
    const dueOrder = dueBase + patient.id - 1 + actionIndex
    return {
      ...action,
      patientId: patient.id,
      patientName: patient.name,
      careContext: patient.careContext,
      priority: patient.status === 'Needs Review' ? 'Priority' : patient.status === 'Monitoring' ? 'Follow-up' : 'Routine',
      due: dueSlots[dueOrder],
      dueOrder,
      cta: ctaLabels[action.id]
    }
  })
}).sort((firstTask, secondTask) => firstTask.dueOrder - secondTask.dueOrder))

const trendMetrics = [
  { key: 'pain', label: 'Pain', higherIsBetter: false },
  { key: 'sleep', label: 'Sleep', higherIsBetter: true },
  { key: 'energy', label: 'Energy', higherIsBetter: true },
  { key: 'mobility', label: 'Mobility', higherIsBetter: true }
] as const

const chartDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const trendColors = computed(() => {
  if (patientStore.theme === 'High Contrast') {
    return { pain: '#ff8a8a', sleep: '#7dd3fc', energy: '#fde047', mobility: '#86efac' }
  }
  if (patientStore.theme === 'Dark') {
    return { pain: '#ff8585', sleep: '#74c7ec', energy: '#f3b562', mobility: '#7ed6ca' }
  }
  return { pain: '#c64949', sleep: '#397ca5', energy: '#b87318', mobility: '#188276' }
})

const trendSummary = computed(() => {
  const trends = selectedPatient.value.trends
  const first = trends[0]
  const latest = trends[trends.length - 1]

  return trendMetrics.map((metric) => {
    const change = latest[metric.key] - first[metric.key]
    const progress = metric.higherIsBetter ? change : -change
    const status = progress > 0 ? 'improving' : progress < 0 ? 'worsening' : 'stable'

    return {
      ...metric,
      color: trendColors.value[metric.key],
      current: latest[metric.key],
      change,
      status
    }
  })
})

const connectedSignals = computed(() => selectedPatient.value.keyInsights.map((observation, index) => ({
  number: String(index + 1).padStart(2, '0'),
  observation,
  watch: selectedPatient.value.currentConcerns[index] ?? selectedPatient.value.currentConcerns.at(-1) ?? ''
})))

const storySentiment = computed(() => {
  if (selectedPatient.value.status === 'Improving') {
    return { tone: 'positive', icon: 'mdi-check-circle-outline', label: 'Positive signal' }
  }
  return { tone: 'negative', icon: 'mdi-alert-circle-outline', label: 'Negative signal' }
})

const chartOptions = computed(() => {
  const isLight = patientStore.theme === 'Light'
  const isContrast = patientStore.theme === 'High Contrast'
  const textColor = isLight ? '#5b6f6e' : '#f8fafc'
  const gridColor = isContrast ? '#ffffff' : isLight ? '#dfe8e5' : '#34504f'
  const tooltipBackground = isContrast ? '#000000' : isLight ? '#102a2a' : '#f8fafc'
  const tooltipText = isContrast || isLight ? '#ffffff' : '#152d2d'

  return {
    animationDuration: patientStore.motion === 'Reduced Motion' ? 0 : 500,
    animationDurationUpdate: patientStore.motion === 'Reduced Motion' ? 0 : 300,
    aria: {
      enabled: true,
      decal: { show: isContrast },
      description: `Seven-day patient-reported pain, sleep, energy, and mobility scores for ${selectedPatient.value.name}. Scores range from zero to ten.`
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: tooltipBackground,
      borderColor: isContrast ? '#ffffff' : tooltipBackground,
      borderWidth: isContrast ? 1 : 0,
      padding: [10, 12],
      textStyle: { color: tooltipText, fontSize: 12 },
      axisPointer: {
        type: 'line',
        lineStyle: { color: isContrast ? '#ffffff' : '#8ca19e', width: 1, type: 'dashed' }
      },
      valueFormatter: (value: number | string) => `${value}/10`,
      extraCssText: 'border-radius:8px;box-shadow:0 10px 24px rgba(0,0,0,.16);'
    },
    grid: {
      left: 4,
      right: 8,
      top: 14,
      bottom: 4,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: chartDays,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: textColor, fontSize: 11, margin: 12 }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 10,
      interval: 5,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: textColor, fontSize: 11, margin: 10 },
      splitLine: {
        show: true,
        lineStyle: { color: gridColor, width: 1, type: isContrast ? 'solid' : 'dashed', opacity: isContrast ? 0.7 : 0.8 }
      }
    },
    series: trendMetrics.map((metric) => ({
      name: metric.label,
      type: 'line' as const,
      smooth: 0.28,
      showSymbol: false,
      symbol: 'circle',
      symbolSize: 8,
      data: selectedPatient.value.trends.map((point) => point[metric.key]),
      lineStyle: { width: 2.25, color: trendColors.value[metric.key], cap: 'round' },
      itemStyle: { color: trendColors.value[metric.key] },
      emphasis: {
        focus: 'series' as const,
        scale: true,
        lineStyle: { width: 3 }
      }
    }))
  }
})

const textSizeClass = computed(() => {
  if (patientStore.textSize === 'Large') return 'text-large'
  if (patientStore.textSize === 'Extra Large') return 'text-xl'
  return 'text-standard'
})

const densityClass = computed(() => {
  return patientStore.density === 'Compact' ? 'density-compact' : 'density-comfortable'
})

const motionClass = computed(() => {
  return patientStore.motion === 'Reduced Motion' ? 'motion-reduced' : 'motion-standard'
})

const themeClass = computed(() => {
  if (patientStore.theme === 'Dark') return 'theme-dark'
  if (patientStore.theme === 'High Contrast') return 'theme-contrast'
  return 'theme-light'
})

const themeOptions = ['Light', 'Dark', 'High Contrast'] as const
const sizeOptions = ['Standard', 'Large', 'Extra Large'] as const
const densityOptions = ['Comfortable', 'Compact'] as const
const motionOptions = ['Standard', 'Reduced Motion'] as const

const setTab = (tab: (typeof navItems)[number]) => {
  patientStore.setActiveTab(tab)
}
const enterExperience = () => patientStore.dismissIntro()
const openProfile = () => patientStore.toggleProfileOpen(true)
const closeProfile = () => patientStore.toggleProfileOpen(false)
const openPatient = (id: number) => {
  patientStore.selectPatient(id)
}
const goBackToQueue = () => {
  patientStore.setActiveTab(patientStore.activeTab)
}
</script>

<template>
  <v-app :class="['whole-story-app', themeClass]">
    <section v-if="patientStore.showIntro" :class="['intro-screen', motionClass, themeClass]" aria-labelledby="intro-title">
      <div class="intro-story-scene" aria-hidden="true">
        <div class="intro-story-header">
          <span>Patient story • Updated 2h ago</span>
          <StatusBadge :status="selectedPatient.status" />
        </div>
        <div class="intro-patient-line">
          <strong>{{ selectedPatient.name }}</strong>
          <span>{{ selectedPatient.age }} years • {{ selectedPatient.condition }}</span>
        </div>
        <blockquote>
          <span>In the patient’s words</span>
          {{ selectedPatient.patientVoice }}
        </blockquote>

        <div class="intro-summary-preview">
          <span class="intro-preview-label">Latest summary</span>
          <p>{{ selectedPatient.summary }}</p>
          <div class="intro-next-action">
            <span>Next best action</span>
            <strong>{{ selectedPatient.nextAction }}</strong>
          </div>
        </div>

        <div class="intro-preview-heading">Seven-day signals</div>
        <div class="intro-signal-list">
          <div v-for="metric in trendSummary" :key="metric.key">
            <span class="trend-swatch" :style="{ backgroundColor: metric.color }"></span>
            <span>{{ metric.label }}</span>
            <strong>{{ metric.current }}/10</strong>
            <small>{{ metric.status }}</small>
          </div>
        </div>

        <div class="intro-preview-heading">Source trail</div>
        <div class="intro-source-list">
          <div v-for="event in selectedPatient.timeline.slice(0, 3)" :key="event.id">
            <span :class="['intro-source-dot', `type-${event.type}`]"></span>
            <span>{{ event.title }}</span>
            <small>{{ event.time }}</small>
          </div>
        </div>
      </div>

      <div class="intro-content">
        <div class="intro-brand-mark" aria-hidden="true"><BrandLogo /></div>
        <p class="intro-eyebrow">A connected care experience</p>
        <h1 id="intro-title">WholeStory Health</h1>
        <p class="intro-tagline">See the whole person. Understand the whole story.</p>
        <p class="intro-summary">Patient voice, clinical evidence, and care history come together in one clear narrative, helping care teams move from change to context to action.</p>

        <div class="intro-story-arc" aria-label="Experience overview">
          <span><strong>01</strong>What changed</span>
          <span><strong>02</strong>Why it matters</span>
          <span><strong>03</strong>What happens next</span>
        </div>

        <button type="button" class="intro-continue" @click="enterExperience">
          <span>Care team demo</span>
          <v-icon icon="mdi-arrow-right" />
        </button>

        <p class="intro-disclaimer">Demo experience • All patient information is fictional and not for clinical use.</p>
      </div>
    </section>

    <div v-else :class="['mobile-shell', textSizeClass, densityClass, motionClass, themeClass]">
        <header class="topbar">
          <div class="app-title-lockup">
            <span class="brand-mark" aria-hidden="true"><BrandLogo /></span>
            <div>
              <p class="app-name">WholeStory Health</p>
              <h1>
                {{ currentView === 'patient' ? selectedPatient.name : currentView === 'profile' ? 'My Profile' : patientStore.activeTab }}
              </h1>
            </div>
          </div>
          <v-btn variant="text" class="accessibility-toggle" aria-label="Open accessibility settings" @click="openProfile">
            <v-icon icon="mdi-cog-outline" />
          </v-btn>
        </header>

        <main class="content">
          <section v-if="currentView === 'profile'" class="workspace-page profile-panel" aria-label="My Profile">
            <div class="profile-identity">
              <div class="profile-avatar" aria-hidden="true">AM</div>
              <div>
                <p class="eyebrow">Care team workspace</p>
                <h2>Alex Morgan</h2>
                <p>Care coordinator • WholeStory Health</p>
              </div>
            </div>

            <div class="profile-workload" aria-label="Current workload">
              <div><strong>{{ patients.filter((patient) => patient.status === 'Needs Review').length }}</strong><span>Need review</span></div>
              <div><strong>{{ careTasks.length }}</strong><span>Open tasks</span></div>
              <div><strong>{{ patients.length }}</strong><span>Patients</span></div>
            </div>

            <div class="section-heading">
              <div>
                <p class="eyebrow">My Profile</p>
                <h2>Accessibility settings</h2>
              </div>
            </div>

            <div class="settings-list">
              <div class="setting-row">
                <label>Theme</label>
                <div class="choice-pills">
                  <button v-for="option in themeOptions" :key="option" type="button" :class="['choice-pill', { active: patientStore.theme === option }]" @click="patientStore.setTheme(option)">
                    {{ option }}
                  </button>
                </div>
              </div>

              <div class="setting-row">
                <label>Text size</label>
                <div class="choice-pills">
                  <button v-for="option in sizeOptions" :key="option" type="button" :class="['choice-pill', { active: patientStore.textSize === option }]" @click="patientStore.setTextSize(option)">
                    {{ option }}
                  </button>
                </div>
              </div>

              <div class="setting-row">
                <label>Display density</label>
                <div class="choice-pills">
                  <button v-for="option in densityOptions" :key="option" type="button" :class="['choice-pill', { active: patientStore.density === option }]" @click="patientStore.setDensity(option)">
                    {{ option }}
                  </button>
                </div>
              </div>

              <div class="setting-row">
                <label>Motion</label>
                <div class="choice-pills">
                  <button v-for="option in motionOptions" :key="option" type="button" :class="['choice-pill', { active: patientStore.motion === option }]" @click="patientStore.setMotion(option)">
                    {{ option }}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section v-else-if="currentView === 'patient'" :class="['patient-detail-screen', statusToneClass(selectedPatient.status)]" aria-label="Patient details">
            <div class="detail-header">
              <button type="button" class="back-button" @click="goBackToQueue">
                <v-icon icon="mdi-arrow-left" />
                <span>Back</span>
              </button>
            </div>

            <section class="patient-story-sheet" aria-labelledby="patient-story-title">
              <header class="patient-story-masthead">
                <span>Patient story • Updated {{ selectedPatient.lastUpdate }}</span>
                <StatusBadge :status="selectedPatient.status" />
              </header>

              <div class="patient-story-identity">
                <h2 id="patient-story-title">{{ selectedPatient.name }}</h2>
                <div class="patient-context">
                  <span>{{ selectedPatient.age }} years</span>
                  <span>{{ selectedPatient.condition }}</span>
                  <span>{{ selectedPatient.careContext }}</span>
                </div>
              </div>

              <blockquote class="patient-voice">
                <span>In the patient’s words</span>
                {{ selectedPatient.patientVoice }}
              </blockquote>

              <section class="story-summary" aria-labelledby="story-summary-title">
                <p id="story-summary-title" class="eyebrow">Latest summary</p>
                <p class="story-summary-lead">{{ selectedPatient.summary }}</p>

                <div class="summary-data-points" aria-label="Current seven-day signal summary">
                  <div v-for="metric in trendSummary" :key="metric.key" class="summary-data-point">
                    <span class="summary-data-label">
                      <span class="trend-swatch" :style="{ backgroundColor: metric.color }"></span>
                      {{ metric.label }}
                    </span>
                    <span class="summary-data-value"><strong>{{ metric.current }}</strong><small>/10</small></span>
                    <small>Score {{ metric.change > 0 ? '+' : '' }}{{ metric.change }} vs day 1</small>
                  </div>
                </div>

                <div class="story-summary-focus">
                  <div>
                    <span>Next best action</span>
                    <strong>{{ selectedPatient.nextAction }}</strong>
                  </div>
                </div>
              </section>

              <section class="summary-signals" aria-labelledby="signals-title">
                <div class="summary-section-heading">
                  <p class="eyebrow">At a glance</p>
                  <h2 id="signals-title">Key story points</h2>
                </div>

                <div class="story-connections">
                  <article v-for="signal in connectedSignals" :key="signal.number" class="story-connection">
                    <div class="signal-observation">
                      <span class="signal-number">{{ signal.number }}</span>
                      <div>
                        <span class="signal-label">Observation</span>
                        <p>{{ signal.observation }}</p>
                      </div>
                    </div>

                    <span :class="['signal-sentiment', `sentiment-${storySentiment.tone}`]" role="img" :aria-label="storySentiment.label">
                      <v-icon :icon="storySentiment.icon" size="small" aria-hidden="true" />
                    </span>

                    <div class="signal-watch">
                      <p>{{ signal.watch }}</p>
                    </div>
                  </article>
                </div>
              </section>

              <section class="trends-panel" aria-label="Patient trend visualization">
                <div class="section-heading compact">
                  <div>
                    <p class="eyebrow">Supporting evidence</p>
                    <h2>Seven-day signals</h2>
                  </div>
                </div>

                <div class="trend-summary-grid" aria-label="Seven-day health trend summary">
                  <article v-for="metric in trendSummary" :key="metric.key" :class="['trend-summary-card', `trend-${metric.status}`]">
                    <div class="trend-summary-heading">
                      <span class="trend-swatch" :style="{ backgroundColor: metric.color }"></span>
                      <span>{{ metric.label }}</span>
                    </div>
                    <div class="trend-current">
                      <strong>{{ metric.current }}</strong>
                      <span>/ 10</span>
                    </div>
                    <small>Score {{ metric.change > 0 ? '+' : '' }}{{ metric.change }} vs day 1</small>
                  </article>
                </div>

                <div class="chart-card">
                  <div class="chart-caption">
                    <span>Patient-reported score</span>
                    <span>0–10</span>
                  </div>
                  <VChart class="patient-trend-chart" :option="chartOptions" autoresize role="img" aria-label="Seven-day patient-reported health trend chart" />
                </div>
              </section>

              <section class="timeline-panel" aria-label="Unified patient timeline">
                <div class="section-heading compact">
                  <div>
                    <p class="eyebrow">Source trail</p>
                    <h2>{{ selectedPatientFirstName }}'s Whole Story</h2>
                  </div>
                </div>

                <div class="timeline-list">
                  <article v-for="event in selectedPatient.timeline" :key="event.id" class="timeline-item">
                    <div class="timeline-bullet" :class="`type-${event.type}`"></div>
                    <div class="timeline-content">
                      <div class="timeline-header">
                        <span>{{ event.time }}</span>
                        <SeverityBadge :severity="event.severity" />
                      </div>
                      <h3>{{ event.title }}</h3>
                      <p>{{ event.summary }}</p>
                      <small>{{ event.detail }}</small>
                    </div>
                  </article>
                </div>

                <div class="story-log-cta">
                  <span>View patient story log</span>
                  <v-icon icon="mdi-arrow-right" size="small" />
                </div>
              </section>
            </section>

            <section class="action-panel" aria-label="Care team action workflow">
              <div class="section-heading compact">
                <div>
                  <p class="eyebrow">Care team</p>
                  <h2>Continue from this summary</h2>
                </div>
              </div>

              <div class="action-list">
                <button v-for="action in selectedPatient.actions" :key="action.id" class="action-button" type="button">
                  <span>{{ action.label }}</span>
                  <small>{{ action.detail }}</small>
                </button>
              </div>
            </section>
          </section>

          <section v-else-if="currentView === 'patients'" class="workspace-page" aria-label="Patient directory">
            <div class="directory-tools">
              <label class="search-control">
                <v-icon icon="mdi-magnify" />
                <input v-model="patientSearch" type="search" placeholder="Search patients" aria-label="Search patients" />
                <button v-if="patientSearch" type="button" class="clear-search" aria-label="Clear patient search" @click="patientSearch = ''">
                  <v-icon icon="mdi-close-circle" size="small" />
                </button>
              </label>

              <div class="filter-tabs" role="group" aria-label="Filter patients by status">
                <button
                  v-for="filter in patientFilters"
                  :key="filter"
                  type="button"
                  :class="['filter-tab', { active: patientFilter === filter }]"
                  :aria-pressed="patientFilter === filter"
                  @click="patientFilter = filter"
                >
                  <span>{{ filter }}</span>
                  <strong>{{ patientFilterCount(filter) }}</strong>
                </button>
              </div>
            </div>

            <div class="patient-list-shell">
              <div class="patient-list-header" aria-hidden="true">
                <span>Patient</span>
                <span>Care context</span>
                <span>Status</span>
                <span>Updated</span>
                <span></span>
              </div>

              <div class="directory-list">
              <button v-for="patient in filteredPatients" :key="patient.id" type="button" :class="['directory-row', statusToneClass(patient.status)]" @click="openPatient(patient.id)">
                <PatientAvatar :name="patient.name" />
                <span class="directory-patient">
                  <strong>{{ patient.name }}</strong>
                  <small>{{ patient.age }} years • {{ patient.condition }}</small>
                </span>
                <span class="directory-context">
                  <small>Care context</small>
                  <span>{{ patient.careContext }}</span>
                </span>
                <StatusBadge :status="patient.status" />
                <span class="directory-updated">{{ patient.lastUpdate }}</span>
                <v-icon icon="mdi-chevron-right" class="row-chevron" />
              </button>
              </div>
            </div>

            <p v-if="filteredPatients.length === 0" class="empty-state">No patients match that search.</p>
          </section>

          <section v-else-if="currentView === 'tasks'" class="workspace-page" aria-label="Care team tasks">
            <div class="task-summary">
              <div><span class="priority-dot critical"></span><strong>{{ careTasks.filter((task) => task.priority === 'Priority').length }}</strong><span>Priority</span></div>
              <div><span class="priority-dot follow-up"></span><strong>{{ careTasks.filter((task) => task.priority === 'Follow-up').length }}</strong><span>Follow-up</span></div>
              <div><span class="priority-dot routine"></span><strong>{{ careTasks.filter((task) => task.priority === 'Routine').length }}</strong><span>Routine</span></div>
            </div>

            <div class="task-list">
              <button v-for="task in careTasks" :key="`${task.patientId}-${task.id}`" type="button" :class="['task-row', `tone-${task.priority.toLowerCase()}`]" @click="openPatient(task.patientId)">
                <v-icon icon="mdi-checkbox-blank-circle-outline" class="task-check" />
                <span class="task-copy">
                  <span class="task-patient">{{ task.patientName }} • {{ task.careContext }}</span>
                  <strong>{{ task.label }}</strong>
                  <small>{{ task.detail }}</small>
                  <span class="task-meta">
                    <span class="task-due"><v-icon icon="mdi-clock-outline" size="x-small" />{{ task.due }}</span>
                    <span :class="['task-priority-label', `task-${task.priority.toLowerCase()}`]">{{ task.priority }}</span>
                  </span>
                </span>
                <span class="task-cta">{{ task.cta }}<v-icon icon="mdi-arrow-right" size="small" /></span>
              </button>
            </div>
          </section>

          <template v-else>
            <section class="updates-greeting" aria-label="Welcome">
              <div>
                <h2>{{ timeOfDay }}, Alex.</h2>
                <p>Here’s what changed across your patient stories.</p>
              </div>
            </section>

            <section class="queue-panel" aria-label="Patient queue">
              <div class="section-heading">
                <div>
                  <p class="eyebrow">Updates</p>
                  <h2>Patient queue</h2>
                </div>
                <span class="review-chip">{{ patients.length }} pending</span>
              </div>

              <div class="queue-list" role="list" aria-label="Patients to review">
                <button
                  v-for="patient in patients"
                  :key="patient.id"
                  :class="['patient-card', statusToneClass(patient.status)]"
                  type="button"
                  @click="openPatient(patient.id)"
                >
                  <div class="patient-card-top">
                    <div>
                      <h3>{{ patient.name }}</h3>
                      <p>{{ patient.careContext }}</p>
                      <p>{{ patient.age }} years • {{ patient.condition }}</p>
                    </div>
                    <StatusBadge :status="patient.status" />
                  </div>
                  <p class="change-summary">{{ patient.changeSummary }}</p>
                  <div class="patient-meta">
                    <span>{{ patient.lastUpdate }}</span>
                  </div>
                </button>
              </div>
            </section>
          </template>

          <footer class="demo-banner global-disclaimer" aria-label="Disclaimer">
            <v-icon icon="mdi-shield-check-outline" class="disclaimer-icon" />
            <span>All patient information is fictional and not for clinical use.</span>
          </footer>
        </main>

        <nav class="bottom-nav" aria-label="Bottom navigation">
          <button v-for="item in navItems" :key="item" :class="['nav-item', { active: patientStore.activeTab === item } ]" type="button" @click="setTab(item)">
            <v-icon :icon="item === 'Updates' ? 'mdi-bell-ring-outline' : item === 'Patients' ? 'mdi-account-multiple-outline' : item === 'Tasks' ? 'mdi-check-circle-outline' : 'mdi-account-circle-outline'" />
            <span>{{ item }}</span>
          </button>
        </nav>

      <div v-if="patientStore.profileOpen" class="profile-sheet-backdrop" @click="closeProfile">
        <div class="profile-sheet" @click.stop>
          <div class="sheet-header">
            <h3>Accessibility preferences</h3>
            <button type="button" class="close-button" @click="closeProfile">Close</button>
          </div>

          <div class="settings-list compact">
            <div class="setting-row">
              <label>Theme</label>
              <div class="choice-pills">
                <button v-for="option in themeOptions" :key="option" type="button" :class="['choice-pill', { active: patientStore.theme === option }]" @click="patientStore.setTheme(option)">
                  {{ option }}
                </button>
              </div>
            </div>

            <div class="setting-row">
              <label>Text size</label>
              <div class="choice-pills">
                <button v-for="option in sizeOptions" :key="option" type="button" :class="['choice-pill', { active: patientStore.textSize === option }]" @click="patientStore.setTextSize(option)">
                  {{ option }}
                </button>
              </div>
            </div>

            <div class="setting-row">
              <label>Density</label>
              <div class="choice-pills">
                <button v-for="option in densityOptions" :key="option" type="button" :class="['choice-pill', { active: patientStore.density === option }]" @click="patientStore.setDensity(option)">
                  {{ option }}
                </button>
              </div>
            </div>

            <div class="setting-row">
              <label>Motion</label>
              <div class="choice-pills">
                <button v-for="option in motionOptions" :key="option" type="button" :class="['choice-pill', { active: patientStore.motion === option }]" @click="patientStore.setMotion(option)">
                  {{ option }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>
