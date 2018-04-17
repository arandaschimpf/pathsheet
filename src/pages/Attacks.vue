<template>
  <q-page class="column">
    <new-attack v-model="editableAttack" @edit="edit" @send="addOrEditAttack"/>
    <div>
      <title-with-buttons title="Attacks"
        :buttons="['add']"
        @add="editableAttack = $options.Attack()"/>
    </div>
    <hr>
    <table style="flex: 1;" v-if="attacks.length">
      <tr>
        <th>Name</th>
        <th>To hit or DC</th>
        <th>Damage</th>
        <th></th>
      </tr>
      <tr v-for="attack in attacks" :key="attack.name">
        <td>{{attack.name}}</td>
        <td @click="roll(attack.hitFormula)">{{attack.toHit}}</td>
        <td @click="roll(attack.damageFormula, 'Damage')">{{attack.damage}}</td>
        <td @click="setEditableAttack(attack)"><q-icon name="edit" /></td>
      </tr>
    </table>
    <h3 v-else>There are not attacks yet</h3>
  </q-page>
</template>

<style scoped>
  table {
    text-align: center;
  }
</style>

<script>
import NewAttack from 'components/Attacks/NewAttack'
import TitleWithButtons from 'components/Statistics/TitleWithButtons'
import { mapMutations } from 'vuex'
import { Dialog } from 'quasar'

const Attack = (attack) => ({
  active: true,
  name: '',
  hitFormula: '1d20 + BAB + STR',
  damageFormula: '1d8 + 1.5 * STR'
})

export default {
  components: {NewAttack, TitleWithButtons},
  Attack,
  data: () => ({
    newAttackOpen: false,
    editableAttack: undefined
  }),
  computed: {
    attacks () {
      return this.$store.state.character.offense.attacks.map(attack => {
        const asmToHit = this.processGroupExpression(attack.hitFormula)
        const asmDamage = this.processGroupExpression(attack.damageFormula)
        return {
          ...attack,
          toHit: this.formatGroupExpressionWithoutRolls(asmToHit),
          damage: this.formatGroupExpressionWithoutRolls(asmDamage)
        }
      })
    }
  },
  methods: {
    ...mapMutations(['updateAttack']),
    roll (expression, type = 'Attack') {
      const asm = this.processGroupExpression(expression)
      const formatted = this.formatGroupExpression(asm)

      Dialog.create({
        title: `${type}: ${formatted}`
      })
    },
    setEditableAttack (attack) {
      this.editableAttack = {...attack}
    },
    addOrEditAttack () {
      this.updateAttack(this.editableAttack)
      this.editableAttack = undefined
    },
    edit (key, val) {
      this.editableAttack[key] = val
    }
  }
}
</script>
