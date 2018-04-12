function buildStats (state, statistics) {
  return Object.keys(statistics).reduce((obj, key) => {
    obj[key.slice(0, 3).toUpperCase()] = statistics[key].modTotal
    return obj
  }, {BAB: state.offense.bab})
}

function getDiceRoll (amount, type) {
  const rolls = Array(amount).fill(0).map(() => Math.floor(Math.random() * type) + 1)
  return {
    value: rolls.reduce((sum, c) => sum + c, 0),
    rolls,
    type: 'rolls',
    dice: type,
    amount
  }
}

function getStat (stats, key) {
  const stat = key.slice(0, 3).toUpperCase()
  return {
    value: stats[stat] || 0,
    type: 'stat',
    stat
  }
}

function getNumber (s) {
  return {
    value: parseFloat(s),
    type: 'number'
  }
}

function multiplicationFactors (s, stats) {
  const array = s.split('*').map(s => processExpression(s, stats))
  return {
    value: Math.floor(array.reduce((mult, c) => c.value * mult, 1)),
    factors: array,
    type: 'multiplication'
  }
}

function processExpression (s, stats) {
  s = s.trim()
  if (/\*/.test(s)) return multiplicationFactors(s, stats)
  const d = s.match(/^((?:\d)+)d((?:\d)+)$/)
  if (d) return getDiceRoll(parseInt(d[1], 10), parseInt(d[2], 10))
  if (/(bab|str|dex|con|int|wis|cha)/i.test(s)) return getStat(stats, s)
  if (/^\d+(\.|,)?(\d+)?$/.test(s)) return getNumber(s)
  return {value: 0, type: 'empty'}
}

function processGroupExpression (s) {
  const stats = buildStats(this.$store.state.character, this.$store.getters.statistics)
  const exps = s.split('+').map(s => processExpression(s, stats))
  return {
    value: Math.floor(exps.reduce((sum, c) => c.value + sum, 0)),
    exps
  }
}

function formatGroupExpression (exp) {
  const flat = exp.exps.filter(e => e.type !== 'rolls')
    .reduce((sum, c) => sum + c.value, 0)
  const rolls = exp.exps.filter(e => e.type === 'rolls')
    .map(e => `(${e.value})`).join(' + ')
  return `${rolls}${(flat > 0 ? ` + ${flat}` : (flat < 0 ? ` - ${Math.abs(flat)}` : ''))} = ${exp.value}`
}

export default {
  methods: {
    processGroupExpression,
    formatGroupExpression
  }
}
