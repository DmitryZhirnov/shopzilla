<template>
  <v-list three-line>
    <template v-for="order in orders">
      <v-subheader :key="order.id" v-text="order.id"></v-subheader>
      <v-list-item :key="order.id">
        <v-list-item-content>
          <v-list-item-title v-text="order.agencyName"></v-list-item-title>
          <v-list-item-subtitle v-html="order.brandName"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider :key="order.id"></v-divider>
    </template>
  </v-list>
</template>
<script lang='ts'>
export default {
  name: "OrderList",
  props: {
    orders: {
      type: Array,
      required: true
    }
  }
};
</script>
<style></style>
