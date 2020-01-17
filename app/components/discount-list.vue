<template>
  <v-container class="d-flex flex-wrap justify-space-between flex-grow-1">
    <v-row>
      <template v-for="discount in discounts ">
        <v-col :key="discount.id" md="6" sm="12" lg="3">
          <discount-list-item :discount="discount" @tag="onTag" @favorite="onFavorite" />
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import DiscountListItem from "./discount-list-item.vue";
export default {
  name: "DiscountList",
  components: { DiscountListItem },
  props: {
    discounts: {
      type: Array,
      required: true
    }
  },
  methods: {
    onTag(tag) {
      this.$store.dispatch("discounts/load", {
        query: tag
      });
    },
    onFavorite(discount) {
      if (discount.isFavorite)
        this.$store.dispatch("discounts/unfavorite", discount.id);
      else this.$store.dispatch("discounts/favorite", discount.id);
    }
  }
};
</script>

<style>
</style>