<template lang="pug">
v-container.d-flex.justify-center.align-center.h-screen.w-100.flex-column(fluid)
  img.my-5(:src="Ticket" height="100")
  v-card.w-50(:loading="zulipStore.loading")
    v-card-title.text-center Login to Zulip
    v-card-text
      v-form(
        ref="form"
        v-model="isFormValid"
        lazy-validation
      )
        v-text-field(
          ref="realmRef"
          v-model="zulipStore.realm"
          :rules="realmRule"
          label="Organization URL"
          required
          @blur="checkHttps"
          @keyup.enter="usernameRef.focus()"
        )
        v-text-field(
          ref="usernameRef"
          v-model="zulipStore.username"
          :rules="usernameRule"
          label="Username"
          required
          @keyup.enter="passwordRef.focus()"
        )
        v-text-field(
          ref="passwordRef"
          v-model="zulipStore.password"
          :rules="passwordRule"
          label="Password"
          required
          type="password"
          @keyup.enter="isFormValid ? submit() : () => {}"
        )
        v-btn(
          block
          color="primary"
          @click="submit()"
          :disabled="!isFormValid"
          :loading="zulipStore.loading"
        ) Login

  v-snackbar(
    :timeout="errorTimeout"
    color="error"
    elevation="24"
    v-model="snackbar"
  ) {{ zulipStore.error }}
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import Ticket from '../assets/img/ticket.svg'
import { useZulipStore } from '../stores/zulip'

const isFormValid = ref(false)
const zulipStore = useZulipStore()
const snackbar = ref(false)
const errorTimeout = 2000
const usernameRef = ref(null)
const realmRef = ref(null)
const passwordRef = ref(null)

const usernameRule = [(v: string) => !!v || 'Username is required']
const passwordRule = [(v: string) => !!v || 'Password is required']
const realmRule = [(v: string) => !!v || 'Organization URL is required']

const checkHttps = () => {
  if (!/https?:\/\/[\S]*/.test(zulipStore.realm)) {
    zulipStore.realm = `https://${zulipStore.realm}`
  }
}

const submit = () => {
  zulipStore.login()

  if (zulipStore.error) {
    snackbar.value = true

    setTimeout(() => {
      zulipStore.error = undefined
    }, errorTimeout)
  }
}
</script>
