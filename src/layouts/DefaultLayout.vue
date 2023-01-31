<template lang="pug">
v-app
    v-layout
        v-navigation-drawer(permanent)
            StreamListDrawer
            template(v-slot:append)
                .pa-6
                    v-btn(block color="primary" @click="zulipStore.logout()") Logout
                    v-btn(block color="green" @click="zulipStore.updateSubscribedStreams()") Refresh streams
        v-main
            Suspense
                router-view
                template(#fallback)
                    h1 Loading ....
</template>
<script lang="ts" setup>
import StreamListDrawer from '../components/app/StreamListDrawer.vue'
import { useZulipStore } from '../stores/zulip'

const zulipStore = useZulipStore()
</script>
