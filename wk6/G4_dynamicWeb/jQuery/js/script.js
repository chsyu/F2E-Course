$(document).ready(function(){

	const shortContent = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus laborum labore est minima aut, illum facere earum consectetur placeat iste non ducimus ...<span class="more" id="more">more</span>';
	const fullContent = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus laborum labore est minima aut, illum facere earum consectetur placeat iste non ducimus voluptate, dolores atque dignissimos fuga veritatis alias itaque harum? Voluptate quasi hic, soluta at possimus porro reprehenderit inventore aliquid perferendis deleniti aut esse. Labore quis corporis similique illum?<br><br><span class="collapse" id="collapse">▲</span>';

	$('#content').html(shortContent);

	// 點擊 more 展開完整內容
	$(document).on('click', '#more', function() {
		$('#content').html(fullContent);
	});

	// 點擊向上箭頭收回到摘要內容
	$(document).on('click', '#collapse', function() {
		$('#content').html(shortContent);
	});

});
