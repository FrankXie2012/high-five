var API = require('/utils/api.js');

App({
	globalData: {
		api: API,
		colors: {
			'negative': ['#ff0000', '#ff0022', '#ff0044', '#ff0066', '#ff0088', '#ff00aa', '#ff00cc', '#ff00ee', '#dd00ff'],
			'positive': ['#0000ff', '#0000cc', '#000099', '#000066']
		}
	},
});