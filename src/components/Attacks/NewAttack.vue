<template>
  <q-modal v-model="open" minimized>
    <h4>Add attack</h4>
    <q-input
      v-model="attack.name"
      stack-label="Name"/>
    <q-input
      v-model="attack.hitFormula"
      stack-label="To hit"/>
    <q-input
      v-model="attack.damageFormula"
      stack-label="Damage"/>

    <q-btn class="full-width" color="primary" @click="submit">Add</q-btn>
  </q-modal>
</template>

<script>
const Attack = () => ({
  active: true,
  name: '',
  hitFormula: '1d20 + BAB + STR',
  damageFormula: '1d8 + 1.5 * STR'
})

export default {
  props: {
    value: Boolean
  },
  data: () => ({
    attack: Attack()
  }),
  computed: {
    open: {
      get () { return this.value },
      set (val) { this.$emit('input', val) }
    }
  },
  watch: {
    value () {
      this.attack = Attack()
    }
  },
  methods: {
    submit () {
      this.$emit('add', this.attack)
      this.open = false
    }
  }
}
</script>
