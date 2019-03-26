//Regular expressions
var expRegs = {
    CURP: {
        regEx: /^[A-Z]{1}[AEIOUX]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/,
        error: "Ingresa una CURP válida"
    },
    EMAIL: {
        regEx: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
        error: "Ingresa un email válido"
    },
    PROM: {
        regEx: /10$|^\d(\.\d\d?)?$/,
        error: "Por favor ingresa una calificación con máximo dos decimales"
    },
    ZIPCODE: {
        regEx: /^\d{5}/,
        error: "Por favor ingresa un código postal válido"
    },
    YEAR_80_ACT: {
        regEx: {
            test: function (year) {
                nyear = Number(year);
                return (!isNaN(nyear) && (year >= 1980 && year <= new Date().getFullYear()));
            }
        },
        error: "Ingresa un año de 1980-actual"
    },
    PASS: {
        regEx: /(?=(?:.*\d))(?=(?:.*[A-Z])){10}/,
        error: "Por favor ingresa una contraseña válida"
    }
};

var contact = {
    phone: "01800-122-6689",
    email: "plqsqsecundaria@bbva.com"
}

function fillHelpSticky() {
    var helpStickyConfig = {
        placement: 'left',
        trigger: "click",
        html: true,
        closeOnClickOutside: true,
        title: '',
        tooltiptitle: {
            contactPhone: contact.phone,
            contactEmail: contact.email
        }
    };
    if (isMobile.any()) {
        $("body").addClass("mobile");
        helpStickyConfig.placement = 'top';
        helpStickyConfig.tooltiptitle.contactPhone = '<a href="tel:+52'+contact.phone+'">'+contact.phone+'</a>';
        helpStickyConfig.tooltiptitle.contactEmail = '<a href="mailto:'+contact.email+'">'+contact.email+'</a>';
    }
    new Tooltip($("#call_h"),helpStickyConfig)
        .updateTitleContent('<div class="tooltip_title">Ll\u00e1manos</div>' +
        '<div class="tooltip_message">Será un placer atenderte por télefono,'+
        '<b>de lunes a viernes </b>de <b>8:00</b> a <b>17:00</b> en el:</div>'+
        '<div class="tooltip_contact">'+helpStickyConfig.tooltiptitle.contactPhone+'</div>'+
        '<div class="tooltip_message">Tiempo medio de espera:<br><b>5 minutos</b></div>');
    
    new Tooltip($("#email_h"),helpStickyConfig)
        .updateTitleContent('<div class="tooltip_title">Escríbenos</div>' +
        '<div class="tooltip_message">Será un placer atenderte por correo</div>'+
        '<div class="tooltip_contact">'+helpStickyConfig.tooltiptitle.contactEmail+'</div>'+
        '<div class="tooltip_message">Tiempo medio de espera:<br><b>24 horas</b></div>');

    
    helpSticky();
}

function helpSticky() {
    $(".btn_help").click(function(e){
        e.preventDefault();
        if($(this).hasClass("active")){$(this).removeClass("active")}else{$(".btn_help").not("id", $(this).attr("id")).removeClass("active");
        $(this).addClass("active");}
    });
    
    $(".page-container").click(function() {
        if ($(".btn_help").hasClass("active")){
            $(".btn_help").removeClass("active");
        }
    });
}

fillHelpSticky();

var formvalidations = [{
        selector: "input.form-control,textarea.form-control",
        invalid: function (ele) {
            return (ele.prop('required') && (ele.val().trim() == "" || ele.parents(".form-group").hasClass("hasError")));
        },
        saveValue: function (ele, obj) {
            _id = ele.attr("id");
            obj[_id] = (typeof ele.inputmask !== "undefined") ? ele.inputmask('unmaskedvalue') : ele.val();
        },
        showError: function (ele) {
            if (!ele.parents(".form-group").hasClass("hasError")) {
                ele.showError("Campo obligatorio");
            }
        }
    },
    {
        selector: ".form-group-select",
        invalid: function (ele) {
            return (ele.hasClass("required") && ele.getOptionSelected() == null);
        },
        saveValue: function (ele, obj) {
            _id = ele.attr("id");
            obj[_id] = ele.getOptionSelected();
        },
        showError: function (ele) {
            ele.showComboError("Selecciona una opción");
        }
    },
    {
        selector: ".radio-section",
        invalid: function (ele) {
            return (ele.hasClass("required") && ele.getButtonSelected().id == undefined);
        },
        saveValue: function (ele, obj) {
            _id = ele.attr("id");
            obj[_id] = ele.getButtonSelected();
        },
        showError: function (ele) {
            ele.showRadioError("Selecciona una opción");
        }
    },
    {
        selector: ".checkbox",
        invalid: function (ele) {
            return (ele.hasClass("required") && !ele.isChecked());
        },
        saveValue: function (ele, obj) {
            _id = ele.attr("id");
            obj[_id] = ele.isChecked();
        },
        showError: function (ele) {
            ele.hasErrorCheck("Debes seleccionar");
        }
    },
    {
        selector: ".e-stars",
        invalid: function (ele) {
            return (!ele.hasClass("evaluated"));
        },
        saveValue: function (ele, obj) {
            _id = ele.attr("id");
            obj[_id] = ele.attr("data-eval");            
        },
        showError: function (ele) {
            ele.addClass("has-error")
            ele.find('span.text-message').html("<i class='bbva-icon ui-warning'></i> Califica con las estrellas");
            //ele.hasErrorCheck("S");
        }
    }
];

