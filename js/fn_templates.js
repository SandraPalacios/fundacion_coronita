/**
 * Variable doesn't do anything.
 */
var fn_nothing = function () {
    return;
};

/**
 * Function to show generic modal
 */
var fn_showModal = function () {
    $("#modal_generic").attr('open', '');
}

/**
 * Function to hide generic modal
 */
var fn_hideModal = function () {
    $("#modal_generic").removeAttr("open");
}

/**
 * Function to display profile picture at home
 */
var fn_uploadProfile = function () {
    $("#profile-pic").click(function (e) {
        e.preventDefault();
        if (scholar.personalData.base64ProfilePicture != "" && scholar.personalData.base64ProfilePicture != undefined) {
            console.log("tiene foto");
            loadTemplate($("#modal_generic .body"), miniTemplates.visorProfile, {
                "photo": scholar.personalData.base64ProfilePicture
            });
            console.log("base", scholar.personalData.base64ProfilePicture);
        } else {
            console.log("NO tiene foto");
            t_data = {
                flag: $(this).attr("id")
            }
            loadTemplate($("#modal_generic .body"), templates.profileImage, t_data);
        }
    });
};

/**
 * Function to show/change profile picture
 */
var fn_change_profile = function () {
    fn_showModal();
    $("#btn_change_profile").click(function (e) {
        e.preventDefault();
        t_data = {
            flag: $(this).attr("id")
        }
        loadTemplate($("#modal_generic .body"), templates.profileImage, t_data);
    });
};

/**
 * Function to show tabs of school levels.
 */
var fn_qualifications_in = function ($idSection) {
    var shoolLevels = [];
    scholar.statusQualifications.schoolLevels.map(function (currentValue, index) {
        currentValue.index = index;
        currentValue.opened = (index == 0) ? "opened" : "";
        currentValue.isView = (index == 0) ? "block" : "none";
        scholar.statusQualifications.averageScholarLastLevel.find(function (index) {
            if (index.scholarLevel == currentValue.scholarLevel) {
                currentValue.lastLevel = index.scholarLastLevel;
            }
        });
        shoolLevels.push(currentValue);
    });
    loadTemplate($idSection, templates.myQualifications, {
        typeGrid: "grid-container-t",
        styleCard: "card",
        contentTabs: shoolLevels,
    });
};

var fn_my_qualifications = function () {
    fn_qualifications();
    fn_tab();
};

var fn_qualifications = function () {
    fn_lastQualifications();
    var selectedScholarLevel = "";
    for (let i = 0; i < $(".form-gray").find(".score-tabs-in").length; i++) {
        const $cal = $($(".form-gray").find(".score-tabs-in")[i]);
        selectedScholarLevel = $cal.attr("data-calificaciones");
        if (scholar.statusQualifications.schoolLevels[i].scholarLevel == selectedScholarLevel) {
            for (var j in scholar.statusQualifications.schoolLevels[i].scholarGrades) {
                var grade = scholar.statusQualifications.schoolLevels[i].scholarGrades[j].scholarGrade;
                var div1 = document.createElement("div");
                var att = document.createAttribute("id");
                att.value = selectedScholarLevel + "grade" + j;
                div1.setAttributeNode(att);
                document.getElementById("calificacion" + selectedScholarLevel).appendChild(div1);
                var n = 0;
                var period = [];
                for (l = 0; l < scholar.statusQualifications.averagesSchoolGrade.length; l++) {
                    if (scholar.statusQualifications.averagesSchoolGrade[l].scholarLevel == selectedScholarLevel) {
                        scholar.statusQualifications.averagesSchoolGrade[l].averagesSchoolGrade.forEach(function (curraveragesSchoolGrade, ind) {
                            if (curraveragesSchoolGrade.schoolGrade == grade) {
                                console.log("scholarLevelGrade-period", period);
                                scholar.statusQualifications.averagesScholarLevel.find(function (index) {
                                    if (index.scholarLevel == selectedScholarLevel && index.schoolGrade == grade) {
                                        index.emptyBoleta = (index.folio != "") ? "none" : "block";
                                        index.boleta = (index.folio != "") ? "block" : "none";
                                        index.indexB = selectedScholarLevel + "_" + ind + "_" + n++;
                                        period.push(index);
                                    }
                                });
                                if (curraveragesSchoolGrade.status == "P") {
                                    loadTemplate($("#" + selectedScholarLevel + "grade" + j), templates.viewCardsScore, {
                                        schoolarGrade: scholar.statusQualifications.schoolLevels[i].scholarGrades[j].scholarGrade,
                                        scholarLevelGrade: period,
                                        scholaraverageGrade: curraveragesSchoolGrade.averageSchoolGrade,
                                        emptyConst: (curraveragesSchoolGrade.folio != "") ? "none" : "block",
                                        const: (curraveragesSchoolGrade.folio != "") ? "block" : "none",
                                        indexC: ind + "_" + scholar.statusQualifications.schoolLevels[i].scholarLevel,
                                        showAverage: (scholar.statusQualifications.schoolLevels[i].scholarLevel != "Secundaria") ? "none" : "grid",
                                        constFolio: curraveragesSchoolGrade.folio,
                                        text1: $("body").hasClass("mobile") ? "" : "Ver"
                                    });
                                } else {
                                    loadTemplate($("#" + selectedScholarLevel + "grade" + j), templates.cardsScore, {
                                        schoolarGrade: scholar.statusQualifications.schoolLevels[i].scholarGrades[j].scholarGrade,
                                        scholarLevelGrade: period,
                                        scholaraverageGrade: curraveragesSchoolGrade.averageSchoolGrade,
                                        //cards_before: (curraveragesSchoolGrade.status == "P") ? "opacity_card" : "",
                                        cards_after: (curraveragesSchoolGrade.status == "S") ? "gray_scale" : "",
                                        emptyConst: (curraveragesSchoolGrade.folio != "") ? "none" : "block",
                                        const: (curraveragesSchoolGrade.folio != "") ? "block" : "none",
                                        indexC: ind + "_" + scholar.statusQualifications.schoolLevels[i].scholarLevel,
                                        showAverage: (scholar.statusQualifications.schoolLevels[i].scholarLevel != "Secundaria") ? "none" : "grid",
                                        text1: $("body").hasClass("mobile") ? "" : "Ver",
                                        text2: $("body").hasClass("mobile") ? "" : "Actualizar",
                                        text3: $("body").hasClass("mobile") ? "" : "Eliminar",
                                        text4: $("body").hasClass("mobile") ? "" : "Cargar archivo"
                                    });
                                }
                            }
                        });
                    }
                }
            }
        }
    }
};

