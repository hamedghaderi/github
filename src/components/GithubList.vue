<script setup>
import { useGithubStore } from '../stores/github'
import GithubStar from './GithubStar.vue'
import Loader from './Loader.vue'

const store = useGithubStore()

defineProps({
  repositories: {
    type: Object,
    required: true,
  },
})

const isStarred = id => {
  return store.hasStar(id)
}

const toggleStar = id => {
  store.toggleStar(id)
}
</script>
<template>
  <div
    class="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25 mt-12">
    <div class="relative rounded-xl overflow-x-auto">
      <div class="shadow-sm lg:overflow-hidden my-8">
        <table
          class="border-collapse lg:table-fixed w-full text-sm"
          v-if="repositories?.items?.length">
          <thead>
            <tr>
              <!-- Name -->
              <th
                class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                Name
              </th>

              <!-- Created By -->
              <th
                class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                Created By
              </th>

              <!-- Description -->
              <th
                class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                Description
              </th>

              <!-- Created At -->
              <th
                class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                Created At
              </th>

              <!-- Number of Stars -->
              <th
                class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                Number of Stars
              </th>

              <!-- Actions -->
              <th
                class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody class="bg-white dark:bg-slate-800">
            <tr v-for="item in repositories.items" :key="item.id">
              <!-- Name -->
              <td
                class="border-b truncate border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                {{ item.name.toLocaleUpperCase() }}
              </td>

              <!-- Created By -->
              <td
                class="border-b truncate border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                <p>{{ item.owner.login }}</p>
              </td>

              <!-- Description -->
              <td
                class="border-b truncate border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                {{ item.description }}
              </td>

              <!-- Created At -->
              <td
                class="border-b truncate border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                {{ item.created_at }}
              </td>

              <!-- Number of Stars -->
              <td
                class="border-b truncate border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                {{ item.stargazers_count }}
              </td>

              <td
                class="border-b truncate border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                <GithubStar
                  :is-starred="isStarred(item.id)"
                  @toggle="toggleStar(item.id)" />
              </td>
            </tr>
          </tbody>
        </table>

        <p class="flex items-center justify-center text-blue-600" v-else>
          <Loader />
        </p>
      </div>
    </div>
  </div>
</template>
