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

  module.compileHandlebars = function(options, overwrite) {
    var template = document.querySelector('[data-template="' + options.template + '"]').innerHTML;

    var hbsTemplate = Handlebars.compile(template);
    var compiledTemplate = hbsTemplate(options.data ? options.data : {});

    if(!options.$outlet) {
      options.$outlet = $('[data-outlet="' + options.outlet + '"]');
    }

    if(overwrite) {
      options.$outlet.html($(compiledTemplate));
    } else {
      options.$outlet.append($(compiledTemplate));
    }


  };

  return module;
}();