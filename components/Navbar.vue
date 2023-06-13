<template>
	<nav class="navbar">
		<div class="container">
			<nuxt-link to="/" class="navbar-brand">Brand</nuxt-link>
			<div class="navbar-menu">
				<nuxt-link to="/" class="navbar-link">Movies</nuxt-link>
				<nuxt-link to="/characters" class="navbar-link">Characters</nuxt-link>
				<nuxt-link to="/quotes" class="navbar-link">Quotes</nuxt-link>
				<nuxt-link to="/chapters" class="navbar-link">Chapters</nuxt-link>
			</div>
		</div>
	</nav>
</template>

<style lang="scss">
.navbar {
	background-color: #333;
	color: #fff;
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px;
		.navbar-brand {
			font-size: 1.5em;
			font-weight: bold;
			color: #fff;
		}
		.navbar-menu {
			.navbar-link {
				color: #fff;
				margin-left: 15px;
				&:hover {
					color: lighten(#fff, 20%);
				}
			}
		}
	}
}
</style>
