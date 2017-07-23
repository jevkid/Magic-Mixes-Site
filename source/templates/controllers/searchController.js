var searchController = function(){

	var module = {};

	module.init = function(){
    searchController.setupTemplates();
	};

	module.setupTemplates = function(){
		var apiKey = '<<KEY>>';
		var shopName = '<<NAME>>';

		var template = helpers.compileRactive({
			template: 'search',
			outlet: 'search',
			data: {}
		});

		template.on('viewToggle', function(target){
			template.toggle(target.keypath + '.viewDetails');
		});

		var query = window.location.search.split('?')[1];
    $.ajax({
      url: "https://openapi.etsy.com/v2/shops/" + shopName + "/listings/active.js?api_key=" + apiKey + "&keywords=" + query + "&includes=MainImage&fields=url,price,title,shop_section_id,description&limit=100",
      dataType: 'jsonp',
      success: function(response){
        template.set('items', response);
      },
    });

    template.on('viewAll', function(){
    	$.ajax({
	      url: "https://openapi.etsy.com/v2/shops/" + shopName + "/listings/active.js?api_key=" + apiKey + "&includes=MainImage&fields=url,price,title,shop_section_id,description&limit=100",
	      dataType: 'jsonp',
	      success: function(response){
	      	console.log(response);
	        template.set('items', response);
	      },
	    });
    });

	};

  return module;
}();

$(document).ready(function() {
  searchController.init();
});
