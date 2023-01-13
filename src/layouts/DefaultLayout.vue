<template lang="pug">
v-app
    v-layout
        v-navigation-drawer(permanent)
            StreamListDrawer
            template(v-slot:append)
                .pa-6
                    v-btn(block color="primary" @click="zulipStore.logout()") Logout
        v-navigation-drawer(width="160" permanent)
        v-main
            router-view
</template>
<script lang="ts" setup>
import StreamListDrawer from '../components/app/StreamListDrawer.vue'
import { useZulipStore } from '../stores/zulip'

const zulipStore = useZulipStore()
</script>
