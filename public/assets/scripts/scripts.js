var helpers = function(){
	var module = {};

	module.compileRactive = function(options) {
    var template = $('[data-template="' + options.template + '"]').html();

    return new Ractive({
      el: '[data-outlet="' + options.outlet + '"]',
      template: template,
      data: options.data ? options.data : {},
      computed: options.computed ? options.computed : {}
    });
  };
  return module;
}();
var itemsController = function(){

	var module = {};

	module.init = function(){
    itemsController.setupTemplates();
	};

	module.setupTemplates = function(){
		var apiKey = 'tz1wjg6wvmvezr1o3xv4rom6';
		var shopName = 'VelvetFoxStudio';

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

var searchController = function(){

	var module = {};

	module.init = function(){
    searchController.setupTemplates();
	};

	module.setupTemplates = function(){
		var apiKey = 'tz1wjg6wvmvezr1o3xv4rom6';
		var shopName = 'VelvetFoxStudio';

		var template = helpers.compileRactive({
			template: 'search',
			outlet: 'search',
			data: {}
		});

		var query = window.location.search.split('?')[1];
    $.ajax({
      url: "https://openapi.etsy.com/v2/shops/" + shopName + "/listings/active.js?api_key=" + apiKey + "&keywords=" + query + "&includes=MainImage&fields=url,price,title,shop_section_id,description&limit=100",
      dataType: 'jsonp',
      success: function(response){
        template.set('items', response);
      },
    });

	};

  return module;
}();

$(document).ready(function() {
  searchController.init();
});

var sectionController = function(){

	var module = {};

	module.init = function(){
    sectionController.setupTemplates();
	};

	module.setupTemplates = function(){
		var apiKey = 'tz1wjg6wvmvezr1o3xv4rom6';
		var shopName = 'VelvetFoxStudio';

		var template = helpers.compileRactive({
			template: 'dropdown',
			outlet: 'dropdown',
			data: {}
		});

		template.on('searchText', function(){
			template.toggle('searchInput');
		});

		template.on('searchProducts', function(target){
			console.log(target);
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
