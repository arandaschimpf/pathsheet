<template>
  <q-page class="flex">
    <new-attack v-model="newAttackOpen"/>
    <div>
      <title-with-buttons title="Attacks"
        :buttons="['add']"
        @add="newAttackOpen = true"/>

    </div>

  </q-page>
</template>

<script>
import NewAttack from 'components/Attacks/NewAttack'
import TitleWithButtons from 'components/Statistics/TitleWithButtons'

export default {
  components: {NewAttack, TitleWithButtons},
  data: () => ({
    newAttackOpen: false
  })
}
</script>
