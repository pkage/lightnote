new Vue({
	el: '#editor',
	data: {
		active: 'initial',
		output: ''
	},
	methods: {
		toggleView: function toggleView() {
			console.log('firing toggleView');
			this.output = marked(this.input);
			this.active = this.active == 'active' ? '' : 'active';
		},
		save: function save() {
			window.localStorage.setItem('text', this.input);
		}
	},
	init: function init() {
		console.log('init');
		var stored = window.localStorage.getItem('text');
		if (stored === undefined || stored === '') {
			console.log('localstorage empty');
			this.input = '# lightnote\n---\n\nmarkdown enabled notes\n\npress `escape` to view compiled note.\n\nnotes are saved automatically and will persist across refreshes.';
		} else {
			this.input = stored;
		}
	}

});