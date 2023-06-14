const useIdsStore = defineStore({
	id: 'item',
	state: () => ({
		item: {},
	}),
	actions: {
		async fetchItem(baseURL,apiSecret,type, id) {
			const response = await fetch(`${baseURL}${type}/${id}`, {
				headers: { Authorization: `Bearer ${apiSecret}` },
			});
			const data = await response.json();
			this.item = data.docs[0];
		},
	},
});

export default useIdsStore;