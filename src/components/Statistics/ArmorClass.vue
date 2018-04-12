<template>
  <div>
    <title-with-buttons title="Armor Class"
      :buttons="['edit']" />
    <table>
      <tr>
        <th>Total</th>
        <th>Touch</th>
        <th>Flat-Footed</th>
      </tr>
      <tr>
        <td>{{ac.total}}</td>
        <td>{{ac.touch}}</td>
        <td>{{ac.flatFooted}}</td>
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
    ac () { return this.$store.getters.ac }
  }
}
</script>