function hasAttr(element, attrib) {
    var _attr = element.attr(attrib);
    return (typeof _attr !== typeof undefined && _attr !== false);
}

//Global variable
var contact = {
    phone: "01800-122-6689",
    email: "plqsqsecundaria@bbva.com"
}

$("#btn-principal-menu").click(function (e) {
    e.preventDefault();
    if (!$(this).hasClass("is-open")) {
        $(this).addClass("is-open");
        $("#show-menu").slideDown();
        $("html").css("overflow-y", "hidden");
        $("#btn-principal-menu").removeClass("flex-items");
        $("#btn-principal-menu").html("Cerrar <i class='bbva-icon ui-x'></i>");
    } else {
        hideMenu();
    }
});

function hideOptionsMenu() {
    hideMenu();
    $("html").scrollTop(0);
}

function hideMenu() {
    $("#btn-principal-menu").removeClass("is-open");
    $("#btn-principal-menu").addClass("flex-items");
    $("#show-menu").slideUp("slow");
    $("html").css("overflow-y", "visible");
    $("#btn-principal-menu").html('Menú &nbsp; <img src="./images/icons/menu-icon.svg" alt="">');
}

$("#btn-exit").click(function () {
    logout();
});

$("#btn-scholarship").click(function (e) {
    e.preventDefault();
    hideOptionsMenu();
    flag = "";
    scholar.scholarship.statusDispersion == "Activo" ? flag = "success" : flag = "error";
    loadTemplate($("#principalTemplate"), templates.scholarship, {
        status: scholar.scholarship.statusDispersion,
        programStatus: scholar.program[0].status,
        program: scholar.scholarship.programName,
        schoolGrade: scholar.statusQualifications.schoolGrade,
        modality: scholar.scholarship.modalityParticipation,
        region: scholar.personalData.originRegion,
        state: scholar.personalData.originState,
        municipality: scholar.personalData.originMunicipality,
        flag: flag
    });
});

$("#btn-pdata").click(function (e) {
    e.preventDefault();
    loadMisDatos();
});

function loadMisDatos() {
    hideOptionsMenu();
    loadTemplate($("#principalTemplate"), templates.scholarInfo, {
        username: scholar.personalData.username
    });
}

function loadNoMentor(message){
    loadTemplate($("#principalTemplate"), miniTemplates.noMentor, {
        message:  message    
    });
}

$("#btn-mentor").click(function (e) {
    e.preventDefault();
    if (mentor.person == null) {
        restExec({
            service: 'GET_MENTOR',
            headers: { 'scholarID': scholar.studentID + '' },
            data: {},
            showWait: true,
            done: rest_fnGetMentor,
            fail: function(_err) {
                if (typeof _err.responseJSON != "undefined" && typeof _err.responseJSON.code != "undefined" && _err.responseJSON.code == "01229108") {
                    mentor.person = "none";
                    mentor.message = _err.responseJSON.message;
                    loadNoMentor();
                } else {
                    rest_fnShowError(_err);
                }
            },
            finallyDone: function() {
                fn_showMentor();
            },
        });
    } else if (mentor.person == "none") {
        loadTemplate($("#principalTemplate"), miniTemplates.noMentor, {});
    } else { fn_showMentor(); }
    hideOptionsMenu();
});

$("#btn-home, #btn-help").click(function (e) {
    e.preventDefault();
    loadTemplate($("#principalTemplate"), templates.home, {});
    hideOptionsMenu();
});

$("#btn-qualification").click(function (event) {
    event.preventDefault();    
    loadTemplate($("#principalTemplate"), templates.qualifications, {
        typeGrid: "grid-container-t",
        styleCard: "card"
    });
    hideOptionsMenu();
});

