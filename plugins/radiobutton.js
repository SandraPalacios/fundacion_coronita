(function ($) {
    $.fn.radiobutton = function (callback) {
        return this.each(function () {
            $rad = $(this);
            if ($rad.data("resetCallback") == undefined) {
                $rad.data("resetCallback", function () {});
            }
            $button = $rad.find('.radio');
            $rad.append("<p class='i-message'><span class='text-message'>&nbsp;</span></p>");
            $button.click(function () {
                if ($(this).parents(".radio-buttons").hasClass("disabled")) return;
                if (!$(this).hasClass('checked')) {
                    $buttons = $(this).closest(".radio-section").find(".radio");
                    $buttons.removeClass('checked');
                    $(this).addClass('checked');
                    var selected = {
                        id: $(this).attr('data-id'),
                        description: $(this).closest(".radio-button").find(".radio-label").text()
                    };
                    $rad_p = $(this).closest(".radio-section");
                    $rad_p.attr('data-selectedid', selected.id);
                    $rad_p.attr('data-selected', selected.description);
                    $rad_p.removeRadioError();
                    if (callback != undefined) {
                        callback(selected);
                    } else if ($rad_p.data("checkedCallback") != undefined) {
                        $rad_p.data("checkedCallback")(selected);
                    }
                }
            });
        });
    };
    $.fn.getButtonSelected = function () {
        return {
            id: $(this).attr('data-selectedid'),
            description: $(this).attr('data-selected')
        };
    };
    $.fn.onChecked = function (_callback) {
        if (typeof _callback === 'function') {
            this.data('checkedCallback', _callback);
        }
        return this;
    };
    $.fn.onRadioReset = function (_onresetcallback) {
        if (typeof _onresetcallback === 'function') {
            this.data('resetCallback', _onresetcallback);
        }
        return this;
    };
    $.fn.clearRadio = function () {
        this.removeRadioError();
        this.find(".radio.checked").removeClass("checked");
        this.removeAttr('data-selectedid');
        this.removeAttr('data-selected');
        this.data('resetCallback')();
        return this;
    };
    $.fn.showRadioError = function (message) {
        $(this).addClass("hasError");
        $(this).find("span.text-message").html('<i class="hasError bbva-icon ui-warning"></i>' + message);
        return this;
    };
    $.fn.removeRadioError = function () {
        $(this).removeClass("hasError");
        $(this).find('span.text-message').html("&nbsp;");
        return this;
    };

    $.fn.selectRadioId = function (id) {
        $(this).find("[data-id='" + id + "']").click();
        return this;
    };
    $.fn.selectRadioName = function (name) {
        $(this).find("[data-name='" + name + "']").click();
        return this;
    };

}(jQuery));