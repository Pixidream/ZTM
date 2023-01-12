<template lang="pug">
.d-flex.justify-center.align-center.h-screen.w-100.flex-column
  img.my-5(:src="Ticket" height="100")
  v-card.w-50(:loading="loading")
    v-card-title.text-center Login to Zulip
    v-card-text
      v-form(
        ref="form"
        v-model="isFormValid"
        lazy-validation
      )
        v-text-field(
          ref="realmRef"
          v-model="realm"
          :rules="realmRule"
          label="Organization URL"
          required
          @blur="checkHttps"
          @keyup.enter="usernameRef.focus()"
        )
        v-text-field(
          ref="usernameRef"
          v-model="username"
          :rules="usernameRule"
          label="Username"
          required
          @keyup.enter="passwordRef.focus()"
        )
        v-text-field(
          ref="passwordRef"
          v-model="password"
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
          :loading="loading"
        ) Login

  v-snackbar(
    :timeout="errorTimeout"
    color="error"
    elevation="24"
    v-model="snackbar"
  ) {{ zulipStore.error }}
</template>
<script lang="ts" setup>
import { ref } from "vue";

import Ticket from "../assets/img/ticket.svg"
import { useZulipStore } from '../stores/zulip';

const isFormValid = ref(false)
const username = ref("")
const password = ref("")
const realm = ref("")
const loading = ref(false)
const zulipStore = useZulipStore()
const snackbar = ref(false)
const errorTimeout = 2000
const usernameRef = ref(null)
const realmRef = ref(null)
const passwordRef = ref(null)

const usernameRule = [
  (v: string) => !!v || 'Username is required'
]
const passwordRule = [
  (v: string) => !!v || 'Password is required'
]
const realmRule = [
  (v: string) => !!v || 'Organization URL is required',
]

const checkHttps = () => {
  if (!/https?:\/\/[\S]*/.test(realm.value)) {
    realm.value = `https://${realm.value}`
  }
}

const submit = () => {
  loading.value = true
  zulipStore.$patch({
    username,
    password,
    realm
  })

  zulipStore.login()
  loading.value = false

  if (zulipStore.error) {
    snackbar.value = true

    setTimeout(() => {
      zulipStore.error = undefined
    }, errorTimeout)
  }
}
</script>
