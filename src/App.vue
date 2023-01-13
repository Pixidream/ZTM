<template lang="pug">
router-view
</template>
<script lang="ts" setup>
import { onMounted } from "vue"
import { useZulipStore } from "./stores/zulip"

const zulipStore = useZulipStore()

onMounted(() => {
    zulipStore.autoLogin()
})
</script>
