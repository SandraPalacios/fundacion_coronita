/**
 * Established all roots to consult any service and define default message's modals.
 * @returns {string} Root path
 */
var SCONFIG = (function() {
    var SROOT_PATH = 'http://127.0.0.1:3004/';
    var VISOR_PATH = '/visorbecas_mx_web/visorbecas_mx_web/VisorExterno?aplicacion=becas&folio=';
    var services = {
        'AVERAGE_QUERY': 'average/query',
        'CONSULT_LEVELGRADE': 'consult/levelGrade',
        'CONSULT_PARAMETERS': 'consult/parameters',
        'DEPOSIT_MODIFICATION': 'deposit/modification',
        'DEPOSIT_QUERY': 'deposit/query',
        'DETAILS_SCHOLAR': 'details/scholar',
        'MODIF_UPLOADSCHOLAR': 'modif/uploadSchoolar',
        'QUALIFICATION_QUERY': 'qualification/query',
        'UPDATE_QUALIFICATION': 'update/qualification',
        'UPLOAD_IMAGE': 'upload/image',
        'VALIDATION_SCHOLAR': 'validation/scholar',
        'SEND_MULT_DOCUMENT': 'documents/sendmulti',
        'SEND_DOCUMENT': 'documents/send',
        'GET_DOCUMENT': 'documents/list',
        'GET_ALERTS': 'aler/alerts',
        'GET_STATES': 'list/state',
        'GET_MUNICIPALITY': 'list/municipality',
        'SCHOLAR_UPDATEPASSWORD': 'scholar/updatepassword',
        'TERMINATE_SESSION': 'terminate/session',
        'LIST_CATALOGS': 'application/catalogs',
        'UPDATE_BIOGRAPHY': 'update/biography',
        'GET_MENTOR': 'get/mentor',
        'CONSULT_PARAMETERS_TPVIA': 'consult/parameters/tpvia',
        'CONSULT_PARAMETERS_SX': 'consult/parameters/sx',
        'CONSULT_PARAMETERS_PAREN': 'consult/parameters/paren',
        'CONSULT_PARAMETERS_CDRB': 'consult/parameters/cdrb'

    };
    var messages = {
        error: {
            title: 'Ocurri\u00F3 un error',
            message: 'Por favor intenta de nuevo más tarde'
        },
        success: {
            title: 'Operaci\u00F3n realizada',
            message: 'La operaci\u00F3n se relaiz\u00F3 de forma correcta.'
        }
    }
    return {
        get: function(name) { return SROOT_PATH + services[name]; },
        getMessage: function(message) { return messages[message]; },
        getVisor: function(codeFol) { return window.location.origin + VISOR_PATH + codeFol; }
    };
})();