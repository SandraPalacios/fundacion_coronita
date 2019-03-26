(function ($) {

	$.fn.comboSelect = function (options, onSelectCallback) {
		return this.each(function () {
			var context = $(this);
			if (typeof onSelectCallback === 'function') {
				context.data('selectCallback', onSelectCallback);
			} else if (typeof context.data('selectCallback') !== 'function') {
				context.data('selectCallback', function () {});
			}
			context.data('options', options);
			context.data('selected', null);
			context.find('.list-result').html(Mustache.to_html($.fn.comboSelect.template, {
				items: options
			}));

			var _optionSelect = context.find(".option-select");
			_optionSelect.data('open', false);
			_optionSelect.removeAttr('open');
			_optionSelect.find(".select-title").click(function () {
				if (!_optionSelect.data('open')) {
					$.fn.showOptions(_optionSelect);
				} else {
					$.fn.hideOptions(_optionSelect);
				}
			});
			
			_optionSelect.find("li").click(function () {
				var $liSelected = $(this);
				var _options = context.data('options');
				if(context.data('selected') == null || $liSelected.attr('data-id') != context.data('selected').id){
					for (var i = 0; i < _options.length; i++) {
						var element = _options[i];
						if (element.id == $liSelected.attr('data-id')) {
							context.data('selected', element);
							context.removeComboError();
							context.find(".option-text").removeClass("center");
							context.find(".selected-option").text(element.name);
							context.addClass("noempty");
							$.fn.hideOptions(_optionSelect);
							context.data('selectCallback')(element);
							break;
						}
					}
				}
			});
			context.data("inicializate", true);
			if($(document).data("comboselectatached")==undefined){
				$(document).click(function(event) {
					if (!$(event.target).hasClass("sl")) {
						$formOpened = $(".form-group-select .option-select[open]");
						if ($formOpened.length != 0) {
							$.fn.hideOptions($formOpened);
						}
					}
				});
				$(document).data("comboselectatached", true);
			}
		});
	};

	$.fn.showOptions = function (_optionSelect) {
		if (_optionSelect.hasClass("disabled")) return;
		$.fn.hideOptions($(".form-group-select .option-select[open]").not(_optionSelect));
		_optionSelect.find("ul").slideDown();
		_optionSelect.data("open", true);
		_optionSelect.attr('open','');
		_optionSelect.find(".select-title .bbva-icon").css({
			'transform': 'rotate(180deg)'
		});
	};

	$.fn.selectOptionId = function(id){
		context = this;
		var _options = context.data('options');
		for (var i = 0; i < _options.length; i++) {
			var element = _options[i];
			if (element.id == id) {
				console.log("set selected option ",element);
				context.data('selected', element);
				context.removeComboError();
				context.find(".option-text").removeClass("center");
				context.find(".selected-option").text(element.name);
				context.data('selectCallback')(element);
				break;
			}
		}
	};

	$.fn.selectOptionName = function(name){
		context = this;
		var _options = context.data('options');
		for (var i = 0; i < _options.length; i++) {
			var element = _options[i];
			if (element.name == name) {
				console.log("set selected option ",element);
				context.data('selected', element);
				context.removeComboError();
				context.find(".option-text").removeClass("center");
				context.find(".selected-option").text(element.name);
				context.data('selectCallback')(element);
				break;
			}
		}
	};

	$.fn.hideOptions = function (_optionSelect) {
		_optionSelect.find("ul").slideUp();
		_context = _optionSelect.closest(".form-group-select");
		if(_context.hasClass("required") && _context.getOptionSelected()==null) _context.showComboError();
		_optionSelect.data("open", false);
		_optionSelect.removeAttr('open');
		_optionSelect.find(".select-title .bbva-icon").css({
			'transform': 'rotate(0deg)'
		});
	};

	$.fn.getOptionSelected = function () {
		return this.data('selected') || null;
	};

	$.fn.onSelect = function (callback) {
		if (typeof callback === 'function') {
			this.data('selectCallback', callback);
		}
	};

	$.fn.reset = function () {
		this.find(".option-text").addClass("center");
		this.find(".selected-option").text("");
		this.find(".list-result").html("");
		this.find(".option-select").removeClass("disabled");
		this.find(".select-title").off("click");
		this.removeComboError();
		this.removeClass("noempty");
		this.data('selected',null);
		return this;
	};

	$.fn.showComboError = function(message) {
		return this.each(function() {
			console.log("this combo",$(this));
			$(this).addClass("hasError");
			message = message?message:"Selecciona una opción";
			$(this).find("span.text-message").html('<i class="bbva-icon ui-warning"></i>'+message);
		});
	};

	$.fn.removeComboError = function() {
		return this.each(function() {
			$(this).removeClass("hasError");
			$(this).find("span.text-message").html('&nbsp;');
		});
	};

	$.fn.comboSelect.template = '<ul style="display:none">' +
		'{{#items}}' +
		'<li data-id="{{id}}">{{name}}</li>' +
		'{{/items}}' +
		'</ul>';

}(jQuery));