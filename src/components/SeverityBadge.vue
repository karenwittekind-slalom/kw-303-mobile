<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  severity: 'low' | 'medium' | 'high'
}>()

const icon = computed(() => {
  if (props.severity === 'high') return 'mdi-alert-circle-outline'
  if (props.severity === 'medium') return 'mdi-alert-outline'
  return 'mdi-check-circle-outline'
})
</script>

<template>
  <span :class="['source-badge', `severity-${severity}`]">
    <v-icon :icon="icon" size="x-small" />
    <span>{{ severity }}</span>
  </span>
</template>