import { defineStore } from 'pinia'
import { Axios } from '../axios'
import { useDate } from '../composables/Date'
import { useStorage } from '@vueuse/core'
import { useError } from '../composables/Error'

export const useGithubStore = defineStore('github', {
  state: () => {
    return {
      repositories: {},
      starIds: useStorage('starIds', []),
    }
  },

  getters: {
    getLastWeekMostFavoriteRepos(state) {
      return (selected = 1) => {
        if (parseInt(selected) === 1) {
          return state.repositories
        }

        return {
          incomplete_results: state.repositories.incomplete_results,
          total_count: state.repositories.total_count,
          items: state.repositories?.items?.filter(item =>
            this.hasStar(parseInt(item.id))
          ),
        }
      }
    },

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
        const { displayError } = useError()

        displayError(error)
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
