const useCharactersStore = defineStore({
	id: 'characters',
	state: () => ({
		characters: [],
		page: 1,
		totalPages: 0,
		sortOrder: 'asc',
		baseURL: process.env.BASE_URL,
		apiSecret: process.env.NUXT_ENV_API_KEY,
	}),
	actions: {
		async fetchCharacters(baseURL,apiSecret) {
			const response = await fetch(
				`${baseURL}character/?page=${this.page}&limit=20`,
				{
					headers: { Authorization: `Bearer ${apiSecret}` },
				}
			);
			const data = await response.json();
			this.characters = data.docs;
			this.totalPages = Math.ceil(data.total / 20);
		},
		nextPage() {
			if (this.page < this.totalPages) {
				this.page++;
				this.fetchCharacters(this.baseURL,this.apiSecret);
			}
		},
		prevPage() {
			if (this.page > 1) {
				this.page--;
				this.fetchCharacters(this.baseURL,this.apiSecret);
			}
		},
		sortCharacters() {
			this.characters.sort((a, b) => {
				const nameA = a.name.toUpperCase();
				const nameB = b.name.toUpperCase();
				if (this.sortOrder === 'asc') {
					if (nameA < nameB) return -1;
					if (nameA > nameB) return 1;
					return 0;
				} else {
					if (nameA > nameB) return -1;
					if (nameA < nameB) return 1;
					return 0;
				}
			});
		},
	},
});

export default useCharactersStore;
