import { Dialog } from 'quasar'

export default {
  methods: {
    roll20 (mod) {
      const value = Math.floor(Math.random() * 20) + 1
      Dialog.create({
        title: `Roll: (${value}) ${mod < 0 ? '' : '+'} ${mod} = ${value + mod}`
      })
    }
  }
}
