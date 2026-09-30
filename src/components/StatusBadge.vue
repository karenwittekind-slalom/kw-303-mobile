<script setup lang="ts">
import { computed } from 'vue'
import type { CareStatus } from '../data/mockData'

const props = defineProps<{
  status: CareStatus
}>()

const icon = computed(() => {
  if (props.status === 'Needs Review') return 'mdi-alert-circle-outline'
  if (props.status === 'Monitoring') return 'mdi-eye-outline'
  return 'mdi-trending-up'
})

const statusClass = computed(() => props.status.toLowerCase().replaceAll(' ', '-'))
</script>

<template>
  <span :class="['status-badge', `status-${statusClass}`]">
    <v-icon :icon="icon" size="x-small" />
    <span>{{ status }}</span>
  </span>
</template>