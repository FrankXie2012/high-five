var appInstance = getApp();
var request = appInstance.globalData.api.ajax;
var wxCharts = require('../../utils/wxcharts-min.js');
var ringChart = null;
const {
	Actionsheet,
	extend
} = require('../../utils/zanUI/index');
Page(extend({}, Actionsheet, {
	data: {
		inSum: '',
		outSum: '',
		baseActionsheet: {
			show: false,
			cancelText: '关闭',
			closeOnClickOverlay: true,
			componentId: 'baseActionsheet',
			actions: [{
				name: '选项1',
				subname: '选项描述语1',
				className: 'action-class',
				loading: false
			}, {
				name: '选项2',
				subname: '选项描述语2',
				className: 'action-class',
				loading: false
			}, {
				name: '去分享',
				openType: 'share'
			}]
		}
	},
	onLoad: function() {
		var self = this;
		request({
			url: 'index/getCount'
		}, function(res) {
			self.setData({
				inSum: res.data.in.sum,
				outSum: res.data.out.sum
			});
			self.initRing(res.data);
		});
	},
	viewOut: function() {
		wx.navigateTo({
			url: '../viewDetails/index?type=out'
		});
	},
	viewIn: function() {
		wx.navigateTo({
			url: '../viewDetails/index?type=in'
		});
	},
	toggleActionsheet: function() {
		this.setData({
			'baseActionsheet.show': true
		});
	},
	onShareAppMessage() {
		return {
			title: 'ZanUI-WeApp',
			imageUrl: 'https://img.yzcdn.cn/public_files/2017/02/06/ee0ebced79a80457d77ce71c7d414c74.png'
		};
	},
	handleZanActionsheetCancel({
		componentId
	}) {
		this.setData({
			[`${componentId}.show`]: false
		});
	},
	handleZanActionsheetClick({
		componentId,
		index
	}) {
		console.log(`item index ${index} clicked`);

		// 如果是分享按钮被点击, 不处理关闭
		if (index === 2) {
			return;
		}

		this.setData({
			[`${componentId}.actions[${index}].loading`]: true
		});

		setTimeout(() => {
			this.setData({
				[`${componentId}.show`]: false,
				[`${componentId}.actions[${index}].loading`]: false
			});
		}, 1500);
	},
	touchHandler: function(e) {
		console.log(ringChart.getCurrentDataIndex(e));
	},
	updateData: function() {
		ringChart.updateData({
			title: {
				name: '80%'
			},
			subtitle: {
				color: '#ff0000'
			}
		});
	},
	initRing: function(data) {
		var self = this;
		var _series = [];
		var _negative = appInstance.globalData.colors.negative;
		var _positive = appInstance.globalData.colors.positive;
		var windowWidth = 320;
		try {
			var res = wx.getSystemInfoSync();
			windowWidth = res.windowWidth;
		} catch (e) {
			console.error('getSystemInfoSync failed!');
		}

		// 支出
		for (var i = 0; i < data.out.children.length; i++) {
			var _key = Object.keys(data.out.children[i])[0]
			var _item = {
				name: _key,
				data: parseInt(data.out.children[i][_key]),
				color: _negative[i]
			};
			_series.push(_item);
		}

		// 收入
		for (var i = 0; i < data.in.children.length; i++) {
			var _key = Object.keys(data.in.children[i])[0]
			var _item = {
				name: _key,
				data: parseInt(data.in.children[i][_key]),
				color: _positive[i]
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
				name: '￥' + (self.data.inSum - self.data.outSum),
				color: '#7cb5ec',
				fontSize: 25
			},
			subtitle: {
				name: '净收入',
				color: '#666666',
				fontSize: 15
			},
			series: _series,
			disablePieStroke: false,
			width: windowWidth,
			height: 280,
			dataLabel: false,
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
}));