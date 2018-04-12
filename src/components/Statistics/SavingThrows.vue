<template>
  <div>
    <title-with-buttons
      title="Saving throws"
      :buttons="['edit']"/>
    <table>
      <tr>
        <th>Fort</th>
        <th>Ref</th>
        <th>Will</th>
      </tr>
      <tr>
        <td class="roll" @click="roll20(saves.fortitude)">
          {{saves.fortitude >= 0 ? `+${saves.fortitude}` : saves.fortitude}}
        </td>
        <td class="roll" @click="roll20(saves.reflex)">
          {{saves.reflex >= 0 ? `+${saves.reflex}` : saves.reflex}}
        </td>
        <td class="roll" @click="roll20(saves.will)">
          {{saves.will >= 0 ? `+${saves.will}` : saves.will}}
        </td>
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
    saves () { return this.$store.getters.savingThrows }
  }
}
</script>
