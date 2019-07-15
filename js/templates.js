function getRootPath() {
    var enviroment = window.location.host;
    if (enviroment.indexOf("glenflores.me") != -1) {
        return "/convocatoriaenlinea-maqueta";
    } else {
        return "";
    }
}

var templates = {
    "profileImage": {
        path: "./views/modal/update_profile.html",
        onload: fn_drangdropProfile
    },
    "suc": {
        path: "./views/modal/success_m.html",
        onload: fn_aceptModal
    },
    "error": {
        path: "./views/modal/error_m.html",
        onload: fn_aceptModal
    },
    "conf": {
        path: "./views/modal/confirm_m.html",
        onload: fn_confirmModal
    },
    "ufile": {
        path: "./views/modal/uploadfile.html",
        onload: fn_uploadfilemodal
    },
    "visor": {
        path: "./views/modal/visor.html",
        onload: fn_showModal
    },
    "myQualifications": {
        path: "./views/qualifications/my_qualifications.html",
        onload: fn_my_qualifications
    },
    "qualifications": {
        path: "./views/qualifications/qualifications.html",
        onload: function(){
            fn_qualifications_in($("#qualifications_score"));
        }
    },
    "scholarship": {
        path: "./views/scholarship/my_scholarship.html",
        onload: fn_nothing
    },
    "scholarInfo": {
        path: "./views/personaldata/my-info.html",
        onload: fn_myinfo
    },
    "biography": {
        path: "./views/personaldata/biography.html",
        onload: fn_show_interests
    },
    "personalData": {
        path: "./views/personaldata/personal-data.html",
        onload: fn_personal_data
    },
    "scholarshipInformative": {
        path: "./views/personaldata/scholarship-informative.html",
        onload: fn_scholarship_data
    },
    "pendingMonthsP": {
        path: "./views/personaldata/pending-month.html",
        onload: fn_pending_months
    },
    "confirmMonthsTable": {
        path: "./views/personaldata/confirms-table.html",
        onload: fn_nothing
    },
    "scholarData": {
        path: "./views/personaldata/scholar-data.html",
        onload: fn_scholar_data
    },
    "universityData": {
        path: "./views/personaldata/university-data.html",
        onload: fn_nothing
    },
    "domicileData": {
        path: "./views/personaldata/domicile-data.html",
        onload: fn_domicile_data
    },
    "contactData": {
        path: "./views/personaldata/contact-data.html",
        onload: fn_contact_data
    },
    "tutorData": {
        path: "./views/personaldata/tutor-data.html",
        onload: fn_tutor_data
    },
    "working": {
        path: "./views/working.html",
        onload: fn_nothing
    },
    "cardsScore": {
        path: "./views/qualifications/cards_qualifications.html",
        onload: fn_cards_qualifications
    },
    "viewCardsScore": {
        path: "./views/qualifications/cards-qualifications-view.html",
        onload: fn_cards_qualifications
    },
    "changePass":{
        path: "./views/personaldata/change-pass.html",
        onload: fn_changePass
    },
    "mentor": {
        path: "./views/mentor/mentor-data.html",
        onload: fn_mentor
    },
    "home":{
        path: "./views/home/home.html",
        onload: fn_home
    },
    "confirmDeposits":{
        path: "./views/home/confirm_deposits.html",
        onload: fn_confirm_deposits
    },
    "pendingDeposits":{
        path: "./views/home/pending_deposits.html",
        onload: fn_pending_deposits
    },
    "legalData": {
        path: "./views/legal-conf.html",
        onload: fn_legal
    },
    "realizedSession": {
        path: "./views/mentor/realized-session.html",
        onload: fn_stars
    },
    "noSession":{
        path: "./views/mentor/no-session.html",
        onload: fn_no_session
    },
    "qLastLevel": {
        path: "./views/qualifications/last_level.html",
        onload: fn_cards_qualifications
    },
    "qLastLevelView": {
        path: "./views/qualifications/last_level_view.html",
        onload: fn_cards_qualifications
    },
    "bienvenido":{
        path: "./views/bienvenida/bienvenida.html",
        onload: fn_bienvenido
    },
    "avisosLegales":{
        path: "./views/bienvenida/avisos_legales.html",
        onload: fn_avisosLegales
    },
    "avisosLegales_final":{
        path: "./views/bienvenida/avisos_legales_fin.html",
        onload: fn_avisosLegales
    },
    "declinar_aviso":{
        path: "./views/bienvenida/declinar_aviso.html",
        onload: fn_declinarLegales
    }
};

