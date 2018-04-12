<template>
  <div>
    <title-with-buttons title="Attack" :buttons="['edit']" />
    <table>
      <tr>
        <th>BAB</th>
        <th>CMB</th>
        <th>CMD</th>
      </tr>
      <tr>
        <td class="roll" @click="roll20(bab)">{{bab >= 0 ? `+${bab}` : bab}}</td>
        <td class="roll" @click="roll20(cm.cmb)">{{cm.cmb >= 0 ? `+${cm.cmb}` : cm.cmb}}</td>
        <td>{{cm.cmd}}</td>
      </tr>
    </table>
    <hr>
  </div>
</template>

<style scoped>
  table {
    width: 100%;
    text-align: center;
  }
</style>

<script>
import TitleWithButtons from './TitleWithButtons'

export default {
  components: {TitleWithButtons},
  computed: {
    cm () { return this.$store.getters.cm },
    bab () {
      return this.$store.state.character.offense.bab
    }
  }
}
</script>
