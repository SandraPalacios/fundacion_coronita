(function($) {
    $.fn.inputable = function() {
        return $(this).each(function() {
            t = this;
            var e = document.createElement("span"),
                n = document.createElement("div");
            if (!t.hasAttribute("required")) {
                var o = document.createElement("span");
                $(o).addClass("is-optional");
                t.parentElement.appendChild(o);
            }
            $(n).addClass("placeholder-wrapper");
            t.parentElement.appendChild(n);
            e.appendChild(document.createTextNode(t.getAttribute("data-placeholder")));
            $(e).addClass("placeholder-simulator");
            n.appendChild(e);
            n.appendChild(t);
            n.appendChild(e);

            $t = $(t);
            ele_parent = $t.parents(".form-group");
            if (ele_parent.find('span.text-message').length === 0) {
                ele_parent.append("<p class='i-message'><span class='text-message'>&nbsp;</span></p>");
            }
            e.addEventListener("click", function() {
                $(this).siblings("input").focus();
            });
            t.addEventListener("keyup", function() {
                t = $(this);
                if (0 === t.val().length) {
                    t.removeClass("noempty");
                    t.removeClass("has-error");
                } else {
                    var _e = t.siblings("small");
                    $(_e).remove();
                    $(t).removeError();
                }
            });
            t.addEventListener("focus", function() {
                _t = {
                    top: "5px",
                    fontSize: "12px"
                };
                for (var el in _t) e.style[el] = _t[el];
            });
            t.addEventListener("blur", function() {
                t = $(this);
                if (0 === t.val().length) {
                    _t = {
                        top: "16px",
                        fontSize: "15px"
                    };
                    for (var el in _t) e.style[el] = _t[el];
                    t.removeClass("noempty");
                } else {
                    t.removeClass("has-error");
                    $(t).addClass("noempty");
                }
            });
            if (0 !== t.value.length) {
                _t = {
                    top: "5px",
                    fontSize: "12px"
                };
                for (var el in _t) e.style[el] = _t[el];
                $(t).addClass("noempty");
            }
        });
    };
    $.fn.showError = function(message) {
        return this.each(function() {
            element = $(this);
            ele_parent = element.parents(".form-group");
            ele_parent.addClass("hasError");
            if (message != "") {
                ele_parent.find('span.text-message').html("<i class='bbva-icon ui-warning'></i>" + message);
            }
        });
    };
    $.fn.removeError = function() {
        return this.each(function() {
            element = $(this);
            ele_parent = element.parents(".form-group");
            ele_parent.removeClass("hasError");
            ele_parent.find('span.text-message').html('<i class="bbva-icon ui-empty"></i>&nbsp;');
        });
    };
    $.fn.clearInput = function() {
        return this.each(function() {
            element = $(this);
            element.removeError();
            element.val("");
            element.siblings(".placeholder-simulator").css({
                "top": "16px",
                "font-size": "15px"
            });
        });
    };
    $.fn.setValue = function(_val) {
        return this.each(function() {
            element = $(this);
            element.val(_val);
            element.siblings(".placeholder-simulator").css({
                "top": "5px",
                "font-size": "12px"
            });
        });
    };
}(jQuery));