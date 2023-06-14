<template>
	<div>
		<input type="text" v-model="searchTerm" :placeholder="placeholder" />
		<div class="grid">
			<nuxt-link
				class="search-input"
				v-for="item in filteredItems"
				:key="item._id"
				:to="`/${props.route}/${item._id}`"
			>
				<div class="card">
					<div>{{ item.name }}</div>
				</div>
			</nuxt-link>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	items: { type: Array, required: true },
	placeholder: { type: String, required: false, default: 'Search...' },
	route: { type: String, required: true },
});

const searchTerm = ref('');

const filteredItems = computed(() => {
	return props.items?.filter((item) =>
		item.name.toLowerCase().includes(searchTerm.value.toLowerCase())
	);
});
</script>
