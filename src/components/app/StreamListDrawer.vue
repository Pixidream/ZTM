<template lang="pug">
v-list(density="compact")
    v-list-item(title="Dashboard")
        template(v-slot:prepend)
            v-icon(icon="mdi-view-dashboard")
    v-list-item(prepend-icon="mdi-account-box" title="Account")
    v-list-item(prepend-icon="mdi-gavel" title="Admin")
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { useZulipStore } from '../../stores/zulip'

const zulipStore = useZulipStore()

onMounted(() => {
  zulipStore.getSubscribedStreams()
})
</script>
