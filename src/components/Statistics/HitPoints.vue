<template>
  <div>
    <title-with-buttons title="Hit Points" :buttons="['vertical_align_center', 'edit']" />
    <table>
      <tr>
        <th>Total</th>
        <th>Remaining</th>
        <th>Non Lethal</th>
      </tr>
      <tr>
        <td>{{hp.total}}</td>
        <td>{{hp.remaining}}</td>
        <td>{{hp.nonLethal}}</td>
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
import {mapGetters} from 'vuex'

export default {
  components: {TitleWithButtons},
  computed: mapGetters(['hp'])
}
</script>
