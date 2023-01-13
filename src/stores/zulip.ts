import { defineStore } from "pinia";
import zulipInit from "zulip-js";

import { router } from '../routes';

export const useZulipStore = defineStore("zulip", {
  state: () => {
    return {
      username: "",
      password: "",
      realm: "",
      apiKey: "",
      zulip: undefined,
      error: undefined as unknown,
      loading: false
    };
  },
  actions: {
    async login() {
      this.loading = true
        try {
        this.zulip = await zulipInit({
          username: this.username,
          password: this.password,
          realm: this.realm,
        })
        this.apiKey = this.zulip.config.apiKey
        localStorage.setItem("apiKey", this.apiKey)
        localStorage.setItem("realm", this.realm)
        localStorage.setItem("username", this.username)
        router.push({ name: "home" })
        this.loading = false
      } catch (e) {
        this.error = e
        this.loading = false
      }      
    },

    async autoLogin() {
      this.apiKey = localStorage.getItem("apiKey") || ""
      this.realm = localStorage.getItem("realm") || ""
      this.username = localStorage.getItem("username") || ""

      if (!this.apiKey || !this.realm || !this.username) return

      try {
        this.zulip = await zulipInit({
          username: this.username,
          apiKey: this.apiKey,
          realm: this.realm
        })
        router.push({ name: "home" })
      } catch (e) {
        console.error(e)
      }
    },
  },

  getters: {
    getError: state => state.error,
    isAuthenticated: state => state.realm && state.username && state.apiKey
  }
});
