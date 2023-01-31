import { defineStore } from 'pinia'
import zulipInit from 'zulip-js'

import { router } from '../routes'

export const useZulipStore = defineStore('zulip', {
  state: () => {
    return {
      email: '',
      password: '',
      realm: '',
      apiKey: '',
      zulip: undefined,
      error: undefined as unknown,
      loading: false,
      streams: [],
    }
  },
  actions: {
    async login() {
      this.loading = true
      try {
        this.zulip = await zulipInit({
          username: this.email,
          password: this.password,
          realm: this.realm,
        })
        this.apiKey = this.zulip.config.apiKey
        localStorage.setItem('apiKey', this.apiKey)
        localStorage.setItem('realm', this.realm)
        localStorage.setItem('email', this.email)
        router.push({ name: 'home' })
        this.email = ''
        this.password = ''
        this.realm = ''
        this.loading = false
      } catch (e) {
        this.error = e
        this.loading = false
      }
    },

    async autoLogin() {
      this.apiKey = localStorage.getItem('apiKey') || ''
      this.realm = localStorage.getItem('realm') || ''
      this.email = localStorage.getItem('email') || ''

      if (!this.apiKey || !this.realm || !this.email) return

      try {
        this.zulip = await zulipInit({
          username: this.email,
          apiKey: this.apiKey,
          realm: this.realm,
        })
        router.push({ name: 'home' })
      } catch (e) {
        console.error(e)
      }
    },

    logout() {
      this.email = ''
      this.password = ''
      this.realm = ''
      this.apiKey = ''
      this.zulip = undefined
      localStorage.removeItem('apiKey')
      localStorage.removeItem('realm')
      localStorage.removeItem('username')
      router.push({ name: 'login' })
    },

    async updateSubscribedStreams() {
      if (this.zulip === undefined) return
      const streams = await this.zulip.streams.subscriptions.retrieve()
      this.streams = streams.subscriptions.filter((stream: any) => stream.name.includes('_sav'))
    },
  },

  getters: {
    getError: (state) => state.error,
    isAuthenticated: (state) => !!state.apiKey && !!state.zulip,
    getStreams: (state) => state.streams,
  },
})
