<template>
  <li class="item-list">{{text}}</li>
</template>
<script lang="ts">
import Order from "../interfaces/order";
import Vue, { PropOptions } from "vue";
export default Vue.extend({
  name: "OrderListItem",
  props: {
    order: {
      type: Object,
      required: true
    } as PropOptions<Order>
  },
  computed: {
    text() {
      const { id, brandName, agencyName } = this.order;
      return `ID: ${id} Brand: ${brandName} Agency: ${agencyName}`;
    }
  }
});
</script>
<style></style>