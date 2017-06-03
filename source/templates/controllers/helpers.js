var helpers = function(){
	var module = {};

	module.compileRactive = function(name) {
    var template = $('[data-template="' + name.template + '"]').html();

    return new Ractive({
      el: '[data-outlet="' + name.outlet + '"]',
      template: template,
      data: name.data ? name.data : {},
      computed: name.computed ? name.computed : {}
    });
  };

  return module;
}();