function loadTemplate(element, template, data, inserttype) {
    function placeTemplate(templatetext) {
        var temp = $(Mustache.to_html(templatetext, data));
        element[inserttype](temp);
        if (inserttype == "html" && typeof validateControl === 'function') window.validateControl(element);
        template.onload(temp, data);
    }

    if (typeof inserttype === "undefined") inserttype = "html";
    if (!template) {
        console.error("loadTemplate: template is undefined [" + element + "]");
        return;
    }
    if (data) {
        if (typeof template.path !== 'undefined') {
            $.get( /*getRootPath()+*/ template.path, placeTemplate);
        } else if (typeof template.html !== 'undefined') {
            placeTemplate(template.html);
        }
    } else {
        console.warn("loadTemplate: data is null [" + template + "]");
    }
}

var miniTemplates = {
    "scholarHeader": {
        onload: fn_uploadProfile,
        html:'<div class="grid-container-home">'+
                '<div id="scholar-header" class="flex-items">' +
                    '<div id="profile" class="flex-items">' +
                        '<div class="avatar" id="profile-pic" data-target="#uploadScholarImage">' +
                            '{{initials_name}}' +
                        '</div>' +
                        '<div class="scholar-data">' +
                            '<div class="label-val">&#161;Hola {{scholarName}}&#33;</div>' +
                            '<div>{{schoolGrade}}</div>' +
                            '<div>{{program}}</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div id="alertMessage"></div>' +
            '</div>'
    },
    "filepreview": {
        html: '<div class="uploadfile animated fadeInLeft">' +
            '<div class="wrapper">' +
            '<div class="message">' +
            '<div class="message__heading dz-filename"><span data-dz-name></span></div>' +
            '<span class="message__body">' +
            '<span class="remove btn-delete-file"><i class="ui-trash"></i> Elimiar</span>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>'
    },
    "visorProfile": {
        onload: fn_change_profile,
        html: '<div class="title-blue">' +
                'Foto de perfil' +
              '</div>' +
              '<div id="profile-view">'+
                '<img src="{{photo}}" alt="">'+
               '</div>'+
               '<div class="submtbtn">'+
                  '<span title="Continuar" aria-label="Continuar" class="btn__basic btn__submit" id="btn_change_profile">'+
                     '<span aria-hidden="true">Cambiar foto</span>'+
                  '</span>'+
                '</div>'
    },
    "multipleAlerts": {
        onload: fn_animationAlert,
        html: '<div id="slider">' +
            '<a href="#" class="control_next"><i class="bbva-icon ui-simple-right"></i></a>' +
            '<a href="#" class="control_prev"><i class="bbva-icon ui-simple-left"></i></a>' +
            '<ul>' +
            '{{#alerts}}' +
                '<li>'+
                    '<div><i class="bbva-icon ui-alarm"></i></div>'+
                    '<div>{{message}}</div>'+
                '</li>' +
            '{{/alerts}}' +
            '</ul>' +
            '</div>'
    },
    "oneAlert": {
        onload: fn_nothing,
        html: '<div id="slider">' +
                '<ul>' +
                    '<li>'+
                        '<div><i class="bbva-icon ui-alarm"></i></div>'+
                        '<div>{{message}}</div>'+
                    '</li>' +
                '</ul>' +
              '</div>'
    },
    "notification": {
        onload: fn_closeNotification,
        html: '<div class="notification {{type}}" style="display: none;">' +
            '<div class="wrapper">' +
            '<div class="icon">' +
            '<i class="bbva-icon"></i>' +
            '</div>' +
            '<div class="message">' +
            '<div class="message__heading">' +
            '{{title}}' +
            '</div>' +
            '<span class="message__body">' +
            '{{message}}' +
            '</span>' +
            '</div>' +
            '<div class="close-button">' +
            '<i class="bbva-icon ui-x"></i>' +
            '</div>' +
            '</div>' +
            '</div>'
    },
    "checkbox": {
        onload: fn_activeCheckbox,
        html: '<div class="grid-item">' +
            '<div class="item-fill">' +
            '<div class="item-corner">' +
            '<div class="checkbox-area">' +
            '<span class="checkbox" id="int{{interestId}}">' +
            '<i class="bbva-icon ui-checkmark"></i>' +
            '</span>' +
            '<span class="text"> &nbsp; {{interestName}}</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
    },
    "vineta":{
        onload: fn_nothing,
        html: '<div class="vin-li"><i class="bbva-icon ui-list-bullet"></i>{{description}}</div>'
    },
    "noMentor": {
        onload: fn_nothing,
        html: '<div class="content">'+
                '<div class="container">'+
                    '<div class="card">'+
                        '<div class="step-container centertext">'+
                            '<div class="title-blue"><i class="bbva-icon ui-warning"></i></div><br>'+
                            '<div class="title-blue">Por el momento no cuentas con un mentor asignado</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
               '</div>'
    },
    "evaluated": {
        onload: fn_nothing,
        html: '<div class="grid-table-simple header-t">'+
                '<div>CALENDARIO</div>'+
                '<div>CONFIRMACI\u00D3N DE SESI\u00D3N</div>'+
              '</div>'+
              '<div class="grid-table-simple content-t">'+
                    '<div>Tu cita fue el: {{session.date}} {{session.horary}}</div>'+
                    '<div class="mess">Gracias por confirmar</div>'+
                '</div>'
    },
    "modifyEval": {
        onload: fn_modify_eval,
        html: '<div class="grid-table-simple header-t">'+
                '<div>CALENDARIO</div>'+
                '<div>CONFIRMACI\u00D3N DE SESI\u00D3N</div>'+
              '</div>'+
              '<div class="grid-table-simple content-t">'+
                    '<div>Tu cita fue el: {{session.date}} {{session.horary}}</div>'+
                    '<div>'+
                        '<span title="Modificar" aria-label="Modificar" class="btn__basic btn__clearbg btn_modify_e" data-id="{{session.id}}" id="btn_modify_eval_{{session.id}}">'+
                            '<span aria-hidden="true">Modificar evaluaci\u00F3n</span>'+
                        '</span>'+
                    '</div>'+
              '</div>'+
              '<div id="session-{{session.id}}"></div>'
    },
    "eval": {
        onload: fn_eval,
        html: '<div class="grid-table-simple header-t">'+
                '<div>CALENDARIO</div>'+
                '<div>CONFIRMACI\u00D3N DE SESI\u00D3N</div>'+
              '</div>'+
              '<div class="grid-table-simple content-t">'+
                    '<div>Tu cita fue el: {{session.date}} {{session.horary}}</div>'+
                    '<div class="grid-container">'+
                        '<div class="grid-item d-contents">'+
                            '<div>'+
                                '<span title="Continuar" aria-label="Continuar" class="btn__basic btn__clearbg btn_yes_eval" data-id="{{session.id}}" id="btn_yes_eval_{{session.id}}">'+
                                    '<span aria-hidden="true">Si se realiz\u00F3</span>'+
                                '</span>'+
                            '</div>'+
                        '</div>'+
                        '<div class="grid-item d-contents">'+
                            '<div>'+
                                '<span title="Continuar" aria-label="Continuar" class="btn__basic btn__clearbg btn_no_eval" data-id="{{session.id}}" id="btn_no_eval_{{session.id}}">'+
                                    '<span aria-hidden="true">No se realiz\u00F3</span>'+
                                '</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div id="session-{{session.id}}"></div>'
    },
    "toEval": {
        onload: fn_nothing,
        html: '<div class="grid-table-simple header-t">'+
                '<div>CALENDARIO</div>'+
                '<div>CONFIRMACI\u00D3N DE SESI\u00D3N</div>'+
              '</div>'+
              '<div class="grid-table-simple content-t">'+
                    '<div>Tu cita fue el: {{session.date}} {{session.horary}}</div>'+
                    '<div class="grid-container">'+
                        '<div class="grid-item d-contents">'+
                            '<div>'+
                                '<span title="Continuar" aria-label="Continuar" class="btn__basic btn_yes_eval btn__clearbg btn__disabled" data-id="{{session.id}}" id="btn_yes_eval_{{session.id}}">'+
                                    '<span aria-hidden="true">Si se realiz\u00F3</span>'+
                                '</span>'+
                            '</div>'+
                        '</div>'+
                        '<div class="grid-item d-contents">'+
                            '<div>'+
                                '<span title="Continuar" aria-label="Continuar" class="btn__basic btn_no_eval btn__clearbg btn__disabled" data-id="{{id}}" id="btn_no_eval_{{id}}">'+
                                    '<span aria-hidden="true">No se realiz\u00F3</span>'+
                                '</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
    },
    "withoutDate": {
        onload: fn_nothing,
        html: '<div class="grid-table-simple header-t">'+
                '<div>CALENDARIO</div>'+
                '<div>CONFIRMACI\u00D3N DE SESI\u00D3N</div>'+
              '</div>'+
              '<div class="grid-table-simple content-t">'+
                    '<div>No tienes cita agendada</div>'+
                    '<div class="grid-container">'+
                        '<div class="grid-item d-contents">'+
                            '<div>'+
                                '<span title="Continuar" aria-label="Continuar" class="btn__basic btn_yes_eval btn__clearbg btn__disabled" data-id="{{session.id}}" id="btn_yes_eval_{{session.id}}">'+
                                    '<span aria-hidden="true">Si se realiz\u00F3</span>'+
                                '</span>'+
                            '</div>'+
                        '</div>'+
                        '<div class="grid-item d-contents">'+
                            '<div>'+
                                '<span title="Continuar" aria-label="Continuar" class="btn__basic btn_no_eval btn__clearbg btn__disabled" data-id="{{session.id}}" id="btn_no_eval_{{session.id}}">'+
                                    '<span aria-hidden="true">No se realiz\u00F3</span>'+
                                '</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
    }
}