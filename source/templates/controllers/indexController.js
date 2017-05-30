var indexController = function(){

	var module = {};
	var credentials;

	module.init = function(){
    indexController.setupTemplates();

	};

	module.setupTemplates = function(){

		var template = helpers.compileRactive({
			template: 'item',
			outlet: 'item',
			data: {},
			apiKey: helpers.loadFile('apiKey'),
			shopName: helpers.loadFile('shopName')
		});

		console.log(template.get('apiKey'));

    var apiKey = template.get('apiKey');
    var shopName = template.get('shopName');

    $.ajax({
      url: "https://openapi.etsy.com/v2/shops/" + shopName + "/listings/active.js?api_key=" + apiKey + "&includes=MainImage&fields=url,price,title,shop_section_id,description&limit=100",
      dataType: 'jsonp',
      success: function(data){
        template.set('result', data.results);
      },
    });
	};

  return module;
}();

$(document).ready(function() {
  indexController.init();
});