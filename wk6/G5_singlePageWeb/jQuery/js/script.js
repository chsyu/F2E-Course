$(document).ready(function(){

	// dynamic Web
	$("#home").click(function(){
		$("#main-area").html(
      `<p>
			This is the main area (or column). Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
			incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
			nisi
			ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
			eu
			fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
			anim id est laborum.
		</p>`
    );
	});
	$("#about").click(function(){
		$("#main-area").html(
      `<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia qui, possimus vero in debitis reiciendis libero consectetur harum! Sed id blanditiis ad adipisci porro facere, tempore repudiandae eius aperiam, accusamus nesciunt autem magni nostrum, repellat corporis animi veritatis praesentium exercitationem qui perspiciatis voluptate! Error unde eos dignissimos qui illum adipisci officiis et sequi ab quibusdam magnam quam porro possimus, soluta quisquam odit optio maiores provident? Reprehenderit rerum exercitationem quibusdam nam pariatur delectus unde quia aspernatur iusto laboriosam? Autem, quo sed!
		</p>`
    );
	});

});
