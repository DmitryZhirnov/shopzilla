<template>
  <div>
    <order-list :orders="orders"></order-list>
  </div>
</template>
<script>
import OrderList from "~/components/order-list";
export default {
  name: "Index",
  components: { OrderList },
  computed: {
    orders: ({ $store }) => {
      return $store.state.orders.orders;
    }
  }
};
</script>
<style></style>
