<script setup>
import { useGithubStore } from '@/stores/github.js'
import { computed, onMounted, ref } from 'vue'
import GithubList from '../components/GithubList.vue'
import Dropdown from '../components/Dropdown.vue'

const store = useGithubStore()

const selected = ref(1)
const options = ref([
  { id: 1, name: 'All', value: 'all' },
  { id: 2, name: 'Starred', value: 'starred' },
])

const repositories = computed(() =>
  store.getLastWeekMostFavoriteRepos(selected.value)
)

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

    <Dropdown label="Display" v-model="selected" :options="options" />

    <GithubList :repositories="repositories"></GithubList>
  </div>
</template>
