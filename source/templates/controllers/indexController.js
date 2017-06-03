var indexController = function(){

	var module = {};
	var credentials;

	module.init = function(){
    indexController.setupTemplates();

	};

	module.setupTemplates = function(){

		var itemTemplate = helpers.compileRactive({
			template: 'item',
			outlet: 'item',
			data: {},
			viewDetails: false
		});

		itemTemplate.on('viewToggle', function(){
			itemTemplate.toggle('viewDetails');
		});

		var apiKey;
		var shopName;

		$.ajax({
			url   : '/assets/info.json',
			async : false,
			type  : 'GET'
		}).done(function(data){
			var credentials = JSON.stringify(data);

			apiKey = data[0].apiKey;
			shopName = data[1].shopName;
		});

		$.ajax({
			url: "https://openapi.etsy.com/v2/shops/" + shopName + "/listings/active.js?api_key=" + apiKey + "&includes=MainImage&fields=url,price,title,shop_section_id,description&limit=100",
			dataType: 'jsonp',
			success: function(data){
				console.log(data);
				itemTemplate.set('result', data.results);
			},
		});

		var menuTemplate = helpers.compileRactive({
			template: 'menu',
			outlet: 'menu',
			data: {}
		});

		$.ajax({
      url: "https://openapi.etsy.com/v2/shops/" + shopName + "/sections.js?api_key=" + apiKey,
      dataType: 'jsonp',
      success: function(data){
      	menuTemplate.set('categories', data.results);
      },
    });


	};

  return module;
}();

$(document).ready(function() {
  indexController.init();
});
