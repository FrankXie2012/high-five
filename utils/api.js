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
		fn(res);
	}
}
module.exports = {
	ajax: ajax
}