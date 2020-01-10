import Order from "~/interfaces/order";
import { ActionTree, MutationTree } from 'vuex'

export const state = () => {
  return {
    orders: Array<Order>()
  };
};

export type OrdersState = ReturnType<typeof state>

export const mutations: MutationTree<OrdersState> = {
  load: (state: OrdersState, orders: Array<Order>) => {
    state.orders = orders;
  }
};

export const actions: ActionTree<OrdersState, OrdersState> = {
  async load({ commit }) {
    const orders = await this.$axios.$get("/api/orders");
    commit("load", orders);
  }
};
