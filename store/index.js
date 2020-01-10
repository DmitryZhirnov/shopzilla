export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch("orders/load")
  }
}
