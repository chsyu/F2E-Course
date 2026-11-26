// 僅在 render.js 內部使用，不需要 export
const cardTemplate = (course) => `
	<article class="card">
		<img class="card__image" src="${course.image}" alt="${course.title}">
		<div class="card__body">
			<span class="card__badge">${course.isOpen ? '開放報名' : '已額滿'}</span>
			<h2 class="card__title">${course.title}</h2>
			<p class="card__desc">${course.desc}</p>
		</div>
	</article>
`;

export const renderCourses = (container, items) => {
	if (items.length === 0) {
		container.innerHTML = '<p class="empty">找不到符合的課程</p>';
		return;
	}

	container.innerHTML = items.map(cardTemplate).join('');
};
