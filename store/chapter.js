const useChaptersStore = defineStore({
	id: 'chapters',
	state: () => ({
		chapters: [],
	}),
	actions: {
		async fetchChapters(apiUrl, apiSecret) {
			const response = await fetch(apiUrl, {
				headers: { Authorization: `Bearer ${apiSecret}` },
			});
			const data = await response.json();
			this.chapters = data.docs;
		},
	},
});

export default useChaptersStore;
