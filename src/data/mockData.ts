export type CareStatus = 'Needs Review' | 'Monitoring' | 'Improving'

export type TrendPoint = {
  day: string
  pain: number
  sleep: number
  energy: number
  mobility: number
}

export type TimelineEvent = {
  id: number
  type: 'checkin' | 'lab' | 'visit' | 'note' | 'medication' | 'action'
  time: string
  title: string
  summary: string
  detail: string
  severity: 'low' | 'medium' | 'high'
}

export type Patient = {
  id: number
  name: string
  age: number
  condition: string
  careContext: string
  status: CareStatus
  changeSummary: string
  lastUpdate: string
  summary: string
  patientVoice: string
  currentConcerns: string[]
  keyInsights: string[]
  nextAction: string
  trends: TrendPoint[]
  labs: Array<{
    label: string
    value: string
    status: 'normal' | 'warn' | 'critical'
  }>
  timeline: TimelineEvent[]
  actions: Array<{
    id: string
    label: string
    detail: string
  }>
}

export const patients: Patient[] = [
  {
    id: 1,
    name: 'Maya Thompson',
    age: 38,
    condition: 'Post-op recovery',
    careContext: 'Orthopedic follow-up',
    status: 'Needs Review',
    changeSummary: 'Pain 3 → 6, swelling worsening',
    lastUpdate: '2h ago',
    summary: 'Recovery is regressing after missed PT sessions and rising pain points.',
    patientVoice: '“It’s much harder to walk today, and the swelling is keeping me up at night.”',
    currentConcerns: ['Pain increasing after surgery', 'Swelling and nighttime discomfort', 'Reduced mobility'],
    keyInsights: ['Pain escalated 3 → 6 in 7 days', 'Symptoms now conflict with previous recovery trend', 'Patient report is more severe than a normal post-op plateau'],
    nextAction: 'Schedule same-week check-in and confirm activity plan',
    trends: [
      { day: 'M', pain: 2, sleep: 7, energy: 8, mobility: 7 },
      { day: 'T', pain: 3, sleep: 6, energy: 7, mobility: 6 },
      { day: 'W', pain: 4, sleep: 5, energy: 7, mobility: 6 },
      { day: 'T', pain: 5, sleep: 5, energy: 6, mobility: 5 },
      { day: 'F', pain: 5, sleep: 4, energy: 5, mobility: 4 },
      { day: 'S', pain: 6, sleep: 4, energy: 5, mobility: 4 },
      { day: 'S', pain: 6, sleep: 3, energy: 4, mobility: 3 }
    ],
    labs: [
      { label: 'Inflammation marker', value: '9.8 mg/L', status: 'warn' },
      { label: 'Hemoglobin', value: '12.4 g/dL', status: 'normal' },
      { label: 'White cells', value: '10.9 K/uL', status: 'warn' }
    ],
    timeline: [
      { id: 1, type: 'checkin', time: 'Today • 8:12 AM', title: 'Symptom check-in', summary: 'Pain ratings increased from 3 to 6.', detail: 'Patient reports more stiffness and limited walking tolerance.', severity: 'high' },
      { id: 2, type: 'lab', time: 'Yesterday • 4:42 PM', title: 'Inflammation lab result', summary: 'Marker elevated above recent baseline.', detail: 'Likely attributable to worsening swelling after reduced PT attendance.', severity: 'medium' },
      { id: 3, type: 'note', time: 'Mon • 2:15 PM', title: 'Clinician note', summary: 'Follow-up plan discussed with patient.', detail: 'Missed PT sessions noted as likely contributing factor.', severity: 'medium' },
      { id: 4, type: 'action', time: 'Sun • 10:00 AM', title: 'Care team action', summary: 'Message sent to patient about recovery activity pacing.', detail: 'Pending review of response and scheduling.', severity: 'low' }
    ],
    actions: [
      { id: 'contact', label: 'Contact patient', detail: 'Review worsening pain and mobility concerns.' },
      { id: 'followup', label: 'Schedule follow-up', detail: 'Close review within 48 hours.' },
      { id: 'note', label: 'Add note', detail: 'Document missed PT and symptom rise.' },
      { id: 'route', label: 'Route for review', detail: 'Escalate to physical therapy and care team.' }
    ]
  },
  {
    id: 2,
    name: 'Jordan Lee',
    age: 56,
    condition: 'Medication side effects',
    careContext: 'Rheumatology',
    status: 'Monitoring',
    changeSummary: 'GI symptoms after new medication',
    lastUpdate: '1d ago',
    summary: 'Symptoms are emerging after a recent medication change, but objective markers remain mostly stable.',
    patientVoice: '“The stomach pain started three days after the new prescription, and it keeps getting worse.”',
    currentConcerns: ['Nausea and abdominal discomfort', 'Lower appetite', 'GI symptoms after medication adjustment'],
    keyInsights: ['New side effect pattern appeared after medication update', 'Patient-reported burden is higher than lab data suggests', 'Symptoms are affecting quality of life despite stable vitals'],
    nextAction: 'Review medication timing and route to provider for tolerance assessment',
    trends: [
      { day: 'M', pain: 1, sleep: 7, energy: 8, mobility: 8 },
      { day: 'T', pain: 2, sleep: 7, energy: 7, mobility: 8 },
      { day: 'W', pain: 3, sleep: 6, energy: 7, mobility: 7 },
      { day: 'T', pain: 4, sleep: 5, energy: 6, mobility: 7 },
      { day: 'F', pain: 5, sleep: 4, energy: 5, mobility: 6 },
      { day: 'S', pain: 5, sleep: 4, energy: 5, mobility: 5 },
      { day: 'S', pain: 6, sleep: 3, energy: 4, mobility: 5 }
    ],
    labs: [
      { label: 'Creatinine', value: '0.92 mg/dL', status: 'normal' },
      { label: 'AST', value: '31 U/L', status: 'warn' },
      { label: 'ALT', value: '34 U/L', status: 'warn' }
    ],
    timeline: [
      { id: 1, type: 'medication', time: 'Today • 7:10 AM', title: 'Medication change logged', summary: 'New prescription started 5 days ago.', detail: 'GI side effect timing aligns with the medication update.', severity: 'high' },
      { id: 2, type: 'checkin', time: 'Yesterday • 8:30 AM', title: 'Patient symptom report', summary: 'Nausea and appetite decline reported.', detail: 'Patient notes symptoms started after morning dose.', severity: 'high' },
      { id: 3, type: 'lab', time: 'Tue • 11:45 AM', title: 'Routine labs review', summary: 'Values mostly stable but AST/ALT slightly elevated.', detail: 'No acute concern, but trend remains relevant.', severity: 'medium' },
      { id: 4, type: 'action', time: 'Mon • 1:00 PM', title: 'Care team follow-up', summary: 'Message issued to confirm symptom timing.', detail: 'Awaiting patient response.', severity: 'low' }
    ],
    actions: [
      { id: 'contact', label: 'Contact patient', detail: 'Confirm symptom timing and current med adherence.' },
      { id: 'followup', label: 'Schedule follow-up', detail: 'Review tolerance and med plan.' },
      { id: 'note', label: 'Add note', detail: 'Document suspected GI side effect profile.' },
      { id: 'route', label: 'Route for review', detail: 'Escalate to prescriber for med review.' }
    ]
  },
  {
    id: 3,
    name: 'Alicia Gomez',
    age: 62,
    condition: 'Stable chronic care',
    careContext: 'Cardiometabolic program',
    status: 'Improving',
    changeSummary: 'Symptoms stable with consistent adherence',
    lastUpdate: '3h ago',
    summary: 'Condition remains stable, and patient-reported measures are trending upward in confidence.',
    patientVoice: '“I feel more steady this week, and I’ve been able to keep up with my routine.”',
    currentConcerns: ['Sustained symptom stability', 'Improved routine adherence', 'Low immediate care need'],
    keyInsights: ['Pain and sleep are trending steady', 'Patient reports improved energy over previous month', 'No urgent action needed right now'],
    nextAction: 'Maintain current care plan and continue monthly review',
    trends: [
      { day: 'M', pain: 3, sleep: 6, energy: 6, mobility: 7 },
      { day: 'T', pain: 3, sleep: 6, energy: 6, mobility: 7 },
      { day: 'W', pain: 2, sleep: 7, energy: 7, mobility: 7 },
      { day: 'T', pain: 2, sleep: 7, energy: 7, mobility: 8 },
      { day: 'F', pain: 2, sleep: 7, energy: 8, mobility: 8 },
      { day: 'S', pain: 1, sleep: 8, energy: 8, mobility: 8 },
      { day: 'S', pain: 1, sleep: 8, energy: 9, mobility: 9 }
    ],
    labs: [
      { label: 'A1C', value: '6.7%', status: 'normal' },
      { label: 'BP', value: '128/78', status: 'normal' },
      { label: 'BMI', value: '28.4', status: 'normal' }
    ],
    timeline: [
      { id: 1, type: 'checkin', time: 'Today • 9:38 AM', title: 'Stable check-in', summary: 'Patient reports steady routines and fewer disruptions.', detail: 'No red flags noted during review.', severity: 'low' },
      { id: 2, type: 'visit', time: 'Thu • 2:00 PM', title: 'Follow-up visit', summary: 'Routine review completed.', detail: 'Medication adherence remains consistent and patient goal progress continues.', severity: 'low' },
      { id: 3, type: 'lab', time: 'Wed • 11:20 AM', title: 'Routine lab review', summary: 'Elevations remain within expected range.', detail: 'No intervention needed based on current trajectory.', severity: 'low' },
      { id: 4, type: 'action', time: 'Mon • 9:15 AM', title: 'Care plan update', summary: 'Goal progress logged in patient record.', detail: 'No escalation required.', severity: 'low' }
    ],
    actions: [
      { id: 'contact', label: 'Contact patient', detail: 'Reinforce current routine and adherence goals.' },
      { id: 'followup', label: 'Schedule follow-up', detail: 'Continue standard monthly touchpoint.' },
      { id: 'note', label: 'Add note', detail: 'Document steady improvement and ongoing goals.' },
      { id: 'route', label: 'Route for review', detail: 'Keep on routine monitoring queue.' }
    ]
  },
  {
    id: 4,
    name: 'Daniel Brooks',
    age: 44,
    condition: 'Improving recovery',
    careContext: 'Post-surgical rehab',
    status: 'Improving',
    changeSummary: 'Mobility and sleep improving week over week',
    lastUpdate: '5h ago',
    summary: 'Patient is showing steady gains in mobility and sleep with reduced pain after physical therapy.',
    patientVoice: '“I’m moving more confidently now, and I’m finally sleeping better.”',
    currentConcerns: ['Pain decreasing', 'Sleep quality improving', 'Mobility gains continuing'],
    keyInsights: ['Recovery trend is positive after last intervention', 'Pain is down while sleep and mobility rebound', 'Patient is engaging more consistently with care plan'],
    nextAction: 'Continue current recovery plan and schedule next PT milestone',
    trends: [
      { day: 'M', pain: 6, sleep: 4, energy: 5, mobility: 4 },
      { day: 'T', pain: 5, sleep: 5, energy: 5, mobility: 5 },
      { day: 'W', pain: 4, sleep: 5, energy: 6, mobility: 5 },
      { day: 'T', pain: 4, sleep: 6, energy: 6, mobility: 6 },
      { day: 'F', pain: 3, sleep: 6, energy: 7, mobility: 6 },
      { day: 'S', pain: 2, sleep: 7, energy: 7, mobility: 7 },
      { day: 'S', pain: 2, sleep: 8, energy: 8, mobility: 8 }
    ],
    labs: [
      { label: 'Inflammation marker', value: '6.2 mg/L', status: 'normal' },
      { label: 'Hemoglobin', value: '13.1 g/dL', status: 'normal' },
      { label: 'Mobility goal', value: '92% complete', status: 'normal' }
    ],
    timeline: [
      { id: 1, type: 'checkin', time: 'Today • 6:40 AM', title: 'Recovery update', summary: 'Sleep and movement scores improved this week.', detail: 'Patient notes less discomfort during rehabilitation exercises.', severity: 'low' },
      { id: 2, type: 'visit', time: 'Thu • 3:30 PM', title: 'Physical therapy progress review', summary: 'Mobility target advancing as expected.', detail: 'Therapy plan remains on track without new concerns.', severity: 'low' },
      { id: 3, type: 'note', time: 'Tue • 10:15 AM', title: 'Clinician note', summary: 'Positive response to current recovery plan.', detail: 'No change to regimen needed at this time.', severity: 'low' },
      { id: 4, type: 'action', time: 'Mon • 11:00 AM', title: 'Follow-up scheduled', summary: 'Milestone check-in added to calendar.', detail: 'Routine monitoring continues.', severity: 'low' }
    ],
    actions: [
      { id: 'contact', label: 'Contact patient', detail: 'Celebrate progress and reinforce routine.' },
      { id: 'followup', label: 'Schedule follow-up', detail: 'Set PT milestone review.' },
      { id: 'note', label: 'Add note', detail: 'Document improved mobility and sleep trend.' },
      { id: 'route', label: 'Route for review', detail: 'Keep in routine care pathway.' }
    ]
  },
  {
    id: 5,
    name: 'Priya Patel',
    age: 51,
    condition: 'Silent risk review',
    careContext: 'Preventive care',
    status: 'Needs Review',
    changeSummary: 'Abnormal labs without symptom escalation',
    lastUpdate: '6h ago',
    summary: 'Lab values are trending in a concerning direction while the patient remains largely asymptomatic.',
    patientVoice: '“I feel okay, but I’m concerned because my numbers changed even though I don’t feel different.”',
    currentConcerns: ['Elevated markers without obvious symptoms', 'Need for timely review despite stable voice', 'Potential silent risk pattern'],
    keyInsights: ['Lab changes are more concerning than patient-reported symptoms', 'No clear symptom burden but objective data suggest action', 'This is a hidden risk pattern requiring provider review'],
    nextAction: 'Escalate to clinician for non-urgent review and confirm screening plan',
    trends: [
      { day: 'M', pain: 1, sleep: 8, energy: 7, mobility: 8 },
      { day: 'T', pain: 1, sleep: 8, energy: 7, mobility: 8 },
      { day: 'W', pain: 1, sleep: 7, energy: 7, mobility: 8 },
      { day: 'T', pain: 2, sleep: 7, energy: 7, mobility: 8 },
      { day: 'F', pain: 2, sleep: 7, energy: 6, mobility: 7 },
      { day: 'S', pain: 2, sleep: 6, energy: 6, mobility: 7 },
      { day: 'S', pain: 2, sleep: 6, energy: 6, mobility: 7 }
    ],
    labs: [
      { label: 'A1C', value: '8.4%', status: 'critical' },
      { label: 'LDL', value: '144 mg/dL', status: 'warn' },
      { label: 'Albumin', value: '3.8 g/dL', status: 'warn' }
    ],
    timeline: [
      { id: 1, type: 'lab', time: 'Today • 8:20 AM', title: 'Lab review triggered', summary: 'Abnormal markers have changed meaningfully from prior values.', detail: 'Clinical review recommended despite limited patient symptoms.', severity: 'high' },
      { id: 2, type: 'checkin', time: 'Yesterday • 9:10 AM', title: 'No symptom escalation', summary: 'Patient reports stable day-to-day function.', detail: 'Objective changes remain the primary concern.', severity: 'medium' },
      { id: 3, type: 'note', time: 'Tue • 4:10 PM', title: 'Care plan note', summary: 'Previous risk factors discussed with patient.', detail: 'Potential concern is not visible in patient voice alone.', severity: 'medium' },
      { id: 4, type: 'action', time: 'Mon • 2:00 PM', title: 'Review task flagged', summary: 'Route to clinician follow-up queue.', detail: 'Await provider triage and next steps.', severity: 'medium' }
    ],
    actions: [
      { id: 'contact', label: 'Contact patient', detail: 'Discuss lab changes and next review step.' },
      { id: 'followup', label: 'Schedule follow-up', detail: 'Arrange provider review within 72 hours.' },
      { id: 'note', label: 'Add note', detail: 'Document asymptomatic but concerning trend.' },
      { id: 'route', label: 'Route for review', detail: 'Escalate to clinical team for risk assessment.' }
    ]
  },
  {
    id: 6,
    name: 'Elena Ruiz',
    age: 33,
    condition: 'Hidden concern',
    careContext: 'Behavioral health care',
    status: 'Monitoring',
    changeSummary: 'Normal metrics but lower quality of life',
    lastUpdate: '1d ago',
    summary: 'Traditional markers look stable, but patient-reported experience reveals a meaningful change in daily functioning.',
    patientVoice: '“My energy is lower even though everything looks normal, and I’m feeling exhausted most days.”',
    currentConcerns: ['Lower daily energy', 'Reduced quality of life', 'Poor sleep despite normal readings'],
    keyInsights: ['Objective results appear stable while patient experience declines', 'Care team should not rely on numbers alone', 'Quality-of-life change is the clinical signal here'],
    nextAction: 'Review patient narrative and add behavioral-health support touchpoint',
    trends: [
      { day: 'M', pain: 2, sleep: 7, energy: 8, mobility: 8 },
      { day: 'T', pain: 2, sleep: 6, energy: 8, mobility: 7 },
      { day: 'W', pain: 3, sleep: 5, energy: 7, mobility: 7 },
      { day: 'T', pain: 3, sleep: 5, energy: 6, mobility: 7 },
      { day: 'F', pain: 4, sleep: 4, energy: 5, mobility: 6 },
      { day: 'S', pain: 4, sleep: 4, energy: 4, mobility: 5 },
      { day: 'S', pain: 4, sleep: 3, energy: 4, mobility: 5 }
    ],
    labs: [
      { label: 'CBC', value: 'Within range', status: 'normal' },
      { label: 'Vitamin D', value: '29 ng/mL', status: 'warn' },
      { label: 'Sleep review', value: 'Low score', status: 'warn' }
    ],
    timeline: [
      { id: 1, type: 'checkin', time: 'Today • 9:45 AM', title: 'Patient quality-of-life update', summary: 'Energy and sleep are both trending down.', detail: 'Patient says daily functioning feels harder even without objective signals.', severity: 'high' },
      { id: 2, type: 'note', time: 'Wed • 1:25 PM', title: 'Behavioral health note', summary: 'Stress and sleep disruptions mentioned by patient.', detail: 'Narrative context indicates a meaningful drop in engagement and energy.', severity: 'medium' },
      { id: 3, type: 'lab', time: 'Tue • 10:00 AM', title: 'Normal labs reviewed', summary: 'No acute concern in standard markers.', detail: 'Objective data alone do not explain patient-reported decline.', severity: 'medium' },
      { id: 4, type: 'action', time: 'Mon • 8:00 AM', title: 'Support follow-up queued', summary: 'Patient story elevated for review.', detail: 'Nurse follow-up planned to discuss functional impact.', severity: 'medium' }
    ],
    actions: [
      { id: 'contact', label: 'Contact patient', detail: 'Discuss energy, sleep, and daily functioning impact.' },
      { id: 'followup', label: 'Schedule follow-up', detail: 'Set support check-in with care team.' },
      { id: 'note', label: 'Add note', detail: 'Capture patient narrative and symptom burden.' },
      { id: 'route', label: 'Route for review', detail: 'Escalate to behavioral-health support pathway.' }
    ]
  }
]
