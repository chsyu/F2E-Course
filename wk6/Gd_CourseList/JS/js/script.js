const courses = [
	{
		id: 1,
		title: 'HTML5 基礎',
		desc: '認識語意標籤、表單與多媒體元素，建立靜態網頁骨架。',
		image: 'images/fig1.jpg'
	},
	{
		id: 2,
		title: 'CSS3 排版',
		desc: '學習盒模型、Flex 與 Grid，排出清楚的頁面結構。',
		image: 'images/fig2.jpg'
	},
	{
		id: 3,
		title: 'JavaScript 入門',
		desc: '變數、函式與 DOM 操作，讓網頁開始有互動。',
		image: 'images/fig3.jpg'
	},
	{
		id: 4,
		title: '陣列與篩選',
		desc: '使用 forEach、map、filter 處理資料並動態渲染畫面。',
		image: 'images/fig4.jpg'
	},
	{
		id: 5,
		title: '響應式網頁設計',
		desc: '媒體查詢與流動版面，讓同一套內容適配手機與桌機。',
		image: 'images/fig5.jpg'
	},
	{
		id: 6,
		title: '前端專案實作',
		desc: '整合 HTML、CSS、JS，完成一個小型動態內容網站。',
		image: 'images/fig6.jpg'
	}
];

const courseList = document.querySelector('#course-list');
const searchInput = document.querySelector('#search');

const cardTemplate = function (course) {
	return `
		<article class="card">
			<img class="card__image" src="${course.image}" alt="${course.title}">
			<div class="card__body">
				<h2 class="card__title">${course.title}</h2>
				<p class="card__desc">${course.desc}</p>
			</div>
		</article>
	`;
};

const renderCourses = function (items) {
	if (items.length === 0) {
		courseList.innerHTML = '<p class="empty">找不到符合的課程</p>';
		return;
	}

	// filter 之後用 map 轉成卡片 HTML，再一次寫入頁面
	courseList.innerHTML = items.map(cardTemplate).join('');
};

const searchCourses = function (keyword) {
	const key = keyword.trim().toLowerCase();

	if (key === '') {
		renderCourses(courses);
		return;
	}

	const result = courses.filter(function (course) {
		const title = course.title.toLowerCase();
		const desc = course.desc.toLowerCase();
		return title.includes(key) || desc.includes(key);
	});

	renderCourses(result);
};

searchInput.addEventListener('input', function () {
	searchCourses(searchInput.value);
});

renderCourses(courses);
