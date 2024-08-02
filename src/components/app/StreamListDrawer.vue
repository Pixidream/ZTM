<template lang="pug">
v-container(fluid)
    v-row
        v-img.drawer-logo(:src="Logo")
    v-row
        v-list(density="compact" :lines="false" nav)
          v-list-item(
            value="home"
            title="Home"
            prepend-icon="mdi-home"
            @click="router.push({ name: 'home' })"
          )
          v-list-item(
            v-for="stream in zulipStore.getStreams"
            :key="stream.stream_id"
            :value="stream.stream_id"
            :active-color="stream.color"
            :title="stream.name"
            @click="router.push(`/stream/${stream.stream_id}`)"
          )
            template(v-slot:prepend)
              v-icon(size="small" :color="stream.color" icon="mdi-pound")
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { useZulipStore } from '../../stores/zulip'
import Logo from "../../assets/img/ticket.svg"

const zulipStore = useZulipStore()

onMounted(() => {
  zulipStore.updateSubscribedStreams()
})
</script>

<style scoped lang="scss">
.drawer-logo {
    width: 50%;
}
</style>
