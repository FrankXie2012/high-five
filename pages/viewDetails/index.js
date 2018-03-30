var appInstance = getApp();
var request = appInstance.globalData.api.ajax;
var wxCharts = require('../../utils/wxcharts-min.js');
var ringChart = null;
var now = new Date();
var currentMonth = now.getFullYear() + '-' + (now.getMonth() + 1)
Page({
	data: {
		sum: 0,
		type: '',
		date: currentMonth,
		cards: []
	},
	onLoad: function(opts) {
		this.setData({
			type: opts.type
		});
		this.initPage();
	},
	initPage: function() {
		var self = this;
		// 获取环状图数据
		request({
			url: 'index/getCount',
			data: {
				date: self.data.date
			}
		}, function(res) {
			var _sum = 0;
			if (self.data.type === 'out') _sum = res.data.out.sum;
			if (self.data.type === 'in') _sum = res.data.in.sum;
			self.setData({
				sum: _sum
			});
			self.initRing(res.data);
		});

		// 获取卡片数据
		request({
			url: 'details/' + self.data.type,
			data: {
				page: 1,
				date: self.data.date
			}
		}, function(res) {
			self.setData({
				cards: res.data
			});
		});
	},
	bindDateChange: function(e) {
		this.setData({
			date: e.detail.value
		});
		this.initPage()
	},
	initRing: function(data) {
		var self = this;
		var _series = [];
		var _data = [];
		var _color = '';
		var _type = '';
		var windowWidth = 320;
		try {
			var res = wx.getSystemInfoSync();
			windowWidth = res.windowWidth;
		} catch (e) {
			console.error('getSystemInfoSync failed!');
		}

		if (self.data.type === 'out') {
			_data = data.out;
			_color = '#ff0066';
			_type = '支出';
		}

		if (self.data.type === 'in') {
			_data = data.in;
			_color = '#4b0';
			_type = '收入';
		}

		if (!_data.children) return;
		for (var i = 0; i < _data.children.length; i++) {
			var _key = Object.keys(_data.children[i])[0]
			var _item = {
				name: _key,
				data: parseInt(_data.children[i][_key])
			};
			_series.push(_item);
		}

		ringChart = new wxCharts({
			animation: true,
			canvasId: 'ringCanvas',
			type: 'ring',
			extra: {
				ringWidth: 25,
				pie: {
					offsetAngle: -45
				}
			},
			title: {
				name: '￥' + self.data.sum,
				color: _color,
				fontSize: 15
			},
			subtitle: {
				name: '总' + _type,
				color: '#666666',
				fontSize: 14
			},
			series: _series,
			disablePieStroke: false,
			width: windowWidth,
			height: 280,
			dataLabel: true,
			legend: true,
			background: '#f5f5f5',
			padding: 0
		});
		ringChart.addEventListener('renderComplete', () => {
			console.log('renderComplete');
		});
		setTimeout(() => {
			ringChart.stopAnimation();
		}, 500);

	}
})