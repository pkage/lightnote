new Vue({
	el: '#editor',
	data: {
		active: 'initial',
		output: ''
	},
	methods: {
		toggleView: function() {
			console.log('firing toggleView');
			this.output = marked(this.input);
			this.active = (this.active == 'active') ? '' : 'active';
		},
		save: function() {
			window.localStorage.setItem('text', this.input);
		}
	},
	init: function() {
		console.log('init');
		var stored = window.localStorage.getItem('text');
		if (stored === undefined || stored === '') {
			console.log('localstorage empty');
			this.input = '# lightnote\n---\n\nmarkdown enabled notes\n\npress `escape` to view compiled note.\n\nnotes are saved automatically and will persist across refreshes.';
		} else {
			this.input = stored;
		}

		this.output = marked(this.input);

	}

})
