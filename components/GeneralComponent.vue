<template>
	<div>
		<SearchInput
			:items="items"
			:placeholder="`Search for a ${routeName}...`"
			:route="routeName"
		/>
	</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { defineStore } from 'pinia';

const props = defineProps({
	routeName: { type: String, required: true },
	apiUrl: { type: String, required: true },
});

const useItemsStore = defineStore({
	id: 'items',
	state: () => ({
		items: [],
	}),
	actions: {
		async fetchItems() {
			const response = await fetch(props.apiUrl, {
				headers: { Authorization: 'Bearer DvNgbIM8w17cH1R7ww0C' },
			});
			const data = await response.json();
			this.items = data.docs;
		},
	},
});

const store = useItemsStore();

onMounted(async () => {
	await store.fetchItems();
});

const items = computed(() => store.items);
</script>
