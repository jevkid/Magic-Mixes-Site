var itemsController = function(){

	var module = {};

	module.init = function(){
    itemsController.main();
    itemsController.featured();
    itemsController.search();
	};

	module.main = function(){
		var apiKey = '<<KEY>>';
		var shopName = '<<NAME>>';

		var template = helpers.compileRactive({
			template: 'items',
			outlet: 'items',
			data: {
				apiKey: '<<KEY>>',
				shopName: '<<NAME>>'
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
		var apiKey = '<<KEY>>';
		var shopName = '<<NAME>>';

		var featuredTemplate = helpers.compileRactive({
			template: 'featured',
			outlet: 'featured',
			data: {
				apiKey: '<<KEY>>',
				shopName: '<<NAME>>'
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
		var apiKey = '<<KEY>>';
		var shopName = '<<NAME>>';

		var searchTemplate = helpers.compileRactive({
			template: 'search',
			outlet: 'search',
			data: {
				apiKey: '<<KEY>>',
				shopName: '<<NAME>>'
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
