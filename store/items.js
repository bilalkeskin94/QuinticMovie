const useIdsStore = defineStore({
	id: 'items',
	state: () => ({
		items: [],
	}),
	actions: {
		async fetchItems(apiUrl, apiSecret) {
			const response = await fetch(apiUrl, {
				headers: { Authorization: `Bearer ${apiSecret}` },
			});
			const data = await response.json();
			this.items = data.docs;
		},
	},
});

export default useIdsStore;
