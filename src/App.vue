<template lang="pug">
DefaultLayout(v-if="zulipStore.isAuthenticated")
LoginLayout(v-else)
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import DefaultLayout from './layouts/DefaultLayout.vue'
import LoginLayout from './layouts/LoginLayout.vue'
import { useZulipStore } from './stores/zulip'

const zulipStore = useZulipStore()
const route = useRoute()

onMounted(() => {
  zulipStore.autoLogin()
})
</script>
