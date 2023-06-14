<template>
	<div>
		<input type="text" v-model="searchTerm" :placeholder="placeholder" />
		<div class="grid">
			<nuxt-link
				v-for="item in filteredItems"
				:key="item._id"
				:to="`/${props.route}/${item._id}`"
			>
				<div class="card">
					<div>{{ item.name }}</div>
					<div>{{ item.race }}</div>
					<div>{{ item.gender }}</div>
					<div>{{ item.spouse }}</div>
					<div>{{ item.birth }}</div>
					<div>{{ item.death }}</div>
					<div>{{ item.realm }}</div>
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
	return props.items.filter((item) =>
		item.name.toLowerCase().includes(searchTerm.value.toLowerCase())
	);
});
</script>

<style lang="scss">
.grid {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
}

.card {
	border: 1px solid black;
	padding: 1rem;
	margin: 1rem;
	flex: 1 1 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	min-height: 200px;
	border-radius: 20px;
}

input {
	width: 100%;
	padding: 1rem;
	border-radius: 20px;
	border: 1px solid black;
	margin-bottom: 1rem;
}
</style>
