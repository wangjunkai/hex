<template>
  <tr class="hex_table_row">
    <td colspan="7">
      <chargeMoney v-if="currencyData.type == 'chargeMoney'"></chargeMoney>
      <mentionMoney v-if="currencyData.type != 'chargeMoney'"></mentionMoney>
    </td>
  </tr>
</template>
<script>
  import chargeMoney from '@/components/deal/charge-money'
  import mentionMoney from '@/components/deal/mention-money'

  export default {
    name: 'articles',
    props: ['currencyData'],
    components: {
      chargeMoney,
      mentionMoney
    },
    data() {
      return {}
    },
    methods: {},
    created() {
    }
  }
</script>
