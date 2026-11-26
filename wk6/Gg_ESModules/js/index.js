import { courses } from './data.js';
import { renderCourses } from './render.js';

const courseList = document.querySelector('#course-list');
const searchInput = document.querySelector('#search');

const searchCourses = (keyword) => {
	const key = keyword.trim().toLowerCase();

	if (key === '') {
		renderCourses(courseList, courses);
		return;
	}

	const result = courses.filter((course) => {
		const title = course.title.toLowerCase();
		const desc = course.desc.toLowerCase();
		return title.includes(key) || desc.includes(key);
	});

	renderCourses(courseList, result);
};

searchInput.addEventListener('input', () => {
	searchCourses(searchInput.value);
});

renderCourses(courseList, courses);
