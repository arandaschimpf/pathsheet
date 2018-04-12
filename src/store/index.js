import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const initStat = () => ({
  base: 10,
  bonuses: []
})

let character = () => ({
  statistics: {
    strength: initStat(),
    dexterity: initStat(),
    constitution: initStat(),
    intelligence: initStat(),
    wisdom: initStat(),
    charisma: initStat()
  },
  defense: {
    ac: {
      armor: 0,
      shield: 0,
      size: 0,
      natural: 0,
      deflection: 0,
      misc: 0
    },
    savingThrows: {
      fortitude: {
        base: 0,
        stat: 'constitution',
        misc: 0
      },
      reflex: {
        base: 0,
        stat: 'dexterity',
        misc: 0
      },
      will: {
        base: 0,
        stat: 'wisdom',
        misc: 0
      }
    },
    hp: {
      total: 0,
      nonLethal: 0,
      damages: 0
    }
  },
  cm: {
    size: 0,
    bMisc: 0,
    dMisc: 0
  },
  offense: {
    initiative: 0,
    bab: 0,
    attacks: []
  }
})

const store = {
  state: {
    character: character()
  },
  getters: {
    statistics: ({character}) => Object.keys(character.statistics).reduce((obj, key) => {
      const base = character.statistics[key].base
      const bonuses = character.statistics[key].bonuses
      const total = base + bonuses.reduce((sum, bonus) => sum + bonus.value, 0)
      obj[key] = {
        base,
        total,
        modBase: Math.floor((base - 10) / 2),
        modTotal: Math.floor((total - 10) / 2)
      }
      return obj
    }, {}),
    ac: ({character: {defense: {ac}}}, {statistics}) => ({
      total: 10 + statistics.dexterity.modTotal + Object.keys(ac).reduce((sum, key) => sum + ac[key], 0),
      touch: 10 + statistics.dexterity.modTotal + ac.size + ac.natural + ac.deflection + ac.misc,
      flatFooted: 10 + ac.armor + ac.shield + ac.natural + ac.misc
    }),
    initiative: ({character: {offense: {initiative}}}, {statistics}) => statistics.dexterity.modTotal + initiative,
    savingThrows: ({character: {defense: {savingThrows}}}, {statistics}) => Object.keys(savingThrows).reduce((obj, key) => {
      const save = savingThrows[key]
      obj[key] = save.base + statistics[save.stat].modTotal + save.misc
      return obj
    }, {}),
    cm: ({character: {cm, offense}}, {statistics}) => ({
      cmb: statistics.strength.modTotal + offense.bab + cm.size + cm.bMisc,
      cmd: statistics.strength.modTotal + offense.bab + cm.size + cm.dMisc + statistics.dexterity.modTotal + 10
    }),
    hp: ({character: {defense: {hp}}}) => ({
      total: hp.total,
      nonLethal: hp.nonLethal,
      damages: hp.damages,
      remaining: hp.total - hp.damages
    }),
    attacks: ({character: {offense: {attacks}}}) => attacks.filter(a => a.active)
  },
  mutations: {
    setBaseStatistic ({character}, {key, value}) {
      character.statistics[key].base = value
    }
  }
}

export default new Vuex.Store(store)
