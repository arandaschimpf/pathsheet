<template>
  <q-modal v-model="open" minimized>
    <div class="attacks-modal">
      <h4>Add attack</h4>
      <q-input
        v-model="name"
        ref="name"
        stack-label="Name"/>
      <q-input
        v-model="hitFormula"
        stack-label="To hit or DC"/>
      <q-input
        v-model="damageFormula"
        stack-label="Damage"/>
    </div>

    <q-btn class="full-width" color="primary" @click="$emit('send')">{{id ? 'Modify' : 'Add'}}</q-btn>
  </q-modal>
</template>

<style>
.attacks-modal {
  padding: 10px;
}
</style>

<script>
function editPropObject (prop, ...keys) {
  return keys.reduce((obj, key) => {
    obj[key] = {
      get () {
        const p = this[prop]
        return p ? this[prop][key] : undefined
      },
      set (value) { this.$emit('edit', key, value) }
    }
    return obj
  }, {})
}

export default {
  props: {
    value: Object
  },
  computed: {
    ...editPropObject('value', 'name', 'hitFormula', 'damageFormula', 'id'),
    open: {
      get () { return !!this.value },
      set () { this.$emit('input', undefined) }
    }
  },
  watch: {
    value (val) {
      if (val) {
        setTimeout(() => { this.$refs.name.focus() }, 10)
      }
    }
  }
}
</script>
