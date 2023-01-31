<template lang="pug">
h1 Hello Home
</template>
<script lang="ts" setup async>
import { useZulipStore } from '../stores/zulip'

const zulipStore = useZulipStore()
const topics = await zulipStore.zulip.streams.topics.retrieve({ stream_id: 58 })
console.log(topics)
</script>
