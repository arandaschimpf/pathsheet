<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import Roll from 'components/Roll'
import ExpressionParser from 'components/ExpressionParser'

Vue.mixin(Roll)
Vue.mixin(ExpressionParser)

export default {
  name: 'App'
}
</script>

<style>
</style>
