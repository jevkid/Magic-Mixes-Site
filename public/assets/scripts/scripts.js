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
var indexController = function(){

	var module = {};

	module.init = function(){
    indexController.setupTemplates();
    console.log('setup');
	};

	module.setupTemplates = function(){

		var template = helpers.compileRactive({
			template: 'index',
			outlet: 'index',
			data: {}
		});
    
    var apiKey = 'tz1wjg6wvmvezr1o3xv4rom6';
    var shopName = 'VelvetFoxStudio';

    $.ajax({
      url: "https://openapi.etsy.com/v2/shops/" + shopName + "/listings/active.js?api_key=" + apiKey + "&includes=MainImage&fields=url,price,title,shop_section_id,description&limit=100",
      dataType: 'jsonp',
      success: function(response){
        template.set('test', response);
        console.log(template.get('test'));
      },
    });
	};

  return module;
}();

$(document).ready(function() {
  indexController.init();
});