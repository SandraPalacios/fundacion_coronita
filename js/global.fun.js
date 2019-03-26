function showWait() {
    $("#waitmodal").removeAttr("style");
}

function hideWait() {
    $("#waitmodal").css("display", "none");
}

var fn_loadHeader = function () {
    ini = scholar.personalData.name.charAt(0) + scholar.personalData.lastName.charAt(0);
    ini = ini.toUpperCase();
    loadTemplate($("#scholarheader"), miniTemplates.scholarHeader, {
        scholarName: scholar.personalData.name,
        schoolGrade: scholar.statusQualifications.schoolGrade,
        program: scholar.scholarship.programName,
        initials_name: ini
    });
}

var fn_loadProfilePicture = function () {
    if (scholar.personalData.base64ProfilePicture) {
        $('[data-target="#uploadScholarImage"]').css({
            "background-image": "url(" + scholar.personalData.base64ProfilePicture + ")",
            "background-size": "cover",
            "background-position-x": "center"
        });
        $("#profile-pic").html("");
    }
}

var fn_showAlerts = function () {
    if (scholar.alerts.length != 0) {
        if (scholar.alerts.length == 1) {
            console.log("Sólo trae una alerta");
            loadTemplate($("#alertMessage"), miniTemplates.oneAlert, scholar.alerts[0]);
        } else {
            loadTemplate($("#alertMessage"), miniTemplates.multipleAlerts, {
                alerts: scholar.alerts
            });
        }
    }
}

function showSuccess(title,message){
    loadTemplate($("#modal_generic .body"), templates.suc, {
        title: title,
        message: message
    });
}