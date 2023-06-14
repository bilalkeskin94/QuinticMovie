const useChaptersStore = defineStore({
	id: 'chapters',
	state: () => ({
		chapters: [],
	}),
	actions: {
		async fetchChapters(baseURL,apiSecret) {
			const response = await fetch(`${baseURL}/chapter`, {
				headers: { Authorization: `Bearer ${apiSecret}` },
			});
			const data = await response.json();
			this.chapters = data.docs;
		},
	},
});

export default useChaptersStore;