var fn_cards_qualifications = function name(params) {
    $(".cards.gray_scale").find(".btn__submit").addClass("btn__disabled");
    $(".cards").not(".gray_scale").find(".openuploadfile").click(function () {
        loadFileElmen = $(this).attr("id");
        console.log(loadFileElmen);
        loadTemplate($("#modal_generic .body"), templates.ufile, {
            flag: loadFileElmen
        });
    });
    $(".uploadfile .show").click(function () {
        loadTemplate($("#modal_generic .body"), templates.visor, {});
    });
    $(".btn-delete-file").click(function () {
        loadTemplate($("#modal_generic .body"), templates.conf, {
            title: "¿Deseas eliminar el archivo?",
            message: "Al eliminarlo ya no se podrá recuperar",
            element: $(this).attr("data-file"),
            elementBoleta: $(this).attr("data-ind-boleta"),
            elementConstancia: $(this).attr("data-ind-constancia"),
            elementCertificate: $(this).attr("data-certificate"),
            onAccept: function () {
                console.log("Confirm accepted", this);
                if (this.element == "boleta") {
                    $("#upboleta" + this.elementBoleta).hide();
                    $("#upboletaempty" + this.elementBoleta).show();
                } else if (this.element == "constancia") {
                    $("#upConstancia" + this.elementConstancia).hide();
                    $("#upConstanciaempty" + this.elementConstancia).show();
                }else if(this.element == "certificate"){
                    $("#upcertificate" + this.elementCertificate).hide();
                    $("#upcertificateempty" + this.elementCertificate).show();
                }
                fn_hideModal();
            }
        });
    });

};

var fn_bienvenido = function (){
    $(".btn_acept").click(function () {
        loadTemplate($("#template_onboarding"), templates.avisosLegales, {});
    });
};

var fn_avisosLegales = function(){
    $(".btn_acept").click(function () {
        loadTemplate($("#template_onboarding"), templates.avisosLegales_final, {});
    });

    $(".btn_finalizar").click(function () {
        console.log("Finalizar");
        servOrigin = window.location.origin;
        window.location.href=servOrigin+"/SandraPalacios/fundacion_coronita/master/index_becario.html";
    });
};

var fn_confirmModal = function (_temp, data) {
    console.log(data);
    fn_showModal();
    _temp.find(".btn_acept").click(data.onAccept.bind(data));
    _temp.find(".btn_decline").click(fn_hideModal);
};

var fn_drangdropProfile = function () {
    fn_showModal();
    var fileIdCont = 0;
    var allFiles = {};
    var fext = "";
    var fname = "";
    var myDropzone = new Dropzone("#profile-image", {
        acceptedFiles: 'image/jpeg,image/png',
        dictFileTooBig: "El archivo supera el tama\u00F1o permitido de {{maxFilesize}} MB",
        dictMaxFilesExceeded: "N\u00FAmero m\u00E1ximo de archivos alcanzado",
        dictInvalidFileType: "S\u00F3lo se permiten archivos JPG y PNG",
        autoProcessQueue: false,
        dictDefaultMessage: '',
        maxFiles: 1,
        maxFilesize: 12,
        previewTemplate: miniTemplates.filepreview.html,
        previewsContainer: "#file-preview-wrapper",
        url: "/",
        init: function () {
            this.on("addedfile", function (file) {});
            this.on("drop", function () {});
        },
        accept: function (file, done) {
            document.getElementById("filecontainer").classList.remove('empty');
            $("#sbtmfiles").show();
            var _tthis = this;
            file["idFile"] = fileIdCont;
            console.log(file);
            var button = file.previewTemplate.querySelector('.btn-delete-file');
            var myFile = file;
            button.addEventListener('click', function () {
                _tthis.removeFile(myFile)
            });
            fext = file.name.split(".");
            fext = fext[fext.length - 1];
            fname = file.name;
            fileIdCont++;
            done();
        },
        removedfile: function (file) {
            file.previewTemplate.remove();
            if (this.getAcceptedFiles().length == 0) {
                document.getElementById("filecontainer").classList.add('empty');
                $("#sbtmfiles").hide();
            }
        },
        error: function (file, errorMEssage) {
            if (!file.accepted) {
                this.removeFile(file);
                _$form = $(".fileform");
                notifyElem = _$form.prev();
                if (notifyElem.length != 0 && notifyElem.hasClass("notification")) notifyElem.remove();
                loadTemplate(_$form, miniTemplates.notification, {
                    type: 'error',
                    title: errorMEssage
                }, 'before');
            }
        }
    });

    $("#btn_save_image").data("complete", function (formdata) {
        fn_hideModal();
        showWait();
        var reader = new FileReader();
        reader.readAsDataURL(myDropzone.getAcceptedFiles()[0]);
        reader.onload = (event) => {
            formdata.b64 = event.target.result;
        };
        setTimeout(() => {
            scholar.personalData.base64ProfilePicture = formdata.b64;
            fn_loadProfilePicture();
            hideWait();
            loadTemplate($("#modal_generic .body"), templates.suc, {
                title: "Foto de perfil guardada satisfactoriamente",
                message: "Tu foto se ha guardado de forma correcta, gracias por la espera."
            });
        }, 1000);
    });
    fn_showModal();
};

