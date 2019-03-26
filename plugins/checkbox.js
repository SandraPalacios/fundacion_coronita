(function ($) {
	$.fn.checkeable = function (onCheckCallback, onUncheckCallback) {
		return this.each(function () {
            if (typeof onCheckCallback != "function") onCheckCallback=function(){}
            if (typeof onUncheckCallback != "function") onUncheckCallback=function(){}
            $(this).data("checkcallback",onCheckCallback);
            $(this).data("uncheckcallback",onUncheckCallback);
            $(this).click(function () {
                console.log("$thisDisabledClass",);
                if($(this).hasClass("disabled")) return;
                if ($(this).hasClass("checked")) {
                    $(this).removeClass("checked");
                    $(this).data("uncheckcallback")();
                }else{
                    $(this).addClass("checked");
                    if($(this).parents(".check-required.has-error")){
                        $(this).parents(".check-required").removeClass("has-error");
                    }
                    if($(this).parents(".checkbox-area.error")){
                        $(this).removeErrorCheck();
                    }
                    $(this).data("checkcallback")();
                }
            });
		});
	};

	$.fn.isChecked = function () {
		return $(this).hasClass("checked");
    };

    $.fn.doCheck = function () {
        return this.each(function(){
            $(this).addClass("checked");
            $(this).data("checkcallback")();
        });
    };
    $.fn.unCheck = function () {
        return this.each(function(){
            $(this).removeClass("checked");
        });
    };
    $.fn.hasErrorCheck = function (message) {
        return this.each(function() {
            element = $(this);
            ele_parent = element.parents(".checkbox-area");
            ele_parent.addClass("error");
            if (message != "") {
                ele_parent.find('span.text-message').html("<i class='bbva-icon ui-warning'></i>" + message);
            }
        });
    };
    $.fn.removeErrorCheck = function () {
        return this.each(function() {
            element = $(this);
            ele_parent = element.parents(".checkbox-area");
            ele_parent.removeClass("error");
            ele_parent.find('span.text-message').html("&nbsp;");
        });
    };
	$.fn.ckeckCallback = function (onCheckCallback, onUncheckCallback) {
		return this.each(function () {
            if (typeof onCheckCallback != "function") onCheckCallback=function(){}
            if (typeof onUncheckCallback != "function") onUncheckCallback=function(){}
            $(this).data("checkcallback",onCheckCallback);
            $(this).data("uncheckcallback",onUncheckCallback);
		});
    };

}(jQuery));