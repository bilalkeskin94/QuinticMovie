<template>
	<div class="container">
		<div>
			<div v-if="route.params.type === 'character'">
				<h1>Character Details</h1>
				<p>Name : {{ item.name || 'Unkwown' }}</p>
				<p>Race :{{ item.race || 'Unkwown' }}</p>
				<p>Height :{{ item.height || 'Unkwown' }}</p>
				<p>Gender :{{ item.gender || 'Unkwown' }}</p>
				<p>Hair :{{ item.hair || 'Unkwown' }}</p>
				<p>Birth :{{ item.birth || 'Unkwown' }}</p>
				<p>Death :{{ item.death || 'Unkwown' }}</p>
				<p>Realm :{{ item.realm || 'Unkwown' }}</p>
				<p>Spouse :{{ item.spouse || 'Unkwown' }}</p>
				<p>WikiUrl :{{ item.wikiUrl || 'Unkwown' }}</p>
			</div>
			<div v-else>
				<h1>Movie Details</h1>
				<p>Name : {{ item.name || 'Unkwown' }}</p>
				<p>Minutes : {{ item.runtimeInMinutes || 'Unkwown' }}</p>
				<p>Budget $ : {{ item.budgetInMillions || 'Unkwown' }}</p>
				<p>
					Box Revenue $ : {{ item.boxOfficeRevenueInMillions || 'Unkwown' }}
				</p>
				<p>
					Academy Award Nominations :
					{{ item.academyAwardNominations || 'Unkwown' }}
				</p>
				<p>Academy Award Wins : {{ item.academyAwardWins || 'Unkwown' }}</p>
				<p>
					Rotten Tomatoes Score : {{ item.rottenTomatoesScore || 'Unkwown' }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import useIdsStore from '@/store/ids';

const runtimeConfig = useRuntimeConfig();

const { baseURL, apiSecret } = runtimeConfig.public;

const route = useRoute();
const store = useIdsStore();
useAsyncData(() =>
	store.fetchItem(baseURL, apiSecret, route.params.type, route.params.id)
);

const item = computed(() => store.item);
</script>
