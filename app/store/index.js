export const actions = {
  async nuxtServerInit({ dispatch, state: { auth } }) {
    if (auth.loggedIn) {
      await dispatch('discounts/favorites')
    }
  }
}

export const mutations = {
  clear({ state }) {
    localStorage.clear();
  }
}
