let API_HOST = "http://xxx.com/xxx";
let DEBUG = true; //切换数据入口
var Mock = require('mock-min.js');

function ajax(param, fn) {
	if (!DEBUG) {
		wx.request({
			url: config.API_HOST + param.url,
			method: param.method ? param.method : 'post',
			data: param.data,
			header: header ? header : {
				"Content-Type": "application/json"
			},
			success: function(res) {
				fn(res);
			}
		});
	} else {
		// 模拟数据
		var res;

		// 支出收入数据
		if (param.url === 'index/getCount') {
			res = Mock.mock({
				msg: '获取成功',
				state: 'success',
				data: {
					'in': {
						'sum': '8687.68',
						'children': [{
								'工资': '5000'
							},
							{
								'奖金': '3000'
							},
							{
								'投资': '4000'
							},
							{
								'其他': '2000'
							},
						]
					},
					'out': {
						'sum': '78687.68',
						'children': [{
								'食品': '2000'
							},
							{
								'购物': '1000'
							},
							{
								'住房': '1000'
							},
							{
								'交通': '1020'
							},
							{
								'学习': '2990'
							},
							{
								'通讯': '2000'
							},
							{
								'运动': '4000'
							},
							{
								'医疗': '3000'
							},
							{
								'其他': '2005'
							}
						]
					}
				}
			});
		}

		// 支出 详情
		if (param.url === 'details/out') {
			res = Mock.mock({
				msg: '获取成功',
				state: 'success',
				data: [{
					'id': '0001',
					'img': 'https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg',
					'title': '牛肉面',
					'price': '15.00',
					'time': '2018-02-20 20:23:07',
					'type': '食品'
				}, {
					'id': '0002',
					'img': 'https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg',
					'title': '牛肉拉面',
					'price': '15.00',
					'time': '2018-02-20 18:39:12',
					'type': '食品'
				}, {
					'id': '0003',
					'img': 'https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg',
					'title': '胖哥俩肉蟹煲',
					'price': '185.00',
					'time': '2018-02-20 20:23:07',
					'type': '食品'
				}, {
					'id': '0004',
					'img': 'https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg',
					'title': '话费',
					'price': '100.00',
					'time': '2018-02-20 18:39:12',
					'type': '通讯'
				}, {
					'id': '0005',
					'img': 'https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg',
					'title': '宝龙球场AA球费',
					'price': '20.00',
					'time': '2018-02-20 20:23:07',
					'type': '饮食'
				}, {
					'id': '0006',
					'img': 'https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg',
					'title': 'ultra boost',
					'price': '849.00',
					'time': '2018-02-20 18:39:12',
					'type': '服装'
				}, {
					'id': '0007',
					'img': 'https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg',
					'title': '房租',
					'price': '1250.00',
					'time': '2018-02-20 20:23:07',
					'type': '住房'
				}, {
					'id': '0008',
					'img': 'https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg',
					'title': '公交卡充值',
					'price': '100.00',
					'time': '2018-02-20 18:39:12',
					'type': '交通'
				}]
			});
		}

		// 支出 详情
		if (param.url === 'details/in') {
			res = Mock.mock({
				msg: '获取成功',
				state: 'success',
				data: [{
					'id': '0001',
					'img': 'https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg',
					'title': '3月工资',
					'price': '9302.20',
					'time': '2018-03-30 15:30:00',
					'type': '工资'
				}]
			});
		}

		fn(res);
	}
}
module.exports = {
	ajax: ajax
}