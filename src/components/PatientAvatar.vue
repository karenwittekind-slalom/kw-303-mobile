<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  name: string
  size?: 'small' | 'medium'
}>(), {
  size: 'medium'
})

const initials = computed(() => props.name.split(' ').map((part) => part[0]).join(''))
</script>

<template>
  <span :class="['app-avatar', `app-avatar-${size}`]" aria-hidden="true">{{ initials }}</span>
</template>