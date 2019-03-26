var fn_tab = function () {
    var rtinprogress = false;
    $(".radio-tab > label").click(function (e) {
        if ($(this).hasClass("active") || $(this).hasClass("lock") || rtinprogress) return;
        rtinprogress = true;
        ind = $(this).attr("data-index");
        newstyle = "transform: translateX(calc(100% * " + ind + "));";
        $(".radio-tab > #indicator").attr("style", newstyle);
        $(".radio-tab > label").removeClass("active");
        $(this).addClass("active");

        $(".i-form.opened").slideUp("fast", function () {
            $(".i-form.opened").removeClass("opened");
            $("#wf" + ind).slideDown("fast", function () {
                $("#wf" + ind).addClass("opened");
                rtinprogress = false;
            });
        });
    });
};