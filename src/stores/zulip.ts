import { defineStore } from "pinia";
import zulipInit from "zulip-js";

export const useZulipStore = defineStore("zulip", {
  state: () => {
    return {
      username: "",
      password: "",
      realm: "",
      zulip: undefined,
      error: undefined,
    };
  },
  actions: {
    async login() {
      try {
        this.zulip = await zulipInit({
          username: this.username,
          password: this.password,
          realm: this.realm,
        })
      } catch (e) {
        this.error = e
      }
    },
  },

  getters: {
    getError: state => state.error
  }
});