var fn_animationAlert = function () {
    setInterval(function () {
        moveRight();
    }, 10000);

    $('#slider').find('li').css({
        width: $('#slider').width()
    });

    var slideCount = $('#slider ul li').length;
    var slideWidth = $('#slider ul li').width();
    var slideHeight = $('#slider ul li').height();
    var sliderUlWidth = slideCount * slideWidth;

    $('#slider ul').css({
        width: sliderUlWidth,
        marginLeft: -slideWidth
    });
    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: +slideWidth
        }, 400, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: -slideWidth
        }, 400, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('a.control_prev').click(function () {
        moveLeft();
    });

    $('a.control_next').click(function () {
        moveRight();
    });
};

var fn_closeNotification = function (notif) {
    notif.find(".close-button").click(function () {
        $(this).closest(".notification").slideUp("slow", function () {
            $(this).remove();
        });
    });
    notif.slideDown("slow");
};

var fn_aceptModal = function () {
    fn_showModal();
    $(".btn_acept").click(function (e) {
        e.preventDefault();
        fn_hideModal();
    });
};

var fn_myinfo = function (_temp) {
    $(".accordion .step-header").click(function (e) {
        e.preventDefault();
        console.log($(this).attr("data-target"));
        section = $(this).attr("data-target");
        if (!$(this).hasClass("animated")) {
            $head = $(this);
            $content = $("#" + $(this).attr("data-target"));
            $head.addClass("animated");
            console.log("$head", $head);
            if ($head.hasClass("is-open")) {
                $head.removeClass("is-open");
                $head.find(".step-arrow").html("<i class='bbva-icon ui-plus'></i>");
                $content.slideUp(400, function () {
                    $head.removeClass("animated");
                });
            } else {
                for (var i = 0; i < $(".accordion .step-header").length; i++) {
                    element = $(".accordion .step-header")[i];
                    if ($(element).hasClass("is-open") &&
                        $(element).attr("data-target") != $(this).attr("data-target")) {
                        $idTemp = $("#" + $(element).attr("data-target"));
                        $(element).find(".step-arrow").html("<i class='bbva-icon ui-plus'></i>");
                        $idTemp.slideUp();
                    }
                }
                $(".accordion .step-header").not("data-target", $(this).attr("data-target")).removeClass(
                    "is-open");
                $("html").scrollTop($(this).position().top);
                $(this).addClass("is-open");
                $(this).find(".step-arrow").html("<i class='bbva-icon ui-minus'></i>");
                $content.slideDown(400, function () {
                    $head.removeClass("animated");
                });
                console.log("va a entrar al switch");
                console.log("section", section);
                switch (section) {
                    case "my-biography":
                        loadTemplate($("#" + section), templates.biography, {
                            "bio": scholar.scholarBiography.biography
                        });
                        break;
                    case "personal-data":
                        loadTemplate($("#" + section), templates.personalData, {
                            "scholarName": scholar.personalData.name,
                            "lastName": scholar.personalData.lastName,
                            "secondLastName": scholar.personalData.secondLastName,
                            "region": scholar.personalData.originRegion,
                            "ostate": scholar.personalData.originState,
                            "omunicipality": scholar.personalData.originMunicipality,
                            "age": scholar.personalData.age,
                            "cr": scholar.personalData.assignedCR,
                            "accountNumber": "******" + scholar.personalData.accountNumber.toString().slice(-4),
                            "yearb": scholar.personalData.birthYear,
                            "curp": scholar.personalData.curp
                        });
                        break;
                    case "scholarship-data":
                        flag = "";
                        scholar.scholarship.statusDispersion == "Activo" ? flag = "success" : flag = "error";
                        loadTemplate($("#scholarship-informative"), templates.scholarshipInformative, {
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
                        break;
                    case "scholar-data":
                        loadTemplate($("#" + section), templates.scholarData, {
                            "actLevel": scholar.statusQualifications.schoolLevels[scholar.statusQualifications.schoolLevels.length - 1].scholarLevel,
                            "schoolName": scholar.schoolData.name,
                            "schoolDomicile": scholar.schoolData.domicile,
                            "schoolType": scholar.schoolData.type,
                            "initials": scholar.schoolData.initials,
                            "control": scholar.schoolData.control,
                            "cct": scholar.schoolData.cct,
                            "schoolState": scholar.schoolData.state,
                            "schoolMunicipality": scholar.schoolData.municipality,
                            "turn": scholar.schoolData.turn
                        });
                        break;
                    case "domicile-data":
                        loadTemplate($("#" + section), templates.domicileData, {
                            "street": scholar.domicile.street,
                            "numExterior": scholar.domicile.numExterior,
                            "numInterior": scholar.domicile.numInterior,
                            "codePostal": scholar.domicile.codePostal,
                            "locality": scholar.domicile.locality,
                            "colony": scholar.domicile.colony,
                            "betweenStreet": scholar.domicile.betweenStreet,
                            "typeOfRoad1": scholar.domicile.typeOfRoad1,
                            "andTheStreet": scholar.domicile.andTheStreet,
                            "typeOfRoad2": scholar.domicile.typeOfRoad2,
                            "behindStreet": scholar.domicile.behindStreet,
                            "typeOfRoad3": scholar.domicile.typeOfRoad3,
                            "particularReferences": scholar.domicile.particularReferences
                        });
                        break;
                    case "contact-data":
                        loadTemplate($("#" + section), templates.contactData, {
                            "homePhone": scholar.contactData.homePhone,
                            "cellPhone": scholar.contactData.cellPhone,
                            "messagePhone": scholar.contactData.messagePhone,
                            "email": scholar.contactData.email,
                            "email1": scholar.contactData.email1,
                            "email2": scholar.contactData.email2,
                        });
                        break;
                    case "tutor-data":
                        loadTemplate($("#" + section), templates.tutorData, {
                            "tutorName": scholar.tutorData.name,
                            "firstNameTutor": scholar.tutorData.firstName,
                            "lastNameTutor": scholar.tutorData.lastName,
                            "kinship": scholar.tutorData.kinship,
                            "kinshipType": scholar.tutorData.kinshipType
                        });
                    default:
                        break;
                }
            }
        }
    });

    $("#btn_change_pass").click(function (e) {
        e.preventDefault();
        showWait();
        setTimeout(function () {
            loadTemplate($("#principalTemplate"), templates.changePass, {});
            hideWait();
        }, 1000);
    });
};

var fn_show_interests = function () {
    for (let i = 0; i < interestsCatalog.length; i++) {
        const interest = interestsCatalog[i];
        interestArea = i < Math.round(interestsCatalog.length / 2) ? "s1" : "s2";
        loadTemplate($("#interests").find("." + interestArea), miniTemplates.checkbox, {
            interestId: interest.id,
            interestName: interest.description
        }, "append");
    }
    for (let i = 0; i < scholar.scholarBiography.interest.length; i++) {
        const scholarInterests = scholar.scholarBiography.interest[i];
        $("#interests").find("#int" + scholarInterests.id).addClass("checked");
    }
    $("#btn_savebio").data("complete", function (_data) {
        if ($("#interests").find(".checkbox").hasClass("checked")) {
            console.log("hay checks seleccionados");
            for (let i = 0; i < $("#interests").find(".checkbox.checked").length; i++) {
                const $checksSel = $($("#interests").find(".checkbox.checked")[i]);
                //Validar como se mandan los intereses marcados
                console.log($checksSel.attr("id"));
            }
            showWait();
            setTimeout(function () {
                hideWait();
                loadTemplate($("#modal_generic .body"), templates.suc, {
                    title: "Tus datos se han guardado satisfactoriamente",
                    message: "Gracias por la espera"
                });
            }, 1000);
        } else {
            $("#interests.check-required").addClass("has-error");
            _$form = $("#form-biography");
            if (_$form.prev().hasClass("notification")) return;
            else {
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
            }
        }
    });
};

var fn_activeCheckbox = function (_temp) {
    $(_temp).find(".checkbox").checkeable();
};

var fn_legal = function () {
    $("#modal_generic2").attr('open', '');
    $("#btn_legal").data("complete", function () {
        $("#modal_generic2").removeAttr('open', '');
        showWait();
        setTimeout(function () {
            hideWait();
            showSuccess("Has aceptado los avisos legales", "Gracias por tu confianza");
        }, 1000);
    });
}

var fn_personal_data = function (_temp) {
    $("#dbirthdate").comboSelect(day, function (el) {
        console.log("selected", el);
    });

    $("#mbirthdate").comboSelect(months, function (el) {
        console.log("selected", el);
    });

    $("#gender").selectRadioName(scholar.personalData.gender);

    $("#dbirthdate").selectOptionId(scholar.personalData.birthDay);
    $("#mbirthdate").selectOptionId(scholar.personalData.birthMonth);
    $("#btn_savepersonald").data("complete", function () {
        showWait();
        setTimeout(function () {
            hideWait();
            loadTemplate($("#modal_generic .body"), templates.suc, {
                title: "Tus datos se han guardado satisfactoriamente",
                message: "Gracias por la espera"
            });
        }, 1000);
    });

    $(_temp).find(".query_curp").click(function () {
        window.open("https://www.gob.mx/curp/", "_blank");
    });
};

var fn_scholarship_data = function () {
    pending = scholar.scholarship.confirmDispersion.filter(function (index) {
        return index.statusScholarshipReceived == "Pendiente";
    });

    confirm = scholar.scholarship.confirmDispersion.filter(function (index) {
        if (index.statusScholarshipReceived != "Pendiente") {
            if (index.statusScholarshipReceived === "Incompleta") {
                index.flag = "warning";
                index.deposit = "Depósito incompleto";
            } else if (index.statusScholarshipReceived === "No") {
                index.flag = "error";
                index.deposit = "Sin depósito";
            } else if (index.statusScholarshipReceived === "Sí") {
                index.flag = "success";
                index.deposit = "Depósito completo";
            }
            return index;
        }
    });

    if (pending.length > 0) {
        loadTemplate($("#deposits-pending"), templates.pendingMonthsP, {
            "pendingsM": pending
        });
    }

    if (confirm.length > 0) {
        loadTemplate($("#deposits-table"), templates.confirmMonthsTable, {
            "confirmsM": confirm
        });
    }
};

var fn_pending_months = function (_temp) {
    $(".btn_confirm_dep").data("complete", function (_data) {
        console.log("confirm _data", _data);
        var confirm = {
            month: _data.confirmDep.id.split("_")[0],
            year: _data.confirmDep.id.split("_")[1],
            resp: _data.confirmDep.description
        }
        scholar.scholarship.confirmDispersion.find(function (index) {
            if (index.monthConfirm == confirm.month && index.yearConfirm == confirm.year) {
                index.statusScholarshipReceived = confirm.resp
                return;
            }
        });
        //
        showWait();
        setTimeout(function () {
            cont = 0;
            scholar.scholarship.confirmDispersion.find(function (index) {
                if (index.statusScholarshipReceived == "Pendiente") cont++;
            });
            if (cont == 0) $("#deposits-pending").html("");
            fn_scholarship_data();
            hideWait();
            showSuccess("Has confirmado tu dep\u00F3sito de " + confirm.month + " " + confirm.year, "Gracias");
        }, 1000);
    });
}

var fn_scholar_data = function () {
    if (scholar.statusQualifications.schoolLevels[scholar.statusQualifications.schoolLevels.length - 1].scholarLevel == "Universidad") {
        loadTemplate($("#university-info"), templates.universityData, {
            typeOfCareer: scholar.schoolData.typeCareer,
            careerName: scholar.schoolData.nameCareer,
            area: scholar.schoolData.area,
            duration: scholar.schoolData.duration
        });
    }
};

var fn_domicile_data = function () {
    $(".states").comboSelect(states, function (el) {
        showWait();
        setTimeout(() => {
            hideWait();
        }, 1000);
    });

    $("#state").onSelect(function (optionselected) {
        showWait();
        $("#municipalities").reset();
        console.log("opci\u00F3n seleccionada de #state: ", optionselected);
        var arrayMun = municipalities[optionselected.name].municipalities;
        console.log("arrayMun", arrayMun);
        setTimeout(() => {
            $("#municipalities").comboSelect(arrayMun);
            hideWait();
        }, 1000);
    });

    $("#state").selectOptionId(scholar.domicile.cdState);

    setTimeout(function () {
        if (scholar.domicile.cdMunicipality != "") {
            $("#municipalities").selectOptionId(scholar.domicile.cdMunicipality);
        }
    }, 1100);

    $(".road-type").comboSelect(road);
    $("#road1").selectOptionId(1);
    $("#road2").selectOptionId(2);
    $("#road3").selectOptionId(3);

    //lanzar servicio de municipios
    $("#state").selectOptionId(scholar.domicile.cdState);
    $("#road1").selectOptionName(scholar.domicile.typeOfRoad1);
    $("#road2").selectOptionName(scholar.domicile.typeOfRoad2);
    $("#road3").selectOptionName(scholar.domicile.typeOfRoad3);
    $("#btn_savedomiciled").data("complete", function () {
        showWait();
        setTimeout(function () {
            hideWait();
            loadTemplate($("#modal_generic .body"), templates.suc, {
                title: "Tus datos se han guardado satisfactoriamente",
                message: "Gracias por la espera"
            });
        }, 1000);
    });
};

var fn_contact_data = function () {
    if (scholar.contactData.email1 != "") {
        $("#email2conf").parents(".grid-item").slideDown();
    }

    if (scholar.contactData.email2 != "") {
        $("#email3conf").parents(".grid-item").slideDown();
    }

    $("#btn_savecontactd").data("complete", function () {
        showWait();
        setTimeout(function () {
            hideWait();
            loadTemplate($("#modal_generic .body"), templates.suc, {
                title: "Tus datos se han guardado satisfactoriamente",
                message: "Gracias por la espera"
            });
        }, 1000);
    });

};

var fn_tutor_data = function () {
    if (scholar.tutorData.firstNameTutor == "XXXXX") {
        $("#checktutorfirstname").click();
        $("#tutorfirstname").setValue(scholar.tutorData.firstNameTutor);
    }
    if (scholar.tutorData.lastNameTutor == "XXXXX") {
        $("#checktutorlastname").click();
        $("#tutorlastname").setValue(scholar.tutorData.lastNameTutor);
    }

    $("#relationship").comboSelect(relationship, function (el) {
        if (el.id == 6) {
            if (scholar.tutorData.kinshipType == "") $("#o_relationship").clearInput();
            $("#o_relationship").attr("required", "required");
            $("#other_relationship").slideDown();
        } else {
            $("#o_relationship").removeAttr("required");
            $("#other_relationship").slideUp();
        }
    });

    kinshipSelected = relationship.find(function (element) {
        return element.name == scholar.tutorData.kinship;
    });

    $("#relationship").selectOptionId(kinshipSelected.id);

    $("#btn_savetutord").data("complete", function () {
        showWait();
        setTimeout(function () {
            hideWait();
            loadTemplate($("#modal_generic .body"), templates.suc, {
                title: "Tus datos se han guardado satisfactoriamente",
                message: "Gracias por la espera"
            });
        }, 1000);
    });
};

var fn_home = function () {
    fn_loadDeposits();
    fn_qualifications_in($("#home_score"));
};

var fn_loadDeposits = function () {
    var confirmDeposits = [];
    var pendingDeposits = [];
    if (scholar.scholarship.confirmDispersion.length == 0) {
        loadTemplate($("#confirm_deposits"), templates.confirmDeposits, {
            icon: "ui-ticket",
            tittle: "\u00BFRecibiste tu beca\u003F",
            message: "\u00A1Bienvenido! \n No tienes dep\u00f3sitos por confirmar",
            show: "none"
        });
    } else {
        scholar.scholarship.confirmDispersion.find(function (index) {
            if (index.statusScholarshipReceived == "No" || index.statusScholarshipReceived == "Incompleta") {
                pendingDeposits.push(index);
            } else if (index.statusScholarshipReceived == "Pendiente") {
                confirmDeposits.push(index);
            }
        });
        if (confirmDeposits != 0) {
            loadTemplate($("#confirm_deposits"), templates.confirmDeposits, {
                icon: "ui-ticket",
                tittle: "\u00BFRecibiste tu beca\u003F",
                message: "Tienes meses pendientes por confirmar",
                show: "block"
            });
        }
        if (pendingDeposits != 0) {
            loadTemplate($("#pending_deposits"), templates.pendingDeposits, {
                icon: "ui-email",
                tittle: "Respuesta a depositos pendientes",
                pending: pendingDeposits
            });
        }
    }
};

var fn_uploadfilemodal = function () {
    var fileIdCont = 0;
    var allFiles = {};
    console.log("ENTRA");
    //Dropzone
    var myDropzone = new Dropzone("#dragndrop", {
        acceptedFiles: 'application/pdf,image/jpeg,image/png',
        dictFileTooBig: "El archivo supera el tama\u00F1o permitido de {{maxFilesize}} MB",
        dictMaxFilesExceeded: "N\u00FAmero m\u00E1ximo de archivos alcanzado",
        dictInvalidFileType: "S\u00F3lo se permiten archivos JPG, PNG y PDF",
        autoProcessQueue: false,
        dictDefaultMessage: '',
        maxFiles: 2,
        maxFilesize: 12,
        previewTemplate: miniTemplates.filepreview.html,
        previewsContainer: "#file-preview-wrapper",
        url: "/",
        init: function () {
            this.on("addedfile", function (file) {});
            this.on("drop", function () {});
        },
        accept: function (file, done) {
            document.getElementById("filecontainer").classList.remove('empty');
            $("#sbtmfiles").show();
            var _tthis = this;
            file["idFile"] = fileIdCont;
            console.log(file);
            /*var fileext = file.name.split('.').pop().toLowerCase();
            fileext = fileext == 'jpeg' ? 'jpg' : fileext;
            file.previewTemplate.querySelector('#fileiconprev').classList.add("ui-" + fileext + "-doc");*/
            var button = file.previewTemplate.querySelector('.btn-delete-file');
            var myFile = file;
            button.addEventListener('click', function () {
                _tthis.removeFile(myFile)
            });
            allFiles[fileIdCont] = {
                "active": true,
                "base64": ""
            };
            fileIdCont++;
            done();
        },
        removedfile: function (file) {
            file.previewTemplate.remove();
            if (this.getAcceptedFiles().length == 0) {
                document.getElementById("filecontainer").classList.add('empty');
                $("#sbtmfiles").hide();
            }
        },
        error: function (file, errorMEssage) {
            if (!file.accepted) {
                this.removeFile(file);
                _$form = $(".fileform");
                notifyElem = _$form.prev();
                if (notifyElem.length != 0 && notifyElem.hasClass("notification")) notifyElem.remove();
                loadTemplate(_$form, miniTemplates.notification, {
                    type: 'error',
                    title: errorMEssage
                }, 'before');
            }
        }
    });
    $("#btn_sbtmfiles").data("complete", function (formdata) {
        fn_hideModal();
        showWait();
        toShow = formdata.flag.split("empty");
        $("#" + formdata.flag).hide();
        $("#" + toShow[0] + "" + toShow[1]).show();
        setTimeout(() => {
            hideWait();
            showSuccess("Documento guardado satisfactoriamente", "Tu documento se ha guardado de forma correcta, gracias por la espera.");
        }, 1000);
    });
    fn_showModal();
};

var fn_changePass = function () {
    $("html").scrollTop(0);
    $("#btn_send_pass").data("complete", function (_data) {
        console.log("pass new", _data.npassword);
        showWait();
        setTimeout(function () {
            hideWait();
            loadTemplate($("#modal_generic .body"), templates.suc, {
                title: "Tu contrase\u00F1a se ha actualizado correctamente",
                message: "Gracias por la espera"
            });
            $("#btn-pdata").click();
        }, 1000);
    });

    $("#btn_back_conf").click(function (e) {
        e.preventDefault();
        showWait();
        setTimeout(function () {
            $("#btn-pdata").click();
            hideWait();
        }, 800);
    });
};

var fn_showMentor = function () {
    if (mentor.person != "none") {
        loadTemplate($("#principalTemplate"), templates.mentor, {
            name: mentor.person.name,
            regionName: mentor.person.address.region.name,
            municipality: mentor.person.address.municipality.name,
            state: mentor.person.address.state.name,
            jobSeniority: mentor.employee.jobSeniority,
            mail: mentor.employee.institutionalMail,
            schoolLevel: mentor.person.schooling.schoolLevel.description,
            career: mentor.person.schooling.career,
            universityName: mentor.person.schooling.universityName,
            birthDay: mentor.person.birthDay,
            aboutMe: mentor.aboutMe,
            sessionsNum: scheduledSession
        });
    } else {
        loadTemplate($("#principalTemplate"), miniTemplates.noMentor, {});
    }
}

var fn_mentor = function () {
    fn_tab();
    for (let i = 0; i < mentor.personalInterests.length; i++) {
        const interest = mentor.personalInterests[i];
        interestArea = i < Math.round(mentor.personalInterests.length / 2) ? "in1" : "in2";
        loadTemplate($("#interest-mentor").find("." + interestArea), miniTemplates.vineta, {
            description: interest.description
        }, "append");
    }

    for (let j = 0; j < mentor.proficiencies.length; j++) {
        const proficiencies = mentor.proficiencies[j];
        profArea = j < Math.round(mentor.proficiencies.length / 2) ? "prof1" : "prof2";
        loadTemplate($("#proficiencies-mentor").find("." + profArea), miniTemplates.vineta, {
            description: proficiencies.description
        }, "append");
    }
    if (pendingSessions) {
        loadTemplate($("#wf1"), miniTemplates.notification, {
            type: 'error',
            title: 'Tienes sesiones pendientes por evaluar',
            message: 'Por favor realiza la evaluaci\u00F3n'
        }, 'prepend');
    }

    $(".accordion .step-header").click(function (e) {
        e.preventDefault();
        console.log($(this).attr("data-target"));
        section = $(this).attr("data-target");
        index = $(this).attr("data-index");
        if (!$(this).hasClass("animated")) {
            $head = $(this);
            $content = $("#" + $(this).attr("data-target"));
            $head.addClass("animated");
            if ($head.hasClass("is-open")) {
                $head.removeClass("is-open");
                $head.find(".step-arrow").html("<i class='bbva-icon ui-plus'></i>");
                $content.slideUp(400, function () {
                    $head.removeClass("animated");
                    $("#session-" + $head.attr("data-index")).html("");
                });
            } else {
                for (var i = 0; i < $(".accordion .step-header").length; i++) {
                    element = $(".accordion .step-header")[i];
                    if ($(element).hasClass("is-open") &&
                        $(element).attr("data-target") != $(this).attr("data-target")) {
                        $idTemp = $("#" + $(element).attr("data-target"));
                        indx = $(".step-header[data-target='" + $idTemp.attr('id') + "'").attr("data-index");
                        $("#session-" + indx).html("");
                        $(element).find(".step-arrow").html("<i class='bbva-icon ui-plus'></i>");
                        $idTemp.slideUp("slow");
                    }
                }
                $(".accordion .step-header").not("data-target", $(this).attr("data-target")).removeClass(
                    "is-open");
                $("html").scrollTop($(this).position().top);
                $(this).addClass("is-open");
                $(this).find(".step-arrow").html("<i class='bbva-icon ui-minus'></i>");
                $content.slideDown(400, function () {
                    $head.removeClass("animated");
                });
                var session = scheduledSession.find(function (s) {
                    if (s.id == index) return s;
                });

                switch (session.status) {
                    case "F":
                        console.log("Estatus: ya no se puede modificar");
                        loadTemplate($content, miniTemplates.evaluated, {
                            session: session
                        });
                        break;
                    case "M":
                        console.log("Estatus: se puede modificar");
                        loadTemplate($content, miniTemplates.modifyEval, {
                            session: session
                        });
                        break;
                    case "E":
                        console.log("Estatus: se puede evaluar");
                        loadTemplate($content, miniTemplates.eval, {
                            session: session
                        });
                        break;
                    case "TE":
                        console.log("Estatus: a\u00FAn no se puede evaluar");
                        loadTemplate($content, miniTemplates.toEval, {
                            session: session
                        });
                        break;
                    case "WD":
                        console.log("Estatus: sin fecha");
                        loadTemplate($content, miniTemplates.withoutDate, {
                            session: session
                        });
                        break;
                    default:
                        break;
                }
            }
        }
    });
};

var fn_confirm_deposits = function () {
    $('a.scholarship_deposits').click(function () {
        fn_link_together_pdata("scholarship-data", "deposits-pending");
    });
};

var fn_pending_deposits = function () {
    $('a.scholarship_pending').click(function () {
        fn_link_together_pdata("scholarship-data", "deposits-table");
    });
};

var fn_link_together_pdata = function (sectionPersonalData, areaPersonalData) {
    $("#btn-pdata").click();
    showWait();
    setTimeout(function () {
        $(".step-header[data-target='" + sectionPersonalData + "']").click();
        setTimeout(function () {
            var offset = $('#' + areaPersonalData).offset();
            window.scrollTo(0, offset.top - 100);
            hideWait();
        }, 500);
    }, 500);
};

var fn_eval = function () {
    $(".btn_yes_eval").click(function (e) {
        e.preventDefault();
        id = $(this).attr("data-id");
        loadTemplate($("#session-" + id), templates.realizedSession, {
            'id': id
        });
    });
    $(".btn_no_eval").click(function (e) {
        e.preventDefault();
        id = $(this).attr("data-id");
        loadTemplate($("#session-" + id), templates.noSession, {
            'id': id
        });
    });
};

var fn_no_session = function (_temp) {
    $("#reason").comboSelect([{
            'id': 0,
            'name': "No atend\u00F3 mi sesi\u00F3n"
        },
        {
            'id': 1,
            'name': "Mi mentor no pudo atender la sesi\u00F3n"
        }
    ]);

    sessionId = $(_temp).find("#session").val();
    if (scheduledSession[sessionId - 1].status == "M") {
        $("#reason").selectOptionId(evaluatedSession[sessionId - 1].reason.id);
    }

    $("#btn_save_eval_n").data("complete", function (_data) {
        console.log("_data no: ", _data);
        evaluatedSession[_data.session - 1].flag = "N";
        evaluatedSession[_data.session - 1].reason = _data.reason;
        evaluatedSession[_data.session - 1].comments = _data.comments;
        scheduledSession[_data.session - 1].status = "M";
        //s\u00F3lo para quitar la evaluaci\u00F3n pendiente
        if (_data.session - 1 == 3) {
            pendingSessions = 0;
        }

        showWait();
        setTimeout(() => {
            $("#btn-mentor").click();
            setTimeout(function () {
                $(".radio-tab").find("label[data-index='1']").click();
                setTimeout(function () {
                    $(".step-header[data-index='" + _data.session + "']").click();
                }, 200);
            }, 200);

            $("html").scrollTop($(".radio-tab").position().top);
            hideWait();
            //Se debe consultar la evaluaci\u00F3n para pintar de nuevo
            showSuccess("La evaluaci\u00F3n se ha guardado satisfactoriamente", "Gracias por tus comentarios.");

        }, 1000);
    });
}

var fn_stars = function (_temp) {
    sessionId = $(_temp).find("#session").val();
    $("#time").comboSelect(opc_time);

    $(".e-star").hover(function () {
        tparent = $(this).attr("data-parent");
        $allstars = $("#" + tparent + " > .e-star");
        indx = $allstars.index(this);
        $allstars.slice(0, indx + 1).addClass("blue-star");
        $allstars.slice(indx + 1).removeClass("blue-star");
    }, function () {
        curr_eval = $("#" + tparent).attr("data-eval");
        if (curr_eval == "") {
            $allstars.removeClass("blue-star");
        } else {
            $allstars.slice(0, parseInt(curr_eval)).addClass("blue-star");
            $allstars.slice(parseInt(curr_eval)).removeClass("blue-star");
        }
    });

    $(".e-star").click(function () {
        $("#" + tparent).attr("data-eval", (indx + 1));
        $("#" + tparent).addClass("evaluated");
        if ($("#" + tparent).hasClass("has-error")) {
            $("#" + tparent).removeClass("has-error");
            $("#" + tparent).find('span.text-message').html("&nbsp;");
        }
        if (indx < 2) {
            $("#" + tparent + "Coment").slideDown("fast");
        } else {
            $("#" + tparent + "Coment").slideUp("fast");
        }
    });

    if (scheduledSession[sessionId - 1].status == "M") {
        $("#starsAttention").addClass("evaluated");
        $("#starsTopic").addClass("evaluated");
        for (var i = 0; i < evaluatedSession[sessionId - 1].attention; i++) {
            $($("#starsAttention").find(".e-star")[i]).addClass("blue-star");
        }
        for (var i = 0; i < evaluatedSession[sessionId - 1].topic; i++) {
            $($("#starsTopic").find(".e-star")[i]).addClass("blue-star");
        }
        if (evaluatedSession[sessionId - 1].attention <= 2) {
            $("#starsAttentionComent").slideDown("slow");
        }
        if (evaluatedSession[sessionId - 1].topic <= 2) {
            $("#starsTopicComent").slideDown("slow");
        }
        $("#time").selectOptionId(evaluatedSession[sessionId - 1].time.id);
    }

    $("#btn_save_eval_r").data("complete", function (_data) {
        console.log("evalua la sesi\u00F3n: ", _data.session);
        console.log("_data", _data);
        evaluatedSession[_data.session - 1].flag = "Y";
        evaluatedSession[_data.session - 1].time = _data.time;
        evaluatedSession[_data.session - 1].attention = _data.starsAttention;
        evaluatedSession[_data.session - 1].topic = _data.starsTopic;
        evaluatedSession[_data.session - 1].attentionComments = _data.comentsAttention;
        evaluatedSession[_data.session - 1].topicComments = _data.comentsTopic;
        scheduledSession[_data.session - 1].status = "M";
        //s\u00F3lo para quitar la evaluaci\u00F3n pendiente
        if (_data.session - 1 == 3) {
            pendingSessions = 0;
        }
        showWait();
        setTimeout(() => {
            $("#btn-mentor").click();
            setTimeout(function () {
                $(".radio-tab").find("label[data-index='1']").click();
                setTimeout(function () {
                    $(".step-header[data-index='" + _data.session + "']").click();
                }, 200);
            }, 200);
            $("html").scrollTop($(".radio-tab").position().top);
            //Se debe consultar la evaluaci\u00F3n para pintar de nuevo
            hideWait();
            showSuccess("La evaluaci\u00F3n se ha guardado satisfactoriamente", "Gracias por la espera.");
        }, 1000);
    });
}

var fn_modify_eval = function () {
    $(".btn_modify_e").click(function (e) {
        e.preventDefault();
        id = $(this).attr("data-id");
        index = id - 1;
        if (evaluatedSession[id - 1].flag == "Y") {
            loadTemplate($("#session-" + id), templates.realizedSession, {
                'id': id,
                'starsAttention': evaluatedSession[index].attention,
                'starsTopic': evaluatedSession[index].topic,
                'attentionCom': evaluatedSession[index].attentionComments,
                'topicCom': evaluatedSession[index].topicComments
            });
        } else {
            //console.log("mensaje",evaluatedSession[index].comments);
            loadTemplate($("#session-" + id), templates.noSession, {
                'id': id,
                'comments': evaluatedSession[index].comments
            });
        }
    });
}

var fn_lastQualifications = function () {
    for (i in scholar.statusQualifications.averageScholarLastLevel) {
        var lastLevel = scholar.statusQualifications.averageScholarLastLevel[i];
        if (lastLevel.status == "P") {
            loadTemplate($("form[name='" + lastLevel.scholarLevel + "']").find(".lastLevel"), templates.qLastLevelView, {
                scholarLastLevel: lastLevel.scholarLastLevel,
                qualification: lastLevel.averageScholarLevel,
                certificate: lastLevel.folio != "" ? "block" : "none",
                folio: lastLevel.folio,
                text1: $("body").hasClass("mobile") ? "" : "Ver"
            });
        } else {
            loadTemplate($("form[name='" + lastLevel.scholarLevel + "']").find(".lastLevel"), templates.qLastLevel, {
                cards_after: (lastLevel.status == "S") ? "gray_scale" : "",
                scholarLevel: lastLevel.scholarLevel,
                scholarLastLevel: lastLevel.scholarLastLevel,
                qualification: lastLevel.averageScholarLevel,
                emptyCertificate: lastLevel.folio != "" ? "none" : "block",
                certificate: lastLevel.folio != "" ? "block" : "none",
                folio: lastLevel.folio,
                text1: $("body").hasClass("mobile") ? "" : "Ver",
                text2: $("body").hasClass("mobile") ? "" : "Actualizar",
                text3: $("body").hasClass("mobile") ? "" : "Eliminar",
                text4: $("body").hasClass("mobile") ? "" : "Cargar archivo"
            });
        }
    }
};