(function (el, win) {
    function validateForm(formItem) {
        var formvalues = {
            isValid: true
        };
        _$form = $(formItem).closest("form");
        _$sbmtbtn = _$form.find(".btn__submit");

        if (_$form.find(".check-required").find(".checkbox.checked").length == 0) {
            _$form.find(".check-required").addClass("has-error");
        }
        
        for (var _i in formvalidations) {
            _$form.find(formvalidations[_i].selector).each(function () {
                formvalidations[_i].saveValue($(this), formvalues);
                if (formvalidations[_i].invalid($(this))) {
                    console.log("Is invalid: " + formvalidations[_i].selector, $(this));
                    formvalues.isValid = !1;
                    formvalidations[_i].showError($(this));
                }
            });
        }
        return formvalues;
    }
    win.validateControl = function ($el) {
        $el.find("input[type='text']").inputable();
        $el.find("input[type='password']").inputable();
        $el.find("textarea").inputable();
        $el.find(".radio-section").radiobutton();
        $el.find(".uppercase").keyup(function (e) {
            $(this).val($(this).val().replace(/á/gi, "A").replace(/é/gi, "E").replace(/í/gi, "I").replace(/ó/gi, "O").replace(/ú/gi, "U").toUpperCase());
        });
        $el.find(".letters").keypress(function (key) {
            if ((key.charCode >= 97 && key.charCode <= 122) || //Mayusculas
                (key.charCode >= 65 && key.charCode <= 90) || //Minusculas
                (key.charCode == 0) || //Borrar
                (key.charCode == 32) || //Espacio
                (key.charCode == 45) || //guion
                (key.charCode == 46) || //punto
                (key.charCode == 209) || //enhe may
                (key.charCode == 241) || //enhe min
                (key.charCode == 225) || //á
                (key.charCode == 233) || //é
                (key.charCode == 237) || //í
                (key.charCode == 243) || //ó
                (key.charCode == 250) || //ú
                (key.charCode == 193) || //Á
                (key.charCode == 201) || //É
                (key.charCode == 205) || //Í
                (key.charCode == 211) || //Ó
                (key.charCode == 218) || //Ú
                (key.charCode == 220) || //Ü
                (key.charCode == 252) //ü
            ) return true;
            return false;
        });
        //No incluye Ñ
        $el.find(".alphanumeric").keypress(function (key) {
            if ((key.charCode >= 97 && key.charCode <= 122) || //Mayusculas
                (key.charCode >= 65 && key.charCode <= 90) || //Minusculas
                (key.charCode >= 48 && key.charCode <= 57) || //nums
                (key.charCode == 0) || //Borrar
                (key.charCode == 32)
            ) return true;
            return false;
        });
        $el.find(".letnum").keypress(function (key) {
            if ((key.charCode >= 97 && key.charCode <= 122) || //Mayusculas
                (key.charCode >= 65 && key.charCode <= 90) || //Minusculas
                (key.charCode == 0) || //Borrar
                (key.charCode == 32) || //Espacio
                (key.charCode == 45) || //guion
                (key.charCode == 46) || //punto
                (key.charCode == 209) || //enhe may
                (key.charCode == 241) || //enhe min
                (key.charCode == 225) || //á
                (key.charCode == 233) || //é
                (key.charCode == 237) || //í
                (key.charCode == 243) || //ó
                (key.charCode == 250) || //ú
                (key.charCode == 193) || //Á
                (key.charCode == 201) || //É
                (key.charCode == 205) || //Í
                (key.charCode == 211) || //Ó
                (key.charCode == 218) || //Ú
                (key.charCode == 220) || //Ü
                (key.charCode == 252) || //ü
                (key.charCode >= 48 && key.charCode <= 57) //nums
            ) return true;
            return false;
        });
        $el.find(".decimals").keypress(function (key) {
            if ((key.charCode >= 48 && key.charCode <= 57) || //nums
                (key.charCode == 46) //punto
            ) return true;
            return false;
        });
        $el.find(".numbers").keypress(function (key) {
            if ((key.charCode >= 48 && key.charCode <= 57) //nums
            ) return true;
            return false;
        });
        $el.find(".numg").keypress(function (key) {
            if ((key.charCode >= 48 && key.charCode <= 57) || //nums
                (key.charCode == 45) || //guion
                (key.charCode >= 97 && key.charCode <= 122) || //Mayusculas
                (key.charCode >= 65 && key.charCode <= 90) //Minusculas
            ) return true;
            return false;
        });

        $el.find("input[data-regex]").keyup(function () {
            if ($(this).val() != "" && expRegs[$(this).attr("data-regex")].regEx.test($(this).val())) {
                $(this).removeError();
            }
        }).blur(function () {
            if ($(this).val() != "" && !expRegs[$(this).attr("data-regex")].regEx.test($(this).val())) {
                $(this).showError(expRegs[$(this).attr("data-regex")].error);
            }
        });
        $el.find("input[required]").attr("data-required", true);
        $el.find("input[data-confirm]").each(function () {
            confirm_element = $(this);
            main_element = $(confirm_element.attr("data-confirm"));
            main_element.keyup(function () {
                if (this.main_element.val() != "") {
                    if (!hasAttr(this.main_element, "data-required")) {
                        this.main_element.attr("required", "required");
                    }
                    if (!hasAttr(this.confirm_element, "data-required")) {
                        this.confirm_element.parents(".grid-item").slideDown();
                        this.confirm_element.attr("required", true);
                    }
                } else {
                    if (!hasAttr(this.confirm_element, "data-required")) {
                        this.confirm_element.parents(".grid-item").slideUp();
                        this.confirm_element.removeAttr("required");
                        this.confirm_element.val("");
                        this.confirm_element.removeError();
                    }
                }
            }.bind({
                confirm_element: confirm_element,
                main_element: main_element
            }));
            confirm_element.add(main_element).keyup(function () {
                if (this.confirm_element.val() == this.main_element.val()) {
                    this.confirm_element.removeError();
                    this.main_element.removeError();
                }
            }.bind({
                confirm_element: confirm_element,
                main_element: main_element
            })).blur(function () {
                if (this.confirm_element.val() != "" && this.confirm_element.val() != this.main_element.val()) {
                    if (this.confirm_element.attr("type") == "password") this.confirm_element.showError("Las contraseñas no coinciden");
                    else this.confirm_element.showError("Los correos no coinciden");
                    this.main_element.showError("");
                } else if (this.main_element.val() == "" && !hasAttr(this.main_element, "data-required")) {
                    this.main_element.removeAttr("required");
                    this.main_element.removeError();
                    this.confirm_element.removeError();
                    this.confirm_element.removeAttr("required");
                }
            }.bind({
                confirm_element: confirm_element,
                main_element: main_element
            }));
        });
        $el.find("input.phonenumber").inputmask({
            mask: '(999) 999-9999',
            showMaskOnHover: false
        }).blur(function () {
            _phonen = $(this).inputmask('unmaskedvalue').length;
            if (_phonen > 0 && _phonen < 10) {
                $(this).showError("Ingresa el número completo");
            }
        });
        $el.find("input.no-repeat").each(function () {
            $(this).keyup(function () {
                var group = $('.no-repeat');
                var item = "";
                var item2 = "";
                var v1 = $().add($(this));
                var contador = 0;

                $.each(group, function (key, val) {

                    item = $().add(val);
                    if (!v1.is(item)) {
                        if (v1.val() === item.val()) {
                            v1.showError("No se permite número telefónico repetido");
                            v1.addClass("repeated");
                        }
                    }

                });
                for (var i = 0; i < group.length; i++) {
                    item = $().add(group[i]);
                    contador = 0;
                    for (var j = 0; j < group.length; j++) {
                        item2 = $().add(group[j]);
                        if (!item.is(item2)) {
                            if (item.hasClass("repeated") && item.val() !== item2.val()) {
                                contador++;
                            }
                        }
                    }
                    if (contador === 2) {
                        item.removeError();
                        item.removeClass("repeated");
                    }
                }
            });
        });
        $el.find("input.mxnamount").focus(function () {
            $(this).inputmask("currency", {
                rightAlign: false,
                autoUnmask: true,
                allowPlus: false,
                allowMinus: false,
                integerDigits: "6",




            });
        }).blur(function () {
            if ($(this).inputmask && $(this).inputmask('unmaskedvalue').length == 0) {
                $(this).inputmask('remove');
            }
        });
        /*VALIDATION FORM (form-control)*/
        $el.find("form").each(function () {
            $form = $(this);
            $form.find("input.form-control").each(function () {
                $formelement = this;
                $formelement.addEventListener("blur", function () {
                    $(this).val($(this).val().trim());
                    if (this.required && $(this).val().length == 0) {
                        $(this).showError($(this).attr("data-emptymessage") || "Campo obligatorio");
                    }
                });
            });

            $form.find(".form-group-select").each(function () {
                $formcombo = $(this);
                $formcombo.find(".option-select").append("<p class='i-message'><span class='text-message'>&nbsp;</span></p>");
            });
            $form.find(".checkbox").checkeable();
            $form.find(".checkbox[data-targetdisable]").each(function () {
                $(this).ckeckCallback(
                    function () {
                        console.log("chequed", $(this));
                        console.log('$(this).attr("data-targetdisable")', $(this).attr("data-targetdisable"));
                        $($(this).attr("data-targetdisable")).clearInput().prop("disabled", true).prop("required", false);
                    }.bind(this),
                    function () {
                        console.log("unchequed: ", $(this).attr("data-targetdisable"));
                        $($(this).attr("data-targetdisable")).prop("disabled", false).prop("required", true);
                    }.bind(this)
                );
            });
            $form.find(".checkbox[data-targettoggle]").each(function () {
                $(this).ckeckCallback(
                    function () {
                        console.log("checked", $(this));
                        console.log('$(this).attr("data-targettoggle")', $(this).attr("data-targettoggle"));
                        $($(this).attr("data-targetdisable")).clearInput().prop("disabled", true).prop("required", false);
                        $($(this).attr("data-targetdisable")).setValue("XXXXX");
                        $($(this).attr("data-targettoggle")).unCheck().addClass("disabled");
                    }.bind(this),
                    function () {
                        console.log("unchecked: ", $(this).attr("data-targettoggle"));
                        $($(this).attr("data-targetdisable")).prop("disabled", false).prop("required", true);
                        $($(this).attr("data-targettoggle")).removeClass("disabled");
                        $($(this).attr("data-targetdisable")).clearInput();
                    }.bind(this)
                );
            });

            $form.find("#checkfb_u").each(function () {
                $(this).ckeckCallback(
                    function () {
                        $('#btn_fb').hide();
                        $('#fb_u').removeError();
                        $('#fb_u').prop("required", false);
                    }.bind(this),
                    function () {
                        $('#btn_fb').show();
                        $('#fb_u').prop("required", true);
                    }.bind(this)
                );
            });
            $form.find(".form-group-select.o_sn").each(function () {
                $(this).comboSelect([{
                        id: '0',
                        name: 'Sí'
                    },
                    {
                        id: '1',
                        name: 'No'
                    }
                ]);
            });
            $form.find(".e-tooltip-f").each(function () {
                $etooltip = $(this);
                new Tooltip($etooltip, {
                    placement: 'bottom',
                    trigger: 'focus',
                    html: true,
                    title: $etooltip.attr("data-tooltitle")
                });
            });
            $form.find(".e-tooltip").each(function () {
                $etooltip = $(this);
                new Tooltip($etooltip, {
                    placement: 'bottom',
                    html: true,
                    title: $etooltip.attr("data-tooltitle")
                });
            });

            $form.find("textarea.form-control").each(function () {
                $formelement = this;
                $formelement.addEventListener("blur", function () {
                    $(this).val($(this).val().trim());
                    if (this.required && $(this).val().length == 0) {
                        $(this).showError($(this).attr("data-emptymessage") || "Campo obligatorio");
                    }
                });
            });

            $(this).find(".btn__submit").click(function () {
                _$form = $(this).closest("form");
                console.log("_$form", _$form);
                allDataForm = validateForm(this);
                if (!allDataForm.isValid && _$form.hasClass("notify-on-error")) {
                    console.log('_$form.parents(".modal").length', _$form.parents(".modal").length);
                    if (!_$form.parents(".modal").length) {
                        _scrollTo = hasAttr(_$form, 'data-notify') ? _$form.attr('data-notify') : 'html';
                        $(_scrollTo).animate({
                            scrollTop: _$form.offset().top - 100
                        }, 2000, "swing", function () {
                            notifyElem = _$form.prev();
                            if (notifyElem.length != 0 && notifyElem.hasClass("notification")) notifyElem.remove();
                            loadTemplate(_$form, miniTemplates.notification, {
                                type: 'error',
                                title: 'Datos obligatorios incompletos',
                                message: 'Por favor ingresa todos campos obligatorios'
                            }, 'before');
                        });
                    } else {
                        notifyElem = _$form.find(".actionsection:last").prev();
                        if (notifyElem.length != 0 && notifyElem.hasClass("notification")) notifyElem.remove();
                        loadTemplate(_$form.find(".actionsection:last"), miniTemplates.notification, {
                            type: 'error',
                            title: 'Datos obligatorios incompletos',
                            message: 'Por favor ingresa todos campos obligatorios'
                        }, 'before');
                    }
                }
                if (allDataForm.isValid && typeof $(this).data("complete") === "function") {
                    if (_$form.prev().length != 0 && _$form.prev().hasClass("notification")) _$form.prev().remove();
                    $(this).data("complete")(allDataForm);
                }
            });
        });
    };
    win.validateControl(el);
})($(document), window);