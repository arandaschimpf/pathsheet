<template>
  <div class="row justify-between title-with-buttons">
    <h4 style="flex: 1;">{{title}}</h4>
    <q-btn-group v-if="buttons.length">
      <q-btn v-for="button in buttons" :key="button" @click="$emit(button)" color="light" size="sm">
        <q-icon :name="button" />
      </q-btn>
    </q-btn-group>
  </div>
</template>

<style>
  .title-with-buttons .q-icon {
    font-size: 20px;
  }
</style>

<script>
export default {
  props: {
    title: String,
    buttons: {
      type: Array,
      default: () => []
    }
  }
}
</script>
