import Discount from "~/interfaces/discount";
import { ActionTree, MutationTree, GetterTree } from 'vuex'

interface SearchProps {
    query: string,
    from?: number,
    size?: number
}

export const state = () => {
    return {
        discounts: Array<Discount>(),
        favorites: Array<Discount>(),
        query: '',
        from: 0,
        size: 0
    };
};

export type DiscountState = ReturnType<typeof state>

export const getters: GetterTree<DiscountState, DiscountState> = {
    discountsWithFavorites: (state: DiscountState) => {
        return state.discounts.map(discount => {

            const isFavorite = state.favorites.findIndex(d => d.id === discount.id) > -1
            return {
                ...discount,
                isFavorite
            }
        })
    }
}

export const mutations: MutationTree<DiscountState> = {
    load: (state: DiscountState, discounts: Array<Discount>) => {
        state.discounts = discounts;
    },
    set_search_options: (state: DiscountState, searchProps: SearchProps) => {
        state.from = searchProps.from || 0
        state.query = searchProps.query
        state.size = searchProps.size || 0

    },
    add(state: DiscountState, discounts: Array<Discount>) {
        state.discounts = state.discounts.concat(discounts)
    },
    load_favorites(state: DiscountState, favorites: Array<Discount>) {
        state.favorites = favorites
    },
    add_favorite(state: DiscountState, id: number) {
        const discount = state.discounts.find(d => d.id == id)
        if (discount) {
            discount.isFavorite = true
            state.favorites.push(discount)
        }
    },
    remove_favorite(state: DiscountState, id: number) {
        const discount = state.discounts.find(d => d.id == id)
        if (discount) {
            discount.isFavorite = false
            state.favorites = state.favorites.filter(f => f.id != id)
        }
    },
};

export const actions: ActionTree<DiscountState, DiscountState> = {

    async load({ commit }, props: SearchProps) {
        const { items, from, size } = await this.$axios.$get("/api/discounts", {
            params: {
                ...props
            },
        })
        commit("load", items)
        commit("set_search_options", {
            query: props.query,
            from: from + size,
            size
        })
    },

    async paginate({ commit, state }) {
        const { items, from, size } = await this.$axios.$get("/api/discounts", {
            params: {
                query: state.query,
                from: state.from,
                size: state.size
            }
        });
        commit('add', items)
        commit('set_search_options', {
            query: state.query,
            from: from + size,
            size
        })
    },

    async favorites({ commit }) {
        const { data } = await this.$axios.get("/api/discounts/favorites");
        commit('load_favorites', data)
    },

    async favorite({ commit }, id) {
        await this.$axios.post("/api/discounts/favorite", { id });
        commit('add_favorite', id)
    },

    async unfavorite({ commit }, id) {
        await this.$axios.post("/api/discounts/unfavorite", { id });
        commit('remove_favorite', id)
    }
};
