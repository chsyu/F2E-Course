const shortContent = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus laborum labore est minima aut, illum facere earum consectetur placeat iste non ducimus ...<span class="more" id="more">more</span>';
const fullContent = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus laborum labore est minima aut, illum facere earum consectetur placeat iste non ducimus voluptate, dolores atque dignissimos fuga veritatis alias itaque harum? Voluptate quasi hic, soluta at possimus porro reprehenderit inventore aliquid perferendis deleniti aut esse. Labore quis corporis similique illum?<br><br><span class="collapse" id="collapse">▲</span>';

const content = document.querySelector('#content');
content.innerHTML = shortContent;

// #more 與 #collapse 是動態產生的元素，所以把事件委派給 document
document.addEventListener('click', function (e) {
	// 點擊 more 展開完整內容
	if (e.target.closest('#more')) {
		content.innerHTML = fullContent;
	}
	// 點擊向上箭頭收回到摘要內容
	if (e.target.closest('#collapse')) {
		content.innerHTML = shortContent;
	}
});
