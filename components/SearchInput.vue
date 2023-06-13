<template>
	<div>
		<input type="text" v-model="searchTerm" :placeholder="placeholder" />
		<div v-for="item in filteredItems" :key="item._id">
			<nuxt-link :to="`/${props.route}/${item._id}`"
				>{{ item.name }}
			</nuxt-link>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
	items: { type: Array, required: true },
	placeholder: { type: String, required: false, default: 'Search...' },
	route: { type: String, required: true },
});

const searchTerm = ref('');

const filteredItems = computed(() => {
	return props.items.filter((item) =>
		item.name.toLowerCase().includes(searchTerm.value.toLowerCase())
	);
});
</script>
