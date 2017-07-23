var itemsController = function(){

	var module = {};

	module.init = function(){
    itemsController.setupTemplates();
	};


	module.setupTemplates = function(){
		var apiKey = '<<KEY>>';
		var shopName = '<<NAME>>';

		var template = helpers.compileRactive({
			template: 'items',
			outlet: 'items',
			data: {}
		});

		template.on('viewToggle', function(target){
			template.toggle(target.keypath + '.viewDetails');
		});

		var category = window.location.search.split('?')[1];
    $.ajax({
      url: "https://openapi.etsy.com/v2/shops/" + shopName + "/listings/active.js?api_key=" + apiKey + "&shop_section_id=" + category + "&includes=MainImage&fields=url,price,title,shop_section_id,description&limit=100",
      dataType: 'jsonp',
      success: function(response){
        template.set('items', response);
      },
    });

	};

  return module;
}();

$(document).ready(function() {
  itemsController.init();
});
