<template>
  <v-card class="discount-item">


    <v-img :src="discount.image_url"></v-img>
    <v-list-item>
      <v-list-item-avatar color="grey">
        <v-img :src="discount.category.image_url"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{discount.title}}</v-list-item-title>
        <v-list-item-subtitle :title="discount.category.description">{{discount.category.title}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <a v-for="tag in discount.tags" :key="tag" class="ml-1" @click="onTagClick(tag)">{{tag}}</a>
      <v-spacer></v-spacer>
      <v-icon :class="favoriteClass" class="favorite-icon" @click="favorite(discount)">mdi-heart</v-icon>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>{{discount.description}}</v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "DiscountListItem",
  data() {
    return {
      show: false
    };
  },
  props: {
    discount: {
      type: Object,
      required: true
    }
  },
  computed: {
    favoriteClass() {
      return this.discount.isFavorite ? "favorite" : "";
    }
  },

  methods: {
    onTagClick(tag) {
      this.$emit("tag", tag);
    },
    truncate(text) {
      return text ? text.substring(0, 150) + "..." : "";
    },
    favorite(id) {
      this.$emit("favorite", id);
    }
  }
};
</script>

<style scoped>
.discount-description {
  white-space: normal;
}

.favorite {
  color: red;
  cursor: pointer;
}

.favorite-icon:hover {
  color: red;
  cursor: pointer;
}
</style>