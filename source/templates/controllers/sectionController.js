var sectionController = function(){

	var module = {};

	module.init = function(){
    sectionController.setupTemplates();
	};

	module.setupTemplates = function(){
		var apiKey = '<<KEY>>';
		var shopName = '<<NAME>>';

		var template = helpers.compileRactive({
			template: 'dropdown',
			outlet: 'dropdown',
			data: {}
		});

		template.on('searchText', function(){
			template.toggle('searchInput');
		});

		template.on('searchProducts', function(target){
			window.location = window.location.origin + '/search?' + template.get('query');
		});

    $.ajax({
      url: "https://openapi.etsy.com/v2/shops/" + shopName + "/sections.js?api_key=" + apiKey,
      dataType: 'jsonp',
      success: function(response){
        template.set('sections', response.results);
      },
    });
    
	};

  return module;
}();

$(document).ready(function() {
  sectionController.init();
});
