/**
 * Created by Administrator on 2017/7/19.
 */
function numAddZero(e) {
    var e = parseInt(e);
    return e >= 10 ? e : "0" + e
}
function getInt(e) {
    return parseInt(e.replace("px", ""))
}
function isEmail(e) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(e)
}
function isPhone(e) {
    return /^1[3|4|5|8][0-9]\d{8}$/.test(e)
}
function clearNewMark() {
    return !!$("#nav-list").length && void $.each($("#nav-list li.new"), function(e, a) {
            $(this).removeClass("new")
        })
}
function wechatSharePop() {
    $(".arrow").is(":hidden") ? ($(".arrow").show(), $(".vip-b").addClass("wechat-share").show()) : ($(".vip-b").removeClass("wechat-share").hide(), $(".arrow").hide())
}
function clickToHide(e, a) {
    e.on("tap click", function(e) {
        return e.stopImmediatePropagation(), a.fadeOut(), !1
    })
}
function loadCodeImage(e) {
    e.attr("src", e.attr(".src")), e[0].onload = function() {
        load = 0
    }, e[0].onerror = function() {
        if (load--, !(load <= 0)) {
            var e = $(this),
                a = e.attr("src");
            a.indexOf("?") != -1 ? a = a.replace(/\?.*/i, "?" + +new Date) : a += "?" + +new Date, e.attr("src", a)
        }
    }
}
function loginByAlert(e) {
    var a = $(e).data("class") || "",
        t = $("#alert-signIn");
    t.length ? (t.show(), a && t.addClass(a).data("extendClass", a)) : $.get("/public/signinAlert", function(e) {
            var t = $(e);
            $("body").append(t), t.show().find(".form-horizontal").data("referrer", location.href), accountPwd(t.find(".form-horizontal")), t.find("#code-img").length && loadCodeImage(t.find("#code-img")), a && t.addClass(a).data("extendClass", a)
        })
}
function showOpenVipSwal(e) {
    if (e.indexOf("vip-info") == -1) swal(e);
    else if (e.indexOf("ssvip") == -1) if (e.indexOf("keyword") == -1) swal({
        title: e,
        html: !0,
        showCancelButton: !0,
        confirmButtonText: Lang.open_btn[LangObj.openVipType]
    }, function() {
        setTimeout(function() {
            window.open("/account/setting/type/settingVip")
        }, 100)
    });
    else {
        var a = $("#alert-vip");
        a.fadeIn(400), a.find(".alert-vip-msg").html(e), a.find(".alert-vip-close,.alert-vip-bg").click(function() {
            a.fadeOut(400)
        }), a.find(".manage-word").click(function() {
            setTimeout(function() {
                $('.add-custom-keyword .btn[type="manage"]').click()
            }, 200), a.fadeOut(200)
        }), a.find(".open-vip").html(Lang.open_btn[LangObj.openVipType]), a.find(".open-vip").click(function() {
            setTimeout(function() {
                window.open("/account/setting/type/settingVip")
            }, 100), a.fadeOut(400)
        })
    } else swal({
        title: e,
        html: !0
    })
}
function tooltipInit() {
    $('[data-toggle="tooltip"]').tooltip({
        delay: {
            show: 50,
            hide: 90
        }
    })
}
function ajaxRequestAction(e, a, t, n) {
    e.hasClass("btn") && (e.addClass("disabled"), e.attr("disabled", !0)), $.ajax({
        type: e.data("type") || "GET",
        url: n || e.data("action"),
        data: t || e.data("datas") || "",
        success: function(n) {
            e.hasClass("btn") && (e.removeClass("disabled"), e.attr("disabled", !1)), a ? a(n, e, t) : 1e4 != n.code && swal(n.msg)
        }
    })
}
function ajaxSendForm(e, a, t) {
    a.addClass("disabled"), a.attr("disabled", !0), $.ajax({
        type: "POST",
        url: e.attr("action"),
        data: e.serialize(),
        success: function(e) {
            return a.removeClass("disabled"), a.attr("disabled", !1), t ? (t(), !1) : void swal(e.msg)
        }
    })
}
function dataCenterDeleteAction(e) {
    if (!$("#dataCenter").length) return !1;
    var a = $("#dataCenter .dcbc-nav-tab a").data("platform");
    1 == a ? (e.parents(".list").remove(), $("#dataCenter #dcbcBodyAndroid .list .appinfo .number").each(function(e, a) {
            $(a).html(e + 1)
        })) : (e.parents(".dcbct-tbody-info-chart").remove(), $("#dataCenter #dcbcBodyIos .dcbct-tbody-info-chart .dcbc-table-num").each(function(e, a) {
            $(a).html(e + 1)
        }))
}
function getDataCenterKeyword() {
    if (!$("#dataCenter").length) return !1;
    var e, a = $("#dataCenter #dcbNavWord"),
        t = a.data("ajaxurl"),
        n = $("#dataCenter #dcbCopyWord .dcb-content-table").clone();
    return !!t && void $.getJSON(t, {}, function(t, i) {
            1e4 == t.code && t.html && (a.find(".dcb-content-no-data").addClass("hidden"), $.each(t.html, function(t, i) {
                e = n.clone(), e.find(".word-text").text(i.word), e.find("tbody").html(i.list), e.find(".dcbct-word-del").data("word", i.word), a.find(".dcb-content-add").after(e)
            }), $('[data-toggle="tooltip"]').tooltip({
                delay: {
                    show: 55,
                    hide: 90
                }
            }))
        })
}
function dataCenterShowAppInfo() {
    if (!$("#dataCenter").length) return !1;
    var e = $("#dataCenter #dcbcBodyIos .dcbct-body-action-td .action-info:eq(0)");
    e.trigger("click")
}
function dataCenterModifyRowData(e, a, t) {
    return !!e && void $.ajax({
            url: a,
            type: "POST",
            dataType: "json",
            data: t,
            success: function(a) {
                var t = a.data.out_html;
                1e4 == a.code ? (a.isInvest ? e.find(".dcbct-body-info-tr td").filter(":eq(1),:eq(2),:eq(3),:eq(4)").remove() : e.find(".dcbct-body-info-tr td").filter(":eq(1),:eq(2),:eq(3),:eq(4),:eq(5)").remove(), e.find(".dcbct-info-name a").text(t.app_info.app_name), e.find(".dcbc-table-icon a .icon").attr("src", t.app_info.icon), e.find(".dcbct-body-info-tr td:eq(0)").after(t.num_html), e.find(".spinner-box").addClass("animation-hide")) : swal(a.msg)
            }
        })
}
function dataCenterLoadChartData(e, a, t) {
    function n(e, a) {
        e.find(".data-show").length && e.find(".data-show").html(a)
    }
    function i(e, a) {
        e.find("tbody").length && (e.find("tbody").html(a), e.find("tbody .chart-show").each(function(e, a) {
            var t = $(this),
                n = t.data("chartdata");
            o(t, n)
        }))
    }
    function o(e, a) {
        if (!a) return !1;
        var t = e.find(".chart-data"),
            n = a;
        n.color = "#00BC93", Highcharts.setOptions({
            global: {
                timezoneOffset: (new Date).getTimezoneOffset()
            }
        }), t.highcharts({
            chart: {
                type: "area",
                width: 200,
                height: 70,
                line: 0
            },
            exporting: {
                enabled: !1
            },
            title: {
                text: ""
            },
            credits: !0,
            xAxis: {
                labels: {
                    enabled: !1
                },
                type: "datetime",
                tickLength: 0,
                lineColor: "#FFFFFF"
            },
            yAxis: {
                gridLineWidth: 0,
                labels: {
                    enabled: !1
                },
                title: {
                    text: ""
                },
                reversed: !0
            },
            lang: {
                noData: Lang.appcenter_download_no_data
            },
            legend: {
                enabled: !1
            },
            tooltip: {
                crosshairs: {
                    color: "#C0C0C0"
                },
                positioner: function(e, a, t) {
                    var n = t.plotX;
                    return this.chart.plotWidth < t.plotX + e ? n = t.plotX - .8 * e : t.plotX < this.chart.plotLeft && (n = t.plotX + .2 * e), {
                        x: n
                    }
                },
                hideDelay: 200,
                shared: !0,
                valueSuffix: Lang.staff,
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                dateTimeLabelFormats: {
                    millisecond: Lang.dateTimeLabelFormats_week,
                    second: Lang.dateTimeLabelFormats_week,
                    minute: Lang.dateTimeLabelFormats_week,
                    hour: Lang.dateTimeLabelFormats_week,
                    day: Lang.dateTimeLabelFormats_week,
                    month: Lang.dateTimeLabelFormats_week,
                    year: Lang.dateTimeLabelFormats_week
                },
                useHTML: !0,
                headerFormat: '<small style="display: block; padding-bottom: 10px;">{point.key}</small><table>',
                pointFormatter: function() {
                    return '<tr><td style="color:' + this.series.color + ' !important;padding-right: 3px !important;">●</td><td>' + this.series.name + '</td><td style=" padding-left: 7px !important; color:' + this.series.color + ' !important;">' + Math.abs(this.y) + "</td></tr>"
                },
                footerFormat: "</table>"
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 100,
                            y1: 0,
                            x2: 0,
                            y2: 0
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get("rgba")]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [n]
        })
    }
    function s(e, a) {
        if (!a) return !1;
        var t = e.find(".chart-data"),
            n = "undefined" == typeof e.data("reversed") || e.data("reversed"),
            i = [],
            o = ["#00BC93", "#ea5a5a", "#428edc", "#e2719e", "#e58844", "#5dcfa3", "#61b5d6", "#5fd055", "#e5da19", "#ee4f89", "#b47b42"];
        if (a.list) {
            var s = 0;
            for (index in a.list) a.list[index] && (a.list[index].color = o[s], i.push(a.list[index])), s++
        }
        var r = {
            spacingRight: 40,
            width: 330,
            height: 190,
            marginLeft: 50,
            marginRight: 10
        };
        n || (r.marginLeft = 70, r.marginRight = 20), Highcharts.setOptions({
            global: {
                timezoneOffset: (new Date).getTimezoneOffset()
            }
        }), t.highcharts({
            chart: r,
            legend: {
                enabled: !0,
                y: 20
            },
            exporting: {
                enabled: !1
            },
            lang: {
                noData: Lang.appcenter_download_no_data
            },
            credits: !0,
            title: {
                text: ""
            },
            xAxis: {
                type: "datetime",
                startOnTick: !1,
                endOnTick: !1,
                min: a.min_date,
                max: a.max_date,
                labels: {
                    step: 1
                },
                dateTimeLabelFormats: {
                    millisecond: Lang.dateTimeLabelFormats_millisecond,
                    second: Lang.dateTimeLabelFormats_second,
                    minute: Lang.dateTimeLabelFormats_minute,
                    hour: Lang.dateTimeLabelFormats_hour,
                    day: Lang.dateTimeLabelFormats_day,
                    week: Lang.dateTimeLabelFormats_week,
                    month: Lang.dateTimeLabelFormats_month,
                    year: Lang.dateTimeLabelFormats_year
                },
                lineColor: "#C0C0C0",
                lineWidth: 1,
                tickLength: 0,
                tickWidth: 1,
                tickColor: "#EEEEEE"
            },
            yAxis: {
                title: {
                    text: ""
                },
                allowDecimals: !1,
                offset: 0,
                tickPositioner: function() {
                    var e, a, t = [],
                        n = 1;
                    for (this.dataMax < 5 ? (e = 1, a = 5) : this.dataMax < 20 ? (e = 5, a = 20) : this.dataMax < 50 ? (e = 10, a = 50) : this.dataMax < 100 ? (e = 20, a = 100) : this.dataMax < 500 ? (e = 100, a = 500) : this.dataMax < 1500 ? (e = 500, a = 1500) : (a = this.dataMax + 10, e = Math.ceil(1e3 * Math.ceil(a / 1e3) / 5)), 0 == this.dataMin && (n = 0), t.push(n), n; n - e <= a; n += e) n <= 1 || n == this.dataMin - 1 || t.push(this.dataMin > 1 ? n - 1 : n);
                    return t
                },
                reversed: n,
                gridLineWidth: 1,
                gridLineColor: "#EEEEEE",
                labels: {
                    formatter: function() {
                        return Math.abs(this.value)
                    }
                },
                lineColor: "#C0C0C0",
                lineWidth: 1,
                tickLength: 0,
                tickWidth: "1",
                tickColor: "#EEEEEE"
            },
            tooltip: {
                crosshairs: {
                    color: "#C0C0C0"
                },
                positioner: function(e, a, t) {
                    var n = t.plotX;
                    return this.chart.plotWidth < t.plotX + e ? n = t.plotX - .8 * e : t.plotX < this.chart.plotLeft && (n = t.plotX + .6 * e), {
                        x: n
                    }
                },
                hideDelay: 200,
                shared: !0,
                valueSuffix: Lang.staff,
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                dateTimeLabelFormats: {
                    millisecond: Lang.dateTimeLabelFormats_week,
                    second: Lang.dateTimeLabelFormats_week,
                    minute: Lang.dateTimeLabelFormats_week,
                    hour: Lang.dateTimeLabelFormats_week,
                    day: Lang.dateTimeLabelFormats_week,
                    month: Lang.dateTimeLabelFormats_week,
                    year: Lang.dateTimeLabelFormats_week
                },
                useHTML: !0,
                headerFormat: '<small style="display: block; padding-bottom: 10px;">{point.key}</small><table>',
                pointFormatter: function() {
                    return '<tr><td style="color:' + this.series.color + ' !important;padding-right: 3px !important;">●</td><td>' + this.series.name + '</td><td style=" padding-left: 7px !important; color:' + this.series.color + ' !important;">' + Math.abs(this.y) + "</td></tr>"
                },
                footerFormat: "</table>"
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: !1
                    },
                    enableMouseTracking: !0
                },
                series: {
                    states: {
                        hover: {
                            enabled: !0,
                            lineWidth: 2,
                            halo: {
                                size: 0,
                                attributes: {
                                    fill: Highcharts.getOptions().colors[2],
                                    "stroke-width": 1,
                                    stroke: Highcharts.getOptions().colors[1]
                                }
                            }
                        }
                    },
                    marker: {
                        enabled: !0,
                        radius: a.total > 360 ? 1 : 2,
                        states: {
                            hover: {
                                radiusPlus: 2,
                                lineWidthPlus: 1
                            }
                        }
                    }
                }
            },
            series: i
        })
    }
    function r(e, a) {
        if (!a) return !1;
        var t = e.find(".chart-data"),
            n = [],
            i = ["#00BC93", "#ea5a5a"];
        if (a.list) {
            var o = 0;
            for (index in a.list) a.list[index] && (a.list[index].color = i[o], n.push(a.list[index])), o++
        }
        var s = {
            type: "column",
            spacingRight: 40,
            marginLeft: 50,
            marginRight: 5,
            width: 330,
            height: 190
        };
        Highcharts.setOptions({
            global: {
                timezoneOffset: (new Date).getTimezoneOffset()
            }
        }), t.highcharts({
            chart: s,
            legend: {
                enabled: !0,
                x: 30,
                y: 20
            },
            exporting: {
                enabled: !1
            },
            lang: {
                noData: Lang.appcenter_download_no_data
            },
            credits: !0,
            title: {
                text: ""
            },
            xAxis: {
                type: "datetime",
                startOnTick: !1,
                endOnTick: !1,
                min: a.min_date,
                max: a.max_date,
                labels: {
                    step: 1
                },
                dateTimeLabelFormats: {
                    millisecond: Lang.dateTimeLabelFormats_millisecond,
                    second: Lang.dateTimeLabelFormats_second,
                    minute: Lang.dateTimeLabelFormats_minute,
                    hour: Lang.dateTimeLabelFormats_hour,
                    day: Lang.dateTimeLabelFormats_day,
                    week: Lang.dateTimeLabelFormats_week,
                    month: Lang.dateTimeLabelFormats_month,
                    year: Lang.dateTimeLabelFormats_year
                },
                lineColor: "#C0C0C0",
                lineWidth: 1,
                tickLength: 0,
                tickWidth: 1,
                tickColor: "#EEEEEE"
            },
            yAxis: {
                title: {
                    text: ""
                },
                reversed: !1,
                offset: 0,
                gridLineColor: "#ddd",
                lineColor: "#ddd",
                gridLineWidth: 1,
                lineWidth: 1,
                labels: {
                    enabled: !0
                }
            },
            tooltip: {
                crosshairs: {
                    color: "#C0C0C0"
                },
                positioner: function(e, a, t) {
                    var n = t.plotX;
                    return this.chart.plotWidth < t.plotX + e ? n = t.plotX - .8 * e : t.plotX < this.chart.plotLeft && (n = t.plotX + .6 * e), {
                        x: n
                    }
                },
                hideDelay: 200,
                shared: !0,
                valueSuffix: Lang.staff,
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                dateTimeLabelFormats: {
                    millisecond: Lang.dateTimeLabelFormats_week,
                    second: Lang.dateTimeLabelFormats_week,
                    minute: Lang.dateTimeLabelFormats_week,
                    hour: Lang.dateTimeLabelFormats_week,
                    day: Lang.dateTimeLabelFormats_week,
                    month: Lang.dateTimeLabelFormats_week,
                    year: Lang.dateTimeLabelFormats_week
                },
                useHTML: !0,
                headerFormat: '<small style="display: block; padding-bottom: 10px;">{point.key}</small><table>',
                pointFormatter: function() {
                    return '<tr><td style="color:' + this.series.color + ' !important;padding-right: 3px !important;">●</td><td>' + this.series.name + '</td><td style=" padding-left: 7px !important; color:' + this.series.color + ' !important;">' + Math.abs(this.y) + "</td></tr>"
                },
                footerFormat: "</table>"
            },
            plotOptions: {
                series: {
                    pointWidth: 6
                }
            },
            series: n
        })
    }
    function d(e, a) {
        if (!a) return !1;
        var n = e.find(".chart-data"),
            i = a.chardata,
            o = {
                type: "spline",
                marginLeft: 50,
                marginRight: 5,
                width: 330,
                height: 190
            };
        Highcharts.setOptions({
            global: {
                timezoneOffset: (new Date).getTimezoneOffset()
            }
        }), n.highcharts({
            chart: o,
            legend: {
                enabled: !0,
                x: 20,
                y: 20
            },
            exporting: {
                enabled: !1
            },
            lang: {
                noData: "cn" == t.country || "us" == t.country ? Lang.appcenter_download_no_data : Lang.mycenter_keyword_no_data
            },
            credits: !1,
            title: {
                text: ""
            },
            xAxis: {
                labels: {
                    enabled: !1
                },
                type: "datetime",
                lineColor: "#ddd",
                tickLength: 0
            },
            yAxis: {
                title: "",
                reversed: !1,
                offset: 0,
                gridLineColor: "#ddd",
                lineColor: "#ddd",
                lineWidth: 0,
                tickPositioner: function() {
                    var e = [],
                        a = 1,
                        t = this.dataMax + 10,
                        n = Math.ceil(100 * Math.ceil(t / 100) / 5);
                    for (e.push(a), a; a - n <= t; a += n) a <= 1 || a == this.dataMin - 1 || e.push(a - 1);
                    return e
                }
            },
            tooltip: {
                crosshairs: {
                    color: "#C0C0C0"
                },
                positioner: function(e, a, t) {
                    var n = t.plotX;
                    return this.chart.plotWidth < t.plotX + e ? n = t.plotX - .8 * e : t.plotX < this.chart.plotLeft && (n = t.plotX + .6 * e), {
                        x: n,
                        y: 30
                    }
                },
                hideDelay: 200,
                shared: !0,
                valueSuffix: Lang.staff,
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                dateTimeLabelFormats: {
                    millisecond: Lang.dateTimeLabelFormats_week,
                    second: Lang.dateTimeLabelFormats_week,
                    minute: Lang.dateTimeLabelFormats_week,
                    hour: Lang.dateTimeLabelFormats_week,
                    day: Lang.dateTimeLabelFormats_week,
                    month: Lang.dateTimeLabelFormats_week,
                    year: Lang.dateTimeLabelFormats_week
                },
                useHTML: !0,
                headerFormat: '<small style="display: block; padding-bottom: 10px;">{point.key}</small><table>',
                pointFormatter: function() {
                    return '<tr><td style="color:' + this.series.color + ' !important;padding-right: 3px !important;">●</td><td>' + this.series.name + '</td><td style=" padding-left: 7px !important; color:' + this.series.color + ' !important;">' + Math.abs(this.y) + "</td></tr>"
                },
                footerFormat: "</table>"
            },
            plotOptions: {
                series: {
                    stacking: "",
                    states: {
                        hover: {
                            enabled: !0,
                            lineWidth: 1,
                            halo: {
                                size: 0,
                                attributes: {
                                    fill: Highcharts.getOptions().colors[2],
                                    "stroke-width": 1,
                                    stroke: Highcharts.getOptions().colors[1]
                                }
                            }
                        }
                    },
                    marker: {
                        enabled: !1,
                        radius: 0,
                        states: {
                            hover: {
                                radiusPlus: 2,
                                lineWidthPlus: 1
                            }
                        }
                    }
                }
            },
            series: i.list
        })
    }
    function c(e, a) {
        if (!a || 0 == a.chardata.length) return !1;
        var t = e.find(".chart-data"),
            n = a.chardata,
            i = {
                type: "column",
                spacingRight: 40,
                marginLeft: 0,
                marginRight: 1,
                width: 330,
                height: 190
            };
        Highcharts.setOptions({
            global: {
                timezoneOffset: (new Date).getTimezoneOffset()
            }
        }), t.highcharts({
            chart: i,
            legend: {
                enabled: !1
            },
            exporting: {
                enabled: !1
            },
            lang: {
                noData: Lang.appcenter_download_no_data
            },
            credits: !1,
            title: {
                text: ""
            },
            xAxis: {
                labels: {
                    enabled: !1
                },
                type: "datetime",
                lineColor: "#ddd",
                tickLength: 0,
                lineWidth: 0
            },
            yAxis: {
                title: {
                    text: ""
                },
                reversed: !1,
                offset: -10,
                gridLineColor: "#ddd",
                lineColor: "#ddd",
                gridLineWidth: 0,
                lineWidth: 0,
                labels: {
                    enabled: !1
                }
            },
            tooltip: {
                crosshairs: {
                    color: "#C0C0C0"
                },
                positioner: function(e, a, t) {
                    var n = t.plotX;
                    return this.chart.plotWidth < t.plotX + e ? n = t.plotX - .8 * e : t.plotX < this.chart.plotLeft && (n = t.plotX + .6 * e), {
                        x: n
                    }
                },
                hideDelay: 200,
                shared: !0,
                valueSuffix: Lang.staff,
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                dateTimeLabelFormats: {
                    millisecond: Lang.dateTimeLabelFormats_week,
                    second: Lang.dateTimeLabelFormats_week,
                    minute: Lang.dateTimeLabelFormats_week,
                    hour: Lang.dateTimeLabelFormats_week,
                    day: Lang.dateTimeLabelFormats_week,
                    month: Lang.dateTimeLabelFormats_week,
                    year: Lang.dateTimeLabelFormats_week
                },
                useHTML: !0,
                headerFormat: '<small style="display: block; padding-bottom: 10px;">{point.key}</small><table>',
                pointFormatter: function() {
                    return '<tr><td style="color:' + this.series.color + ' !important;padding-right: 3px !important;">●</td><td>' + this.series.name + '</td><td style=" padding-left: 7px !important; color:' + this.series.color + ' !important;">' + Math.abs(this.y) + "</td></tr>"
                },
                footerFormat: "</table>"
            },
            plotOptions: {
                series: {
                    pointWidth: 6
                }
            },
            series: n.list
        })
    }
    return !!e && (a || (a = e.find(".get-analysis-data").data("ajaxurl") || ""), t || (t = e.find(".get-analysis-data").data("querydata") || {}), e.hasClass("data-ready") || e.find(".spinner-box").addClass("show"), void $.ajax({
            url: a,
            type: "GET",
            dataType: "json",
            data: t,
            success: function(a) {
                var t = a.data;
                1e4 == a.code ? (a.isInvest ? (s(e.find(".rank-chart"), t.rankWeek), s(e.find(".keyword-chart"), t.rankMonth), s(e.find(".download-chart"), t.futureDownload)) : (d(e.find(".keyword-chart"), t.keyword), c(e.find(".download-chart"), t.download), s(e.find(".rank-chart"), t.rank), i(e.find(".focus-keyword-chart"), t.custom), n(e.find(".shelves-chart"), t.shelves)), r(e.find(".comment-chart"), t.comment), e.find(".spinner-box").removeClass("show").addClass("animation-hide"), e.addClass("data-ready")) : swal(a.msg)
            }
        }))
}
function dataCenterDrag() {
    return !1
}
function centerModals() {
    $(".modal").each(function(e) {
        if (!$(this).hasClass("avatar-modal")) {
            var a = $(this).clone().css("display", "block").appendTo("body"),
                t = Math.round((a.height() - a.find(".modal-content").height()) / 2);
            t = t > 0 ? t : 0, a.remove(), $(this).find(".modal-content").css("margin-top", t)
        }
    }), $(".modal").on("show.bs.modal", centerModals)
}
function moreBtnShow() {
    $("table.version").length > 0 && $.each($(".version-desc"), function(e, a) {
        200 == $(this).height() && $(this).find("span").removeClass("hide")
    })
}
function wechatShareGetJifen(e) {
    return !!e.sign && void $.ajax({
            type: "get",
            url: "/account/wechatShare",
            data: {
                sign: e.sign
            },
            dataType: "json",
            success: function(e) {}
        })
}
function refreshPage() {
    $.pjax.reload("#container")
}
function pjaxLoad(e, a) {
    e && (a || (a = "#container"), $.pjax({
        url: e,
        container: a,
        scrollTo: !1
    }))
}
function bindWechat(e, a) {
    var t, n = $(e),
        i = n.data("type") || "",
        o = n.data("qrcodeurl"),
        s = n.data("checkurl"),
        r = n.data("bindinwechat"),
        d = n.data("title") || Lang.bindWechat_title;
    return requestTimes = 0, extendClass = n.data("class") || "", window.isWechat && !a ? ($.getJSON(r, function(a) {
            1e4 == a.code ? swal({
                    title: "绑定成功",
                    type: "success"
                }, function() {
                    var e = document.location.href;
                    e += e.indexOf("?") != -1 ? "&" : "?";
                    var a = e.match(/t=\d+/i);
                    e = a ? e.replace(a, "t=" + +new Date) : e + "t=" + +new Date, document.location.href = e
                }) : bindWechat(e, !0)
        }), !1) : window.isWechat && 2 == a ? (wechatSharePop(), !1) : (swal({
                title: '<div class="wechat-qrcode" id="wechat-qrcode"><h4 class="title-second"><span></span>' + d + '</h4><div class="qrcode-container"><img src="' + sourcePublic + 'app/images/v2/wecaht-loading.jpg" alt="" /><div class="logo"></div></div></div>',
                text: '<div class="wechat-qrcode-desc">&nbsp;</div>',
                showConfirmButton: !0,
                confirmButtonText: Lang.close,
                cancelButtonText: Lang.cancel_btn,
                confirmButtonColor: "#0bb995",
                customClass: extendClass,
                html: !0,
                allowOutsideClick: !0
            }, function() {
                location.pathname.indexOf("settingSubscribe") !== -1 && _hmt.push(["_trackEvent", "个人中心&微信订阅", "取消绑定"]), clearInterval(t)
            }), void(o && $.getJSON(o, function(e) {
                if (1e4 == e.code) {
                    if ($("#wechat-qrcode img").attr("src", e.imgsrc), $(".wechat-qrcode-desc").html(e.desc), $("#wechat-qrcode img")[0].onload = function() {
                            $("#wechat-qrcode .logo").show()
                        }, !s) return;
                    t = setInterval(function() {
                        requestTimes++, requestTimes >= 100 && ($(".sa-button-container .confirm").trigger("click"), clearInterval(t)), $.getJSON(s, function(e) {
                            if (1e4 == e.code) {
                                $(".wechat-qrcode-desc").html(e.msg), clearInterval(t);
                                var a;
                                if (i && "alertlogin" == i) a = "/account/signin/?t=" + +new Date;
                                else {
                                    a = document.location.href, a += a.indexOf("?") != -1 ? "" : "?";
                                    var n = a.match(/t=\d+/i);
                                    a = n ? a.replace(n, "t=" + +new Date) : a + "&t=" + +new Date
                                }
                                document.location.href = a
                            } else 10108 == e.code && (clearInterval(t), swal({
                                title: e.msg,
                                type: "error",
                                showCancelButton: !1,
                                confirmButtonColor: "#33ba95",
                                confirmButtonText: Lang.confirm_btn,
                                cancelButtonText: Lang.cancel_btn
                            }))
                        })
                    }, 1500)
                } else swal({
                    title: e.msg,
                    type: "error",
                    showCancelButton: !1,
                    confirmButtonColor: "#33ba95",
                    confirmButtonText: Lang.confirm_btn,
                    cancelButtonText: Lang.cancel_btn
                })
            })))
}
function setTitle(e) {
    $("head title").html(decodeURI(e));
    var a = location.pathname.split("/")[2];
    a = a.replace(/([A-Z])/g, "-$1").toLowerCase(), a = "container-" + a, $("#container").attr("class", "container-box " + a)
}
function unBindWechat(e) {
    var a = $(e),
        t = a.data("url");
    $.getJSON(t, function(e) {
        1e4 == e.code ? swal({
                title: Lang.unbindWechat_title,
                showConfirmButton: !0,
                confirmButtonText: Lang.confirm_btn,
                cancelButtonText: Lang.cancel_btn,
                confirmButtonColor: "#0bb995"
            }, function() {
                document.location.reload()
            }) : swal(e.msg, "", "error")
    })
}
function dataSearchPush_android() {
    $.fn.dataTable.ext.search.push(function(e, a, t) {
        var n, i = parseInt($("#minHints").val(), 10),
            o = parseInt($("#maxHints").val(), 10);
        return n = parseFloat(a[10]) || 0, !! (isNaN(i) && isNaN(o) || isNaN(i) && n <= o || i <= n && isNaN(o) || i <= n && n <= o)
    }), $(document).on("keyup", ".screen-nav .btn-group input", function() {
        var e = $(this);
        e.val() ? e.addClass("hasData") : e.removeClass("hasData"), $(".screen-nav .hasData").length > 0 ? $("#clear-screen").show() : $("#clear-screen").hide(), window.tableSort && window.tableSort.draw(), window.keywordExtend && window.keywordExtend.draw()
    })
}
function dataSearchPush() {
    $.fn.dataTable.ext.search.push(function(e, a, t) {
        var n, i = parseInt($("#minHints").val(), 10),
            o = parseInt($("#maxHints").val(), 10);
        return n = $("#is_android").length ? parseFloat(a[10]) || 0 : parseFloat(a[3]) || 0, !! (isNaN(i) && isNaN(o) || isNaN(i) && n <= o || i <= n && isNaN(o) || i <= n && n <= o)
    }), $.fn.dataTable.ext.search.push(function(e, a, t) {
        var n = parseInt($("#minResult").val(), 10),
            i = parseInt($("#maxResult").val(), 10),
            o = parseFloat(a[4]) || 0;
        return !!(isNaN(n) && isNaN(i) || isNaN(n) && o <= i || n <= o && isNaN(i) || n <= o && o <= i)
    }), $.fn.dataTable.ext.search.push(function(e, a, t, n, i) {
        var o = parseInt($("#minRank").val(), 10),
            s = parseInt($("#maxRank").val(), 10);
        if (window.tableSort) var r = parseFloat(a[1]) || 0;
        if (window.keywordExtend) var r = parseFloat(a[4]) || 0;
        return !!(isNaN(o) && isNaN(s) || isNaN(o) && r <= s || o <= r && isNaN(s) || o <= r && r <= s)
    }), $(document).on("keyup", ".screen-nav .btn-group input", function() {
        var e = $(this);
        e.val() ? e.addClass("hasData") : e.removeClass("hasData"), $(".screen-nav .hasData").length > 0 ? $("#clear-screen").show() : $("#clear-screen").hide(), window.tableSort && window.tableSort.draw(), window.keywordExtend && window.keywordExtend.draw()
    }), $(document).on("click", "#clear-screen", function() {
        $(".screen-nav input").val(""), window.tableSort && window.tableSort.draw(), window.keywordExtend && window.keywordExtend.draw(), $("#clear-screen").hide()
    })
}
function dataTables(e, a) {
    var t = e,
        n = t.data("keywordurl"),
        i = t.data("hintsurl"),
        o = t.data("numberurl"),
        s = t.data("nosignin"),
        r = t.data("plat");
    return !!t && (window.tableSort && (window.tableSort = null), window.diff = a, void(r ? (window.tableSort = t.DataTable({
                dom: window.isMobile ? "frtip" : "lfrtip",
                data: window.tableData,
                order: [],
                lengthMenu: [100, 200, 500, 1e3],
                lengthChange: !window.isMobile,
                searching: !0,
                searchDelay: 200,
                autoWidth: !1,
                createdRow: function(e, a, t) {
                    a[4] && $(e).addClass("bg"), $(e).addClass("keyword-histroy")
                },
                columnDefs: [{
                    className: "sort-word",
                    type: "chinese",
                    data: function(e, a, t, i) {
                        return "sort" === a ? e[0] : '<a href="' + n + encodeURIComponent(e[0]) + '" target="_blank">' + e[0] + "</a>"
                    },
                    targets: 0
                }, {
                    orderSequence: ["desc", "asc"],
                    className: "sort-rank",
                    type: "numeric",
                    data: function(e, a, t, n) {
                        if (window.diff) return e[1];
                        var i, o = e[1];
                        return "sort" === a ? parseInt(o) : i = 0 == o ? "- " + Lang.down_list : o
                    },
                    targets: 1
                }, {
                    orderSequence: ["desc", "asc"],
                    className: "sort-rank",
                    type: "numeric",
                    data: function(e, a) {
                        if (window.diff) return e[7];
                        var t, n, i, o = e[7];
                        return "sort" === a ? parseInt(o) : (o > 0 ? (n = "top", i = Lang.rise + o + Lang.staff) : 0 == o ? (n = "right", i = Lang.unchanged) : (n = "bottom", i = Lang.decline + Math.abs(o) + Lang.staff), t = '<div class="' + n + '" title="' + Lang.compared_to_yesterday_ranking + i + '"><span class="glyphicon glyphicon-triangle-' + n + '" aria-hidden="true"></span><span>' + Math.abs(o) + "</span></div>")
                    },
                    targets: 2
                }, {
                    orderSequence: ["desc", "asc"],
                    className: "sort-nums",
                    data: function(e, a, t, n) {
                        return '<a class="number" href="' + i + e[6] + '" target="_blank">' + e[2] + "</a>"
                    },
                    targets: 3
                }, {
                    orderable: !1,
                    data: function(e, a, t, n) {
                        var i, o, r, d, c;
                        return c = isMobile ? "" : "tooltip", i = "", 0 == s && (1 == e[4] ? (r = Lang.cancel_btn, o = "icon-cancel custom-remove-android", d = Lang.cancel_attention) : (r = Lang.set_top, o = "icon-top add-custom-keyword-btn-android", d = Lang.add_attention), i += '<span class="icon ' + o + '" type="add" data-keyword="' + e[0] + '" data-id="' + e[6] + '" data-type="cancel" data-toggle="' + c + '" data-original-title="' + d + '">' + r + "</span>"), i
                    },
                    targets: 4
                }],
                initComplete: function() {
                    t.find('[data-toggle="tooltip"]').tooltip({
                        delay: {
                            show: 100,
                            hide: 100
                        }
                    })
                },
                language: {
                    sProcessing: Lang.dataTables_sProcessing,
                    sLengthMenu: Lang.dataTables_sLengthMenu,
                    sZeroRecords: Lang.dataTables_sZeroRecords,
                    sInfo: Lang.dataTables_sInfo,
                    sInfoEmpty: Lang.dataTables_sInfoEmpty,
                    sInfoFiltered: Lang.dataTables_sInfoFiltered,
                    sInfoPostFix: "",
                    sSearch: Lang.dataTables_sSearch,
                    sUrl: "",
                    sEmptyTable: Lang.dataTables_sEmptyTable,
                    sLoadingRecords: Lang.dataTables_sLoadingRecords,
                    sInfoThousands: ",",
                    oPaginate: {
                        sFirst: Lang.dataTables_sFirst,
                        sPrevious: "<",
                        sNext: ">",
                        sLast: Lang.dataTables_sLast
                    },
                    oAria: {
                        sSortAscending: Lang.dataTables_sSortAscending,
                        sSortDescending: Lang.dataTables_sSortDescending
                    },
                    searchPlaceholder: "多个词同时搜索用“，”隔开",
                    searchWidth: "168px"
                }
            }), $("#sort_filter").length && $("#sort_filter").css({
                "float": "left",
                "margin-top": "24px",
                "margin-left": "15px"
            }), $("#sort_length").length && $("#sort_length").css({
                "float": "right",
                "margin-top": "24px",
                "margin-left": "15px"
            })) : window.tableSort = t.DataTable({
                dom: window.isMobile ? "frtip" : "lfrtip",
                data: window.tableData,
                order: [],
                lengthMenu: [100, 200, 500, 1e3],
                lengthChange: !window.isMobile,
                searching: !0,
                searchDelay: 200,
                autoWidth: !1,
                createdRow: function(e, a, t) {
                    a[4] && $(e).addClass("bg"), $(e).addClass("keyword-histroy")
                },
                columnDefs: [{
                    className: "sort-word",
                    type: "chinese",
                    data: function(e, a, t, i) {
                        return "sort" === a ? e[0] : '<a href="' + n + encodeURIComponent(e[0]) + '" target="_blank">' + e[0] + "</a>"
                    },
                    targets: 0
                }, {
                    orderSequence: ["desc", "asc"],
                    className: "sort-rank",
                    type: "numeric",
                    data: function(e, a, t, n) {
                        if (window.diff) return e[1];
                        var i, o = e[1];
                        return "sort" === a ? parseInt(o) : i = 0 == o ? "- " + Lang.down_list : o
                    },
                    targets: 1
                }, {
                    orderSequence: ["desc", "asc"],
                    className: "sort-rank",
                    type: "numeric",
                    data: function(e, a) {
                        if (window.diff) return e[7];
                        var t, n, i, o = e[7];
                        return "sort" === a ? parseInt(o) : (o > 0 ? (n = "top", i = Lang.rise + o + Lang.staff) : 0 == o ? (n = "right", i = Lang.unchanged) : (n = "bottom", i = Lang.decline + Math.abs(o) + Lang.staff), t = '<div class="' + n + '" title="' + Lang.compared_to_yesterday_ranking + i + '"><span class="glyphicon glyphicon-triangle-' + n + '" aria-hidden="true"></span><span>' + Math.abs(o) + "</span></div>")
                    },
                    targets: 2
                }, {
                    orderSequence: ["desc", "asc"],
                    className: "sort-nums",
                    data: function(e, a, t, n) {
                        return '<a class="number" href="' + i + e[6] + '" target="_blank">' + e[2] + "</a>"
                    },
                    targets: 3
                }, {
                    orderSequence: ["desc", "asc"],
                    className: "sort-index",
                    data: function(e, a, t, n) {
                        return '<a class="number" href="' + o + e[6] + '" target="_blank">' + e[3] + "</a>"
                    },
                    targets: 4
                }, {
                    orderable: !1,
                    data: function(e, a, t, n) {
                        var i, o, r, d, c;
                        return c = isMobile ? "" : "tooltip", i = '<span class="icon icon-trend histroy" data-id="' + e[6] + '" data-toggle="' + c + '" data-original-title="' + Lang.show_history_trend + '">' + Lang.trend + "</span>", 0 == s && (1 == e[4] ? (r = Lang.cancel_btn, o = "icon-cancel custom-remove", d = Lang.cancel_attention) : (r = Lang.set_top, o = "icon-top add-custom-keyword-btn", d = Lang.add_attention), i += '<span class="icon ' + o + '" type="add" data-keyword="' + e[0] + '" data-id="' + e[6] + '" data-type="cancel" data-toggle="' + c + '" data-original-title="' + d + '">' + r + "</span>"), i
                    },
                    targets: 5
                }],
                initComplete: function() {
                    t.find('[data-toggle="tooltip"]').tooltip({
                        delay: {
                            show: 100,
                            hide: 100
                        }
                    })
                },
                language: {
                    sProcessing: Lang.dataTables_sProcessing,
                    sLengthMenu: Lang.dataTables_sLengthMenu,
                    sZeroRecords: Lang.dataTables_sZeroRecords,
                    sInfo: Lang.dataTables_sInfo,
                    sInfoEmpty: Lang.dataTables_sInfoEmpty,
                    sInfoFiltered: Lang.dataTables_sInfoFiltered,
                    sInfoPostFix: "",
                    sSearch: Lang.dataTables_sSearch,
                    sUrl: "",
                    sEmptyTable: Lang.dataTables_sEmptyTable,
                    sLoadingRecords: Lang.dataTables_sLoadingRecords,
                    sInfoThousands: ",",
                    oPaginate: {
                        sFirst: Lang.dataTables_sFirst,
                        sPrevious: "<",
                        sNext: ">",
                        sLast: Lang.dataTables_sLast
                    },
                    oAria: {
                        sSortAscending: Lang.dataTables_sSortAscending,
                        sSortDescending: Lang.dataTables_sSortDescending
                    },
                    searchPlaceholder: "多个词同时搜索用“，”隔开",
                    searchWidth: "168px"
                }
            })))
}
function dataTables_android(e, a) {
    var t = e,
        n = t.data("keywordurl"),
        i = (t.data("hintsurl"), t.data("numberurl"), t.data("nosignin")),
        o = $("#keyword-list");
    return setTimeout(function() {
        o.find(".table").find(".table-body").removeClass("hide"), o.find(".spinner-bg").removeClass("show").find(".spinner").removeClass("show")
    }, 200), !! t && (window.tableSort && (window.tableSort = null), window.diff = a, void(window.tableSort = t.DataTable({
        dom: window.isMobile ? "frtip" : "lfrtip",
        data: window.tableData,
        order: [],
        lengthMenu: [100, 200, 500, 1e3],
        lengthChange: !window.isMobile,
        searching: !0,
        searchDelay: 200,
        autoWidth: !1,
        createdRow: function(e, a, t) {
            a[12] && $(e).addClass("bg"), $(e).addClass("keyword-histroy")
        },
        columnDefs: [{
            orderable: !1,
            className: "sort-word",
            type: "chinese",
            data: function(e, a, t, i) {
                return "sort" === a ? e[0] : '<a href="' + n + encodeURIComponent(e[0]) + '" target="_blank">' + e[0] + "</a>"
            },
            targets: 0
        }, {
            orderable: !1,
            orderSequence: ["desc", "asc"],
            className: "sort-rank",
            type: "numeric",
            targets: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }, {
            orderSequence: ["desc", "asc"],
            className: "sort-index",
            data: function(e, a, t, n) {
                return e[10]
            },
            targets: 10
        }, {
            orderable: !1,
            data: function(e, a, t, n) {
                var o, s, r, d, c;
                return c = isMobile ? "" : "tooltip", o = "", 0 == i && (1 == e[12] ? (r = Lang.cancel_btn, s = "icon-cancel custom-remove-android", d = Lang.cancel_attention) : (r = Lang.set_top, s = "icon-top add-custom-keyword-btn-android", d = Lang.add_attention), o += '<span class="icon ' + s + '" type="add" data-keyword="' + e[0] + '" data-id="' + e[11] + '" data-type="cancel" data-toggle="' + c + '" data-original-title="' + d + '">' + r + "</span>"), o
            },
            targets: 11
        }],
        initComplete: function() {
            t.find('[data-toggle="tooltip"]').tooltip({
                delay: {
                    show: 100,
                    hide: 100
                }
            })
        },
        language: {
            sProcessing: Lang.dataTables_sProcessing,
            sLengthMenu: Lang.dataTables_sLengthMenu,
            sZeroRecords: Lang.dataTables_sZeroRecords,
            sInfo: Lang.dataTables_sInfo,
            sInfoEmpty: Lang.dataTables_sInfoEmpty,
            sInfoFiltered: Lang.dataTables_sInfoFiltered,
            sInfoPostFix: "",
            sSearch: Lang.dataTables_sSearch,
            sUrl: "",
            sEmptyTable: Lang.dataTables_sEmptyTable,
            sLoadingRecords: Lang.dataTables_sLoadingRecords,
            sInfoThousands: ",",
            oPaginate: {
                sFirst: Lang.dataTables_sFirst,
                sPrevious: "<",
                sNext: ">",
                sLast: Lang.dataTables_sLast
            },
            oAria: {
                sSortAscending: Lang.dataTables_sSortAscending,
                sSortDescending: Lang.dataTables_sSortDescending
            },
            searchPlaceholder: "多个词同时搜索用“，”隔开",
            searchWidth: "168px"
        }
    })))
}
function dataTablesAsoCompire(e, a) {
    var t = e;
    t.length > 0 && 1 != t.find("tbody").find("tr td").length && (a ? t.dataTable({
            paging: !1,
            searching: !1,
            order: [],
            info: !1,
            columnDefs: []
        }) : t.dataTable({
            paging: !1,
            searching: !1,
            ordering: !1,
            info: !1
        }))
}
function mobileGotop() {
    var e = $(".top-back-mobile");
    return e.length > 0 && (e.on("click", function() {
        $("html, body").animate({
            scrollTop: "0px"
        }, 200)
    }), $(document).on("scroll", function() {
        $(document).scrollTop() > 300 ? e.hide() : e.hide()
    })), $(".rank-index").length > 0 && $('a[target="_blank"]').each(function(e, a) {
        $(a).attr("target", "_self")
    }), !1
}
function footerFixed() {
    function e() {
        var e = $(this).width(),
            s = $(this).height();
        t < s ? a.addClass("fixed") : a.removeClass("fixed"), e < 1200 ? (n.hide(), o = !1) : (o = !0, i && n.hide())
    }
    var a = $(".footer");
    if (a.length <= 0) return !1;
    var t = a.offset().top + a.outerHeight(),
        n = $(".top-back"),
        i = !1,
        o = !0;
    parseInt(n.css("right"));
    t < $(window).height() ? a.addClass("fixed") : a.removeClass("fixed"), n.length > 0 && (n.on("click", function() {
        $("html, body").animate({
            scrollTop: "0px"
        }, 800)
    }), $(document).on("scroll", function() {
        o && $(document).scrollTop() > 100 ? (n.hide(), i = !0) : (n.hide(), i = !1)
    })), e(), $(window).on("resize", e)
}
function addMyApp(e, a, t) {
    if (e) {
        if (a = $(a), a.hasClass("disabled")) return !1;
        var n, i = a.data("name"),
            o = a.data("url"),
            s = a.data("reload"),
            t = t,
            r = a.html();
        if (s = "undefined" == typeof s ? 1 : s, n = $('input[name="platform-type"]').val() || "0", $.inArray(n, ["0", "1"]) == -1) return swal("参数错误，刷新后重试"), !1;
        a.html(Lang.now_adding);
        var d = "/account/addMyFavorite";
        $.ajax({
            type: "get",
            url: d,
            data: {
                appid: e,
                platform: n
            },
            dataType: "json",
            success: function(d) {
                if (d && 1e4 == d.code) if (data = d.data, s) window.location.reload();
                else {
                    "app" == t ? a.html('<a role="button" href="javascript:void(0);" class="btn btn-default" onclick="delMyAppAtInfo(' + e + ');"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>&nbsp;' + Lang.cancel_add + "</a>") : "datacenter" == t ? a.parent().html('<button href="javascript:void(0);" class="btn btn-custom disabled" data-url="' + o + '" data-name="' + i + '" onclick="delMyAppAtInfo(' + e + ',this,datacenter);">' + Lang.added + "</button>") : a.parent().html('<a role="button" href="javascript:void(0);" data-reload="0" data-url="' + o + '" data-name="' + i + '" class="btn btn-custom btn-default btn-padding" onclick="delMyAppAtInfo(' + e + ', this);"><span class="glyphicon glyphicon-aso-move" aria-hidden="true"></span>&nbsp;' + Lang.cancel_add + "</a>");
                    var c = 0 == data.platform ? "iOS" : "Android",
                        l = ".platform-" + data.platform,
                        p = newDiv = newLi = "";
                    if (newDiv = '<div class="platform-' + data.platform + '">', newDiv += '<div class="clearfix myapp-title"><span class="myapp-text">' + c + '</span><a class="myapp-btn" href="' + data.manageUrl + '">管理我的应用</a></div>', newDiv += '<i class="line myapp-list-' + data.platform + '"></i>', newLi = '<a class="myapp-li-' + data.appid + "-" + data.platform + '" href="' + data.appUrl + '"><li>', newLi += '<table class="myapp-list">', newLi += "<tr>", newLi += '<td rowspan="2" class="icon"><img src="' + data.icon + '" alt=""></td>', newLi += '<td><span class="app-name">' + data.appName + "</span></td>", newLi += '<tr><td><span class="publisher">' + data.publisher + "</span></td></tr>", newLi += "</table>", newLi += "</li></a>", p = newDiv + newLi + "</div>", $(".no-app").length > 0) $(p).insertAfter($(".my-apps").find(".myapp-list-header")), $(".my-apps").find(".no-app").remove();
                    else if ($(l).length > 0) {
                        var u = ".myapp-list-" + n;
                        $(newLi).insertAfter($(".my-apps").find(u))
                    } else 0 == data.platform ? $(p).insertBefore($(".my-apps").find(".platform-1")) : $(p).insertAfter($(".my-apps").find(".platform-0"))
                } else a.html(r), 10011 == d.code ? loginByAlert() : showOpenVipSwal(d.msg)
            }
        })
    }
}
function delMyApp(e, a, t) {
    return $.inArray(t, [0, 1]) == -1 ? (swal("参数错误，刷新后重试"), !1) : void swal({
            title: Lang.delete_app_title,
            text: Lang.delete_app_text,
            type: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: Lang.delete_app_confirmButtonText,
            cancelButtonText: Lang.cancel_btn,
            closeOnConfirm: !1
        }, function() {
            a = $(a);
            var n = (a.html(), "/account/delMyFavorite");
            $.ajax({
                type: "get",
                url: n,
                data: {
                    appid: e,
                    platform: t
                },
                dataType: "json",
                success: function(n) {
                    if (n && 1e4 == n.code) {
                        a.parents(".list").remove();
                        var i = ".my-apps .myapp-li-" + e + "-" + t;
                        $(i).remove();
                        var o = window.isMobile ? parseInt($(".myapp-list").val()) - 1 : $(".myapp-list").length;
                        if (o < 1) $(".my-apps .platform-1,.my-apps .platform-0").remove(), $('<li class="no-app"><a href="javascript:void(0);">' + Lang.delete_app_no_app + "</a></li>").insertBefore($(".my-apps").find(".myapp-list-header")), $(".app-list").html('<p class="text-center">' + Lang.delete_app_no_add_app + "</p>"), $(".platform-title-0,.platform-title-1").remove();
                        else {
                            if (window.isMobile) $(".myapp-list").val(o);
                            else {
                                var s = ".my-apps .platform-" + t + " .myapp-list",
                                    r = ".my-apps .platform-" + t;
                                $(s).length < 1 && $(r).remove()
                            }
                            var d = ".myapp .platform-" + t + " .media",
                                c = ".myapp .platform-" + t;
                            $(d).length < 1 && $(c).remove()
                        }
                        $(".myApp .list .number").each(function(e, a) {
                            $(a).html(e + 1)
                        }), $(".dataCenter .dcbct-body-app-td .dcbc-table-num").length && $(".dataCenter .dcbct-body-app-td .dcbc-table-num").each(function(e, a) {
                            $(a).html(e + 1)
                        }), swal(Lang.delete_app_succ_title, Lang.delete_app_succ_text, "success")
                    } else swal(n.msg)
                }
            })
        })
}
function delMyAppAtInfo(e, a) {
    swal({
        title: Lang.delete_app_title,
        text: Lang.delete_app_text,
        type: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: Lang.delete_app_confirmButtonText,
        cancelButtonText: Lang.cancel_btn,
        closeOnConfirm: !1
    }, function() {
        var t = "/account/delMyFavorite";
        a = $(a);
        var n, i = a.data("name"),
            o = a.data("url"),
            s = (a.data("reload"), a.data("page"));
        a.html();
        return n = $('input[name="platform-type"]').val(), $.inArray(n, ["0", "1"]) == -1 ? (swal("参数错误，刷新后重试"), !1) : void $.ajax({
                type: "get",
                url: t,
                data: {
                    appid: e,
                    platform: n
                },
                dataType: "json",
                success: function(t) {
                    if (t && 1e4 == t.code) if ("app" == s) window.location.reload();
                    else {
                        a.parent().html('<a class="btn btn-custom pace-inactive" href="javascript:void(0);" data-reload="0" data-url="' + o + '" data-name="' + i + '" onclick="addMyApp(' + e + ', this)" role="button"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;' + Lang.delete_app_add_my_app + "</a>");
                        var r = ".myapp-li-" + e + "-" + n;
                        if ($(r).remove(), $(".myapp-list").length < 1) $(".my-apps .platform-1,.my-apps .platform-0").remove(), $('<li class="no-app"><a href="javascript:void(0);">^_^ 没有应用</a></li>').insertBefore($(".my-apps").find(".myapp-list-header"));
                        else {
                            var d = ".my-apps .platform-" + n + " .myapp-list",
                                c = ".my-apps .platform-" + n;
                            $(d).length < 1 && $(c).remove()
                        }
                        swal({
                            title: t.msg,
                            type: "success",
                            showCancelButton: !1,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.confirm_btn,
                            cancelButtonText: Lang.cancel_btn
                        })
                    } else swal(t.msg)
                }
            })
    })
}
function ajaxSendVerifyMail(e, a) {
    if (e) {
        var t = "/account/ajaxSendVerifyMail";
        $.ajax({
            type: "get",
            url: t,
            data: {
                username: e
            },
            dataType: "json",
            success: function(e) {
                e && 1e4 == e.code ? $(a).parent().html(Lang.verify_mail_been_send) : $(a).parent().html(e.msg)
            }
        })
    }
}
function getCurrentKeywordData() {
    var e = {},
        a = 0;
    e.list = {}, e.max_date = window.chartData.max_date, e.min_date = window.chartData.min_date, e.total = window.chartData.total, e.title = window.chartData.title;
    for (var t = window.currentKeywordid.length - 1; t >= 0; t--) a = window.currentKeywordid[t], e.list[a] = window.chartData.list[a];
    return e
}
function arrDel(e, a) {
    return e.slice(0, a).concat(e.slice(a + 1))
}
function getChartsData(e, a, t) {
    if (!e) return !1;
    if ("object" == typeof e && (a = e.queryData, e = e.ajaxUrl), !e) return !1;
    var n = $(".export-data");
    if (n.length > 0) {
        var i = "",
            o = n.data("url") || "";
        o && ($.map(a, function(e, a) {
            i += "/" + a + "/" + e
        }), n.attr("href", o + i))
    }
    $.ajax({
        type: "get",
        url: e,
        data: a,
        dataType: "json",
        success: function(e, n, i) {
            if (e && 1e4 == e.code) {
                (a.sdate || a.edate) && window.chartData.sdate == a.sdate && window.chartData.edate == a.edate || (window.chartData.sdate = a.sdate, window.chartData.edate = a.edate, window.chartData.list = e.data.list, window.chartData.min_date = e.data.min_date, window.chartData.max_date = e.data.max_date, window.chartData.total = e.data.total), a.word_id && !window.chartData.titleDate && (window.chartData.titleDate = Lang.nearly_seven_days), drawCharts(e.data, t);
                var o = i.getResponseHeader("Callback");
                if (o && o.indexOf("function") != -1) {
                    var s = new Function("return " + o)();
                    s()
                } else o && "function" == typeof window[o] && window[o](e.data)
            } else drawNodataCharts(e.msgelementObj, t)
        }
    })
}
function getChartsKeywordData(e, a) {
    var t = a.word_id;
    return !!t && (window.currentKeywordid = [t], void(window.hasDataIdStr && window.hasDataIdStr.indexOf(t) != -1 ? drawCharts(getCurrentKeywordData()) : (e || (e = $("#charts-ajax-data").data("ajaxurl")), window.hasDataIdStr += "," + t, $.ajax({
                type: "get",
                url: e,
                data: a,
                dataType: "json",
                success: function(e) {
                    var a;
                    if (e && 1e4 == e.code) {
                        window.chartData.max_date = e.data.max_date, window.chartData.min_date = e.data.min_date, window.chartData.total = e.data.total, window.chartData.title = e.data.title;
                        for (a in e.data.list) window.chartData.list[a] = e.data.list[a]
                    } else for (a = window.currentKeywordid.length - 1; a >= 0; a--) window.currentKeywordid[a] == t && (window.currentKeywordid = arrDel(window.currentKeywordid, a));
                    drawCharts(getCurrentKeywordData())
                }
            }))))
}
function getChartsKeywordDataHour(e, a) {
    var t = a.word_id;
    if (!t) return !1;
    if (a.word = $("#charts-appname").val(), window.currentKeywordid = [t], !e) {
        var n = $(".nav-date-bar-action .nav-item-hour"),
            i = $(".nav-date-bar-action .nav-item-day");
        n.addClass("active").siblings().removeClass("active"), n.data("querydata", JSON.stringify(a)), i.data("querydata", JSON.stringify(a)), n.data("showdate", Lang.date_range_7), i.data("showdate", Lang.date_range_3), e = $("#charts-ajax-data").data("defaultajaxurl")
    }
    $.ajax({
        type: "get",
        url: e,
        data: a,
        dataType: "json",
        success: function(e) {
            1e4 == e.code && (e.data.tickDefault = 1, drawCharts(e.data))
        }
    })
}
function getChartsSearchData(e, a) {
    if (!e) var e = $("#charts-ajax-data").data("defaultajaxurl");
    $.ajax({
        type: "get",
        url: e,
        data: a,
        dataType: "json",
        success: function(e) {
            e.data.tickDefault = 1, drawCharts(e.data)
        }
    })
}
function createTable(e) {
    var a = [],
        t = e.list[0].data,
        n = e.list.length,
        i = e.datatype,
        o = +new Date,
        s = 0,
        r = '<i data-toggle="tooltip" title="" style="padding: 5px;" data-original-title="' + Lang.no_data_3 + '">&nbsp;-&nbsp;</i>';
    e.nodata && e.dataDay && (o = e.dataDay);
    var d = function(e) {
            return e < 10 ? "0" + e : e
        },
        c = 0;
    $.each(t, function(t, i) {
        var l = new Date(i[0]);
        a[c] = [], a[c][0] = l.getFullYear() + "-" + d(l.getMonth() + 1) + "-" + d(l.getDate()), +l > o ? a[c][1] = r : (a[c][1] = i[1], s += i[1]);
        for (var t = 1; t < n; t++) n > 1 && (+l > o ? a[c][t + 1] = r : a[c][t + 1] = e.list[t].data[c][1]);
        c++
    }), a.reverse(), window.createTableSort && window.createTableSort.destroy();
    var l = $("#itc-sort");
    if ($("#itc-countNum")) {
        var p = new Date(e.min_date),
            u = new Date(e.max_date);
        p = p.getFullYear() + "年" + d(p.getMonth() + 1) + "月" + d(p.getDate()) + "日", u = u.getFullYear() + "年" + d(u.getMonth() + 1) + "月" + d(u.getDate()) + "日", s >= 1e4 && (s = (s / 1e4).toFixed(1) + "万"), $("#itc-countNum").html(p + "~" + u + " 下载量预估总计：" + s)
    }
    var h = [];
    0 == i ? l.html('<thead><tr class="large"><th>' + Lang.table_thead_1 + "</th><th>" + Lang.table_thead_10 + "</th></tr></thead><tbody></tbody>") : 1 == i ? l.html('<thead><tr class="large"><th>' + Lang.table_thead_1 + "</th><th>" + Lang.table_thead_2 + '<span data-toggle="tooltip" title="" class="glyphicon glyphicon-question-sign mobile-hide" data-original-title="' + Lang.table_thead_3 + '"></span></th><th>' + Lang.table_thead_4 + "</th><th>" + Lang.table_thead_5 + '<span data-toggle="tooltip" title="" class="glyphicon glyphicon-question-sign mobile-hide" data-original-title="' + Lang.table_thead_6 + '"></span></th><th>' + Lang.table_thead_7 + "</th></tr></thead><tbody></tbody>") : 2 == i ? l.html('<thead><tr class="large"><th>' + Lang.table_thead_1 + "</th><th>" + Lang.table_thead_8 + '<span data-toggle="tooltip" title="' + Lang.table_thead_9 + '" class="glyphicon glyphicon-question-sign mobile-hide"></span></th><th>' + Lang.table_thead_7 + "</th></tr></thead><tbody></tbody>") : (h = [{
                    data: function(e, a, t, n) {
                        return "sort" === a ? e[4] : e[4] > 0 ? e[4] + "%" : e[4]
                    },
                    targets: 4
                }], l.html('<thead><tr class="large"><th>' + Lang.table_thead_1 + "</th><th>" + Lang.table_thead_11 + '<span data-toggle="tooltip" title="" class="glyphicon glyphicon-question-sign mobile-hide" data-original-title="' + Lang.table_thead_11_tips + '"></span></th><th>' + Lang.table_thead_12 + '<span data-toggle="tooltip" title="" class="glyphicon glyphicon-question-sign mobile-hide" data-original-title="' + Lang.table_thead_12_tips + '"></span></th><th>' + Lang.table_thead_13 + '<span data-toggle="tooltip" title="" class="glyphicon glyphicon-question-sign mobile-hide" data-original-title="' + Lang.table_thead_13_tips + '"></span></th><th>' + Lang.table_thead_14 + '<span data-toggle="tooltip" title="" class="glyphicon glyphicon-question-sign mobile-hide" data-original-title="' + Lang.table_thead_14_tips + '"></span></th></tr></thead><tbody></tbody>')), window.createTableSort = l.DataTable({
        data: a,
        order: [],
        lengthMenu: [30, 90, 360],
        lengthChange: !1,
        searching: !1,
        autoWidth: !1,
        columnDefs: h,
        initComplete: function() {
            l.find('[data-toggle="tooltip"]').tooltip({
                delay: {
                    show: 100,
                    hide: 100
                }
            })
        },
        language: {
            sProcessing: Lang.dataTables_sProcessing,
            sLengthMenu: Lang.dataTables_sLengthMenu,
            sZeroRecords: Lang.dataTables_sZeroRecords,
            sInfo: Lang.dataTables_sInfo,
            sInfoEmpty: Lang.dataTables_sInfoEmpty,
            sInfoFiltered: Lang.dataTables_sInfoFiltered,
            sInfoPostFix: "",
            sSearch: Lang.dataTables_sSearch,
            sUrl: "",
            sEmptyTable: Lang.dataTables_sEmptyTable,
            sLoadingRecords: Lang.dataTables_sLoadingRecords,
            sInfoThousands: ",",
            oPaginate: {
                sFirst: Lang.dataTables_sFirst,
                sPrevious: "<",
                sNext: ">",
                sLast: Lang.dataTables_sLast
            },
            oAria: {
                sSortAscending: Lang.dataTables_sSortAscending,
                sSortDescending: Lang.dataTables_sSortDescending
            }
        }
    })
}
function createTableOptKeyword(e) {
    var a = $("#opt-keyword-sort"),
        t = JSON.parse(e),
        n = [],
        i = [];
    a.html('<thead><tr class="large"><th>' + Lang.dataTables_opt_keyword_name + "</th><th>" + Lang.dataTables_opt_keyword_hints + '<span data-toggle="tooltip" title="' + Lang.app_keyword_sort_index_tip + '" class="glyphicon glyphicon-question-sign mobile-hide"></span>&nbsp<i class="icon icon-up"></i><i class="icon icon-down"></i></th><th>' + Lang.dataTables_opt_keyword_result + '<span data-toggle="tooltip" title="' + Lang.app_keyword_sort_nums_tip + '" class="glyphicon glyphicon-question-sign mobile-hide"></span>&nbsp<i class="icon icon-up"></i><i class="icon icon-down"></i></th><th>' + Lang.dataTables_opt_keyword_tuozhan_1 + '<span data-toggle="tooltip" title="' + Lang.app_keyword_tuozhan_tip + '" class="glyphicon glyphicon-question-sign mobile-hide"></span></th></tr></thead><tbody></tbody>');
    for (var o = 0; o < t.length; o++) n[o] = [], n[o][0] = t[o].word, n[o][1] = t[o].hints, n[o][2] = t[o].search_no, n[o][3] = '<a href="https://aso100.com/trend/keywordExtend?keyword=' + t[o].word + '" target="_blank">' + Lang.dataTables_opt_keyword_tuozhan_2 + "</a>";
    window.tableSortOpt && (window.tableSortOpt = null), window.tableSortOpt = a.DataTable({
        data: n,
        order: [],
        lengthChange: !1,
        searching: !1,
        autoWidth: !1,
        columnDefs: i,
        paging: !1,
        info: !1
    })
}
function _exportingConfig(e) {
    Highcharts.setOptions({
        global: {
            timezoneOffset: (new Date).getTimezoneOffset()
        },
        lang: {
            downloadPNG: Lang.export_png,
            downloadXLS: Lang.export_jpg,
            contextButtonTitle: Lang.export_context
        }
    });
    var a = {
        enabled: !1
    };
    return window.isMobile || (a = {
        buttons: {
            contextButton: {
                menuItems: [{
                    text: Lang.export_png,
                    onclick: function() {
                        svgExport($(this.container).find("svg")[0], e, "png"), window.isMobile && $(".highcharts-contextmenu > div > div").css({
                            background: "none",
                            color: "rgb(48, 48, 48)"
                        })
                    }
                }, {
                    text: Lang.export_jpg,
                    onclick: function() {
                        svgExport($(this.container).find("svg")[0], e, "jpeg"), window.isMobile && $(".highcharts-contextmenu > div > div").css({
                            background: "none",
                            color: "rgb(48, 48, 48)"
                        })
                    }
                }]
            }
        }
    }), a
}
function _credits(e, a) {
    return e = "undefined" == typeof e || e, a = "undefined" != typeof a ? a : 13, {
        enabled: e,
        fontSize: a + "px",
        text: "Powered by ASO100.com",
        href: "http://www.aso100.com"
    }
}
function drawCharts(e, a) {
    if (!e) return !1;
    var t;
    if (t = a || $("#charts"), !t.length || "none" == t.css("display")) return !1;
    var n = [],
        i = "",
        o = 1,
        s = !0,
        r = "spline",
        d = "排名",
        c = "",
        l = ["#00BC93", "#ea5a5a", "#428edc", "#e2719e", "#e58844", "#5dcfa3", "#61b5d6", "#5fd055", "#e5da19", "#ee4f89", "#b47b42"],
        p = (l.length, t.data("appname") || $("#charts-appname").val() || ""),
        u = t.data("word") || $("#charts-word").val() || "",
        h = e.version || [],
        m = e.list || [],
        f = t && t.data("marginleft") || void 0,
        g = t && t.data("marginright") ? t.data("marginright") : isMobile ? 10 : void 0;
    "number" != typeof f && isMobile && (f = w > 500 ? 50 : 32);
    var b = t.find(".highcharts-legend-item");
    if (e.list) {
        var v = 0,
            w = 0;
        for (index in e.list) e.list[index] && ($.map(e.list[index].data, function(e, a) {
            Math.abs(e[1]) > w && (w = Math.abs(e[1]))
        }), e.list[index].color ? e.list[index].color = e.list[index].color : (e.list[index].color = l[v], v++), 0 != b.length && b.eq(index).is(".highcharts-legend-item-hidden") && "date" == window.searchType ? e.list[index].visible = !1 : e.list[index].visible = !0, n.push(e.list[index]))
    }
    if ("undefined" != typeof e.stacking && (c = e.stacking), "undefined" != typeof e.reversed && (s = e.reversed), "undefined" != typeof e.type && (r = e.type), "undefined" != typeof e.yAxisTxt && (d = e.yAxisTxt), o = (e.max_date - e.min_date) / 1e3 / 3600, o = Math.ceil(o / e.total), e.title ? (window.isMobile && (i = e.title.indexOf("“##APPNAME##”") != -1 ? e.title.replace("“##APPNAME##”", "") : e.title.replace("##APPNAME##", ""), i = e.title.indexOf("“##WORD##”") != -1 ? i.replace("“##WORD##”", "") : i.replace("##WORD##", "")), i = i || e.title.replace("##APPNAME##", p), i = "" != u ? i.replace("##WORD##", u) : i.replace("“##WORD##”", ""), i = i.replace("##DATE##", Lang.space + window.chartData.titleDate + Lang.space)) : i = window.chartData.titleDate ? window.chartData.titleDate + " " + Lang.ranking_trend : Lang.ranking_trend, fSize = isMobile ? "0.375rem" : "16px", t.length > 0) {
        var y = {
            type: r,
            spacingRight: 40,
            marginLeft: f,
            marginRight: g,
            backgroundColor: "",
            events: {
                load: function() {
                    var e = $('<div class="float-logo"></div>');
                    if (isMobile) {
                        var a = t.find(".highcharts-plot-border");
                        e.css({
                            top: parseInt(a.attr("y")) + parseInt(a.attr("height")) - 50,
                            bottom: "initial"
                        })
                    }
                    t.append(e)
                },
                redraw: function() {
                    chart = this, extremumDraw(m, chart, 1)
                }
            }
        };
        yAxisOffset = 0;
        var x = _exportingConfig(i);
        t.highcharts({
            chart: y,
            exporting: x,
            lang: {
                noData: Lang.no_data_3
            },
            legend: {
                itemMarginBottom: 10
            },
            noData: {
                style: {
                    fontSize: "16px",
                    color: "#777777"
                }
            },
            credits: _credits(!1),
            title: {
                text: i,
                style: {
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, "微软雅黑", sans-serif',
                    fontSize: fSize
                },
                x: 26
            },
            subtitle: {},
            xAxis: {
                type: "datetime",
                title: {},
                startOnTick: !1,
                endOnTick: !1,
                min: e.min_date,
                max: e.max_date,
                labels: {
                    step: 1
                },
                dateTimeLabelFormats: {
                    millisecond: Lang.dateTimeLabelFormats_millisecond,
                    second: Lang.dateTimeLabelFormats_second,
                    minute: Lang.dateTimeLabelFormats_minute,
                    hour: window.isKeywordShowHour ? Lang.dateTimeLabelFormats_hour_3 : Lang.dateTimeLabelFormats_hour,
                    day: Lang.dateTimeLabelFormats_day,
                    week: Lang.dateTimeLabelFormats_week,
                    month: Lang.dateTimeLabelFormats_month,
                    year: Lang.dateTimeLabelFormats_year
                },
                lineColor: "#C0C0C0",
                lineWidth: 1,
                tickLength: 0,
                tickWidth: 1,
                tickColor: "#EEEEEE"
            },
            yAxis: [{
                title: {
                    text: yAxisOffset >= 0 && !isMobile ? d : ""
                },
                allowDecimals: !1,
                offset: yAxisOffset,
                tickPositioner: function() {
                    if ("column" == r) return !1;
                    var a, t, n = [],
                        i = 1;
                    for (!e.tickDefault && this.dataMax < 5 ? (a = 1, t = 5) : !e.tickDefault && this.dataMax < 20 ? (a = 5, t = 20) : !e.tickDefault && this.dataMax < 50 ? (a = 10, t = 50) : !e.tickDefault && this.dataMax < 100 ? (a = 20, t = 100) : !e.tickDefault && this.dataMax < 500 ? (a = 100, t = 500) : !e.tickDefault && this.dataMax < 1500 ? (a = 500, t = 1500) : (i = "undefined" == typeof e.minY ? this.dataMin > 1 ? this.dataMin - 1 : this.dataMin : e.minY, a = Math.ceil((this.dataMax - (this.dataMin > i ? i : this.dataMin)) / 5), a = a > 0 ? a : 1, t = this.dataMax + 1), 0 == this.dataMin && (i = 0), n.push(i), i; i - a <= t; i += a) i <= 1 || i == this.dataMin - 1 || n.push(this.dataMin > 1 ? i - 1 : i);
                    return n
                },
                reversed: s,
                gridLineWidth: 1,
                gridLineColor: "#EEEEEE",
                labels: {
                    style: {
                        fontSize: isMobile ? 8 : 11
                    },
                    formatter: function() {
                        var e = Math.abs(this.value);
                        return e >= 1e8 ? e = Math.ceil(e / 1e7) / 10 + "亿" : e >= 1e7 ? e = Math.ceil(e / 1e6) / 10 + "千万" : e >= 1e6 && (e = Math.ceil(e / 1e5) / 10 + "百万"), e
                    }
                },
                lineColor: "#C0C0C0",
                lineWidth: 1,
                tickLength: 0,
                tickWidth: "1",
                tickColor: "#EEEEEE"
            }, {
                lineColor: "#EEEEEE",
                lineWidth: 1,
                opposite: !0,
                title: {
                    text: ""
                }
            }],
            tooltip: {
                crosshairs: {
                    color: "#C0C0C0"
                },
                positioner: function(e, a, t) {
                    var n = t.plotX;
                    return this.chart.plotWidth < t.plotX + e ? n = t.plotX - e * (window.isMobile ? .8 : .6) : t.plotX < this.chart.plotLeft && (n = t.plotX + e * (window.isMobile ? .3 : .6)), {
                        x: n,
                        y: 100
                    }
                },
                hideDelay: 200,
                shared: !0,
                valueSuffix: Lang.staff,
                valueSuffix: "",
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                dateTimeLabelFormats: {
                    millisecond: Lang.dateTimeLabelFormats_millisecond,
                    second: Lang.dateTimeLabelFormats_second,
                    minute: Lang.dateTimeLabelFormats_minute,
                    hour: Lang.dateTimeLabelFormats_hour_2,
                    day: Lang.dateTimeLabelFormats_day_2,
                    month: Lang.dateTimeLabelFormats_month,
                    year: Lang.dateTimeLabelFormats_year
                },
                useHTML: !(isMobile && isIOS && isWechat),
                headerFormat: isMobile && isIOS && isWechat ? '<span style="display: block; line-height: 200px; font-size: 85%">{point.key}</span><br/>' : '<span style="display: block; padding-bottom: 10px; font-size: 85%;">{point.key}</span><table>',
                pointFormatter: !(isMobile && isIOS && isWechat) &&
                function() {
                    return '<tr><td style="color:' + this.series.color + ';padding-right: 3px;">●</td><td>' + this.series.name + '</td><td style=" padding-left: 7px; color:' + this.series.color + ';">' + Math.abs(this.y) + "</td></tr>"
                },
                pointFormat: isMobile && isIOS && isWechat ? '<span style="color:{point.color}">●</span> {series.name} <span style="padding-left: 7px;color:{point.color}">  {point.y}</span><br/>' : "",
                footerFormat: isMobile && isIOS && isWechat ? "" : "</table>"
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: !1
                    },
                    enableMouseTracking: !0
                },
                series: {
                    stacking: c,
                    states: {
                        hover: {
                            enabled: !0,
                            lineWidth: 2,
                            halo: {
                                size: 0,
                                attributes: {
                                    fill: Highcharts.getOptions().colors[2],
                                    "stroke-width": 1,
                                    stroke: Highcharts.getOptions().colors[1]
                                }
                            }
                        }
                    },
                    marker: {
                        enabled: !0,
                        radius: e.total > 360 ? 1 : 2,
                        states: {
                            hover: {
                                radiusPlus: 2,
                                lineWidthPlus: 1
                            }
                        }
                    },
                    point: {
                        events: {
                            mouseOver: function() {
                                if (!h) return !1;
                                var e = this.series.chart,
                                    a = this.index,
                                    t = {},
                                    n = this.plotX + (window.isMobile ? 32 : 70);
                                n > e.plotWidth && (n = e.plotWidth);
                                var i = !1;
                                $.map(h, function(e, n) {
                                    a == n && (i = !0, t = e)
                                }), i && (e.version && e.version.hide(), e.version = e.renderer.label(t.date + "<br />" + Lang.new_version_tip + t.version, n, e.plotTop + e.plotHeight + 8, "callout", 0, 0, !0, "").css({
                                    color: "#FFFFFF"
                                }).attr({
                                    fill: "rgba(0, 0, 0, 1)",
                                    padding: 4,
                                    r: 10,
                                    zIndex: 8
                                }).add())
                            },
                            mouseOut: function() {
                                this.series.chart.version && this.series.chart.version.hide()
                            }
                        }
                    },
                    events: {
                        mouseOut: function() {
                            this.chart.version && this.chart.version.hide()
                        },
                        legendItemClick: function(e) {
                            $(".highcharts-g-value").remove()
                        }
                    }
                }
            },
            series: n
        }, function(e) {
            h && $.map(h, function(a, t) {
                var n, i, o = e.series[0].data[t];
                n = e.renderer.image("/public/app/images/release_icon.png", o.plotX + e.plotLeft - 8, e.plotTop + e.plotHeight - 8, 16, 16).attr({
                    zIndex: 10
                }).add(), i = n.getBBox();
                var s;
                n.on("mouseenter", function() {
                    e.version && e.version.hide();
                    var t = o.plotX + (window.isMobile ? 32 : 70);
                    t > e.plotWidth && (t = e.plotWidth), s = e.renderer.label(a.date + "<br />" + Lang.new_version_tip + a.version, t, i.y + 16, "callout", 0, 0, !0, "").css({
                        color: "#FFFFFF"
                    }).attr({
                        fill: "rgba(0, 0, 0, 1)",
                        padding: 4,
                        r: 10,
                        zIndex: 10
                    }).add()
                }).on("mouseout", function() {
                    s.hide()
                }).on("mousemove", function() {
                    e.version && e.version.hide()
                })
            }), extremumDraw(m, e, 0)
        })
    }
}
function overViewpieRingChart(e, a) {
    var t;
    if (t = a || $("#charts"), 0 == t.length || "none" == t.css("display")) return !1;
    var n = isMobile ? "0.375rem" : "18px";
    t.highcharts({
        chart: {
            type: "pie"
        },
        exporting: {
            enabled: !1
        },
        title: {
            text: e.title,
            style: {
                fontFamily: '"Helvetica Neue", Helvetica, Arial, "微软雅黑", sans-serif',
                fontSize: n
            },
            x: 26
        },
        credits: _credits(!1),
        tooltip: {
            useHTML: !0,
            headerFormat: '<small style="display: block; font-size: 12px;">',
            pointFormatter: function() {
                return this.name.replace(/[（|(].*?[)|）]/i, "") + "-" + Math.round(100 * this.percentage, 2) / 100 + "% (" + this.y + ")"
            },
            footerFormat: "</small>"
        },
        plotOptions: {
            pie: {
                size: "146px",
                startAngle: 180,
                borderWidth: 3,
                allowPointSelect: !0,
                cursor: "pointer",
                dataLabels: {
                    enabled: !1
                },
                showInLegend: !0
            },
            series: {
                states: {
                    hover: {
                        enabled: !1
                    }
                }
            }
        },
        series: e.list
    })
}
function overViewbarChart(e, a) {
    var t;
    if (t = a || $("#charts"), 0 == t.length || "none" == t.css("display")) return !1;
    isMobile ? "0.375rem" : "18px";
    t.highcharts({
        chart: {
            type: "bar",
            spacingRight: 0,
            spacingLeft: 0,
            spacingTop: 0
        },
        title: {
            text: ""
        },
        xAxis: {
            min: 0,
            tickLength: 0,
            lineWidth: 0,
            labels: {
                useHTML: !0,
                style: {
                    color: "#666666",
                    fontSize: "14px",
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, "微软雅黑", sans-serif',
                    fontWeight: "bold"
                }
            },
            categories: e.cates
        },
        yAxis: {
            min: 0,
            labels: {
                enabled: !1
            },
            gridLineWidth: 0,
            title: {
                text: ""
            }
        },
        exporting: {
            enabled: !1
        },
        credits: _credits(!1),
        tooltip: {
            useHTML: !0,
            headerFormat: '<small style="display: block; font-size: 12px;">应用数量：',
            pointFormatter: function() {
                return this.y
            },
            footerFormat: "</small>",
            positioner: function(e, a, t) {
                return {
                    x: 99,
                    y: t.plotY
                }
            }
        },
        plotOptions: {
            bar: {
                showInLegend: !1,
                color: e.color
            },
            series: {
                pointWidth: 15,
                minPointLength: 3,
                dataLabels: {
                    enabled: !0,
                    color: "#666666",
                    formatter: function() {
                        return this.y > 1e4 ? Math.round(this.y / 1e3) / 10 + "万" : this.y
                    }
                }
            }
        },
        series: e.list
    })
}
function pieChart(e, a) {
    var t;
    t = a || $("#pieChart");
    var n = e || t.data("chartdata"),
        i = {
            type: "pie",
            spacingRight: 40,
            marginRight: 1
        };
    window.isMobile ? yAxisOffset = -14 : (delete i.marginLeft, delete i.marginRight, yAxisOffset = 0);
    var o = _exportingConfig(n.title);
    fSize = isMobile ? "0.375rem" : "18px", $(t).highcharts({
        chart: i,
        exporting: o,
        credits: _credits(!1),
        title: {
            text: n.title,
            style: {
                fontFamily: '"Helvetica Neue", Helvetica, Arial, "微软雅黑", sans-serif',
                fontSize: fSize
            },
            x: 26
        },
        tooltip: {
            pointFormat: "<b>" + Lang.share + "</b>: <b>{point.percentage:.1f}%</b>"
        },
        plotOptions: {
            pie: {
                allowPointSelect: !0,
                cursor: "pointer",
                dataLabels: {
                    enabled: !0,
                    color: "#000000",
                    connectorColor: "#000000",
                    format: "<b>{point.name}</b>: <b>{point.percentage:.1f}%</b>"
                },
                showInLegend: !0
            }
        },
        series: [{
            type: "pie",
            data: n.chart
        }]
    })
}
function downSources() {
    $("#pieChart").length > 0 && pieChart()
}
function extremumDraw(e, a, t) {}
function render(e, a) {
    e.renderer.label(a.y, a.plotX + e.plotLeft - 20, a.plotY + e.plotTop - 45, "callout", a.plotX + e.plotLeft, a.plotY + e.plotTop, !1, !1, "g-value").css({
        color: "#FFFFFF",
        align: "center"
    }).attr({
        fill: "rgba(0, 0, 0, 0.75)",
        padding: 8,
        r: 5,
        zIndex: 6
    }).add()
}
function drawNodataCharts(e, a) {
    var t;
    t = a || $("#charts"), fSize = isMobile ? "0.375rem" : "18px", e = e ? e : Lang.not_enter_current_list, t.length > 0 && t.highcharts({
        exporting: {
            enabled: !1
        },
        title: {
            text: e,
            style: {
                fontSize: fSize
            },
            x: 26
        },
        lang: {
            noData: e
        },
        noData: {
            style: {
                fontWeight: "bold",
                fontSize: "15px",
                color: "#303030"
            }
        },
        credits: {
            enabled: !window.chartData.isReport,
            fontSize: "13px",
            text: "Powered by ASO100.com",
            href: "http://www.aso100.com"
        },
        yAxis: {
            title: {
                text: Lang.ranking
            },
            reversed: !0
        },
        series: [{
            type: "line",
            name: Lang.no_data_3,
            data: []
        }]
    })
}
function svgExport(e, a, t) {
    t || (t = "png");
    var n = document.createElement("canvas"),
        i = n.getContext("2d"),
        o = document.createElement("A");
    canvg(n, (new XMLSerializer).serializeToString(e), {
        ignoreMouse: !0,
        ignoreAnimation: !0,
        useCORS: !0,
        renderCallback: function() {
            var e = document.createElement("img");
            "jpeg" == t ? (t = "image/jpeg", o.download = a + ".jpg", e.src = n.toDataURL("image/png"), e.onload = function() {
                    i.fillStyle = "#ffffff", i.fillRect(0, 0, n.width, n.height), i.drawImage(e, 0, 0), e.src = "/public/app/images/chart-icon.png", e.onload = function() {
                        if (i.drawImage(e, 150, 260), o.href = n.toDataURL(t), document.all) o.click();
                        else {
                            var a = document.createEvent("MouseEvents");
                            a.initEvent("click", !0, !0), o.dispatchEvent(a)
                        }
                    }
                }) : (t = "image/png", o.download = a + ".png", e.src = "/public/app/images/chart-icon.png", e.onload = function() {
                    if (i.drawImage(e, 150, 260), o.href = n.toDataURL(t), document.all) o.click();
                    else {
                        var a = document.createEvent("MouseEvents");
                        a.initEvent("click", !0, !0), o.dispatchEvent(a)
                    }
                })
        }
    })
}
function CEMixLen(e, a) {
    a = a ? a : 3;
    var t = 0,
        n = e.length;
    if (e) {
        for (var i = 0; i < n; i++) e.charCodeAt(i) > 255 ? t += a : t++;
        return t
    }
    return 0
}
function preventDefault(e) {
    e = e || window.event, e.preventDefault && e.preventDefault() || (e.returnValue = !1), e.stopPropagation && e.stopPropagation()
}
function accountPwd(e) {
    if (!e) return !1;
    var a, t = e.find(".sign-msg"),
        n = !1;
    e.find("input").on("focus", function() {
        clearTimeout(a), a = setTimeout(function() {
            e.find(".has-error").length < 1 && t.slideUp("fast")
        }, 500)
    }), e.find("input[name=remember]").on("click", function() {
        $.cookie("no_remember", +!this.checked, {
            path: "/",
            expires: 1
        })
    }), e.find("#submit").on("click", function() {
        if (clearTimeout(a), n) return !1;
        n = !0;
        var i = !0,
            o = {};
        if (e.find("input.form-control").each(function() {
                var e = this.name,
                    a = $(this);
                return value = a.val(), !! a.prop("disabled") || (value = value.replace(/^\s+/i, ""), value = value.replace(/\s+$/i, ""), a.val(value), "" == value ? (i = !1, a.val(""), t.removeClass("success").html(this.placeholder + Lang.password_verify_2).slideDown("fast"), !1) : ("remember" == e && (value = a.prop("checked")), void(o[e] = value)))
            }), o.repassword && o.password && o.repassword != o.password && (t.removeClass("success").html(Lang.pwd_error_tip).slideDown("fast"), i = !1), !i) return n = !1, !1;
        var s = e.attr("method") || "GET",
            r = e.attr("action");
        return !!r && ($.ajax({
                type: s,
                url: r,
                data: o,
                dataType: "json",
                error: function(e) {
                    n = !1, e && 403 == e.status && window.location.reload()
                },
                success: function(a, i, o) {
                    n = !1;
                    var s = e.data("alert") || 0;
                    if (s && 1 == s) a && 1e4 == a.code ? swal({
                            title: Lang.mod_pwd_tip_1,
                            type: "success",
                            showCancelButton: !0,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.mod_pwd_tip_2,
                            cancelButtonColor: "#33ba95",
                            cancelButtonText: Lang.mod_pwd_tip_3
                        }, function(e) {
                            e ? window.location.href = "/account/signin" : window.location.href = "/"
                        }) : swal({
                            title: a.msg,
                            type: "error",
                            showCancelButton: !1,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.confirm_btn,
                            cancelButtonText: Lang.cancel_btn
                        });
                    else {
                        a && 1e4 == a.code ? (a.showmsg ? t.addClass("success").html(a.msg).slideDown("fast") : t.removeClass("success").html(a.msg).slideUp("fast"), e.data("referrer") && (window.location.href = e.data("referrer"))) : ($("#code-img").trigger("click"), a.css && t.removeClass("success").addClass(a.css), t.html(a.msg).slideDown("fast"));
                        var r = o.getResponseHeader("callback");
                        if (r && r.indexOf("function") != -1) {
                            var d = new Function("return " + r)();
                            d()
                        } else if (r && "function" == typeof window[r]) {
                            var c = o.getResponseHeader("callbackParam") || "";
                            c && (c = JSON.parse(c)), window[r](c)
                        }
                    }
                }
            }), !1)
    })
}
function vipSuccess() {
    $(".vip-label").addClass("vip-active-label")
}
function datePicker(ele) {
    var $dateRangePickerObj = ele,
        isOpen = $dateRangePickerObj.data("open"),
        isRefresh = $dateRangePickerObj.data("refresh") || 0,
        isMulit = $dateRangePickerObj.data("mulit"),
        isNoYestoday = $dateRangePickerObj.data("noyestoday"),
        opens = $dateRangePickerObj.data("opens") || "left",
        ranges = $dateRangePickerObj.data("ranges") || "",
        noVip = $dateRangePickerObj.data("novip") || 0,
        limitday = $dateRangePickerObj.data("limitday") || 0,
        isShowHour = $dateRangePickerObj.data("showhour") || 0,
        customRangeShow = "undefined" == typeof $dateRangePickerObj.data("customrangeshow") ? 1 : $dateRangePickerObj.data("customrangeshow"),
        rangesFirstKey, locales, hourE = "",
        hourS = "";
    noVip || (ranges ? $.map(ranges, function(obj, index) {
            "object" != typeof obj && (ranges[index] = eval("(" + obj + ")"))
        }) : "cn" == Lang.language_type ? (ranges = {
                "今日": [moment().startOf("day"), moment()],
                "昨日": [moment().subtract(1, "days"), moment().subtract(1, "days")],
                "近7日": [moment().subtract(6, "days"), moment()],
                "近30日": [moment().subtract(29, "days"), moment()],
                "近三个月": [moment().subtract(3, "month"), moment()],
                "近一年": [moment().subtract(1, "years"), moment()]
            }, isNoYestoday && (delete ranges.昨日, delete ranges.今日)) : "en" == Lang.language_type && (ranges = {
                Today: [moment().startOf("day"), moment()],
                Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
                "Last 7 days": [moment().subtract(6, "days"), moment()],
                "Last 30 days": [moment().subtract(29, "days"), moment()],
                "Last 3 months": [moment().subtract(3, "month"), moment()],
                "Last year": [moment().subtract(1, "years"), moment()]
            }, isNoYestoday && (delete ranges.Today, delete ranges.Yesterday)), "cn" == Lang.language_type ? locales = {
            applyLabel: Lang.locales_applyLabel,
            cancelLabel: Lang.cancel_btn,
            fromLabel: Lang.locales_fromLabel,
            toLabel: Lang.locales_toLabel,
            customRangeLabel: Lang.locales_customRangeLabel,
            daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            firstDay: 1
        } : "en" == Lang.language_type && (locales = {
            applyLabel: Lang.locales_applyLabel,
            cancelLabel: Lang.cancel_btn,
            fromLabel: Lang.locales_fromLabel,
            toLabel: Lang.locales_toLabel,
            customRangeLabel: Lang.locales_customRangeLabel,
            firstDay: 1
        }), $.map(ranges, function(e, a) {
        rangesFirstKey || (rangesFirstKey = a)
    }), window.chartData.titleDate = rangesFirstKey, isMobile && ($dateRangePickerObj.find("span:eq(0).mobile-hide").html(rangesFirstKey).show(), customRangeShow = !1), locales.customRangeShow = !! customRangeShow && customRangeShow, $dateRangePickerObj.daterangepicker({
        hideRangeInputs: !customRangeShow,
        timePicker: !1,
        startDate: moment($dateRangePickerObj.data("date")),
        endDate: moment($dateRangePickerObj.data("edate")),
        minDate: $dateRangePickerObj.data("mindate") ? $dateRangePickerObj.data("mindate") : "04/01/2014",
        maxDate: moment().format("MM/DD/YYYY"),
        singleDatePicker: 0 == isMulit || !1,
        showDropdowns: !0,
        showWeekNumbers: !1,
        ranges: ranges,
        opens: opens,
        drops: "down",
        buttonClasses: ["btn", "btn-sm"],
        applyClass: "btn-primary",
        cancelClass: "btn-default",
        separator: " to ",
        locale: locales
    }, function(e, a, t) {
        var n;
        if (limitday && +e < +new Date - 86400 * limitday * 1e3) return showOpenVipSwal(Lang.sorry_tip[LangObj.openVipType]), !1;
        if (0 == isMulit ? n = e.format(Lang.format_time) : t != Lang.locales_customRangeLabel && isMobile ? n = t : isShowHour ? t == $.trim(Lang.date_range_2) ? (hourE = hourS = " 00" + Lang.format_date_hour, n = moment().subtract(1, "days").format(Lang.format_time) + hourS + "~" + moment().format(Lang.format_time) + hourE) : (hourE = hourS = " " + moment().format("H") + Lang.format_date_hour, n = e.format(Lang.format_time) + hourS + "~" + a.format(Lang.format_time) + hourE) : n = e.format(Lang.format_time) + "~" + a.format(Lang.format_time), $dateRangePickerObj.find("span:eq(0)").html(n), 1 == isOpen) if (isMulit) {
            var i, o, s, r, d = new RegExp("sdate\\/\\d+-\\d+-\\d+", "i");
            i = document.location.pathname, i.split("/").length < 3 && (i += "/index"), o = i.match(d), o ? i = i.replace(o, "sdate/" + e.format("YYYY-MM-DD")) : i += "/sdate/" + e.format("YYYY-MM-D"), d = new RegExp("edate\\/\\d+-\\d+-\\d+", "i"), s = i.match(d), s ? i = i.replace(s, "edate/" + a.format("YYYY-MM-DD")) : i += "/edate/" + a.format("YYYY-MM-D"), r = window.location.protocol + "//" + window.location.hostname + i, isRefresh ? pjaxLoad(r) : window.location.href = r
        } else {
            var i, c, r, l = $dateRangePickerObj.data("paramname") || "date",
                d = new RegExp(l + "\\/\\d+-\\d+-\\d+", "i");
            i = document.location.pathname, i = i.replace(/snapshot\/\d+:\d+:\d+/i, ""), i.split("/").length < 3 && (i += "/index"), document.location.search.indexOf("?search") == -1 && document.location.search.indexOf("&search") == -1 || (i += document.location.search.replace(/\?|=|&/g, "/")), c = i.match(d), i = c ? i.replace(c, l + "/" + e.format("YYYY-MM-DD")) : i + "/" + l + "/" + e.format("YYYY-MM-DD"), r = window.location.protocol + "//" + window.location.hostname + i, isRefresh ? pjaxLoad(r) : window.location.href = r
        } else {
            window.searchType = "date", t != Lang.locales_customRangeLabel ? window.chartData.titleDate = t : window.chartData.titleDate = e.format(Lang.format_time) + Lang.to + a.format(Lang.format_time);
            var r, p;
            $dateRangePickerObj.parents(".charts-ajax-data").length ? (r = $dateRangePickerObj.parents(".charts-ajax-data").data("ajaxurl"), p = $dateRangePickerObj.parents(".charts-ajax-data").data("querydata") || {}) : (r = $("#charts-ajax-data").data("ajaxurl"), p = $("#charts-ajax-data").data("querydata") || {}), $(".nav-date-bar-action .nav-item.active").length && (p = $(".nav-date-bar-action .nav-item.active").data("querydata")), "string" == typeof p && (p = JSON.parse(p)), p.sdate = e.format("YYYY-MM-DD"), p.edate = a.format("YYYY-MM-DD");
            var u = $dateRangePickerObj.parents(".charts-ajax-data").data("target");
            if (u = "undefined" == typeof u ? "charts" : u, $("#" + u + "-ajax-data").data("querydata", JSON.stringify(p)), $(".nav-date-bar-action .nav-item.active").length && ($(".nav-date-bar-action .nav-item.active").data("querydata", JSON.stringify(p)), $(".nav-date-bar-action .nav-item.active").data("showdate", window.chartData.titleDate)), window.currentKeywordid.length > 0 && (p.word_id = window.currentKeywordid.join(",")), window.hasDataIdStr = p.word_id || "", $("#hotDraw").length > 0) hotSearchDrawAction(r, p);
            else if ($(".invest-data-center").length) {
                var h = $(".nav-tabs li.active a").attr("href"),
                    m = p.appid,
                    f = $(h).find(".dcbct-body-competi-chart-tr-" + m),
                    g = f.find(".chart-data");
                getChartsData(r, p, g)
            } else getChartsData(r, p, $("#" + u))
        }
    }))
}
function showBuyVip() {
    var e = $("#buy-vip");
    return e && e.length > 0 ? (e.show(), $("#vip-b").show(), !1) : void $.ajax({
            url: "/account/buyVip",
            type: "get",
            dataType: "html",
            success: function(e, a, t) {
                var n = t.getResponseHeader("Content-Type");
                if (n.indexOf("application/json") !== -1) return e = JSON.parse(e), 1e4 == parseInt(e.code) ? swal({
                        title: e.msg,
                        type: "success",
                        showCancelButton: !1,
                        confirmButtonColor: "#33ba95",
                        confirmButtonText: Lang.confirm_btn,
                        cancelButtonText: Lang.cancel_btn
                    }) : swal({
                        title: e.msg,
                        type: "error",
                        showCancelButton: !1,
                        confirmButtonColor: "#33ba95",
                        confirmButtonText: Lang.confirm_btn,
                        cancelButtonText: Lang.cancel_btn
                    }), !1;
                var i, o, s = $(".info-container"),
                    r = $(e),
                    d = r.find("#buy-vip-expire");
                $("body").append(r);
                var c = $("#buy-vip-style input:checked").val();
                $("#buy-vip-amount").html($("#buy-vip-type ." + c + " a.active").data("amount")), s && s.length > 0 ? (o = s.offset().left + parseInt(s.css("padding-left")), i = $(window).height() < 550 ? {
                            left: o + "px",
                            top: $(document).scrollTop() + 80 + "px",
                            position: "absolute"
                        } : {
                            left: o + "px",
                            top: "260px"
                        }) : i = $(window).height() < 550 ? {
                            marginLeft: "50%",
                            left: "-" + r.width() / 2 + "px",
                            top: $(document).scrollTop() + 80 + "px",
                            position: "absolute"
                        } : {
                            marginLeft: "50%",
                            left: "-" + r.width() / 2 + "px",
                            top: ($(window).height() - r.height()) / 2 + "px"
                        }, d.data("expire") >= 0xe677d0686418 ? d.html("永久") : d.html(moment(d.data("expire")).add(1, "month").format("YYYY-MM-DD")), r.css(i).show(), $("#vip-b").show()
            }
        })
}
function search(e) {
    var a = e;
    a.autocomplete({
        serviceUrl: "/search/autoComplete",
        paramName: "word",
        dataType: "json",
        transformResult: function(e) {
            return {
                suggestions: $.map(e, function(e) {
                    return {
                        value: e,
                        data: e
                    }
                })
            }
        },
        deferRequestBy: 200,
        maxHeight: "auto",
        onSelect: function(e) {
            $(this).parents(".navbar-form").submit()
        }
    })
}
function __dealCssEvent(e, a) {
    function t(e) {
        if (e.target === this) for (a.call(this, e), n = 0; n < i.length; n++) o.off(i[n], t)
    }
    var n, i = e,
        o = this;
    if (a) for (n = 0; n < i.length; n++) o.on(i[n], t)
}
function formToJSON(e) {
    if (e = $(e), 1 !== e.length) return !1;
    var a = {},
        t = ["submit", "image", "button", "file"],
        n = [];
    return e.find("input, select, textarea").each(function() {
        var i = $(this),
            o = i.attr("name"),
            s = i.attr("type"),
            r = this.nodeName.toLowerCase();
        if (!(t.indexOf(s) >= 0) && !(n.indexOf(o) >= 0) && o) if ("select" === r && i.prop("multiple")) n.push(o), a[o] = [], e.find('select[name="' + o + '"] option').each(function() {
            this.selected && a[o].push(this.value)
        });
        else switch (s) {
                case "checkbox":
                    n.push(o), a[o] = [], e.find('input[name="' + o + '"]').each(function() {
                        this.checked && a[o].push(this.value)
                    });
                    break;
                case "radio":
                    n.push(o), e.find('input[name="' + o + '"]').each(function() {
                        this.checked && (a[o] = this.value)
                    });
                    break;
                default:
                    a[o] = i.val()
            }
    }), a
}
function openApp(e) {
    var a = document.getElementById("open-app-by-url");
    a || (a = document.createElement("iframe"), a.setAttribute("id", "open-app-by-url"), a.setAttribute("width", 0), a.setAttribute("height", 0), a.setAttribute("style", "display:none; overflow:hidden;"), document.body.appendChild(a)), a.src = e
}
function settingAccount() {
    function e(e) {
        e.url ? ($("#avatar-area img").attr("src", e.url), $("#answer-upload-img").attr("src", e.url), $("#answer-upload-img-hidden").val(e.url)) : e.phone ? ($("#phone-position").text(e.phone), $("#biding-phone").text(Lang.edit)) : 3 == e.type && $("#biddingPhoneModal").modal("show")
    }
    function a(e) {
        $("#x").val(e.x), $("#y").val(e.y), $("#w").val(e.w), $("#h").val(e.h)
    }
    function t() {
        return !!parseInt($("#w").val()) || (swal("Please select a crop region then press submit."), !1)
    }
    function n(e) {
        var t = e[0],
            n = $("#avatar-preview"),
            i = new FileReader,
            o = t.type,
            s = t.size;
        return /image\/(gif|jpg|jpeg|png)/.test(o) ? s >= 2e6 ? (swal(Lang.img_size), !1) : (i.onload = function(e) {
                    n.html('<img src="' + e.target.result + '" alt="img">');
                    var t, i, o, s = window.isMobile ? 270 : 870,
                        r = window.isMobile ? 320 : 560,
                        d = 250;
                    JcropEle = n.find("img"), JcropEle.Jcrop({
                        onSelect: a,
                        aspectRatio: 2,
                        boxWidth: s,
                        boxHeight: r,
                        touchSupport: !0,
                        bgColor: "#FFF",
                        aspectRatio: 1,
                        minSize: [d, d]
                    }, function() {
                        jcropApi = this, i = parseInt(jcropApi.getBounds()[0]), o = parseInt(jcropApi.getBounds()[1]), t = i < o ? i : o, t < d && jcropApi.setOptions({
                            minSize: [t, t]
                        }), x = i / 2 - d / 2, y = o / 2 - d / 2, x1 = x + d, y1 = y + d, jcropApi.setSelect([x, y, x1, y1])
                    }), $("#avatar").val(e.target.result)
                }, i.readAsDataURL(t), !0) : (swal(Lang.img_type), !1)
    }
    function i() {
        return $(".myself-modal").modal("hide"), $("#verifyCodeModal").modal("show"), !1
    }
    if (!$(".avatar-modal").length) return !1;
    var o = function(a, t, n) {
        t.addClass("disabled"), t.attr("disabled", !0), $.ajax({
            type: "POST",
            url: a.attr("action"),
            data: a.serialize(),
            success: function(a) {
                t.removeClass("disabled"), t.attr("disabled", !1), 1e4 != a.code ? (a.closeModal && $(".myself-modal").modal("hide"), swal(a.msg)) : (a.refresh && location.reload(), $(".myself-modal").modal("hide"), e(a), "function" == typeof n && n())
            }
        })
    };
    $(document).on("click", "#btn-save", function() {
        t(), o($("#avatar-form"), $(this))
    }), $(document).on("click", "#avatar-click", function() {
        $("#select-avatar").click()
    });
    var s = document.querySelector("#select-avatar");
    s && s.addEventListener("change", function(e) {
        var a = this.files;
        a.length && (n(this.files) && ($("#myModal").modal("show"), $("#myModal").modal()), $("#select-avatar").val(""))
    }), $(document).on("click", "#edit-email", function(e) {
        $("#editEmailModal").modal("show")
    }), $(document).on("click", "#send-email", function() {
        o($("#email-form"), $(this))
    }), $(document).on("click", "#edit-phone", function(e) {
        $("#biddingPhoneModal").modal("show")
    }), $(document).on("click", "#biding-phone", function(e) {
        $("#biddingPhoneModal").modal("show")
    }), $(document).on("click", "#phone-form #send-code", function() {
        var e, a = $(this),
            t = $("#phone").val(),
            e = a.data("sendurl");
        $.getJSON(e, {
            phone: t
        }, function(e) {
            if (1e4 == e.code) {
                var t = 59,
                    n = setInterval(function() {
                        a.text(Lang.again_get + "(" + t--+")"), t < 0 && (a.removeClass("disabled"), a.text(Lang.get_code), clearInterval(n))
                    }, 1e3);
                a.addClass("disabled"), a.text(Lang.again_get + "(60)")
            } else {
                if (10012 != e.code) return swal({
                    title: e.msg,
                    type: "error",
                    confirmButtonText: Lang.confirm_btn
                }), !1;
                i()
            }
        })
    }), $(document).on("click", "#btn-binding", function() {
        o($("#phone-form"), $(this))
    }), $(document).on("click", "#btn-verify-code", function() {
        o($("#code-form"), $(this))
    }), $(document).on("click", "#refresh-img", function() {
        var e = $("#code-img"),
            a = e.attr("src");
        a.indexOf("?") != -1 ? a = a.replace(/\?.*/i, "?" + +new Date) : a += "?" + +new Date, e.attr("src", a)
    });
    var r = {};
    return r.ajaxSend = o, r
}
function hotSearchDrawAction(e, a) {
    var t = $(".bar-charts"),
        n = t.data("ele");
    title = t.data("title"), e = e || t.data("ajaxurl"), a = a || t.data("querydata");
    var i = moment(a.sdate).format(Lang.format_date),
        o = moment(a.edate).format(Lang.format_date),
        s = "cn" == Lang.language ? "" : " ";
    title = i + "~" + o + s + title, $.ajax({
        url: e,
        type: "POST",
        dataType: "json",
        data: a
    }).done(function(e) {
        hotSearchDraw(e, n, title)
    })
}
function hotSearchDraw(e, a, t) {
    $("#" + a).highcharts({
        legend: {
            enabled: !1
        },
        exporting: {
            enabled: !1
        },
        chart: {
            type: "bar"
        },
        title: {
            text: t
        },
        xAxis: {
            categories: e.categories,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null
            },
            labels: {
                enabled: !1
            }
        },
        tooltip: {
            enabled: !0,
            formatter: function() {
                var e = Math.floor(this.y / 86400),
                    a = Math.floor(this.y % 86400 / 3600),
                    t = Math.floor(this.y % 3600 / 60),
                    n = (Math.floor(this.y % 60), '<span style="font-size:10px;">' + this.x + "</span><br/>" + this.series.name + " : ");
                return e > 0 ? n + e + Lang.format_date_d + a + Lang.format_date_h + t + Lang.format_date_m : a > 0 ? n + a + Lang.format_date_h + t + Lang.format_date_m : n + t + Lang.format_date_m
            }
        },
        plotOptions: {
            column: {
                colorByPoint: !0
            }
        },
        credits: {
            enabled: !1
        },
        series: e.series
    })
}
function dataTablesForUserKeywordExtend(e) {
    var a = e;
    if (!a) return !1;
    var t = a.data("keywordurl"),
        n = a.data("hintsurl"),
        i = a.data("numberurl");
    a.data("nosignin");
    window.keywordExtend && (window.keywordExtend = null), window.keywordExtend = a.DataTable({
        dom: window.isMobile ? "frtip" : "lfrtip",
        data: window.tableData,
        order: [],
        lengthChange: !1,
        searching: !isMobile,
        autoWidth: !1,
        lengthMenu: [100],
        createdRow: function(e, a, t) {
            $(e).addClass("keyword-repertory-tr")
        },
        columnDefs: [{
            data: function(e, a, t, n) {
                var i;
                return i = "checkbox_" + e[0], '<div class="aso-checkbox"><input type="checkbox" name="word" id="' + i + '" class="form-control" value="' + e[0] + '" data-groupid="' + e[8] + '"><label for="' + i + '"><span></span></label></div>'
            },
            targets: 0,
            orderable: !1
        }, {
            data: function(e, a, n, i) {
                return $word = e[2].indexOf("@") != -1 ? e[2].replace(/@/g, " ") : e[2], '<a href="' + t + encodeURIComponent(e[2]) + '" target="_blank">' + $word + "</a>"
            },
            targets: 1,
            orderable: !1
        }, {
            orderSequence: ["desc", "asc"],
            data: function(e, a, t, i) {
                return '<a class="number" href="' + n + e[1] + '" target="_blank">' + e[3] + "</a>"
            },
            targets: 2
        }, {
            orderSequence: ["desc", "asc"],
            data: function(e, a, t, n) {
                return '<a class="number" href="' + i + e[1] + '" target="_blank">' + e[4] + "</a>"
            },
            targets: 3
        }, {
            orderSequence: ["desc", "asc"],
            data: function(e, a, t, n) {
                return e[5]
            },
            targets: 4
        }, {
            orderSequence: ["desc", "asc"],
            data: function(e, a, t, n) {
                return html = '<div class="select-group-row" data-id="' + e[0] + '" data-groupid="' + e[8] + '"></div>', html
            },
            targets: 5,
            orderable: !1
        }, {
            data: function(e, a, t, n) {
                var i, o, s;
                return o = "checkbox_title_" + e[0], s = 2 == e[6] ? "checked" : "", i = '<div class="aso-checkbox-switch"><input type="checkbox"  data-type="name" id="' + o + '" ' + s + ' class="form-control change-word table-name-' + e[0] + '" data-state="' + e[6] + '" data-id="' + e[0] + '" data-word="' + e[2] + '" ><label for="' + o + '"><span></span></label></div>'
            },
            targets: 6,
            orderable: !1
        }, {
            data: function(e, a, t, n) {
                var i, o, s;
                return o = "checkbox_keyword_" + e[0], s = 2 == e[7] ? "checked" : "", i = '<div class="aso-checkbox-switch"><input type="checkbox"  data-type="word" id="' + o + '" ' + s + ' class="form-control change-word table-word-' + e[0] + '" data-id="' + e[0] + '" data-state="' + e[7] + '" data-word="' + e[2] + '"><label for="' + o + '"><span></span></label></div>'
            },
            targets: 7,
            orderable: !1
        }, {
            data: function(e, a, t, n) {
                var i;
                return toggle = isMobile ? "" : "tooltip", i = '<span class="icon icon-cancel extword-remove" data-id="' + e[0] + '" data-keyword="' + e[1] + '" data-groupid="' + e[8] + '" data-type="cancel" data-toggle="' + toggle + '" data-original-title="取消关注">取消</span>'
            },
            targets: 8,
            orderable: !1
        }],
        initComplete: function() {
            a.find('[data-toggle="tooltip"]').tooltip({
                delay: {
                    show: 100,
                    hide: 100
                }
            })
        },
        drawCallback: function() {
            var e = a.find(".select-group-row");
            if (html = $("#select-group-temp").html(), e.length) {
                if (e.find("select.group-change-select").length) return;
                e.append(html), e.each(function(e, a) {
                    var t = $(this),
                        n = t.data("groupid"),
                        i = t.find('option[value="' + n + '"]'),
                        o = t.find("select");
                    o.addClass("group-change-select"), i.prop("selected", !0), o.select2({
                        minimumResultsForSearch: -1
                    })
                })
            }
        },
        language: {
            sProcessing: Lang.dataTables_sProcessing,
            sLengthMenu: Lang.dataTables_sLengthMenu,
            sZeroRecords: Lang.dataTables_sZeroRecords,
            sInfo: Lang.dataTables_sInfo,
            sInfoEmpty: Lang.dataTables_sInfoEmpty,
            sInfoFiltered: Lang.dataTables_sInfoFiltered,
            sInfoPostFix: "",
            sSearch: Lang.dataTables_sSearch,
            sUrl: "",
            sEmptyTable: Lang.dataTables_sEmptyTable,
            sLoadingRecords: Lang.dataTables_sLoadingRecords,
            sInfoThousands: ",",
            oPaginate: {
                sFirst: Lang.dataTables_sFirst,
                sPrevious: "<",
                sNext: ">",
                sLast: Lang.dataTables_sLast
            },
            oAria: {
                sSortAscending: Lang.dataTables_sSortAscending,
                sSortDescending: Lang.dataTables_sSortDescending
            }
        }
    })
}
function investCreateGroup() {
    function e(e) {
        var a, n, i = $(".nav-tabs"),
            o = $(".dc-body-content"),
            s = $(".wait-clone-pane .new-tab-pane").clone(),
            r = $(".group-change-warp ul");
        a = '<li role="presentation" data-groupid="' + e.id + '"><a href="#group-' + e.id + '" role="tab" data-toggle="tab">' + e.name + '<span class="glyphicon glyphicon-remove remove-group hide"></span></a></li>', n = '<li><a href="javascript:;" data-groupid="' + e.id + '">' + e.name + "</a></li>", s.attr("id", "group-" + e.id), o.append(s), i.append(a), r.append(n), t()
    }
    function a(a, t) {
        t.addClass("disabled"), t.attr("disabled", !0), $.ajax({
            type: "POST",
            url: a.attr("action"),
            data: a.serialize(),
            success: function(a) {
                t.removeClass("disabled"), t.attr("disabled", !1), 1e4 != a.code ? (a.closeModal && $(".myself-modal").modal("hide"), swal(a.msg)) : ($(".myself-modal").modal("hide"), e(a))
            }
        })
    }
    function t() {
        $(".invest-data-center .nav-tabs a").hover(function() {
            $(this).find(".remove-group").removeClass("hide")
        }, function() {
            $(this).find(".remove-group").addClass("hide")
        })
    }
    return !!$(".invest-data-center").length && ($("#group-list-nav .create").click(function(e) {
            return $("#dc-body-nav li").length >= 7 ? (swal(Lang.keyword_group_limit), !1) : void $("#create-group-modal").modal("show")
        }), $("#create-group-modal").keydown(function(e) {
            13 == e.keyCode && (a($("#word-group-form"), $(this)), e.preventDefault())
        }), $("#create-group-modal #btn-save").click(function() {
            a($("#word-group-form"), $(this))
        }), void t())
}
function keywordRepertory() {
    function e(e) {
        var a = '<a href="javascript:;" data-classname="groupData_' + e.key + '" class="tab group" data-groupid="' + e.key + '">' + e.name + '<span class="glyphicon glyphicon-remove remove-group hide"></span></a>',
            n = '<option value="' + e.key + '">' + e.name + "</option>";
        $("#group-list-nav .create").before(a), $(".group-change-select option:last-child").before(n), $("#select-group-temp .select").append(n), t()
    }
    function a(a, t) {
        t.addClass("disabled"), t.attr("disabled", !0), $.ajax({
            type: "POST",
            url: a.attr("action"),
            data: a.serialize(),
            success: function(a) {
                t.removeClass("disabled"), t.attr("disabled", !1), 1e4 != a.code ? (a.closeModal && $(".myself-modal").modal("hide"), swal(a.msg)) : ($(".myself-modal").modal("hide"), e(a))
            }
        })
    }
    function t() {
        $("#group-list-nav .group").hover(function() {
            $(this).find(".remove-group").removeClass("hide")
        }, function() {
            $(this).find(".remove-group").addClass("hide")
        })
    }
    if (0 == $("#keyword-repertory-container").length) return !1;
    window.tableData = $.parseJSON($(".groupData_0").val());
    var n = $("#keyword-extend-user");
    dataTablesForUserKeywordExtend(n), dataSearchPush(), $("#group-list-nav .create").click(function(e) {
        return $("#group-list-nav .group").length >= 7 ? (swal(Lang.keyword_group_limit), !1) : void $("#create-group-modal").modal("show")
    }), $("#create-group-modal").keydown(function(e) {
        13 == e.keyCode && (a($("#word-group-form"), $(this)), e.preventDefault())
    }), $("#create-group-modal #btn-save").click(function() {
        a($("#word-group-form"), $(this))
    }), t()
}
function showChangePd() {
    if (isMobile) return !1;
    var e = $(".change-pd");
    if (e && e.length) if (isLocalStorageSupported) {
        var a;
        localStorage.pdconfig && (a = JSON.parse(localStorage.pdconfig)), a ? $.each(e, function() {
                var e = $(this),
                    t = e.data("name");
                if (t) {
                    var n = +moment(moment().format("YYYY-MM-DD") + " 23:59:59");
                    n != a[t] && e.addClass("show-animation")
                }
            }) : e.addClass("show-animation")
    } else e.addClass("show-animation")
}
function detect() {
    if (".detect-new .chart-show".length && $(".detect-new .chart-show").each(function(e, a) {
            var t = $(this),
                n = t.data("chartdata");
            dataCenterCustomRankChart(t, n)
        }), circleDetect($("#circleScore"), $(".d-score-text-1")), circleDetect($("#circleScore2"), $(".d-score-text-2")), $("#show-search-history").on("click", function() {
            $("#search-index-history-info").removeClass("hide").addClass("show show-animation"), $("#vip-b").show()
        }), $("#search-index-history-info .icon-guanbi").click(function() {
            $("#search-index-history-info").addClass("hide").removeClass("show show-animation"), $("#vip-b").hide()
        }), $(".pinpai-idiv").data("click")) {
        var e = $(".detect-new .waimians");
        $(".pinpai-idiv").click(function(a) {
            e.fadeIn(400)
        })
    }
    $(".detect-new .tijiaos").unbind("click").on("click", function(e) {
        var a = $(".detect-new .waimians"),
            t = $(this),
            n = {};
        return n.texts = a.find("textarea").val(), n.aid = t.data("aid"), n.texts ? (ajaxAction($(this), function(e) {
                1e4 == e.code ? (swal(Lang.app_detect_fill_success), $(".pinpai-idiv").unbind("click").html('<i class="iconfont icon-tanhao1 pinpai-i"></i>' + Lang.app_detect_fill_audit)) : swal(e.msg)
            }, n), void a.fadeOut("fast")) : (swal(Lang.app_detect_fill_brand), !1)
    }), clickToHide($(".detect-new .guanbiannius"), $(".detect-new .waimians"))
}
function ajaxAction(e, a, t) {
    e.addClass("disabled"), e.attr("disabled", !0), $.ajax({
        type: e.data("type") || "GET",
        url: e.data("action"),
        data: t || e.data("datas") || "",
        success: function(t) {
            e.removeClass("disabled"), e.attr("disabled", !1), a ? a(t, e) : ajaxPubHandle(t)
        }
    })
}
function circleDetect(e, a) {
    if (0 != $("#circleProcess").length) {
        var t = e,
            n = Number(t.data("score")),
            i = a,
            o = 0;
        t.circleProgress({
            startAngle: -Math.PI / 4 * 2,
            thickness: 10,
            size: 140,
            lineCap: "round",
            fill: {
                color: "#13caa5"
            }
        });
        var s = setInterval(function() {
            o++, o <= n ? (i.text(o), t.circleProgress("value", o / 100)) : clearInterval(s)
        }, 1)
    }
}
function dataCenterCustomRankChart(e, a) {
    if (!a) return !1;
    var t = e.find(".chart-data"),
        n = a;
    n.color = "#00BC93", Highcharts.setOptions({
        global: {
            timezoneOffset: (new Date).getTimezoneOffset()
        }
    }), t.highcharts({
        chart: {
            type: "area",
            width: 200,
            height: 70,
            line: 0
        },
        exporting: {
            enabled: !1
        },
        title: {
            text: ""
        },
        credits: !0,
        xAxis: {
            labels: {
                enabled: !1
            },
            type: "datetime",
            tickLength: 0,
            lineColor: "#FFFFFF"
        },
        yAxis: {
            gridLineWidth: 0,
            labels: {
                enabled: !1
            },
            title: {
                text: ""
            },
            reversed: !0
        },
        lang: {
            noData: Lang.appcenter_download_no_data
        },
        legend: {
            enabled: !1
        },
        tooltip: {
            crosshairs: {
                color: "#C0C0C0"
            },
            positioner: function(e, a, t) {
                var n = t.plotX;
                return this.chart.plotWidth < t.plotX + e ? n = t.plotX - .8 * e : t.plotX < this.chart.plotLeft && (n = t.plotX + .2 * e), {
                    x: n
                }
            },
            hideDelay: 200,
            shared: !0,
            valueSuffix: Lang.staff,
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            dateTimeLabelFormats: {
                millisecond: Lang.dateTimeLabelFormats_week,
                second: Lang.dateTimeLabelFormats_week,
                minute: Lang.dateTimeLabelFormats_week,
                hour: Lang.dateTimeLabelFormats_week,
                day: Lang.dateTimeLabelFormats_week,
                month: Lang.dateTimeLabelFormats_week,
                year: Lang.dateTimeLabelFormats_week
            },
            useHTML: !0,
            headerFormat: '<small style="display: block; padding-bottom: 10px;">{point.key}</small><table>',
            pointFormatter: function() {
                return '<tr><td style="color:' + this.series.color + ' !important;padding-right: 3px !important;">●</td><td>' + this.series.name + '</td><td style=" padding-left: 7px !important; color:' + this.series.color + ' !important;">' + Math.abs(this.y) + "</td></tr>"
            },
            footerFormat: "</table>"
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 100,
                        y1: 0,
                        x2: 0,
                        y2: 0
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get("rgba")]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [n]
    })
}
function commentFold() {
    $(".comment .comment-content .fold").each(function() {
        if (this.scrollHeight > $(this).height()) {
            var e = $(this).text();
            $(this).attr("data-comment", e), commentClose(this)
        }
    })
}
function base_info_show() {
    var e = $(".base-area .base-info-area-show");
    if (e.length && e[0].scrollHeight > 44) {
        var a = e.text();
        e.attr("data-comment", a), base_info_close(e[0])
    }
}
function base_info_close(e) {
    $(e).css("max-height", ""), $(e).siblings(".fold-btn").remove(), $(e).after('<div class="fold-btn" onclick="commentOpen($(this).prev()[0])">' + Lang.app_show_all + "</div>")
}
function commentOpen(e) {
    $(e).html($(e).attr("data-comment")), $(e).siblings(".fold-btn").remove(), $(e).after('<div class="fold-btn" onclick="base_info_close($(this).prev()[0]);">' + Lang.app_show_other + "</div>"), $(e).css("max-height", "initial")
}
function commentClose(e) {
    for ($(e).css("max-height", ""); e.scrollHeight > $(e).height();) {
        var a = $(e).text(),
            t = 4;
        e.scrollHeight - $(e).height() > 20 && (t = 42 * Math.floor((e.scrollHeight - $(e).height()) / 17)), $(e).text(a.substring(0, a.length - t))
    }
    $(e).html(a.substring(0, a.length - 6) + "......"), $(e).siblings(".fold-btn").remove(), $(e).after('<div class="fold-btn" onclick="commentOpen($(this).prev()[0])">展开</div>')
}
function commentSearch(e) {
    var a = $(e).parent().siblings("input").val(),
        t = $(e).data("url") + "/sword/" + a;
    console.log($(e).siblings("input")), console.log(a), console.log(t), pjaxLoad(t)
}
function commentReply(e) {
    var a = $("#commentItcInfo"),
        t = a.data("status"),
        n = a.data("reportid"),
        i = a.data("url"),
        o = a.data("appleid"),
        s = $(e).data("userreviewid"),
        r = $(e).data("name");
    if (0 == t) {
        var d = Lang.itc_reply_comment,
            c = '<div class="sw-comment-reply-user"> ' + Lang.itc_reply_user + '<span style="color:#33ba95">' + r + "</span></div>";
        c += '<textarea class="sw-comment-reply-area" id="replyCommentArea" placeholder="' + Lang.itc_reply_tip + '"></textarea>', swal({
            title: d,
            text: c,
            showCancelButton: !0,
            closeOnConfirm: !1,
            html: !0,
            customClass: "sw-comment-reply"
        }, function() {
            var e = $("#replyCommentArea").val();
            return "" === e ? (swal(Lang.itc_reply_tip), !1) : void $.ajax({
                    type: "POST",
                    url: i,
                    data: {
                        reportId: n,
                        userReviewId: s,
                        responseText: e
                    },
                    success: function(e) {
                        1e4 == e.code ? (swal(e.title, e.content), pjaxLoad(window.location.href)) : swal(e.title, e.content)
                    }
                })
        })
    } else 1 == t ? ($(".itc-account-editer").show(), $(".itc-account-editer").find(".modify-email").val(o).end().find(".old-email").val(o), console.log("账户密码错误")) : 2 == t ? ($(".itc-account-editer").show(), $(".itc-account-editer").find(".modify-email").val(o).end().find(".old-email").val(o), console.log("apple_userid获取失败")) : 3 == t ? ($(".itc-account-double-check").show(), $(".itc-account-double-check .icon-guanbi, .itc-account-double-check p a").click(function() {
                    $(".itc-account-double-check").hide()
                }), console.log("开启二次验证")) : ($(".bind-itc-account-showdesc").show(), $(".bind-itc-account-showdesc .icon-guanbi").click(function() {
                    $(".bind-itc-account-showdesc").hide()
                }), console.log("您没有绑定itc"))
}
function setBindItcAccountInfo(e) {
    var a = $.parseJSON(e);
    $("#bind-itc-account .top h6").html(a.title), $("#bind-itc-account .center p").html(a.tips)
}
function commentReplyEdit(e) {
    var a = $("#commentItcInfo").data("status");
    0 == a ? console.log("开发者账户正常") : 1 == a ? console.log("账户密码错误") : 2 == a ? console.log("apple_userid获取失败") : 3 == a ? console.log("开启二次验证") : $(".bind-itc-account-showdesc").show()
}
function isLocalStorageSupported() {
    var e = "test",
        a = window.localStorage;
    try {
        return a.setItem(e, "testValue"), a.removeItem(e), !0
    } catch (t) {
        return !1
    }
}
function itcDoubleCheck() {
    var e = $("#hasItcDoubleCheck").val();
    1 == e && swal({
        title: Lang.itc_double_check_title,
        showConfirmButton: !0,
        confirmButtonText: Lang.itc_double_check_confirm,
        confirmButtonColor: "#0bb995",
        showCancelButton: !0,
        cancelButtonText: Lang.itc_double_check_cancel,
        closeOnConfirm: !1,
        html: !0
    }, function(e) {
        e && window.open("https://support.apple.com/zh-cn/HT202664")
    })
}
function addMyEmailSubscribe(e, a) {
    if (e) {
        if (self = $(a), platform = $('input[name="platform-type"]').val() || "0", $.inArray(platform, ["0", "1"]) == -1) return swal("参数错误，刷新后重试"), !1;
        var t = self.html();
        self.html(Lang.now_adding);
        var n = "/account/addMyEmailSubscribe";
        $.ajax({
            type: "get",
            url: n,
            data: {
                app_id: e,
                platform: platform
            },
            dataType: "json",
            success: function(e) {
                e && 1e4 == e.code ? (data = e.data, swal({
                        title: Lang.add_app_email_title,
                        text: Lang.add_app_email_text,
                        type: "warning",
                        showCancelButton: !0,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: Lang.confirm_btn,
                        cancelButtonText: Lang.add_app_email_setting,
                        closeOnConfirm: !1
                    }, function(e) {
                        e || window.open("/account/setting/type/settingAccount"), window.location.reload()
                    })) : (10011 == e.code ? loginByAlert() : 10208 == e.code ? swal({
                                title: Lang.add_app_email_fail_title,
                                text: e.msg,
                                type: "warning",
                                showCancelButton: !0,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: Lang.confirm_btn,
                                cancelButtonText: Lang.add_app_email_fail_btn,
                                closeOnConfirm: !0
                            }, function(a) {
                                a || window.open(e.url)
                            }) : swal({
                                title: e.msg,
                                type: "error",
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: Lang.confirm_btn,
                                closeOnConfirm: !0
                            }), self.html(t))
            }
        })
    }
}
function cancelMyEmailSubscribe(e, a) {
    swal({
        title: Lang.delete_app_email_title,
        text: Lang.delete_app_email_text,
        type: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: Lang.confirm_btn,
        cancelButtonText: Lang.cancel_btn,
        closeOnConfirm: !1
    }, function() {
        var a = "/account/cancelMyEmailSubscribe";
        return self = $(self), html = self.html(), platform, platform = $('input[name="platform-type"]').val(), $.inArray(platform, ["0", "1"]) == -1 ? (swal("参数错误，刷新后重试"), !1) : void $.ajax({
                type: "get",
                url: a,
                data: {
                    app_id: e,
                    platform: platform
                },
                dataType: "json",
                success: function(e) {
                    e && 1e4 == e.code ? window.location.reload() : swal(e.msg)
                }
            })
    })
}
function buySubmit(e) {
    return 1e4 == e.code ? (e.data && asyncPayNew(e.data), !1) : void(0 == e.code ? window.location.href = window.location.href + "?time=" + (new Date).getTime() : swal(e.msg))
}
function asyncPayNew(e) {
    if ("wx" == e.payChannel) {
        beecloudPayPop(e.amount / 100);
        var a = navigator.userAgent.toLowerCase();
        "micromessenger" == a.match(/MicroMessenger/i) ? e.payChannel = "wx" : e.payChannel = "wxmp", $(".buy-vip-cancel").click()
    }
    "undefined" == typeof BC ? document.addEventListener ? document.addEventListener("beecloud:onready", bcPayNew, !1) : document.attachEvent && document.attachEvent("beecloud:onready", bcPayNew) : bcPayNew(e)
}
function bcPayNew(e) {
    var a = {
        title: e.title,
        amount: e.amount,
        debug: e.debug,
        openid: e.openid,
        out_trade_no: e.out_trade_no,
        sign: e.sign,
        return_url: e.return_url,
        instant_channel: e.payChannel,
        optional: e.optional
    };
    console.log(a), BC.click(a, {
        wxJsapiSuccess: function(a) {
            console.log(111), window.location.href = e.return_url
        },
        dataError: function(e) {
            console.log(233)
        }
    }), console.log(22)
}
function beecloudPayPop(e) {
    var a, t = '<p class="beecloud-title">扫码支付</p>',
        n = '<p class="wechat-pay">微信扫码支付<span>' + e + "</span>元</p>",
        i = '<p class="info"></p>';
    a = setInterval(function() {
        $("#beecloud-pay .beecloud-wx canvas").length && ($("#beecloud-pay .beecloud-wx p").remove(".beecloud-title").remove(".wechat-pay").remove(".info"), $("#beecloud-pay .beecloud-wx").prepend(t), $("#beecloud-pay .beecloud-wx").append(n), $("#beecloud-pay .beecloud-wx").append(i), clearInterval(a))
    }, 30)
}
var $addCompetiBg, $addCompetiSpinner, $competiSearchList, $pageButton, accountLimit, delUrl, isSubmiting = !1,
    appid = $("#appinfo-id").val(),
    form, submitUrl, method, competiMaxPage = 0,
    currentPage = 1,
    ajaxUrl = "",
    searchWord = "",
    competiGetDataRun = !1,
    clickEvent = isMobile ? "tap" : "click",
    hoverTimeout, tableSort;
$(function() {
    function e(e, a) {
        if (0 != $("#circleProcess").length) {
            var t = e,
                n = Number(t.data("score")),
                i = a,
                o = 0;
            t.circleProgress({
                startAngle: -Math.PI / 4 * 2,
                thickness: 10,
                lineCap: "round",
                fill: {
                    color: "#13caa5"
                }
            });
            var s = setInterval(function() {
                o++, o <= n ? (i.text(o), t.circleProgress("value", o / 100)) : clearInterval(s)
            }, 1)
        }
    }
    function a(e, a) {
        var t, n, i;
        try {
            t = e.toString().split(".")[1].length
        } catch (o) {
            t = 0
        }
        try {
            n = a.toString().split(".")[1].length
        } catch (o) {
            n = 0
        }
        return i = Math.pow(10, Math.max(t, n)), (e * i + a * i) / i
    }
    function t(e, a, t) {
        t.addClass("disabled"), $.post(e, {
            amount: a
        }, function(e) {
            1e4 == e.code ? swal({
                    title: e.msg,
                    type: "success",
                    confirmButtonText: Lang.confirm_btn
                }, function() {
                    location.reload()
                }) : swal({
                    title: e.msg,
                    type: "error",
                    confirmButtonText: Lang.confirm_btn
                }, function() {
                    10002 == e.code && location.reload(), e.nowPrice && $(".now-price").text(e.nowPrice) && $(".now-price-input").val(e.nowPrice + .1), t.removeClass("disabled")
                })
        })
    }
    function n() {
        W > 0 ? (W -= 1, J = Math.floor(W % 60), Y = Math.floor(W / 60 % 60), G = Math.floor(W / 3600), z = G > 0 ? G + "小时" : "", z += Y > 0 ? Y + "分" : "", z += J + "秒", q.html(z)) : (window.clearInterval(U), location.reload())
    }
    function i() {
        var e, a, t, n, i = $("#part-3");
        e = i.data("url"), t = i.find("table .no-data"), n = setInterval(function() {
            a = i.find("table .his-bid").first().text() || 0, $.getJSON(e, {
                bid: a
            }, function(e) {
                1e4 === e.code && (e.nowPrice >= 2.5 && clearInterval(n), e.histroy && (i.find("table").prepend(e.histroy), t.length > 0 && t.remove()), e.nowPrice && $(".now-price").text(e.nowPrice) && $(".now-price-input").val(e.nowPrice + .1))
            })
        }, 5e3)
    }
    function o() {
        var e, a, t, n, i = $(".report-condition-area .brand-dl .active"),
            o = $(".report-condition-area .class-dl .active");
        return 0 != i.length && 0 != o.length && ($(".brand-area").hide(), a = i.data("brandtype"), t = o.data("classtype"), e = "." + a + "-area", $(e).show(), void("all" != t ? ($(".ait-area").hide(), n = "#ait-" + t, $(n).show()) : $(".ait-area").show()))
    }
    function s() {
        $("img:not(.noload-default)").one("error", function() {
            $(this).attr("src", sourcePublic + "app/images/default-app-logo.png")
        })
    }
    function r() {
        if (!window.isMobile) {
            $(".aso100-nav-select .nav .dropdown, .appinfo-country.nav .dropdown, .get-analysis-data.nav .dropdown").on("click", function(e) {
                var a = $(e.target);
                if (a.hasClass("dropdown-toggle") && !a.parent().hasClass("cascade")) return !1
            });
            var e;
            $(".aso100-nav-select .nav .dropdown, .appinfo-country.nav .dropdown, .get-analysis-data.nav .dropdown").hover(function() {
                var a = $(this);
                e = setTimeout(function() {
                    a.children(".date-range-picker").length > 0 && a.children(".date-range-picker").click(), 0 == a.children(".btn").length && a.addClass("open")
                }, 100)
            }, function() {
                clearTimeout(e);
                var a = $(this),
                    t = 0;
                a.children(".dropdown-menu").mouseenter(function() {
                    t = 1
                }), $(".daterangepicker").mouseenter(function() {
                    t = 1
                }), setTimeout(function() {
                    0 == t && a.hasClass("open") && (a.children(".date-range-picker").length > 0 && a.children(".date-range-picker").click(), 0 == a.children(".btn").length && a.removeClass("open"))
                }, 100)
            }), $(document).on("mouseleave", ".daterangepicker", function(e) {
                $(".aso100-nav-select .nav .dropdown.open").children(".date-range-picker").click()
            })
        }
    }
    function d(e, a, t) {
        $(e).is(":hidden") ? ($(e).show(), $(a).css("border-bottom", 0), $(a + " img").hide(), $(a + " span").hide(), $(a + " i").addClass("top"), $(a + " p a").html("<span>" + Lang.already_subscribed + "</span>"), t ? $(t).css("border-top", 0) : $(a + " div+div").hide(), $(a).addClass("tit")) : ($(e).hide(), $(a + " span").show(), $(a).css("border-bottom", "1px solid #ddd"), t ? $(a + " p a").html("<span>" + Lang.subscribe_app + "</span>") : $(a + " div+div").show(), $(a + " p img").show(), $(a + " i").removeClass("top"), $(a).removeClass("tit"))
    }
    function c(e, a, t, n) {
        $(e).addClass(a), $(t).addClass(n)
    }
    function l(e, a, t, n) {
        $(e).removeClass(a), $(t).removeClass(n)
    }
    function p(e, a) {
        var t = $(".nav-date-bar-action .nav-item-hour"),
            n = $(".nav-date-bar-action .nav-item-day"),
            i = $("#charts-ajax-data"),
            o = i.data("defaultquerydata") || {},
            s = i.data("showhour");
        je && (o && "string" == typeof o && (o = JSON.parse(o)), o && i.length && o.sdate && (o.sdate = void 0), o && i.length && o.edate && (o.edate = void 0), o && (o.word = a), t.data("showdate", Lang.date_range_7), n.data("showdate", Lang.date_range_3), t.data("querydata", JSON.stringify(o)), n.data("querydata", JSON.stringify(o)));
        var r = $(".charts-ajax-data-copy").html();
        i.length && i.html(r), window.keywordShowHourTab.isDefault = "default", s ? (t.addClass("active").siblings().removeClass("active"), window.keywordShowHourTab.type = "hour", window.isKeywordShowHour = 1, window.keywordShowHourTab.defaultLang = Lang.date_range_7) : (i.data("ajaxurl", i.data("defaultdayajaxurl")), n.addClass("active").siblings().removeClass("active"), window.keywordShowHourTab.type = "day", window.isKeywordShowHour = 0, window.keywordShowHourTab.defaultLang = Lang.date_range_3)
    }
    function u(e, a) {
        var t = $("#setting");
        if (!t.length) return !1;
        var n = e || t.data("url"),
            i = $("#html-container");
        $.ajax({
            url: n,
            type: "get",
            dataType: "html",
            error: function(e) {
                if (e && 403 == e.status) window.location.href = "/";
                else if (302 == e.status) {
                    var a = e.getResponseHeader("Url");
                    a ? window.location.href = a : window.location.href = "/"
                }
            },
            success: function(e) {
                i.html(e), accountPwd(i.find(".account-setting")), accountPwd(i.find(".account-setting-pass")), setTimeout(footerFixed, 0), $('[data-toggle="tooltip"]').tooltip({
                    delay: {
                        show: 50,
                        hide: 100
                    }
                }), O(), settingAccount(), getDataCenterKeyword(), investCreateGroup(), ka(), itcDoubleCheck(), a && a()
            }
        })
    }
    function h(e) {
        var a = e || $(".group-change-select");
        a.length > 0 && a.select2({
            minimumResultsForSearch: -1,
            placeholder: Lang.keyword_select2_placehoder,
            language: Lang.language_type
        })
    }
    function m(e, a, t) {
        var n, i = $("#groupData"),
            o = $("#group-change-submit").data("submiturl"),
            s = $("#group-list-nav .group.active");
        e && a ? $.ajax({
                url: o,
                type: "GET",
                dataType: "json",
                data: {
                    ids: e,
                    group: a
                }
            }).done(function(a) {
                if (1e4 == a.code) {
                    var o = $.parseJSON(a.tableData);
                    $.each(o, function(e, a) {
                        if (className = "groupData_" + e, classNameEle = "." + className, 0 == $(classNameEle).length) {
                            var t = '<input type="hidden" class="' + className + '">';
                            i.append(t)
                        }
                        $(classNameEle).val(JSON.stringify(a))
                    }), s.click(), n = e.toString().split(",").length, "cn" == Lang.language_type ? a.groupName && swal(n + Lang.keyword_setting_succ + a.groupName, "", "success") : swal(Lang.keyword_setting_succ, "", "success"), t && t()
                } else swal(Lang.keyword_setting_error)
            }).fail(function() {
                swal(Lang.request_error)
            }) : swal(Lang.keyword_selct_word)
    }
    function f(e, a) {
        var t = $(".groupData_0"),
            n = t.val();
        if (n && (n = $.parseJSON(n), $.each(n, function(a, t) {
                if (t[0] == e.toString()) return n.splice(a, 1), !1
            }), t.val(JSON.stringify(n))), 0 == $.parseJSON(t.val()).length) return $("#keyword-repertory-nodata").removeClass("hide"), $("#keyword-repertory-container").remove(), !1;
        if (0 != a) {
            var i = ".groupData_" + a,
                o = $(i).val();
            o && (o = $.parseJSON(o), $.each(o, function(a, t) {
                if (t[0] == e.toString()) return o.splice(a, 1), !1
            }), $(i).val(JSON.stringify(o)))
        }
        $("#checkbox_" + e).parents("tr").fadeOut("fast", function() {
            $("#checkbox_" + e).parents("tr").remove()
        });
        var s = $("#repertory-box .word-" + e);
        s.fadeOut("fast", function() {
            s.remove()
        })
    }
    function g() {
        if ($(".container-appinfo").length) {
            var e = $("#keyword-guide-area"),
                a = $("#nav-list"),
                t = $('input[name="is-myapp"]').val();
            t ? (e.length && (e.find(".guide-enter").show(), e.find(".guide-seal").show()), a.find(".keyword-show").show()) : (e.length && (e.find(".guide-enter").hide(), e.find(".guide-seal").hide()), a.find(".keyword-show").hide())
        }
    }
    function b(e, a, t) {
        e.addClass("disabled"), e.attr("disabled", !0), $.ajax({
            type: e.data("type") || "GET",
            url: e.data("action"),
            data: t || e.data("datas") || "",
            success: function(t) {
                e.removeClass("disabled"), e.attr("disabled", !1), a ? a(t, e) : ajaxPubHandle(t)
            }
        })
    }
    function v(e, a, t) {
        var n = a.parents(".remarks-info"),
            i = n.find(".remark-desc"),
            o = n.find(".remark-input"),
            s = n.find(".remark-action");
        remarkNew = o.find("input").val(), o.hide(), s.show(), 1e4 != e.code ? swal(e.msg) : i.text(remarkNew), i.show()
    }
    function w(e, a, t) {
        if (1e4 == e.code) {
            var n = a.parents(".dcbct-tbody-info-chart"),
                i = a.parents(".dcb-content-table");
            $("#isStickTopPop").data("ispop", e.ispop), i.find(".dcbct-tbody-info-chart.list").first().before(n), i.find(".dcbct-tbody-info-chart.list .dcbc-table-num").map(function(e, a) {
                $(a).text(++e)
            })
        } else swal(e.msg)
    }
    function y(e, a, t) {
        var n = $(".nav-tabs li.active a").attr("href"),
            i = t.appid,
            o = $(n).find(".dcbct-body-competi-chart-tr-" + i),
            s = o.find(".chart-data");
        o.find(".spinner-box").removeClass("show").addClass("animation-hide"), o.addClass("data-ready"), a.hasClass("action-rank") && datePicker(o.find(".date-range-picker")), window.chartData.titleDate = Lang.date_range_1, e.data ? drawCharts(e.data, s) : drawNodataCharts(e.data, s)
    }
    function x(e, a) {
        var t = e.data("appid"),
            n = e.parents(".competi-search-list").data("appid"),
            i = e.parents(".competi-search-list").data("indexid"),
            o = {};
        o = {
            competiId: t,
            appid: n,
            indexId: i
        }, ajaxRequestAction(e, k, o, a)
    }
    function k(e, a, t) {
        if (1e4 == e.code) {
            a.text("已添加").addClass("disabled");
            var n = $("#competiDataUrl").val();
            $.ajax({
                url: n,
                type: "GET",
                dataType: "json",
                data: t
            }).done(function(e) {
                var a = $(".dcbct-body-compete-chart-warp-" + t.indexId),
                    n = a.find(".dcbc-table-body-competi tbody"),
                    i = e.data.competiOutHTML;
                n.prepend(i), n.find(".dcbct-body-info-tr").map(function(e, a) {
                    $(this).find("td:eq(0)").text(++e)
                })
            }).fail(function() {
                swal("请稍后再试")
            })
        } else swal(e.msg)
    }
    function C(e, a) {
        if (e && 1e4 == e.code) {
            var t = a.parents(".dcbct-body-compete-chart-warp"),
                n = t.find(".dcbc-table-body-competi tbody"),
                i = t.find(".dcbc-table-body-possible tbody"),
                o = a.parents(".dcbct-body-info-tr"),
                s = a.data("datas"),
                r = s.competiId,
                d = $(".dcbct-body-competi-chart-tr-" + r);
            a.context.className.indexOf("action-del") == -1 ? (n.prepend(d), n.prepend(o), n.find(".no-result").length && n.find(".no-result").hide()) : (i.prepend(d), i.prepend(o), i.find(".no-result").length && i.find(".no-result").hide()), i.find(".dcbct-body-info-tr").map(function(e, a) {
                $(this).find("td:eq(0)").text(++e)
            }), n.find(".dcbct-body-info-tr").map(function(e, a) {
                $(this).find("td:eq(0)").text(++e)
            })
        } else swal(e.msg)
    }
    function _(e, a) {
        re = new RegExp("groupid\\/\\d+", "i"), isExist = e.match(re), e = isExist ? e.replace(isExist, "groupid/" + a) : e + "/groupid/" + a, u(e)
    }
    function T(e) {
        if (ba) return !1;
        var a = $(".alert-app-top-main"),
            t = a.data("left") || 0,
            n = getInt(a.find("li").css("width")) + getInt(a.find("li:not(:first-child)").css("marginLeft")),
            i = window.isMobile ? 5 : 6,
            o = (a.find("li").length - i - 1) * n;
        Math.abs(t) >= o ? (ba = !0, $(".left-arrow").show(), t -= n, a.css("webkit-transform", "translateX(" + t + "px)").on("transitionend", function() {
                ba = !1
            }).data("left", t), e.hide()) : (ba = !0, $(".left-arrow").show(), t -= n, a.css("webkit-transform", "translateX(" + t + "px)").on("transitionend", function() {
                ba = !1
            }).data("left", t))
    }
    function S(e) {
        if (va) return !1;
        var a = $(".alert-app-top-main"),
            t = a.data("left") || 0,
            n = $(".show-app-top-main").offset().left,
            i = a.offset().left + 10,
            o = a.find("li").length > 1 ? getInt(a.find("li").css("width")) + getInt(a.find("li:not(:first-child)").css("marginLeft")) : getInt(a.find("li").length ? a.find("li").css("width") : $(".show-app-top-main").css("width"));
        n < i + o ? (va = !0, $(".right-arrow").show(), t += o, a.css("webkit-transform", "translateX(" + t + "px)").on("transitionend", function() {
                va = !1
            }).data("left", t), e.hide()) : (va = !0, $(".right-arrow").show(), t += o, a.css("webkit-transform", "translateX(" + t + "px)").on("transitionend", function() {
                va = !1
            }).data("left", t))
    }
    function D() {
        Ba--, Ta = Math.floor(Ba / 60 % 60), Sa = Math.floor(Ba % 60), Da.html(numAddZero(Ta)), ja.html(numAddZero(Sa)), Ba <= 0 && (clearInterval(Oa), $.ajax({
            url: K,
            success: function(e) {
                location.href = e.url
            }
        }))
    }
    try {
        var j = $.cookie("fuid");
        j || (new Fingerprint2).get(function(e) {
            $.cookie("fuid", e, {
                path: "/",
                expires: 360
            })
        })
    } catch (B) {}
    var O = function() {
        je = void 0, $("#charts-appname").val($("#charts-appname").data("appname")), s(), tooltipInit(), moreBtnShow(), r(), $("#keyword-list").length && $("#is_android").length ? dataSearchPush_android() : dataSearchPush(), downSources(), $("#bind-itc-account").hide(), keywordRepertory(), h(), centerModals(), g(), showChangePd()
    };
    if ($(".btn-copy-custom").length) {
        var I = new Clipboard(".btn-copy-custom"),
            M = $(".btn-copy-custom");
        I.on("success", function(e) {
            M.addClass("copied"), setTimeout(function() {
                M.removeClass("copied")
            }, 2e3), e.clearSelection()
        }), I.on("error", function(e) {
            var a = isMobile ? "请手动复制" : "请按 Ctrl/Cmd+C 复制";
            swal(a)
        })
    }
    if ($(document).mouseup(function(e) {
            var a = $("#expand-detail-two"),
                t = $(".alert-app-search"),
                n = ($(".alert-app"), $(".alert-keyword")),
                i = $(".add-item-two");
            if (a.length) {
                var o = a.find("form");
                o.is(e.target) || 0 !== o.has(e.target).length || a.find(".search-app-list").hide()
            }
            if (t.length) {
                var o = t.find(".alert-default-list"),
                    s = t.find("form");
                s.is(e.target) || 0 !== s.has(e.target).length || o.is(e.target) || 0 !== o.has(e.target).length || o.hide()
            }
            if (n.length) {
                var o = n.find(".alert-keyword-container");
                o.is(e.target) || 0 !== o.has(e.target).length || n.hide()
            }
            if (i.length) {
                var o = i.find(".select-drop-list");
                o.is(e.target) || 0 !== o.has(e.target).length || (o.hide(), i.find(".one-select").removeClass("active"))
            }
        }), $("#qrcode-show").length) {
        var P, R = $("#qrcode-body"),
            F = $("#qrcode-show"),
            E = $("#qrcode-body .popover-content img"),
            N = $("#qrcode-body .popover-content img").data("imgs"),
            A = F.position().left - 76 + "px";
        R.css("left", A), $("#qrcode-show").hover(function() {
            "undefined" == typeof E.attr("src") && E.attr("src", N), P = setTimeout(function() {
                R.fadeIn(200)
            }, 300)
        }, function() {
            clearTimeout(P), R.fadeOut(200)
        })
    }
    var H = "#0bb995";
    if ($(".bidding-header").length > 0 && (H = "#3e9eeb"), swal.setDefaults({
            confirmButtonText: Lang.confirm_btn,
            cancelButtonText: Lang.cancel_btn,
            confirmButtonColor: H
        }), e($("#circleScore"), $(".d-score-text-1")), e($("#circleScore2"), $(".d-score-text-2")), $(".detect-new .chart-show").each(function(e, a) {
            var t = $(this),
                n = t.data("chartdata");
            dataCenterCustomRankChart(t, n)
        }), $(document).on("click", ".jifen-switch li", function() {
            var e = $(this),
                a = $(".jifen-main");
            e.addClass("active").siblings().removeClass("active"), a.find("." + e.data("father")).show().siblings().hide()
        }), circleDetect($("#circleScore"), $(".d-score-text-1")), circleDetect($("#circleScore2"), $(".d-score-text-2")), $(".detect-new .chart-show").each(function(e, a) {
            var t = $(this),
                n = t.data("chartdata");
            dataCenterCustomRankChart(t, n)
        }), 1 == $("#bid-state").val()) {
        $(document).on("click", "#offer-btn", function() {
            var e, n, i = $(this),
                o = $("#offer-action"),
                s = $("#cover-bg"),
                r = $("#up-btn"),
                d = $("#amount");
            e = parseFloat(d.val()), i.hasClass("isShow") ? (n = i.data("url"), t(n, e, i)) : (i.addClass("isShow"), $("body").css("overflow", "hidden"), o.slideDown(), s.fadeIn()), s.on("tap", function() {
                $("body").css("overflow", "auto"), o.slideUp(), s.fadeOut(), i.removeClass("isShow"), d.val() || d.val(e)
            }), r.on("tap", function() {
                return 2.5 != e && (e = a(e, .1), void d.val(e))
            })
        });
        var q, W, U, z, J, Y, G;
        q = $(".bidding-area .info .remain-second"), W = parseInt(q.data("seconds")), U = window.setInterval(n, 1e3), n(), i()
    }
    if (1 == $("#ispopup").val() && swal("很遗憾，您错过了本期竞拍，新一期下周一8:00开始，不要错过哦"), $(document).on("click", "#verify-phone #send-code", function() {
            var e, a = $(this),
                t = $("#phone").val();
            e = a.data("sendurl"), $.getJSON(e, {
                phone: t
            }, function(e) {
                if (1e4 != e.code) return swal({
                    title: e.msg,
                    type: "error",
                    confirmButtonText: Lang.confirm_btn
                }), !1;
                var t = 59,
                    n = setInterval(function() {
                        a.text("重新获取(" + t--+")"), t < 0 && (a.removeClass("disabled"), a.text("获取验证码"), clearInterval(n))
                    }, 1e3);
                a.addClass("disabled"), a.text("重新获取(60)"), swal({
                    title: e.msg,
                    type: "success",
                    confirmButtonText: Lang.confirm_btn
                })
            })
        }), $(document).on("tap", "#verify-phone #submit", function() {
            var e = ($(this), $(".form-horizontal")),
                a = $(".referer").val();
            $.ajax({
                type: "POST",
                url: e.attr("action"),
                data: e.serialize(),
                success: function(e) {
                    return 1e4 != e.code ? (swal({
                            title: e.msg,
                            type: "error",
                            confirmButtonText: Lang.confirm_btn
                        }), !1) : void swal({
                            title: e.msg,
                            type: "success",
                            confirmButtonText: Lang.confirm_btn
                        }, function() {
                            window.location.href = a
                        })
                }
            })
        }), $(document).on("click", ".change-pd .iconfont", function() {
            var e = $(this),
                a = e.parents(".change-pd"),
                t = a.data("name");
            if (!t) return !1;
            var n = +moment(moment().format("YYYY-MM-DD") + " 23:59:59"),
                i = {};
            localStorage.pdconfig && (i = JSON.parse(localStorage.pdconfig)), i[t] = n, i = JSON.stringify(i), localStorage.pdconfig = i, a.removeClass("show-animation")
        }), $(document).on("tap click", ".nav .change-lang", function() {
            var e, a = $(this);
            e = a.data("langtype"), $.cookie("language", e, {
                path: "/"
            }), location.reload()
        }), $(document).on("focus", ".navbar-top-form .input-group .form-control", function() {
            var e = $(this).parents("form");
            e.hasClass("lanuch") || (window.isMobile ? e.addClass("lanuch") : e.addClass("lanuch").find(".form-control.search-su").animate({
                    width: window.isMobile ? "4.0625rem" : "490px"
                }, 400).select())
        }), $(document).on("click", ".navbar-top-form .search-close", function(e) {
            var a = $(this).parents("form");
            return a.removeClass("lanuch").find(".form-control.search-su").animate({
                width: "166px"
            }, 200), !1
        }), $(document).on("tap click", "#platform .platform-btn", function() {
            var e = $(this),
                a = e.data("icon"),
                t = e.data("lang"),
                n = e.data("searchurl"),
                i = e.parents("ul.dropdown-menu"),
                o = i.parents(".navbar-form"),
                s = o.find("i.active-icon");
            o.attr("action", n), s.removeClass("icon-android").removeClass("icon-ios").addClass(a), $("input[name='search']").focus(), "apple" == t ? ($("input[name='search']").attr("placeholder", Lang.apple_search_placeholder), o.find(".select-button.country").removeClass("hide")) : ($("input[name='search']").attr("placeholder", Lang.android_search_placeholder), o.find(".select-button.country").addClass("hide"))
        }), $(document).on("click", ".country-select.dropdown-menu li", function() {
            var e = $(this),
                a = e.find("a").data("country");
            if (e.hasClass("search-country")) return !1;
            var t = e.parents(".country").find(".btn .icon-flag");
            t.removeClass("icon-flag-" + t.data("country")).addClass("icon-flag-" + a).data("country", a), $(".navbar-form .country").find(".btn .icon-flag").removeClass("icon-flag-" + t.data("country")).addClass("icon-flag-" + a).data("country", a).end().find("input.country-hidden").val(a), t.find("input.country-hidden").val(a), $.cookie("country", a, {
                path: "/",
                expires: 90
            }), e.parents("form.navbar-form").find('input[name="search"]').focus()
        }), $(document).on("focus keyup input paste", ".country-select.dropdown-menu .search-country input", function() {
            var e = $(this),
                a = e.val(),
                t = e.parents(".country-select").find(".select-container li");
            a ? (a = a.toLowerCase(), $.map(t, function(e, t) {
                    var n = $(e),
                        i = n.find("a").data("search");
                    n.hasClass("hot-country") || !i ? n.hide() : i.indexOf(a) !== -1 ? n.show() : n.hide()
                })) : $.map(t, function(e, a) {
                    $(e).show()
                })
        }), o(), $(document).on("tap click", ".machine-report .report-condition-area .brand-btn", function() {
            $(".brand-btn").hasClass("active") && $(".brand-btn").removeClass("active"), $(this).addClass("active"), o()
        }), $(document).on("tap click", ".machine-report .report-condition-area .class-btn", function() {
            $(".class-btn").hasClass("active") && $(".class-btn").removeClass("active"), $(this).addClass("active"), o()
        }), $(document).on("tap click", ".machine-report .click-more", function(e) {
            var a, t = $(this);
            a = t.prev(), a.hasClass("more-data") && ("none" == a.css("display") ? (a.show(), "release" == t.data("type") ? t.html("<span>▲ " + Lang.click_fold_up + "</span>") : t.html("<span>" + Lang.click_fold_up + "</span>")) : (a.hide(), "release" == t.data("type") ? t.html("<span>▼ " + Lang.click_get_more_record + "</span>") : t.html("<span>" + Lang.click_get_more + "</span>")))
        }), $(document).on("tap click focus", ".input-value", function() {
            $(this).val("")
        }), $(document).on("tap", ".aso100-nav-select .dropdown", function(e) {
            if (e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0, isMobile) {
                var a = $(this),
                    t = a.find(".dropdown-menu.wide"),
                    n = document.documentElement.clientWidth;
                if (!t.length) return;
                var i = 300,
                    o = a.offset().left,
                    s = 0;
                s = i - (n - o) + 15, s > 0 && t.css({
                    left: -s,
                    right: "initial"
                }).find(".glyphicon").css({
                    left: s + a.width() / 2 - 7,
                    right: "initial"
                })
            }
        }), $(document).on("tap click", ".jumbotron", function(e) {
            $(".aso100-nav-select .dropdown.open").removeClass("open"), $(".navbar-top-form .search-close").trigger("click")
        }), $(document).on("click", "#manual-refresh", function() {
            var e, a, t = $(this),
                n = t.data("page");
            if ("app" == n) {
                a = t.data("appid");
                var i = t.data("countryid") || 1;
                e = "/app/manualRefreshByAppid/appid/" + a + "/countryid/" + i
            } else {
                if ("search" != n) return swal({
                    title: Lang.operation_exception,
                    type: "error",
                    showCancelButton: !1,
                    confirmButtonColor: "#33ba95",
                    confirmButtonText: Lang.confirm_btn,
                    cancelButtonText: Lang.cancel_btn
                }), !1;
                a = t.data("wordid"), word = t.data("word"), e = "/search/manualRefreshByWord/word/" + word + "/wordid/" + a
            }
            return $.ajax({
                url: e,
                type: "get",
                dataType: "json",
                beforeSend: function(e) {
                    e.setRequestHeader("RequestType", "ajax")
                },
                success: function(e) {
                    1e4 == parseInt(e.code) ? swal({
                            title: e.msg,
                            type: "success",
                            showCancelButton: !1,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.confirm_btn,
                            cancelButtonText: Lang.cancel_btn
                        }) : swal({
                            title: e.msg,
                            type: "error",
                            showCancelButton: !1,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.confirm_btn,
                            cancelButtonText: Lang.cancel_btn
                        })
                }
            }), !1
        }), $(".gee-test").length) {
        var X = $(".gee-test"),
            V = X.data("product") || "embed",
            K = X.data("checkurl") || "/error/verifyGeetest",
            Z = function(e) {
                window.geetestO = e, geetestO.appendTo(".gee-test #pop"), geetestO.onSuccess(function() {
                    $.ajax({
                        url: K,
                        type: "post",
                        dataType: "json",
                        data: geetestO.getValidate(),
                        success: function(e) {
                            if (1e4 == parseInt(e.code)) {
                                var a = $("#signin");
                                a.length > 0 && a.find(".sign-msg").html("").slideUp("fast");
                                var t = $(".gee-test").data("referrer");
                                t && (window.location.href = t)
                            } else swal({
                                title: e.msg,
                                type: "error",
                                showCancelButton: !1,
                                confirmButtonColor: "#33ba95",
                                confirmButtonText: Lang.confirm_btn,
                                cancelButtonText: Lang.cancel_btn
                            })
                        }
                    })
                })
            };
        $.ajax({
            url: "/error/geetestInfo?rand=" + Math.round(100 * Math.random()),
            type: "get",
            dataType: "json",
            success: function(e) {
                initGeetest({
                    gt: e.gt,
                    challenge: e.challenge,
                    product: V,
                    width: "310px",
                    offline: !e.success
                }, Z)
            }
        })
    }
    var Q;
    $(document).on("mouseenter", "#app-list .media", function() {
        var e = $(this).find(".media-right a.btn-custom");
        Q = setTimeout(function() {
            e.css("visibility", "visible").css("opacity", 0).animate({
                opacity: 1
            }, 400)
        }, 300)
    }), $(document).on("mouseleave", "#app-list .media", function() {
        var e = $(this).find(".media-right a.btn-custom");
        clearTimeout(Q), e.css("opacity", 1).animate({
            opacity: 0
        }, 400)
    }), $("#search-index-history-info .iconfont").on("click", function() {
        $("#search-index-history-info").addClass("hide").removeClass("show show-animation"), $("#vip-b").hide()
    }), $("#show-search-history").on("click", function() {
        $("#search-index-history-info").removeClass("hide").addClass("show show-animation"), $("#vip-b").show()
    }), $("#search-index-history-info td a").hover(function() {
        var e = $(this).data("appid");
        $(".search-history-" + e).addClass("hover")
    }, function() {
        var e = $(this).data("appid");
        $(".search-history-" + e).removeClass("hover")
    }), s(), window.isWechat && $(".machine-report .share").show(), window.isMobile && !
        function() {
            var e = $(".jumbotron .container"),
                a = $(window).height() - e.offset().top - e.height();
            a > 0 && !e.hasClass("container-not-offset") && e.css("minHeight", $(window).height() - e.offset().top)
        }(), $(".jumbotron.items .container .index-title div").mouseover(function() {
        $(".jumbotron.items .container .index-title div p").show()
    }).mouseout(function() {
        $(".jumbotron.items .container .index-title div p").hide()
    }), isMobile || $(".head .nav .dropdown").on("click", function(e) {
        if ($(e.target).hasClass("dropdown-toggle")) return !1
    }), $(".head .nav .dropdown").hover(function() {
        var e = $(this);
        e.addClass("open"), e.data("imgshow") || ($.each(e.find("img"), function() {
            var e = $(this);
            e.attr("src", e.attr(".src"))
        }), e.data("imgshow", 1))
    }, function() {
        var e = $(this);
        e.removeClass("open")
    }), r();
    var ee = !1;
    $(document).on("click", ".subscribe-select-box .genre-cancle", function() {
        var e = $(this),
            a = e.parents(".subscribe-select-box");
        a.hide(), $(".vip-b").hide()
    }), $(document).on("click", ".subscribe-container input", function(e) {
        if (ee) return !1;
        var a = $(this),
            t = a.parents("table"),
            n = t.data("type");
        if (a.parent().find("label").hasClass("disabled")) return !1;
        if (t.hasClass("bind")) return ee = !1, bindWechat(t[0]), !1;
        if (1 == n) return t.data("load") || $.ajax({
            type: "GET",
            url: "/account/subscribeFloatHtml",
            dataType: "json",
            success: function(e) {
                1e4 == e.code ? (t.data("load", 1), $(".subscribe-select-box").html(e.html)) : 81004 == e.code ? swal({
                            title: e.title,
                            type: "error",
                            showCancelButton: !0,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.confirm_btn,
                            cancelButtonColor: "#33ba95",
                            cancelButtonText: Lang.certified_btn,
                            html: !0
                        }, function(e) {
                            e || (window.location.href = "/account/setting/type/settingInvestor")
                        }) : swal({
                            title: e.msg,
                            type: "error",
                            confirmButtonText: Lang.confirm_btn
                        })
            }
        }), $(".subscribe-select-box").show(), $(".vip-b").show(), !1;
        var i = t.data("appid"),
            o = t.data("wordid"),
            s = t.data("url"),
            r = t.data("remind"),
            d = {};
        d.remove = a.prop("checked") ? 0 : 1, d.appid = i, d.wordid = o, d.remind = r, d.type = n, ee = !0, $.ajax({
            type: "post",
            url: s,
            data: d,
            complete: function() {
                ee = !1
            },
            success: function(e) {
                if (1e4 == e.code) {
                    if (!d.remove) {
                        var i;
                        if (r ? ("string" == typeof r && r.indexOf(",") != -1 && (r = r.replace(/,/g, ":00, ")), r += ":00") : r = "18:00", window.isMobile) return 4 == n ? i = Lang.wechat_subscribe_tip1 + e.appname + Lang.wechat_subscribe_tip2 : 8 == n || 6 == n || 7 == n || (i = Lang.wechat_subscribe_tip1 + e.appname + Lang.wechat_subscribe_tip3 + (2 == n ? Lang.wechat_subscribe_tip4 : Lang.wechat_subscribe_tip5) + Lang.wechat_subscribe_tip6 + r + Lang.wechat_subscribe_tip7), swal({
                            title: i,
                            type: "success",
                            showCancelButton: !1,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.confirm_btn,
                            cancelButtonText: Lang.cancel_btn
                        }), !1;
                        var o = !! n;
                        1 == n ? i = Lang.wechat_subscribe_tip8 + r + Lang.wechat_subscribe_tip9 : 8 == n ? (i = Lang.wechat_subscribe_tip17, o = !1) : 6 == n ? (i = Lang.wechat_subscribe_tip18, o = !1) : 7 == n ? (i = Lang.wechat_subscribe_tip19, o = !1) : 4 == n ? i = Lang.wechat_subscribe_tip1 + e.appname + Lang.wechat_subscribe_tip10 : 5 == n ? (i = Lang.wechat_subscribe_tip1 + e.appname + Lang.wechat_subscribe_tip11 + r + Lang.wechat_subscribe_tip12, i += "，" + (2 == n ? Lang.wechat_subscribe_tip13 : Lang.wechat_subscribe_tip14) + Lang.wechat_subscribe_tip15) : (i = Lang.wechat_subscribe_tip1 + e.appname + Lang.wechat_subscribe_tip3 + (2 == n ? Lang.wechat_subscribe_tip4 : Lang.wechat_subscribe_tip5) + Lang.wechat_subscribe_tip6 + r + Lang.wechat_subscribe_tip12, i += "，" + (2 == n ? Lang.wechat_subscribe_tip13 : Lang.wechat_subscribe_tip14) + Lang.wechat_subscribe_tip15), swal({
                            title: i,
                            type: "success",
                            showCancelButton: o,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.confirm_btn,
                            cancelButtonColor: "#33ba95",
                            cancelButtonText: Lang.setup
                        }, function(e) {
                            e || (window.location.href = "/account/setting/type/settingSubscribe")
                        })
                    }
                } else 81004 == e.code ? (a.prop("checked", !a.prop("checked")), swal({
                        title: e.title,
                        type: "error",
                        showCancelButton: !0,
                        confirmButtonColor: "#33ba95",
                        confirmButtonText: Lang.certified_btn,
                        cancelButtonColor: "#33ba95",
                        cancelButtonText: Lang.cancel_btn,
                        html: !0
                    }, function(e) {
                        e && window.open("/account/setting/type/settingInvestor")
                    })) : 10109 == e.code ? (a.prop("checked", !1), reminds.addClass("disabled"), t.data("checkurl", e.checkurl), t.data("qrcodeurl", e.qrcodeurl), bindWechat(t[0])) : (a.prop("checked", !a.prop("checked")), swal({
                            title: e.msg,
                            type: "error",
                            showCancelButton: !1,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.confirm_btn,
                            cancelButtonText: Lang.cancel_btn
                        }))
            }
        })
    }), $(document).on("tap", ".subCtrl", function() {
        d(".time", ".subCtrl")
    }), $(document).on("tap", ".subCtrl-1", function() {
        d(".time-1", ".subCtrl-1")
    }), $(document).on("tap", ".subCtrl-2", function() {
        d(".time-2", ".subCtrl-2", ".sub-2-son")
    }), $(document).on("tap", ".subCtrl-10", function() {
        d(".time-10", ".subCtrl-10", ".sub-10-son")
    }), $(document).on("tap", ".subCtrl-3", function() {
        d(".time-3", ".subCtrl-3")
    }), $(document).on("tap", ".subCtrl-4", function() {
        d(".time-4", ".subCtrl-4")
    }), $(document).on("tap", ".subCtrl-5", function() {
        d(".time-5", ".subCtrl-5")
    }), $(document).on("mouseover", ".service .container .our-adv .left", function() {
        c(".service .container .our-adv .box .img-l", "hov-img", ".service .container .our-adv .img-l span", "h-maj")
    }), $(document).on("mouseout", ".service .container .our-adv .left", function() {
        l(".service .container .our-adv .box .img-l", "hov-img", ".service .container .our-adv .img-l span", "h-maj")
    }), $(document).on("mouseover", ".service .container .our-adv .center", function() {
        c(".service .container .our-adv .box .img-c", "hov-img", ".service .container .our-adv .img-c span", "h-effec")
    }), $(document).on("mouseout", ".service .container .our-adv .center", function() {
        l(".service .container .our-adv .box .img-c", "hov-img", ".service .container .our-adv .img-c span", "h-effec")
    }), $(document).on("mouseover", ".service .container .our-adv .right", function() {
        c(".service .container .our-adv .box .img-r", "hov-img", ".service .container .our-adv .img-r span", "h-lock")
    }), $(document).on("mouseout", ".service .container .our-adv .right", function() {
        l(".service .container .our-adv .box .img-r", "hov-img", ".service .container .our-adv .img-r span", "h-lock")
    }), $(".jumbotron.serve.advantage .advantage-info ul li .clearfix").mouseover(function() {
        this.style.background = "#20d9ae", $(this).children("div").children("h4").css("color", "#fff"), $(this).children("div").children("p").css("color", "#fff"), $(this).children("div:first-child").css("background", "#fff"), $(this).children(".l-t").children("span").css("backgroundPosition", "374px -540px"), $(this).children(".r-t").children("span").css("backgroundPosition", "374px -582px"), $(this).children(".l-b").children("span").css("backgroundPosition", "414px -542px"), $(this).children(".r-b").children("span").css("backgroundPosition", "418px -582px")
    }).mouseout(function() {
        this.style.background = "", $(this).children("div").children("h4").css("color", ""), $(this).children("div").children("p").css("color", ""), $(this).children("div:first-child").css("background", "#20d9ae"), $(this).children(".l-t").children("span").css("backgroundPosition", "376px -383px"), $(this).children(".r-t").children("span").css("backgroundPosition", "376px -418px"), $(this).children(".l-b").children("span").css("backgroundPosition", "376px -458px"), $(this).children(".r-b").children("span").css("backgroundPosition", "381px -499px")
    }), $("#serve-search .icon-guanbi").on("click", function() {
        $("#vip-b").hide(), $("#serve-search").removeClass("show")
    }), $("#submit-serve-search").on("click", function() {
        $("#vip-b").show(), $("#serve-search").addClass("show")
    }), $("#serve-search input").on("focus", function() {
        $(this).parents(".input-group").addClass("active").removeClass("error-msg")
    }), $("#serve-search input").on("blur", function() {
        $(this).parents(".input-group").removeClass("active")
    }), $("#serve-search").on("submit", function() {
        var e = $(this),
            a = !0,
            t = e.attr("action"),
            n = {};
        return e.find("input.form-control").each(function() {
            var e = $(this),
                t = e.val();
            t = t.replace(/^\s+/i, ""), t = t.replace(/\s+$/i, ""), t ? "phone" != this.name || /^13[\d]{9}$|^14[0-9]\d{8}|^15[0-9]\d{8}$|^18[0-9]\d{8}$|^17[0-9]\d{8}$/.test(t) || (e.parents(".input-group").addClass("error-msg"), a = !1) : (e.parents(".input-group").addClass("error-msg"), a = !1), a && (n[this.name] = t)
        }), !! a && ($.ajax({
            type: "POST",
            url: t,
            data: n,
            success: function(a) {
                1e4 == a.code ? a.data && a.data.length ? $.each(a.data, function(a, t) {
                            e.find('input.form-control[name="' + a + '"]').parents(".input-group").addClass("error-msg")
                        }) : ($("#vip-b").hide(), $("#serve-search").removeClass("show"), swal({
                            title: a.msg,
                            html: 1
                        })) : swal(a.msg)
            }
        }), !1)
    }), $(document).on("click", ".subscribe-modify-remind input", function(e) {
        if (ee) return !1;
        clearTimeout(hoverTimeout);
        var a = $(this),
            t = a.parents(".subscribe-modify-remind"),
            n = t.data("limit"),
            i = t.data("url"),
            o = t.data("type"),
            s = t.find('input[type="checkbox"]:checked'),
            r = {};
        if (t.hasClass("myapps-empty")) return swal(Lang.you_not_added_application), !1;
        if (a.parent().find("label").hasClass("disabled")) return !1;
        r.remind = [], s.each(function(e, a) {
            r.remind[e] = parseInt($(a).val())
        });
        var d = $("#checkbox-tips").length ? $("#checkbox-tips") : $('<span class="checkbox-tips" id="checkbox-tips"></span>');
        r.type = o, ee = !0, $.ajax({
            type: "POST",
            url: i,
            data: r,
            complete: function() {
                ee = !1
            },
            success: function(e) {
                var i;
                1e4 == e.code ? (i = !a.prop("checked"), d.appendTo(a.parent()), d.html(Lang.already_save).removeClass("hide").addClass("show"), hoverTimeout = setTimeout(function() {
                        d.removeClass("show").addClass("hide")
                    }, 1200), t.parents("table").find(".subscribe-show-remind").html(r.remind.length > 0 ? r.remind.join(":00、") + ":00" : Lang.not_setup)) : (i = a.prop("checked"), swal({
                        title: e.msg,
                        type: "error",
                        showCancelButton: !1,
                        confirmButtonColor: "#33ba95",
                        confirmButtonText: Lang.confirm_btn,
                        cancelButtonText: Lang.cancel_btn
                    })), i ? (a.prop("checked", !1), a.parent().removeClass("aso-checkbox-checked")) : (a.prop("checked", !0), a.parent().addClass("aso-checkbox-checked")), t.find('input[type="checkbox"]:checked').length >= n ? t.find(".aso-checkbox:not(.aso-checkbox-checked) label").addClass("disabled") : t.find(".aso-checkbox:not(.aso-checkbox-checked) label").removeClass("disabled")
            }
        })
    }), $(document).on("click", ".genre-list input", function(e) {
        if (ee) return !1;
        clearTimeout(hoverTimeout);
        var a = $(this),
            t = a.parents(".genre-list"),
            n = t.data("limit"),
            i = t.data("url"),
            o = (t.data("type"), t.find('input[type="checkbox"]:checked')),
            s = {};
        if (a.parent().find("label").hasClass("disabled")) return !1;
        s.genreid = [], o.each(function(e, a) {
            s.genreid[e] = parseInt($(a).val())
        });
        var r = $("#checkbox-tips").length ? $("#checkbox-tips") : $('<span class="checkbox-tips" id="checkbox-tips"></span>');
        ee = !0, $.ajax({
            type: "POST",
            url: i,
            data: s,
            complete: function() {
                ee = !1
            },
            success: function(e) {
                var i;
                1e4 == e.code ? (i = !a.prop("checked"), r.appendTo(a.parent()), r.css({
                        left: a.siblings("label").outerWidth() + 5 + "px",
                        right: 0
                    }).html(Lang.already_save).removeClass("hide").addClass("show"), hoverTimeout = setTimeout(function() {
                        r.removeClass("show").addClass("hide")
                    }, 1200)) : (i = a.prop("checked"), swal({
                        title: e.msg,
                        type: "error",
                        showCancelButton: !1,
                        confirmButtonColor: "#33ba95",
                        confirmButtonText: Lang.confirm_btn
                    })), i ? (a.prop("checked", !1), a.parent().removeClass("aso-checkbox-checked")) : (a.prop("checked", !0), a.parent().addClass("aso-checkbox-checked")), t.find('input[type="checkbox"]:checked').length >= n ? t.find(".aso-checkbox:not(.aso-checkbox-checked) label").addClass("disabled") : t.find(".aso-checkbox:not(.aso-checkbox-checked) label").removeClass("disabled"), t.find('input[type="checkbox"]:checked').length > 0 ? $(".subscribe-container input").prop("checked", !0) : $(".subscribe-container input").prop("checked", !1)
            }
        })
    }), $(document).on("click", ".setting-content .timeingpush", function(e) {
        var a = $(this),
            t = a.parents(".subscribe-list"),
            n = t.data("timepushurl"),
            i = a.data("type");
        modifytype = a.hasClass("remove") ? 1 : 0, $.ajax({
            type: "POST",
            data: {
                type: i,
                modifytype: modifytype
            },
            url: n,
            success: function(e) {
                1e4 == e.code ? a.hasClass("remove") ? a.removeClass("remove").html(Lang.subscribe_btn) : a.addClass("remove").html(Lang.unsubscribe_btn) : 81004 == e.code ? swal({
                            title: e.title,
                            type: "error",
                            showCancelButton: !0,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.certified_btn,
                            cancelButtonColor: "#33ba95",
                            cancelButtonText: Lang.cancel_btn,
                            html: !0
                        }, function(e) {
                            e && window.open("/account/setting/type/settingInvestor")
                        }) : swal({
                            title: e.msg,
                            type: "error",
                            confirmButtonText: Lang.confirm_btn
                        })
            }
        })
    }), $(document).on("click", ".subscribe-modify-apps .subscribe-modify", function(e) {
        if (ee) return !1;
        var a = $(this),
            t = a.parents(".row").data("modifytype"),
            n = a.data("appid"),
            i = a.parents(".subscribe-modify-apps"),
            o = a.parents(".thumbnail"),
            s = i.data("url"),
            r = i.data("type"),
            d = {};
        d["modify-type"] = t, d.type = r, d.app_id = n, ee = !0, o.addClass("subscribe-app-animation"), $.ajax({
            type: "POST",
            url: s,
            data: d,
            complete: function() {
                ee = !1, o.removeClass("subscribe-app-animation")
            },
            success: function(e) {
                if (1e4 == e.code) {
                    var o, s = a.parents(".thumbnail");
                    if ("add" == t ? (s.find(".glyphicon-subscribe-add").removeClass("glyphicon-subscribe-add").addClass("glyphicon-subscribe-remove"), o = i.find(".row[data-modifytype=remove] .col-md-10:last")) : (s.find(".glyphicon-subscribe-remove").removeClass("glyphicon-subscribe-remove").addClass("glyphicon-subscribe-add"), o = i.find(".row[data-modifytype=add] .col-md-10:last")), 4 == r && "add" == t) {
                        var d = $('<div class="col-md-10"></div>');
                        s.appendTo(d), s = d, o = i.find(".row[data-modifytype=remove] .col-md-box")
                    }
                    4 == r && "remove" == t && s.parent().remove(), s.appendTo(o), 3 == r && "add" == t && swal({
                        title: Lang.wechat_subscribe_tip1 + e.appname + Lang.wechat_subscribe_tip16,
                        type: "success",
                        showCancelButton: !0,
                        confirmButtonColor: "#33ba95",
                        confirmButtonText: Lang.added,
                        cancelButtonColor: "#33ba95",
                        cancelButtonText: Lang.go_add
                    }, function(e) {
                        e || window.open("/app/keyword/appid/" + n)
                    });
                    var c = i.find('div.row[data-modifytype="remove"] .thumbnail>img'),
                        l = "";
                    c.length > 0 ? ($.map(c, function(e) {
                            l += '<img src="' + $(e).attr("src") + '" alt="' + $(e).attr("alt") + '">'
                        }), i.find(".unsubscribe-show").removeClass("adjust")) : (l = Lang.not_subscribe_app, i.find(".unsubscribe-show").addClass("adjust")), i.parents("table").find(".subscribe-show-apps").html(l)
                } else swal({
                    title: e.msg,
                    type: "error",
                    showCancelButton: !1,
                    confirmButtonColor: "#33ba95",
                    confirmButtonText: Lang.confirm_btn,
                    cancelButtonText: Lang.cancel_btn
                })
            }
        })
    }), $(document).on("click", ".manage-content-remove .dropdown-menu a", function() {
        if (ee) return !1;
        var e = $(this),
            a = e.html(),
            t = e.parents("ul.dropdown-menu"),
            n = e.parent(),
            i = t.data("paramname"),
            o = e.data("param"),
            s = {},
            r = e.parents(".subscribe-modify-apps").data("fluxurl"),
            d = (e.parents(".subscribe-modify-apps").data("type"), e.parents(".thumbnail").find(".subscribe-modify").data("appid"));
        if (s.app_id = d, s.paramName = i, s.param = o, !r || !d) return !1;
        var c = $("#checkbox-tips").length ? $("#checkbox-tips") : $('<span class="checkbox-tips" id="checkbox-tips"></span>');
        ee = !0, $.ajax({
            type: "POST",
            url: r,
            data: s,
            complete: function() {
                ee = !1
            },
            success: function(i) {
                1e4 == i.code ? (t.siblings("a").find(".name").html(a), n.addClass("active").siblings().removeClass("active"), c.appendTo(e.parents(".aso100-nav-select").find(".nav:last")), c.html(Lang.already_save).addClass("show")) : swal({
                        title: i.msg,
                        type: "error",
                        showCancelButton: !1,
                        confirmButtonColor: "#33ba95",
                        confirmButtonText: Lang.confirm_btn,
                        cancelButtonText: Lang.cancel_btn
                    })
            }
        })
    }), $(document).on("click", ".subscribe-keyword a", function(e) {
        if (ee) return !1;
        var a = $(this),
            t = a.data("wordid"),
            n = a.parents(".subscribe-keyword"),
            i = n.data("url");
        ee = !0, $.ajax({
            url: i,
            type: "POST",
            data: {
                wordid: t,
                remove: 1
            },
            success: function(e) {
                ee = !1, 1e4 == e.code ? a.remove() : swal({
                        title: e.msg,
                        type: "error",
                        showCancelButton: !1,
                        confirmButtonColor: "#33ba95",
                        confirmButtonText: Lang.confirm_btn
                    })
            }
        })
    }), $(document).on("click", ".subscribe-guid .checkbox-list input", function(e) {
        var a = $(this),
            t = a.parents(".checkbox-list"),
            n = t.data("limit");
        return !a.parent().find("label").hasClass("disabled") && (a.prop("checked") ? (a.prop("checked", !0), a.parent().addClass("aso-checkbox-checked")) : (a.prop("checked", !1), a.parent().removeClass("aso-checkbox-checked")), void(t.find('input[type="checkbox"]:checked').length >= n ? t.find(".aso-checkbox:not(.aso-checkbox-checked) label").addClass("disabled") : t.find(".aso-checkbox:not(.aso-checkbox-checked) label").removeClass("disabled")))
    });
    var ae = function(e, a, t, n, i) {
        t = t || 1, e && $.ajax({
            type: "GET",
            url: e,
            data: {
                search: a,
                page: t
            },
            dataType: "JSON",
            success: function(e) {
                if (n.find(".spinner-bg").hide(), ee = !1, 1e4 == e.code) {
                    var o = e.offset + 1,
                        s = "";
                    if (n.find(".search-title").html("「" + a + "」 搜索结果：").removeClass("hide"), e.max > 0) {
                        var r;
                        r = e.type && "keyword" == e.type ? '<div class="media"><div class="media-body"><h4 class="media-heading">##KEYWORD##</h4></div><div class="media-right"><button class="btn btn-default " data-wordid="##WORDID##">关注</button></div></div>' : '<div class="media"><div class="media-left media-middle"><img class="media-object" src="##ICON##"></div><div class="media-body"><h4 class="media-heading">##OFFSET##.##APPNAME##</h4><div class="media-auther">##PUBLISHER##</div><div class="media-info"><span class="media-info-category">##GENRE##</span>##IPHONE####IPAD##</div></div><div class="media-right"><button class="btn btn-default" data-appid="##APPID##">关注</button></div></div>', $.map(e.list, function(e, a) {
                            var t;
                            t = r.replace("##ICON##", e.icon).replace("##OFFSET##", o++).replace("##APPNAME##", e.app_name).replace("##PUBLISHER##", e.publisher).replace("##GENRE##", e.genre).replace("##APPID##", e.app_id), e.isphone && (t = t.replace("##IPHONE##", '<span class="media-info-phone media-info-iphone">iPhone</span>')), e.ispad && (t = t.replace("##IPAD##", '<span class="media-info-phone media-info-ipad">iPad</span>')), t = t.replace("##KEYWORD##", e[0]).replace("##WORDID##", e[3]), t = t.replace(/##\w+##/g, ""), s += t
                        }), n.find(".app-list").html(s).removeClass("hide"), "undefined" != typeof i ? (1 == i && t > 1 && n.find(".search-page").removeClass("hide").find(".prev").removeClass("hide"), 1 == i && t == e.max && n.find(".search-page").removeClass("hide").find(".next").addClass("hide"), 0 == i && 1 == t && n.find(".search-page").removeClass("hide").find(".prev").addClass("hide")) : e.max > 1 ? n.find(".search-page").data("page", t).data("search", a).removeClass("hide").find(".next").removeClass("hide").end().find(".prev").addClass("hide") : n.find(".search-page").addClass("hide").find("div").addClass("hide")
                    } else s = '<p class="text-center">' + Lang.no_data_1 + "</p>", n.find(".app-list").html(s).removeClass("hide"), n.find(".search-page").addClass("hide").find("div").addClass("hide")
                } else swal({
                    title: e.msg,
                    type: "warning",
                    confirmButtonText: Lang.confirm_btn
                })
            }
        })
    };
    $(document).on("submit", ".subscribe-guid .navbar-form", function(e) {
        if (preventDefault(e), ee) return !1;
        var a = $(this),
            t = a.attr("action"),
            n = a.find("input").val(),
            i = a.parents(".subscribe-list");
        n && (ee = !0, i.find(".spinner-bg").show().end().find(".spinner").show(), ae(t, n, 1, i))
    }), $(document).on("click", ".subscribe-guid .search-page .next, .subscribe-guid .search-page .prev", function(e) {
        if (preventDefault(e), ee) return !1;
        var a = $(this),
            t = a.hasClass("next") ? 1 : 0,
            n = a.parents(".subscribe-list"),
            i = n.find("form.navbar-form"),
            o = a.parents(".search-page"),
            s = o.data("search"),
            r = o.data("page") || 1,
            d = i.attr("action");
        s && (ee = !0, 1 == t ? r++ : (r--, r <= 0 && (r = 1)), o.data("page", r), n.find(".spinner-bg").show().end().find(".spinner").show(), ae(d, s, r, n, t))
    }), $(document).on("click", ".subscribe-guid .subscribe-list.app .app-list .btn", function(e) {
        preventDefault(e);
        var a = $(this),
            t = a.parents(".media"),
            n = a.parents(".subscribe-list");
        if (a.hasClass("disabled")) return !1;
        var i, o = t.find(".media-left img").attr("src"),
            s = t.find(".media-heading").html().replace(/^\d+\./i, ""),
            r = a.data("appid");
        $.get("/account/addMyFavorite/platform/0/appid/" + r, function(e) {
            if (1e4 == e.code) {
                i = '<div class="thumbnail"><img src="' + o + '" alt="' + s + '"><div class="caption"><p>' + s + '</p></div><div class="subscribe-modify"><span class="glyphicon-subscribe-remove"></span></div><input type="hidden" name="app" value="' + r + '"></div>';
                var t = n.find(".row");
                n.find("table").hasClass("hide") && (n.find("table").removeClass("hide"), 0 == t.find(".col-md-2").length && t.append('<div class="col-md-2">' + Lang.followed + '：</div><div class="col-md-10"></div>'));
                var d = t.find(".col-md-10");
                d.append($(i)), a.addClass("disabled").html(Lang.followed)
            } else swal({
                title: e.msg,
                type: "error",
                confirmButtonText: Lang.confirm_btn
            })
        })
    }), $(document).on("click", ".subscribe-guid .subscribe-modify", function(e) {
        var a = $(this),
            t = a.parents(".col-md-10"),
            n = a.next("input").val(),
            i = a.parents(".subscribe-list");
        i.find(".btn[data-appid=" + n + "]").removeClass("disabled").html("关注"), a.parents(".thumbnail").remove(), t.children().length <= 0 && t.parents(".table").addClass("hide")
    }), $(document).on("click", ".subscribe-guid .subscribe-list.keyword .table .btn", function(e) {
        var a = $(this),
            t = a.parents(".col-md-10"),
            n = a.find("input").val(),
            i = a.parents(".subscribe-list");
        i.find(".btn[data-wordid=" + n + "]").removeClass("disabled").html("关注"), a.remove(), t.children().length <= 0 && t.parents(".table").addClass("hide")
    }), $(document).on("click", ".subscribe-guid .subscribe-list.keyword .app-list .btn", function(e) {
        preventDefault(e);
        var a = $(this),
            t = a.parents(".media"),
            n = a.parents(".subscribe-list");
        if (a.hasClass("disabled")) return !1;
        var i, o = t.find(".media-heading").html().replace(/^\d+\./i, ""),
            s = a.data("wordid");
        i = '<a href="javascript:;" class="btn">' + o + '<span class="glyphicon-subscribe-remove-g"></span><input type="hidden" name="keyword" value="' + s + '"></a>';
        var r = n.find(".row");
        n.find("table").hasClass("hide") && (n.find("table").removeClass("hide"), 0 == r.find(".col-md-2").length && r.append('<div class="col-md-2">' + Lang.followed + '</div><div class="col-md-10"></div>'));
        var d = r.find(".col-md-10");
        d.append($(i)), a.addClass("disabled").html(Lang.followed)
    }), $(document).on("click", ".subscribe-guid > .submit", function() {
        var e = $(".subscribe-guid"),
            a = e.find("form.submit"),
            t = {};
        $.map(a, function(e, a) {
            if (e = $(e), 1 !== e.length) return !1;
            var n = ["submit", "button"],
                i = [];
            e.find("input").each(function() {
                var a = $(this),
                    o = a.attr("name"),
                    s = a.attr("type"),
                    r = this.nodeName.toLowerCase();
                if (!(n.indexOf(s) >= 0) && !(i.indexOf(o) >= 0) && o) if ("select" === r && a.prop("multiple")) i.push(o), t[o] = [], e.find('select[name="' + o + '"] option').each(function() {
                    this.selected && t[o].push(this.value)
                });
                else switch (s) {
                        case "checkbox":
                            i.push(o), t[o] = [], e.find('input[name="' + o + '"]').each(function() {
                                this.checked && t[o].push(this.value)
                            });
                            break;
                        case "radio":
                            i.push(o), e.find('input[name="' + o + '"]').each(function() {
                                this.checked && (t[o] = this.value)
                            });
                            break;
                        default:
                            t[o] || (t[o] = []), t[o].push(a.val())
                    }
            })
        }), $.ajax({
            type: "POST",
            url: "/account/guidSubmit",
            data: t,
            success: function(e) {
                1e4 == e.code && (window.location.href = "/account/setting/type/settingSubscribe")
            }
        })
    });
    var te = $(".jumbotron.index");
    if (te.length > 0) {
        if (window.isMobile) {
            var ne = $(window).height() - $(".footer").outerHeight() - te.offset().top;
            te.css({
                height: ne + "px",
                backgroundPosition: "0 0"
            }), $("#search-kw").removeClass("search-su")
        } else if ($("#search-kw").focus(), "function" == typeof CountUp) {
            var ie = {
                    useEasing: !0,
                    useGrouping: !0,
                    separator: ",",
                    decimal: ".",
                    prefix: "",
                    suffix: ""
                },
                oe = new CountUp("index_num_app", 1, 4257598, 0, 1.5, ie),
                se = new CountUp("index_num_keyword", 1, 1054898, 0, 1.5, ie),
                de = new CountUp("index_num_rank", 1, 1046145, 0, 1.5, ie);
            oe.start(), se.start(), de.start()
        }
        $(window).scroll(function() {
            var e = $(this).scrollTop();
            return !window.isMobile && void(e > 380 ? $(".navbar").removeClass("no-background index-nav").addClass("animation").css("top", 0) : ($(".navbar").removeClass("animation").addClass("no-background index-nav"), $(".navbar").css("top", "-" + e + "px")))
        })
    }
    $(".cascade").hover(function(e) {
        var a = $(this);
        hoverTimeout = setTimeout(function() {
            a.find(".cascade-menu").show()
        }, 200)
    }, function(e) {
        clearTimeout(hoverTimeout);
        var a = $(this);
        a.find(".cascade-menu").hide()
    }), $(document).on("tap", ".mobile-nav-search", function(e) {
        preventDefault(e);
        var a = $(".mobile-nav-search-form").addClass("active").find('form input[name="search"]');
        return a.focus().val(a.val()), !1
    }), $(document).on("tap", ".mobile-nav-search-form > .btn", function(e) {
        return preventDefault(e), $(".mobile-nav-search-form").removeClass("active").find('form input[name="search"]').blur(), !1
    }), $(document).on("focus", ".mobile-nav-search-form", function() {
        $(window).scrollTop(0), window.isWechat && window.isIOS && $(".head.navbar.fixed").addClass("fixfixed")
    }), $(document).on("blur", ".mobile-nav-search-form", function() {
        window.isWechat && window.isIOS && $(".head.navbar.fixed").removeClass("fixfixed")
    }), $(document).on("touchmove", ".with-panel-left-reveal", function(e) {}), $(document).on("touchmove", ".panel-overlay", function(e) {
        return preventDefault(e), !1
    }), $(document).on("tap", ".show-panel", function(e) {
        if ($.allowPanelOpen) {
            var a = $("body");
            return a.hasClass("with-panel-left-reveal") ? $.closePanel() : $.openPanel(), !1
        }
    }), $.allowPanelOpen = !0, $.openPanel = function(e) {
        function a() {
            i.transitionEnd(function(t) {
                t.target === i[0] ? (e.hasClass("active") ? e.trigger("opened") : e.trigger("closed"), $.allowPanelOpen = !0) : a()
            })
        }
        if (!$.allowPanelOpen) return !1;
        "left" !== e && "right" !== e || (e = ".panel-" + e), e = e ? $(e) : $(".panel").eq(0), e.height(window.innerHeight);
        var t = e.hasClass("panel-right") ? "right" : "left";
        if (0 === e.length || e.hasClass("active")) return !1;
        $.closePanel(), $.allowPanelOpen = !1;
        var n = e.hasClass("panel-reveal") ? "reveal" : "cover";
        e.css({
            display: "block"
        }).addClass("active"), e.trigger("open");
        var i = (e[0].clientLeft, $(".jumbotron"));
        a(), $(document.body).addClass("with-panel-" + t + "-" + n);
        parseInt($(".panel-reveal").css("height")), parseInt($(".navbar-wenda").css("height"));
        return !0
    }, $.closePanel = function() {
        var e = $(".panel.active");
        if (0 === e.length) return !1;
        var a = e.hasClass("panel-reveal") ? "reveal" : "cover",
            t = e.hasClass("panel-left") ? "left" : "right";
        e.removeClass("active"), e.trigger("close"), $.allowPanelOpen = !1;
        var n = $(".jumbotron");
        n.transitionEnd(function(a) {
            e.hasClass("active") || (e.css({
                display: ""
            }), e.trigger("closed"), $("body").removeClass("panel-closing"), $.allowPanelOpen = !0)
        }), $("body").addClass("panel-closing").removeClass("with-panel-" + t + "-" + a)
    }, $.fn.transitionEnd = function(e) {
        return __dealCssEvent.call(this, ["webkitTransitionEnd", "transitionend"], e), this
    }, $(document).on("tap", ".close-panel, .panel-overlay", function(e) {
        $.closePanel()
    }), $(document).on("click", ".review-icon", function(e) {
        var a = $(this),
            t = $(".reviews-items .reviews-item"),
            n = $(".reviews-items .reviews-item.active").index();
        a.hasClass("prev-review") ? (n <= 0 && (n = t.length), n -= 1) : n >= t.length - 1 ? n = 0 : n += 1, $(".reviews-items .reviews-item:eq(" + n + ")").addClass("active").siblings().removeClass("active")
    }), $(".hot-search .navbar-form").on("submit", function(e) {
        preventDefault(e);
        var a = $(this),
            t = a.attr("action"),
            n = a.find("input");
        $.each(n, function(e, a) {
            var n = $(this).attr("name"),
                i = $(this).val();
            t += "/" + n + "/" + i
        }), window.location.href = t
    });
    var ce = null,
        le = null;
    $(".hot-search-list td.text-left > div").hover(function() {
        var e, a = $(this),
            t = a.find(".appname").text(),
            n = a.parents("table").data("url"),
            i = a.parents("tr").data("time"),
            o = "",
            s = "",
            r = "",
            d = 1,
            c = a.find(".hotsearch-word-apps");
        clearTimeout(le), $(".hotsearch-word-apps").hide(), ce = setTimeout(function() {
            0 == c.html() ? $.ajax({
                    type: "get",
                    url: n + "/word/" + t + "/time/" + i,
                    success: function(t) {
                        o = '<h4 class="title-second"><span></span>' + Lang.hotsearch_word_apps + '<div class="timestr"> (' + i + ") </div></h4>", t && 1e4 == t.code && (t.data ? (o += "<ul>", $.each(t.data, function(e, a) {
                                s = a.app_name, r = a.icon || a.artwork_s, o += '<li><a href="/app/rank/appid/' + a.app_id + '" target="_blank"><div class="img"><img src="' + r + '" /><div class="triangle-tr-box"><div class="triangle-tr"></div></div><span class="num">' + d + "</span></div><p>" + s + "</p></a></li>", d++
                            }), o += "</ul>") : o += '<p class="no-result">' + Lang.hotsearch_word_apps_no_result + "</p>", o += '<div class="triangle-bak"><div class="triangle-b"></div></div>', c.html(o), e = parseInt(c.css("left")) + (a.width() - 6) / 2, c.css("left", e + "px"), $(".hotsearch-word-apps").hide(), c.show())
                    }
                }) : c.show()
        }, 300)
    }, function() {
        clearTimeout(ce);
        var e = $(this);
        le = setTimeout(function() {
            e.find(".hotsearch-word-apps").hide()
        }, 300)
    }), footerFixed(), isMobile && mobileGotop(), $('[data-toggle="tooltip"]').tooltip({
        delay: {
            show: 50,
            hide: 100
        }
    }), $(".tip-area").click(function() {
        $('[data-toggle="tooltip"]').tooltip("toggle")
    }), window.chartData = {}, window.hasDataIdStr = "", window.currentKeywordid = [], window.isKeywordShowHour = 0, window.keywordShowHourTab = {}, $("img.lazy").lazyload();
    var pe = $(".activity-beta-box");
    if (pe.length) {
        var ue = +new Date,
            he = 0,
            me = !0,
            fe = pe.data("name") || "";
        index = pe.data("index") || 0, fe && (he = parseInt($.cookie(fe) || 0), me = he < ue + 1314e6 && he < ue);
        var ge = function() {
            var e = function() {
                    var e = pe.data("edate");
                    if (e) e = new Date(e);
                    else {
                        var e = new Date;
                        e.setTime(e.getTime() + 2592e6)
                    }
                    $.cookie(fe, +e, {
                        path: "/",
                        expires: e
                    })
                },
                a = function(e) {
                    return e < 10 ? "0" + e : e
                };
            setTimeout(function() {
                pe.removeClass("hide").show().addClass("show")
            }, 0), pe.on("click", ".activity-beta-nonotice, .activity-beta-button, .activity-beta-button-circle", function() {
                var a = $(this);
                a.hasClass("no-close") || $("body,html").animate({
                    scrollTop: 0
                }, 300, function() {
                    return 0 === parseInt(pe.find(".activity-beta-content").css("top")) && (pe.css({
                            opacity: 1
                        }).addClass("activity-hide activity-hide-" + index), $(".activity-beta-open").show().addClass("activity-show"), e(), void setTimeout(function() {
                            pe.hide().removeClass("show")
                        }, 700))
                })
            });
            var t, n = new Date;
            t = n.getFullYear() + "-" + a(n.getMonth() + 1) + "-" + a(n.getDate()) + " 23:59:59", t = moment(t).valueOf(), n.setTime(n.getTime() + 864e5), $.cookie(fe, t, {
                path: "/",
                expires: n
            })
        };
        if (me) {
            var be = $(".activity-beta-content > img");
            be.length ? (be = be[0], be.complete || be.width ? ge() : be.onload = function() {
                        ge()
                    }) : ge()
        }
    }
    var ve = $(".date-range-picker");
    ve.length > 0 && ve.map(function(e, a) {
        datePicker($(a))
    });
    var we = $("#rank-list-more");
    if (we.length > 0) {
        var $e = !1;
        we.find(".btn-default").on("click", function() {
            if ($e) return !1;
            var e, a, t, n, i, o, s = we,
                r = $(this),
                d = r.data("nomodifyhtml") || 0;
            return i = s.find(".spinner"), o = s.find(".btn-default"), n = s.data("url"), e = s.data("page"), t = s.data("size"), a = s.data("maxpage"), !(e > a) && (o.hide(), i.show(), $e = !0, void $.ajax({
                type: "get",
                url: n + (n.indexOf("?") == -1 ? "?" : "&") + "page=" + e,
                dataType: "html",
                success: function(n) {
                    return e++, s.data("page", e), $e = !1, $(".rank-list").append(n), $("img.lazy").lazyload(), e > a ? (s.remove(), !1) : (!d && s.find(".btn-default > span:eq(0)").html(Lang.show + ((e - 1) * t + 1) + " - " + e * t + Lang.staff), o.show(), void i.hide())
                }
            }))
        })
    }
    $(document).on("click", ".dropdown-menu.open a", function(e) {
        var a, t, n, i = $(this),
            o = i.parents("ul.dropdown-menu"),
            s = o.data("refresh") || 0,
            r = o.data("paramname"),
            d = o.data("cparam"),
            c = i.data("param"),
            l = new RegExp(r + "/" + d, "i");
        a = document.location.pathname, a.split("/").length < 3 && (a += "/index"), t = a.match(l), t ? a = a.replace(t, r + "/" + c) : a += "/" + r + "/" + c, n = window.location.protocol + "//" + window.location.hostname + a, s ? pjaxLoad(n) : window.location.href = n
    }), $(document).on("click", "#charts-ajax-data .dropdown-menu a,.charts-ajax-data .dropdown-menu a,#competi-search .dropdown-menu a", function() {
        var e = $(this),
            a = e.html(),
            t = e.parents("ul.dropdown-menu"),
            n = t.data("open") || 0,
            i = t.data("refresh") || 0,
            o = t.data("usually") || 0,
            s = e.parent(),
            r = t.data("paramname"),
            d = e.data("param"),
            c = e.parents(".charts-ajax-data").length ? e.parents(".charts-ajax-data") : e.parents("#charts-ajax-data"),
            l = c.data("ajaxurl"),
            p = c.data("thisurl"),
            u = c.data("querydata") || {};
        c.data("run");
        if (window.searchType = console.log(e.parents("ul").data("paramname")), window.chartData.title = c.data("title"), "string" == typeof u && (u = JSON.parse(u)), u[r] = d, c.data("querydata", JSON.stringify(u)), n) {
            if (!p) return !1;
            var h = "/";
            for (var m in u) h += m + "/" + u[m] + "/";
            if (h = h.slice(0, -1), i) {
                var f = p + h;
                return pjaxLoad(f), !1
            }
            location.href = p + h
        } else if (o) t.siblings("a").find(".name").html(a), s.addClass("active").siblings().removeClass("active"), $("#competi-search").submit();
        else {
            if (!l) return !1;
            t.siblings("a").find(".name").html(a), s.addClass("active").siblings().removeClass("active");
            var g = $("#searchHintsUrl");
            if (g.length > 0) {
                var f = g.attr("href");
                $.map(u, function(e, a) {
                    var t = new RegExp(a + "\\/\\w+", "i");
                    t = f.match(t), t && (f = f.replace(t, a + "/" + e))
                }), g.attr("href", f)
            }
            $("#hotDraw").length ? hotSearchDrawAction(l, u) : $(".invest-data-center").length ? ajaxRequestAction(e, y, u, l) : getChartsData(l, u)
        }
    });
    var ye = $("#charts-ajax-data");
    if (ye.length) {
        var xe = ye.data("ajaxurl"),
            ke = (ye.data("thisurl"), ye.data("querydata") || {}),
            Ce = parseInt(ye.data("run"));
        window.chartData.title = ye.data("title"), xe && 0 !== Ce && ($("#hotDraw").length > 0 ? hotSearchDrawAction(xe, ke) : getChartsData(xe, ke))
    }
    var _e = $("#charts2-ajax-data");
    if (_e.length) {
        var xe = _e.data("ajaxurl"),
            ke = (_e.data("thisurl"), _e.data("querydata") || {}),
            Ce = parseInt(_e.data("run"));
        window.chartData.title = _e.data("title"), xe && 0 !== Ce && ($("#hotDraw").length > 0 ? hotSearchDrawAction(xe, ke) : getChartsData(xe, ke, $("#charts2")))
    }
    $(document).on("loadData", "#global-maps-charts-nav", function() {
        var e = $("#global-maps-charts"),
            a = $("#global-maps-charts-nav");
        $.ajax({
            type: "get",
            url: a.data("ajaxurl"),
            data: {
                device: a.find(".active").data("device")
            },
            dataType: "json",
            success: function(t) {
                $("#container").find(".spinner-bg").hide(), a.find(".active").data("data", JSON.stringify(t)), Le(e, t), Se($("#app-global-rank-list").find(".table"), t)
            }
        })
    }), $("#global-maps-charts-nav").trigger("loadData"), $(document).on("click", "#global-maps-charts-nav .device .tab", function() {
        var e = $(this),
            a = e.data("data") || "",
            t = $("#global-maps-charts"),
            n = $("#global-maps-charts-nav");
        $("#app-global-rank-list");
        e.siblings(".tab").removeClass("active"), e.addClass("active"), $("#global-maps-charts-switch").remove(), a ? (a = JSON.parse(a), Le(t, a)) : ($("#container .global-maps-charts-box").find(".spinner-bg").show(), $.ajax({
                type: "get",
                url: n.data("ajaxurl"),
                data: {
                    device: e.data("device")
                },
                dataType: "json",
                success: function(a) {
                    $("#container .global-maps-charts-box").find(".spinner-bg").hide(), e.data("data", JSON.stringify(a)), Le(t, a)
                }
            }))
    }), $(document).on("click", "#global-maps-charts-switch a", function() {
        var e = $(this);
        e.siblings(".tab").removeClass("active"), e.addClass("active");
        var a = $("#global-maps-charts"),
            t = $("#global-maps-charts-nav .device"),
            n = e.data("genreid"),
            i = t.find(".active").data("data");
        return i = JSON.parse(i), Le(a, i, n), !1
    }), $(document).on("click", "#global-maps-table-nav .device .tab", function() {
        var e = $(this),
            a = e.data("device"),
            t = ($("#global-maps-charts"), $("#global-maps-charts-nav")),
            n = t.find('.device .tab[data-device="' + a + '"]').data("data") || "",
            i = $("#app-global-rank-list");
        e.siblings(".tab").removeClass("active"), e.addClass("active"), n.length ? (n = JSON.parse(n), Se(i.find(".table"), n)) : ($("#container .global-maps-table-box").find(".spinner-bg").show(), $.ajax({
                type: "get",
                url: t.data("ajaxurl"),
                data: {
                    device: a
                },
                dataType: "json",
                success: function(e) {
                    $("#container .global-maps-table-box").find(".spinner-bg").hide(), t.find('.device .tab[data-device="' + a + '"]').data("data", JSON.stringify(e)), Se($("#app-global-rank-list").find(".table"), e)
                }
            }))
    });
    var Le = function(e, a, t) {
            var n = [],
                i = [{
                    index: 1,
                    min: 1,
                    max: 1,
                    color: "#00a686"
                }, {
                    index: 2,
                    min: 2,
                    max: 10,
                    color: "#0bb998"
                }, {
                    index: 3,
                    min: 11,
                    max: 20,
                    color: "#13c5a3"
                }, {
                    index: 4,
                    min: 21,
                    max: 50,
                    color: "#26cbab"
                }, {
                    index: 5,
                    min: 51,
                    max: 100,
                    color: "#41d8ba"
                }, {
                    index: 6,
                    min: 101,
                    max: 200,
                    color: "#4dddc0"
                }, {
                    index: 7,
                    min: 201,
                    max: 500,
                    color: "#7fe2ce"
                }, {
                    index: 8,
                    min: 501,
                    max: 1e3,
                    color: "#9feadb"
                }, {
                    index: 9,
                    min: 1001,
                    max: 1500,
                    color: "#c1f1e7"
                }];
            t = t ? t : a.genreid;
            var o = "";
            $.each(a.list, function() {
                var e = this.list[t] ? this.list[t] : {};
                o || (o = e.genre), this.code = this.code.replace("VI", "VG"), n.push({
                    code: this.code,
                    sname: this.name,
                    flag: this.code.toLowerCase(),
                    value: e.ranking ? e.ranking : null
                })
            }), $.each(n, function() {
                this.genre = o;
                var e = this.value,
                    a = this.code,
                    t = this.sname;
                $.each(i, function() {
                    if (e >= this.min && e <= this.max) return this.country || (this.country = []), void this.country.push({
                        code: a,
                        name: t
                    })
                })
            }), Te($("#app-global-rank-overview-list").find("table"), i);
            var s = $("#charts-appname").val() || "";
            s += " " + Lang.app_rankinfo_globalRank_title;
            var r = _exportingConfig(s);
            e.highcharts("Map", {
                chart: {
                    marginRight: 1,
                    backgroundColor: "",
                    events: {
                        load: function() {
                            if (e.append('<div class="float-logo"></div>'), !$("#global-maps-charts-nav .genre").length) {
                                var n = "",
                                    i = "";
                                n += '<div class="label-group genre" id="global-maps-charts-switch">', n += "<span>" + Lang.globalRank_nav_genre + ":</span>";
                                for (var o in a.genrelist) i = o == t ? "active" : "", n += '<a href="javascript:void(0);" class="tab ' + i + '" data-genreid="' + o + '">' + a.genrelist[o] + "</a>";
                                n += "</div>", $("#global-maps-charts-nav").append(n)
                            }
                        }
                    }
                },
                credits: _credits(!1),
                title: {
                    text: s
                },
                legend: {
                    layout: "vertical",
                    align: "left",
                    verticalAlign: "bottom",
                    floating: !0,
                    valueDecimals: 0,
                    symbolRadius: 0,
                    symbolHeight: 160,
                    symbolWidth: 10
                },
                exporting: r,
                mapNavigation: {
                    enabled: !0,
                    enableMouseWheelZoom: !1,
                    enableDoubleClickZoomTo: !0
                },
                colorAxis: {
                    min: 1,
                    max: 1500,
                    stops: [
                        [1 / 1500, "#00a686"],
                        [10 / 1500, "#0bb998"],
                        [20 / 1500, "#13c5a3"],
                        [50 / 1500, "#26cbab"],
                        [100 / 1500, "#41d8ba"],
                        [200 / 1500, "#4dddc0"],
                        [500 / 1500, "#7fe2ce"],
                        [1e3 / 1500, "#9feadb"],
                        [1, "#c1f1e7"]
                    ],
                    labels: {
                        enabled: !0,
                        formatter: function() {
                            return 0 === this.value ? "1" : this.value
                        }
                    }
                },
                tooltip: {
                    useHTML: !0,
                    formatter: function() {
                        var e = "";
                        return e += "<table><tr>", e += '<td style="padding: 0 2px;"><span style="top: 2px;" class="icon-flag icon-flag-' + this.point.flag + '"></span></td>', e += '<td style="padding-right: 10px;"><span>' + this.point.sname + "</span></td>", e += "<td>" + this.point.genre + "-" + this.point.value + "</td>", e += "</tr></table>"
                    }
                },
                series: [{
                    data: n,
                    mapData: Highcharts.maps["custom/world"],
                    joinBy: ["iso-a2", "code"],
                    borderColor: "#cccccc",
                    borderWidth: .2,
                    nullColor: "#eeeeee",
                    states: {
                        hover: {
                            color: "#a4edba"
                        }
                    }
                }]
            })
        },
        Te = function(e, a) {
            var t = e,
                n = [];
            if (!t) return !1;
            $.each(a, function() {
                var e = [];
                e.push('<span class="show-color" style="background-color: ' + this.color + ';"></span>' + (this.min == this.max ? this.min : this.min + " - " + this.max));
                var a = "";
                this.country && this.country.length && $.each(this.country, function() {
                    a += '<span class="icon-flag icon-flag-' + this.code.toLowerCase() + '" data-toggle="tooltip" title="' + this.name + '"></span>'
                }), e.push(a);
                var t = 0;
                this.country && this.country.length && (t = this.country.length), e.push(t), e.push(this.index), n.push(e)
            });
            var i = [];
            i.push({
                orderable: !1,
                data: function(e, a, t, n) {
                    return "sort" == a ? e[3] : e[0]
                },
                targets: 0
            }), i.push({
                orderable: !1,
                targets: 1
            }), i.push({
                orderable: !1,
                targets: 2
            }), t.hasClass("dataTable") && t.DataTable().clear(), t.DataTable({
                destroy: !0,
                data: n,
                lengthMenu: [30],
                lengthChange: !1,
                searching: !1,
                autoWidth: !1,
                paging: !1,
                columnDefs: i,
                initComplete: function() {
                    t.find('[data-toggle="tooltip"]').tooltip({
                        delay: {
                            show: 100,
                            hide: 100
                        }
                    })
                },
                language: {
                    sProcessing: Lang.dataTables_sProcessing,
                    sLengthMenu: Lang.dataTables_sLengthMenu,
                    sZeroRecords: Lang.dataTables_sZeroRecords,
                    sInfo: "",
                    sInfoEmpty: Lang.dataTables_sInfoEmpty,
                    sInfoFiltered: Lang.dataTables_sInfoFiltered,
                    sInfoPostFix: "",
                    sSearch: Lang.dataTables_sSearch,
                    sUrl: "",
                    sEmptyTable: Lang.dataTables_sEmptyTable,
                    sLoadingRecords: Lang.dataTables_sLoadingRecords,
                    sInfoThousands: ",",
                    oPaginate: {
                        sFirst: Lang.dataTables_sFirst,
                        sPrevious: "<",
                        sNext: ">",
                        sLast: Lang.dataTables_sLast
                    },
                    oAria: {
                        sSortAscending: Lang.dataTables_sSortAscending,
                        sSortDescending: Lang.dataTables_sSortDescending
                    }
                }
            })
        },
        Se = function(e, a) {
            var t = e,
                n = [];
            if (!t) return !1;
            var i = {},
                o = "";
            $.each(a.list, function(e) {
                var t = [];
                t.push(this.name + "--" + this.code.toLowerCase() + "--" + e);
                for (var o in a.genrelist) {
                    var s = this.list[o] ? this.list[o] : {};
                    s.genre && (i[o] = s.genre + "(" + s.brand + ")");
                    var r = s.ranking ? s.ranking : "0";
                    t.push(r)
                }
                n.push(t)
            }), i[36] || (i[36] = a.genrelist[36]), o += '<th class="col-md-' + (window.isMobile ? 2 : 4) + '">' + Lang.globalRank_overview_table_th1 + "</th>";
            for (var s in a.genrelist) o += "<th>" + i[s] + "</th>";
            t.find("thead .large").html(o), t.hasClass("dataTable") && t.DataTable().clear();
            var r = [];
            $.each(n[0], function(e) {
                r.push({
                    orderable: !1,
                    data: function(a, t, n, i) {
                        var o = a[e];
                        return 0 == e ? (o = o.split("--"), "sort" == t ? o[2] : '<span class="icon-flag icon-flag-' + o[1] + '"></span>' + o[0]) : "sort" == t ? 0 == a[e] ? 9999 : a[e] : 0 == a[e] ? "-" : a[e]
                    },
                    targets: e
                })
            }), t.DataTable({
                destroy: !0,
                data: n,
                lengthMenu: [30],
                lengthChange: !1,
                searching: !1,
                autoWidth: !1,
                columnDefs: r,
                initComplete: function() {
                    t.find('[data-toggle="tooltip"]').tooltip({
                        delay: {
                            show: 100,
                            hide: 100
                        }
                    })
                },
                language: {
                    sProcessing: Lang.dataTables_sProcessing,
                    sLengthMenu: Lang.dataTables_sLengthMenu,
                    sZeroRecords: Lang.dataTables_sZeroRecords,
                    sInfo: Lang.dataTables_sInfo,
                    sInfoEmpty: Lang.dataTables_sInfoEmpty,
                    sInfoFiltered: Lang.dataTables_sInfoFiltered,
                    sInfoPostFix: "",
                    sSearch: Lang.dataTables_sSearch,
                    sUrl: "",
                    sEmptyTable: Lang.dataTables_sEmptyTable,
                    sLoadingRecords: Lang.dataTables_sLoadingRecords,
                    sInfoThousands: ",",
                    oPaginate: {
                        sFirst: Lang.dataTables_sFirst,
                        sPrevious: "<",
                        sNext: ">",
                        sLast: Lang.dataTables_sLast
                    },
                    oAria: {
                        sSortAscending: Lang.dataTables_sSortAscending,
                        sSortDescending: Lang.dataTables_sSortDescending
                    }
                }
            })
        };
    if ($(".charts-ul li").length > 0) {
        var De = $(".charts-ul").data("titledate");
        window.chartData.titleDate = De ? De : Lang.date_range_1, window.chartData.isReport = 1, $(".charts-ul li").each(function(e, a) {
            var t = $(this),
                n = t.data("chartdata");
            n ? drawCharts(n.data, t.find(".charts-list")) : drawNodataCharts(n.data, t.find(".charts-list"))
        })
    }
    if ($(document).on("click", "#daily-cover-box .iconfont", function() {
            $("#daily-cover-box").addClass("hide").removeClass("show show-animation"), $("#vip-b").hide()
        }), $(document).on("click", "#vip-b", function() {
            $("#daily-cover-box").length && $("#daily-cover-box").addClass("hide").removeClass("show show-animation"), $("#search-index-history-info").length && $("#search-index-history-info").addClass("hide").removeClass("show show-animation"), $(".buy-vip-cancel").length && $(".buy-vip-cancel").trigger("click"), $(".asm-close").length && $(".asm-close").trigger("click"), $(".close-popup").length && $(".close-popup").trigger("click"), $("#add-invoice-close").length && $("#add-invoice-close").trigger("click"), $(this).hide()
        }), $(document).on("click", "#show-daily-cover", function() {
            var e = $(this),
                a = e.data("url"),
                t = $("#daily-cover-box"),
                n = t.find(".charts-select a.active").data("type") || 1;
            t.find(".spinner-bg").addClass("show").end().removeClass("hide").addClass("show show-animation"), $("#vip-b").show(), $.ajax({
                type: "get",
                url: a + "/type/" + n,
                success: function(e) {
                    t.find(".spinner-bg").removeClass("show");
                    var a = e.data || {};
                    drawCharts(a, t.find(".charts"))
                }
            })
        }), $(document).on("click", "#daily-cover-box .charts-select a", function() {
            var e = $(this),
                a = $("#show-daily-cover").data("url"),
                t = e.data("type"),
                n = $("#daily-cover-box");
            n.find(".spinner-bg").addClass("show"), e.addClass("active").siblings().removeClass("active"), $.ajax({
                type: "get",
                url: a + "/type/" + t,
                success: function(e) {
                    n.find(".spinner-bg").removeClass("show");
                    var a = e.data || {};
                    drawCharts(a, n.find(".charts"))
                }
            })
        }), $(".container-keyword").length) {
        $("#charts-ajax-data"), $(".nav-date-bar-action");
        window.keywordShowHourTab = {
            isDefault: "",
            type: "hour",
            datePickerClick: 0,
            defaultLang: Lang.date_range_1
        }
    }
    $(document).on("click", ".nav-date-bar-action .nav-item", function(e) {
        e.preventDefault(), console.log($(this));
        var a = $(this),
            t = $("#charts-ajax-data"),
            n = $(".keyword-histroy.chart-tr"),
            i = (n.find(".histroy"), a.data("ajaxurl")),
            o = a.data("querydata") || {},
            s = a.data("type"),
            r = t.data("showhour"),
            d = n.data("wordid");
        if (!d) return !1;
        if (!r) return !1;
        "string" == typeof o && (o = JSON.parse(o)), o.word_id = d, a.addClass("active").siblings().removeClass("active"), t.data("ajaxurl", i);
        var c = ".date-position." + s;
        $(c).removeClass("hidden").siblings().addClass("hidden"), window.chartData.titleDate = a.data("showdate"), getChartsKeywordDataHour(i, o), window.keywordShowHourTab.type = s
    });
    var je;
    $(document).on("click", ".histroy", function(e) {
        var a = $(this),
            t = a.data("id"),
            n = a.parents("table"),
            i = n.data("type") || "keyword",
            o = "ajaxurl",
            s = "querydata",
            r = a.parents(".keyword-histroy") || a.parents("tr"),
            r = r.length > 0 ? r : a.parents("tr"),
            d = r.find(".sort-word a").html();
        "keyword" == i && (p(t, d), o = window.keywordShowHourTab.isDefault + window.keywordShowHourTab.type + "ajaxurl", s = window.keywordShowHourTab.isDefault + "querydata");
        var c = $("#charts-ajax-data"),
            l = (c.data("thisurl"), c.data(o)),
            u = c.data(s) || {};
        if ("string" == typeof u && (u = JSON.parse(u)), "undefined" == typeof window.chartData.list && (window.chartData.list = []), r.hasClass("chart-tr")) return $chartsTrBox.hide(), r.removeClass("chart-tr"), !1;
        je || ($chartsTrBox = $('<tr id="charts-tr" class="chart-tr"><td colspan="6"></td></tr>'), je = $("#charts-box"), $chartsTrBox.find("td").html(je)), "keyword" == i && (je.find(".date-range-picker").map(function() {
            datePicker($(this))
        }), je.find("." + window.keywordShowHourTab.type).removeClass("hidden").siblings().addClass("hidden")), $chartsTrBox.show(), je.show(), r.siblings().removeClass("chart-tr"), r.addClass("chart-tr").data("wordid", t), r.after($chartsTrBox), $chartsTrBox.addClass("show-animation");
        var h = isMobile ? r.offset().top - 49 + "rem" : r.offset().top - 57 + "px";
        if (setTimeout(function() {
                $("body").animate({
                    scrollTop: h
                }, 380)
            }, 260), "keyword" == i) $("#charts-appname").val(d), u.word_id = t, window.chartData.titleDate = window.keywordShowHourTab.defaultLang, getChartsKeywordDataHour(l, u);
        else {
            u.sdate = a.data("sdate"), u.edate = a.data("edate");
            var m = je.find(".date-range-picker"),
                f = moment(u.sdate),
                g = moment(u.edate);
            m.data("date", u.sdate), m.data("edate", u.edate), m.find("span:eq(0)").html(f.format(Lang.format_time) + "~" + g.format(Lang.format_time)), datePicker(je.find(".date-range-picker")), window.chartData.titleDate = f.format(Lang.format_time) + Lang.to + g.format(Lang.format_time), getChartsData(l, u)
        }
    }), $("#sort").length && dataTables($("#sort"), 0), $("#sort_android").length && dataTables_android($("#sort_android"), 0), $(document).on("order.dt", "#sort_android", function() {
        if (!window.tableSort || !window.tableSort.order()[0]) return !1;
        var e, a, t, n = $(this),
            i = window.tableSort.order()[0][1];
        e = n.find("th.sort-handle"), a = e.find(".icon-up"), t = e.find(".icon-down"), "asc" == i ? a.addClass("active") && t.removeClass("active") : a.removeClass("active") && t.addClass("active")
    }), $(document).on("order.dt", "#sort", function() {
        if (!window.tableSort || !window.tableSort.order()[0]) return !1;
        var e, a, t, n = $(this),
            i = window.tableSort.order(),
            o = i[0][0],
            s = i[0][1];
        e = n.find("th:eq(" + o + ")"), a = e.find(".icon-up"), t = e.find(".icon-down"), $("#charts-tr").remove(), $(".chart-tr").removeClass("chart-tr"), e.siblings().find(".icon").removeClass("active"), "asc" == s ? (a.addClass("active"), t.removeClass("active")) : (a.removeClass("active"), t.addClass("active"))
    }), $(document).on("click", '.add-custom-keyword .btn[type="manage"]', function(e) {
        var a = $(this),
            t = a.data("url");
        return $addCompetiBg = $(".add-competi-bg"), $addCompetiSpinner = $addCompetiBg.find(".spinner-bg"), accountLimit = parseInt($addCompetiBg.find("#account-limit").html()), delUrl = $addCompetiBg.find("#custom-list").data("delurl"), $("html, body").animate({
            scrollTop: a.offset().top - 30 + "px"
        }, 100), $addCompetiBg.find(".add-competi").css({
            top: a.offset().top - $("#container").offset().top + a.height() + 30 + "px"
        }), $addCompetiBg.show(), $addCompetiSpinner.show(), $.ajax({
            type: "get",
            url: t,
            success: function(e) {
                if (e && 1e4 == e.code) {
                    $addCompetiSpinner.hide(), $addCompetiBg.find(".progress-bar").css("width", e.total_f + "%"), $addCompetiBg.find("#account-limit-current").html(e.total);
                    var a = "";
                    a += '<tr><th class="col-md-3">app</th><th class="col-md-1">' + Lang.usage_amout + '</th><th class="col-md-6">' + Lang.focus_words + '</th><th class="col-md-2">' + Lang.operation + "</th></tr>", $.map(e.list, function(t, n) {
                        a += '<tr data-id="' + n + '" class="custom-keyword-item">', a += '<td class="col-md-3"><div class="appinfo"><img src="' + t.appinfo.artwork_s + '" alt="' + t.appinfo.app_name + '"><div class="caption"><p><a target="_blank" href="' + t.appinfo.url + '">' + t.appinfo.app_name + '</a></p></div></div></td><td class="col-md-1"><span class="limit-num">' + t.num + "</span>/" + e.appLimit + "</td>", a += '<td class="col-md-7 text-left">', $.map(t.countrys, function(e, t) {
                            a += "<p><span>" + e.name + "</span>", $.map(e.items, function(e) {
                                a += '<a class="btn btn-default custom-remove" href="javascript:void(0);" data-type="wordid" data-id="' + e.word_id + '" data-country="' + t + '" role="button">' + e.word + '&nbsp;<span class="glyphicon remove-icon-white" aria-hidden="true"></span></a>'
                            }), a += "</p>"
                        }), a += "</td>", a += '<td class="col-md-1"><span class="glyphicon remove-icon custom-remove" aria-hidden="true" data-type="deleteall"></span></td>'
                    }), $addCompetiBg.find("#custom-list").html(a)
                } else $addCompetiBg.hide(), swal(e.msg)
            }
        }), !1
    }), $(document).on("click", ".competi-close", function() {
        var e = $(this).data("refresh");
        e && (je = void 0, "2" == e ? u() : refreshPage()), $addCompetiBg.hide()
    }), $(document).on("tap click", "#keyword-list .custom-remove, #custom-list .custom-remove, #keyword-change .custom-remove", function(e) {
        $addCompetiBg = $(".add-competi-bg"), $addCompetiSpinner = $addCompetiBg.find(".spinner-bg"), accountLimit = parseInt($addCompetiBg.find("#account-limit").html()), delUrl = $addCompetiBg.find("#custom-list").data("delurl"), country = $addCompetiBg.find("#custom-list").data("country") || "cn";
        var a = $(this),
            t = a.data("type"),
            n = a.parents(".custom-keyword-item"),
            i = n.find(".limit-num");
        appLimit = $addCompetiBg.find("#account-limit-current"), delappid = 0, thisappid = $("#appinfo-id").val(), word_id = a.data("id") || 0, country = a.data("country") || country, decNum = 1, appLimitCurrent = 0, "cancel" == t || "change" == t ? delappid = thisappid : (delappid = n.data("id"), "deleteall" == t && (country = !1)), country && (delUrl = delUrl + "/country/" + country), "cancel" == t && a.addClass("animation"), $.ajax({
            type: "get",
            url: delUrl,
            data: {
                appid: delappid,
                word_id: word_id
            },
            success: function(e) {
                e && 1e4 == e.code ? ($(".add-custom-keywords-tips-num").text(e.limit), "change" == t ? a.parents(".charts-box").remove() : "cancel" == t ? (a.removeClass("animation"), je = void 0, $("#charts-box").insertAfter(".aso100-nav-select.keyword:last").hide(), $.map(window.tableData, function(e, a) {
                                e[6] == word_id && (window.tableData[a][4] = 0)
                            }), a.addClass("add-custom-keyword-btn icon-top").removeClass("custom-remove icon-cancel").attr("data-original-title", "添加关注").html("置顶").parents("tr").removeClass("bg")) : ("wordid" == t ? (i.html(parseInt(i.html()) - decNum), a.remove(), 0 === parseInt(i.html()) && n.remove()) : (decNum = parseInt(i.html()), n.remove()), appLimitCurrent = parseInt(appLimit.html()) - decNum, $addCompetiBg.find(".progress-bar").css("width", +Math.round(100 * appLimitCurrent / accountLimit, 2) + "%"), appLimit.html(appLimitCurrent), thisappid == delappid && $(".competi-close").data("refresh", 1))) : swal(e.msg)
            }
        })
    }), $(document).on("submit", ".keyword-change form", function() {
        return !1
    }), $(document).on("input propertychange", ".add-custom-keywords-area textarea", function(e) {
        var a, t, n, i = $(this);
        a = i.val(), t = a.split(/\n+/), n = $(".add-custom-keywords-tips-num.hidden").text(), t.length > n ? i.val(a.substr(0, a.length - 1)) : "" == t[t.length - 1] ? $(".add-custom-keywords-tips-num.shown").text(n - t.length + 1) : $(".add-custom-keywords-tips-num.shown").text(n - t.length)
    }), $(document).on("tap click", ".add-custom-keywords .icon-guanbi", function(e) {
        return $(".add-custom-keywords").hide(), $(".add-custom-keywords").find('textarea[name="keywords"]').val(""), !1
    }), $(document).on("tap click", ".add-custom-keywords-btn", function(e) {
        var a, t, n, i, o = $(this);
        a = o.parents("form").find(".add-custom-keywords-area textarea"), t = a.val(), n = t.split(/\n+/), i = $(".add-custom-keywords-tips-num.hidden").text(), n.length > i ? a.val(t.substr(0, t.length - 1)) : "" == n[n.length - 1] ? $(".add-custom-keywords-tips-num.shown").text(i - n.length + 1) : $(".add-custom-keywords-tips-num.shown").text(i - n.length), o.parents("form").find(".add-custom-keywords").show()
    }), $(document).on("submit", ".add-custom-keyword form", function() {
        return $(".add-custom-keyword-btn").trigger("click"), !1
    }), $(document).on("tap click", ".add-custom-keyword-btn, .add-custom-keywords-sub", function(e) {
        var a = $(".add-custom-keyword"),
            t = a.find("form"),
            n = t.attr("action"),
            i = t.attr("method") || "GET",
            o = 0;
        if (isSubmiting) return !1;
        isSubmiting = !0;
        var s, r, d, c = $(this),
            l = c.attr("type"),
            p = c.data("pagename") || "keyword",
            u = {},
            h = "undefined";
        return "add" == l ? (s = c.data("keyword"), o = 1, u = c.data("id"), $.map(window.tableData, function(e, a) {
                e[6] == u && (u = e, u[4] = 1, h = a)
            }), d = $(".aso100-nav-select .navbar-nav[data-querydata]").data("querydata"), d && ("string" == typeof d && (d = JSON.parse(d)), d = d.ydate)) : "add-keyword" == c.data("type") ? s = c.parents("form").find('input[name="keyword"]').val() : (r = c.parents("form").find('textarea[name="keywords"]').val(), $(this).parents(".add-custom-keywords").hide(), c.parents("form").find('textarea[name="keywords"]').val("")), s || r ? (o && c.addClass("animation"), $.ajax({
                type: i,
                url: n,
                data: {
                    keyword: s,
                    keywords: r,
                    appid: appid,
                    ydate: d,
                    exist: o
                },
                success: function(e) {
                    isSubmiting = !1, c.removeClass("animation"), e && 1e4 == e.code ? "keywordchange" == p ? refreshPage() : (je = void 0, $("#charts-box").insertAfter(".aso100-nav-select.keyword:last").hide(), o ? c.addClass("custom-remove icon-cancel").removeClass("add-custom-keyword-btn icon-top").attr("data-original-title", "取消关注").html("取消").parents("tr").addClass("bg") : ($.each(e.data, function(e, a) {
                                    u = [a.word, a.rank, a.hints, a.search_no, 1, a.py, a.id, a.yrank - a.rank], $.each(window.tableData, function(e, t) {
                                        if (t[6] == a.id) return window.tableData.splice(e, 1), !1
                                    }), window.tableData.unshift(u)
                                }), window.tableSort.clear().rows.add(window.tableData).order([
                                    [5, "asc"],
                                    [1, "asc"]
                                ]).draw()), $(".add-custom-keywords-tips-num").text(e.limit)) : showOpenVipSwal(e.msg)
                }
            }), !1) : (isSubmiting = !1, !1)
    }), $(document).on("tap click", ".add-custom-keyword-btn-android", function(e) {
        if (isSubmiting) return !1;
        isSubmiting = !0;
        var a, t, n = $(this),
            i = n.attr("type"),
            o = n.data("pagename") || "keyword",
            s = {},
            r = "undefined",
            d = $("#android_addCustomUrl").val(),
            c = "GET";
        return "add" == i ? (a = n.data("keyword"), exist = 1, s = n.data("id"), $.map(window.tableData, function(e, a) {
                e[10] == s && (s = e, s[10] = 1, r = a)
            }), yesterday = $(".aso100-nav-select .navbar-nav[data-querydata]").data("querydata"), yesterday && ("string" == typeof yesterday && (yesterday = JSON.parse(yesterday)), yesterday = yesterday.ydate)) : "add-keyword" == n.data("type") ? a = n.parents("form").find('input[name="keyword"]').val() : (t = n.parents("form").find('textarea[name="keywords"]').val(), $(this).parents(".add-custom-keywords").hide(), n.parents("form").find('textarea[name="keywords"]').val("")), a || t ? (exist && n.addClass("animation"), $.ajax({
                type: c,
                url: d,
                data: {
                    keyword: a,
                    keywords: t,
                    appid: appid,
                    ydate: yesterday,
                    exist: exist
                },
                success: function(e) {
                    isSubmiting = !1, n.removeClass("animation"), e && 1e4 == e.code ? "keywordchange" == o ? refreshPage() : (je = void 0, $("#charts-box").insertAfter(".aso100-nav-select.keyword:last").hide(), n.addClass("custom-remove-android icon-cancel").removeClass("add-custom-keyword-btn-android icon-top").attr("data-original-title", "取消关注").html("取消").parents("tr").addClass("bg"), $(".add-custom-keywords-tips-num").text(e.limit)) : showOpenVipSwal(e.msg)
                }
            }), !1) : (isSubmiting = !1, !1)
    }), $(document).on("tap click", "#keyword-list .custom-remove-android", function(e) {
        $addCompetiBg = $(".add-competi-bg"), $addCompetiSpinner = $addCompetiBg.find(".spinner-bg"), accountLimit = parseInt($addCompetiBg.find("#account-limit").html()), delUrl = $("#android_delCustomUrl").val(), country = $addCompetiBg.find("#custom-list").data("country") || "cn";
        var a = $(this),
            t = a.data("type"),
            n = a.parents(".custom-keyword-item");
        n.find(".limit-num");
        appLimit = $addCompetiBg.find("#account-limit-current"), delappid = 0, thisappid = $("#appinfo-id").val(), word_id = a.data("id") || 0, country = a.data("country") || country, decNum = 1, appLimitCurrent = 0, "cancel" == t || "change" == t ? delappid = thisappid : (delappid = n.data("id"), "deleteall" == t && (country = !1)), country && (delUrl = delUrl + "/country/" + country), "cancel" == t && a.addClass("animation"), $.ajax({
            type: "get",
            url: delUrl,
            data: {
                appid: delappid,
                word_id: word_id
            },
            success: function(e) {
                e && 1e4 == e.code ? ($(".add-custom-keywords-tips-num").text(e.limit), "change" == t ? a.parents(".charts-box").remove() : "cancel" == t && (a.removeClass("animation"), je = void 0, $("#charts-box").insertAfter(".aso100-nav-select.keyword:last").hide(), a.addClass("add-custom-keyword-btn-android icon-top").removeClass("custom-remove-android icon-cancel").attr("data-original-title", "添加关注").html("置顶").parents("tr").removeClass("bg"))) : swal(e.msg)
            }
        })
    });
    var Be = $("#keyword-rank-more");
    Be.length && Be.find(".btn-custom").on("click", function() {
        var e = Be.data("ajaxurl"),
            a = Be.data("querydata"),
            t = Be.data("maxpage"),
            n = Be.data("page"),
            i = Be.find(".spinner"),
            o = Be.find(".btn-custom"),
            s = Be.data("vipurl");
        return !(n > t) && (o.hide(), i.show(), void $.ajax({
                type: "get",
                url: e + (e.indexOf("?") == -1 ? "?" : "&") + "page=" + n,
                data: a,
                dataType: "json",
                success: function(e) {
                    return n++, Be.data("page", n), $(".keyword-list .table").append(e.html), console.log(e.maxPage), 1 == e.maxPage ? o.hide() : o.show(), n > t && t < 100 ? (Be.append("<span>" + Lang.open_vip_tip[LangObj.openVipType] + '</span><a href="' + s + '" class="btn btn-custom">' + Lang.open_btn[LangObj.openVipType] + "</a>"), o.hide(), i.hide(), !1) : void i.hide()
                }
            }))
    });
    var Oe = $(".keyword-rank .aso100-nav-select input");
    if (Oe.length) {
        var Ie;
        Oe.bind("input porpertychange", function() {
            clearTimeout(Ie), Ie = setTimeout(function() {
                var e = $("#keyword-rank-more"),
                    a = e.data("querydata");
                $(".keyword-list .table tbody").html(""), a.minHints = $("#minHints").val(), a.maxHints = $("#maxHints").val(), a.minResult = $("#minResult").val(), a.maxResult = $("#maxResult").val(), e.data("page", 1).data("querydata", a).find(".btn-custom").click()
            }, 2e3)
        })
    }
    var Me = $(".load-more.load");
    Me.length && Me.find(".btn-more").on("click", function() {
        var e = Me.data("ajaxurl"),
            a = Me.data("querydata"),
            t = Me.data("maxpage"),
            n = Me.data("page"),
            i = Me.find(".spinner");
        return button = Me.find(".btn-more"), !(n > t) && (button.hide(), i.show(), void $.ajax({
            type: "get",
            url: e + (e.indexOf("?") == -1 ? "?" : "&") + "page=" + n,
            data: a,
            dataType: "html",
            success: function(e) {
                return n++, Me.data("page", n), $(".load-more-warp").append(e), n > t ? (Me.hide(), !1) : (button.show(), i.hide(), void s())
            }
        }))
    }), $searchListMore = $("#search-list-more"), $searchListMore.length && $searchListMore.find(".btn-default").on("click", function() {
        var e = $searchListMore.data("ajaxurl"),
            a = $searchListMore.data("querydata"),
            t = $searchListMore.data("maxpage"),
            n = $searchListMore.data("page"),
            i = $searchListMore.find(".spinner");
        return button = $searchListMore.find(".btn-default"), !(n > t) && (button.hide(), i.show(), void $.ajax({
            type: "get",
            url: e + (e.indexOf("?") == -1 ? "?" : "&") + "page=" + n,
            data: a,
            dataType: "html",
            success: function(e) {
                return n++, $searchListMore.data("page", n), $("#app-list").append(e), n > t ? ($searchListMore.hide(), !1) : (button.show(), i.hide(), void s())
            }
        }))
    });
    var Pe = $(".app-optimization textarea");
    if (Pe.length) {
        Pe.each(function() {
            $(this).css("height", $(this)[0].scrollHeight + "px"), $(this).siblings(".textarea-bg-text").css("height", $(this)[0].scrollHeight + "px"), $(this).parent().css("height", $(this)[0].scrollHeight + "px")
        });
        $('.app-optimization .btn[type="submit"]');
        Pe.bind("focus keyup input paste", function() {
            var e = $(this),
                a = e.val(),
                t = a.length,
                n = e.data("limit"),
                i = !0;
            e.css("height", e[0].scrollHeight + "px"), e.siblings(".textarea-bg-text").css("height", $(this)[0].scrollHeight + "px"), e.parent().css("height", e[0].scrollHeight + "px"), t > n ? (e.parent().siblings("label").find("em").addClass("text-danger").html(t), i = !1) : e.parent().siblings("label").find("em").removeClass("text-danger").html(t);
            var o = e.parents("form"),
                s = o.data("repeat") || "";
            if (s.length) {
                var r = new RegExp(s, "ig");
                a = a.replace(r, "<span>$&</span>"), a = a.replace(/\n/g, "<br />"), e.siblings(".textarea-bg-text").html(a)
            }
        })
    }
    $(document).on("submit", "form.investor", function(e) {
        preventDefault(e);
        var a = $(this),
            t = a.attr("action");
        if (t) {
            var n = a.find('input[name="investor_code"]').val();
            return n ? void $.ajax({
                    type: "POST",
                    url: t,
                    data: {
                        investor_code: n
                    },
                    success: function(e) {
                        1e4 != e.code ? swal({
                                title: e.msg,
                                type: "warning",
                                confirmButtonText: Lang.confirm_btn
                            }) : swal({
                                title: e.msg,
                                confirmButtonText: Lang.confirm_btn
                            }, function() {
                                window.location.reload()
                            })
                    }
                }) : void swal({
                    title: Lang.enter_invitation_code,
                    type: "warning",
                    confirmButtonText: Lang.confirm_btn
                })
        }
    }), $(document).on("click", ".auth-start", function(e) {
        var a = $(this);
        $(".wechat-subscribe").hide(), a.hide(), $(".auth-step.step-1").addClass("active"), $(".title-second").html('<span></span><a href="javascript:;">' + Lang.investors_certification_title + "></a>" + Lang.upload_card)
    }), $(document).on("change", ".auth-step.step-1 input[type=file]", function(e) {
        var a = $(this),
            t = a.parent(".upload");
        if (this.files && this.files[0]) {
            var n = this.files[0];
            if (n.size > 2097152) return swal({
                title: L("upload_img_limit"),
                confirmButtonText: Lang.confirm_btn
            }), !1;
            var i = new FileReader;
            i.onload = function() {
                var e = i.result,
                    n = t.clone(),
                    o = t.data("index"),
                    s = "picture-" + (o + 1),
                    r = $(".upload").length;
                r < 2 && (n.find("input").attr("id", s).end().find("label").attr("for", s).end().data("index", o + 1), n.insertAfter(t)), $('<div class="preview"><img src="' + e + '" alt=""><div class="remove"><span class="glyphicon-subscribe-remove"></span></div></div>').insertBefore(a)
            }, i.readAsDataURL(n)
        } else $('<div class="preview"><img src="' + this.value + '" alt=""><div class="remove"><span class="glyphicon-subscribe-remove"></span></div></div>').insertBefore(a)
    }), $(document).on("click", ".auth-step.step-1 .remove", function(e) {
        var a = $(this),
            t = a.parents(".upload");
        $(".preview").length < $(".upload").length ? t.remove() : (t.find(".preview").remove(), t.find("input[type=file]")[0].value = "")
    }), $(document).on("click", ".auth-step.step-1 .next", function(e) {
        if (isSubmiting) return !1;
        isSubmiting = !0;
        var a = $(this),
            t = a.data("submiturl"),
            n = a.parents(".auth-step.step-1"),
            i = n.find("input[type=file]"),
            o = n.data("uploadurl"),
            s = [];
        return $.map(i, function(e, a) {
            var t = ($(e), e.files[0]),
                n = new FormData;
            t && (n.append("qmfile", t), $.ajax({
                method: "POST",
                url: o,
                data: n,
                async: !1,
                processData: !1,
                contentType: !1,
                dataType: "json",
                success: function(e) {
                    "success" == e.code && s.push(e.url)
                }
            }))
        }), s.length < 1 ? (swal({
                title: Lang.please_select_img,
                confirmButtonText: Lang.confirm_btn
            }), void(isSubmiting = !1)) : void $.ajax({
                method: "POST",
                url: t,
                data: {
                    picture: s
                },
                dataType: "json",
                success: function(e) {
                    isSubmiting = !1, 1e4 != e.code ? swal({
                            title: e.msg,
                            type: "warning",
                            confirmButtonText: Lang.confirm_btn
                        }) : (n.removeClass("active").next().addClass("active"), $(".title-second").html('<span></span><a href="javascript:;">' + Lang.investors_certification_title + '></a><a href="javascript:;">' + Lang.upload_card + "></a>" + Lang.email_authentication))
                }
            })
    }), $(document).on("click", ".title-second > a", function() {
        var e = $(this);
        e.hasClass("btn") || (1 == e.index() ? window.location.reload() : 2 == e.index() && ($(".auth-step.step-2").removeClass("active"), $(".auth-step.step-1").addClass("active"), $(".title-second").html('<span></span><a href="javascript:;">' + Lang.investors_certification_title + "></a>" + Lang.upload_card)))
    }), $(document).on("click", ".auth-step.step-2 .next", function(e) {
        if (isSubmiting) return !1;
        isSubmiting = !0;
        var a = $(this),
            t = a.data("submiturl"),
            n = a.parents(".auth-step.step-2").find("form"),
            i = n.find("input").val();
        return i && i.indexOf("@") != -1 ? void $.ajax({
                method: "POST",
                url: t,
                data: {
                    email: i
                },
                dataType: "json",
                success: function(e) {
                    isSubmiting = !1, 1e4 != e.code ? swal({
                            title: e.msg,
                            type: "warning",
                            confirmButtonText: Lang.confirm_btn
                        }) : swal({
                            title: e.msg,
                            confirmButtonText: Lang.confirm_btn
                        }, function() {
                            window.location.reload()
                        })
                }
            }) : (swal({
                title: Lang.please_check_email,
                confirmButtonText: Lang.confirm_btn
            }, function() {
                n.find("input").val("")
            }), isSubmiting = !1, !1)
    });
    var Re = $("#signin");
    Re.length && accountPwd(Re);
    var Fe = $("#findpwd");
    Fe.length && accountPwd(Fe);
    var Ee = $("#code-img,#code-img1");
    if (Ee.attr(".src")) {
        setTimeout(function() {
            loadCodeImage(Ee)
        }, 200)
    }
    $(document).on("click", "#code-img,#code-img1", function() {
        var e = $(this),
            a = e.attr("src"),
            t = e.attr("id");
        a.indexOf("?") != -1 ? a = a.replace(/\?.*/i, "?" + +new Date) : a += "?" + +new Date, e.attr("src", a), "code-img1" == t && $("#code-img").attr("src", a), "code-img" == t && $("#code-img1").attr("src", a)
    });
    var Ne = $("#signup");
    if (Ne.length) {
        var Ae, He = Ne.find(".sign-msg");
        Ne.find("#submit").on("click", function() {
            clearTimeout(Ae);
            var e = !0,
                a = {};
            if (Ne.find("input.form-control").each(function() {
                    var t = $(this),
                        n = this.placeholder;
                    return "" == t.val() && "code" != this.name ? ("repassword" == this.name ? He.html(Lang.password_verify_1).slideDown("fast") : He.html(n + Lang.password_verify_2).slideDown("fast"), e = !1, !1) : void(a[this.name] = t.val())
                }), Ne.find(".has-error").length > 0 && (e = !1), !e) return !1;
            var t = Ne.attr("method") || "GET",
                n = Ne.attr("action"),
                i = Ne.attr("data-referrer");
            return $.ajax({
                type: t,
                url: n,
                data: a,
                dataType: "json",
                success: function(e) {
                    e && 1e4 == e.code ? (i && (window.location.href = i), He.html(e.msg).slideUp("fast"), Ne.addClass("hide"), We.removeClass("hide")) : (He.html(e.msg).slideDown("fast"), $("#code-img").click())
                }
            }), !1
        });
        var qe = Ne.data("checkurl");
        Ne.find("input").on("focus", function() {
            clearTimeout(Ae), Ae = setTimeout(function() {
                Ne.find(".has-error").length < 1 && He.slideUp("fast")
            }, 500)
        }), Ne.find("input").on("blur", function() {
            var e = this.name,
                a = this.value,
                t = $(this),
                n = t.parents(".form-group"),
                i = t.siblings("span"),
                o = '<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>',
                s = '<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>';
            if (a = a.replace(/(^\s+)|(\s+$)/g, ""), this.value = a, "" == a) return this.value = "", n.removeClass("has-success has-feedback has-error"), i.length > 0 && i.removeClass("glyphicon-remove glyphicon-ok"), "phone" != e && "code" != e || $("#signup-send-code").addClass("btn-disabled"), !1;
            if ("phone" == e && $("#code").parents(".form-group").hasClass("has-success") && $("#signup-send-code").removeClass("disabled"), "username" == e || "email" == e || "code" == e || "phoneCode" == e) {
                var r = {
                    field: e,
                    value: a
                };
                "phoneCode" == e && (r.phone = $("#phone").val().trim()), $.ajax({
                    type: "get",
                    url: qe,
                    data: r,
                    dataType: "json",
                    success: function(a) {
                        if (a && 1e4 == a.code) {
                            if (n.addClass("has-success has-feedback").removeClass("has-error"), i.length > 0 ? i.removeClass("glyphicon-remove").addClass("glyphicon-ok") : t.parent().append(o), "code" == e) {
                                var r = $("#phone").val();
                                r && (r = r.replace(/(^\s+)|(\s+$)/g, "")), r && $("#signup-send-code").removeClass("btn-disabled"), clearTimeout(Ae), Ae = setTimeout(function() {
                                    Ne.find(".has-error").length < 1 && He.slideUp("fast")
                                }, 500)
                            }
                        } else n.addClass("has-error has-feedback").removeClass("has-success"), i.length > 0 ? i.removeClass("glyphicon-ok").addClass("glyphicon-remove") : t.parent().append(s), He.html(a.msg).slideDown("fast"), "code" == e && ($("#signup-send-code").addClass("btn-disabled"), $("#code-img").trigger("click"))
                    }
                })
            }
            if ("repassword" == e) {
                var d = Ne.find('input[name="password"]').val();
                a != d ? (n.addClass("has-error has-feedback").removeClass("has-success"), i.length > 0 ? i.removeClass("glyphicon-ok").addClass("glyphicon-remove") : t.parent().append(s), He.html(Lang.password_verify_1).slideDown("fast")) : (n.addClass("has-success has-feedback").removeClass("has-error"), i.length > 0 ? i.removeClass("glyphicon-remove").addClass("glyphicon-ok") : t.parent().append(o))
            }
        }), $(document).on("click", "#signup-voice-tip a", function(e) {
            $("#signup-send-code").data("type", "voice"), $("#signup-send-code").trigger("click")
        }), $(document).on("click", "#signup-send-code", function() {
            var e, a, t = $(this),
                n = $("#phone").val(),
                i = $("#code"),
                o = $("#signup-voice-tip"),
                s = Ne.find(".sign-msg");
            return n ? i.parents(".form-group").find(".glyphicon-ok").length ? (e = t.data("sendurl"), a = t.data("type"), void $.getJSON(e, {
                        phone: n,
                        type: a
                    }, function(e) {
                        if (1e4 == e.code) {
                            var n = 59,
                                r = setInterval(function() {
                                    t.text(Lang.again_get + "(" + n--+")"), n < 0 && (t.removeClass("disabled"), t.text(Lang.get_code), clearInterval(r), o.slideDown())
                                }, 1e3);
                            t.addClass("disabled"), t.text(Lang.again_get + "(60)"), "voice" == a && (s.addClass("success").html("请注意收听语言验证码").slideDown("fast"), setTimeout(function() {
                                s.slideUp("fast")
                            }, 3e3))
                        } else 10012 == e.code ? ($("#code-img").trigger("click"), i.focus()) : s.html(e.msg).slideDown("fast")
                    })) : ("" == i.val() ? s.html("验证码" + Lang.password_verify_2).slideDown("fast") : s.html("验证码错误").slideDown("fast"), setTimeout(function() {
                        i.focus()
                    }, 500), !1) : (s.html("请输入手机号码").slideDown("fast"), !1)
        })
    }
    var We = $("#signup-company");
    We.length && (We.find("#checkboxInput").on("click", function() {
        $(this).prop("checked") ? We.find("#company-submit").removeClass("disabled") : We.find("#company-submit").addClass("disabled")
    }), We.find("#company-submit").on("click", function() {
        clearTimeout(Ae);
        var e = We.find(".sign-msg"),
            a = !0,
            t = {};
        if (We.find("input.form-control").each(function() {
                var n = $(this),
                    i = n.data("empty") || 0,
                    o = this.placeholder;
                return "" != n.val() || i ? void(t[this.name] = n.val()) : (e.html(o + Lang.password_verify_2).slideDown("fast"), a = !1, !1)
            }), We.find('input[type="checkbox"]').prop("checked") || (a = !1), !a) return !1;
        var n = We.attr("method") || "GET",
            i = We.attr("action");
        return $.ajax({
            type: n,
            url: i,
            data: t,
            dataType: "json",
            success: function(a) {
                if (a && 1e4 == a.code) if (e.html(a.msg).slideUp("fast"), e.addClass("success").html(a.msg).slideDown("fast"), "cn" == Lang.language_type) {
                    var t = $("#wechat-tip");
                    t.fadeIn();
                    var n = t.find("#signup-vip-email"),
                        i = $("#email").val() || "";
                    i.length && n.html(n.html().replace("你的注册邮箱", i)), t.find(".icon").on("click", function() {
                        var e = $(this);
                        e.hasClass("icon-left") ? e.parents(".wt-container-list").removeClass("qq") : e.parents(".wt-container-list").addClass("qq")
                    }), $("#wechat-tip-bg").show()
                } else setTimeout(function() {
                    document.location.href = "/"
                }, 1e3);
                else a.css && e.removeClass("success").addClass(a.css), e.html(a.msg).slideDown("fast")
            }
        }), !1
    })), u(), $(document).on("click", ".new-message-center", function() {
        var e = $(this),
            a = $(this).data("param"),
            t = $("#html-container");
        b(e, function(e) {
            t.empty().html(e)
        }, a)
    }), $(document).on("click", ".all-to-read", function() {
        $.get("/account/readAllMessage/", function(e) {
            window.location = "/account/setting/type/messageCenter"
        })
    }), $(document).on("click", " .show-msg-new", function() {
        var e = $(this),
            a = {},
            t = $("#html-container");
        a.id = e.data("id"), a.next = e.data("next") || 0, a.isread = e.data("isread") || "unread", b(e, function(e) {
            t.empty().html(e)
        }, a)
    }), $(document).on("click", ".new-message-page .pagination a", function(e) {
        e.preventDefault();
        var a = $(this),
            t = (a.html(), a.attr("href")),
            n = $("#html-container");
        $.ajax({
            url: t,
            type: "get",
            dataType: "html",
            error: function(e) {
                if (e && 403 == e.status) window.location.href = "/";
                else if (302 == e.status) {
                    var a = e.getResponseHeader("Url");
                    a ? window.location.href = a : window.location.href = "/"
                }
            },
            success: function(e) {
                n.empty().html(e)
            }
        })
    }), $(document).on("click", ".new_vip_page_list .pagination a", function(e) {
        e.preventDefault();
        var a = $(this),
            t = a.attr("href").split("=")[0],
            n = a.attr("href").split("=")[1] || 1,
            i = $("#new_vip_page_list"),
            o = $("#vue_vip_list .pagination li"),
            s = o.first(),
            r = o.last(),
            d = o.length;
        $.ajax({
            url: "/account/ajaxViplist",
            type: "get",
            data: {
                page: n
            },
            dataType: "json",
            success: function(e) {
                var o = "";
                $.each(e, function(a, t) {
                    o += "<tr>", o += "<td>" + e[a].open_method + "</td>", o += "<td>" + e[a].vip_type + "</td>", o += "<td>" + e[a].days + "</td>", o += "<td>" + e[a].create_time + "</td>", o += "</tr>"
                }), console.log(n), n > 1 && s.removeClass("disabled").find("a").attr("href", t + "=" + (n - 1)), n < d - 2 && r.removeClass("disabled").find("a").attr("href", t + "=" + (parseInt(n) + 1)), 1 == n && s.addClass("disabled"), n == d - 2 && r.addClass("disabled"), a.parent().siblings().removeClass("active").end().addClass("active"), a.parent().hasClass("next") && a.parent().removeClass("active"), a.parent().hasClass("previous") && a.parent().removeClass("active"), i.find("tbody").html(o)
            },
            error: function(e, a, t) {
                console.log(a)
            }
        })
    }), $(document).on("click", ".add-competi-button", function() {
        if (t = 0, a = 130, window.isMobile) var e = $(this),
            a = e.data("scroll") || 400,
            t = e.data("offsettop") || e.offset().top - 220;
        $("html, body").animate({
            scrollTop: a + "px"
        }, 100), $addCompetiBg = $(".add-competi-bg"), $competiSearchList = $(".competi-search-list"), $pageButton = $(".text-center.page"), $addCompetiSpinner = $(".add-competi .spinner-bg"), $addCompetiBg.find(".add-competi").css({
            top: t + "px"
        }), $addCompetiBg.show(), search($addCompetiBg.find(".search-su"))
    }), $(document).on("submit", ".competi-search", function(e) {
        if (preventDefault(e), competiGetDataRun) return !1;
        var a = $(this),
            t = a.find("input[name=word]").val(),
            n = a.data("appid") || n,
            i = a.find(".dropdown-toggle.device .name").text();
        return !(!t || "" == t) && (xe = a.prop("action"), searchWord = t, $addCompetiSpinner.show(), competiGetDataRun = !0, $.ajax({
                type: "get",
                url: xe,
                data: {
                    search: t,
                    appid: n,
                    device: i.toLowerCase()
                },
                dataType: "json",
                success: function(e) {
                    competiGetDataRun = !1, currentPage = 1, $addCompetiSpinner.hide(), e.maxPage > 0 ? (competiMaxPage = e.maxPage, $competiSearchList.html(e.data), e.maxPage > 1 ? $pageButton.show() : $pageButton.hide()) : ($competiSearchList.html('<p class="text-center">' + Lang.no_data_1 + "</p>"), $pageButton.hide())
                }
            }), !1)
    }), $(document).on("click", ".text-center.page .btn-default", function(e) {
        if (preventDefault(e), competiGetDataRun) return !1;
        var a = $(this),
            t = a.data("type");
        return !a.hasClass("disable") && (currentPage = "next" == t ? currentPage + 1 : currentPage - 1, currentPage == competiMaxPage && $pageButton.find(".next").addClass("disable"), 1 == currentPage && $pageButton.find(".prev").addClass("disable"), currentPage > 1 && currentPage < competiMaxPage && $pageButton.find(".btn-default").removeClass("disable"), $addCompetiSpinner.show(), competiGetDataRun = !0, void $.ajax({
                type: "get",
                url: xe,
                data: {
                    search: searchWord,
                    page: currentPage,
                    appid: appid
                },
                dataType: "json",
                success: function(e) {
                    $addCompetiSpinner.hide(), e.maxPage > 0 ? ($competiSearchList.html(e.data), competiGetDataRun = !1) : ($competiSearchList.html('<p class="text-center">' + Lang.no_data_2 + "</p>"), $pageButton.hide())
                }
            }))
    }), $(document).on("click", ".competi-search-list .btn-default, .btn-possibleAdd", function(e) {
        if (preventDefault(e), competiGetDataRun) return !1;
        var a = $(this),
            t = a.data("appid"),
            n = "/account/addCompeti",
            i = a.data("possible"),
            o = a.html();
        return $(".invest-data-center").length ? (x(a, n), !1) : !a.data("add") && (i || $addCompetiSpinner.show(), competiGetDataRun = !0, a.html(Lang.adding), void $.ajax({
                type: "get",
                url: n,
                data: {
                    appid: appid,
                    competiId: t
                },
                dataType: "json",
                success: function(e) {
                    i || $addCompetiSpinner.hide(), competiGetDataRun = !1, e && 1e4 == e.code ? (a.data("add", 1).html(Lang.added), a.addClass("disabled"), $(".competi-close").data("refresh", 1), i && refreshPage()) : (a.html(o), showOpenVipSwal(e.msg))
                }
            }))
    }), $(document).on("click", ".competi-list .delete-competi", function(e) {
        if (competiGetDataRun) return !1;
        var a = $(this),
            t = a.data("appid"),
            n = "/account/delCompeti",
            i = a.html();
        return !a.data("add") && (competiGetDataRun = !0, a.html(Lang.deleteing), void $.ajax({
                type: "get",
                url: n,
                data: {
                    appid: appid,
                    competiId: t
                },
                dataType: "json",
                success: function(e) {
                    competiGetDataRun = !1, e && 1e4 == e.code ? (a.parents(".table-striped").find(".competi-list").length < 2 && refreshPage(), a.parents(".competi-list").remove(), $(".competi .media-left >span").each(function(e, a) {
                            $(this).html(e + 1)
                        }), footerFixed()) : (a.html(i), swal({
                            title: e.msg,
                            confirmButtonText: Lang.confirm_btn
                        }))
                }
            }))
    }), $(document).on("click", ".competi-list .icon-asocompare", function(e) {
        var a, t = $(this),
            n = t.data("appid");
        return appid ? ($("#competiinfo").find("#asoCompare").addClass("active").siblings().removeClass("active"), a = "/app/asoCompare/appid/" + appid + "/competiId/" + n, void pjaxLoad(a)) : (refreshPage(), !1)
    }), $(document).on("click", ".thatapp", function(e) {
        var a = $(this);
        $("html, body").animate({
            scrollTop: "300px"
        }, 100), $addCompetiBg = $(".add-competi-bg"), $competiSearchList = $(".competi-search-list"), $pageButton = $(".text-center.page"), $addCompetiSpinner = $(".add-competi .spinner-bg"), $addCompetiBg.hide(), $addCompetiBg.find(".add-competi").css({
            top: a.offset().top - $("#container").offset().top + a.height() + 20 + "px"
        }), $addCompetiBg.show()
    }), $(document).on("click", ".add-competi.competi-list a", function(e) {
        $(".add-competi-bg").hide()
    }), $(document).on("mousewheel DOMMouseScroll", ".stop-default-scroll", function(e) {
        var a = $(this).find(".stop-default-scroll-box"),
            a = a.length ? a : $(this);
        wheelDelta = e.originalEvent.wheelDelta;
        var t = 0;
        if ($.map(a.children(), function(e, a) {
                t += $(e).outerHeight(!0)
            }), wheelDelta >= 0) {
            if (a.scrollTop() <= 0) return !1
        } else if (a.scrollTop() >= t - a.outerHeight()) return !1
    });
    var Ue = $(".search-su");
    Ue.length > 0 && search(Ue), $(document).on("click", ".export-data", function(e) {
        var a = $(this),
            t = a.data("limit"),
            n = a.data("disabled") || 0;
        if (t <= 0 && preventDefault(e), 1 == n) preventDefault(e), swal(Lang.export_data_tip_1);
        else {
            if ((a.attr("href").search("/keywordExport/") !== -1 || a.attr("href").search("/keywordExportPlatform/") !== -1) && (ze(a), $(".dataTables_empty").length)) return swal(Lang.app_keyword_aso_keyword_export_null), !1;
            if (a.attr("href").search("/keywordRankExport/") !== -1 && (Je(a), "" == $(".keyword-list .table tbody").html())) return swal(Lang.app_keyword_aso_keyword_export_null), !1;
            a.attr("href").search("/rankExport/") !== -1 && Ye(a), 2 == n ? (preventDefault(e), t -= 1, a.data("limit", t), t <= 0 && a.addClass("account-vip-status"), swal({
                    title: Lang.export_data_tip_2,
                    showConfirmButton: !0,
                    confirmButtonText: Lang.confirm_btn,
                    confirmButtonColor: "#0bb995",
                    showCancelButton: 1,
                    cancelButtonText: Lang.cancel_btn
                }, function(e) {
                    if (e) {
                        var n = a.attr("href");
                        n.indexOf("/") != -1 && (window.location.href = n), t -= 1, a.data("limit", t), t <= 0 && a.addClass("account-vip-status"), a.html(Lang.export_data_ing), a.data("disabled", 1), setTimeout(function() {
                            a.data("disabled", 2), a.html(Lang.export_data)
                        }, 3e3)
                    }
                })) : (t -= 1, a.data("limit", t), t <= 0 && a.addClass("account-vip-status"), a.html(Lang.export_data_ing), a.data("disabled", 1), setTimeout(function() {
                    a.data("disabled", 2), a.html(Lang.export_data)
                }, 3e3))
        }
    });
    var ze = function(e) {
            var a = {};
            a.minHints = $("#minHints").val() ? $("#minHints").val() : -1, a.maxHints = $("#maxHints").val() ? $("#maxHints").val() : -1, a.minResult = $("#minResult").val() ? $("#minResult").val() : -1, a.maxResult = $("#maxResult").val() ? $("#maxResult").val() : -1, a.minRank = $("#minRank").val() ? $("#minRank").val() : -1, a.maxRank = $("#maxRank").val() ? $("#maxRank").val() : -1, a.keyword = $("#keyword-list #sort_filter label input[type=search]").val() ? encodeURIComponent($("#keyword-list #sort_filter label input[type=search]").val()) : "";
            var t = "/minHints/" + a.minHints + "/maxHints/" + a.maxHints + "/minResult/" + a.minResult + "/maxResult/" + a.maxResult + "/minRank/" + a.minRank + "/maxRank/" + a.maxRank + "/keyword/" + a.keyword;
            e.attr("href", e.data("exporturl") + t)
        },
        Je = function(e) {
            var a = {};
            a.minHints = $("#minHints").val() ? $("#minHints").val() : -1, a.maxHints = $("#maxHints").val() ? $("#maxHints").val() : -1, a.minResult = $("#minResult").val() ? $("#minResult").val() : -1, a.maxResult = $("#maxResult").val() ? $("#maxResult").val() : -1;
            var t = "/minHints/" + a.minHints + "/maxHints/" + a.maxHints + "/minResult/" + a.minResult + "/maxResult/" + a.maxResult;
            e.attr("href", e.data("exporturl") + t)
        },
        Ye = function(e) {
            var a = $("#charts").find(".highcharts-legend-item"),
                t = "/itemstatus/";
            a && a.each(function() {
                t += $(this).is(".highcharts-legend-item-hidden") ? "0" : "1"
            }), e.attr("href", e.attr("href") + t)
        };
    if ($(document).on("click", ".account-vip-status", function(e) {
            var a = $(this);
            a.parents(".info-container");
            return preventDefault(e), window.isMobile ? swal({
                    title: Lang.account_vip_status_tip1,
                    confirmButtonText: Lang.confirm_btn,
                    cancelButtonText: !1
                }) : a.hasClass("export-data") ? showOpenVipSwal(Lang.account_vip_status_tip[LangObj.openVipType]) : showBuyVip(), !1
        }), $(document).on("click", "#buy-vip-type a", function() {
            var e = $(this),
                a = $("#buy-vip-expire");
            e.hasClass("active") || (a.data("expire") >= 0xe677d0686418 ? a.html("永久") : a.html(moment(a.data("expire")).add(e.data("date"), "month").format("YYYY-MM-DD")), $("#buy-vip-amount").html(e.data("amount")), e.siblings("a").removeClass("active").end().addClass("active"))
        }), $(document).on("click", "#buy-vip-style input", function() {
            var e = $(this),
                a = $("#buy-vip-type"),
                t = a.find("." + e.val()),
                n = t.find("a.active");
            vipExpire = $("#buy-vip-expire"), t.show().siblings().hide(), $("#buy-vip-amount").html(n.data("amount")), vipExpire.html(moment(vipExpire.data("expire")).add(n.data("date"), "month").format("YYYY-MM-DD"))
        }), $(document).on("click", "#buy-vip-submit", function() {
            var e = $("#buy-vip-style input:checked").val(),
                a = $("#buy-vip-type ." + e + " a.active").data("productid"),
                t = $(this),
                n = t.data("url");
            n = n + "/product_id/" + a + "?callback=" + encodeURIComponent(location.href), window.open(n)
        }), $(document).on("click", "#buy-vip-submit-bc", function() {
            var e = $(this),
                a = $("#buy-vip-style input:checked").val(),
                t = $("#buy-vip-type ." + a + " a.active").data("productid"),
                n = $("#beecloud-pay-type a.active").data("type"),
                i = e.data("action") + "/product_id/" + t + "/payChannel/" + n;
            e.data("action", i), b(e, buySubmit, "")
        }), $(document).on("click", ".buy-vip-cancel", function() {
            $("#buy-vip").hide(), $("#vip-b").hide()
        }), $(document).on("click", ".no-signin", function(e) {
            return preventDefault(e), swal({
                title: Lang.login_tip,
                type: "warning",
                showCancelButton: !0,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: Lang.go_login,
                cancelButtonText: Lang.cancel_btn,
                closeOnConfirm: !1
            }, function() {
                document.location.href = "/account/signin"
            }), !1
        }), wechatShareInit = function() {}, window.isWechat && "undefined" != typeof wechatConfig) {
        var Ge = ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "hideMenuItems"];
        wx.config({
            debug: wechatConfig.debug || !1,
            appId: wechatConfig.appId,
            timestamp: wechatConfig.timestamp,
            nonceStr: wechatConfig.nonceStr,
            signature: wechatConfig.signature,
            jsApiList: wechatConfig.jsApiList || Ge
        }), wechatShareInit = function() {
            wx.onMenuShareTimeline({
                title: wechatShare.title,
                link: wechatShare.link,
                imgUrl: wechatShare.imgUrl,
                success: function() {
                    wechatConfig.isCallback && wechatShareGetJifen(wechatConfig), wechatConfig.shareSuccessCallback && "function" == typeof window[wechatConfig.shareSuccessCallback] && window[wechatConfig.shareSuccessCallback]()
                },
                cancel: function() {}
            }), wx.onMenuShareAppMessage({
                title: wechatShare.title,
                desc: wechatShare.desc,
                link: wechatShare.link,
                imgUrl: wechatShare.imgUrl,
                type: "",
                dataUrl: "",
                success: function() {
                    wechatConfig.shareSuccessCallback && "function" == typeof window[wechatConfig.shareSuccessCallback] && window[wechatConfig.shareSuccessCallback]()
                },
                cancel: function() {}
            }), wx.onMenuShareQQ({
                title: wechatShare.title,
                desc: wechatShare.desc,
                link: wechatShare.link,
                imgUrl: wechatShare.imgUrl,
                success: function() {
                    wechatConfig.shareSuccessCallback && "function" == typeof window[wechatConfig.shareSuccessCallback] && window[wechatConfig.shareSuccessCallback]()
                },
                cancel: function() {}
            }), wx.onMenuShareWeibo({
                title: wechatShare.title,
                desc: wechatShare.desc,
                link: wechatShare.link,
                imgUrl: wechatShare.imgUrl,
                success: function() {
                    wechatConfig.shareSuccessCallback && "function" == typeof window[wechatConfig.shareSuccessCallback] && window[wechatConfig.shareSuccessCallback]()
                },
                cancel: function() {}
            })
        }, wx.ready(wechatShareInit)
    }
    if ($(document).on("click", ".market-list a", function(e) {
            return preventDefault(e), pjaxLoad($(this).attr("href")), !1
        }), $("#app").length) {
        var Xe, Ve = !1;
        $.pjax.defaults.timeout = 4e3, $.pjax.defaults.timeout = 4e4, $(document).on("click", "a[data-pjax]", function(e) {
            if (preventDefault(e), Ve) return !1;
            Ve = !0;
            var a = $(this),
                t = a.parent("li"),
                n = t.data("parent") || "",
                i = a.data("pagename");
            return t.length < 1 && (t = $("#" + i), n = t.data("parent") || ""), $("#container").attr("data-name", i), t.addClass("active"), t.siblings().removeClass("open active"), isMobile && t.parent("ul").siblings("ul").find("li").removeClass("open active"), n && ($("#" + n).addClass("open active"), $("#" + n).siblings().removeClass("open active").find("li").removeClass("active")), $.support.pjax ? pjaxLoad(a.attr("href")) : document.location.href = a.attr("href"), !1
        }), $(document).on("pjax:success", function(e, a, t, n) {
            clearTimeout(Xe), $(".info-container > .spinner-box").hide(100), Ve = !1, O()
        }), $(document).on("pjax:beforeSend", function(e, a, t, n) {
            Xe = setTimeout(function() {
                $(".info-container > .spinner-box").height($(".info-container > .container-box").outerHeight()).show()
            }, 100)
        })
    }
    $(document).on("pjax:success", function(e, a, t, n) {
        var i = n.getResponseHeader("Callback");
        i && i.indexOf("function") != -1 ? setTimeout(function() {
                var e = new Function("return " + i)();
                e()
            }, 100) : i && "function" == typeof window[i] && setTimeout(function() {
                var e = n.getResponseHeader("callbackParam") || "";
                e && (e = JSON.parse(e)), window[i](e)
            }, 100)
    }), $(document).on("click", "#nav-list .nav-title", function(e) {
        if (isMobile) return !1;
        var a = $(this),
            t = a.parent(),
            n = a.parents("#nav-list");
        t.hasClass("active") || n.find(".dropdown.active").siblings().not(t).removeClass("open"), t.hasClass("dropdown") && t.toggleClass("open")
    }), $(document).on("click", "#app .aso100-nav-label.screenimg .tab", function() {
        var e = $(this),
            a = e.data("imgstr") || "",
            t = e.data("platform") || "ios";
        if (imgHtml = "", e.siblings(".tab").removeClass("active"), e.addClass("active"), a) return a = "android" == t ? a.split("|") : a.split(","), a.map(function(e, a) {
            imgHtml += '<img src="' + e + '" />'
        }), $("#screenshot-box").html(imgHtml).css("left", "0"), $("#screenshot-left").removeClass("active"), $("#screenshot-right").addClass("active"), !1
    }), $(document).on("click", "#screenshot-left", function() {
        var e = $(this),
            a = $("#screenshot-box"),
            t = parseInt(a.css("left"));
        if (!e.hasClass("active")) return !1;
        var n = a.find("img"),
            i = n.width() + 5,
            o = a.parent().width(),
            s = 0;
        return i * n.length > o && (s = Math.ceil(o - i * n.length)), t += i, t >= 0 && (e.removeClass("active"), $("#screenshot-right").addClass("active")), a.animate({
            left: t + "px"
        }, 300), $("#screenshot-right").addClass("active"), !1
    }), $(document).on("click", "#screenshot-right", function() {
        var e = $(this),
            a = $("#screenshot-box"),
            t = parseInt(a.css("left"));
        if (!e.hasClass("active")) return !1;
        var n = a.find("img"),
            i = n.width() + 5,
            o = a.parent().width(),
            s = 0;
        return i * n.length > o && (s = Math.ceil(o - i * n.length)), t -= i, t <= s && (e.removeClass("active"), $("#screenshot-left").addClass("active")), a.animate({
            left: t + "px"
        }, 300), $("#screenshot-left").addClass("active"), !1
    }), $(".part-left ul li").bind("mouseover", function() {
        $(this).addClass("white"), $(this).children("span").addClass("green"), $(this).children("p").addClass("text-green")
    }), $(".part-left ul li").bind("mouseout", function() {
        $(this).removeClass("white"), $(this).children("span").removeClass("green"), $(this).children("p").removeClass("text-green")
    }), $(document).on("click", ".part-left ul li", function(e) {
        $(this).children("div").show()
    }), $(".part-left ul").click(function() {
        $(".part-left ul li").children("div").hide()
    }), $(".part-left ul li div p").mouseover(function() {
        $(this).children("span").addClass("green")
    }), $(".part-left ul li div p").mouseout(function() {
        $(this).children("span").removeClass("green")
    }), $(document).on("click tap", ".container-box .desc .more", function() {
        var e = $(this);
        e.parent().find("pre").css("max-height", "initial").end(), e.remove()
    }), $(document).on("click tap", ".version .more", function() {
        var e = $(this);
        e.parent().find("p").css("max-height", "initial").end(), e.remove()
    }), $(document).on("click", ".comment .pagination a", function() {
        var e = $(this),
            a = e.attr("href"),
            t = e.parent();
        return !t.hasClass("disabled") && (a.indexOf("javascript") == -1 && (pjaxLoad(a), !1))
    }), $(document).on("click", "#show-add-itc-account", function() {
        var e, a, t, n = $(this),
            i = n.parents(".bind-itc-account-showdesc"),
            o = $("#bind-itc-account");
        i && i.length > 0 ? (t = i.offset().top, a = i.offset().left, e = {
                left: a + "px",
                top: t + "px"
            }, i.hide()) : (t = $(document).scrollTop() + ($(window).height() - o.height()) / 2, e = {
                marginLeft: "50%",
                left: "-" + o.width() / 2 + "px",
                top: t + "px"
            }, $("#vip-b").show()), o.css(e).show();
        var s = i.data("show") || "show";
        "hide" == s && i.hide()
    }), $(document).on("click", ".add-itc-account-cancle", function() {
        $("#bind-itc-account").hide();
        var e = $(".bind-itc-account-showdesc").data("show") || "show";
        "hide" == e ? $(".bind-itc-account-showdesc").hide() : $(".bind-itc-account-showdesc").show(), $("#vip-b").hide()
    }), $(document).on("click", "#bind-itc-account #checkboxInput", function() {
        $(this).prop("checked") ? $("#bind-itc-account-button").removeClass("disabled") : $("#bind-itc-account-button").addClass("disabled")
    }), $(document).on("click", "#bind-itc-account-button", function() {
        var e = $(this),
            a = e.data("url"),
            t = e.parents("#bind-itc-account"),
            n = t.find("#itc-email"),
            i = t.find("#itc-password");
        if (e.hasClass("disabled")) return !1;
        var o = n.val(),
            s = i.val();
        return o = o.replace(/(^\s*)|(\s*$)/g, ""), o && o.indexOf("@") != -1 ? s ? ($(".itc-bind-loading").css({
                    left: t.offset().left + "px",
                    top: t.offset().top + "px"
                }).show(), void $.ajax({
                    type: "post",
                    url: a,
                    data: {
                        appid: o,
                        password: s,
                        app_id: $("#appinfo-id").val()
                    },
                    dataType: "json",
                    success: function(e) {
                        if ($(".itc-bind-loading").hide(), e && 1e4 == e.code) {
                            var a, t = Lang.cancel_btn,
                                o = Lang.show_account,
                                s = !0;
                            e.notApp ? (a = Lang.itc_tip_1 + e.app_name + Lang.itc_tip_2, t = Lang.itc_tip_3) : (a = Lang.itc_tip_4, e.app_name || (o = Lang.confirm_btn, s = !1)), swal({
                                title: a,
                                showConfirmButton: !0,
                                confirmButtonText: o,
                                confirmButtonColor: "#0bb995",
                                showCancelButton: s,
                                cancelButtonText: t,
                                closeOnConfirm: !1,
                                html: !0
                            }, function(a) {
                                a ? s ? window.location.href = "/account/setting/type/settingItc" : window.location.reload() : (e.notApp && n.val(""), i.val(""))
                            })
                        } else i.val(""), 50005 == e.code ? swal({
                                title: e.msg,
                                showConfirmButton: !0,
                                confirmButtonText: Lang.itc_double_check_confirm,
                                confirmButtonColor: "#0bb995",
                                showCancelButton: !0,
                                cancelButtonText: Lang.itc_double_check_cancel,
                                closeOnConfirm: !1,
                                html: !0
                            }, function(e) {
                                e && window.open("https://support.apple.com/zh-cn/HT202664")
                            }) : swal(e.msg)
                    }
                })) : (swal(Lang.please_write_pwd), !1) : (swal({
                title: Lang.please_check + "Apple Id",
                confirmButtonText: Lang.confirm_btn
            }, function() {
                n.val("")
            }), !1)
    }), $(document).on("click", ".itc-manage-editer", function() {
        var e = $(this),
            a = e.parent(),
            t = a.data("itcid");
        $(".vip-b").show();
        var n, i, o = $(".itc-account-editer");
        i = $(document).scrollTop() + ($(window).height() - o.height()) / 2, n = {
            margin: "auto",
            left: "0",
            top: "0",
            right: "0",
            bottom: "0",
            position: "fixed"
        }, $("#vip-b").show(), o.css(n).show().find(".modify-email").val(t).end().find(".old-email").val(t)
    }), $(document).on("click", ".itc-manage-delete", function() {
        var e = $(this),
            a = e.parents(".manage-itc-account").data("url");
        _parent = e.parent(), appleId = _parent.data("itcid"), swal({
            title: Lang.itc_tip_5,
            text: Lang.itc_tip_6,
            type: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: Lang.confirm_btn,
            cancelButtonText: Lang.cancel_btn,
            closeOnConfirm: !1,
            html: !1
        }, function() {
            $.ajax({
                type: "post",
                url: a,
                data: {
                    apple_id: appleId
                },
                dataType: "json",
                success: function(e) {
                    e && 1e4 == e.code ? swal({
                            title: Lang.itc_tip_7,
                            showConfirmButton: !0,
                            confirmButtonText: Lang.itc_tip_8,
                            cancelButtonText: Lang.cancel_btn,
                            confirmButtonColor: "#0bb995",
                            html: !0
                        }, function() {
                            window.location.reload()
                        }) : swal(e.msg)
                }
            })
        })
    }), $(document).on("click", ".itc-manage-submit", function() {
        var e = $(this),
            a = e.data("url"),
            t = e.parents(".itc-account-editer"),
            n = t.find(".old-email"),
            i = t.find(".modify-email"),
            o = t.find(".modify-passowrd"),
            s = i.val(),
            r = n.val(),
            d = o.val();
        return (s = s.replace(/^\s+/i, "").replace(/\s+$/i, "")) ? d ? ($(".itc-bind-loading").addClass("itc-account-modify").css({
                    left: t.offset().left + "px",
                    top: t.offset().top + "px"
                }).show(), void $.ajax({
                    type: "post",
                    url: a,
                    data: {
                        oldAppid: r,
                        appid: s,
                        password: d,
                        type: 1
                    },
                    dataType: "json",
                    success: function(e) {
                        $(".itc-bind-loading").removeClass("itc-account-modify").hide(), e && 1e4 == e.code ? swal({
                                title: Lang.itc_tip_10,
                                showConfirmButton: !0,
                                confirmButtonText: Lang.itc_tip_11,
                                confirmButtonColor: "#0bb995",
                                html: !0
                            }, function() {
                                $(".vip-b").hide(), $(".itc-account-editer").hide(), setTimeout(function() {
                                    window.location.reload()
                                }, 200)
                            }) : (o.val("").focus(), swal({
                                title: e.msg,
                                confirmButtonText: Lang.confirm_btn
                            }))
                    }
                })) : (swal({
                    title: Lang.please_write_pwd,
                    confirmButtonText: Lang.confirm_btn
                }, function() {
                    o.focus()
                }), !1) : (swal({
                title: Lang.itc_tip_9 + "Apple Id",
                confirmButtonText: Lang.confirm_btn
            }, function() {
                i.val("").focus()
            }), !1)
    }), $(document).on("click", ".turnoff", function(e) {
        $(".itc-account-editer").hide(), $(".vip-b").hide()
    }), $(document).on("click", "#itc-filter-input", function(e) {
        var a = $(this),
            t = $(".itc .off-line");
        a.prop("checked") ? t.hide() : t.show()
    }), $(document).on("click", "#screenshot-box img", function() {
        if (window.isMobile) return !1;
        var e = document.getElementById("bombbox"),
            a = $(".aso100-nav-label.screenimg .tab.active").data("imgstr"),
            t = $(".aso100-nav-label.screenimg .tab.active").data("platform") || "ios";
        a = "ios" == t ? a.split(",") : a.split("|");
        var n = e.querySelector("img") || document.createElement("img"),
            i = e.querySelector("span"),
            o = $("#tab");
        i.style.position = "absolute", i.style.top = 0, i.style.right = 0, i.innerHTML = Lang.close, i.style.cursor = "pointer", n.src = a[$(this).index()], $(document).scrollTop(80);
        var s, r = $("#screenshot-box img").width(),
            d = $("#screenshot-box img").height(),
            c = $(window).height();
        s = 50, c >= 730 && (s = (c - o.height()) / 2), o.css({
            top: s + "px",
            marginLeft: -r + "px"
        }).show();
        var l = 2,
            p = d * l;
        c <= 2.5 * d && (p = c - 84, p >= d ? l = p / d : (l = 1.3, p = d)), n.style.height = d * l + "px", n.style.width = r * l + "px", e.appendChild(n), $(".vip-b").show().css({
            opacity: .8,
            background: "#000"
        }), startMove(e, {
            height: p
        }), $("#next").show(), $("#previous").show(), $(".close-popup").click(function() {
            $(".vip-b").hide(), o.hide(), $("#bombbox").css("height", 0), $("#next").hide(), $("#previous").hide()
        });
        var u = document.getElementById("next"),
            h = document.getElementById("previous"),
            m = $(this).index(),
            f = $("#screenshot-box img").length;
        0 == m && (h.style.display = "none"), m == f - 1 && (u.style.display = "none"), u.onclick = function() {
            h.style.display = "block", m++, n.src = a[m], m > f - 2 && (u.style.display = "none")
        }, h.onclick = function() {
            u.style.display = "block", m--, m < 1 && (h.style.display = "none"), n.src = a[m]
        }
    }), $(document).on("click", ".add-invoice", function() {
        var e = $(this),
            a = e.data("orderid");
        ordertype = e.data("ordertype"), $("#add-invoice-form input[name=orderid]").val(a), $("#add-invoice-form input[name=type]").val(ordertype), $(".vip-b").show(), $("#fill-in").show()
    }), $(document).on("click", "#add-invoice-submit", function() {
        var e, a, t, n, i, o, s = $("#add-invoice-form");
        return n = s.find("input[name=orderid]").val(), i = s.find("input[name=type]").val(), e = s.find("input[name=title]").val().replace(/(^\s*)|(\s*$)/g, ""), a = s.find("input[name=username]").val().replace(/(^\s*)|(\s*$)/g, ""), t = s.find("input[name=phone]").val().replace(/(^\s*)|(\s*$)/g, ""), o = s.find("input[name=email]").val().replace(/(^\s*)|(\s*$)/g, ""), taxnumber = s.find("input[name=taxnumber]").val().replace(/(^\s*)|(\s*$)/g, ""), e ? taxnumber ? a ? t ? o ? void $.ajax({
                                url: s.attr("action"),
                                type: "POST",
                                dataType: "json",
                                data: {
                                    orderid: n,
                                    type: i,
                                    title: e,
                                    username: a,
                                    phone: t,
                                    email: o,
                                    taxnumber: taxnumber
                                },
                                success: function(e) {
                                    1e4 == e.code ? swal({
                                            title: Lang.invoice_tip_5,
                                            confirmButtonText: Lang.confirm_btn
                                        }, function() {
                                            $("#fill-in").hide(), $(".vip-b").hide(), setTimeout(function() {
                                                window.location.reload()
                                            }, 200)
                                        }) : swal(e.msg)
                                }
                            }) : (swal(Lang.invoice_tip_7), !1) : (swal(Lang.invoice_tip_3), !1) : (swal(Lang.invoice_tip_2), !1) : (swal(Lang.invoice_tip_6), !1) : (swal(Lang.invoice_tip_1), !1)
    }), $(document).on("click", "#add-invoice-close", function() {
        $(".vip-b").hide(), $("#fill-in").hide()
    }), $(document).on("tap click", ".search-qr-code", function(e) {
        preventDefault(e), $(".intell").is(":hidden") ? ($(".intell").addClass("show"), $(".vip-b").addClass("qr-code").show(), _hmt.push(["_trackEvent", Lang.qrcode_tip, "none", "none"])) : ($(".intell").removeClass("show"), $(".vip-b").removeClass("qr-code").hide())
    }), $(document).on("tap click", ".vip-b.qr-code", function(e) {
        $(".intell").removeClass("show"), $(".vip-b").removeClass("qr-code").hide()
    }), $(document).on("click", '#jifen-receive a[href="javascript:;"]', function() {
        if (ee) return !1;
        var e = $(this);
        if (e.hasClass("disabled")) return !1;
        var a = e.data("type"),
            t = e.data("jifen"),
            n = e.parents("#jifen-receive").data("url"),
            i = {};
        return !(!a || !n) && (i.type = a, ee = !0, void $.ajax({
                type: "post",
                url: n,
                data: i,
                complete: function() {
                    ee = !1
                },
                success: function(e) {
                    1e4 == e.code ? swal({
                            title: Lang.points_tip_1 + '<span style="color: #df453d;">' + t + "</span>" + Lang.points_tip_2,
                            text: Lang.points_tip_3,
                            type: "success",
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.confirm_btn,
                            cancelButtonText: Lang.cancel_btn,
                            html: !0
                        }, function() {
                            document.location.reload()
                        }) : swal({
                            title: e.msg,
                            type: "error",
                            showCancelButton: !1,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.confirm_btn,
                            cancelButtonText: Lang.cancel_btn
                        })
                }
            }))
    }), $(document).on("click", "#jifen-exchange-vip a", function() {
        if (ee) return !1;
        var e = $(this);
        if (e.hasClass("disabled")) return !1;
        var a = $("#current-jifen"),
            t = a.data("jifen") || 0;
        t = parseInt(t);
        var n = e.data("type"),
            i = e.data("title"),
            o = e.data("jifen"),
            s = e.parents("#jifen-exchange-vip").data("url"),
            r = {};
        return t < o ? (swal(Lang.points_tip_4), !1) : !(!n || !s) && (r.type = n, void swal({
                title: i,
                confirmButtonColor: "#33ba95",
                confirmButtonText: Lang.confirm_btn,
                cancelButtonText: Lang.cancel_btn,
                showCancelButton: !0
            }, function(e) {
                return !!e && (ee = !0, void setTimeout(function() {
                        $.ajax({
                            type: "post",
                            url: s,
                            data: r,
                            complete: function() {
                                ee = !1
                            },
                            success: function(e) {
                                1e4 == e.code ? swal({
                                        title: e.msg,
                                        type: "success",
                                        confirmButtonColor: "#33ba95",
                                        confirmButtonText: Lang.confirm_btn,
                                        cancelButtonText: Lang.cancel_btn
                                    }, function() {
                                        document.location.reload()
                                    }) : swal({
                                        title: e.msg,
                                        type: "error",
                                        confirmButtonColor: "#33ba95",
                                        confirmButtonText: Lang.confirm_btn,
                                        cancelButtonText: Lang.cancel_btn
                                    })
                            }
                        })
                    }, 100))
            }))
    });
    var Ke;
    $(document).on("ajaxComplete", function(e, a) {
        var t = a.getResponseHeader("Content-Analysis"),
            n = "/api/analysis";
        return !!t && (n += "?anl=" + t + "&t=" + +new Date, Ke || (Ke = document.createElement("img"), Ke.border = 0, Ke.style.display = "none", Ke.width = 1, Ke.height = 1, document.getElementsByTagName("head")[0].appendChild(Ke)), void(Ke.src = n))
    }), $(document).on("click", ".wechat-share-float p, .wechat-share-show", function(e) {
        wechatSharePop()
    }), window.isWechat && $(".wechat-open-safari-show").on("click", function(e) {
        var a, t = $(this);
        a = 0 == t.data("platform") ? ".open-safari" : ".open-broser", t.data("openbroser") && (e.preventDefault(), $(a).is(":hidden") ? ($(a).show(), $(".vip-b").addClass("wechat-share").show()) : ($(".vip-b").removeClass("wechat-share").hide(), $(a).hide()))
    }), $(document).on("tap click", ".vip-b.wechat-share, .arrow, .open-safari, .open-broser", function(e) {
        $(".vip-b").removeClass("wechat-share").hide(), $(".arrow").hide(), $(".open-safari").hide(), $(".open-broser").hide(), e.preventDefault()
    }), $(".wechat-share-show").hover(function() {
        "undefined" == typeof wechatConfig && $("#article-show-qrcode").show()
    }, function() {
        $("#article-show-qrcode").hide()
    }), $(document).on("click", ".message .show-msg", function() {
        var e = $(this),
            a = e.parents("tr"),
            t = a.data("id"),
            n = $(".msg-container");
        a.hasClass("read") || $.get("/account/readMessage/id/" + t, function(e) {
            a.addClass("read")
        });
        var i = a.find(".msg-content"),
            o = i.find(".msg-title").html(),
            s = i.find(".msg-time").html(),
            r = i.find(".msg-desc-all").html();
        if (n.find(".title-second").html("<span></span>" + o), n.find(".time").html(s), n.find(".content").html(r), n.removeClass("hide").addClass("show"), window.isMobile) {
            var d = $(".head.navbar").outerHeight(),
                c = $(window).height();
            n.css({
                position: "fixed",
                top: d,
                height: c + 20,
                paddingBottom: d + 25
            }), n.find(".content").css({
                height: n.height() - n.find(".title-second").outerHeight(!0) - n.find(".msg-detail .time").outerHeight(!0) - n.find(".msg-detail .mobile-button-box").outerHeight(!0)
            })
        } else n.css({
            top: ($(window).height() - n.height()) / 2
        }), $(".vip-b").show()
    }), $(document).on("click", ".msg-container .close-msg", function() {
        var e = $(this),
            a = e.parents(".msg-container");
        a.addClass("hide-animation"), setTimeout(function() {
            a.removeClass("show").removeClass("hide-animation")
        }, 300), window.isMobile || $(".vip-b").hide()
    }), $(".globalrank-list").length && !window.isMobile && ($(".appicon-name").hover(function() {
        var e = $(this).attr("class").match(/appid_(\d+)\s?/i)[1] || 0,
            a = ".appid_" + e;
        $(a).addClass("appicon-name-selected")
    }, function() {
        var e = $(this).attr("class").match(/appid_(\d+)\s?/i)[1] || 0,
            a = ".appid_" + e;
        $(a).removeClass("appicon-name-selected")
    }), $(".appicon-name").mousemove(function(e) {
        if (e.target.className.indexOf("tooltip") !== -1) {
            var a = $(e.target),
                t = e.offsetX,
                n = a.width();
            t < n && $(this).trigger("mouseout")
        }
    }), $(".appicon-name img").tooltip({
        placement: "left",
        html: 1,
        delay: {
            show: 50,
            hide: 0
        }
    }), $(document).on("scroll", function() {
        $(document).scrollTop() > 155 ? $(".globalrank thead tr").addClass("fixed") : $(".globalrank thead tr").removeClass("fixed")
    })), $(document).on("click", "#container.container-keyword-expand .expand-method .method", function() {
        var e = $(this),
            a = e.data("name");
        e.addClass("active").siblings().removeClass("active"), $("#expand-method-list").removeClass("one two three").addClass(a), "three" == a && ea(), ta($("#expand-detail-" + a))
    }), $(document).on("focus", "#expand-method-form-one input", function() {
        $(this).parents(".form-group").removeClass("has-error")
    }), $(document).on("submit", "#expand-method-form-one", function() {
        var e = $(this),
            a = e.find('input[type="text"]'),
            t = a.val();
        if (t = $.trim(t), !t) return !1;
        t = t.split(/,|，/);
        for (var n = [], i = 0, o = t.length; i < o; i++) {
            for (var s = i + 1; s < o; s++) t[i] === t[s] && (s = ++i);
            n.push(t[i])
        }
        if (t = n, t.length > 5) return a.parents(".form-group").addClass("has-error"), !1;
        $("#checkbox-operate-cover").prop("checked", !1);
        var r = $("#expand-detail-one");
        r.find(".spinner-bg").show();
        var d = "",
            c = "";
        $.map(t, function(e, a) {
            c || (c = e), d += '<a href="javascript:;" class="tab' + (0 == a ? " active" : "") + '">' + e + "</a>"
        }), r.find(".aso100-nav-label").html(d);
        var l = r.data("ajaxurl");
        return $.getJSON(l + "/" + c, function(e) {
            e.data.list;
            r.find(".aso100-nav-label a:eq(0)").data("data", e.data), Ze(r.find("table"), e.data.list), r.find(".spinner-bg").hide()
        }), r.removeClass("hide"), ta(r), !1
    }), $(document).on("click", "#expand-detail-one .aso100-nav-label .tab", function() {
        var e, a = $(this),
            t = a.html(),
            n = (+new Date, $("#expand-detail-one"));
        if (a.hasClass("life")) return !1;
        if (a.addClass("active life").siblings().removeClass("active life"), $("#checkbox-operate-cover").prop("checked", !1), e = a.data("data")) Ze(n.find("table"), e.list);
        else {
            n.find(".spinner-bg").show();
            var i = n.data("ajaxurl");
            $.getJSON(i + "/" + t, function(e) {
                a.data("data", e.data), Ze(n.find("table"), e.data.list), n.find(".spinner-bg").hide()
            })
        }
    }), $(document).on("click", "#expand-method-list .checkbox_all", function() {
        var e = $(this),
            a = e.parents(".table");
        a.find("tbody .aso-checkbox").not($(".disabled")).find("input").prop("checked", e.prop("checked"))
    }), $(document).on("click", "#checkbox-operate-cover", function() {
        var e = $(this),
            a = e.parents(".expand-detail"),
            t = a.find(".table").DataTable();
        e.prop("checked") ? t.columns(5).search("^\\d+$", !0, !1).draw() : t.columns(5).search("").draw()
    }), $(document).on("click", "#checkbox-operate-added", function() {
        var e = $(this);
        e.prop("checked") ? $(".disabled-row").hide() : $(".disabled-row").show()
    });
    var Ze = function(e, a) {
        var t = e,
            n = t.data("keywordurl"),
            i = t.data("hintsurl"),
            o = t.data("numberurl");
        return !!t && void t.DataTable({
                destroy: !0,
                data: a,
                order: [],
                lengthMenu: [100],
                lengthChange: !1,
                searching: !0,
                autoWidth: !1,
                createdRow: function(e, a, t) {
                    a[5] && $(e).addClass("hidden")
                },
                columnDefs: [{
                    orderable: !1,
                    data: function(e, a, t, n) {
                        var i = e[0],
                            o = "";
                        return e[5] && (o = "disabled"), '<div class="aso-checkbox ' + o + '"><input type="checkbox" name="word" id="checkbox_one_' + i + '" data-wordid="' + i + '" class="form-control checkbox_wordid" ' + o + '><label for="checkbox_one_' + i + '" class="' + o + '"><span></span></label></div>'
                    },
                    targets: 0
                }, {
                    orderable: !1,
                    data: function(e, a, t, i) {
                        if ("sort" === a) return e[5];
                        var o = e[1];
                        return '<a href="' + n + encodeURIComponent(o) + '" target="_blank">' + o + "</a>"
                    },
                    targets: 1
                }, {
                    data: function(e, a, t, n) {
                        return '<a class="number" href="' + i + e[0] + '" target="_blank">' + e[2] + "</a>"
                    },
                    targets: 2
                }, {
                    data: function(e, a, t, n) {
                        return '<a class="number" href="' + o + e[0] + '" target="_blank">' + e[3] + "</a>"
                    },
                    targets: 3
                }, {
                    data: function(e, a, t, n) {
                        return e[6]
                    },
                    targets: 4
                }, {
                    searchable: !0,
                    data: function(e, a, t, n) {
                        return "sort" === a ? e[4] : e[4] > 0 ? e[4] : Lang.keyword_not_covered
                    },
                    targets: 5
                }, {
                    orderable: !1,
                    data: function(e, a, t, n) {
                        return e[5] ? '<a href="javascript:;" data-wordid="' + e[0] + '" class="btn btn-default">' + Lang.keyword_cancel_add + "</a>" : '<a href="javascript:;" data-wordid="' + e[0] + '" class="btn btn-custom">' + Lang.keyword_add_repertory + "</a>"
                    },
                    targets: 6
                }],
                language: {
                    sProcessing: Lang.dataTables_sProcessing,
                    sLengthMenu: Lang.dataTables_sLengthMenu,
                    sZeroRecords: Lang.dataTables_sZeroRecords,
                    sInfo: Lang.dataTables_sInfo,
                    sInfoEmpty: Lang.dataTables_sInfoEmpty,
                    sInfoFiltered: Lang.dataTables_sInfoFiltered,
                    sInfoPostFix: "",
                    sSearch: "",
                    sUrl: "",
                    sEmptyTable: Lang.dataTables_sEmptyTable,
                    sLoadingRecords: Lang.dataTables_sLoadingRecords,
                    sInfoThousands: ",",
                    oPaginate: {
                        sFirst: Lang.dataTables_sFirst,
                        sPrevious: "<",
                        sNext: ">",
                        sLast: Lang.dataTables_sLast
                    },
                    oAria: {
                        sSortAscending: Lang.dataTables_sSortAscending,
                        sSortDescending: Lang.dataTables_sSortDescending
                    }
                }
            })
    };
    $(document).on("focus", "#expand-detail-two .form-control", function() {
        var e = $(this),
            a = e.parents("form").find(".search-app-list");
        a.children().length && a.show(), $("html, body").animate({
            scrollTop: "210px"
        }, 200)
    }), $(document).on("keydown", "#expand-detail-two .form-control", function(e) {
        13 == e.keyCode && e.preventDefault()
    }), $(document).on("keyup input paste", "#expand-detail-two .form-control", function() {
        var e = $(this),
            a = e.val(),
            t = e.parents("form"),
            n = t.find(".search-app-list"),
            i = window.listAppids || [];
        clearTimeout(window.searching), a = $.trim(a), !a && n.find(".search-title").length && n.html(n.data("html")).hide(), a && a.indexOf("'") === -1 && (window.searching = setTimeout(function() {
            var e = t.attr("action");
            e && $.getJSON(e + a, function(e) {
                if (1e4 == e.code) {
                    var t = '<span class="search-title">「' + a + "」" + Lang.keyword_search_result + "</span>";
                    e.list.length ? $.map(e.list, function(e, a) {
                            $.inArray(parseInt(e.app_id), i) > -1 || (t += '<li class="media item">', t += '<a href="javascript:;" data-appid="' + e.app_id + '">', t += '<div class="media-left media-middle">', t += '<img class="media-object" src="' + e.icon + '" alt="' + e.app_name + '">', t += "</div>", t += '<div class="media-body">', t += '<h4 class="media-heading">' + e.app_name + "</h4>", t += '<div class="media-auther">' + e.publisher + "</div>", t += "</div>", t += "</a>", t += "</li>")
                        }) : t += '<li class="media item no-data">' + Lang.search_no_result + "</li>", n.data("html") || n.data("html", n.html()), n.html(t).show()
                } else swal(e.msg)
            })
        }, 600))
    }), $(document).on("blur", "#expand-detail-two .form-control", function() {
        var e = $(this),
            a = $.trim(e.val()),
            t = e.parents("form").find(".search-app-list");
        !a && t.find(".search-title").length && t.hide()
    }), $(document).on("click", "#expand-detail-two .search-app-list .media a", function() {
        var e = $(this),
            a = e.parents(".search-app-list");
        appid = e.data("appid"), icon = e.find("img").attr("src"), appName = e.find(".media-heading").html(), publisher = e.find(".media-auther").html(), window.listAppids = window.listAppids || [];
        var t = $("#selected-app-list"),
            n = t.find(".col-md-10");
        if (n.children().length >= 3) return swal({
            title: Lang.keyword_expend_show_app
        }, function() {
            a.hide()
        }), !1;
        var i = "";
        i += '<div class="thumbnail">', i += '<img src="' + icon + '">', i += '<div class="caption">', i += '<p><a href="/app/rank/appid/' + appid + '" target="_blank">' + appName + "</a></p>", i += "</div>", i += '<div class="subscribe-modify" data-appid="' + appid + '"><span class="glyphicon-subscribe-remove"></span></div>', i += "</div>", $("#selected-app-list").show().find(".col-md-10").append(i), e.parent().addClass("hide appid" + appid), window.listAppids.push(appid), a.hide(), a.find(".competi").length == a.find(".competi.hide").length && a.find(".competi-title").hide(), a.find(".same").length == a.find(".same.hide").length && a.find(".same-title").hide()
    }), $(document).on("click", "#selected-app-list .subscribe-modify", function() {
        var e, a = $(this),
            t = a.data("appid"),
            n = a.parent();
        $("#expand-detail-two .search-app-list").find(".appid" + t).removeClass("hide appid" + t), n.siblings().length || $("#selected-app-list").hide(), n.remove(), $.inArray(t, window.listAppids) > -1 && (e = $.inArray(t, window.listAppids), window.listAppids.splice(e, 1))
    }), $(document).on("click", "#selected-app-list .btn", function() {
        var e = $(this),
            a = $("#selected-app-list"),
            t = a.find(".col-md-10").children(),
            n = [];
        if (!t.length) return !1;
        $.map(t, function(e) {
            n.push($(e).find(".subscribe-modify").data("appid"))
        });
        var i = $("#expand-detail-two");
        i.find(".spinner-bg").show(), i.find(".expand-detail").removeClass("hide");
        var o = e.data("ajaxurl");
        $.getJSON(o + n.join(","), function(e) {
            Qe(i.find("table"), e.list), i.find(".spinner-bg").hide()
        })
    });
    var Qe = function(e, a) {
            var t = e,
                n = $("#selected-app-list .col-md-10").children(),
                i = t.data("keywordurl"),
                o = t.data("hintsurl"),
                s = $("#app").data("appid");
            if (!t) return !1;
            t.find(".add-app").remove();
            var r = 3,
                d = [];
            $.map(n, function(e) {
                var a = $(e),
                    n = a.find(".subscribe-modify").data("appid"),
                    i = a.find("img").attr("src"),
                    o = a.find(".caption a").html(),
                    s = '<th class="col-md-1 add-app"><img src="' + i + '" data-toggle="tooltip" title="' + o + '"><i class="icon icon-up"></i><i class="icon icon-down"></i></th>';
                t.find(".large th:eq(" + r + ")").after(s), r++, d.push({
                    data: function(e, a, t, i) {
                        var o = JSON.parse(e[3]);
                        return o[n] ? o[n] : "-"
                    },
                    targets: r
                })
            }), t.hasClass("dataTable") && t.DataTable().clear(), d.push({
                orderable: !1,
                data: function(e, a, t, n) {
                    var i = e[0],
                        o = "";
                    return e[r] && (o = "disabled"), '<div class="aso-checkbox ' + o + '"><input type="checkbox" name="word" id="checkbox_two_' + i + '" data-wordid="' + i + '" class="form-control checkbox_wordid" ' + o + '><label for="checkbox_two_' + i + '" class="' + o + '"><span></span></label></div>'
                },
                targets: 0
            }), d.push({
                orderable: !1,
                data: function(e, a, t, n) {
                    var o = e[1];
                    return '<a href="' + i + encodeURIComponent(o) + '" target="_blank">' + o + "</a>"
                },
                targets: 1
            }), d.push({
                data: function(e, a, t, n) {
                    return '<a class="number" href="' + o + e[0] + '" target="_blank">' + e[2] + "</a>"
                },
                targets: 2
            }), d.push({
                data: function(e, a, t, n) {
                    var i = JSON.parse(e[3]);
                    return i[s] ? i[s] : "-"
                },
                targets: 3
            }), d.push({
                orderable: !1,
                data: function(e, a, t, n) {
                    return e[r] ? '<a href="javascript:;" data-wordid="' + e[0] + '" class="btn btn-default">' + Lang.keyword_cancel_add + "</a>" : '<a href="javascript:;" data-wordid="' + e[0] + '" class="btn btn-custom">' + Lang.keyword_add_repertory + "</a>"
                },
                targets: r + 1
            }), t.DataTable({
                destroy: !0,
                data: a,
                lengthMenu: [100, 1e3],
                lengthChange: !1,
                searching: !0,
                autoWidth: !1,
                createdRow: function(e, a, t) {
                    a[4] && $(e).addClass("hidden")
                },
                columnDefs: d,
                initComplete: function() {
                    t.find('[data-toggle="tooltip"]').tooltip({
                        delay: {
                            show: 100,
                            hide: 100
                        }
                    })
                },
                language: {
                    sProcessing: Lang.dataTables_sProcessing,
                    sLengthMenu: Lang.dataTables_sLengthMenu,
                    sZeroRecords: Lang.dataTables_sZeroRecords,
                    sInfo: Lang.dataTables_sInfo,
                    sInfoEmpty: Lang.dataTables_sInfoEmpty,
                    sInfoFiltered: Lang.dataTables_sInfoFiltered,
                    sInfoPostFix: "",
                    sSearch: "",
                    sUrl: "",
                    sEmptyTable: Lang.dataTables_sEmptyTable,
                    sLoadingRecords: Lang.dataTables_sLoadingRecords,
                    sInfoThousands: ",",
                    oPaginate: {
                        sFirst: Lang.dataTables_sFirst,
                        sPrevious: "<",
                        sNext: ">",
                        sLast: Lang.dataTables_sLast
                    },
                    oAria: {
                        sSortAscending: Lang.dataTables_sSortAscending,
                        sSortDescending: Lang.dataTables_sSortDescending
                    }
                }
            })
        },
        ea = function() {
            var e = $("#expand-detail-three"),
                a = e.data("ajaxurl");
            return !e.data("getdata") && (e.find(".spinner-bg").show(), e.data("getdata", 1), void $.getJSON(a, function(a) {
                    aa(e.find("table"), a.list), e.find(".spinner-bg").hide()
                }))
        },
        aa = function(e, a) {
            var t = e,
                n = ($("#selected-app-list .col-md-10").children(), t.data("keywordurl")),
                i = t.data("hintsurl"),
                o = t.data("numberurl");
            $("#app").data("appid");
            if (!t) return !1;
            t.hasClass("dataTable") && t.DataTable().clear();
            var s = [];
            s.push({
                orderable: !1,
                data: function(e, a, t, n) {
                    var i = e[0],
                        o = "";
                    return e[5] && (o = "disabled"), '<div class="aso-checkbox ' + o + '"><input type="checkbox" name="word" id="checkbox_three_' + i + '" data-wordid="' + i + '" class="form-control checkbox_wordid" ' + o + '><label for="checkbox_three_' + i + '" class="' + o + '"><span></span></label></div>'
                },
                targets: 0
            }), s.push({
                orderable: !1,
                data: function(e, a, t, i) {
                    var o = e[1];
                    return '<a href="' + n + encodeURIComponent(o) + '" target="_blank">' + o + "</a>"
                },
                targets: 1
            }), s.push({
                data: function(e, a, t, n) {
                    return '<a class="number" href="' + i + e[0] + '" target="_blank">' + e[2] + "</a>"
                },
                targets: 2
            }), s.push({
                data: function(e, a, t, n) {
                    return '<a class="number" href="' + o + e[0] + '" target="_blank">' + e[3] + "</a>"
                },
                targets: 3
            }), s.push({
                data: function(e, a, t, n) {
                    return e[4]
                },
                targets: 4
            }), s.push({
                orderable: !1,
                data: function(e, a, t, n) {
                    return e[5] ? '<a href="javascript:;" data-wordid="' + e[0] + '" class="btn btn-default">' + Lang.keyword_cancel_add + "</a>" : '<a href="javascript:;" data-wordid="' + e[0] + '" class="btn btn-custom">' + Lang.keyword_add_repertory + "</a>"
                },
                targets: 5
            }), t.DataTable({
                destroy: !0,
                data: a,
                lengthMenu: [100, 1e3],
                lengthChange: !1,
                searching: !0,
                autoWidth: !1,
                createdRow: function(e, a, t) {
                    a[5] && $(e).addClass("hidden")
                },
                columnDefs: s,
                initComplete: function() {
                    t.find('[data-toggle="tooltip"]').tooltip({
                        delay: {
                            show: 100,
                            hide: 100
                        }
                    })
                },
                language: {
                    sProcessing: Lang.dataTables_sProcessing,
                    sLengthMenu: Lang.dataTables_sLengthMenu,
                    sZeroRecords: Lang.dataTables_sZeroRecords,
                    sInfo: Lang.dataTables_sInfo,
                    sInfoEmpty: Lang.dataTables_sInfoEmpty,
                    sInfoFiltered: Lang.dataTables_sInfoFiltered,
                    sInfoPostFix: "",
                    sSearch: Lang.dataTables_sSearch,
                    sUrl: "",
                    sEmptyTable: Lang.dataTables_sEmptyTable,
                    sLoadingRecords: Lang.dataTables_sLoadingRecords,
                    sInfoThousands: ",",
                    oPaginate: {
                        sFirst: Lang.dataTables_sFirst,
                        sPrevious: "<",
                        sNext: ">",
                        sLast: Lang.dataTables_sLast
                    },
                    oAria: {
                        sSortAscending: Lang.dataTables_sSortAscending,
                        sSortDescending: Lang.dataTables_sSortDescending
                    }
                }
            })
        },
        ta = function(e) {
            if (!e.length) return !1;
            $.fn.dataTable.ext.search = [];
            var a = e.find(".datatable-ext-search"),
                t = a.find(".ext-search-hints");
            t.length && $.fn.dataTable.ext.search.push(function(e, a, n) {
                var i = t.data("column"),
                    o = parseInt(t.find(".min").val(), 10),
                    s = parseInt(t.find(".max").val(), 10),
                    r = parseFloat(a[i]) || 0;
                return !!(isNaN(o) && isNaN(s) || isNaN(o) && r <= s || o <= r && isNaN(s) || o <= r && r <= s)
            });
            var n = a.find(".ext-search-result");
            n.length && $.fn.dataTable.ext.search.push(function(e, a, t) {
                var i = n.data("column"),
                    o = parseInt(n.find(".min").val(), 10),
                    s = parseInt(n.find(".max").val(), 10),
                    r = parseFloat(a[i]) || 0;
                return !!(isNaN(o) && isNaN(s) || isNaN(o) && r <= s || o <= r && isNaN(s) || o <= r && r <= s)
            });
            var i = a.find(".ext-search-rank");
            i.length && $.fn.dataTable.ext.search.push(function(e, a, t) {
                var n = i.data("column"),
                    o = parseInt(i.find(".min").val(), 10),
                    s = parseInt(i.find(".max").val(), 10),
                    r = parseFloat(a[n]) || 0;
                if ("string" == typeof n && n.indexOf(",") != -1) {
                    if (isNaN(o) && isNaN(s)) return !0;
                    var d = !1;
                    return n = n.split(","), $.map(n, function(e) {
                        e > a.length - 2 || (colValue = parseFloat(a[e]), isNaN(colValue) || (isNaN(o) && colValue <= s || isNaN(s) && o <= colValue || o <= colValue && colValue <= s) && (d = !0))
                    }), d
                }
                return !!(isNaN(o) && isNaN(s) || isNaN(o) && r <= s || o <= r && isNaN(s) || o <= r && r <= s)
            }), a.find(".btn-group input").on("keyup", function() {
                var t = $(this),
                    n = t.parents(".screen-nav");
                t.val() ? t.addClass("hasData") : t.removeClass("hasData"), n.find(".hasData").length ? a.find(".clear-screen").show() : a.find(".clear-screen").hide(), e.find(".table").DataTable().draw()
            }), a.find(".clear-screen").on("click", function() {
                a.find(".screen-nav input").val(""), e.find(".table").DataTable().draw(), $(this).hide()
            })
        };
    $(document).on("click", "#expand-method-list .table tbody td .btn", function() {
        var e, a, t, n = $(this),
            i = n.data("wordid"),
            o = $("#expand-method-list").data("addexpand"),
            s = $("#expand-method-list").data("deleteexpand"),
            r = $("#expand-detail-one .aso100-nav-label .tab.active");
        e = n.parents("tr").index(), n.hasClass("btn-default") ? $.getJSON(s + "/wordid/" + i, function(t) {
                1e4 == t.code ? (r.length && (a = r.data("data").list, a[e][5] = 0), n.html(Lang.keyword_add_repertory).addClass("btn-custom").removeClass("btn-default").blur(), n.parents("tr").find('input[type="checkbox"]').removeAttr("disabled"), n.parents("tr").find(".aso-checkbox").removeClass("disabled").find("label").removeClass("disabled")) : swal(t.msg)
            }) : (t = $("#container.container-keyword-expand .expand-method .method.active").data("values"), $.getJSON(o + i + "/source/" + t, function(t) {
                1e4 == t.code ? (r.length && (a = r.data("data").list, a[e][5] = 1), n.html(Lang.keyword_cancel_add).addClass("btn-default").removeClass("btn-custom").blur(), n.parents("tr").fadeOut().find('input[type="checkbox"]').attr("disabled", !0), n.parents("tr").find(".aso-checkbox").addClass("disabled").find("label").addClass("disabled")) : swal(t.msg)
            }))
    }), $(document).on("click", "#expand-method-list .add-expand-multi", function() {
        var e, a, t, n = $(this),
            i = $("#expand-method-list").data("addmultiexpand"),
            o = n.parents(".expand-detail").find(".table"),
            s = o.find(".checkbox_wordid:checked"),
            r = $("#expand-detail-one .aso100-nav-label .tab.active"),
            d = [];
        $.map(s, function(e) {
            var a = $(e),
                t = a.data("wordid");
            t && a.prop("checked") && !a.parents("tr").find(".btn").hasClass("btn-default") && d.push(t)
        }), d.length && (t = $("#container.container-keyword-expand .expand-method .method.active").data("values"), $.post(i, {
            words: d.join(","),
            source: t
        }, function(t) {
            $(".container-keyword-expand #checkbox_one_all, .container-keyword-expand #checkbox_two_all, .container-keyword-expand #checkbox_three_all").removeAttr("checked"), 1e4 == t.code ? $.map(s, function(n) {
                    var i = $(n);
                    r.length && (a = r.data("data").list, e = i.parents("tr").index(), a[e][5] = 1), i.parents("tr").addClass("hidden").find(".btn").html(Lang.keyword_cancel_add).addClass("btn-default").removeClass("btn-custom"), i.parents("tr").find('input[type="checkbox"]').removeAttr("checked").attr("disabled", !0), i.parents("tr").find(".aso-checkbox").addClass("disabled").find("label").addClass("disabled"), swal({
                        title: d.length + Lang.keyword_muti_succ,
                        type: "success",
                        showCancelButton: !0,
                        confirmButtonText: Lang.keyword_expend_show_repertory,
                        cancelButtonText: Lang.keyword_expend_goon_add
                    }, function() {
                        window.open(t.url)
                    })
                }) : swal(t.msg)
        }))
    }), $(document).on("click", "#keyword-repertory-container .change-word", function() {
        var e, a, t, n, i, o, s, r = $(this),
            d = $("#repertory-box #name-box"),
            c = $("#repertory-box #keyword-box");
        e = r.data("state"), a = r.data("type"), n = r.data("id"), i = r.data("word");
        var l = $("#keyword-extend-user").data("updateurl") + r.data("id") + "/type/" + a;
        e && (l += "/state/" + e), $.getJSON(l, {}, function(l) {
            return 1e4 != l.code ? (swal(l.msg), !1) : void(1 == e ? (d.find(".empty-tips").hide(), r.data("state", 2), "word" == a ? (t = '<a href="javascript:;" class="btn btn-border change-word word-' + n + '" data-type="word" data-id="' + n + '">' + i + '<span class="iconfont icon-guanbi"></span></a>', c.append(t)) : (t = '<a href="javascript:;" class="btn btn-border change-word word-' + n + '" data-type="name" data-id="' + n + '">' + i + '<span class="iconfont icon-guanbi"></span></a>', d.append(t))) : ("word" == a ? (s = $(".table-word-" + n), o = c.find(".word-" + n)) : (s = $(".table-name-" + n), o = d.find(".word-" + n)), s.data("state", 1), s.removeAttr("checked"), o.fadeOut("fast", function() {
                        o.remove(), c.find("a").length || d.find("a").length || d.find(".empty-tips").show()
                    })))
        })
    }), $(document).on("click", "#keyword-repertory-container .extword-remove", function(e) {
        var a, t, n, i = $(this);
        a = i.data("id"), n = i.data("groupid"), t = $("#keyword-extend-user").data("deleteurl") + a, $.getJSON(t, {}, function(e) {
            return 1e4 != e.code ? (swal(e.msg), !1) : void f(a, n)
        })
    }), $(document).on("click", "#keyword-repertory-container #group-list-nav .group .remove-group", function(e) {
        var a, t, n, i = $(this);
        swal({
            title: Lang.keyword_expend_confirm_del_group,
            type: "warning",
            showCancelButton: !0
        }, function() {
            t = i.parent("a"), n = t.parent("div").data("delurl"), a = t.data("groupid"), $.ajax({
                url: n,
                type: "POST",
                dataType: "json",
                data: {
                    group_id: a
                }
            }).done(function(e) {
                return 1e4 != e.code ? (swal(e.msg), !1) : (t.prev().click(), t.remove(), $('.group-change-select option[value="' + a + '"]').remove(), $('#select-group-temp .select option[value="' + a + '"]').remove(), void 0)
            }).fail(function() {
                swal(Lang.request_error)
            })
        })
    }), h(), $(document).on("change", ".table-operate .group-change-select", function() {
        var e = $('.keyword-repertory-tr .aso-checkbox input[type="checkbox"]'),
            a = $(".group-change-select").val(),
            t = "",
            n = ($("#groupData"), $(".table-operate .group-change-select"));
        return a != -1 && (setInterval(function() {
                $("#select2-select-basic-single-results .select2-results__option--highlighted").attr("aria-selected", "false")
            }, 100), n.val(-1), $("#select2-select-basic-single-container").text(n.find("option:first-child").text()), e.each(function(e, a) {
                $(this).prop("checked") && (t += $(this).val() + ",")
            }), t = t.substring(0, t.length - 1), a ? void m(t, a, function() {
                    e.each(function(e, a) {
                        $(this).removeAttr("checked")
                    })
                }) : (swal(Lang.keyword_select2_placehoder), !1))
    }), $(document).on("click", ".table-operate .del-expand-multi", function() {
        var e, a = $(this),
            t = a.data("url"),
            n = $("#checkbox_all"),
            i = $('.keyword-repertory-tr .aso-checkbox input[type="checkbox"]'),
            o = "",
            s = "";
        return i.each(function(e, a) {
            $(this).prop("checked") && (o += $(this).val() + ",", s += $(this).data("groupid") + ",")
        }), o = o.substring(0, o.length - 1), s = s.substring(0, s.length - 1), o ? void $.ajax({
                url: t,
                type: "GET",
                dataType: "json",
                data: {
                    ids: o
                }
            }).done(function(a) {
                1e4 == a.code ? (s = s.split(","), $.each(o.split(","), function(a, t) {
                        e = s[a], f(t, e)
                    })) : swal(a.msg)
            }).fail(function() {
                swal(Lang.request_error)
            }).complete(function() {
                n.removeAttr("checked")
            }) : (swal(Lang.keyword_selct_word), !1)
    }), $(document).on("change", ".keyword-expand-list .group-change-select", function(e) {
        var a, t = $(this);
        a = t.parents("div.select-group-row").data("id"), m(a, t.val())
    }), $(document).on("click", "#group-list-nav .group", function(e) {
        e.preventDefault();
        var a, t, n = $(this),
            i = $("#checkbox_all");
        n.addClass("active life").siblings().removeClass("active life"), i.removeAttr("checked"), a = "." + n.data("classname"), t = $(a).val(), t = t ? $.parseJSON(t) : [], window.keywordExtend.clear().rows.add(t).draw()
    }), $(document).on("click", "#add-keyword-extend", function() {
        var e = $(this);
        e.addClass("disabled"), e.attr("disabled", !0);
        var a = e.data("url"),
            t = $('.aso100-nav-select input[name="keyword"]'),
            n = t.val();
        wordLang = t.attr("placeholder"), n || swal(wordLang), $.getJSON(a, {
            word: n
        }, function(a, n) {
            if (e.removeClass("disabled"), e.attr("disabled", !1), 1e4 != a.code) swal(a.msg);
            else {
                var i = $.parseJSON(a.groupData);
                tableData = $.parseJSON($(".groupData_0").val()), tableData.unshift(i), $(".groupData_0").val(JSON.stringify(window.tableData)), $($("#group-list-nav").children(".group").get(0)).click(), t.val("")
            }
        })
    }), $(document).on("click", "#checkbox_all", function(e) {
        var a = $('.keyword-repertory-tr .aso-checkbox input[type="checkbox"]');
        $(this).prop("checked") ? a.each(function(e, a) {
                $(this).prop("checked", !0)
            }) : a.each(function(e, a) {
                $(this).removeAttr("checked")
            })
    }), g(), $(document).on("click", "#repertory-box #go-help", function(e) {
        e.preventDefault();
        var a, t = $(this),
            n = $("#repertory-box");
        a = t.attr("href"), n.find(".change-word").length ? location.href = a : swal(Lang.keyword_not_selected)
    }), !
        function() {
            var e = $(".invite .preview-warp .preview-btn"),
                a = $(".invite .preview-warp .preview-show"),
                t = null,
                n = null;
            e.hover(function() {
                n = setTimeout(function() {
                    a.fadeIn(), t = t || a.position().left, e.addClass("first"), e.hasClass("first") && a.css("left", t + 8 + "px")
                }, 200)
            }, function() {
                clearTimeout(n), a.fadeOut()
            })
        }(), $(document).on("click", ".invite #btn-invite", function() {
        var e = $(this),
            a = e.parents("form"),
            t = a.find("input");
        return t.val() ? (e.addClass("disabled"), e.attr("disabled", !0), void $.ajax({
                type: "POST",
                url: a.attr("action"),
                data: a.serialize(),
                success: function(a) {
                    e.removeClass("disabled"), e.attr("disabled", !1), 1e4 == a.code && t.val(""), swal(a.msg)
                }
            })) : (swal("请输入邮箱地址"), !1)
    }), $(document).on("order.dt", ".keyword-list table.table", function() {
        var e = $(this),
            a = e.DataTable().order();
        if (!a.length) return !1;
        var t, n, i, o = a[0][0],
            s = a[0][1];
        t = e.find("th:eq(" + o + ")"), n = t.find(".icon-up"), i = t.find(".icon-down"), t.siblings().find(".icon").removeClass("active"), t.siblings().find(".iconfont").removeClass("active"), "asc" == s ? (n.addClass("active"), i.removeClass("active")) : (n.removeClass("active"), i.addClass("active"))
    });
    var na = !1;
    $(document).on("click", ".global-rank-info", function() {
        var e, a = ($(".global-rank-info"), $(" #global-maps-charts")),
            t = $("#global-maps-charts-nav"),
            n = $("#all-global-maps-charts-tr-inner-div .spinner-box"),
            i = $(this);
        a.hide(), t.hide();
        var o;
        na ? e = $(".all-global-maps-charts-tr") : (e = $('<tr class="all-global-maps-charts-tr  show-animation" style="display:none"><td colspan="5"></td></tr>'), e.find("td").html($("#all-global-maps-charts-tr-inner-div")), e.insertAfter(i.parents("tr")), na = !0), i.parents("tr").next().is(e) ? o = i.parents("tr").next().css("display") : (e.insertAfter(i.parents("tr")), o = "none"), "table-row" == o ? e.hide() : (e.show(), n.show()), $("html body").animate({
            scrollTop: i.parents("td").offset().top - 50 + "px"
        }, 500);
        var s = t.data("ajaxpreurl"),
            r = i.data("appid");
        s += r, t.data("ajaxurl", s), $(".globalranktrend-list .show-view-details").attr("href", i.parents("tr").find("a")[0].href.replace("rank", "globalRank")), $.ajax({
            type: "get",
            url: s,
            data: {
                device: t.find(".active").data("device")
            },
            dataType: "json",
            success: function(e) {
                n.hide(), a.show(), t.show(), t.find(".active").data("data", JSON.stringify(e)), Le(a, e)
            }
        })
    }), $(document).on("tap click", ".link-to-next", function(e) {
        return e && e.preventDefault ? e.preventDefault() : window.event.returnValue = !1, loginByAlert(this), !1
    }), $(document).on("tap click", "#alert-signIn", function(e) {
        if ("alert-signIn" == e.target.id || e.target.className.indexOf("alert-signIn-circle") != -1 || e.target.className.indexOf("alert-close") != -1) {
            var a = $("#alert-signIn");
            a.hide();
            var t = a.data("extendClass");
            return t && a.removeClass(t).data("extendClass", ""), !1
        }
    }), $(document).on("scroll", function(e) {
        $(document).scrollTop() > 235 ? $(".top-appinfo").fadeIn(400) : $(".top-appinfo").fadeOut(400)
    }), $(document).on("tap", ".container-keyword .more", function() {
        var e = $(".keyword-info");
        return e.css({
            maxHeight: "initial"
        }), $(this).hide(), !1
    }), $(document).on("tap", ".panel .panel-info-show", function() {
        var e = $(".panel .show-list"),
            a = $(".panel .panel-info-show .caret");
        return txt = $(".panel .panel-info-show .txt"), "收起" == txt.html() ? (e.removeClass("show-list-show-animation").addClass("show-list-hide-animation"), a.addClass("bottom-caret").removeClass("top-caret"), txt.html("展示全部")) : (e.removeClass("show-list-hide-animation").addClass("show-list-show-animation"), a.addClass("top-caret").removeClass("bottom-caret"), txt.html("收起")), !1
    });
    var ia = $(".show-alert-btn .back-to-top"),
        oa = $(".show-alert-btn");
    ia.click(function() {
        $("body,html").animate({
            scrollTop: 0
        }, 500)
    }), $(document).on("scroll", function(e) {
        var a = $(this).scrollTop();
        bottom = $(document).height() - a - $(window).height() - $(".footer").outerHeight(), a > 700 ? oa.addClass("animation-show") : oa.removeClass("animation-show"), bottom <= 0 && oa.css("bottom", Math.abs(bottom) + 30 + "px")
    }), clickToHide($(".submit-feedback-guanbi"), $(".alert-submit-feedback"));
    var sa = $(".show-alert-btn").find(".feedback"),
        ra = $(".alert-submit-feedback");
    sa.click(function(e) {
        ra.fadeIn(400)
    }), $(document).on("click", ".submit-feedback-btn", function(e) {
        var a = $(".alert-submit-feedback"),
            t = {};
        return t.texts = a.find("textarea").val(), t.current_url = window.location.href, t.texts ? (b($(this), function() {
                swal("反馈信息提交成功!")
            }, t), void a.fadeOut("fast")) : (swal("请填写反馈信息"), !1)
    }), $(document).on("click", ".alter-default", function(e) {
        e.target.className.indexOf("alter-default") != -1 && $(this).fadeOut("fast")
    }), $(document).on("click", "#dataCenter #dchMessageTitle .dchm-title-tab a", function(e) {
        e.preventDefault(), $("#dchMessageTitle .dchm-title-tab").removeClass("active"), $(this).parents(".dchm-title-tab").addClass("active")
    }), $(document).on("click", "#dataCenter .dcbcBodyIos .remarks-info .remark-action", function(e) {
        e.preventDefault();
        var a = $(this),
            t = a.parents(".remarks-info"),
            n = t.find(".remark-desc"),
            i = t.find(".remark-input");
        n.hide(), a.hide(), i.show(), i.find("input").val(n.text()).focus()
    }), $(document).on("blur", "#dataCenter .dcbcBodyIos .remarks-info .remark-input input", function(e) {
        e.preventDefault();
        var a = $(this),
            t = a.parents(".remarks-info"),
            n = t.find(".remark-desc"),
            i = t.data("appid"),
            o = t.find(".remark-input"),
            s = t.find(".remark-action"),
            r = t.find(".remark-input input").val(),
            d = $("#remarkSaveUrl").val();
        return n.text() == r ? (o.hide(), s.show(), n.show(), !1) : (datas = {
                appid: i,
                remark: r
            }, void ajaxRequestAction(a, v, datas, d))
    }), $(document).on("keydown", "#dataCenter .dcbcBodyIos .remarks-info .remark-input input", function(e) {
        13 == e.keyCode && ($(this).trigger("blur"), e.preventDefault())
    }), $(document).on("click", ".invest-data-center .dcbct-body-action-td .action-group, .setting-investment .si-action-edit", function(e) {
        e.preventDefault();
        var a = $(this),
            t = a.next(".group-change-warp");
        return !!t.find("li").length && void(t.hasClass("in") ? t.fadeOut("fast", function() {
                    $(this).removeClass("in")
                }) : t.fadeIn("fast", function() {
                    $(this).addClass("in")
                }))
    }), $(document).on("click", ".setting-investment .group-change-warp a", function(e) {
        e.preventDefault();
        var a = $(this),
            t = a.text(),
            n = a.parents(".group-change-warp"),
            i = a.parents("tr"),
            o = i.find("td:eq(3)");
        ajaxRequestAction($(this), function(e, a, i) {
            1e4 == e.code ? o.text(t) : swal(e.msg), n.hide().removeClass("in")
        })
    }), $(document).on("click", ".invest-data-center .group-change-warp a", function(e) {
        e.preventDefault();
        var a = $(this),
            t = a.parents(".group-change-warp"),
            n = t.data("appid"),
            i = a.data("groupid"),
            o = $(".nav-tabs li.active").data("groupid"),
            s = $(".nav-tabs li.active a").attr("href"),
            r = $(s).find(".dcbc-table-body-myapp"),
            d = r.find(".dcbct-tbody-info-chart[data-appid='" + n + "']"),
            c = $("#changeGroupUrl").val();
        return o == i ? (t.hide(), !1) : void $.ajax({
                url: c,
                dataType: "json",
                data: {
                    appid: n,
                    groupid: i
                }
            }).done(function(e) {
                1e4 == e.code ? (swal(e.msg), $(".nav-tabs li[data-groupid='" + i + "']").addClass("ajax-request"), 0 != o && (r.find(".dcbct-tbody-info-chart").length <= 1 ? r.remove() : d.remove())) : swal(e.msg), t.hide()
            }).fail(function(e) {
                swal(Lang.request_error)
            })
    }), $(document).on("click", ".invest-data-center .dcbcBodyIos .dcbct-body-action-td .action-top", function(e) {
        e.preventDefault();
        var a = $(this),
            t = a.data("id"),
            n = a.parents(".dcbct-tbody-info-chart"),
            i = n.data("appid"),
            o = $("#stickTopUrl").val(),
            s = parseInt($("#isStickTopPop").data("ispop")),
            r = $("#isStickTopPop").data("msg"),
            d = {};
        if (1 == t) return !1;
        var c = function() {
            d = {
                appid: i
            }, ajaxRequestAction(a, w, d, o)
        };
        s && !$.cookie("stick_top") ? swal({
                title: r,
                type: "warning",
                showCancelButton: !0
            }, function() {
                $.cookie("stick_top", 1, {
                    path: "/",
                    expires: 1
                }), c()
            }) : c()
    }), $(document).on("click", "#dataCenter #dcbcBodyIos .dcbct-body-action-td .action-info", function(e) {
        e.preventDefault();
        var a = $(this),
            t = a.find("i"),
            n = a.data("id"),
            i = $(".nav-tabs li.active a").attr("href"),
            o = $(i).find(".dcbct-body-info-chart-warp-" + n);
        if (chartEle = a.parents(".dcbct-tbody-info-chart"), t.hasClass("icon-xiangxia1")) {
            "none" != chartEle.find(".dcbct-body-compete-chart-warp").css("display") && chartEle.find(".action-compete").trigger("click"), a.html('<i class="iconfont icon-xiangshang1"></i>收起'), o.fadeIn("fast").addClass("show-animation");
            var s = isMobile ? chartEle.offset().top - 49 + "rem" : chartEle.offset().top - 57 + "px";
            if (setTimeout(function() {
                    $("body").animate({
                        scrollTop: s
                    }, 380)
                }, 260), chartEle.hasClass("data-ready")) return !1;
            dataCenterLoadChartData(chartEle)
        } else a.html('<i class="iconfont icon-xiangxia1"></i>展开'), o.fadeOut("fast")
    }), $(document).on("click", "#dataCenter #dcbcBodyIos .dcbc-table-body-competi .action-rank", function(e) {
        var a = $(this),
            t = a.data("datas"),
            n = t.competiId;
        if (navActiveId = $(".nav-tabs li.active a").attr("href"), chartWarp = $(navActiveId).find(".dcbct-body-competi-chart-tr-" + n), chartEle = chartWarp.find(".chart-data"), xe = $("#competiRankUrl").val(), chartWarp.hasClass("in")) chartWarp.fadeOut("fast").removeClass("in");
        else {
            if (chartWarp.fadeIn("fast").addClass("show-animation in"), chartWarp.hasClass("data-ready")) return !1;
            params = {
                appid: n
            }, ajaxRequestAction(a, y, params, xe)
        }
    }), $(document).on("click", ".invest-data-center .nav-tabs .remove-group", function(e) {
        e.preventDefault();
        var a, t, n, i, o = $(this);
        swal({
            title: Lang.keyword_expend_confirm_del_group,
            type: "warning",
            showCancelButton: !0
        }, function() {
            t = o.parents("li"), n = t.parents(".nav-tabs").data("delurl"), i = $(t.find("a").attr("href")), a = t.data("groupid"), groupChangeWarp = $(".group-change-warp ul"), $.ajax({
                url: n,
                type: "POST",
                dataType: "json",
                data: {
                    group_id: a
                }
            }).done(function(e) {
                return 1e4 != e.code ? (swal(e.msg), !1) : (t.prev().children("a").click(), t.remove(), i.remove(), groupChangeWarp.find('a[data-groupid="' + a + '"]').parent("li").remove(), void 0)
            }).fail(function() {
                swal(Lang.request_error)
            })
        })
    }), $(document).on("click", "#dataCenter #dcbcBodyIos .dcbct-body-action-td .action-compete", function(e) {
        e.preventDefault();
        var a = $(this),
            t = a.data("id"),
            n = $(".nav-tabs li.active a").attr("href"),
            i = $(n).find(".dcbct-body-compete-chart-warp-" + t),
            o = a.parents(".dcbct-tbody-info-chart"),
            s = o.data("appid"),
            r = $("#competiDataUrl").val();
        if (i.hasClass("in")) i.removeClass("in").fadeOut().addClass("animation-hide");
        else {
            "none" != o.find(".dcbct-body-info-chart-warp").css("display") && o.find(".action-info").trigger("click");
            var d = isMobile ? o.offset().top - 49 + "rem" : o.offset().top - 57 + "px";
            if (setTimeout(function() {
                    $("body").animate({
                        scrollTop: d
                    }, 380)
                }, 260), i.addClass("in show-animation").fadeIn(), o.hasClass("compite-data-ready")) return;
            $.ajax({
                url: r,
                type: "GET",
                dataType: "json",
                data: {
                    appid: s
                },
                success: function(e) {
                    var a = e.data;
                    1e4 == e.code ? (o.find(".dcbc-table-body-competi tbody").html(a.competiOutHTML), o.find(".dcbc-table-body-possible tbody").html(a.possibleOutHTML), o.find(".spinner-box").removeClass("show").addClass("animation-hide"), o.addClass("compite-data-ready"), i.find(".dcbctb-compete-chart-warp-td").css("height", "auto"), tooltipInit()) : swal(e.msg)
                }
            })
        }
    }), $(document).on("click", ".invest-data-center .aso100-nav-select .btn-add-app", function(e) {
        e.preventDefault(), offsetTop = $(this).offset().top - 200, $addCompetiBg = $(".add-competi-bg"), $competiSearchList = $(".competi-search-list"), $pageButton = $(".text-center.page"), $addCompetiSpinner = $(".add-competi .spinner-bg"), $addCompetiBg.find(".add-competi").css({
            top: offsetTop + "px"
        }), $addCompetiBg.show(), $addCompetiBg.find("form.competi-search").attr("action", "/account/addAppSearch"), $addCompetiBg.find(".competi-close").data("refresh", "2"), $addCompetiBg.find(".text-left").hide(), search($addCompetiBg.find(".search-su"))
    }), $(document).on("click", "#dataCenter #dcbcBodyIos .dcbct-body-compete-chart .add-compite", function(e) {
        e.preventDefault();
        var a, t = $(this),
            n = t.data("id"),
            i = t.parents(".dcbct-tbody-info-chart"),
            o = i.data("appid");
        offsetTop = $(this).offset().top - 100, $addCompetiBg = $(".add-competi-bg"), $competiSearchList = $(".competi-search-list"), a = $competiSearchList.data("indexid"), a && n != a && ($competiSearchList.html(""), $addCompetiBg.find(".search-su").val(""), $addCompetiBg.find(".page").hide()), $competiSearchList.data("appid", o), $competiSearchList.data("indexid", n), $pageButton = $(".text-center.page"), $addCompetiSpinner = $(".add-competi .spinner-bg"), $addCompetiBg.find(".add-competi").css({
            top: offsetTop + "px"
        }), $addCompetiBg.show(), search($addCompetiBg.find(".search-su"))
    }), $(document).on("click", ".dcbc-table-body-possible .dcbctb-action-td .action-add", function(e) {
        e.preventDefault();
        var a = "/account/addCompeti";
        ajaxRequestAction($(this), C, "", a)
    }), $(document).on("click", ".dcbc-table-body-competi .dcbctb-action-td .action-del", function(e) {
        e.preventDefault();
        var a = "/account/delCompeti";
        ajaxRequestAction($(this), C, "", a)
    }), $(document).on("click", ".setting-investment #si-form-submit", function(e) {
        e.preventDefault();
        var a = $(this),
            t = a.parents("form");
        ajaxSendForm(t, a)
    }), $(document).on("click", ".setting-investment .si-action-del", function(e) {
        e.preventDefault();
        var a = $(this),
            t = a.data("id"),
            n = $("#delInvestorUrl").val();
        swal({
            title: Lang.keyword_expend_confirm_del_group,
            showCancelButton: 1
        }, function() {
            ajaxRequestAction(a, da, {
                id: t
            }, n)
        })
    });
    var da = function(e, a, t) {
        1e4 == e.code ? a.parents("tr").remove() : swal(e.msg)
    };
    $(document).on("click", ".invest-data-center .main.aso100-nav-select .dropdown-menu a", function(e) {
        e.preventDefault();
        var a = $(this),
            t = a.attr("href"),
            n = $(".nav-tabs .active").data("groupid");
        a.addClass("active").siblings().removeClass("active"), _(t, n)
    }), $(document).on("click", ".nav-tabs .ajax-request a", function(e) {
        e.preventDefault();
        var a = $(this),
            t = a.parents("li").data("groupid"),
            n = $(".invest-data-center .aso100-nav-select .dropdown > a:first").attr("href");
        a.removeClass("ajax-request"), _(n, t)
    }), $(document).on("click", "#dataCenter #dcbcBodyIos .dcbct-info-nav .get-analysis-data .dropdown-menu a", function(e) {
        var a = $(this),
            t = a.html(),
            n = a.parents("ul.dropdown-menu"),
            i = a.parent(),
            o = n.data("paramname"),
            s = a.data("param"),
            r = a.parents(".get-analysis-data"),
            d = r.data("ajaxurl"),
            c = r.data("querydata") || {};
        if ("string" == typeof c && (c = JSON.parse(c)), c[o] = s, r.data("querydata", JSON.stringify(c)), !d) return !1;
        n.siblings("a").find(".name").html(t), i.addClass("active").siblings().removeClass("active");
        var l = r.parents(".dcbct-tbody-info-chart");
        l.find(".spinner-box").addClass("show"), dataCenterModifyRowData(l, d + "/row/1", c), dataCenterLoadChartData(l, d, c)
    }), $(document).on("click", "#dataCenter #dcbNavWord .dcbc-add-btn", function(e) {
        e.preventDefault();
        var a = $(this),
            t = $("#dataCenter #dcbNavWord"),
            n = a.data("url");
        return inputEle = a.prev(".dcbc-add-input"), keyword = inputEle.val(), dcbCopyWord = $("#dataCenter #dcbCopyWord .dcb-content-table").clone(), !! keyword && (a.attr("disabled", !0), void $.getJSON(n, {
            keyword: keyword
        }, function(e) {
            return a.attr("disabled", !1), 1e4 != e.code ? (swal(e.msg), !1) : (inputEle.val(""), dcbCopyWord.find(".word-text").text(keyword), dcbCopyWord.find("tbody").html(e.listHtml), dcbCopyWord.find(".dcbct-word-del").data("word", keyword), t.find(".dcb-content-no-data").addClass("hidden"), t.find(".dcb-content-add").after(dcbCopyWord), void $('[data-toggle="tooltip"]').tooltip({
                    delay: {
                        show: 55,
                        hide: 90
                    }
                }))
        }))
    }), $(document).on("click", "#dataCenter #dcbNavWord .dcbct-word-del", function(e) {
        e.preventDefault();
        var a = $(this),
            t = a.data("word"),
            n = $("#dataCenter #dcbNavWord"),
            i = a.data("url");
        swal({
            title: Lang.delete_app_title,
            text: Lang.delete_word_text,
            type: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: Lang.delete_app_confirmButtonText,
            cancelButtonText: Lang.cancel_btn,
            closeOnConfirm: !1
        }, function() {
            $.post(i, {
                word: t
            }, function(e, t, i) {
                return 1e4 != e.code ? (swal(e.msg), !1) : (a.parents(".dcb-content-table-keyword").fadeOut().remove(), n.find(".dcb-content-table-keyword").length || n.find(".dcb-content-no-data").removeClass("hidden"), void swal(Lang.delete_app_succ_title, Lang.delete_word_succ_text, "success"))
            })
        })
    }), $(document).on("click", "#dataCenter #dchmMoreBtn", function(e) {
        $("#dataCenter #dchmBodyBlog").hasClass("active") ? window.open($(this).data("blogurl")) : window.open($(this).data("msgurl"))
    }), $(document).on("mouseenter", "#dataCenter .dcb-content-table-keyword .dcbc-table-body-rank td", function() {
        var e = $(this),
            a = e.parents(".dcbc-table-body-rank"),
            t = e.data("appid");
        a.find(".search-history-" + t).addClass("hover")
    }), $(document).on("mouseleave", "#dataCenter .dcb-content-table-keyword .dcbc-table-body-rank td", function() {
        var e = $(this),
            a = e.parents(".dcbc-table-body-rank");
        a.find("td").removeClass("hover")
    }), $(document).on("click", ".slide-down", function() {
        var e = $(this),
            a = e.parents(".list");
        e.addClass("slide-up").removeClass("slide-down").html('<i class="iconfont icon-xiangxia1"></i>展开'), a.removeClass("show").find(".app-data").removeClass("show show-animation").hide()
    }), $(document).on("click", ".slide-up", function() {
        var e = $(this),
            a = e.parents(".list"),
            t = a.find(".app-data"),
            n = isMobile ? a.offset().top - 49 + "rem" : a.offset().top - 57 + "px";
        setTimeout(function() {
            $("body").animate({
                scrollTop: n
            }, 380)
        }, 260), a.hasClass("data-ready") || (a.find(".spinner-box").addClass("show"), dataCenterLoadChartData(a)), e.addClass("slide-down").removeClass("slide-up").html('<i class="iconfont icon-xiangshang1"></i>收起'), a.addClass("show"), t.show().addClass("show-animation")
    }), $(document).on("webkitAnimationEnd", ".spinner-box", function() {
        var e = $(this);
        e.removeClass("show").removeClass("animation-hide")
    }), $(document).on("click", ".keyword-switch ul li", function(e) {
        var a = $(this);
        a.addClass("active").siblings().removeClass("active"), console.log(a.data("td"))
    });
    var ca = !1;
    $(document).on("click", ".keyword-cover-info", function(e) {
        var a, t, n = $(this),
            i = $(".keyword-cover-rank-info .spinner-bg"),
            o = $(".keyword-cover-rank-info"),
            s = $(".charts"),
            r = o.find(".charts-select a.active").data("type") || 1;
        s.hide(), ca ? a = $(".keyword-cover-rank-tr") : (a = $('<tr class="keyword-cover-rank-tr show-animation" style="display:none"><td colspan="6"></td></tr>'), a.find("td").html(o), a.insertAfter(n.parents("tr")), ca = !0, o.show()), n.parents("tr").next().is(a) ? t = n.parents("tr").next().css("display") : (a.insertAfter(n.parents("tr")), t = "none"), "table-row" == t ? a.hide() : (a.show(), i.show()), $("html body").animate({
            scrollTop: n.parents("td").offset().top - 50 + "px"
        }, 500);
        var d = n.data("url");
        $.ajax({
            type: "get",
            url: d + "/type/" + r,
            success: function(e) {
                i.hide(), s.show();
                var a = e.data || {};
                drawCharts(a, o.find(".charts"))
            }
        })
    }), $(document).on("click", ".keyword-cover-rank-info .charts-select a", function(e) {
        e.preventDefault();
        var a = $(this);
        a.addClass("active").siblings().removeClass("active");
        var t = $(".keyword-cover-rank-info .spinner-bg"),
            n = $(".keyword-cover-rank-info"),
            i = $(".charts"),
            o = n.find(".charts-select a.active").data("type") || 1;
        t.show(), i.hide();
        var s = a.parents("tr").prev("tr").find(".keyword-cover-info").data("url");
        $.ajax({
            type: "get",
            url: s + "/type/" + o,
            success: function(e) {
                t.hide(), i.show();
                var a = e.data || {};
                drawCharts(a, n.find(".charts"))
            }
        })
    });
    var la = $(".right-bottom-qrcode .qrcode");
    $(document).on("click", ".follow", function() {
        return la.fadeIn(), !1
    }), $(document).on("click", function(e) {
        la.is(":hidden") || la.fadeOut()
    }), $(document).on("order.dt", "#mine-table", function() {
        var e = $(this),
            a = e.DataTable().order();
        if (!a.length) return !1;
        var t, n, i, o = a[0][0],
            s = a[0][1];
        t = e.find("th:eq(" + o + ")"), n = t.find(".icon-up"), i = t.find(".icon-down"), t.siblings().find(".icon").removeClass("active"), t.siblings().find(".iconfont").removeClass("active"), "asc" == s ? (n.addClass("active"), i.removeClass("active")) : (n.removeClass("active"), i.addClass("active"))
    }), $(document).on("order.dt", "#other-table", function() {
        var e = $(this),
            a = e.DataTable().order();
        if (!a.length) return !1;
        var t, n, i, o = a[0][0],
            s = a[0][1];
        t = e.find("th:eq(" + o + ")"), n = t.find(".icon-up"), i = t.find(".icon-down"), t.siblings().find(".icon").removeClass("active"), t.siblings().find(".iconfont").removeClass("active"), "asc" == s ? (n.addClass("active"), i.removeClass("active")) : (n.removeClass("active"), i.addClass("active"))
    });
    var je;
    $(document).on("click", ".app-list .media-info-history", function(e) {
        var a = $(this),
            t = a.data("wordid"),
            n = "ajaxurl",
            i = "querydata",
            o = a.parents(".media") || a.parents("div"),
            o = o.length > 0 ? o : a.parents("div");
        o.find(".sort-word a").html();
        p(t), n = window.keywordShowHourTab.isDefault + window.keywordShowHourTab.type + "ajaxurl", i = window.keywordShowHourTab.isDefault + "querydata";
        var s = $("#charts-ajax-data"),
            r = (s.data("thisurl"), s.data(n) + "/appid/" + a.data("appid")),
            d = s.data(i) || {};
        if ("string" == typeof d && (d = JSON.parse(d)), "undefined" == typeof window.chartData.list && (window.chartData.list = []), o.hasClass("chart-tr")) return $chartsDivBox.hide(), o.removeClass("chart-tr"), !1;
        je || ($chartsDivBox = $('<div class="media chart-tr"><div class="chart-box-div"></div></div>'), je = $("#charts-box"), $chartsDivBox.find(".chart-box-div").html(je)), je.find(".date-range-picker").map(function() {
            datePicker($(this))
        }), je.find("." + window.keywordShowHourTab.type).removeClass("hidden").siblings().addClass("hidden"), je.find(".nav-item-hour").data("ajaxurl", je.find(".nav-item-hour").data("ajaxurl") + "/appid/" + a.data("appid")), je.find(".nav-item-hour").data("defaultajaxurl", je.find(".nav-item-hour").data("defaultajaxurl") + "/appid/" + a.data("appid")), je.find(".nav-item-day").data("ajaxurl", je.find(".nav-item-day").data("ajaxurl") + "/appid/" + a.data("appid")), je.find(".nav-item-day").data("defaultajaxurl", je.find(".nav-item-day").data("defaultajaxurl") + "/appid/" + a.data("appid"));
        var c = je.find("#charts-ajax-data");
        c.data("ajaxurl", c.data("ajaxurl") + "/appid/" + a.data("appid")), c.data("defaultajaxurl", c.data("defaultajaxurl") + "/appid/" + a.data("appid")), c.data("defaulthourajaxurl", c.data("defaulthourajaxurl") + "/appid/" + a.data("appid")), c.data("defaultdayajaxurl", c.data("defaultdayajaxurl") + "/appid/" + a.data("appid")), c.data("thisurl", c.data("thisurl") + "/appid/" + a.data("appid")), $chartsDivBox.show(), je.show(), o.siblings().removeClass("chart-tr"), o.addClass("chart-tr").data("wordid", t), o.after($chartsDivBox), $chartsDivBox.addClass("show-animation").addClass("chart-tr");
        var l = isMobile ? o.offset().top - 49 + "rem" : o.offset().top - 57 + "px";
        setTimeout(function() {
            $("body").animate({
                scrollTop: l
            }, 380)
        }, 260), d.word_id = t;
        var u = a.data("appname"),
            h = u.indexOf("-") > 0 ? u.indexOf("-") : u.length;
        u = u.substr(0, h), $("#charts-appname").val(u), $("#charts-word").val(a.data("word")), window.chartData.titleDate = window.keywordShowHourTab.defaultLang, getChartsKeywordDataHour(r, d)
    }), $(document).on("click", ".app .platform-nav-tabs .addversion", function(e) {
        $(".add-android-ios-version").show()
    }), $(document).on("click", ".app .add-android-ios-version .icon-guanbi", function(e) {
        $(".add-android-ios-version").hide()
    }), $(document).on("click", ".app .add-android-ios-version .add-android-ios-version-sub", function(e) {
        var a = $(this),
            t = a.parents(".add-version-area").data("appid"),
            n = a.parents(".add-version-area").data("ajaxurl"),
            i = a.parents(".add-version-area").data("type"),
            o = a.siblings("textarea").val();
        return "" != o && ($(".add-android-ios-version").hide(), void $.ajax({
                url: n,
                type: "GET",
                dataType: "json",
                data: {
                    appid: t,
                    type: i,
                    link: o
                },
                success: function(e) {
                    e.data;
                    console.log(e), 1e4 == e.code ? (swal({
                            title: "提交成功",
                            text: '<span style="color:#666; font-weight: 400;">&nbsp;&nbsp;&nbsp; 审核通过后，您将获得100积分，积分可用于兑换VIP特权 &nbsp;&nbsp;&nbsp;</span> <a href="/account/setting/type/settingJifen" style="color:#3e81bb; font-weight: 400;" target="_blank">积分中心</a>',
                            type: "success",
                            html: !0,
                            showConfirmButton: !0
                        }), a.siblings("textarea").val("")) : swal({
                            title: "提交失败",
                            text: '<span style="color:#666; font-weight: 400;">' + e.msg + "</span>",
                            html: !0,
                            type: "error",
                            showConfirmButton: !0
                        })
                }
            }))
    }), window.isMobile || $(document).on("click", ".wechat-switch > li.item", function(e) {
        e.preventDefault();
        var a = $(this);
        a.addClass("active").siblings().removeClass("active"), $("." + a.data("son")).show().siblings(".wechat-box").hide()
    }), $(document).on("click", ".wechat-switch a", function(e) {
        if (!isMobile) {
            e.preventDefault();
            var a = $(this),
                t = a.data("ajaxhref");
            u(t, function() {
                var e = $(".wechat-switch").data("ty");
                $(".ty" + e).addClass("active").siblings().removeClass("active"), ka()
            })
        }
    }), $(document).on("click", ".wechat-display-one .img-icon .item-delete, .wechat-two .img-icon .item-delete, .wechat-display-three .img-icon .item-delete,.keyword-cover-use .app-list .img-icon .item-delete", function() {
        var e = $(this),
            a = e.data("appid"),
            t = e.data("subtype"),
            n = e.data("modifytype"),
            i = $(".appUrl").val(),
            o = {},
            s = e.parents(".app-list").is(".add-item-user-product") ? 0 : 1;
        return "noWechat" == t ? (i = $(".delUrl").val(), o = {
                app_id: a,
                "modify-type": n,
                type: t,
                compet: s
            }) : o = {
                app_id: a,
                "modify-type": n,
                type: t
            }, !e.hasClass("remove-ing") && (e.addClass("remove-ing"), void ajaxRequestAction(e, pa, o, i))
    }), $(document).on("click", ".alert-app .img-icon .item-delete", function(e) {
        e.preventDefault();
        var a = $(this),
            t = a.parents(".alert-app"),
            n = a.parents("li"),
            i = a.data("appid"),
            o = a.data("modifytype"),
            s = t.data("subtype"),
            r = $(".appUrl").val(),
            d = {},
            c = "";
        return ($(".alert-app-user-product").length || $(".alert-app-user-compet").length) && (c = a.parents(".alert-app").is(".alert-app-user-product") ? 0 : 1), $(".keyword-cover-use-adjust").length && (c = 1), "noWechat" == s && (r = $(".delUrl").val()), "noWechat" == s ? (r = $(".delUrl").val(), d = {
                app_id: i,
                "modify-type": o,
                type: s,
                compet: c
            }) : d = {
                app_id: i,
                type: s,
                "modify-type": o
            }, !a.hasClass("remove-ing") && (a.addClass("remove-ing"), void ajaxRequestAction(a, function(e, a, t) {
            if (1e4 != e.code) swal(e.msg);
            else {
                n.remove();
                var r = window.isMobile ? 5 : 6,
                    d = $(".alert-app-top-main li").length,
                    c = ($(".left-arrow"), $(".right-arrow"));
                d <= r && c.hide(), a = $('.item-delete[data-appid="' + i + '"][data-subtype="' + s + '"][data-modifytype="' + o + '"]'), ua(a, t)
            }
        }, d, r))
    });
    var pa = function(e, a, t) {
            return 1e4 != e.code ? (swal(e.msg), !1) : void ua(a, t)
        },
        ua = function(e, a) {
            var t = $(".wechat-switch li.active").find(".wechat-close"),
                n = $(".wechat-switch li.active").find(".wechat-open");
            if ($(".alert-default-list .myapp-info-item-" + a.app_id).removeClass("hidden"), 2 == a.type) e.parents(".img-icon").fadeOut(200, function() {
                $(this).remove();
                var e = $(".wechat-remind-one .img-icon"),
                    a = $(".select-one-time input:checked"),
                    i = $(".wechat-display-one .add-item-two .content-row");
                !e.length && a.length ? ($(".wechat-remind-one .unsubscribe").addClass("del-source").trigger("click"), i.length || (t.show(), n.hide())) : a.length || i.length || (t.show(), n.hide())
            });
            else if (3 == a.type || 5 == a.type) {
                var i = e.parents(".push-content").siblings(".push-time").find(".unsubscribe");
                removeEl = 3 == a.type ? e.parents(".content-row") : e.parents(".img-icon"), checkeEl = 3 == a.type ? e.parents(".add-item-three") : e.parents(".app-list"), removeEl.fadeOut(200, function() {
                    $(this).remove(), checkeEl.find(".img-icon").length || ($(".select-time input:checked").length && i.addClass("del-source").trigger("click"), t.show(), n.hide())
                })
            } else if (4 == a.type) {
                e.parents(".content-row").remove();
                var o = $(".select-one-time input:checked"),
                    s = $(".wechat-display-one .add-item-two .content-row");
                s.length || o.length || (t.show(), n.hide())
            } else "noWechat" == a.type ? (e.parents(".img-icon").fadeOut(200, function() {
                    $(this).remove()
                }), e.parents(".app-list").is(".add-item-user-product") ? $(".add-item-user-product").find(".img-icon").length <= 1 && $(".keyword-cover-use .add-content-mine").show() : e.parents(".app-list").is(".add-item-user-compet") ? $(".add-item-user-compet").find(".img-icon").length <= 3 && $(".keyword-cover-use .add-content-other").show() : e.parents(".app-list").is(".adjust-app") && $(".adjust-app").find(".img-icon").length <= 3 && $(".keyword-cover-use-adjust .add-content-adjust").show()) : swal(Lang.operation_exception)
        },
        ha = function(e, a) {
            var t, n = [],
                i = e.parents(".select-time").data("subtype"),
                o = $(".remindUrl").val(),
                s = e.parents(".select-time");
            if (t = 5 == i ? 1 : 3, s.find('input[name="push-time"]:checked').each(function(e, a) {
                    n[e] = parseInt($(a).val())
                }), n.length >= t) {
                if (s.hasClass("disabled") || s.addClass("disabled"), n.length > t) return e.prop("checked", !1), !1
            } else s.hasClass("disabled") && s.removeClass("disabled");
            $.ajax({
                url: o,
                type: "POST",
                dataType: "json",
                data: {
                    remind: n,
                    type: i
                }
            }).done(function(t) {
                if (a) a(t);
                else if (1e4 != t.code) return swal(t.msg), !1;
                e.attr("disabled", !1)
            }).fail(function() {
                swal(Lang.request_error)
            })
        };
    $(document).on("click", ".select-time li input", function(e) {
        var a = $(this),
            t = a.parents("li").find(".success-signal").length ? a.parents("li").find(".success-signal") : '<span class="success-signal none"><i class="iconfont icon-chenggong"></i>保存成功</span>',
            n = a.parents(".push-time"),
            i = n.find(".unsubscribe"),
            o = $(".wechat-switch li.active"),
            s = a.parents(".select-time").data("subtype");
        return !fa() && (a.is(":checked") || a.parents(".select-time").find("input:checked").length ? !n.siblings(".push-content").find(".img-icon").length && a.is(":checked") ? (swal({
                        title: Lang.setting_subscribe_add_title,
                        showCancelButton: !0,
                        confirmButtonText: Lang.setting_subscribe_add_text
                    }, function() {
                        $('.wechat-content .add-content[data-subtype="' + s + '"]').trigger("click")
                    }), !1) : void ha(a, function(e) {
                        return 1e4 != e.code ? (swal(e.msg), !1) : (a.is(":checked") && (a.parents("li").append($(t)), a.parents("li").find(".success-signal").fadeIn(), setTimeout(function() {
                                a.parents("li").find(".success-signal").hide()
                            }, 1200)), void(a.parents(".select-time").find("li input:checked").length ? (i.show(), o.find(".wechat-close").hide().end().find(".wechat-open").show()) : "wechat-display-one" == o.data("son") ? ($(".lists-change .wechat-one-table .content-row").length || o.find(".wechat-close").show().end().find(".wechat-open").hide(), i.hide()) : (i.hide(), o.find(".wechat-close").show().end().find(".wechat-open").hide())))
                    }) : (e.preventDefault(), $(".alert-subscribe-remind").show().data("subtype", s), !1))
    }), $(document).on("click tap", ".wechat-remind-one .push-time .unsubscribe, .wechat-display-two .push-time .unsubscribe, .wechat-remind-two .push-time .unsubscribe", function() {
        var e, a, t, n = $(this),
            i = n.siblings(".select-time"),
            e = i.data("subtype");
        return !!e && (t = $(".remindUrl").val(), a = {
                type: e,
                remind: [],
                reason: []
            }, n.hasClass("del-source") ? (n.removeClass("del-source"), i.find("input:checked").length && ajaxRequestAction(n, ma, a, t)) : $(".alert-subscribe-remind").show().data("subtype", e), !1)
    }), $(document).on("click", ".alert-subscribe-remind .cancel", function() {
        $(".alert-subscribe-remind").hide(), $('.alert-subscribe-remind-box .reason-form input[name="reason"]:checked').prop("checked", !1)
    }), $(document).on("click", ".alert-subscribe-remind .confirm", function() {
        var e = $(this),
            a = e.parents(".alert-subscribe-remind"),
            t = a.data("subtype"),
            n = $(".remindUrl").val(),
            i = [],
            o = {};
        o = {
            type: t,
            remind: [],
            reason: []
        }, a.find('.alert-subscribe-remind-box .reason-form input[name="reason"]:checked').each(function(e, a) {
            i.push($(a).val())
        }), o.reason = i.join(","), ajaxRequestAction(e, ma, o, n)
    });
    var ma = function(e, a, t) {
        if (1e4 != e.code) return swal(e.msg), !1;
        var n = $(".wechat-display-one .add-item-two .content-row"),
            i = $(".select-time"),
            o = $(".wechat-switch .active").find(".wechat-close"),
            s = $(".wechat-switch .active").find(".wechat-open");
        i.find("input").prop({
            checked: !1
        }), i.find("input").siblings(".success-signal").removeClass("fade"), i.hasClass("disabled") && i.removeClass("disabled"), i.siblings(".unsubscribe").hide(), o.show(), s.hide(), 2 == t.type && n.length && (s.show(), o.hide()), $(".alert-subscribe-remind").length && ($(".alert-subscribe-remind").hide(), $('.alert-subscribe-remind-box .reason-form input[name="reason"]:checked').prop("checked", !1))
    };
    $(document).on("click", ".one-select ul li", function() {
        var e = $(this),
            a = e.parents(".one-select"),
            t = e.parents(".content-row"),
            n = t.find(".td-one .img-icon").data("appid"),
            i = e.parents("ul").data("paramname"),
            o = $(".appFluxUrl").val(),
            s = e.text(),
            r = {};
        r = {
            param: s,
            paramName: i,
            app_id: n
        }, ajaxRequestAction(e, function() {
            a.find(".num").html(e.html()), a.removeClass("active"), a.find(".select-drop-list").hide()
        }, r, o)
    }), $(document).on("mouseover mouseout click", ".push-content-two-info .followed ul li:not(:last-child) ,.alert-keyword .alert-keyword-top ul li ", function(e) {
        var a = $(this);
        if ("mouseover" == e.type) a.find("i").show();
        else if ("mouseout" == e.type) a.find("i").hide();
        else if ("click" == e.type) {
            var t, n = a.data("appid"),
                i = a.data("wordid"),
                o = $(".delCustomUrl").val();
            t = {
                appid: n,
                word_id: i
            }, ajaxRequestAction($(this), function(e, a) {
                $('li[data-wordid="' + i + '"][data-appid="' + n + '"]').remove();
                var t = $('.push-content-two-info .content-row[data-appid="' + n + '"]'),
                    o = t.find(".td-two li").length;
                1 == o && (t.removeClass("followed").addClass("notfollow"), t.find(".td-two ul li").before('<li class="not-follow-info">未关注关键词。</li>'))
            }, t, o)
        }
    }), $(document).on("click", ".not-disturb", function(e) {
        var a = $(this),
            t = a.data("appid"),
            n = a.data("subtype"),
            i = a.is(":checked") ? 1 : 0,
            o = $(".disturbUrl").val(),
            s = {};
        s = {
            app_id: t,
            type: n,
            status: i
        }, ajaxRequestAction(a, "", s, o)
    }), $(document).on("click", ".wechat-display-four ul li>a,.wechat-display-five ul li>a", function() {
        var e, a, t = $(this),
            n = $(".timeingPushUrl").val(),
            i = t.data("type"),
            o = t.data("son"),
            s = t.hasClass("remove") ? 1 : 0;
        if (fa()) return !1;
        if (a = {
                type: i,
                modifytype: s,
                reason: []
            }, e = function() {
                $.ajax({
                    type: "POST",
                    data: a,
                    url: n,
                    success: function(e) {
                        1e4 == e.code ? (t.hasClass("remove") ? (t.removeClass("remove").html(Lang.subscribe_btn), $("li[data-son=" + o + "]").find(".wechat-close").show().end().find(".wechat-open").hide()) : (t.addClass("remove").html(Lang.unsubscribe_btn), $("li[data-son=" + o + "]").find(".wechat-close").hide().end().find(".wechat-open").show()), $(".alert-subscribe-remind").hide()) : 81004 == e.code ? swal({
                                    title: e.title,
                                    type: "error",
                                    showCancelButton: !0,
                                    confirmButtonColor: "#33ba95",
                                    confirmButtonText: Lang.certified_btn,
                                    cancelButtonColor: "#33ba95",
                                    cancelButtonText: Lang.cancel_btn,
                                    html: !0
                                }, function(e) {
                                    e && (document.location.href = "/account/setting/type/settingInvestor")
                                }) : swal({
                                    title: e.msg,
                                    type: "error"
                                })
                    }
                })
            }, s) {
            var r = $(".alert-subscribe-remind .alert-subscribe-remind-box .reason-form"),
                d = $(".alert-subscribe-remind"),
                c = d.find(".cancel"),
                l = d.find(".confirm");
            $(".remindUrl").val();
            r.find('input[name="reason"]:checked').prop("checked", !1), d.show(), c.on("click", function() {
                return d.hide(), r.find('input[name="reason"]:checked').prop("checked", !1), l.unbind("click"), !1
            }), l.on("click", function() {
                var t = [];
                return r.find('input[name="reason"]:checked').each(function(e, a) {
                    t.push($(a).val())
                }), a.reason = t.join(","), e(), l.unbind("click"), !1
            })
        } else e()
    });
    var fa = function() {
        var e = $(".wechat-bind-btn"),
            a = e.data("isbind");
        return !a && (isMobile ? swal({
                    title: "绑定后可添加微信订阅",
                    html: !0,
                    showCancelButton: !0,
                    confirmButtonText: "立即绑定"
                }, function() {
                    e.trigger("click")
                }) : e.trigger("click"), !0)
    };
    $(document).on("click", ".settingSubscribe .add-content,.settingEmailSub .add-content,.keyword-cover-use .add-content-mine,.keyword-cover-use .add-content-other,.keyword-cover-use-adjust .add-content-adjust", function() {
        var e, a = $(this),
            t = $(".alert-app"),
            n = $(".alert-app"),
            i = $(".add-item-one"),
            o = $(".add-item-two"),
            s = $(".add-item-three"),
            r = $(".add-item-four"),
            d = $(".add-item-email"),
            c = $(".add-item-user-product"),
            l = $(".add-item-user-compet"),
            p = $(".adjust-app"),
            u = a.data("subtype");
        if ("noWechat" != u && fa()) return !1;
        t.removeClass("alert-app-one alert-app-two alert-app-three alert-app-four alert-app-email alert-app-user-product"), a.hasClass("add-content-one") && t.addClass("alert-app-one"), a.hasClass("add-content-two") && t.addClass("alert-app-two"), a.hasClass("add-content-three") && t.addClass("alert-app-three"), a.hasClass("add-content-four") && t.addClass("alert-app-four"), a.hasClass("add-content-email") && t.addClass("alert-app-email"), a.hasClass("add-content-mine") && t.addClass("alert-app-user-product"), a.hasClass("add-content-other") && t.addClass("alert-app-user-compet"), a.hasClass("add-content-adjust") && t.addClass("alert-app-user-adjust"), n.hasClass("alert-app-one") && (e = i.find(".img-icon")), n.hasClass("alert-app-two") && (e = o.find(".img-icon")), n.hasClass("alert-app-three") && (e = s.find(".img-icon")), n.hasClass("alert-app-four") && (e = r.find(".img-icon")), n.hasClass("alert-app-email") && (e = d.find(".img-icon")), n.hasClass("alert-app-user-product") && (e = c.find(".img-icon")), n.hasClass("alert-app-user-compet") && (e = l.find(".img-icon")), n.hasClass("alert-app-user-adjust") && (e = p.find(".img-icon")), t.find(".alert-app-top-main").empty(), t.data("subtype", u), $(".alert-default-list .myapp-info-item").removeClass("hidden");
        var h = e.length;
        if (0 == h) {
            if (a.hasClass("add-content-mine")) var m = '<p class="null-info">未选择任何产品</p>';
            else if (a.hasClass("add-content-other") || a.hasClass("add-content-adjust")) var m = '<p class="null-info">未选择任何竞品</p>';
            else var m = '<p class="null-info">未添加订阅应用~</p>';
            t.find(".alert-app-top-main").append(m), t.find(".alert-app-top-main").css("-webkit-transition", "initial")
        } else t.find(".alert-app-top-main").css("-webkit-transition", "all 400ms"), e.each(function(e, a) {
            var n = $(a).data("appid");
            $(".alert-default-list .myapp-info-item-" + n).addClass("hidden");
            var i = '<li><div class="img-icon">' + $(a).html();
            t.find(".alert-app-top-main").append(i)
        });
        a.hasClass("add-content-mine") ? t.find(".alert-app-title").html("选择您的产品") : (a.hasClass("add-content-other") || a.hasClass("add-content-adjust")) && t.find(".alert-app-title").html("选择您的竞品");
        var f;
        f = window.isMobile ? 5 : 6, $(".alert-app-top-main li").length <= f ? $(".app-arrow").hide() : $(".app-arrow").show(), $(".alert-app-top-main").css("webkit-transform", "translateX(0)").data("left", 0), t.find(".left-arrow").hide(), t.find(".img-icon>img").removeAttr("title"), t.fadeIn(400), $(".alert-app-bk").fadeIn(400), window.isMobile || $("body").css({
            overflow: "hidden"
        });
        var g = $(".alert-app-top-main");
        g.css("width", $(".show-app-top-main").css("width")), g.find("li").length > 5 && (ulMinWidth = g.find("li").length * (getInt(g.find("li").css("width")) + getInt(g.find("li:not(:first-child)").css("marginLeft"))), g.css("width", ulMinWidth + "px"));
        var b = $('.alert-app .alert-app-search input[name="word"]'),
            v = $(".alert-app .alert-app-list"),
            w = $(".alert-app .alert-hide-item");
        $(".alert-app .alert-default-list");
        w.hide(), v.empty(), b.val(""), search(b)
    }), $(document).on("submit", ".alert-app .alert-app-search-form", function(e) {
        e.preventDefault(), ga($(this))
    }), $(document).on("click", ".alert-app .alert-app-search-form .alert-app-search-btn", function(e) {
        e.preventDefault(), $(this).parents(".alert-app-search-form").submit()
    }), $(document).on("click", ".alert-app .alert-app-page-btn .paging-btn", function(e) {
        e.preventDefault(), ga($(this))
    });
    var ga = function(e) {
        if (competiGetDataRun) return !1;
        var a = e.parents(".alert-app"),
            t = a.find(".alert-app-search-form"),
            n = a.find(".spinner"),
            i = a.find(".alert-app-list"),
            o = a.find(".alert-app-page-btn"),
            s = o.data("page"),
            r = a.find(".alert-hide-item"),
            d = t.find("input[name=word]").val(),
            c = a.data("subtype");
        if (!d || "" == d) return !1;
        if (e.hasClass("alert-app-search-form")) s = 1, o.data("page", s);
        else {
            if (s = e.hasClass("pre-page") ? --s : ++s, e.hasClass("disabled")) return !1;
            o.data("page", s)
        }
        xe = t.prop("action"), n.show(), competiGetDataRun = !0, $.ajax({
            type: "get",
            url: xe,
            data: {
                search: d,
                page: s,
                type: c
            },
            dataType: "json",
            success: function(e) {
                competiGetDataRun = !1, n.hide(), maxPage = e.maxPage, maxPage ? (r.show(), o.data("maxpage", maxPage), i.html(e.data), maxPage > 1 ? (o.show(), 1 == s ? o.find(".pre-page").addClass("disabled").prop("disabled", !0) : s == maxPage ? o.find(".next-page").addClass("disabled").prop("disabled", !0) : o.find(".paging-btn").removeClass("disabled").prop("disabled", !1)) : o.hide()) : (i.html('<p class="text-center">' + Lang.no_data_1 + "</p>"), o.hide())
            }
        })
    };
    $(document).on("click", ".alert-app-close", function() {
        $(".alert-app").fadeOut(400), $("body").css({
            overflow: "visible"
        })
    });
    var ba = !1;
    $(document).on("click tap", ".right-arrow", function() {
        var e = $(this);
        return T(e), !1
    });
    var va = !1;
    $(document).on("click tap", ".left-arrow", function() {
        var e = $(this);
        return S(e), !1
    }), $(document).on("click", ".alert-app .not-focus,.alert-app .alert-default-list li a", function() {
        var e, a = $(this),
            t = a.data("appid"),
            n = a.parents(".alert-app").data("subtype"),
            i = "",
            o = a.parents(".alert-app").is(".alert-app-user-product") ? 0 : 1;
        return "noWechat" == n ? (i = $(".addUrl").val(), e = {
                app_id: t,
                type: n,
                compet: o
            }) : (i = $(".appUrl").val(), e = {
                app_id: t,
                type: n
            }), !a.hasClass("add-ing") && (a.addClass("add-ing"), void ajaxRequestAction(a, wa, e, i))
    });
    var wa = function(e, a, t) {
        if (a.removeClass("add-ing"), 1e4 != e.code) return swal(e.msg), !1;
        var n, i, o, s, r;
        slider = $(".alert-app-top-main"), sliderLeft = slider.data("left") || 0, moveDistance = slider.find("li").length > 1 ? getInt(slider.find("li").css("width")) + getInt(slider.find("li:not(:first-child)").css("marginLeft")) : getInt(slider.find("li").length ? slider.find("li").css("width") : $(".show-app-top-main").css("width")), a.parents("li").hasClass("myapp-info-item") ? (o = a, a.parents("li").addClass("hidden"), window.isMobile || a.parents(".alert-default-list").hide()) : (o = a.parents("li"), a.removeClass("not-focus").addClass("focused"), $(".alert-default-list .myapp-info-item-" + t.app_id).addClass("hidden")), n = o.find("img").attr("src"), i = o.find(".addapp-info p:first-child()").text(), sliderLeft -= moveDistance, ba = !1, s = '<div class="img-icon" data-appid="' + t.app_id + '"><img src="' + n + '" alt="' + i + '"><p><a target="_blank" href="/app/rank/appid/' + t.app_id + '">' + i + '</a></p><div class="item-delete" data-appid="' + t.app_id + '" data-type="post" data-subtype="' + t.type + '" data-modifytype="remove"><i class="iconfont icon-guanbi"></i></div></div>', r = "<li>" + s + "</li>", slider.find("p.null-info").length && slider.empty(), slider.append($(r));
        var d;
        d = window.isMobile ? 5 : 6, slider.find("li").length > d && slider.css("width", getInt(slider.css("width")) + moveDistance + "px"), slider.find("li").length > d && ($(".left-arrow").show(), $(".right-arrow").hide());
        var c = slider.find("li").length,
            l = slider.find("li").length,
            p = window.isMobile ? 5 : 6,
            u = ($(".show-app-top-main").offset().left, (l - p) * moveDistance);
        switch (c > d && (slider.css("webkit-transform", "translateX(" + -u + "px)"), slider.data("left", -u)), t.type) {
            case 2:
            case 5:
                $(".content-item .app-list").append($(s));
                break;
            case 3:
                var h = "",
                    m = "notfollow";
                e.keywordList.length ? ($.each(e.keywordList, function(e, a) {
                        h += '<li data-wordid="' + a.word_id + '" data-appid="' + t.app_id + '"><a href="javascript:;">' + a.word + '</a><i class="iconfont icon-guanbi"></i></li>'
                    }), h += '<li class="mobile-hide"><a href="javascript:;" class="add-keyword" data-subtype="3"><i class="iconfont icon-tianjia"></i>添加</a></li>', m = "followed") : h = '<li class="not-follow-info">未关注关键词。</li><li><a href="javascript:;" class="add-keyword mobile-hide"><i class="iconfont icon-tianjia "></i>添加</a></li>', s = '<div class="content-row ' + m + '" data-appid="' + t.app_id + '"><div class="td td-one">' + s + '<div class="mobile-add-keyword pc-hide"><a href="javascript:;" class="add-keyword" data-subtype="3"><i class="iconfont icon-tianjia"></i>添加关键词</a></div></div><div class="td td-two"><ul>' + h + "</ul></div></div>", $(".add-item-three").append($(s));
                break;
            case 4:
                var f = $(".lists-change .content-row-copy").html();
                f = f.replace(/###APPELINFO###/g, s), f = f.replace(/###APPID###/g, t.app_id), $(".add-item-two").append($(f)), $(".wechat-switch li.active").find(".wechat-close").hide().end().find(".wechat-open").show();
                break;
            case "noWechat":
                var g = $(".delUrl").val();
                if (s = '<div class="img-icon" data-appid="' + t.app_id + '"><img src="' + n + '" alt="' + i + '"><p><a target="_blank" href="/app/rank/appid/' + t.app_id + '">' + i + '</a></p><a class="item-delete" data-url="' + g + "/appid/" + t.app_id + '" data-appid="' + t.app_id + '" data-type="post" data-subtype="' + t.type + '" data-modifytype="remove"><i class="iconfont icon-guanbi"></i></a></div>', r = "<li>" + s + "</li>", a.parents(".alert-app").is(".alert-app-user-product")) return $(".keyword-cover-use .add-item-user-product").append($(s)), $(".add-item-user-product").find(".img-icon").length >= 1 && $(".keyword-cover-use .add-content-mine").hide(), !1;
                if (a.parents(".alert-app").is(".alert-app-user-compet")) return $(".keyword-cover-use .add-item-user-compet").append($(s)), $(".add-item-user-compet").find(".img-icon").length >= 3 && $(".keyword-cover-use .add-content-other").hide(), !1;
                a.parents(".alert-app").is(".alert-app-user-adjust") && $(".adjust-app").find(".img-icon").length >= 2 && $(".keyword-cover-use-adjust .add-content-adjust").hide(), $(".content-item .app-list").append($(s))
        }
        $(".select-time input:checked").length || $(".select-time li:eq(1) input").trigger("click")
    };
    $(document).on("click", ".wechat-two-content .add-keyword", function() {
        var e, a, t, n, i, o = $(this),
            s = $(".alert-keyword"),
            r = $(".alert-keyword-search img"),
            d = $(".alert-keyword-search .app-name"),
            c = $(".alert-keyword-bottom tbody.content-tbody"),
            l = $(".alert-keyword-bottom tbody.no-data-tbody"),
            p = $(".alert-keyword-bottom .show-more-keyword"),
            u = o.parents(".content-row"),
            h = u.find(".td-one");
        l.show(), c.hide(), e = h.find(".img-icon").data("appid"), t = h.find(".img-icon p").html(), a = h.find(".img-icon img").attr("src"), d.data("appid", e), d.html(t), r.attr("src", a), p.find("a").attr("href", p.find("a").data("href") + e), s.find(".alert-keyword-top ul").empty();
        var m = u.find(".td-two ul li.not-follow-info").length;
        1 == m ? (n = '<p class="null-info">未关注关键词~</p>', s.find(".alert-keyword-top ul").append(n)) : (n = u.find(".td-two ul").clone(), n.find("li.not-follow-info").length || (n.find("li:last").remove(), s.find(".alert-keyword-top ul").append(n.html()))), $.ajax({
            url: $(".getAppWordUrl").val(),
            type: "GET",
            dataType: "json",
            data: {
                appid: e
            }
        }).done(function(e) {
            1e4 != e.code ? swal(e.msg) : (i = "", $.each(e.keywordList, function(e, a) {
                    i += "<tr><td>" + a.word + "</td><td>" + a.ranking + "</td><td>" + a.hints + '</td><td><a href="javascript:;" data-keyword="' + a.word + '"><i class="iconfont icon-add"></i>添加</a></td></tr>'
                }), c.html($(i)), l.hide(), c.show(), p.show())
        }).fail(function() {
            swal(Lang.request_error)
        }), s.fadeIn("fast"), window.isMobile || $("body").css({
            overflow: "hidden"
        })
    }), $(document).on("click", ".alert-keyword-close", function() {
        $(".alert-keyword").fadeOut(400), $("body").css({
            overflow: "visible"
        })
    }), $(document).on("click", ".alert-keyword table tr td:nth-child(4) a", function() {
        var e, a = $(this).parent(".alert-keyword table tr td:nth-child(4)"),
            t = $(".alert-keyword-search p.app-name").data("appid"),
            n = a.parent().find("td:nth-child(1)").html();
        return !a.hasClass("clicked") && (e = {
                keyword: n,
                appid: t
            }, void $a(e, a))
    }), $(document).on("click", ".alert-keyword-container .add-btn", function() {
        var e, a = $(this),
            t = $(".alert-keyword-search p").data("appid"),
            n = a.siblings("input").val();
        e = {
            keyword: n,
            appid: t
        }, $a(e, a)
    });
    var $a = function(e, a) {
        return !a.hasClass("add-ing") && (a.addClass("add-ing"), void $.ajax({
                url: $(".addCustomKeywordUrl").val(),
                type: "post",
                data: e
            }).success(function(t) {
                if (a.removeClass("add-ing"), 1e4 == t.code) {
                    var n, i = $(".alert-keyword ul"),
                        o = $('.content-row[data-appid="' + e.appid + '"]');
                    i.find("p.null-info").length && i.empty(), a.hasClass("add-btn") || (a.addClass("clicked"), a.find("a").html("已添加"), o.hasClass("notfollow") && o.removeClass("notfollow").addClass("followed"), o.find("li.not-follow-info") && o.find("li.not-follow-info").remove()), n = "<li data-wordid=" + t.id + " data-appid=" + e.appid + '><a href="javascript:;">' + e.keyword + '</a><i class="iconfont icon-guanbi"></i></li>', i.append($(n)), o.find("li:last-child").before($(n))
                } else 40002 == t.code ? showOpenVipSwal(t.msg) : swal(t.msg)
            }))
    };
    $(document).on("focus", ".alert-app-search input", function() {
        if ($(this).val()) return !1;
        var e = $(".alert-default-list");
        e.find(".myapp-info-item:not(.hidden)").length && e.show()
    }), $(document).on("input", ".alert-app-search input", function() {
        var e = $(this),
            a = $(".alert-default-list");
        e.val() ? a.hide() : a.show()
    }), $(document).on("click", ".wechat-switch li.item", function() {
        var e = $(this),
            a = e.find("i"),
            t = $(".wechat-switch .open-one"),
            n = $(".wechat-switch .open-two");
        "wechat-display-four" == e.data("son") && (t.hasClass("active") ? t.removeClass("active") : t.addClass("active")), "wechat-display-five" == e.data("son") && (n.hasClass("active") ? n.removeClass("active") : n.addClass("active")), a = e.find("i"), a.hasClass("arrow-bottom") ? a.removeClass("arrow-bottom") : a.addClass("arrow-bottom")
    });
    var ya = function() {
            var e = window.navigator.userAgent,
                a = e.indexOf("MSIE ");
            if (a > 0) return parseInt(e.substring(a + 5, e.indexOf(".", a)), 10);
            var t = e.indexOf("Trident/");
            if (t > 0) {
                var n = e.indexOf("rv:");
                return parseInt(e.substring(n + 3, e.indexOf(".", n)), 10)
            }
            var i = e.indexOf("Edge/");
            return i > 0 && parseInt(e.substring(i + 5, e.indexOf(".", i)), 10)
        },
        xa = function() {
            if (window.isMobile) return !1;
            var e = $(".wechat-switch").data("ty"),
                a = 20;
            ya() && (a = 0), 0 != e && 2 != e || Sortable.create($(".add-item-one .sortable-list")[0], {
                handle: "img",
                delay: a,
                draggable: ".img-icon",
                ghostClass: "placeholder-item",
                onEnd: function(e) {
                    t(e, 2)
                }
            }), 0 != e && 3 != e || Sortable.create($(".add-item-two")[0], {
                handle: "img",
                delay: a,
                draggable: ".content-row",
                ghostClass: "placeholder-item",
                filter: ".title-row",
                onEnd: function(e) {
                    t(e, 4)
                }
            }), 4 == e && Sortable.create($(".add-item-three")[0], {
                handle: "img",
                delay: a,
                ghostClass: "placeholder-item",
                draggable: ".content-row",
                filter: ".title-row",
                onEnd: function(e) {
                    t(e, 3)
                }
            }), 5 == e && Sortable.create($(".add-item-four .sortable-list")[0], {
                handle: "img",
                delay: a,
                ghostClass: "placeholder-item",
                draggable: ".img-icon",
                onEnd: function(e) {
                    t(e, 5)
                }
            });
            var t = function(e, a) {
                var t, n = $(e.to),
                    i = [];
                e.oldIndex > e.newIndex ? (minIndex = e.newIndex, maxIndex = e.oldIndex) : (minIndex = e.oldIndex, maxIndex = e.newIndex), $.map(n.find(".img-icon"), function(e, a) {
                    a >= minIndex && a <= maxIndex && (t = $(e).data("appid"), i.push([t, a + 1]))
                }), params = {
                    type: a,
                    sort: i
                }, $.ajax({
                    url: $(".subscribeAppSortUrl").val(),
                    type: "POST",
                    dataType: "json",
                    data: params
                }).done(function(e) {
                    1e4 != e.code && swal(e.msg)
                }).fail(function() {
                    swal(Lang.request_error)
                })
            }
        };
    $(document).on("click", ".add-item-two .one-select", function() {
        var e = $(this);
        e.addClass("active"), e.find(".select-drop-list").show()
    }), $(document).on("click", ".alert-app-bk", function() {
        $(this).hide(), $(".alert-app").hide(), $("body").css("overflow", "visible")
    });
    var ka = function() {
            xa(), Ca()
        },
        Ca = function() {
            var e = $(".show-guide").val();
            1 == e && ($(".alert-guide").show(), $("body").css("overflow", "hidden"))
        },
        _a = 1;
    $(document).on("click", ".settingSubscribe .alert-guide", function() {
        var e = $(this),
            a = $(".subscribeGuidLogUrl").val(),
            t = $(".alert-guide .step"),
            n = $(".alert-guide .step-one"),
            i = $(".alert-guide .step-two"),
            o = $(".alert-guide .step-three");
        switch (t.removeClass("active"), _a++, _a) {
            case 1:
                n.addClass("active");
                break;
            case 2:
                i.addClass("active");
                break;
            case 3:
                o.addClass("active");
                break;
            default:
                e.hide(), $.post(a)
        }
    }), $(document).on("click", ".email-sub .img-icon .item-delete", function() {
        var e = $(this),
            a = (e.data("appid"), e.data("url")),
            t = [];
        return !e.hasClass("remove-ing") && (e.addClass("remove-ing"), void ajaxRequestAction(e, La, t, a))
    });
    var La = function(e, a, t) {
        return 1e4 != e.code ? (swal(e.msg), a.removeClass("remove-ing"), !1) : void a.parent(".img-icon").remove()
    };
    if ($(document).on("click", "#beecloud-pay-type a", function(e) {
            var a = $(this);
            a.hasClass("active") || a.addClass("active").siblings("a").removeClass("active")
        }), $(document).on("click", ".keyword-cover-order .package-btn-group a", function(e) {
            var a = $(this),
                t = $(".keyword-cover-order .block-b .weixin"),
                n = $(".keyword-cover-order .block-b .zhifubao"),
                i = a.data("val"),
                o = a.data("img"),
                s = $(".keyword-cover-order .block-e .price"),
                r = $(".keyword-cover-order .block-e .discount-price"),
                d = $(".keyword-cover-order .svip-box"),
                c = $(".keyword-cover-order .redeem-code-box"),
                l = $(".keyword-cover-order .order-index #svip"),
                p = $(".keyword-cover-order .service-content"),
                u = $(".keyword-cover-order .service-time"),
                h = $(".keyword-cover-order .pay-info");
            switch (h.css("display", "none"), 1 == $("#insider").val() && (i = 0), s[0].innerHTML = l.is(":checked") ? 0 : i, t.show(), n.removeClass("offset"), a.addClass("active").siblings().removeClass("active"), "" == o ? r.empty() : r.html('(<img src="/public/app/images/keyword-cover/' + o + '">)'), d.hide(), c.hide(), u.html("付款成功即可使用一次服务，覆盖方案即时生成"), a.data("type")) {
                case "base":
                    p.html("AI 关键词优化师依托现金算法，为您的 App 提供 1 套专业关键词覆盖方案，用于苹果开发者 App 提交时的关键词填写。"), d.show(), c.show();
                    break;
                case "standard":
                    p.html('AI 关键词优化师依托现金算法，为您的 App 提供 3 套专业关键词覆盖方案，用于苹果开发者 App 提交时三个地区（中国、英国、澳大利亚）的关键词填写。<a href="javascript:;" class="select-three-info">为什么要填写三个地区的关键词？</a>');
                    break;
                case "senior":
                    t.hide(), n.addClass("offset active"), t.removeClass("active"), p.html("行业顶尖优化师，根据产品所处行业、核心功能、用户特征与具体推广需求，为您的 App 提供定制关键词覆盖方案。"), u.html("三个工作日内"), h.css("display", "block")
            }
        }), $(document).on("click", ".keyword-cover-order .block-b a", function(e) {
            var a = $(this);
            a.addClass("active").siblings().removeClass("active")
        }), $(document).on("click", ".keyword-cover-order .order-index #svip", function(e) {
            var a = $(this),
                t = $(".keyword-cover-order .block-e .price"),
                n = $(".keyword-cover-order .package-btn-group a.active");
            t[0].innerHTML = a.is(":checked") ? 0 : n.data("val")
        }), $(document).on("input", ".keyword-cover-order .redeem-code", function(e) {
            var a = $(this),
                t = $(".keyword-cover-order .block-e .price"),
                n = $(".keyword-cover-order .package-btn-group a.active");
            t[0].innerHTML = a.val().length <= 0 ? n.data("val") : 0
        }), clickToHide($(".keyword-cover-order .close-select-three-info"), $(".keyword-cover-order .popup-box")), clickToHide($(".keyword-cover-order .popup-box .popup-bk"), $(".keyword-cover-order .popup-box")), $(document).on("click", ".keyword-cover-order .select-three-info", function(e) {
            $(".keyword-cover-order .popup-box").show()
        }), $(document).on("click", ".keyword-cover-order .block-e a", function(e) {
            var a = ($(this), $(".keyword-cover-order .order-index #svip")),
                t = $(".keyword-cover-order .order-index #read"),
                n = $("#orderUrl").val(),
                i = $(".keyword-cover-order .package-btn-group a.active").data("type"),
                o = ~~a.is(":checked"),
                s = $(".keyword-cover-order .redeem-code").val(),
                r = $(".keyword-cover-order .block-b a.active").data("type");
            return t.is(":checked") ? void $.ajax({
                    type: "GET",
                    url: n,
                    data: {
                        type: i,
                        svipBuy: o,
                        code: s,
                        payChannel: r
                    },
                    success: function(e) {
                        console.log(e), 1e4 == e.code ? 1 == e.callback ? buySubmit(e) : location.href = e.url : swal(e.msg)
                    }
                }) : (swal("请先阅读并同意服务协议书"), !1)
        }), $(document).on("click", ".keyword-cover-use-adjust .adjust-competitor .extend", function(e) {
            var a = $(this),
                t = a.parents(".adjust-competitor");
            t.hasClass("active") && !t.siblings(".adjust-competitor").hasClass("active") ? t.removeClass("active") : (t.addClass("active"), t.siblings(".adjust-competitor").removeClass("active"))
        }), $(document).on("click", ".keyword-cover-order-result .order-result-form .submit", function(e) {
            var a = ($(this), $(".keyword-cover-order-result #seniorUrl").val()),
                t = $(".keyword-cover-order-result .order-result-form .name").val(),
                n = $(".keyword-cover-order-result .order-result-form .email").val(),
                i = $(".keyword-cover-order-result .order-result-form .phone").val(),
                o = $(".keyword-cover-order-result .order-result-form .qqwx").val();
            return null == t || "" == t || void 0 == t ? (swal("姓名不能为空"), !1) : null == n || "" == n || void 0 == n ? (swal("邮箱不能为空"), !1) : null == i || "" == i || void 0 == i ? (swal("手机号不能为空"), !1) : null == o || "" == o || void 0 == o ? (swal("QQ/微信不能为空"), !1) : isEmail(n) ? isPhone(i) ? void $.ajax({
                                        type: "GET",
                                        url: a,
                                        data: {
                                            name: t,
                                            email: n,
                                            phone: i,
                                            qqwx: o
                                        },
                                        success: function(e) {
                                            1e4 == e.code ? swal({
                                                    title: "您已成功提交信息，我们将在1个工作日内与您联系。"
                                                }, function() {
                                                    location.href = e.url
                                                }) : swal("提交失败，请重新提交")
                                        }
                                    }) : (swal("手机号格式不符合规则"), !1) : (swal("邮箱格式不符合规则"), !1)
        }), $(document).on("click", ".keyword-cover-use .keyword-box", function(e) {
            var a = $(this),
                t = "",
                n = '<div class="input-box"><input type="text"></div>';
            (0 == a.find("li").length && 0 == a.find("input").length || 0 == a.find("input").length && 0 != $(e.target).has("li").length) && a.append(n), 0 != a.find("input").length && (t = a.find("input").val(), t.length && (a.append('<li><a href="javascript">' + t + '</a><i class="iconfont icon-guanbi"></i></li>'), a.find("div.input-box").remove())), a.find("input").focus(), $(document).on("keypress", function(e) {
                e.stopImmediatePropagation(), 13 == e.which && (t = a.find("input").val(), t.length && (a.append('<li><a href="javascript">' + t + '</a><i class="iconfont icon-guanbi"></i></li>'), a.find("div.input-box").remove()))
            })
        }), $(document).on("click", ".keyword-cover-use .keyword-box li>i", function(e) {
            var a = $(this),
                t = a.parents("li");
            t.remove()
        }), $(document).on("click", ".keyword-cover-use .confirm", function(e) {
            var a = ($(this), $(".keyword-cover-use .subUrl").val()),
                t = $(".keyword-cover-use .keyword-box li").length + 1,
                n = [],
                i = "";
            if (t > 11) return swal("当前输入的关键词超过10个，请修改！"), !1;
            for (var o = 1; o < t; o++) n.push($(".keyword-cover-use .keyword-box li:nth-child(" + o + ")>a").html());
            i = n.join(","), $.ajax({
                url: a,
                data: {
                    keywords: i
                },
                success: function(e) {
                    1e4 == e.code ? location.href = e.url : swal(e.msg)
                }
            })
        }), $(".keyword-cover-use-AI").length) {
        var Ta, Sa, Da = $(".min"),
            ja = $(".sec"),
            K = $("#checkUrl").val(),
            Ba = $("#countdown").val();
        setTimeout(D, 0);
        var Oa = setInterval(D, 1e3)
    }
    clickToHide($(".keyword-cover-use-complete .popup-close"), $(".keyword-cover-use-complete .popup-box")), clickToHide($(".keyword-cover-use-complete .popup-bk"), $(".keyword-cover-use-complete .popup-box")), $(document).on("click", ".keyword-cover-use-complete .plan-extend", function(e) {
        var a = $(this),
            t = a.siblings(".plan-content");
        "none" == t.css("display") ? (a.html("收起该组覆盖的关键词数量"), t.show()) : (a.html("查看该组覆盖的关键词数量"), t.hide())
    }), $(document).on("click", ".keyword-cover-use-adjust .adjust-self .user-adjust-keyword-list li>i", function(e) {
        var a = $(this),
            t = a.parents("li");
        t.remove()
    }), $(document).on("click", ".keyword-cover-use-adjust .del-adjust-keyword-list li a", function(e) {
        var a = $(this),
            t = a.parents("li");
        t.hasClass("active") ? t.removeClass("active") : t.addClass("active")
    }), $(document).on("click", ".keyword-cover-use-adjust .start-adjust", function(e) {
        var a = ($(this), $(".keyword-cover-use-adjust .subUrl").val()),
            t = [],
            n = "";
        $(".keyword-cover-use-adjust .user-adjust-keyword-list li a").each(function(e, a) {
            t.push($(a).html())
        }), n = t.join(",");
        var i = [],
            o = "";
        $(".keyword-cover-use-adjust .adjust-delete li.active a").each(function(e, a) {
            i.push($(a).html())
        }), o = i.join(","), $.ajax({
            url: a,
            data: {
                keywords: n,
                del_keywords: o
            },
            success: function(e) {
                1e4 == e.code ? location.href = e.url : swal(e.msg)
            }
        })
    }), $(document).on("click", ".keyword-cover-use-complete .no-satisfe-btn", function() {
        var e = $(".keyword-cover-use-complete .popup-no-box");
        e.show()
    }), $(document).on("click", ".keyword-cover-use-complete .yes-satisfe-btn", function() {
        var e = $(".keyword-cover-use-complete .popup-yes-box");
        e.show()
    }), $(document).on("click", ".keyword-cover-use-complete .close-popup", function() {
        $(".keyword-cover-use-complete .popup-box").hide()
    }), $(document).on("click", ".setting-content .ai-plan", function(e) {
        var a = $(this),
            t = $(".setting-content .popup-box"),
            n = $(".setting-content .popup-box .popup-con"),
            i = $(".setting-content .popup-box .popup-con .info-title"),
            o = $(".setting-content .popup-box .keyword-one"),
            s = $(".setting-content .popup-box .keyword-two"),
            r = $(".setting-content .popup-box .keyword-three"),
            d = a.data("url"),
            c = a.data("keywords"),
            l = a.data("msg");
        if (d && d.length && (location.href = d), c && c.length) switch (c.length) {
            case 1:
                n.addClass("active"), i.html("关键词覆盖:"), o.html(c[0]), t.show();
                break;
            case 3:
                n.removeClass("active"), i.html("关键词覆盖1:"), o.html(c[0]), s.html(c[1]), r.html(c[2]), t.show()
        }
        l && l.length && swal(l)
    }), $(document).on("click", ".setting-content .popup-box .popup-con>i,.setting-content .popup-box .popup-bk", function(e) {
        $(".setting-content .popup-box").hide()
    }), $(".keyword-cover-use-js").length && ($(".add-item-user-product").find(".img-icon").length < 1 ? $(".keyword-cover-use .add-content-mine").show() : $(".keyword-cover-use .add-content-mine").hide(), $(".add-item-user-compet").find(".img-icon").length < 3 ? $(".keyword-cover-use .add-content-other").show() : $(".keyword-cover-use .add-content-other").hide()), $(".keyword-cover-use-adjust").length && ($(".adjust-app").find(".img-icon").length < 3 ? $(".keyword-cover-use-adjust .add-content-adjust").show() : $(".keyword-cover-use-adjust .add-content-adjust").hide())
}), centerModals(), $(window).on("resize", centerModals), moreBtnShow(), $("#keyword-list").length && $("#is_android").length ? dataSearchPush_android() : dataSearchPush(), $(document).on("tap click", ".keyword-summary .word-num", function() {
    var e = $(this);
    $("html,body").animate({
        scrollTop: $("#keyword-list").offset().top - 180
    }, 200);
    var a = $("#keyword-list");
    a.find(".spinner-bg").addClass("show").find(".spinner").addClass("show"), a.find(".table").find(".table-body").addClass("hide"), setTimeout(function() {
        a.find(".spinner-bg").removeClass("show").find(".spinner").removeClass("show"), a.find(".table").find(".table-body").removeClass("hide");
        var t = e.parent("tr"),
            n = t.data("hintsmin") || "",
            i = t.data("hintsmax") || "",
            o = e.data("rankmin") || "",
            s = e.data("rankmax") || "";
        $("#minHints").val(n), $("#maxHints").val(i), $("#minRank").val(o), $("#maxRank").val(s), $(".screen-nav .btn-group input").keyup()
    }, 200)
}), $(document).on("tap click", ".keyword-summary .vs-table a", function() {
    var e = $(this),
        a = "." + e.data("class"),
        t = ".title-forth .title-" + e.data("type"),
        n = $(a).val();
    return 0 != n.length && ($(".title-forth .title-mark").hide(), $(t).show(), $("#return-show").show(), $(".rank-title").text($(".rank-title").data(e.data("type"))), $(".export-excel,.add-custom-keyword").hide(), n = $.parseJSON(n), window.diff = 1, void window.tableSort.clear().rows.add(n).draw())
}), $(document).on("tap click", "#return-show", function() {
    $(this).hide(), $(".title-forth .title-mark").hide(), $(".export-excel,.add-custom-keyword").show(), $(".rank-title").text($(".rank-title").data("normal")), window.diff = 0, window.tableSort.clear().rows.add(window.tableData).draw()
}), $.fn.dataTableExt.oSort["chinese-asc"] = function(e, a) {
    return e.localeCompare(a)
}, $.fn.dataTableExt.oSort["chinese-desc"] = function(e, a) {
    return a.localeCompare(e)
}, data = $("#table-optimization-data").html(), data && createTableOptKeyword(data), $(document).on("order.dt", "#opt-keyword-sort", function() {
    if (!window.tableSortOpt || !window.tableSortOpt.order()[0]) return !1;
    var e, a, t, n, i = $(this),
        o = window.tableSortOpt.order(),
        s = o[0][0];
    e = i.find("th:eq(" + s + ")"), a = e.attr("class"), t = e.find(".icon-up"), n = e.find(".icon-down"), e.siblings().find(".icon").removeClass("active"), "sorting_asc" == a ? (t.addClass("active"), n.removeClass("active")) : (t.removeClass("active"), n.addClass("active"))
}), window.searchType = "", downSources(), $("#hotDraw").length > 0, keywordRepertory(), showChangePd(), detect(), base_info_show(), commentFold(), window.clientShare = function() {
    var e = "app://share?title=" + encodeURIComponent(wechatShare.title) + "&content=" + wechatShare.desc + "&url=" + encodeURIComponent(wechatShare.link) + "&image=" + encodeURIComponent(wechatShare.imgUrl) + "&t=" + +new Date;
    location.href = e
}, window.analysis = function(e, a) {
    var n = "/api/eventAnalysis?c=" + e + "&a=" + a;
    n += "&u=" + encodeURIComponent(document.location.href), n += "&r=" + encodeURIComponent(document.referrer);
    var i = new Image,
        o = "aso100_log_" + Math.floor(2147483648 * Math.random()).toString(36);
    window[o] = i, i.onload = i.onerror = i.onabort = function() {
        i.onload = i.onerror = i.onabort = t, i = window[o] = t
    }, i.src = n
};