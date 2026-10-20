// 三元運算子：條件 ? 真的結果 : 假的結果
const score1 = 80;
const score2 = 45;

document.querySelector('#result1').textContent =
	score1 >= 60 ? '及格' : '不及格';

document.querySelector('#result2').textContent =
	score2 >= 60 ? '及格' : '不及格';
