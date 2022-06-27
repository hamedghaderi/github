<script setup>
import { useGithubStore } from '@/stores/github.js'
import { computed, onMounted } from 'vue'
import GithubList from '../components/GithubList.vue'

const store = useGithubStore()

const repositories = computed(() => store.getLastWeekMostFavoriteRepos)

onMounted(() => {
  store.fetchLastWeekMostFavoriteRepos()
})
</script>

<template>
  <div class="px-4 md:px-0">
    <h1
      class="block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200 capitalize">
      Last Week Github Most Favorite Repsitories
    </h1>

    <GithubList :repositories="repositories"></GithubList>
  </div>
</template>
