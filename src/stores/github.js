import { defineStore } from 'pinia'
import { Axios } from '../axios'
import { useDate } from '../composables/Date'
import { useStorage } from '@vueuse/core'

export const useGithubStore = defineStore('github', {
  state: () => {
    return {
      repositories: {},
      starIds: useStorage('starIds', []),
    }
  },

  getters: {
    getLastWeekMostFavoriteRepos: state => state.repositories,

    hasStar: state => {
      return id =>
        Boolean(state.starIds.find(sId => parseInt(sId) === parseInt(id)))
    },
  },

  actions: {
    async fetchLastWeekMostFavoriteRepos() {
      try {
        const { lastWeek } = useDate()
        const { data } = await Axios.get(
          `/search/repositories?q=created:>${lastWeek}&sort=stars&order=desc`
        )
        this.repositories = data
      } catch (error) {
        console.log(error)
      }
    },

    toggleStar(id) {
      if (this.hasStar(id)) {
        this.starIds = this.starIds.filter(
          sId => parseInt(sId) !== parseInt(id)
        )
        return
      }

      this.starIds.push(id)
    },
  },
})
