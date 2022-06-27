<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },

  modelValue: {
    type: [String, Number],
    required: true,
  },

  options: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const onChange = event => {
  emit('update:modelValue', event.target.value)
}
</script>
<template>
  <div class="mt-4">
    <label class="text-slate-700 dark:text-slate-100 mr-2">{{ label }}</label>

    <select
      @change="onChange"
      :value="modelValue"
      class="rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 bg-white">
      <option
        v-for="option in options"
        :value="option.id"
        :key="option.id"
        :selected="onChange">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>
