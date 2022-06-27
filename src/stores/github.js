import { defineStore } from 'pinia'
import { Axios } from '../axios'
import { useDate } from '../composables/Date'

export const useGithubStore = defineStore('github', {
  state: () => {
    return {
      repositories: [],
    }
  },

  getters: {
    getLastWeekMostFavoriteRepos: state => state.repositories,
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
  },
})
