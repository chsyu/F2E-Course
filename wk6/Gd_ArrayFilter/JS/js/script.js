// filter 不會改到原陣列，會回傳「符合條件」的新陣列
const courses = [
	{ name: 'HTML5 基礎', hours: 8, level: 'beginner' },
	{ name: 'CSS3 排版', hours: 10, level: 'beginner' },
	{ name: 'JavaScript 入門', hours: 12, level: 'beginner' },
	{ name: '響應式網頁設計', hours: 14, level: 'intermediate' },
	{ name: '前端專案實作', hours: 20, level: 'intermediate' },
	{ name: '效能與優化', hours: 6, level: 'advanced' }
];

const courseList = document.querySelector('#course-list');

// filter 後常搭配 map 渲染；join 把字串陣列合成一段 HTML
const renderCourses = function (items) {
	const htmlList = items.map(function (course) {
		return `
			<li class="list__item">
				<span class="list__name">${course.name}</span>
				<span class="list__meta">${course.hours} 小時 · ${course.level}</span>
			</li>
		`;
	});
	courseList.innerHTML = htmlList.join('');
};

const applyFilter = function (type) {
	let result = courses;

	if (type === 'long') {
		result = courses.filter(function (course) {
			return course.hours >= 10;
		});
	}

	if (type === 'beginner') {
		result = courses.filter(function (course) {
			return course.level === 'beginner';
		});
	}

	renderCourses(result);
};

document.querySelectorAll('.btn').forEach(function (btn) {
	btn.addEventListener('click', function () {
		applyFilter(btn.dataset.filter);
	});
});

// 一開始顯示全部
renderCourses(courses);
