<template>
  <div>
    <discount-list :discounts="discounts" />
    <scroll-observer @intersect="onIntersected" />
  </div>
</template>
<script>
import DiscountList from "~/components/discount-list";
import ScrollObserver from "~/components/scroll-observer";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Index",
  middleware: ["auth"],
  components: { DiscountList, ScrollObserver },
  computed: {
    ...mapState("discounts", {
      from: "from",
      size: "size",
      query: "query"
    }),
    ...mapGetters("discounts", {
      discounts: "discountsWithFavorites"
    })
  },
  methods: {
    onIntersected() {
      if (this.discounts.length) {
        this.$store.dispatch("discounts/paginate");
      }
    }
  },
  async fetch({ store }) {
      await store.dispatch("discounts/load", { query: "" });
  }
};
</script>
<style></style>
