<template>
  <q-page class="column">
    <base-stats />
    <cmd-y-cmd />
    <hit-points />
    <armor-class />
    <saving-throws />
  </q-page>
</template>

<script>
import BaseStats from 'components/Statistics/BaseStats'
import ArmorClass from 'components/Statistics/ArmorClass'
import SavingThrows from 'components/Statistics/SavingThrows'
import CmdYCmd from 'components/Statistics/CMByCMD'
import HitPoints from 'components/Statistics/HitPoints'

export default {
  components: {BaseStats, ArmorClass, SavingThrows, CmdYCmd, HitPoints}
}
</script>
