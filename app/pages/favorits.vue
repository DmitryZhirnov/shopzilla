<template>
  <div>
    <discount-list :discounts="favorites" />
  </div>
</template>

<script>
import DiscountList from "~/components/discount-list";
import ScrollObserver from "~/components/scroll-observer";
import { mapState } from "vuex";
export default {
  name: "FavoritsPage",
  middleware: ["auth"],
  components: { DiscountList, ScrollObserver },
  computed: {
    favorites() {
      return this.$store.state.discounts.favorites;
    },
    ...mapState("discounts", {
      from: "from",
      size: "size",
      query: "query"
    })
  },
  async fetch({ store }) {
    try{
     await store.dispatch("discounts/favorites");
    }
    catch(error){
      console.log(error)
    }
  }
};
</script>
