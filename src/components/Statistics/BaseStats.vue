<template>
  <div>
    <h3>Statistics</h3>
    <hr>
    <table class="statistics">
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
          <th>Mod</th>
          <th>Bonus</th>
          <th>Final Mod</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="({base, total, modBase, modTotal}, key) in statistics" :key="key">
          <td class="label">{{key.slice(0, 3)}}</td>
          <td class="score">
            <q-field>
              <q-input :value="base" @input="setStat(key, $event)" type="number"/>
            </q-field>
          </td>
          <td @click="roll20(modBase)">{{modBase >= 0 ? `+${modBase}` : modBase}}</td>
          <td>{{total - base}}</td>
          <td @click="roll20(modTotal)" class="roll link">{{modTotal >= 0 ? `+${modTotal}` : modTotal}}</td>
        </tr>
      </tbody>
    </table>
    <hr>
  </div>
</template>

<style scoped>
  table, .score input {
    text-align: center;
    width: 100%;
  }

  .score {
    width: 3em;
  }

  .label {
    text-transform: uppercase;
  }
</style>

<script>
export default {
  computed: {
    statisticsNames () {
      return Object.keys(this.character.base)
    },
    statistics () {
      return this.$store.getters.statistics
    }
  },
  methods: {
    calcMod (stat) {
      return Math.floor((stat - 10) / 2)
    },
    setStat (key, value) {
      this.$store.commit('setBaseStatistic', {key, value})
    }
  }
}
</script>
