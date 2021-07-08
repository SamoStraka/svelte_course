<script>

	//imports
	import {tweened} from 'svelte/motion';
	import {cubicOut, circIn, circOut} from 'svelte/easing';
	import {shuffleArray} from "./functions";

	//components
	import Wave from './components/Wave.svelte';
	import TheBook from './components/TheBook.svelte';

	// vars
	let books = localStorage.getStuff('unreadBooks');
	let audio = new Audio('assets/public_assets_dsshotgn.wav');
	let bookTitle = "Your mom likes cocks";
	let waving = true;
	let animationEnded = false;
	let bookHasBeenRead = false;

	//countdown
	const progress = tweened(0, {
		duration: 2500,
		easing: circOut
	})

	//funcitons
	const chooseBook = () => {
		books = localStorage.getStuff('unreadBooks');
		shuffleArray(books);

		animationEnded = false;
		bookHasBeenRead = false;

		let index = $progress === 0 ? books.length - 1 : 0;

		progress.set(index).then(() => {
			animationEnded = true;
			audio.play();
		});
	}


	const readBook = () => {
		let readBooks = localStorage.getStuff('readBooks');
		let unreadBooks = localStorage.getStuff('unreadBooks');

		bookHasBeenRead = true;

		readBooks.push(chosenBook);
		unreadBooks = unreadBooks.filter(item => item.id !== chosenBook.id);

		localStorage.setStuff('readBooks', readBooks);
		localStorage.setStuff('unreadBooks', unreadBooks);

	}

	// computed
	$: chosenBook = books[Math.floor($progress)] || books[0];
</script>

<header>
	<h1>Iam here to bake some cookies</h1>
	<TheBook chosenBook="{chosenBook}" animationEnded="{animationEnded}" {bookHasBeenRead}></TheBook>
	<label for="waving">
		<input type="checkbox" id="waving" bind:checked={waving}>
		waving
	</label>
</header>

<main>
	<h2>this is Title over here</h2>
	<!--<ul>
		{#each books as book}
			<li>
				{JSON.stringify(book)}
			</li>
		{/each}
	</ul>-->
	<section class="controls">
		<img on:click={chooseBook} src="/assets/gun.png" alt="his awesome gun">
		<img on:click={readBook} src="/assets/anchor.png" alt="wow this is heavy anchor">
	</section>
</main>

<footer class="water">
	<Wave where="back" animation="big" {waving}></Wave>
	<Wave where="middle" animation="tiny" {waving}></Wave>
	<Wave where="front" animation="small" {waving}></Wave>
	<img src="/assets/hemingway.png" alt="ernesto" />
</footer>

<style>
	progress {
		width: 90%;
	}

	label {
		position: absolute;
		top: 1em;
		left: 1em;
		font-size: 0.7em;
	}

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>