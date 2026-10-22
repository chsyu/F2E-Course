// forEach：只遍歷做事，沒有回傳新陣列
const fruits = ['蘋果', '香蕉', '橘子'];
let text = '';

fruits.forEach(function (fruit) {
	text = text + fruit + ' ';
});

document.querySelector('#foreach-result').innerHTML = `
	<p>你處理了：${text}</p>
`;

// map：每一項轉換後，回傳一個新陣列（原陣列不會被改掉）
const numbers = [1, 2, 3, 4];
const newContent = numbers.map(function (n) {
	return `<p>數字 ${n} 乘以 2 等於 ${n * 2}</p>`;
});
document.querySelector('#map-after').innerHTML = newContent.join('');
