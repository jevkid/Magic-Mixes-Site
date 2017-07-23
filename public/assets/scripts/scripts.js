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
    itemsController.main();
    itemsController.featured();
    itemsController.search();
	};

	module.main = function(){
		var apiKey = 'tz1wjg6wvmvezr1o3xv4rom6';
		var shopName = 'MagicMixes';

		var template = helpers.compileRactive({
			template: 'items',
			outlet: 'items',
			data: {
				apiKey: 'tz1wjg6wvmvezr1o3xv4rom6',
				shopName: 'MagicMixes'
			}
		});

		var category = window.location.search.split('?')[1];
    $.ajax({
      url: "https://openapi.etsy.com/v2/shops/" + template.get('shopName') + "/listings/active.js?api_key=" + template.get('apiKey') + "&shop_section_id=" + category + "&includes=MainImage&fields=url,price,title,shop_section_id,description&limit=100",
      dataType: 'jsonp',
      success: function(response){
        template.set('items', response);
      },
    });

    template.on('loadImages', function(target, listingId){
    	template.set('count', 0);
    	$.ajax({
	      url: "https://openapi.etsy.com/v2/listings/" + listingId + "/images.js?api_key=" + template.get('apiKey'),
	      dataType: 'jsonp',
	      success: function(response){
	        template.set('images', response.results);
	        template.set('max', response.results.length-1);
	      },
	    });
    });

    template.on('next', function(){
    	var max = template.get('max');
    	var count = template.get('count');
    	if(count === (max - 1)){
    		template.set('count', 0);
    	} else {
    		template.add('count');    	
    	}
    });

    template.on('previous', function(){
    	var max = template.get('max');
    	var count = template.get('count');
    	if(count === 0){
    		template.set('count', max);
    	} else {
    		template.subtract('count');    	
    	}
    });

	};

	module.featured = function(){
		var apiKey = 'tz1wjg6wvmvezr1o3xv4rom6';
		var shopName = 'MagicMixes';

		var featuredTemplate = helpers.compileRactive({
			template: 'featured',
			outlet: 'featured',
			data: {
				apiKey: 'tz1wjg6wvmvezr1o3xv4rom6',
				shopName: 'MagicMixes'
			}
		});

    $.ajax({
      url: "https://openapi.etsy.com/v2/shops/" + featuredTemplate.get('shopName') + "/listings/featured.js?api_key=" + featuredTemplate.get('apiKey') + "&includes=MainImage&fields=url,price,title,shop_section_id,description&limit=4",
      dataType: 'jsonp',
      success: function(response){
        console.log(response);
        featuredTemplate.set('items', response);
      },
    });

    featuredTemplate.on('loadImages', function(target, listingId){
    	featuredTemplate.set('count', 0);
    	$.ajax({
	      url: "https://openapi.etsy.com/v2/listings/" + listingId + "/images.js?api_key=" + featuredTemplate.get('apiKey'),
	      dataType: 'jsonp',
	      success: function(response){
	        featuredTemplate.set('images', response.results);
	        featuredTemplate.set('max', response.results.length-1);
	      },
	    });
    });

  };

  module.search = function(){
		var apiKey = 'tz1wjg6wvmvezr1o3xv4rom6';
		var shopName = 'MagicMixes';

		var searchTemplate = helpers.compileRactive({
			template: 'search',
			outlet: 'search',
			data: {
				apiKey: 'tz1wjg6wvmvezr1o3xv4rom6',
				shopName: 'MagicMixes'
			}
		});

		searchTemplate.on('viewToggle', function(target){
			searchTemplate.toggle(target.keypath + '.viewDetails');
		});

		var query = window.location.search.split('?')[1];
    $.ajax({
      url: "https://openapi.etsy.com/v2/shops/" + searchTemplate.get('shopName') + "/listings/active.js?api_key=" + searchTemplate.get('apiKey') + "&keywords=" + query + "&includes=MainImage&fields=url,price,title,shop_section_id,description&limit=100",
      dataType: 'jsonp',
      success: function(response){
        searchTemplate.set('items', response);
      },
    });

    searchTemplate.on('viewAll', function(){
    	$.ajax({
	      url: "https://openapi.etsy.com/v2/shops/" + searchTemplate.get('shopName') + "/listings/active.js?api_key=" + searchTemplate.get('apiKey') + "&includes=MainImage&fields=url,price,title,shop_section_id,description&limit=100",
	      dataType: 'jsonp',
	      success: function(response){
	      	console.log(response);
	        searchTemplate.set('items', response);
	      },
	    });
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
		var shopName = 'MagicMixes';

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

var sectionController = function(){

	var module = {};

	module.init = function(){
    sectionController.setupTemplates();
	};

	module.setupTemplates = function(){
		var apiKey = 'tz1wjg6wvmvezr1o3xv4rom6';
		var shopName = 'MagicMixes';

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
