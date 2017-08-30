/**
 * Created by Administrator on 2017/8/11.
 */
function resetTableIndex(a) {
    var e = 0;
    1 == a.children().length ? a.find(".nodata").show() : (a.find(".nodata").hide(), a.find("tr").each(function() {
            $(this).find(".num").text(e), e++
        }))
}
function numAddZero(a) {
    var a = parseInt(a);
    return a >= 10 ? a : "0" + a
}
function getInt(a) {
    return parseInt(a.replace("px", ""))
}
function isEmail(a) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(a)
}
function isPhone(a) {
    return /^13[\d]{9}$|^14[0-9]\d{8}|^15[0-9]\d{8}$|^18[0-9]\d{8}$|^17[035678]\d{8}$|^19[89]\d{8}$|^166\d{8}$/.test(a)
}
function clearNewMark() {
    return !!$("#nav-list").length && void $.each($("#nav-list li.new"), function(a, e) {
            $(this).removeClass("new")
        })
}
function wechatSharePop() {
    $(".arrow").is(":hidden") ? ($(".arrow").show(), $(".vip-b").addClass("wechat-share").show()) : ($(".vip-b").removeClass("wechat-share").hide(), $(".arrow").hide())
}
function clickToHide(a, e) {
    a.on("tap click", function(a) {
        return a.stopImmediatePropagation(), e.fadeOut(), !1
    })
}
function loadCodeImage(a) {
    a.attr("src", a.attr(".src")), a[0].onload = function() {
        load = 0
    }, a[0].onerror = function() {
        if (load--, !(load <= 0)) {
            var a = $(this),
                e = a.attr("src");
            e.indexOf("?") != -1 ? e = e.replace(/\?.*/i, "?" + +new Date) : e += "?" + +new Date, a.attr("src", e)
        }
    }
}
function loginByAlert(a) {
    var e = $(a).data("class") || "",
        t = $("#alert-signIn");
    t.length ? (t.show(), e && t.addClass(e).data("extendClass", e)) : $.get("/public/signinAlert", function(a) {
            var t = $(a);
            $("body").append(t), t.show().find(".form-horizontal").data("referrer", location.href), accountPwd(t.find(".form-horizontal")), t.find("#code-img").length && loadCodeImage(t.find("#code-img")), e && t.addClass(e).data("extendClass", e)
        })
}
function showOpenVipSwal(a) {
    if (a.indexOf("vip-info") == -1) swal(a);
    else if (a.indexOf("ssvip") == -1) if (a.indexOf("keyword") == -1) swal({
        title: a,
        html: !0,
        showCancelButton: !0,
        confirmButtonText: Lang.open_btn[LangObj.openVipType]
    }, function() {
        setTimeout(function() {
            window.open("/account/setting/type/settingVip")
        }, 100)
    });
    else {
        var e = $("#alert-vip");
        e.fadeIn(400), e.find(".alert-vip-msg").html(a), e.find(".alert-vip-close,.alert-vip-bg").click(function() {
            e.fadeOut(400)
        }), e.find(".manage-word").click(function() {
            setTimeout(function() {
                $('.add-custom-keyword .btn[type="manage"]').click()
            }, 200), e.fadeOut(200)
        }), e.find(".open-vip").html(Lang.open_btn[LangObj.openVipType]), e.find(".open-vip").click(function() {
            setTimeout(function() {
                window.open("/account/setting/type/settingVip")
            }, 100), e.fadeOut(400)
        })
    } else swal({
        title: a,
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
function ajaxRequestAction(a, e, t, n) {
    a.hasClass("btn") && (a.addClass("disabled"), a.attr("disabled", !0)),
        $.ajax({
        type: a.data("type") || "GET",
        url: n || a.data("action"),
        data: t || a.data("datas") || "",
        success: function(n) {
            a.hasClass("btn") && (a.removeClass("disabled"), a.attr("disabled", !1)), e ? e(n, a, t) : 1e4 != n.code && swal(n.msg)
        }
    })
}
function ajaxSendForm(a, e, t) {
    e.addClass("disabled"), e.attr("disabled", !0), $.ajax({
        type: "POST",
        url: a.attr("action"),
        data: a.serialize(),
        success: function(a) {
            return e.removeClass("disabled"), e.attr("disabled", !1), t ? (t(), !1) : void swal(a.msg)
        }
    })
}
function dataCenterDeleteAction(a) {
    if (!$("#dataCenter").length) return !1;
    var e = $("#dataCenter .dcbc-nav-tab a").data("platform");
    1 == e ? (a.parents(".list").remove(),
            $("#dataCenter #dcbcBodyAndroid .list .appinfo .number").each(function(a, e) {
            $(e).html(a + 1)
        })) : (a.parents(".dcbct-tbody-info-chart").remove(), $("#dataCenter #dcbcBodyIos .dcbct-tbody-info-chart .dcbc-table-num").each(function(a, e) {
            $(e).html(a + 1)
        }))
}
function getDataCenterKeyword() {
    if (!$("#dataCenter").length) return !1;
    var a, e = $("#dataCenter #dcbNavWord"),
        t = e.data("ajaxurl"),
        n = $("#dataCenter #dcbCopyWord .dcb-content-table").clone();
    return !!t && void $.getJSON(t, {}, function(t, i) {
            1e4 == t.code && t.html && (e.find(".dcb-content-no-data").addClass("hidden"), $.each(t.html, function(t, i) {
                a = n.clone(), a.find(".word-text").text(i.word), a.find("tbody").html(i.list), a.find(".dcbct-word-del").data("word", i.word), e.find(".dcb-content-add").after(a)
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
    var a = $("#dataCenter #dcbcBodyIos .dcbct-body-action-td .action-info:eq(0)");
    a.trigger("click")
}
function dataCenterModifyRowData(a, e, t) {
    return !!a && void $.ajax({
            url: e,
            type: "POST",
            dataType: "json",
            data: t,
            success: function(e) {
                var t = e.data.out_html;
                1e4 == e.code ? (e.isInvest ? a.find(".dcbct-body-info-tr td").filter(":eq(1),:eq(2),:eq(3),:eq(4)").remove() : a.find(".dcbct-body-info-tr td").filter(":eq(1),:eq(2),:eq(3),:eq(4),:eq(5)").remove(), a.find(".dcbct-info-name a").text(t.app_info.app_name), a.find(".dcbc-table-icon a .icon").attr("src", t.app_info.icon), a.find(".dcbct-body-info-tr td:eq(0)").after(t.num_html), a.find(".spinner-box").addClass("animation-hide")) : swal(e.msg)
            }
        })
}
function dataCenterLoadChartData(a, e, t) {
    function n(a, e) {
        a.find(".data-show").length && a.find(".data-show").html(e)
    }
    function i(a, e) {
        a.find("tbody").length && (a.find("tbody").html(e), a.find("tbody .chart-show").each(function(a, e) {
            var t = $(this),
                n = t.data("chartdata");
            o(t, n)
        }))
    }
    function o(a, e) {
        if (!e) return !1;
        var t = a.find(".chart-data"),
            n = e;
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
                positioner: function(a, e, t) {
                    var n = t.plotX;
                    return this.chart.plotWidth < t.plotX + a ? n = t.plotX - .8 * a : t.plotX < this.chart.plotLeft && (n = t.plotX + .2 * a), {
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
                    return '<tr><td style="color:' + this.series.color + ' !important;padding-right: 3px !important;">鈼�</td><td>' + this.series.name + '</td><td style=" padding-left: 7px !important; color:' + this.series.color + ' !important;">' + Math.abs(this.y) + "</td></tr>"
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
    function s(a, e) {
        if (!e) return !1;
        var t = a.find(".chart-data"),
            n = "undefined" == typeof a.data("reversed") || a.data("reversed"),
            i = [],
            o = ["#00BC93", "#ea5a5a", "#428edc", "#e2719e", "#e58844", "#5dcfa3", "#61b5d6", "#5fd055", "#e5da19", "#ee4f89", "#b47b42"];
        if (e.list) {
            var s = 0;
            for (index in e.list) e.list[index] && (e.list[index].color = o[s], i.push(e.list[index])), s++
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
                min: e.min_date,
                max: e.max_date,
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
                    var a, e, t = [],
                        n = 1;
                    for (this.dataMax < 5 ? (a = 1, e = 5) : this.dataMax < 20 ? (a = 5, e = 20) : this.dataMax < 50 ? (a = 10, e = 50) : this.dataMax < 100 ? (a = 20, e = 100) : this.dataMax < 500 ? (a = 100, e = 500) : this.dataMax < 1500 ? (a = 500, e = 1500) : (e = this.dataMax + 10, a = Math.ceil(1e3 * Math.ceil(e / 1e3) / 5)), 0 == this.dataMin && (n = 0), t.push(n), n; n - a <= e; n += a) n <= 1 || n == this.dataMin - 1 || t.push(this.dataMin > 1 ? n - 1 : n);
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
                positioner: function(a, e, t) {
                    var n = t.plotX;
                    return this.chart.plotWidth < t.plotX + a ? n = t.plotX - .8 * a : t.plotX < this.chart.plotLeft && (n = t.plotX + .6 * a), {
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
                    return '<tr><td style="color:' + this.series.color + ' !important;padding-right: 3px !important;">鈼�</td><td>' + this.series.name + '</td><td style=" padding-left: 7px !important; color:' + this.series.color + ' !important;">' + Math.abs(this.y) + "</td></tr>"
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
                        radius: e.total > 360 ? 1 : 2,
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
    function r(a, e) {
        if (!e) return !1;
        var t = a.find(".chart-data"),
            n = [],
            i = ["#00BC93", "#ea5a5a"];
        if (e.list) {
            var o = 0;
            for (index in e.list) e.list[index] && (e.list[index].color = i[o], n.push(e.list[index])), o++
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
                min: e.min_date,
                max: e.max_date,
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
                positioner: function(a, e, t) {
                    var n = t.plotX;
                    return this.chart.plotWidth < t.plotX + a ? n = t.plotX - .8 * a : t.plotX < this.chart.plotLeft && (n = t.plotX + .6 * a), {
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
                    return '<tr><td style="color:' + this.series.color + ' !important;padding-right: 3px !important;">鈼�</td><td>' + this.series.name + '</td><td style=" padding-left: 7px !important; color:' + this.series.color + ' !important;">' + Math.abs(this.y) + "</td></tr>"
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
    function d(a, e) {
        if (!e) return !1;
        var n = a.find(".chart-data"),
            i = e.chardata,
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
                    var a = [],
                        e = 1,
                        t = this.dataMax + 10,
                        n = Math.ceil(100 * Math.ceil(t / 100) / 5);
                    for (a.push(e), e; e - n <= t; e += n) e <= 1 || e == this.dataMin - 1 || a.push(e - 1);
                    return a
                }
            },
            tooltip: {
                crosshairs: {
                    color: "#C0C0C0"
                },
                positioner: function(a, e, t) {
                    var n = t.plotX;
                    return this.chart.plotWidth < t.plotX + a ? n = t.plotX - .8 * a : t.plotX < this.chart.plotLeft && (n = t.plotX + .6 * a), {
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
                    return '<tr><td style="color:' + this.series.color + ' !important;padding-right: 3px !important;">鈼�</td><td>' + this.series.name + '</td><td style=" padding-left: 7px !important; color:' + this.series.color + ' !important;">' + Math.abs(this.y) + "</td></tr>"
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
    function c(a, e) {
        if (!e || 0 == e.chardata.length) return !1;
        var t = a.find(".chart-data"),
            n = e.chardata,
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
                positioner: function(a, e, t) {
                    var n = t.plotX;
                    return this.chart.plotWidth < t.plotX + a ? n = t.plotX - .8 * a : t.plotX < this.chart.plotLeft && (n = t.plotX + .6 * a), {
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
                    return '<tr><td style="color:' + this.series.color + ' !important;padding-right: 3px !important;">鈼�</td><td>' + this.series.name + '</td><td style=" padding-left: 7px !important; color:' + this.series.color + ' !important;">' + Math.abs(this.y) + "</td></tr>"
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
    return !!a && (e || (e = a.find(".get-analysis-data").data("ajaxurl") || ""), t || (t = a.find(".get-analysis-data").data("querydata") || {}), a.hasClass("data-ready") || a.find(".spinner-box").addClass("show"), void $.ajax({
            url: e,
            type: "GET",
            dataType: "json",
            data: t,
            success: function(e) {
                var t = e.data;
                1e4 == e.code ? (e.isInvest ? (s(a.find(".rank-chart"), t.rankWeek), s(a.find(".keyword-chart"), t.rankMonth), s(a.find(".download-chart"), t.futureDownload)) : (d(a.find(".keyword-chart"), t.keyword), c(a.find(".download-chart"), t.download), s(a.find(".rank-chart"), t.rank), i(a.find(".focus-keyword-chart"), t.custom), n(a.find(".shelves-chart"), t.shelves)), r(a.find(".comment-chart"), t.comment), a.find(".spinner-box").removeClass("show").addClass("animation-hide"), a.addClass("data-ready")) : swal(e.msg)
            }
        }))
}
function dataCenterDrag() {
    return !1
}
function centerModals() {
    $(".modal").each(function(a) {
        if (!$(this).hasClass("avatar-modal")) {
            var e = $(this).clone().css("display", "block").appendTo("body"),
                t = Math.round((e.height() - e.find(".modal-content").height()) / 2);
            t = t > 0 ? t : 0, e.remove(), $(this).find(".modal-content").css("margin-top", t)
        }
    }), $(".modal").on("show.bs.modal", centerModals)
}
function moreBtnShow() {
    $("table.version").length > 0 && $.each($(".version-desc"), function(a, e) {
        200 == $(this).height() && $(this).find("span").removeClass("hide")
    })
}
function wechatShareGetJifen(a) {
    return !!a.sign && void $.ajax({
            type: "get",
            url: "/account/wechatShare",
            data: {
                sign: a.sign
            },
            dataType: "json",
            success: function(a) {}
        })
}
function refreshPage() {
    $.pjax.reload("#container")
}
function pjaxLoad(a, e) {
    a && (e || (e = "#container"), $.pjax({
        url: a,
        container: e,
        scrollTo: !1
    }))
}
function bindWechat(a, e) {
    var t, n = $(a),
        i = n.data("type") || "",
        o = n.data("qrcodeurl"),
        s = n.data("checkurl"),
        r = n.data("bindinwechat"),
        d = n.data("title") || Lang.bindWechat_title;
    return requestTimes = 0, extendClass = n.data("class") || "", window.isWechat && !e ? ($.getJSON(r, function(e) {
            1e4 == e.code ? swal({
                    title: "绑定成功",
                    type: "success"
                }, function() {
                    var a = document.location.href;
                    a += a.indexOf("?") != -1 ? "&" : "?";
                    var e = a.match(/t=\d+/i);
                    a = e ? a.replace(e, "t=" + +new Date) : a + "t=" + +new Date, document.location.href = a
                }) : bindWechat(a, !0)
        }), !1) : window.isWechat && 2 == e ? (wechatSharePop(), !1) : (swal({
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
            }), void(o && $.getJSON(o, function(a) {
                if (1e4 == a.code) {
                    if ($("#wechat-qrcode img").attr("src", a.imgsrc), $(".wechat-qrcode-desc").html(a.desc), $("#wechat-qrcode img")[0].onload = function() {
                            $("#wechat-qrcode .logo").show()
                        }, !s) return;
                    t = setInterval(function() {
                        requestTimes++, requestTimes >= 100 && ($(".sa-button-container .confirm").trigger("click"), clearInterval(t)), $.getJSON(s, function(a) {
                            if (1e4 == a.code) {
                                $(".wechat-qrcode-desc").html(a.msg), clearInterval(t);
                                var e;
                                if (i && "alertlogin" == i) e = "/account/signin/?t=" + +new Date;
                                else {
                                    e = document.location.href, e += e.indexOf("?") != -1 ? "" : "?";
                                    var n = e.match(/t=\d+/i);
                                    e = n ? e.replace(n, "t=" + +new Date) : e + "&t=" + +new Date
                                }
                                document.location.href = e
                            } else 10108 == a.code && (clearInterval(t), swal({
                                title: a.msg,
                                type: "error",
                                showCancelButton: !1,
                                confirmButtonColor: "#33ba95",
                                confirmButtonText: Lang.confirm_btn,
                                cancelButtonText: Lang.cancel_btn
                            }))
                        })
                    }, 1500)
                } else swal({
                    title: a.msg,
                    type: "error",
                    showCancelButton: !1,
                    confirmButtonColor: "#33ba95",
                    confirmButtonText: Lang.confirm_btn,
                    cancelButtonText: Lang.cancel_btn
                })
            })))
}
function setTitle(a) {
    $("head title").html(decodeURI(a));
    var e = location.pathname.split("/")[2];
    e = e.replace(/([A-Z])/g, "-$1").toLowerCase(), e = "container-" + e, $("#container").attr("class", "container-box " + e)
}
function unBindWechat(a) {
    var e = $(a),
        t = e.data("url");
    $.getJSON(t, function(a) {
        1e4 == a.code ? swal({
                title: Lang.unbindWechat_title,
                showConfirmButton: !0,
                confirmButtonText: Lang.confirm_btn,
                cancelButtonText: Lang.cancel_btn,
                confirmButtonColor: "#0bb995"
            }, function() {
                document.location.reload()
            }) : swal(a.msg, "", "error")
    })
}
function dataSearchPush_android() {
    $.fn.dataTable.ext.search.push(function(a, e, t) {
        var n, i = parseInt($("#minHints").val(), 10),
            o = parseInt($("#maxHints").val(), 10);
        return n = parseFloat(e[10]) || 0, !! (isNaN(i) && isNaN(o) || isNaN(i) && n <= o || i <= n && isNaN(o) || i <= n && n <= o)
    }), $(document).on("keyup", ".screen-nav .btn-group input", function() {
        var a = $(this);
        a.val() ? a.addClass("hasData") : a.removeClass("hasData"), $(".screen-nav .hasData").length > 0 ? $("#clear-screen").show() : $("#clear-screen").hide(), window.tableSort && window.tableSort.draw(), window.keywordExtend && window.keywordExtend.draw()
    })
}
function dataSearchPush() {
    $.fn.dataTable.ext.search.push(function(a, e, t) {
        var n, i = parseInt($("#minHints").val(), 10),
            o = parseInt($("#maxHints").val(), 10);
        return n = $("#is_android").length ? parseFloat(e[10]) || 0 : parseFloat(e[3]) || 0, !! (isNaN(i) && isNaN(o) || isNaN(i) && n <= o || i <= n && isNaN(o) || i <= n && n <= o)
    }), $.fn.dataTable.ext.search.push(function(a, e, t) {
        var n = parseInt($("#minResult").val(), 10),
            i = parseInt($("#maxResult").val(), 10),
            o = parseFloat(e[4]) || 0;
        return !!(isNaN(n) && isNaN(i) || isNaN(n) && o <= i || n <= o && isNaN(i) || n <= o && o <= i)
    }), $.fn.dataTable.ext.search.push(function(a, e, t, n, i) {
        var o = parseInt($("#minRank").val(), 10),
            s = parseInt($("#maxRank").val(), 10);
        if (window.tableSort) var r = parseFloat(e[1]) || 0;
        if (window.keywordExtend) var r = parseFloat(e[4]) || 0;
        return !!(isNaN(o) && isNaN(s) || isNaN(o) && r <= s || o <= r && isNaN(s) || o <= r && r <= s)
    }), $(document).on("keyup", ".screen-nav .btn-group input", function() {
        var a = $(this);
        a.val() ? a.addClass("hasData") : a.removeClass("hasData"), $(".screen-nav .hasData").length > 0 ? $("#clear-screen").show() : $("#clear-screen").hide(), window.tableSort && window.tableSort.draw(), window.keywordExtend && window.keywordExtend.draw()
    }), $(document).on("click", "#clear-screen", function() {
        $(".screen-nav input").val(""), window.tableSort && window.tableSort.draw(), window.keywordExtend && window.keywordExtend.draw(), $("#clear-screen").hide()
    })
}
function dataTables(a, e) {
    var t = a,
        n = t.data("keywordurl"),
        i = t.data("hintsurl"),
        o = t.data("numberurl"),
        s = t.data("nosignin"),
        r = t.data("plat");
    return !!t && (window.tableSort && (window.tableSort = null), window.diff = e, void(r ? (window.tableSort = t.DataTable({
                dom: window.isMobile ? "frtip" : "lfrtip",
                data: window.tableData,
                order: [],
                lengthMenu: [100, 200, 500, 1e3],
                lengthChange: !window.isMobile,
                searching: !0,
                searchDelay: 200,
                autoWidth: !1,
                createdRow: function(a, e, t) {
                    e[4] && $(a).addClass("bg"), $(a).addClass("keyword-histroy")
                },
                columnDefs: [{
                    className: "sort-word",
                    type: "chinese",
                    data: function(a, e, t, i) {
                        return "sort" === e ? a[0] : '<a href="' + n + encodeURIComponent(a[0]) + '" target="_blank">' + a[0] + "</a>"
                    },
                    targets: 0
                }, {
                    orderSequence: ["desc", "asc"],
                    className: "sort-rank",
                    type: "numeric",
                    data: function(a, e, t, n) {
                        if (window.diff) return a[1];
                        var i, o = a[1];
                        return "sort" === e ? parseInt(o) : i = 0 == o ? "- " + Lang.down_list : o
                    },
                    targets: 1
                }, {
                    orderSequence: ["desc", "asc"],
                    className: "sort-rank",
                    type: "numeric",
                    data: function(a, e) {
                        if (window.diff) return a[7];
                        var t, n, i, o = a[7];
                        return "sort" === e ? parseInt(o) : (o > 0 ? (n = "top", i = Lang.rise + o + Lang.staff) : 0 == o ? (n = "right", i = Lang.unchanged) : (n = "bottom", i = Lang.decline + Math.abs(o) + Lang.staff), t = '<div class="' + n + '" title="' + Lang.compared_to_yesterday_ranking + i + '"><span class="glyphicon glyphicon-triangle-' + n + '" aria-hidden="true"></span><span>' + Math.abs(o) + "</span></div>")
                    },
                    targets: 2
                }, {
                    orderSequence: ["desc", "asc"],
                    className: "sort-nums",
                    data: function(a, e, t, n) {
                        return '<a class="number" href="' + i + a[6] + '" target="_blank">' + a[2] + "</a>"
                    },
                    targets: 3
                }, {
                    orderable: !1,
                    data: function(a, e, t, n) {
                        var i, o, r, d, c;
                        return c = isMobile ? "" : "tooltip", i = "", 0 == s && (1 == a[4] ? (r = Lang.cancel_btn, o = "icon-cancel custom-remove-android", d = Lang.cancel_attention) : (r = Lang.set_top, o = "icon-top add-custom-keyword-btn-android", d = Lang.add_attention), i += '<span class="icon ' + o + '" type="add" data-keyword="' + a[0] + '" data-id="' + a[6] + '" data-type="cancel" data-toggle="' + c + '" data-original-title="' + d + '">' + r + "</span>"), i
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
                    searchPlaceholder: "多个词同时搜索用鈥淺uff0c鈥漒u9694开",
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
                createdRow: function(a, e, t) {
                    e[4] && $(a).addClass("bg"), $(a).addClass("keyword-histroy")
                },
                columnDefs: [{
                    className: "sort-word",
                    type: "chinese",
                    data: function(a, e, t, i) {
                        return "sort" === e ? a[0] : '<a href="' + n + encodeURIComponent(a[0]) + '" target="_blank">' + a[0] + "</a>"
                    },
                    targets: 0
                }, {
                    orderSequence: ["desc", "asc"],
                    className: "sort-rank",
                    type: "numeric",
                    data: function(a, e, t, n) {
                        if (window.diff) return a[1];
                        var i, o = a[1];
                        return "sort" === e ? parseInt(o) : i = 0 == o ? "- " + Lang.down_list : o
                    },
                    targets: 1
                }, {
                    orderSequence: ["desc", "asc"],
                    className: "sort-rank",
                    type: "numeric",
                    data: function(a, e) {
                        if (window.diff) return a[7];
                        var t, n, i, o = a[7];
                        return "sort" === e ? parseInt(o) : (o > 0 ? (n = "top", i = Lang.rise + o + Lang.staff) : 0 == o ? (n = "right", i = Lang.unchanged) : (n = "bottom", i = Lang.decline + Math.abs(o) + Lang.staff), t = '<div class="' + n + '" title="' + Lang.compared_to_yesterday_ranking + i + '"><span class="glyphicon glyphicon-triangle-' + n + '" aria-hidden="true"></span><span>' + Math.abs(o) + "</span></div>")
                    },
                    targets: 2
                }, {
                    orderSequence: ["desc", "asc"],
                    className: "sort-nums",
                    data: function(a, e, t, n) {
                        return '<a class="number" href="' + i + a[6] + '" target="_blank">' + a[2] + "</a>"
                    },
                    targets: 3
                }, {
                    orderSequence: ["desc", "asc"],
                    className: "sort-index",
                    data: function(a, e, t, n) {
                        return '<a class="number" href="' + o + a[6] + '" target="_blank">' + a[3] + "</a>"
                    },
                    targets: 4
                }, {
                    orderable: !1,
                    data: function(a, e, t, n) {
                        var i, o, r, d, c;
                        return c = isMobile ? "" : "tooltip", i = '<span class="icon icon-trend histroy" data-id="' + a[6] + '" data-toggle="' + c + '" data-original-title="' + Lang.show_history_trend + '">' + Lang.trend + "</span>", 0 == s && (1 == a[4] ? (r = Lang.cancel_btn, o = "icon-cancel custom-remove", d = Lang.cancel_attention) : (r = Lang.set_top, o = "icon-top add-custom-keyword-btn", d = Lang.add_attention), i += '<span class="icon ' + o + '" type="add" data-keyword="' + a[0] + '" data-id="' + a[6] + '" data-type="cancel" data-toggle="' + c + '" data-original-title="' + d + '">' + r + '</span><i class="iconfont icon-wodedingdan03 shopping-cart mobile-hide" data-id="' + a[6] + '"></i>'), i
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
                    searchPlaceholder: "多个词同时搜索用鈥淺uff0c鈥漒u9694开",
                    searchWidth: "168px"
                }
            })))
}
function dataTables_android(a, e) {
    var t = a,
        n = t.data("keywordurl"),
        i = (t.data("hintsurl"), t.data("numberurl"), t.data("nosignin")),
        o = $("#keyword-list");
    return setTimeout(function() {
        o.find(".table").find(".table-body").removeClass("hide"), o.find(".spinner-bg").removeClass("show").find(".spinner").removeClass("show")
    }, 200), !! t && (window.tableSort && (window.tableSort = null), window.diff = e, void(window.tableSort = t.DataTable({
        dom: window.isMobile ? "frtip" : "lfrtip",
        data: window.tableData,
        order: [],
        lengthMenu: [100, 200, 500, 1e3],
        lengthChange: !window.isMobile,
        searching: !0,
        searchDelay: 200,
        autoWidth: !1,
        createdRow: function(a, e, t) {
            e[12] && $(a).addClass("bg"), $(a).addClass("keyword-histroy")
        },
        columnDefs: [{
            orderable: !1,
            className: "sort-word",
            type: "chinese",
            data: function(a, e, t, i) {
                return "sort" === e ? a[0] : '<a href="' + n + encodeURIComponent(a[0]) + '" target="_blank">' + a[0] + "</a>"
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
            data: function(a, e, t, n) {
                return a[10]
            },
            targets: 10
        }, {
            orderable: !1,
            data: function(a, e, t, n) {
                var o, s, r, d, c;
                return c = isMobile ? "" : "tooltip", o = "", 0 == i && (1 == a[12] ? (r = Lang.cancel_btn, s = "icon-cancel custom-remove-android", d = Lang.cancel_attention) : (r = Lang.set_top, s = "icon-top add-custom-keyword-btn-android", d = Lang.add_attention), o += '<span class="icon ' + s + '" type="add" data-keyword="' + a[0] + '" data-id="' + a[11] + '" data-type="cancel" data-toggle="' + c + '" data-original-title="' + d + '">' + r + "</span>"), o
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
            searchPlaceholder: "多个词同时搜索用鈥淺uff0c鈥漒u9694开",
            searchWidth: "168px"
        }
    })))
}
function dataTablesAsoCompire(a, e) {
    var t = a;
    t.length > 0 && 1 != t.find("tbody").find("tr td").length && (e ? t.dataTable({
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
    var a = $(".top-back-mobile");
    return a.length > 0 && (a.on("click", function() {
        $("html, body").animate({
            scrollTop: "0px"
        }, 200)
    }), $(document).on("scroll", function() {
        $(document).scrollTop() > 300 ? a.hide() : a.hide()
    })), $(".rank-index").length > 0 && $('a[target="_blank"]').each(function(a, e) {
        $(e).attr("target", "_self")
    }), !1
}
function footerFixed() {
    function a() {
        var a = $(this).width(),
            s = $(this).height();
        t < s ? e.addClass("fixed") : e.removeClass("fixed"), a < 1200 ? (n.hide(), o = !1) : (o = !0, i && n.hide())
    }
    var e = $(".footer");
    if (e.length <= 0) return !1;
    var t = e.offset().top + e.outerHeight(),
        n = $(".top-back"),
        i = !1,
        o = !0;
    parseInt(n.css("right"));
    t < $(window).height() ? e.addClass("fixed") : e.removeClass("fixed"), n.length > 0 && (n.on("click", function() {
        $("html, body").animate({
            scrollTop: "0px"
        }, 800)
    }), $(document).on("scroll", function() {
        o && $(document).scrollTop() > 100 ? (n.hide(), i = !0) : (n.hide(), i = !1)
    })), a(), $(window).on("resize", a)
}
function addMyApp(a, e, t) {
    if (a) {
        if (e = $(e), e.hasClass("disabled")) return !1;
        var n, i = e.data("name"),
            o = e.data("url"),
            s = e.data("reload"),
            t = t,
            r = e.html();
        if (s = "undefined" == typeof s ? 1 : s, n = $('input[name="platform-type"]').val() || "0", $.inArray(n, ["0", "1"]) == -1) return swal("参数错误，刷新后重试"), !1;
        e.html(Lang.now_adding);
        var d = "/account/addMyFavorite";
        $.ajax({
            type: "get",
            url: d,
            data: {
                appid: a,
                platform: n
            },
            dataType: "json",
            success: function(d) {
                if (d && 1e4 == d.code) if (data = d.data, s) window.location.reload();
                else {
                    "app" == t ? e.html('<a role="button" href="javascript:void(0);" class="btn btn-default" onclick="delMyAppAtInfo(' + a + ');"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>&nbsp;' + Lang.cancel_add + "</a>") : "datacenter" == t ? e.parent().html('<button href="javascript:void(0);" class="btn btn-custom disabled" data-url="' + o + '" data-name="' + i + '" onclick="delMyAppAtInfo(' + a + ',this,datacenter);">' + Lang.added + "</button>") : e.parent().html('<a role="button" href="javascript:void(0);" data-reload="0" data-url="' + o + '" data-name="' + i + '" class="btn btn-custom btn-default btn-padding" onclick="delMyAppAtInfo(' + a + ', this);"><span class="glyphicon glyphicon-aso-move" aria-hidden="true"></span>&nbsp;' + Lang.cancel_add + "</a>");
                    var c = 0 == data.platform ? "iOS" : "Android",
                        l = ".platform-" + data.platform,
                        p = newDiv = newLi = "";
                    if (newDiv = '<div class="platform-' + data.platform + '">', newDiv += '<div class="clearfix myapp-title"><span class="myapp-text">' + c + '</span><a class="myapp-btn" href="' + data.manageUrl + '">管理我的应用</a></div>', newDiv += '<i class="line myapp-list-' + data.platform + '"></i>', newLi = '<a class="myapp-li-' + data.appid + "-" + data.platform + '" href="' + data.appUrl + '"><li>', newLi += '<table class="myapp-list">', newLi += "<tr>", newLi += '<td rowspan="2" class="icon"><img src="' + data.icon + '" alt=""></td>', newLi += '<td><span class="app-name">' + data.appName + "</span></td>", newLi += '<tr><td><span class="publisher">' + data.publisher + "</span></td></tr>", newLi += "</table>", newLi += "</li></a>", p = newDiv + newLi + "</div>", $(".no-app").length > 0) $(p).insertAfter($(".my-apps").find(".myapp-list-header")), $(".my-apps").find(".no-app").remove();
                    else if ($(l).length > 0) {
                        var u = ".myapp-list-" + n;
                        $(newLi).insertAfter($(".my-apps").find(u))
                    } else 0 == data.platform ? $(p).insertBefore($(".my-apps").find(".platform-1")) : $(p).insertAfter($(".my-apps").find(".platform-0"))
                } else e.html(r), 10011 == d.code ? loginByAlert() : showOpenVipSwal(d.msg)
            }
        })
    }
}
function delMyApp(a, e, t) {
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
            e = $(e);
            var n = (e.html(), "/account/delMyFavorite");
            $.ajax({
                type: "get",
                url: n,
                data: {
                    appid: a,
                    platform: t
                },
                dataType: "json",
                success: function(n) {
                    if (n && 1e4 == n.code) {
                        e.parents(".list").remove();
                        var i = ".my-apps .myapp-li-" + a + "-" + t;
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
                        $(".myApp .list .number").each(function(a, e) {
                            $(e).html(a + 1)
                        }), $(".dataCenter .dcbct-body-app-td .dcbc-table-num").length && $(".dataCenter .dcbct-body-app-td .dcbc-table-num").each(function(a, e) {
                            $(e).html(a + 1)
                        }), swal(Lang.delete_app_succ_title, Lang.delete_app_succ_text, "success")
                    } else swal(n.msg)
                }
            })
        })
}
function delMyAppAtInfo(a, e) {
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
        e = $(e);
        var n, i = e.data("name"),
            o = e.data("url"),
            s = (e.data("reload"), e.data("page"));
        e.html();
        return n = $('input[name="platform-type"]').val(), $.inArray(n, ["0", "1"]) == -1 ? (swal("参数错误，刷新后重试"), !1) : void $.ajax({
                type: "get",
                url: t,
                data: {
                    appid: a,
                    platform: n
                },
                dataType: "json",
                success: function(t) {
                    if (t && 1e4 == t.code) if ("app" == s) window.location.reload();
                    else {
                        e.parent().html('<a class="btn btn-custom pace-inactive" href="javascript:void(0);" data-reload="0" data-url="' + o + '" data-name="' + i + '" onclick="addMyApp(' + a + ', this)" role="button"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;' + Lang.delete_app_add_my_app + "</a>");
                        var r = ".myapp-li-" + a + "-" + n;
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
function ajaxSendVerifyMail(a, e) {
    if (a) {
        var t = "/account/ajaxSendVerifyMail";
        $.ajax({
            type: "get",
            url: t,
            data: {
                username: a
            },
            dataType: "json",
            success: function(a) {
                a && 1e4 == a.code ? $(e).parent().html(Lang.verify_mail_been_send) : $(e).parent().html(a.msg)
            }
        })
    }
}
function getCurrentKeywordData() {
    var a = {},
        e = 0;
    a.list = {}, a.max_date = window.chartData.max_date, a.min_date = window.chartData.min_date, a.total = window.chartData.total, a.title = window.chartData.title;
    for (var t = window.currentKeywordid.length - 1; t >= 0; t--) e = window.currentKeywordid[t], a.list[e] = window.chartData.list[e];
    return a
}
function arrDel(a, e) {
    return a.slice(0, e).concat(a.slice(e + 1))
}
function getChartsData(a, e, t) {
    if (!a) return !1;
    if ("object" == typeof a && (e = a.queryData, a = a.ajaxUrl), !a) return !1;
    var n = $(".export-data");
    if (n.length > 0) {
        var i = "",
            o = n.data("url") || "";
        o && ($.map(e, function(a, e) {
            i += "/" + e + "/" + a
        }), n.attr("href", o + i))
    }
    $.ajax({
        type: "get",
        url: a,
        data: e,
        dataType: "json",
        success: function(a, n, i) {
            if (a && 1e4 == a.code) {
                (e.sdate || e.edate) && window.chartData.sdate == e.sdate && window.chartData.edate == e.edate || (window.chartData.sdate = e.sdate, window.chartData.edate = e.edate, window.chartData.list = a.data.list, window.chartData.min_date = a.data.min_date, window.chartData.max_date = a.data.max_date, window.chartData.total = a.data.total), e.word_id && !window.chartData.titleDate && (window.chartData.titleDate = Lang.nearly_seven_days), drawCharts(a.data, t);
                var o = i.getResponseHeader("Callback");
                if (o && o.indexOf("function") != -1) {
                    var s = new Function("return " + o)();
                    s()
                } else o && "function" == typeof window[o] && window[o](a.data)
            } else drawNodataCharts(a.msgelementObj, t)
        }
    })
}
function getChartsKeywordData(a, e) {
    var t = e.word_id;
    return !!t && (window.currentKeywordid = [t], void(window.hasDataIdStr && window.hasDataIdStr.indexOf(t) != -1 ? drawCharts(getCurrentKeywordData()) : (a || (a = $("#charts-ajax-data").data("ajaxurl")), window.hasDataIdStr += "," + t, $.ajax({
                type: "get",
                url: a,
                data: e,
                dataType: "json",
                success: function(a) {
                    var e;
                    if (a && 1e4 == a.code) {
                        window.chartData.max_date = a.data.max_date, window.chartData.min_date = a.data.min_date, window.chartData.total = a.data.total, window.chartData.title = a.data.title;
                        for (e in a.data.list) window.chartData.list[e] = a.data.list[e]
                    } else for (e = window.currentKeywordid.length - 1; e >= 0; e--) window.currentKeywordid[e] == t && (window.currentKeywordid = arrDel(window.currentKeywordid, e));
                    drawCharts(getCurrentKeywordData())
                }
            }))))
}
function getChartsKeywordDataHour(a, e) {
    var t = e.word_id;
    if (!t) return !1;
    if (e.word = $("#charts-appname").val(), window.currentKeywordid = [t], !a) {
        var n = $(".nav-date-bar-action .nav-item-hour"),
            i = $(".nav-date-bar-action .nav-item-day");
        n.addClass("active").siblings().removeClass("active"), n.data("querydata", JSON.stringify(e)), i.data("querydata", JSON.stringify(e)), n.data("showdate", Lang.date_range_7), i.data("showdate", Lang.date_range_3), a = $("#charts-ajax-data").data("defaultajaxurl")
    }
    $.ajax({
        type: "get",
        url: a,
        data: e,
        dataType: "json",
        success: function(a) {
            1e4 == a.code && (a.data.tickDefault = 1, drawCharts(a.data))
        }
    })
}
function getChartsSearchData(a, e) {
    if (!a) var a = $("#charts-ajax-data").data("defaultajaxurl");
    $.ajax({
        type: "get",
        url: a,
        data: e,
        dataType: "json",
        success: function(a) {
            a.data.tickDefault = 1, drawCharts(a.data)
        }
    })
}
function createTable(a) {
    var e = [],
        t = a.list[0].data,
        n = a.list.length,
        i = a.datatype,
        o = +new Date,
        s = 0,
        r = '<i data-toggle="tooltip" title="" style="padding: 5px;" data-original-title="' + Lang.no_data_3 + '">&nbsp;-&nbsp;</i>';
    a.nodata && a.dataDay && (o = a.dataDay);
    var d = function(a) {
            return a < 10 ? "0" + a : a
        },
        c = 0;
    $.each(t, function(t, i) {
        var l = new Date(i[0]);
        e[c] = [], e[c][0] = l.getFullYear() + "-" + d(l.getMonth() + 1) + "-" + d(l.getDate()), +l > o ? e[c][1] = r : (e[c][1] = i[1], s += i[1]);
        for (var t = 1; t < n; t++) n > 1 && (+l > o ? e[c][t + 1] = r : e[c][t + 1] = a.list[t].data[c][1]);
        c++
    }), e.reverse(), window.createTableSort && window.createTableSort.destroy();
    var l = $("#itc-sort");
    if ($("#itc-countNum")) {
        var p = new Date(a.min_date),
            u = new Date(a.max_date);
        p = p.getFullYear() + "年" + d(p.getMonth() + 1) + "月" + d(p.getDate()) + "日", u = u.getFullYear() + "年" + d(u.getMonth() + 1) + "月" + d(u.getDate()) + "日", s >= 1e4 && (s = (s / 1e4).toFixed(1) + "万"), $("#itc-countNum").html(p + "~" + u + " 下载量预估总计：" + s)
    }
    var h = [];
    0 == i ? l.html('<thead><tr class="large"><th>' + Lang.table_thead_1 + "</th><th>" + Lang.table_thead_10 + "</th></tr></thead><tbody></tbody>") : 1 == i ? l.html('<thead><tr class="large"><th>' + Lang.table_thead_1 + "</th><th>" + Lang.table_thead_2 + '<span data-toggle="tooltip" title="" class="glyphicon glyphicon-question-sign mobile-hide" data-original-title="' + Lang.table_thead_3 + '"></span></th><th>' + Lang.table_thead_4 + "</th><th>" + Lang.table_thead_5 + '<span data-toggle="tooltip" title="" class="glyphicon glyphicon-question-sign mobile-hide" data-original-title="' + Lang.table_thead_6 + '"></span></th><th>' + Lang.table_thead_7 + "</th></tr></thead><tbody></tbody>") : 2 == i ? l.html('<thead><tr class="large"><th>' + Lang.table_thead_1 + "</th><th>" + Lang.table_thead_8 + '<span data-toggle="tooltip" title="' + Lang.table_thead_9 + '" class="glyphicon glyphicon-question-sign mobile-hide"></span></th><th>' + Lang.table_thead_7 + "</th></tr></thead><tbody></tbody>") : (h = [{
                    data: function(a, e, t, n) {
                        return "sort" === e ? a[4] : a[4] > 0 ? a[4] + "%" : a[4]
                    },
                    targets: 4
                }], l.html('<thead><tr class="large"><th>' + Lang.table_thead_1 + "</th><th>" + Lang.table_thead_11 + '<span data-toggle="tooltip" title="" class="glyphicon glyphicon-question-sign mobile-hide" data-original-title="' + Lang.table_thead_11_tips + '"></span></th><th>' + Lang.table_thead_12 + '<span data-toggle="tooltip" title="" class="glyphicon glyphicon-question-sign mobile-hide" data-original-title="' + Lang.table_thead_12_tips + '"></span></th><th>' + Lang.table_thead_13 + '<span data-toggle="tooltip" title="" class="glyphicon glyphicon-question-sign mobile-hide" data-original-title="' + Lang.table_thead_13_tips + '"></span></th><th>' + Lang.table_thead_14 + '<span data-toggle="tooltip" title="" class="glyphicon glyphicon-question-sign mobile-hide" data-original-title="' + Lang.table_thead_14_tips + '"></span></th></tr></thead><tbody></tbody>')), window.createTableSort = l.DataTable({
        data: e,
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
function createTableOptKeyword(a) {
    var e = $("#opt-keyword-sort"),
        t = JSON.parse(a),
        n = [],
        i = [];
    e.html('<thead><tr class="large"><th>' + Lang.dataTables_opt_keyword_name + "</th><th>" + Lang.dataTables_opt_keyword_hints + '<span data-toggle="tooltip" title="' + Lang.app_keyword_sort_index_tip + '" class="glyphicon glyphicon-question-sign mobile-hide"></span>&nbsp<i class="icon icon-up"></i><i class="icon icon-down"></i></th><th>' + Lang.dataTables_opt_keyword_result + '<span data-toggle="tooltip" title="' + Lang.app_keyword_sort_nums_tip + '" class="glyphicon glyphicon-question-sign mobile-hide"></span>&nbsp<i class="icon icon-up"></i><i class="icon icon-down"></i></th><th>' + Lang.dataTables_opt_keyword_tuozhan_1 + '<span data-toggle="tooltip" title="' + Lang.app_keyword_tuozhan_tip + '" class="glyphicon glyphicon-question-sign mobile-hide"></span></th></tr></thead><tbody></tbody>');
    for (var o = 0; o < t.length; o++) n[o] = [], n[o][0] = t[o].word, n[o][1] = t[o].hints, n[o][2] = t[o].search_no, n[o][3] = '<a href="https://aso100.com/trend/keywordExtend?keyword=' + t[o].word + '" target="_blank">' + Lang.dataTables_opt_keyword_tuozhan_2 + "</a>";
    window.tableSortOpt && (window.tableSortOpt = null), window.tableSortOpt = e.DataTable({
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
function _exportingConfig(a) {
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
    var e = {
        enabled: !1
    };
    return window.isMobile || (e = {
        buttons: {
            contextButton: {
                menuItems: [{
                    text: Lang.export_png,
                    onclick: function() {
                        svgExport($(this.container).find("svg")[0], a, "png"), window.isMobile && $(".highcharts-contextmenu > div > div").css({
                            background: "none",
                            color: "rgb(48, 48, 48)"
                        })
                    }
                }, {
                    text: Lang.export_jpg,
                    onclick: function() {
                        svgExport($(this.container).find("svg")[0], a, "jpeg"), window.isMobile && $(".highcharts-contextmenu > div > div").css({
                            background: "none",
                            color: "rgb(48, 48, 48)"
                        })
                    }
                }]
            }
        }
    }), e
}
function _credits(a, e) {
    return a = "undefined" == typeof a || a, e = "undefined" != typeof e ? e : 13, {
        enabled: a,
        fontSize: e + "px",
        text: "Powered by ASO100.com",
        href: "http://www.aso100.com"
    }
}
function drawCharts(a, e) {
    if (!a) return !1;
    var t;
    if (t = e || $("#charts"), !t.length || "none" == t.css("display")) return !1;
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
        h = a.version || [],
        m = a.list || [],
        f = t && t.data("marginleft") || void 0,
        g = t && t.data("marginright") ? t.data("marginright") : isMobile ? 10 : void 0;
    "number" != typeof f && isMobile && (f = w > 500 ? 50 : 32);
    var v = t.find(".highcharts-legend-item");
    if (a.list) {
        var b = 0,
            w = 0;
        for (index in a.list) a.list[index] && ($.map(a.list[index].data, function(a, e) {
            Math.abs(a[1]) > w && (w = Math.abs(a[1]))
        }), a.list[index].color ? a.list[index].color = a.list[index].color : (a.list[index].color = l[b], b++), 0 != v.length && v.eq(index).is(".highcharts-legend-item-hidden") && "date" == window.searchType ? a.list[index].visible = !1 : a.list[index].visible = !0, n.push(a.list[index]))
    }
    if ("undefined" != typeof a.stacking && (c = a.stacking), "undefined" != typeof a.reversed && (s = a.reversed), "undefined" != typeof a.type && (r = a.type), "undefined" != typeof a.yAxisTxt && (d = a.yAxisTxt), o = (a.max_date - a.min_date) / 1e3 / 3600, o = Math.ceil(o / a.total), a.title ? (window.isMobile && (i = a.title.indexOf("鈥�##APPNAME##鈥�") != -1 ? a.title.replace("鈥�##APPNAME##鈥�", "") : a.title.replace("##APPNAME##", ""), i = a.title.indexOf("鈥�##WORD##鈥�") != -1 ? i.replace("鈥�##WORD##鈥�", "") : i.replace("##WORD##", "")), i = i || a.title.replace("##APPNAME##", p), i = "" != u ? i.replace("##WORD##", u) : i.replace("鈥�##WORD##鈥�", ""), i = i.replace("##DATE##", Lang.space + window.chartData.titleDate + Lang.space)) : i = window.chartData.titleDate ? window.chartData.titleDate + " " + Lang.ranking_trend : Lang.ranking_trend, fSize = isMobile ? "0.375rem" : "16px", t.length > 0) {
        var y = {
            type: r,
            spacingRight: 40,
            marginLeft: f,
            marginRight: g,
            backgroundColor: "",
            events: {
                load: function() {
                    var a = $('<div class="float-logo"></div>');
                    if (isMobile) {
                        var e = t.find(".highcharts-plot-border");
                        a.css({
                            top: parseInt(e.attr("y")) + parseInt(e.attr("height")) - 50,
                            bottom: "initial"
                        })
                    }
                    t.append(a)
                },
                redraw: function() {
                    chart = this, extremumDraw(m, chart, 1)
                }
            }
        };
        yAxisOffset = 0;
        var k = _exportingConfig(i);
        t.highcharts({
            chart: y,
            exporting: k,
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
                min: a.min_date,
                max: a.max_date,
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
                    var e, t, n = [],
                        i = 1;
                    for (!a.tickDefault && this.dataMax < 5 ? (e = 1, t = 5) : !a.tickDefault && this.dataMax < 20 ? (e = 5, t = 20) : !a.tickDefault && this.dataMax < 50 ? (e = 10, t = 50) : !a.tickDefault && this.dataMax < 100 ? (e = 20, t = 100) : !a.tickDefault && this.dataMax < 500 ? (e = 100, t = 500) : !a.tickDefault && this.dataMax < 1500 ? (e = 500, t = 1500) : (i = "undefined" == typeof a.minY ? this.dataMin > 1 ? this.dataMin - 1 : this.dataMin : a.minY, e = Math.ceil((this.dataMax - (this.dataMin > i ? i : this.dataMin)) / 5), e = e > 0 ? e : 1, t = this.dataMax + 1), 0 == this.dataMin && (i = 0), n.push(i), i; i - e <= t; i += e) i <= 1 || i == this.dataMin - 1 || n.push(this.dataMin > 1 ? i - 1 : i);
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
                        var a = Math.abs(this.value);
                        return a >= 1e8 ? a = Math.ceil(a / 1e7) / 10 + "亿" : a >= 1e7 ? a = Math.ceil(a / 1e6) / 10 + "千万" : a >= 1e6 && (a = Math.ceil(a / 1e5) / 10 + "百万"), a
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
                positioner: function(a, e, t) {
                    var n = t.plotX;
                    return this.chart.plotWidth < t.plotX + a ? n = t.plotX - a * (window.isMobile ? .8 : .6) : t.plotX < this.chart.plotLeft && (n = t.plotX + a * (window.isMobile ? .3 : .6)), {
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
                    return '<tr><td style="color:' + this.series.color + ';padding-right: 3px;">鈼�</td><td>' + this.series.name + '</td><td style=" padding-left: 7px; color:' + this.series.color + ';">' + Math.abs(this.y) + "</td></tr>"
                },
                pointFormat: isMobile && isIOS && isWechat ? '<span style="color:{point.color}">鈼�</span> {series.name} <span style="padding-left: 7px;color:{point.color}">  {point.y}</span><br/>' : "",
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
                        radius: a.total > 360 ? 1 : 2,
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
                                var a = this.series.chart,
                                    e = this.index,
                                    t = {},
                                    n = this.plotX + (window.isMobile ? 32 : 70);
                                n > a.plotWidth && (n = a.plotWidth);
                                var i = !1;
                                $.map(h, function(a, n) {
                                    e == n && (i = !0, t = a)
                                }), i && (a.version && a.version.hide(), a.version = a.renderer.label(t.date + "<br />" + Lang.new_version_tip + t.version, n, a.plotTop + a.plotHeight + 8, "callout", 0, 0, !0, "").css({
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
                        legendItemClick: function(a) {
                            $(".highcharts-g-value").remove()
                        }
                    }
                }
            },
            series: n
        }, function(a) {
            h && $.map(h, function(e, t) {
                var n, i, o = a.series[0].data[t];
                n = a.renderer.image("/public/app/images/release_icon.png", o.plotX + a.plotLeft - 8, a.plotTop + a.plotHeight - 8, 16, 16).attr({
                    zIndex: 10
                }).add(), i = n.getBBox();
                var s;
                n.on("mouseenter", function() {
                    a.version && a.version.hide();
                    var t = o.plotX + (window.isMobile ? 32 : 70);
                    t > a.plotWidth && (t = a.plotWidth), s = a.renderer.label(e.date + "<br />" + Lang.new_version_tip + e.version, t, i.y + 16, "callout", 0, 0, !0, "").css({
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
                    a.version && a.version.hide()
                })
            }), extremumDraw(m, a, 0)
        })
    }
}
function overViewpieRingChart(a, e) {
    var t;
    if (t = e || $("#charts"), 0 == t.length || "none" == t.css("display")) return !1;
    var n = isMobile ? "0.375rem" : "18px";
    t.highcharts({
        chart: {
            type: "pie"
        },
        exporting: {
            enabled: !1
        },
        title: {
            text: a.title,
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
        series: a.list
    })
}
function overViewbarChart(a, e) {
    var t;
    if (t = e || $("#charts"), 0 == t.length || "none" == t.css("display")) return !1;
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
            categories: a.cates
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
            positioner: function(a, e, t) {
                return {
                    x: 99,
                    y: t.plotY
                }
            }
        },
        plotOptions: {
            bar: {
                showInLegend: !1,
                color: a.color
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
        series: a.list
    })
}
function pieChart(a, e) {
    var t;
    t = e || $("#pieChart");
    var n = a || t.data("chartdata"),
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
function extremumDraw(a, e, t) {}
function render(a, e) {
    a.renderer.label(e.y, e.plotX + a.plotLeft - 20, e.plotY + a.plotTop - 45, "callout", e.plotX + a.plotLeft, e.plotY + a.plotTop, !1, !1, "g-value").css({
        color: "#FFFFFF",
        align: "center"
    }).attr({
        fill: "rgba(0, 0, 0, 0.75)",
        padding: 8,
        r: 5,
        zIndex: 6
    }).add()
}
function drawNodataCharts(a, e) {
    var t;
    t = e || $("#charts"), fSize = isMobile ? "0.375rem" : "18px", a = a ? a : Lang.not_enter_current_list, t.length > 0 && t.highcharts({
        exporting: {
            enabled: !1
        },
        title: {
            text: a,
            style: {
                fontSize: fSize
            },
            x: 26
        },
        lang: {
            noData: a
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
function svgExport(a, e, t) {
    t || (t = "png");
    var n = document.createElement("canvas"),
        i = n.getContext("2d"),
        o = document.createElement("A");
    canvg(n, (new XMLSerializer).serializeToString(a), {
        ignoreMouse: !0,
        ignoreAnimation: !0,
        useCORS: !0,
        renderCallback: function() {
            var a = document.createElement("img");
            "jpeg" == t ? (t = "image/jpeg", o.download = e + ".jpg", a.src = n.toDataURL("image/png"), a.onload = function() {
                    i.fillStyle = "#ffffff", i.fillRect(0, 0, n.width, n.height), i.drawImage(a, 0, 0), a.src = "/public/app/images/chart-icon.png", a.onload = function() {
                        if (i.drawImage(a, 150, 260), o.href = n.toDataURL(t), document.all) o.click();
                        else {
                            var e = document.createEvent("MouseEvents");
                            e.initEvent("click", !0, !0), o.dispatchEvent(e)
                        }
                    }
                }) : (t = "image/png", o.download = e + ".png", a.src = "/public/app/images/chart-icon.png", a.onload = function() {
                    if (i.drawImage(a, 150, 260), o.href = n.toDataURL(t), document.all) o.click();
                    else {
                        var e = document.createEvent("MouseEvents");
                        e.initEvent("click", !0, !0), o.dispatchEvent(e)
                    }
                })
        }
    })
}
function CEMixLen(a, e) {
    e = e ? e : 3;
    var t = 0,
        n = a.length;
    if (a) {
        for (var i = 0; i < n; i++) a.charCodeAt(i) > 255 ? t += e : t++;
        return t
    }
    return 0
}
function preventDefault(a) {
    a = a || window.event, a.preventDefault && a.preventDefault() || (a.returnValue = !1), a.stopPropagation && a.stopPropagation()
}
function accountPwd(a) {
    if (!a) return !1;
    var e, t = a.find(".sign-msg"),
        n = !1;
    a.find("input").on("focus", function() {
        clearTimeout(e), e = setTimeout(function() {
            a.find(".has-error").length < 1 && t.slideUp("fast")
        }, 500)
    }), a.find("input[name=remember]").on("click", function() {
        $.cookie("no_remember", +!this.checked, {
            path: "/",
            expires: 1
        })
    }), a.find("#submit").on("click", function() {
        if (clearTimeout(e), n) return !1;
        n = !0;
        var i = !0,
            o = {};
        if (a.find("input.form-control").each(function() {
                var a = this.name,
                    e = $(this);
                return value = e.val(), !! e.prop("disabled") || (value = value.replace(/^\s+/i, ""), value = value.replace(/\s+$/i, ""), e.val(value), "" == value && "code" != a || "code" == a && 1 == e.data("needcode") && "" == value ? (i = !1, e.val(""), t.removeClass("success").html(this.placeholder + Lang.password_verify_2).slideDown("fast"), !1) : ("remember" == a && (value = e.prop("checked")), void(o[a] = value)))
            }), o.repassword && o.password && o.repassword != o.password && (t.removeClass("success").html(Lang.pwd_error_tip).slideDown("fast"), i = !1), !i) return n = !1, !1;
        var s = a.attr("method") || "GET",
            r = a.attr("action");
        return !!r && ($.ajax({
                type: s,
                url: r,
                data: o,
                dataType: "json",
                error: function(a) {
                    n = !1, a && 403 == a.status && window.location.reload()
                },
                success: function(e, i, o) {
                    n = !1;
                    var s = a.data("alert") || 0;
                    if (s && 1 == s) e && 1e4 == e.code ? swal({
                            title: Lang.mod_pwd_tip_1,
                            type: "success",
                            showCancelButton: !0,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.mod_pwd_tip_2,
                            cancelButtonColor: "#33ba95",
                            cancelButtonText: Lang.mod_pwd_tip_3
                        }, function(a) {
                            a ? window.location.href = "/account/signin" : window.location.href = "/"
                        }) : swal({
                            title: e.msg,
                            type: "error",
                            showCancelButton: !1,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.confirm_btn,
                            cancelButtonText: Lang.cancel_btn
                        });
                    else {
                        e.ucenter && $("body").append(e.ucenter), e && 1e4 == e.code ? (e.showmsg ? t.addClass("success").html(e.msg).slideDown("fast") : t.removeClass("success").html(e.msg).slideUp("fast"), a.data("referrer") && (window.location.href = a.data("referrer"))) : (console.log(e.needcode), e.needcode && ($("#code-img").trigger("click"), $("#code-img").parents(".form-group").removeClass("hide"), $("#code-img").parents(".form-group").find("input[name=code]").data("needcode", 1)), e.css && t.removeClass("success").addClass(e.css), t.html(e.msg).slideDown("fast"));
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
        manual = $dateRangePickerObj.data("manual") || 0,
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
        }), $.map(ranges, function(a, e) {
        rangesFirstKey || (rangesFirstKey = e)
    }), window.chartData.titleDate = rangesFirstKey, isMobile && ($dateRangePickerObj.find("span:eq(0).mobile-hide").html(rangesFirstKey).show(), customRangeShow = !1), locales.customRangeShow = !! customRangeShow && customRangeShow, $dateRangePickerObj.daterangepicker({
        hideRangeInputs: !customRangeShow,
        timePicker: !1,
        startDate: moment($dateRangePickerObj.data("date")),
        endDate: moment($dateRangePickerObj.data("edate")),
        minDate: $dateRangePickerObj.data("mindate") ? $dateRangePickerObj.data("mindate") : "04/01/2014",
        maxDate: $dateRangePickerObj.data("maxdate") ? $dateRangePickerObj.data("maxdate") : moment().format("MM/DD/YYYY"),
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
    }, function(a, e, t) {
        var n;
        if (limitday && +a < +new Date - 86400 * limitday * 1e3) return showOpenVipSwal(Lang.sorry_tip[LangObj.openVipType]), !1;
        if (0 == isMulit ? n = a.format(Lang.format_time) : t != Lang.locales_customRangeLabel && isMobile ? n = t : isShowHour ? t == $.trim(Lang.date_range_2) ? (hourE = hourS = " 00" + Lang.format_date_hour, n = moment().subtract(1, "days").format(Lang.format_time) + hourS + "~" + moment().format(Lang.format_time) + hourE) : (hourE = hourS = " " + moment().format("H") + Lang.format_date_hour, n = a.format(Lang.format_time) + hourS + "~" + e.format(Lang.format_time) + hourE) : n = a.format(Lang.format_time) + "~" + e.format(Lang.format_time), $dateRangePickerObj.find("span:eq(0)").html(n), manual) return void $dateRangePickerObj.find("input").val(a.format("YYYY-MM-DD"));
        if (1 == isOpen) if (isMulit) {
            var i, o, s, r, d = new RegExp("sdate\\/\\d+-\\d+-\\d+", "i");
            i = document.location.pathname, i.split("/").length < 3 && (i += "/index"), o = i.match(d), o ? i = i.replace(o, "sdate/" + a.format("YYYY-MM-DD")) : i += "/sdate/" + a.format("YYYY-MM-D"), d = new RegExp("edate\\/\\d+-\\d+-\\d+", "i"), s = i.match(d), s ? i = i.replace(s, "edate/" + e.format("YYYY-MM-DD")) : i += "/edate/" + e.format("YYYY-MM-D"), r = window.location.protocol + "//" + window.location.hostname + i, isRefresh ? pjaxLoad(r) : window.location.href = r
        } else {
            var i, c, r, l = $dateRangePickerObj.data("paramname") || "date",
                d = new RegExp(l + "\\/\\d+-\\d+-\\d+", "i");
            i = document.location.pathname, i = i.replace(/snapshot\/\d+:\d+:\d+/i, ""), i.split("/").length < 3 && (i += "/index"), document.location.search.indexOf("?search") == -1 && document.location.search.indexOf("&search") == -1 || (i += document.location.search.replace(/\?|=|&/g, "/")), c = i.match(d), i = c ? i.replace(c, l + "/" + a.format("YYYY-MM-DD")) : i + "/" + l + "/" + a.format("YYYY-MM-DD"), r = window.location.protocol + "//" + window.location.hostname + i, isRefresh ? pjaxLoad(r) : window.location.href = r
        } else {
            window.searchType = "date", t != Lang.locales_customRangeLabel ? window.chartData.titleDate = t : window.chartData.titleDate = a.format(Lang.format_time) + Lang.to + e.format(Lang.format_time);
            var r, p;
            $dateRangePickerObj.parents(".charts-ajax-data").length ? (r = $dateRangePickerObj.parents(".charts-ajax-data").data("ajaxurl"), p = $dateRangePickerObj.parents(".charts-ajax-data").data("querydata") || {}) : (r = $("#charts-ajax-data").data("ajaxurl"), p = $("#charts-ajax-data").data("querydata") || {}), $(".nav-date-bar-action .nav-item.active").length && (p = $(".nav-date-bar-action .nav-item.active").data("querydata")), "string" == typeof p && (p = JSON.parse(p)), p.sdate = a.format("YYYY-MM-DD"), p.edate = e.format("YYYY-MM-DD");
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
    var a = $("#buy-vip");
    return a && a.length > 0 ? (a.show(), $("#vip-b").show(), !1) : void $.ajax({
            url: "/account/buyVip",
            type: "get",
            dataType: "html",
            success: function(a, e, t) {
                var n = t.getResponseHeader("Content-Type");
                if (n.indexOf("application/json") !== -1) return a = JSON.parse(a), 1e4 == parseInt(a.code) ? swal({
                        title: a.msg,
                        type: "success",
                        showCancelButton: !1,
                        confirmButtonColor: "#33ba95",
                        confirmButtonText: Lang.confirm_btn,
                        cancelButtonText: Lang.cancel_btn
                    }) : swal({
                        title: a.msg,
                        type: "error",
                        showCancelButton: !1,
                        confirmButtonColor: "#33ba95",
                        confirmButtonText: Lang.confirm_btn,
                        cancelButtonText: Lang.cancel_btn
                    }), !1;
                var i, o, s = $(".info-container"),
                    r = $(a),
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
function search(a) {
    var e = a;
    e.autocomplete({
        serviceUrl: "/search/autoComplete",
        paramName: "word",
        dataType: "json",
        transformResult: function(a) {
            return {
                suggestions: $.map(a, function(a) {
                    return {
                        value: a,
                        data: a
                    }
                })
            }
        },
        deferRequestBy: 200,
        maxHeight: "auto",
        onSelect: function(a) {
            $(this).parents(".navbar-form").submit()
        }
    })
}
function __dealCssEvent(a, e) {
    function t(a) {
        if (a.target === this) for (e.call(this, a), n = 0; n < i.length; n++) o.off(i[n], t)
    }
    var n, i = a,
        o = this;
    if (e) for (n = 0; n < i.length; n++) o.on(i[n], t)
}
function formToJSON(a) {
    if (a = $(a), 1 !== a.length) return !1;
    var e = {},
        t = ["submit", "image", "button", "file"],
        n = [];
    return a.find("input, select, textarea").each(function() {
        var i = $(this),
            o = i.attr("name"),
            s = i.attr("type"),
            r = this.nodeName.toLowerCase();
        if (!(t.indexOf(s) >= 0) && !(n.indexOf(o) >= 0) && o) if ("select" === r && i.prop("multiple")) n.push(o), e[o] = [], a.find('select[name="' + o + '"] option').each(function() {
            this.selected && e[o].push(this.value)
        });
        else switch (s) {
                case "checkbox":
                    n.push(o), e[o] = [], a.find('input[name="' + o + '"]').each(function() {
                        this.checked && e[o].push(this.value)
                    });
                    break;
                case "radio":
                    n.push(o), a.find('input[name="' + o + '"]').each(function() {
                        this.checked && (e[o] = this.value)
                    });
                    break;
                default:
                    e[o] = i.val()
            }
    }), e
}
function openApp(a) {
    var e = document.getElementById("open-app-by-url");
    e || (e = document.createElement("iframe"), e.setAttribute("id", "open-app-by-url"), e.setAttribute("width", 0), e.setAttribute("height", 0), e.setAttribute("style", "display:none; overflow:hidden;"), document.body.appendChild(e)), e.src = a
}
function settingAccount() {
    function a(a) {
        a.url ? ($("#avatar-area img").attr("src", a.url), $("#answer-upload-img").attr("src", a.url), $("#answer-upload-img-hidden").val(a.url)) : a.phone ? ($("#phone-position").text(a.phone), $("#biding-phone").text(Lang.edit)) : 3 == a.type && $("#biddingPhoneModal").modal("show")
    }
    function e(a) {
        $("#x").val(a.x), $("#y").val(a.y), $("#w").val(a.w), $("#h").val(a.h)
    }
    function t() {
        return !!parseInt($("#w").val()) || (swal("Please select a crop region then press submit."), !1)
    }
    function n(a) {
        var t = a[0],
            n = $("#avatar-preview"),
            i = new FileReader,
            o = t.type,
            s = t.size;
        return /image\/(gif|jpg|jpeg|png)/.test(o) ? s >= 2e6 ? (swal(Lang.img_size), !1) : (i.onload = function(a) {
                    n.html('<img src="' + a.target.result + '" alt="img">');
                    var t, i, o, s = window.isMobile ? 270 : 870,
                        r = window.isMobile ? 320 : 560,
                        d = 250;
                    JcropEle = n.find("img"), JcropEle.Jcrop({
                        onSelect: e,
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
                    }), $("#avatar").val(a.target.result)
                }, i.readAsDataURL(t), !0) : (swal(Lang.img_type), !1)
    }
    function i() {
        return $(".myself-modal").modal("hide"), $("#verifyCodeModal").modal("show"), !1
    }
    if (!$(".avatar-modal").length) return !1;
    var o = function(e, t, n) {
        t.addClass("disabled"), t.attr("disabled", !0), $.ajax({
            type: "POST",
            url: e.attr("action"),
            data: e.serialize(),
            success: function(e) {
                t.removeClass("disabled"), t.attr("disabled", !1), 1e4 != e.code ? (e.closeModal && $(".myself-modal").modal("hide"), swal(e.msg)) : (e.refresh && location.reload(), $(".myself-modal").modal("hide"), a(e), "function" == typeof n && n())
            }
        })
    };
    $(document).on("click", "#btn-save", function() {
        t(), o($("#avatar-form"), $(this))
    }), $(document).on("click", "#avatar-click", function() {
        $("#select-avatar").click()
    });
    var s = document.querySelector("#select-avatar");
    s && s.addEventListener("change", function(a) {
        var e = this.files;
        e.length && (n(this.files) && ($("#myModal").modal("show"), $("#myModal").modal()), $("#select-avatar").val(""))
    }), $(document).on("click", "#edit-email", function(a) {
        $("#editEmailModal").modal("show")
    }), $(document).on("click", "#send-email", function() {
        o($("#email-form"), $(this))
    }), $(document).on("click", "#edit-phone", function(a) {
        $("#biddingPhoneModal").modal("show")
    }), $(document).on("click", "#biding-phone", function(a) {
        $("#biddingPhoneModal").modal("show")
    }), $(document).on("click", "#phone-form #send-code", function() {
        var a, e = $(this),
            t = $("#phone").val(),
            a = e.data("sendurl");
        $.getJSON(a, {
            phone: t
        }, function(a) {
            if (1e4 == a.code) {
                var t = 59,
                    n = setInterval(function() {
                        e.text(Lang.again_get + "(" + t--+")"), t < 0 && (e.removeClass("disabled"), e.text(Lang.get_code), clearInterval(n))
                    }, 1e3);
                e.addClass("disabled"), e.text(Lang.again_get + "(60)")
            } else {
                if (10012 != a.code) return swal({
                    title: a.msg,
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
        var a = $("#code-img"),
            e = a.attr("src");
        e.indexOf("?") != -1 ? e = e.replace(/\?.*/i, "?" + +new Date) : e += "?" + +new Date, a.attr("src", e)
    });
    var r = {};
    return r.ajaxSend = o, r
}
function hotSearchDrawAction(a, e) {
    var t = $(".bar-charts"),
        n = t.data("ele");
    title = t.data("title"), a = a || t.data("ajaxurl"), e = e || t.data("querydata");
    var i = moment(e.sdate).format(Lang.format_date),
        o = moment(e.edate).format(Lang.format_date),
        s = "cn" == Lang.language ? "" : " ";
    title = i + "~" + o + s + title, $.ajax({
        url: a,
        type: "POST",
        dataType: "json",
        data: e
    }).done(function(a) {
        hotSearchDraw(a, n, title)
    })
}
function hotSearchDraw(a, e, t) {
    $("#" + e).highcharts({
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
            categories: a.categories,
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
                var a = Math.floor(this.y / 86400),
                    e = Math.floor(this.y % 86400 / 3600),
                    t = Math.floor(this.y % 3600 / 60),
                    n = (Math.floor(this.y % 60), '<span style="font-size:10px;">' + this.x + "</span><br/>" + this.series.name + " : ");
                return a > 0 ? n + a + Lang.format_date_d + e + Lang.format_date_h + t + Lang.format_date_m : e > 0 ? n + e + Lang.format_date_h + t + Lang.format_date_m : n + t + Lang.format_date_m
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
        series: a.series
    })
}
function dataTablesForUserKeywordExtend(a) {
    var e = a;
    if (!e) return !1;
    var t = e.data("keywordurl"),
        n = e.data("hintsurl"),
        i = e.data("numberurl");
    e.data("nosignin");
    window.keywordExtend && (window.keywordExtend = null), window.keywordExtend = e.DataTable({
        dom: window.isMobile ? "frtip" : "lfrtip",
        data: window.tableData,
        order: [],
        lengthChange: !1,
        searching: !isMobile,
        autoWidth: !1,
        lengthMenu: [100],
        createdRow: function(a, e, t) {
            $(a).addClass("keyword-repertory-tr")
        },
        columnDefs: [{
            data: function(a, e, t, n) {
                var i;
                return i = "checkbox_" + a[1], '<div class="aso-checkbox"><input type="checkbox" name="word" id="' + i + '" class="form-control" value="' + a[1] + '" data-groupid="' + a[8] + '"><label for="' + i + '"><span></span></label></div>'
            },
            targets: 0,
            orderable: !1
        }, {
            data: function(a, e, n, i) {
                return $word = a[0].indexOf("@") != -1 ? a[0].replace(/@/g, " ") : a[0], '<a href="' + t + encodeURIComponent(a[0]) + '" target="_blank">' + $word + "</a>"
            },
            targets: 1,
            orderable: !1
        }, {
            orderSequence: ["desc", "asc"],
            data: function(a, e, t, i) {
                return '<a class="number" href="' + n + a[2] + '" target="_blank">' + a[3] + "</a>"
            },
            targets: 2
        }, {
            orderSequence: ["desc", "asc"],
            data: function(a, e, t, n) {
                return '<a class="number" href="' + i + a[2] + '" target="_blank">' + a[4] + "</a>"
            },
            targets: 3
        }, {
            orderSequence: ["desc", "asc"],
            data: function(a, e, t, n) {
                return a[5]
            },
            targets: 4
        }, {
            orderSequence: ["desc", "asc"],
            data: function(a, e, t, n) {
                return html = '<div class="select-group-row" data-id="' + a[1] + '" data-groupid="' + a[8] + '"></div>', html
            },
            targets: 5,
            orderable: !1
        }, {
            data: function(a, e, t, n) {
                var i, o, s;
                return o = "checkbox_title_" + a[1], s = 2 == a[6] ? "checked" : "", i = '<div class="aso-checkbox-switch"><input type="checkbox"  data-type="name" id="' + o + '" ' + s + ' class="form-control change-word table-name-' + a[1] + '" data-state="' + a[6] + '" data-id="' + a[1] + '" data-word="' + a[0] + '" ><label for="' + o + '"><span></span></label></div>'
            },
            targets: 6,
            orderable: !1
        }, {
            data: function(a, e, t, n) {
                var i, o, s;
                return o = "checkbox_keyword_" + a[1], s = 2 == a[7] ? "checked" : "", i = '<div class="aso-checkbox-switch"><input type="checkbox"  data-type="word" id="' + o + '" ' + s + ' class="form-control change-word table-word-' + a[1] + '" data-id="' + a[1] + '" data-state="' + a[7] + '" data-word="' + a[0] + '"><label for="' + o + '"><span></span></label></div>'
            },
            targets: 7,
            orderable: !1
        }, {
            data: function(a, e, t, n) {
                var i;
                return toggle = isMobile ? "" : "tooltip", i = '<span class="icon icon-cancel extword-remove" data-id="' + a[1] + '" data-keyword="' + a[2] + '" data-groupid="' + a[8] + '" data-type="cancel" data-toggle="' + toggle + '" data-original-title="取消关注">取消</span>'
            },
            targets: 8,
            orderable: !1
        }],
        initComplete: function() {
            e.find('[data-toggle="tooltip"]').tooltip({
                delay: {
                    show: 100,
                    hide: 100
                }
            })
        },
        drawCallback: function() {
            var a = e.find(".select-group-row");
            if (html = $("#select-group-temp").html(), a.length) {
                if (a.find("select.group-change-select").length) return;
                a.append(html), a.each(function(a, e) {
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
    function a(a) {
        var e, n, i = $(".nav-tabs"),
            o = $(".dc-body-content"),
            s = $(".wait-clone-pane .new-tab-pane").clone(),
            r = $(".group-change-warp ul");
        e = '<li role="presentation" data-groupid="' + a.id + '"><a href="#group-' + a.id + '" role="tab" data-toggle="tab">' + a.name + '<span class="glyphicon glyphicon-remove remove-group hide"></span></a></li>', n = '<li><a href="javascript:;" data-groupid="' + a.id + '">' + a.name + "</a></li>", s.attr("id", "group-" + a.id), o.append(s), i.append(e), r.append(n), t()
    }
    function e(e, t) {
        t.addClass("disabled"), t.attr("disabled", !0), $.ajax({
            type: "POST",
            url: e.attr("action"),
            data: e.serialize(),
            success: function(e) {
                t.removeClass("disabled"), t.attr("disabled", !1), 1e4 != e.code ? (e.closeModal && $(".myself-modal").modal("hide"), swal(e.msg)) : ($(".myself-modal").modal("hide"), a(e))
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
    return !!$(".invest-data-center").length && ($("#group-list-nav .create").click(function(a) {
            return $("#dc-body-nav li").length >= 7 ? (swal(Lang.keyword_group_limit), !1) : void $("#create-group-modal").modal("show")
        }), $("#create-group-modal").keydown(function(a) {
            13 == a.keyCode && (e($("#word-group-form"), $(this)), a.preventDefault())
        }), $("#create-group-modal #btn-save").click(function() {
            e($("#word-group-form"), $(this))
        }), void t())
}
function keywordRepertory() {
    function a(a) {
        var e = '<a href="javascript:;" data-classname="groupData_' + a.key + '" class="tab group" data-groupid="' + a.key + '">' + a.name + '<span class="glyphicon glyphicon-remove remove-group hide"></span></a>',
            n = '<option value="' + a.key + '">' + a.name + "</option>";
        $("#group-list-nav .create").before(e), $(".group-change-select option:last-child").before(n), $("#select-group-temp .select").append(n), t()
    }
    function e(e, t) {
        t.addClass("disabled"), t.attr("disabled", !0), $.ajax({
            type: "POST",
            url: e.attr("action"),
            data: e.serialize(),
            success: function(e) {
                t.removeClass("disabled"), t.attr("disabled", !1), 1e4 != e.code ? (e.closeModal && $(".myself-modal").modal("hide"), swal(e.msg)) : ($(".myself-modal").modal("hide"), a(e))
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
    dataTablesForUserKeywordExtend(n), dataSearchPush(), $("#group-list-nav .create").click(function(a) {
        return $("#group-list-nav .group").length >= 7 ? (swal(Lang.keyword_group_limit), !1) : void $("#create-group-modal").modal("show")
    }), $("#create-group-modal").keydown(function(a) {
        13 == a.keyCode && (e($("#word-group-form"), $(this)), a.preventDefault())
    }), $("#create-group-modal #btn-save").click(function() {
        e($("#word-group-form"), $(this))
    }), t()
}
function showChangePd() {
    if (isMobile) return !1;
    var a = $(".change-pd");
    if (a && a.length) if (isLocalStorageSupported) {
        var e;
        localStorage.pdconfig && (e = JSON.parse(localStorage.pdconfig)), e ? $.each(a, function() {
                var a = $(this),
                    t = a.data("name");
                if (t) {
                    var n = +moment(moment().format("YYYY-MM-DD") + " 23:59:59");
                    n != e[t] && a.addClass("show-animation")
                }
            }) : a.addClass("show-animation")
    } else a.addClass("show-animation")
}
function detect() {
    if (".detect-new .chart-show".length && $(".detect-new .chart-show").each(function(a, e) {
            var t = $(this),
                n = t.data("chartdata");
            dataCenterCustomRankChart(t, n)
        }), circleDetect($("#circleScore"), $(".d-score-text-1")), circleDetect($("#circleScore2"), $(".d-score-text-2")), $("#show-search-history").on("click", function() {
            $("#search-index-history-info").removeClass("hide").addClass("show show-animation"), $("#vip-b").show()
        }), $("#search-index-history-info .icon-guanbi").click(function() {
            $("#search-index-history-info").addClass("hide").removeClass("show show-animation"), $("#vip-b").hide()
        }), $(".pinpai-idiv").data("click")) {
        var a = $(".detect-new .waimians");
        $(".pinpai-idiv").click(function(e) {
            a.fadeIn(400)
        })
    }
    $(".detect-new .tijiaos").unbind("click").on("click", function(a) {
        var e = $(".detect-new .waimians"),
            t = $(this),
            n = {};
        return n.texts = e.find("textarea").val(), n.aid = t.data("aid"), n.texts ? (ajaxAction($(this), function(a) {
                1e4 == a.code ? (swal(Lang.app_detect_fill_success), $(".pinpai-idiv").unbind("click").html('<i class="iconfont icon-tanhao1 pinpai-i"></i>' + Lang.app_detect_fill_audit)) : swal(a.msg)
            }, n), void e.fadeOut("fast")) : (swal(Lang.app_detect_fill_brand), !1)
    }), clickToHide($(".detect-new .guanbiannius"), $(".detect-new .waimians"))
}
function ajaxAction(a, e, t) {
    a.addClass("disabled"), a.attr("disabled", !0), $.ajax({
        type: a.data("type") || "GET",
        url: a.data("action"),
        data: t || a.data("datas") || "",
        success: function(t) {
            a.removeClass("disabled"), a.attr("disabled", !1), e ? e(t, a) : ajaxPubHandle(t)
        }
    })
}
function circleDetect(a, e) {
    if (0 != $("#circleProcess").length) {
        var t = a,
            n = Number(t.data("score")),
            i = e,
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
function dataCenterCustomRankChart(a, e) {
    if (!e) return !1;
    var t = a.find(".chart-data"),
        n = e;
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
            positioner: function(a, e, t) {
                var n = t.plotX;
                return this.chart.plotWidth < t.plotX + a ? n = t.plotX - .8 * a : t.plotX < this.chart.plotLeft && (n = t.plotX + .2 * a), {
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
                return '<tr><td style="color:' + this.series.color + ' !important;padding-right: 3px !important;">鈼�</td><td>' + this.series.name + '</td><td style=" padding-left: 7px !important; color:' + this.series.color + ' !important;">' + Math.abs(this.y) + "</td></tr>"
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
            var a = $(this).text();
            $(this).attr("data-comment", a), commentClose(this)
        }
    })
}
function base_info_show() {
    var a = $(".base-area .base-info-area-show");
    if (a.length && a[0].scrollHeight > 44) {
        var e = a.text();
        a.attr("data-comment", e), base_info_close(a[0])
    }
}
function base_info_close(a) {
    $(a).css("max-height", ""), $(a).siblings(".fold-btn").remove(), $(a).after('<div class="fold-btn" onclick="commentOpen($(this).prev()[0])">' + Lang.app_show_all + "</div>")
}
function commentOpen(a) {
    $(a).html($(a).attr("data-comment")), $(a).siblings(".fold-btn").remove(), $(a).after('<div class="fold-btn" onclick="base_info_close($(this).prev()[0]);">' + Lang.app_show_other + "</div>"), $(a).css("max-height", "initial")
}
function commentClose(a) {
    for ($(a).css("max-height", ""); a.scrollHeight > $(a).height();) {
        var e = $(a).text(),
            t = 4;
        a.scrollHeight - $(a).height() > 20 && (t = 42 * Math.floor((a.scrollHeight - $(a).height()) / 17)), $(a).text(e.substring(0, e.length - t))
    }
    $(a).html(e.substring(0, e.length - 6) + "......"), $(a).siblings(".fold-btn").remove(), $(a).after('<div class="fold-btn" onclick="commentOpen($(this).prev()[0])">展开</div>')
}
function commentSearch(a) {
    var e = $(a).parent().siblings("input").val(),
        t = $(a).data("url") + "/sword/" + e;
    console.log($(a).siblings("input")), console.log(e), console.log(t), pjaxLoad(t)
}
function commentReply(a) {
    var e = $("#commentItcInfo"),
        t = e.data("status"),
        n = e.data("reportid"),
        i = e.data("url"),
        o = e.data("appleid"),
        s = $(a).data("userreviewid"),
        r = $(a).data("name");
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
            var a = $("#replyCommentArea").val();
            return "" === a ? (swal(Lang.itc_reply_tip), !1) : void $.ajax({
                    type: "POST",
                    url: i,
                    data: {
                        reportId: n,
                        userReviewId: s,
                        responseText: a
                    },
                    success: function(a) {
                        1e4 == a.code ? (swal(a.title, a.content), pjaxLoad(window.location.href)) : swal(a.title, a.content)
                    }
                })
        })
    } else 1 == t ? ($(".itc-account-editer").show(), $(".itc-account-editer").find(".modify-email").val(o).end().find(".old-email").val(o), console.log("账户密码错误")) : 2 == t ? ($(".itc-account-editer").show(), $(".itc-account-editer").find(".modify-email").val(o).end().find(".old-email").val(o), console.log("apple_userid获取失败")) : 3 == t ? ($(".itc-account-double-check").show(), $(".itc-account-double-check .icon-guanbi, .itc-account-double-check p a").click(function() {
                    $(".itc-account-double-check").hide()
                }), console.log("开启二次验证")) : ($(".bind-itc-account-showdesc").show(), $(".bind-itc-account-showdesc .icon-guanbi").click(function() {
                    $(".bind-itc-account-showdesc").hide()
                }), console.log("您没有绑定itc"))
}
function setBindItcAccountInfo(a) {
    var e = $.parseJSON(a);
    $("#bind-itc-account .top h6").html(e.title), $("#bind-itc-account .center p").html(e.tips)
}
function commentReplyEdit(a) {
    var e = $("#commentItcInfo").data("status");
    0 == e ? console.log("开发者账户正常") : 1 == e ? console.log("账户密码错误") : 2 == e ? console.log("apple_userid获取失败") : 3 == e ? console.log("开启二次验证") : $(".bind-itc-account-showdesc").show()
}
function isLocalStorageSupported() {
    var a = "test",
        e = window.localStorage;
    try {
        return e.setItem(a, "testValue"), e.removeItem(a), !0
    } catch (t) {
        return !1
    }
}
function itcDoubleCheck() {
    var a = $("#hasItcDoubleCheck").val();
    1 == a && swal({
        title: Lang.itc_double_check_title,
        showConfirmButton: !0,
        confirmButtonText: Lang.itc_double_check_confirm,
        confirmButtonColor: "#0bb995",
        showCancelButton: !0,
        cancelButtonText: Lang.itc_double_check_cancel,
        closeOnConfirm: !1,
        html: !0
    }, function(a) {
        a && window.open("https://support.apple.com/zh-cn/HT202664")
    })
}
function addMyEmailSubscribe(a, e) {
    if (a) {
        if (self = $(e), platform = $('input[name="platform-type"]').val() || "0", $.inArray(platform, ["0", "1"]) == -1) return swal("参数错误，刷新后重试"), !1;
        var t = self.html();
        self.html(Lang.now_adding);
        var n = "/account/addMyEmailSubscribe";
        $.ajax({
            type: "get",
            url: n,
            data: {
                app_id: a,
                platform: platform
            },
            dataType: "json",
            success: function(a) {
                a && 1e4 == a.code ? (data = a.data, swal({
                        title: Lang.add_app_email_title,
                        text: Lang.add_app_email_text,
                        type: "warning",
                        showCancelButton: !0,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: Lang.confirm_btn,
                        cancelButtonText: Lang.add_app_email_setting,
                        closeOnConfirm: !1
                    }, function(a) {
                        a || window.open("/account/setting/type/settingAccount"), window.location.reload()
                    })) : (10011 == a.code ? loginByAlert() : 10208 == a.code ? swal({
                                title: Lang.add_app_email_fail_title,
                                text: a.msg,
                                type: "warning",
                                showCancelButton: !0,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: Lang.confirm_btn,
                                cancelButtonText: Lang.add_app_email_fail_btn,
                                closeOnConfirm: !0
                            }, function(e) {
                                e || window.open(a.url)
                            }) : swal({
                                title: a.msg,
                                type: "error",
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: Lang.confirm_btn,
                                closeOnConfirm: !0
                            }), self.html(t))
            }
        })
    }
}
function cancelMyEmailSubscribe(a, e) {
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
        var e = "/account/cancelMyEmailSubscribe";
        return self = $(self), html = self.html(), platform, platform = $('input[name="platform-type"]').val(), $.inArray(platform, ["0", "1"]) == -1 ? (swal("参数错误，刷新后重试"), !1) : void $.ajax({
                type: "get",
                url: e,
                data: {
                    app_id: a,
                    platform: platform
                },
                dataType: "json",
                success: function(a) {
                    a && 1e4 == a.code ? window.location.reload() : swal(a.msg)
                }
            })
    })
}
function buySubmit(a) {
    return 1e4 == a.code ? (a.data && asyncPayNew(a.data), !1) : void(0 == a.code ? window.location.href = window.location.href + "?time=" + (new Date).getTime() : swal(a.msg))
}
function asyncPayNew(a) {
    if ("wx" == a.payChannel) {
        beecloudPayPop(a.amount / 100);
        var e = navigator.userAgent.toLowerCase();
        "micromessenger" == e.match(/MicroMessenger/i) ? a.payChannel = "wx" : a.payChannel = "wxmp", $(".buy-vip-cancel").click()
    }
    "undefined" == typeof BC ? document.addEventListener ? document.addEventListener("beecloud:onready", bcPayNew, !1) : document.attachEvent && document.attachEvent("beecloud:onready", bcPayNew) : bcPayNew(a)
}
function bcPayNew(a) {
    var e = {
        title: a.title,
        amount: a.amount,
        debug: a.debug,
        openid: a.openid,
        out_trade_no: a.out_trade_no,
        sign: a.sign,
        return_url: a.return_url,
        instant_channel: a.payChannel,
        optional: a.optional
    };
    BC.click(e, {
        wxJsapiSuccess: function(e) {
            window.location.href = a.return_url
        },
        dataError: function(a) {}
    })
}
function beecloudPayPop(a) {
    var e, t = '<p class="beecloud-title">扫码支付</p>',
        n = '<p class="wechat-pay">微信扫码支付<span>' + a + "</span>元</p>",
        i = '<p class="info"></p>';
    e = setInterval(function() {
        $("#beecloud-pay .beecloud-wx canvas").length && ($("#beecloud-pay .beecloud-wx p").remove(".beecloud-title").remove(".wechat-pay").remove(".info"), $("#beecloud-pay .beecloud-wx").prepend(t), $("#beecloud-pay .beecloud-wx").append(n), $("#beecloud-pay .beecloud-wx").append(i), clearInterval(e))
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
    function a(a, e) {
        if (0 != $("#circleProcess").length) {
            var t = a,
                n = Number(t.data("score")),
                i = e,
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
    function e(a, e) {
        var t, n, i;
        try {
            t = a.toString().split(".")[1].length
        } catch (o) {
            t = 0
        }
        try {
            n = e.toString().split(".")[1].length
        } catch (o) {
            n = 0
        }
        return i = Math.pow(10, Math.max(t, n)), (a * i + e * i) / i
    }
    function t(a, e, t) {
        t.addClass("disabled"), $.post(a, {
            amount: e
        }, function(a) {
            1e4 == a.code ? swal({
                    title: a.msg,
                    type: "success",
                    confirmButtonText: Lang.confirm_btn
                }, function() {
                    location.reload()
                }) : swal({
                    title: a.msg,
                    type: "error",
                    confirmButtonText: Lang.confirm_btn
                }, function() {
                    10002 == a.code && location.reload(), a.nowPrice && $(".now-price").text(a.nowPrice) && $(".now-price-input").val(a.nowPrice + .1), t.removeClass("disabled")
                })
        })
    }
    function n() {
        Q > 0 ? (Q -= 1, ta = Math.floor(Q % 60), na = Math.floor(Q / 60 % 60), ia = Math.floor(Q / 3600), ea = ia > 0 ? ia + "小时" : "", ea += na > 0 ? na + "分" : "", ea += ta + "秒", Z.html(ea)) : (window.clearInterval(aa), location.reload())
    }
    function i() {
        var a, e, t, n, i = $("#part-3");
        a = i.data("url"), t = i.find("table .no-data"), n = setInterval(function() {
            e = i.find("table .his-bid").first().text() || 0, $.getJSON(a, {
                bid: e
            }, function(a) {
                1e4 === a.code && (a.nowPrice >= 2.5 && clearInterval(n), a.histroy && (i.find("table").prepend(a.histroy), t.length > 0 && t.remove()), a.nowPrice && $(".now-price").text(a.nowPrice) && $(".now-price-input").val(a.nowPrice + .1))
            })
        }, 5e3)
    }
    function o() {
        var a, e, t, n, i = $(".report-condition-area .brand-dl .active"),
            o = $(".report-condition-area .class-dl .active");
        return 0 != i.length && 0 != o.length && ($(".brand-area").hide(), e = i.data("brandtype"), t = o.data("classtype"), a = "." + e + "-area", $(a).show(), void("all" != t ? ($(".ait-area").hide(), n = "#ait-" + t, $(n).show()) : $(".ait-area").show()))
    }
    function s() {
        $("img:not(.noload-default)").one("error", function() {
            $(this).attr("src", sourcePublic + "app/images/default-app-logo.png")
        })
    }
    function r() {
        if (!window.isMobile) {
            $(".aso100-nav-select .nav .dropdown, .appinfo-country.nav .dropdown, .get-analysis-data.nav .dropdown").on("click", function(a) {
                var e = $(a.target);
                if (e.hasClass("dropdown-toggle") && !e.parent().hasClass("cascade")) return !1
            });
            var a;
            $(".aso100-nav-select .nav .dropdown, .appinfo-country.nav .dropdown, .get-analysis-data.nav .dropdown").hover(function() {
                var e = $(this);
                a = setTimeout(function() {
                    e.children(".date-range-picker").length > 0 && e.children(".date-range-picker").click(), 0 == e.children(".btn").length && e.addClass("open")
                }, 100)
            }, function() {
                clearTimeout(a);
                var e = $(this),
                    t = 0;
                e.children(".dropdown-menu").mouseenter(function() {
                    t = 1
                }), $(".daterangepicker").mouseenter(function() {
                    t = 1
                }), setTimeout(function() {
                    0 == t && e.hasClass("open") && (e.children(".date-range-picker").length > 0 && e.children(".date-range-picker").click(), 0 == e.children(".btn").length && e.removeClass("open"))
                }, 100)
            }), $(document).on("mouseleave", ".daterangepicker", function(a) {
                $(".aso100-nav-select .nav .dropdown.open").children(".date-range-picker").click()
            })
        }
    }
    function d(a, e, t) {
        $(a).is(":hidden") ? ($(a).show(), $(e).css("border-bottom", 0), $(e + " img").hide(), $(e + " span").hide(), $(e + " i").addClass("top"), $(e + " p a").html("<span>" + Lang.already_subscribed + "</span>"), t ? $(t).css("border-top", 0) : $(e + " div+div").hide(), $(e).addClass("tit")) : ($(a).hide(), $(e + " span").show(), $(e).css("border-bottom", "1px solid #ddd"), t ? $(e + " p a").html("<span>" + Lang.subscribe_app + "</span>") : $(e + " div+div").show(), $(e + " p img").show(), $(e + " i").removeClass("top"), $(e).removeClass("tit"))
    }
    function c(a, e, t, n) {
        $(a).addClass(e), $(t).addClass(n)
    }
    function l(a, e, t, n) {
        $(a).removeClass(e), $(t).removeClass(n)
    }
    function p(a, e) {
        var t = $(".nav-date-bar-action .nav-item-hour"),
            n = $(".nav-date-bar-action .nav-item-day"),
            i = $("#charts-ajax-data"),
            o = i.data("defaultquerydata") || {},
            s = i.data("showhour");
        Aa && (o && "string" == typeof o && (o = JSON.parse(o)), o && i.length && o.sdate && (o.sdate = void 0), o && i.length && o.edate && (o.edate = void 0), o && (o.word = e), t.data("showdate", Lang.date_range_7), n.data("showdate", Lang.date_range_3), t.data("querydata", JSON.stringify(o)), n.data("querydata", JSON.stringify(o)));
        var r = $(".charts-ajax-data-copy").html();
        i.length && i.html(r), window.keywordShowHourTab.isDefault = "default", s ? (t.addClass("active").siblings().removeClass("active"), window.keywordShowHourTab.type = "hour", window.isKeywordShowHour = 1, window.keywordShowHourTab.defaultLang = Lang.date_range_7) : (i.data("ajaxurl", i.data("defaultdayajaxurl")), n.addClass("active").siblings().removeClass("active"), window.keywordShowHourTab.type = "day", window.isKeywordShowHour = 0, window.keywordShowHourTab.defaultLang = Lang.date_range_3)
    }
    function u(a, e) {
        var t = $("#setting");
        if (!t.length) return !1;
        var n = a || t.data("url"),
            i = $("#html-container");
        $.ajax({
            url: n,
            type: "get",
            dataType: "html",
            error: function(a) {
                if (a && 403 == a.status) window.location.href = "/";
                else if (302 == a.status) {
                    var e = a.getResponseHeader("Url");
                    e ? window.location.href = e : window.location.href = "/"
                }
            },
            success: function(a) {
                i.html(a), accountPwd(i.find(".account-setting")), accountPwd(i.find(".account-setting-pass")), setTimeout(footerFixed, 0), $('[data-toggle="tooltip"]').tooltip({
                    delay: {
                        show: 50,
                        hide: 100
                    }
                }), H(), settingAccount(), getDataCenterKeyword(), investCreateGroup(), Oe(), itcDoubleCheck(), e && e()
            }
        })
    }
    function h(a) {
        var e = a || $(".group-change-select");
        e.length > 0 && e.select2({
            minimumResultsForSearch: -1,
            placeholder: Lang.keyword_select2_placehoder,
            language: Lang.language_type
        })
    }
    function m(a, e, t) {
        var n, i = $("#groupData"),
            o = $("#group-change-submit").data("submiturl"),
            s = $("#group-list-nav .group.active");
        a && e ? $.ajax({
                url: o,
                type: "GET",
                dataType: "json",
                data: {
                    ids: a,
                    group: e
                }
            }).done(function(e) {
                if (1e4 == e.code) {
                    var o = $.parseJSON(e.tableData);
                    $.each(o, function(a, e) {
                        if (className = "groupData_" + a, classNameEle = "." + className, 0 == $(classNameEle).length) {
                            var t = '<input type="hidden" class="' + className + '">';
                            i.append(t)
                        }
                        $(classNameEle).val(JSON.stringify(e))
                    }), s.click(), n = a.toString().split(",").length, "cn" == Lang.language_type ? e.groupName && swal(n + Lang.keyword_setting_succ + e.groupName, "", "success") : swal(Lang.keyword_setting_succ, "", "success"), t && t()
                } else swal(Lang.keyword_setting_error)
            }).fail(function() {
                swal(Lang.request_error)
            }) : swal(Lang.keyword_selct_word)
    }
    function f(a, e) {
        var t = $(".groupData_0"),
            n = t.val();
        if (n && (n = $.parseJSON(n), $.each(n, function(e, t) {
                if (t[0] == a.toString()) return n.splice(e, 1), !1
            }), t.val(JSON.stringify(n))), 0 == $.parseJSON(t.val()).length) return $("#keyword-repertory-nodata").removeClass("hide"), $("#keyword-repertory-container").remove(), !1;
        if (0 != e) {
            var i = ".groupData_" + e,
                o = $(i).val();
            o && (o = $.parseJSON(o), $.each(o, function(e, t) {
                if (t[0] == a.toString()) return o.splice(e, 1), !1
            }), $(i).val(JSON.stringify(o)))
        }
        $("#checkbox_" + a).parents("tr").fadeOut("fast", function() {
            $("#checkbox_" + a).parents("tr").remove()
        });
        var s = $("#repertory-box .word-" + a);
        s.fadeOut("fast", function() {
            s.remove()
        })
    }
    function g() {
        if ($(".container-appinfo").length) {
            var a = $("#keyword-guide-area"),
                e = $("#nav-list"),
                t = $('input[name="is-myapp"]').val();
            t ? (a.length && (a.find(".guide-enter").show(), a.find(".guide-seal").show()), e.find(".keyword-show").show()) : (a.length && (a.find(".guide-enter").hide(), a.find(".guide-seal").hide()), e.find(".keyword-show").hide())
        }
    }
    function v(a, e, t) {
        a.addClass("disabled"), a.attr("disabled", !0), $.ajax({
            type: a.data("type") || "GET",
            url: a.data("action"),
            data: t || a.data("datas") || "",
            success: function(t) {
                a.removeClass("disabled"), a.attr("disabled", !1), e ? e(t, a) : ajaxPubHandle(t)
            }
        })
    }
    function b(a, e, t) {
        var n = e.parents(".remarks-info"),
            i = n.find(".remark-desc"),
            o = n.find(".remark-input"),
            s = n.find(".remark-action");
        remarkNew = o.find("input").val(), o.hide(), s.show(), 1e4 != a.code ? swal(a.msg) : i.text(remarkNew), i.show()
    }
    function w(a, e, t) {
        if (1e4 == a.code) {
            var n = e.parents(".dcbct-tbody-info-chart"),
                i = e.parents(".dcb-content-table");
            $("#isStickTopPop").data("ispop", a.ispop), i.find(".dcbct-tbody-info-chart.list").first().before(n), i.find(".dcbct-tbody-info-chart.list .dcbc-table-num").map(function(a, e) {
                $(e).text(++a)
            })
        } else swal(a.msg)
    }
    function y(a, e, t) {
        var n = $(".nav-tabs li.active a").attr("href"),
            i = t.appid,
            o = $(n).find(".dcbct-body-competi-chart-tr-" + i),
            s = o.find(".chart-data");
        o.find(".spinner-box").removeClass("show").addClass("animation-hide"), o.addClass("data-ready"), e.hasClass("action-rank") && datePicker(o.find(".date-range-picker")), window.chartData.titleDate = Lang.date_range_1, a.data ? drawCharts(a.data, s) : drawNodataCharts(a.data, s)
    }
    function k(a, e) {
        var t = a.data("appid"),
            n = a.parents(".competi-search-list").data("appid"),
            i = a.parents(".competi-search-list").data("indexid"),
            o = {};
        o = {
            competiId: t,
            appid: n,
            indexId: i
        }, ajaxRequestAction(a, x, o, e)
    }
    function x(a, e, t) {
        if (1e4 == a.code) {
            e.text("已添加").addClass("disabled");
            var n = $("#competiDataUrl").val();
            $.ajax({
                url: n,
                type: "GET",
                dataType: "json",
                data: t
            }).done(function(a) {
                var e = $(".dcbct-body-compete-chart-warp-" + t.indexId),
                    n = e.find(".dcbc-table-body-competi tbody"),
                    i = a.data.competiOutHTML;
                n.prepend(i), n.find(".dcbct-body-info-tr").map(function(a, e) {
                    $(this).find("td:eq(0)").text(++a)
                })
            }).fail(function() {
                swal("请稍后再试")
            })
        } else swal(a.msg)
    }
    function C(a, e) {
        if (a && 1e4 == a.code) {
            var t = e.parents(".dcbct-body-compete-chart-warp"),
                n = t.find(".dcbc-table-body-competi tbody"),
                i = t.find(".dcbc-table-body-possible tbody"),
                o = e.parents(".dcbct-body-info-tr"),
                s = e.data("datas"),
                r = s.competiId,
                d = $(".dcbct-body-competi-chart-tr-" + r);
            e.context.className.indexOf("action-del") == -1 ? (n.prepend(d), n.prepend(o), n.find(".no-result").length && n.find(".no-result").hide()) : (i.prepend(d), i.prepend(o), i.find(".no-result").length && i.find(".no-result").hide()), i.find(".dcbct-body-info-tr").map(function(a, e) {
                $(this).find("td:eq(0)").text(++a)
            }), n.find(".dcbct-body-info-tr").map(function(a, e) {
                $(this).find("td:eq(0)").text(++a)
            })
        } else swal(a.msg)
    }
    function _(a, e) {
        re = new RegExp("groupid\\/\\d+", "i"), isExist = a.match(re), a = isExist ? a.replace(isExist, "groupid/" + e) : a + "/groupid/" + e, u(a)
    }
    function T(a) {
        if (Te) return !1;
        var e = $(".alert-app-top-main"),
            t = e.data("left") || 0,
            n = getInt(e.find("li").css("width")) + getInt(e.find("li:not(:first-child)").css("marginLeft")),
            i = window.isMobile ? 5 : 6,
            o = (e.find("li").length - i - 1) * n;
        Math.abs(t) >= o ? (Te = !0, $(".left-arrow").show(), t -= n, e.css("webkit-transform", "translateX(" + t + "px)").on("transitionend", function() {
                Te = !1
            }).data("left", t), a.hide()) : (Te = !0, $(".left-arrow").show(), t -= n, e.css("webkit-transform", "translateX(" + t + "px)").on("transitionend", function() {
                Te = !1
            }).data("left", t))
    }
    function D(a) {
        if (De) return !1;
        var e = $(".alert-app-top-main"),
            t = e.data("left") || 0,
            n = $(".show-app-top-main").offset().left,
            i = e.offset().left + 10,
            o = e.find("li").length > 1 ? getInt(e.find("li").css("width")) + getInt(e.find("li:not(:first-child)").css("marginLeft")) : getInt(e.find("li").length ? e.find("li").css("width") : $(".show-app-top-main").css("width"));
        n < i + o ? (De = !0, $(".right-arrow").show(), t += o, e.css("webkit-transform", "translateX(" + t + "px)").on("transitionend", function() {
                De = !1
            }).data("left", t), a.hide()) : (De = !0, $(".right-arrow").show(), t += o, e.css("webkit-transform", "translateX(" + t + "px)").on("transitionend", function() {
                De = !1
            }).data("left", t))
    }
    function S() {
        qe--, Fe = Math.floor(qe / 60 % 60), Ee = Math.floor(qe % 60), Ae.html(numAddZero(Fe)), Ne.html(numAddZero(Ee)), qe <= 0 && (clearInterval(He), $.ajax({
            url: ra,
            success: function(a) {
                location.href = a.url
            }
        }))
    }
    function j() {
        var a = $(".shopping .right-arrow"),
            e = $(".show-alert-btn .shopping-popup");
        e.show(), a.show()
    }
    function B() {
        var a = $(".shopping .right-arrow"),
            e = $(".show-alert-btn .shopping-popup");
        e.hide(), a.hide()
    }
    function I(a) {
        var e = localStorage,
            t = "zhitou" + $(".app").data("appid");
        e.setItem(t, JSON.stringify(a))
    }
    function O(a) {
        var e = localStorage,
            t = "zhitou" + a;
        return JSON.parse(e.getItem(t))
    }
    function M(a) {
        var e = $(".show-alert-btn>.shopping .zhitou .num");
        e.html(a)
    }
    function P() {
        var a = $(".show-alert-btn>.shopping .zhitou .num");
        a.show()
    }
    function R() {
        var a = $(".show-alert-btn>.shopping .zhitou .num");
        a.hide()
    }
    function F() {
        var a = $(".shopping .shopping-popup .shopping-main>ul");
        a.find(".shopping-main-title").show(), a.find(".shopping-info").hide()
    }
    function E() {
        var a = $(".shopping .shopping-popup .shopping-main>ul");
        a.find(".shopping-info").show(), a.find(".shopping-main-title").hide()
    }
    function A() {
        var a, e = $("#keyword-list .shopping-cart"),
            t = $(".app").data("appid");
        if (ze = O(t) || [], R(), ze && ze.length > 0) {
            M(ze.length);
            for (var n = $(".shopping .shopping-popup .shopping-main>ul"), i = 0; i < ze.length; i++) {
                var o = "<li data-keywordid=" + ze[i].keywordId + '><p><span class="ellipsis">' + ze[i].keyword + '</span><i class="iconfont icon-guanbi shopping-item-close"></i></p><p>' + ze[i].heatNum + "</p><p>" + ze[i].rank + "</p></li>";
                n.append(o), $.each(e, function(e, t) {
                    a = $(t), a.data("id") == ze[i].keywordId && a.addClass("active")
                })
            }
            P()
        }
    }
    try {
        var N = $.cookie("fuid");
        N || (new Fingerprint2).get(function(a) {
            $.cookie("fuid", a, {
                path: "/",
                expires: 360
            })
        })
    } catch (q) {}
    var H = function() {
        Aa = void 0, $("#charts-appname").val($("#charts-appname").data("appname")), s(), tooltipInit(), moreBtnShow(), r(), $("#keyword-list").length && $("#is_android").length ? dataSearchPush_android() : dataSearchPush(), downSources(), $("#bind-itc-account").hide(), keywordRepertory(), h(), centerModals(), g(), showChangePd(), Ue()
    };
    if ($(".btn-copy-custom").length) {
        var W = new Clipboard(".btn-copy-custom"),
            U = $(".btn-copy-custom");
        W.on("success", function(a) {
            U.addClass("copied"), setTimeout(function() {
                U.removeClass("copied")
            }, 2e3), a.clearSelection()
        }), W.on("error", function(a) {
            var e = isMobile ? "请手动复制" : "请按 Ctrl/Cmd+C 复制";
            swal(e)
        })
    }
    if ($(document).mouseup(function(a) {
            var e = $("#expand-detail-two"),
                t = $(".alert-app-search"),
                n = ($(".alert-app"), $(".alert-keyword")),
                i = $(".add-item-two"),
                o = $(".plan");
            if (e.length) {
                var s = e.find("form");
                s.is(a.target) || 0 !== s.has(a.target).length || e.find(".search-app-list").hide()
            }
            if (t.length) {
                var s = t.find(".alert-default-list"),
                    r = t.find("form");
                r.is(a.target) || 0 !== r.has(a.target).length || s.is(a.target) || 0 !== s.has(a.target).length || s.hide()
            }
            if (n.length) {
                var s = n.find(".alert-keyword-container");
                s.is(a.target) || 0 !== s.has(a.target).length || n.hide()
            }
            if (i.length) {
                var s = i.find(".select-drop-list");
                s.is(a.target) || 0 !== s.has(a.target).length || (s.hide(), i.find(".one-select").removeClass("active"))
            }
            if (o.length) {
                var s = o.find(".product-list");
                s.is(a.target) || 0 !== s.has(a.target).length || s.hide()
            }
        }), $("#qrcode-show").length) {
        var z, Y = $("#qrcode-body"),
            J = $("#qrcode-show"),
            G = $("#qrcode-body .popover-content img"),
            X = $("#qrcode-body .popover-content img").data("imgs"),
            V = J.position().left - 76 + "px";
        Y.css("left", V), $("#qrcode-show").hover(function() {
            "undefined" == typeof G.attr("src") && G.attr("src", X), z = setTimeout(function() {
                Y.fadeIn(200)
            }, 300)
        }, function() {
            clearTimeout(z), Y.fadeOut(200)
        })
    }
    var K = "#0bb995";
    if ($(".bidding-header").length > 0 && (K = "#3e9eeb"), swal.setDefaults({
            confirmButtonText: Lang.confirm_btn,
            cancelButtonText: Lang.cancel_btn,
            confirmButtonColor: K
        }), a($("#circleScore"), $(".d-score-text-1")), a($("#circleScore2"), $(".d-score-text-2")), $(".detect-new .chart-show").each(function(a, e) {
            var t = $(this),
                n = t.data("chartdata");
            dataCenterCustomRankChart(t, n)
        }), $(document).on("click", ".jifen-switch li", function() {
            var a = $(this),
                e = $(".jifen-main");
            a.addClass("active").siblings().removeClass("active"), e.find("." + a.data("father")).show().siblings().hide()
        }), circleDetect($("#circleScore"), $(".d-score-text-1")), circleDetect($("#circleScore2"), $(".d-score-text-2")), $(".detect-new .chart-show").each(function(a, e) {
            var t = $(this),
                n = t.data("chartdata");
            dataCenterCustomRankChart(t, n)
        }), 1 == $("#bid-state").val()) {
        $(document).on("click", "#offer-btn", function() {
            var a, n, i = $(this),
                o = $("#offer-action"),
                s = $("#cover-bg"),
                r = $("#up-btn"),
                d = $("#amount");
            a = parseFloat(d.val()), i.hasClass("isShow") ? (n = i.data("url"), t(n, a, i)) : (i.addClass("isShow"), $("body").css("overflow", "hidden"), o.slideDown(), s.fadeIn()), s.on("tap", function() {
                $("body").css("overflow", "auto"), o.slideUp(), s.fadeOut(), i.removeClass("isShow"), d.val() || d.val(a)
            }), r.on("tap", function() {
                return 2.5 != a && (a = e(a, .1), void d.val(a))
            })
        });
        var Z, Q, aa, ea, ta, na, ia;
        Z = $(".bidding-area .info .remain-second"), Q = parseInt(Z.data("seconds")), aa = window.setInterval(n, 1e3), n(), i()
    }
    if (1 == $("#ispopup").val() && swal("很遗憾，您错过了本期竞拍，新一期下周一8:00开始，不要错过哦"), $(document).on("click", "#verify-phone #send-code", function() {
            var a, e = $(this),
                t = $("#phone").val();
            a = e.data("sendurl"), $.getJSON(a, {
                phone: t
            }, function(a) {
                if (1e4 != a.code) return swal({
                    title: a.msg,
                    type: "error",
                    confirmButtonText: Lang.confirm_btn
                }), !1;
                var t = 59,
                    n = setInterval(function() {
                        e.text("重新获取(" + t--+")"), t < 0 && (e.removeClass("disabled"), e.text("获取验证码"), clearInterval(n))
                    }, 1e3);
                e.addClass("disabled"), e.text("重新获取(60)"), swal({
                    title: a.msg,
                    type: "success",
                    confirmButtonText: Lang.confirm_btn
                })
            })
        }), $(document).on("tap", "#verify-phone #submit", function() {
            var a = ($(this), $(".form-horizontal")),
                e = $(".referer").val();
            $.ajax({
                type: "POST",
                url: a.attr("action"),
                data: a.serialize(),
                success: function(a) {
                    return 1e4 != a.code ? (swal({
                            title: a.msg,
                            type: "error",
                            confirmButtonText: Lang.confirm_btn
                        }), !1) : void swal({
                            title: a.msg,
                            type: "success",
                            confirmButtonText: Lang.confirm_btn
                        }, function() {
                            window.location.href = e
                        })
                }
            })
        }), $(document).on("click", ".change-pd .iconfont", function() {
            var a = $(this),
                e = a.parents(".change-pd"),
                t = e.data("name");
            if (!t) return !1;
            var n = +moment(moment().format("YYYY-MM-DD") + " 23:59:59"),
                i = {};
            localStorage.pdconfig && (i = JSON.parse(localStorage.pdconfig)), i[t] = n, i = JSON.stringify(i), localStorage.pdconfig = i, e.removeClass("show-animation")
        }), $(document).on("tap click", ".nav .change-lang", function() {
            var a, e = $(this);
            a = e.data("langtype"), $.cookie("language", a, {
                path: "/"
            }), location.reload()
        }), $(document).on("focus", ".navbar-top-form .input-group .form-control", function() {
            var a = $(this).parents("form");
            a.hasClass("lanuch") || (window.isMobile ? a.addClass("lanuch") : a.addClass("lanuch").find(".form-control.search-su").animate({
                    width: window.isMobile ? "4.0625rem" : "490px"
                }, 400).select())
        }), $(document).on("click", ".navbar-top-form .search-close", function(a) {
            var e = $(this).parents("form");
            return e.removeClass("lanuch").find(".form-control.search-su").animate({
                width: "166px"
            }, 200), !1
        }), $(document).on("tap click", "#platform .platform-btn", function() {
            var a = $(this),
                e = a.data("icon"),
                t = a.data("lang"),
                n = a.data("searchurl"),
                i = a.parents("ul.dropdown-menu"),
                o = i.parents(".navbar-form"),
                s = o.find("i.active-icon");
            o.attr("action", n), s.removeClass("icon-android").removeClass("icon-ios").addClass(e), $("input[name='search']").focus(), "apple" == t ? ($("input[name='search']").attr("placeholder", Lang.apple_search_placeholder), o.find(".select-button.country").removeClass("hide")) : ($("input[name='search']").attr("placeholder", Lang.android_search_placeholder), o.find(".select-button.country").addClass("hide"))
        }), $(document).on("click", ".country-select.dropdown-menu li", function() {
            var a = $(this),
                e = a.find("a").data("country");
            if (a.hasClass("search-country")) return !1;
            var t = a.parents(".country").find(".btn .icon-flag");
            t.removeClass("icon-flag-" + t.data("country")).addClass("icon-flag-" + e).data("country", e), $(".navbar-form .country").find(".btn .icon-flag").removeClass("icon-flag-" + t.data("country")).addClass("icon-flag-" + e).data("country", e).end().find("input.country-hidden").val(e), t.find("input.country-hidden").val(e), $.cookie("country", e, {
                path: "/",
                expires: 90
            }), a.parents("form.navbar-form").find('input[name="search"]').focus()
        }), $(document).on("focus keyup input paste", ".country-select.dropdown-menu .search-country input", function() {
            var a = $(this),
                e = a.val(),
                t = a.parents(".country-select").find(".select-container li");
            e ? (e = e.toLowerCase(), $.map(t, function(a, t) {
                    var n = $(a),
                        i = n.find("a").data("search");
                    n.hasClass("hot-country") || !i ? n.hide() : i.indexOf(e) !== -1 ? n.show() : n.hide()
                })) : $.map(t, function(a, e) {
                    $(a).show()
                })
        }), o(), $(document).on("tap click", ".machine-report .report-condition-area .brand-btn", function() {
            $(".brand-btn").hasClass("active") && $(".brand-btn").removeClass("active"), $(this).addClass("active"), o()
        }), $(document).on("tap click", ".machine-report .report-condition-area .class-btn", function() {
            $(".class-btn").hasClass("active") && $(".class-btn").removeClass("active"), $(this).addClass("active"), o()
        }), $(document).on("tap click", ".machine-report .click-more", function(a) {
            var e, t = $(this);
            e = t.prev(), e.hasClass("more-data") && ("none" == e.css("display") ? (e.show(), "release" == t.data("type") ? t.html("<span>鈻� " + Lang.click_fold_up + "</span>") : t.html("<span>" + Lang.click_fold_up + "</span>")) : (e.hide(), "release" == t.data("type") ? t.html("<span>鈻� " + Lang.click_get_more_record + "</span>") : t.html("<span>" + Lang.click_get_more + "</span>")))
        }), $(document).on("tap click focus", ".input-value", function() {
            $(this).val("")
        }), $(document).on("tap", ".aso100-nav-select .dropdown", function(a) {
            if (a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0, isMobile) {
                var e = $(this),
                    t = e.find(".dropdown-menu.wide"),
                    n = document.documentElement.clientWidth;
                if (!t.length) return;
                var i = 300,
                    o = e.offset().left,
                    s = 0;
                s = i - (n - o) + 15, s > 0 && t.css({
                    left: -s,
                    right: "initial"
                }).find(".glyphicon").css({
                    left: s + e.width() / 2 - 7,
                    right: "initial"
                })
            }
        }), $(document).on("tap click", ".jumbotron", function(a) {
            $(".aso100-nav-select .dropdown.open").removeClass("open"), $(".navbar-top-form .search-close").trigger("click")
        }), $(document).on("click", "#manual-refresh", function() {
            var a, e, t = $(this),
                n = t.data("page");
            if ("app" == n) {
                e = t.data("appid");
                var i = t.data("countryid") || 1;
                a = "/app/manualRefreshByAppid/appid/" + e + "/countryid/" + i
            } else {
                if ("search" != n) return swal({
                    title: Lang.operation_exception,
                    type: "error",
                    showCancelButton: !1,
                    confirmButtonColor: "#33ba95",
                    confirmButtonText: Lang.confirm_btn,
                    cancelButtonText: Lang.cancel_btn
                }), !1;
                e = t.data("wordid"), word = t.data("word"), a = "/search/manualRefreshByWord/word/" + word + "/wordid/" + e
            }
            return $.ajax({
                url: a,
                type: "get",
                dataType: "json",
                beforeSend: function(a) {
                    a.setRequestHeader("RequestType", "ajax")
                },
                success: function(a) {
                    1e4 == parseInt(a.code) ? swal({
                            title: a.msg,
                            type: "success",
                            showCancelButton: !1,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.confirm_btn,
                            cancelButtonText: Lang.cancel_btn
                        }) : swal({
                            title: a.msg,
                            type: "error",
                            showCancelButton: !1,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.confirm_btn,
                            cancelButtonText: Lang.cancel_btn
                        })
                }
            }), !1
        }), $(".gee-test").length) {
        var oa = $(".gee-test"),
            sa = oa.data("product") || "embed",
            ra = oa.data("checkurl") || "/error/verifyGeetest",
            da = function(a) {
                window.geetestO = a, geetestO.appendTo(".gee-test #pop"), geetestO.onSuccess(function() {
                    $.ajax({
                        url: ra,
                        type: "post",
                        dataType: "json",
                        data: geetestO.getValidate(),
                        success: function(a) {
                            if (1e4 == parseInt(a.code)) {
                                var e = $("#signin");
                                e.length > 0 && e.find(".sign-msg").html("").slideUp("fast");
                                var t = $(".gee-test").data("referrer");
                                t && (window.location.href = t)
                            } else swal({
                                title: a.msg,
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
            success: function(a) {
                initGeetest({
                    gt: a.gt,
                    challenge: a.challenge,
                    product: sa,
                    width: "310px",
                    offline: !a.success
                }, da)
            }
        })
    }
    var ca;
    $(document).on("mouseenter", "#app-list .media", function() {
        var a = $(this).find(".media-right a.btn-custom");
        ca = setTimeout(function() {
            a.css("visibility", "visible").css("opacity", 0).animate({
                opacity: 1
            }, 400)
        }, 300)
    }), $(document).on("mouseleave", "#app-list .media", function() {
        var a = $(this).find(".media-right a.btn-custom");
        clearTimeout(ca), a.css("opacity", 1).animate({
            opacity: 0
        }, 400)
    }), $("#search-index-history-info .iconfont").on("click", function() {
        $("#search-index-history-info").addClass("hide").removeClass("show show-animation"), $("#vip-b").hide()
    }), $("#show-search-history").on("click", function() {
        $("#search-index-history-info").removeClass("hide").addClass("show show-animation"), $("#vip-b").show()
    }), $("#search-index-history-info td a").hover(function() {
        var a = $(this).data("appid");
        $(".search-history-" + a).addClass("hover")
    }, function() {
        var a = $(this).data("appid");
        $(".search-history-" + a).removeClass("hover")
    }), s(), window.isWechat && $(".machine-report .share").show(), window.isMobile && !
        function() {
            var a = $(".jumbotron .container"),
                e = $(window).height() - a.offset().top - a.height();
            e > 0 && !a.hasClass("container-not-offset") && a.css("minHeight", $(window).height() - a.offset().top)
        }(), $(".jumbotron.items .container .index-title div").mouseover(function() {
        $(".jumbotron.items .container .index-title div p").show()
    }).mouseout(function() {
        $(".jumbotron.items .container .index-title div p").hide()
    }), isMobile || $(".head .nav .dropdown").on("click", function(a) {
        if ($(a.target).hasClass("dropdown-toggle")) return !1
    }), $(".head .nav .dropdown").hover(function() {
        var a = $(this);
        a.addClass("open"), a.data("imgshow") || ($.each(a.find("img"), function() {
            var a = $(this);
            a.attr("src", a.attr(".src"))
        }), a.data("imgshow", 1))
    }, function() {
        var a = $(this);
        a.removeClass("open")
    }), r();
    var la = !1;
    $(document).on("click", ".subscribe-select-box .genre-cancle", function() {
        var a = $(this),
            e = a.parents(".subscribe-select-box");
        e.hide(), $(".vip-b").hide()
    }), $(document).on("click", ".subscribe-container input", function(a) {
        if (la) return !1;
        var e = $(this),
            t = e.parents("table"),
            n = t.data("type");
        if (e.parent().find("label").hasClass("disabled")) return !1;
        if (t.hasClass("bind")) return la = !1, bindWechat(t[0]), !1;
        if (1 == n) return t.data("load") || $.ajax({
            type: "GET",
            url: "/account/subscribeFloatHtml",
            dataType: "json",
            success: function(a) {
                1e4 == a.code ? (t.data("load", 1), $(".subscribe-select-box").html(a.html)) : 81004 == a.code ? swal({
                            title: a.title,
                            type: "error",
                            showCancelButton: !0,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.confirm_btn,
                            cancelButtonColor: "#33ba95",
                            cancelButtonText: Lang.certified_btn,
                            html: !0
                        }, function(a) {
                            a || (window.location.href = "/account/setting/type/settingInvestor")
                        }) : swal({
                            title: a.msg,
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
        d.remove = e.prop("checked") ? 0 : 1, d.appid = i, d.wordid = o, d.remind = r, d.type = n, la = !0, $.ajax({
            type: "post",
            url: s,
            data: d,
            complete: function() {
                la = !1
            },
            success: function(a) {
                if (1e4 == a.code) {
                    if (!d.remove) {
                        var i;
                        if (r ? ("string" == typeof r && r.indexOf(",") != -1 && (r = r.replace(/,/g, ":00, ")), r += ":00") : r = "18:00", window.isMobile) return 4 == n ? i = Lang.wechat_subscribe_tip1 + a.appname + Lang.wechat_subscribe_tip2 : 8 == n || 6 == n || 7 == n || (i = Lang.wechat_subscribe_tip1 + a.appname + Lang.wechat_subscribe_tip3 + (2 == n ? Lang.wechat_subscribe_tip4 : Lang.wechat_subscribe_tip5) + Lang.wechat_subscribe_tip6 + r + Lang.wechat_subscribe_tip7), swal({
                            title: i,
                            type: "success",
                            showCancelButton: !1,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.confirm_btn,
                            cancelButtonText: Lang.cancel_btn
                        }), !1;
                        var o = !! n;
                        1 == n ? i = Lang.wechat_subscribe_tip8 + r + Lang.wechat_subscribe_tip9 : 8 == n ? (i = Lang.wechat_subscribe_tip17, o = !1) : 6 == n ? (i = Lang.wechat_subscribe_tip18, o = !1) : 7 == n ? (i = Lang.wechat_subscribe_tip19, o = !1) : 4 == n ? i = Lang.wechat_subscribe_tip1 + a.appname + Lang.wechat_subscribe_tip10 : 5 == n ? (i = Lang.wechat_subscribe_tip1 + a.appname + Lang.wechat_subscribe_tip11 + r + Lang.wechat_subscribe_tip12, i += "，" + (2 == n ? Lang.wechat_subscribe_tip13 : Lang.wechat_subscribe_tip14) + Lang.wechat_subscribe_tip15) : (i = Lang.wechat_subscribe_tip1 + a.appname + Lang.wechat_subscribe_tip3 + (2 == n ? Lang.wechat_subscribe_tip4 : Lang.wechat_subscribe_tip5) + Lang.wechat_subscribe_tip6 + r + Lang.wechat_subscribe_tip12, i += "，" + (2 == n ? Lang.wechat_subscribe_tip13 : Lang.wechat_subscribe_tip14) + Lang.wechat_subscribe_tip15), swal({
                            title: i,
                            type: "success",
                            showCancelButton: o,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.confirm_btn,
                            cancelButtonColor: "#33ba95",
                            cancelButtonText: Lang.setup
                        }, function(a) {
                            a || (window.location.href = "/account/setting/type/settingSubscribe")
                        })
                    }
                } else 81004 == a.code ? (e.prop("checked", !e.prop("checked")), swal({
                        title: a.title,
                        type: "error",
                        showCancelButton: !0,
                        confirmButtonColor: "#33ba95",
                        confirmButtonText: Lang.certified_btn,
                        cancelButtonColor: "#33ba95",
                        cancelButtonText: Lang.cancel_btn,
                        html: !0
                    }, function(a) {
                        a && window.open("/account/setting/type/settingInvestor")
                    })) : 10109 == a.code ? (e.prop("checked", !1), reminds.addClass("disabled"), t.data("checkurl", a.checkurl), t.data("qrcodeurl", a.qrcodeurl), bindWechat(t[0])) : (e.prop("checked", !e.prop("checked")), swal({
                            title: a.msg,
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
        var a = $(this),
            e = !0,
            t = a.attr("action"),
            n = {};
        return a.find("input.form-control").each(function() {
            var a = $(this),
                t = a.val();
            t = t.replace(/^\s+/i, ""), t = t.replace(/\s+$/i, ""), t ? "phone" != this.name || /^13[\d]{9}$|^14[0-9]\d{8}|^15[0-9]\d{8}$|^18[0-9]\d{8}$|^17[0-9]\d{8}$/.test(t) || (a.parents(".input-group").addClass("error-msg"), e = !1) : (a.parents(".input-group").addClass("error-msg"), e = !1), e && (n[this.name] = t)
        }), !! e && ($.ajax({
            type: "POST",
            url: t,
            data: n,
            success: function(e) {
                1e4 == e.code ? e.data && e.data.length ? $.each(e.data, function(e, t) {
                            a.find('input.form-control[name="' + e + '"]').parents(".input-group").addClass("error-msg")
                        }) : ($("#vip-b").hide(), $("#serve-search").removeClass("show"), swal({
                            title: e.msg,
                            html: 1
                        })) : swal(e.msg)
            }
        }), !1)
    }), $(document).on("click", ".subscribe-modify-remind input", function(a) {
        if (la) return !1;
        clearTimeout(hoverTimeout);
        var e = $(this),
            t = e.parents(".subscribe-modify-remind"),
            n = t.data("limit"),
            i = t.data("url"),
            o = t.data("type"),
            s = t.find('input[type="checkbox"]:checked'),
            r = {};
        if (t.hasClass("myapps-empty")) return swal(Lang.you_not_added_application), !1;
        if (e.parent().find("label").hasClass("disabled")) return !1;
        r.remind = [], s.each(function(a, e) {
            r.remind[a] = parseInt($(e).val())
        });
        var d = $("#checkbox-tips").length ? $("#checkbox-tips") : $('<span class="checkbox-tips" id="checkbox-tips"></span>');
        r.type = o, la = !0, $.ajax({
            type: "POST",
            url: i,
            data: r,
            complete: function() {
                la = !1
            },
            success: function(a) {
                var i;
                1e4 == a.code ? (i = !e.prop("checked"), d.appendTo(e.parent()), d.html(Lang.already_save).removeClass("hide").addClass("show"), hoverTimeout = setTimeout(function() {
                        d.removeClass("show").addClass("hide")
                    }, 1200), t.parents("table").find(".subscribe-show-remind").html(r.remind.length > 0 ? r.remind.join(":00、") + ":00" : Lang.not_setup)) : (i = e.prop("checked"), swal({
                        title: a.msg,
                        type: "error",
                        showCancelButton: !1,
                        confirmButtonColor: "#33ba95",
                        confirmButtonText: Lang.confirm_btn,
                        cancelButtonText: Lang.cancel_btn
                    })), i ? (e.prop("checked", !1), e.parent().removeClass("aso-checkbox-checked")) : (e.prop("checked", !0), e.parent().addClass("aso-checkbox-checked")), t.find('input[type="checkbox"]:checked').length >= n ? t.find(".aso-checkbox:not(.aso-checkbox-checked) label").addClass("disabled") : t.find(".aso-checkbox:not(.aso-checkbox-checked) label").removeClass("disabled")
            }
        })
    }), $(document).on("click", ".genre-list input", function(a) {
        if (la) return !1;
        clearTimeout(hoverTimeout);
        var e = $(this),
            t = e.parents(".genre-list"),
            n = t.data("limit"),
            i = t.data("url"),
            o = (t.data("type"), t.find('input[type="checkbox"]:checked')),
            s = {};
        if (e.parent().find("label").hasClass("disabled")) return !1;
        s.genreid = [], o.each(function(a, e) {
            s.genreid[a] = parseInt($(e).val())
        });
        var r = $("#checkbox-tips").length ? $("#checkbox-tips") : $('<span class="checkbox-tips" id="checkbox-tips"></span>');
        la = !0, $.ajax({
            type: "POST",
            url: i,
            data: s,
            complete: function() {
                la = !1
            },
            success: function(a) {
                var i;
                1e4 == a.code ? (i = !e.prop("checked"), r.appendTo(e.parent()), r.css({
                        left: e.siblings("label").outerWidth() + 5 + "px",
                        right: 0
                    }).html(Lang.already_save).removeClass("hide").addClass("show"), hoverTimeout = setTimeout(function() {
                        r.removeClass("show").addClass("hide")
                    }, 1200)) : (i = e.prop("checked"), swal({
                        title: a.msg,
                        type: "error",
                        showCancelButton: !1,
                        confirmButtonColor: "#33ba95",
                        confirmButtonText: Lang.confirm_btn
                    })), i ? (e.prop("checked", !1), e.parent().removeClass("aso-checkbox-checked")) : (e.prop("checked", !0), e.parent().addClass("aso-checkbox-checked")), t.find('input[type="checkbox"]:checked').length >= n ? t.find(".aso-checkbox:not(.aso-checkbox-checked) label").addClass("disabled") : t.find(".aso-checkbox:not(.aso-checkbox-checked) label").removeClass("disabled"), t.find('input[type="checkbox"]:checked').length > 0 ? $(".subscribe-container input").prop("checked", !0) : $(".subscribe-container input").prop("checked", !1)
            }
        })
    }), $(document).on("click", ".setting-content .timeingpush", function(a) {
        var e = $(this),
            t = e.parents(".subscribe-list"),
            n = t.data("timepushurl"),
            i = e.data("type");
        modifytype = e.hasClass("remove") ? 1 : 0, $.ajax({
            type: "POST",
            data: {
                type: i,
                modifytype: modifytype
            },
            url: n,
            success: function(a) {
                1e4 == a.code ? e.hasClass("remove") ? e.removeClass("remove").html(Lang.subscribe_btn) : e.addClass("remove").html(Lang.unsubscribe_btn) : 81004 == a.code ? swal({
                            title: a.title,
                            type: "error",
                            showCancelButton: !0,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.certified_btn,
                            cancelButtonColor: "#33ba95",
                            cancelButtonText: Lang.cancel_btn,
                            html: !0
                        }, function(a) {
                            a && window.open("/account/setting/type/settingInvestor")
                        }) : swal({
                            title: a.msg,
                            type: "error",
                            confirmButtonText: Lang.confirm_btn
                        })
            }
        })
    }), $(document).on("click", ".subscribe-modify-apps .subscribe-modify", function(a) {
        if (la) return !1;
        var e = $(this),
            t = e.parents(".row").data("modifytype"),
            n = e.data("appid"),
            i = e.parents(".subscribe-modify-apps"),
            o = e.parents(".thumbnail"),
            s = i.data("url"),
            r = i.data("type"),
            d = {};
        d["modify-type"] = t, d.type = r, d.app_id = n, la = !0, o.addClass("subscribe-app-animation"), $.ajax({
            type: "POST",
            url: s,
            data: d,
            complete: function() {
                la = !1, o.removeClass("subscribe-app-animation")
            },
            success: function(a) {
                if (1e4 == a.code) {
                    var o, s = e.parents(".thumbnail");
                    if ("add" == t ? (s.find(".glyphicon-subscribe-add").removeClass("glyphicon-subscribe-add").addClass("glyphicon-subscribe-remove"), o = i.find(".row[data-modifytype=remove] .col-md-10:last")) : (s.find(".glyphicon-subscribe-remove").removeClass("glyphicon-subscribe-remove").addClass("glyphicon-subscribe-add"), o = i.find(".row[data-modifytype=add] .col-md-10:last")), 4 == r && "add" == t) {
                        var d = $('<div class="col-md-10"></div>');
                        s.appendTo(d), s = d, o = i.find(".row[data-modifytype=remove] .col-md-box")
                    }
                    4 == r && "remove" == t && s.parent().remove(), s.appendTo(o), 3 == r && "add" == t && swal({
                        title: Lang.wechat_subscribe_tip1 + a.appname + Lang.wechat_subscribe_tip16,
                        type: "success",
                        showCancelButton: !0,
                        confirmButtonColor: "#33ba95",
                        confirmButtonText: Lang.added,
                        cancelButtonColor: "#33ba95",
                        cancelButtonText: Lang.go_add
                    }, function(a) {
                        a || window.open("/app/keyword/appid/" + n)
                    });
                    var c = i.find('div.row[data-modifytype="remove"] .thumbnail>img'),
                        l = "";
                    c.length > 0 ? ($.map(c, function(a) {
                            l += '<img src="' + $(a).attr("src") + '" alt="' + $(a).attr("alt") + '">'
                        }), i.find(".unsubscribe-show").removeClass("adjust")) : (l = Lang.not_subscribe_app, i.find(".unsubscribe-show").addClass("adjust")), i.parents("table").find(".subscribe-show-apps").html(l)
                } else swal({
                    title: a.msg,
                    type: "error",
                    showCancelButton: !1,
                    confirmButtonColor: "#33ba95",
                    confirmButtonText: Lang.confirm_btn,
                    cancelButtonText: Lang.cancel_btn
                })
            }
        })
    }), $(document).on("click", ".manage-content-remove .dropdown-menu a", function() {
        if (la) return !1;
        var a = $(this),
            e = a.html(),
            t = a.parents("ul.dropdown-menu"),
            n = a.parent(),
            i = t.data("paramname"),
            o = a.data("param"),
            s = {},
            r = a.parents(".subscribe-modify-apps").data("fluxurl"),
            d = (a.parents(".subscribe-modify-apps").data("type"), a.parents(".thumbnail").find(".subscribe-modify").data("appid"));
        if (s.app_id = d, s.paramName = i, s.param = o, !r || !d) return !1;
        var c = $("#checkbox-tips").length ? $("#checkbox-tips") : $('<span class="checkbox-tips" id="checkbox-tips"></span>');
        la = !0, $.ajax({
            type: "POST",
            url: r,
            data: s,
            complete: function() {
                la = !1
            },
            success: function(i) {
                1e4 == i.code ? (t.siblings("a").find(".name").html(e), n.addClass("active").siblings().removeClass("active"), c.appendTo(a.parents(".aso100-nav-select").find(".nav:last")), c.html(Lang.already_save).addClass("show")) : swal({
                        title: i.msg,
                        type: "error",
                        showCancelButton: !1,
                        confirmButtonColor: "#33ba95",
                        confirmButtonText: Lang.confirm_btn,
                        cancelButtonText: Lang.cancel_btn
                    })
            }
        })
    }), $(document).on("click", ".subscribe-keyword a", function(a) {
        if (la) return !1;
        var e = $(this),
            t = e.data("wordid"),
            n = e.parents(".subscribe-keyword"),
            i = n.data("url");
        la = !0, $.ajax({
            url: i,
            type: "POST",
            data: {
                wordid: t,
                remove: 1
            },
            success: function(a) {
                la = !1, 1e4 == a.code ? e.remove() : swal({
                        title: a.msg,
                        type: "error",
                        showCancelButton: !1,
                        confirmButtonColor: "#33ba95",
                        confirmButtonText: Lang.confirm_btn
                    })
            }
        })
    }), $(document).on("click", ".subscribe-guid .checkbox-list input", function(a) {
        var e = $(this),
            t = e.parents(".checkbox-list"),
            n = t.data("limit");
        return !e.parent().find("label").hasClass("disabled") && (e.prop("checked") ? (e.prop("checked", !0), e.parent().addClass("aso-checkbox-checked")) : (e.prop("checked", !1), e.parent().removeClass("aso-checkbox-checked")), void(t.find('input[type="checkbox"]:checked').length >= n ? t.find(".aso-checkbox:not(.aso-checkbox-checked) label").addClass("disabled") : t.find(".aso-checkbox:not(.aso-checkbox-checked) label").removeClass("disabled")))
    });
    var pa = function(a, e, t, n, i) {
        t = t || 1, a && $.ajax({
            type: "GET",
            url: a,
            data: {
                search: e,
                page: t
            },
            dataType: "JSON",
            success: function(a) {
                if (n.find(".spinner-bg").hide(), la = !1, 1e4 == a.code) {
                    var o = a.offset + 1,
                        s = "";
                    if (n.find(".search-title").html("「" + e + "」 搜索结果：").removeClass("hide"), a.max > 0) {
                        var r;
                        r = a.type && "keyword" == a.type ? '<div class="media"><div class="media-body"><h4 class="media-heading">##KEYWORD##</h4></div><div class="media-right"><button class="btn btn-default " data-wordid="##WORDID##">关注</button></div></div>' : '<div class="media"><div class="media-left media-middle"><img class="media-object" src="##ICON##"></div><div class="media-body"><h4 class="media-heading">##OFFSET##.##APPNAME##</h4><div class="media-auther">##PUBLISHER##</div><div class="media-info"><span class="media-info-category">##GENRE##</span>##IPHONE####IPAD##</div></div><div class="media-right"><button class="btn btn-default" data-appid="##APPID##">关注</button></div></div>', $.map(a.list, function(a, e) {
                            var t;
                            t = r.replace("##ICON##", a.icon).replace("##OFFSET##", o++).replace("##APPNAME##", a.app_name).replace("##PUBLISHER##", a.publisher).replace("##GENRE##", a.genre).replace("##APPID##", a.app_id), a.isphone && (t = t.replace("##IPHONE##", '<span class="media-info-phone media-info-iphone">iPhone</span>')), a.ispad && (t = t.replace("##IPAD##", '<span class="media-info-phone media-info-ipad">iPad</span>')), t = t.replace("##KEYWORD##", a[0]).replace("##WORDID##", a[3]), t = t.replace(/##\w+##/g, ""), s += t
                        }), n.find(".app-list").html(s).removeClass("hide"), "undefined" != typeof i ? (1 == i && t > 1 && n.find(".search-page").removeClass("hide").find(".prev").removeClass("hide"), 1 == i && t == a.max && n.find(".search-page").removeClass("hide").find(".next").addClass("hide"), 0 == i && 1 == t && n.find(".search-page").removeClass("hide").find(".prev").addClass("hide")) : a.max > 1 ? n.find(".search-page").data("page", t).data("search", e).removeClass("hide").find(".next").removeClass("hide").end().find(".prev").addClass("hide") : n.find(".search-page").addClass("hide").find("div").addClass("hide")
                    } else s = '<p class="text-center">' + Lang.no_data_1 + "</p>", n.find(".app-list").html(s).removeClass("hide"), n.find(".search-page").addClass("hide").find("div").addClass("hide")
                } else swal({
                    title: a.msg,
                    type: "warning",
                    confirmButtonText: Lang.confirm_btn
                })
            }
        })
    };
    $(document).on("submit", ".subscribe-guid .navbar-form", function(a) {
        if (preventDefault(a), la) return !1;
        var e = $(this),
            t = e.attr("action"),
            n = e.find("input").val(),
            i = e.parents(".subscribe-list");
        n && (la = !0, i.find(".spinner-bg").show().end().find(".spinner").show(), pa(t, n, 1, i))
    }), $(document).on("click", ".subscribe-guid .search-page .next, .subscribe-guid .search-page .prev", function(a) {
        if (preventDefault(a), la) return !1;
        var e = $(this),
            t = e.hasClass("next") ? 1 : 0,
            n = e.parents(".subscribe-list"),
            i = n.find("form.navbar-form"),
            o = e.parents(".search-page"),
            s = o.data("search"),
            r = o.data("page") || 1,
            d = i.attr("action");
        s && (la = !0, 1 == t ? r++ : (r--, r <= 0 && (r = 1)), o.data("page", r), n.find(".spinner-bg").show().end().find(".spinner").show(), pa(d, s, r, n, t))
    }), $(document).on("click", ".subscribe-guid .subscribe-list.app .app-list .btn", function(a) {
        preventDefault(a);
        var e = $(this),
            t = e.parents(".media"),
            n = e.parents(".subscribe-list");
        if (e.hasClass("disabled")) return !1;
        var i, o = t.find(".media-left img").attr("src"),
            s = t.find(".media-heading").html().replace(/^\d+\./i, ""),
            r = e.data("appid");
        $.get("/account/addMyFavorite/platform/0/appid/" + r, function(a) {
            if (1e4 == a.code) {
                i = '<div class="thumbnail"><img src="' + o + '" alt="' + s + '"><div class="caption"><p>' + s + '</p></div><div class="subscribe-modify"><span class="glyphicon-subscribe-remove"></span></div><input type="hidden" name="app" value="' + r + '"></div>';
                var t = n.find(".row");
                n.find("table").hasClass("hide") && (n.find("table").removeClass("hide"), 0 == t.find(".col-md-2").length && t.append('<div class="col-md-2">' + Lang.followed + '：</div><div class="col-md-10"></div>'));
                var d = t.find(".col-md-10");
                d.append($(i)), e.addClass("disabled").html(Lang.followed)
            } else swal({
                title: a.msg,
                type: "error",
                confirmButtonText: Lang.confirm_btn
            })
        })
    }), $(document).on("click", ".subscribe-guid .subscribe-modify", function(a) {
        var e = $(this),
            t = e.parents(".col-md-10"),
            n = e.next("input").val(),
            i = e.parents(".subscribe-list");
        i.find(".btn[data-appid=" + n + "]").removeClass("disabled").html("关注"), e.parents(".thumbnail").remove(), t.children().length <= 0 && t.parents(".table").addClass("hide")
    }), $(document).on("click", ".subscribe-guid .subscribe-list.keyword .table .btn", function(a) {
        var e = $(this),
            t = e.parents(".col-md-10"),
            n = e.find("input").val(),
            i = e.parents(".subscribe-list");
        i.find(".btn[data-wordid=" + n + "]").removeClass("disabled").html("关注"), e.remove(), t.children().length <= 0 && t.parents(".table").addClass("hide")
    }), $(document).on("click", ".subscribe-guid .subscribe-list.keyword .app-list .btn", function(a) {
        preventDefault(a);
        var e = $(this),
            t = e.parents(".media"),
            n = e.parents(".subscribe-list");
        if (e.hasClass("disabled")) return !1;
        var i, o = t.find(".media-heading").html().replace(/^\d+\./i, ""),
            s = e.data("wordid");
        i = '<a href="javascript:;" class="btn">' + o + '<span class="glyphicon-subscribe-remove-g"></span><input type="hidden" name="keyword" value="' + s + '"></a>';
        var r = n.find(".row");
        n.find("table").hasClass("hide") && (n.find("table").removeClass("hide"), 0 == r.find(".col-md-2").length && r.append('<div class="col-md-2">' + Lang.followed + '</div><div class="col-md-10"></div>'));
        var d = r.find(".col-md-10");
        d.append($(i)), e.addClass("disabled").html(Lang.followed)
    }), $(document).on("click", ".subscribe-guid > .submit", function() {
        var a = $(".subscribe-guid"),
            e = a.find("form.submit"),
            t = {};
        $.map(e, function(a, e) {
            if (a = $(a), 1 !== a.length) return !1;
            var n = ["submit", "button"],
                i = [];
            a.find("input").each(function() {
                var e = $(this),
                    o = e.attr("name"),
                    s = e.attr("type"),
                    r = this.nodeName.toLowerCase();
                if (!(n.indexOf(s) >= 0) && !(i.indexOf(o) >= 0) && o) if ("select" === r && e.prop("multiple")) i.push(o), t[o] = [], a.find('select[name="' + o + '"] option').each(function() {
                    this.selected && t[o].push(this.value)
                });
                else switch (s) {
                        case "checkbox":
                            i.push(o), t[o] = [], a.find('input[name="' + o + '"]').each(function() {
                                this.checked && t[o].push(this.value)
                            });
                            break;
                        case "radio":
                            i.push(o), a.find('input[name="' + o + '"]').each(function() {
                                this.checked && (t[o] = this.value)
                            });
                            break;
                        default:
                            t[o] || (t[o] = []), t[o].push(e.val())
                    }
            })
        }), $.ajax({
            type: "POST",
            url: "/account/guidSubmit",
            data: t,
            success: function(a) {
                1e4 == a.code && (window.location.href = "/account/setting/type/settingSubscribe")
            }
        })
    });
    var ua = $(".jumbotron.index");
    if (ua.length > 0) {
        if (window.isMobile) {
            var ha = $(window).height() - $(".footer").outerHeight() - ua.offset().top;
            ua.css({
                height: ha + "px",
                backgroundPosition: "0 0"
            }), $("#search-kw").removeClass("search-su")
        } else if ($("#search-kw").focus(), "function" == typeof CountUp) {
            var ma = {
                    useEasing: !0,
                    useGrouping: !0,
                    separator: ",",
                    decimal: ".",
                    prefix: "",
                    suffix: ""
                },
                fa = new CountUp("index_num_app", 1, 4257598, 0, 1.5, ma),
                ga = new CountUp("index_num_keyword", 1, 1054898, 0, 1.5, ma),
                va = new CountUp("index_num_rank", 1, 1046145, 0, 1.5, ma);
            fa.start(), ga.start(), va.start()
        }
        $(window).scroll(function() {
            var a = $(this).scrollTop();
            return !window.isMobile && void(a > 380 ? $(".navbar").removeClass("no-background index-nav").addClass("animation").css("top", 0) : ($(".navbar").removeClass("animation").addClass("no-background index-nav"), $(".navbar").css("top", "-" + a + "px")))
        })
    }
    $(".cascade").hover(function(a) {
        var e = $(this);
        hoverTimeout = setTimeout(function() {
            e.find(".cascade-menu").show()
        }, 200)
    }, function(a) {
        clearTimeout(hoverTimeout);
        var e = $(this);
        e.find(".cascade-menu").hide()
    }), $(document).on("tap", ".mobile-nav-search", function(a) {
        preventDefault(a);
        var e = $(".mobile-nav-search-form").addClass("active").find('form input[name="search"]');
        return e.focus().val(e.val()), !1
    }), $(document).on("tap", ".mobile-nav-search-form > .btn", function(a) {
        return preventDefault(a), $(".mobile-nav-search-form").removeClass("active").find('form input[name="search"]').blur(), !1
    }), $(document).on("focus", ".mobile-nav-search-form", function() {
        $(window).scrollTop(0), window.isWechat && window.isIOS && $(".head.navbar.fixed").addClass("fixfixed")
    }), $(document).on("blur", ".mobile-nav-search-form", function() {
        window.isWechat && window.isIOS && $(".head.navbar.fixed").removeClass("fixfixed")
    }), $(document).on("touchmove", ".with-panel-left-reveal", function(a) {}), $(document).on("touchmove", ".panel-overlay", function(a) {
        return preventDefault(a), !1
    }), $(document).on("tap", ".show-panel", function(a) {
        if ($.allowPanelOpen) {
            var e = $("body");
            return e.hasClass("with-panel-left-reveal") ? $.closePanel() : $.openPanel(), !1
        }
    }), $.allowPanelOpen = !0, $.openPanel = function(a) {
        function e() {
            i.transitionEnd(function(t) {
                t.target === i[0] ? (a.hasClass("active") ? a.trigger("opened") : a.trigger("closed"), $.allowPanelOpen = !0) : e()
            })
        }
        if (!$.allowPanelOpen) return !1;
        "left" !== a && "right" !== a || (a = ".panel-" + a), a = a ? $(a) : $(".panel").eq(0), a.height(window.innerHeight);
        var t = a.hasClass("panel-right") ? "right" : "left";
        if (0 === a.length || a.hasClass("active")) return !1;
        $.closePanel(), $.allowPanelOpen = !1;
        var n = a.hasClass("panel-reveal") ? "reveal" : "cover";
        a.css({
            display: "block"
        }).addClass("active"), a.trigger("open");
        var i = (a[0].clientLeft, $(".jumbotron"));
        e(), $(document.body).addClass("with-panel-" + t + "-" + n);
        parseInt($(".panel-reveal").css("height")), parseInt($(".navbar-wenda").css("height"));
        return !0
    }, $.closePanel = function() {
        var a = $(".panel.active");
        if (0 === a.length) return !1;
        var e = a.hasClass("panel-reveal") ? "reveal" : "cover",
            t = a.hasClass("panel-left") ? "left" : "right";
        a.removeClass("active"), a.trigger("close"), $.allowPanelOpen = !1;
        var n = $(".jumbotron");
        n.transitionEnd(function(e) {
            a.hasClass("active") || (a.css({
                display: ""
            }), a.trigger("closed"), $("body").removeClass("panel-closing"), $.allowPanelOpen = !0)
        }), $("body").addClass("panel-closing").removeClass("with-panel-" + t + "-" + e)
    }, $.fn.transitionEnd = function(a) {
        return __dealCssEvent.call(this, ["webkitTransitionEnd", "transitionend"], a), this
    }, $(document).on("tap", ".close-panel, .panel-overlay", function(a) {
        $.closePanel()
    }), $(document).on("click", ".review-icon", function(a) {
        var e = $(this),
            t = $(".reviews-items .reviews-item"),
            n = $(".reviews-items .reviews-item.active").index();
        e.hasClass("prev-review") ? (n <= 0 && (n = t.length), n -= 1) : n >= t.length - 1 ? n = 0 : n += 1, $(".reviews-items .reviews-item:eq(" + n + ")").addClass("active").siblings().removeClass("active")
    }), $(".hot-search .navbar-form").on("submit", function(a) {
        preventDefault(a);
        var e = $(this),
            t = e.attr("action"),
            n = e.find("input");
        $.each(n, function(a, e) {
            var n = $(this).attr("name"),
                i = $(this).val();
            t += "/" + n + "/" + i
        }), window.location.href = t
    });
    var ba = null,
        wa = null;
    $(".hot-search-list td.text-left > div").hover(function() {
        var a, e = $(this),
            t = e.find(".appname").text(),
            n = e.parents("table").data("url"),
            i = e.parents("tr").data("time"),
            o = "",
            s = "",
            r = "",
            d = 1,
            c = e.find(".hotsearch-word-apps");
        clearTimeout(wa), $(".hotsearch-word-apps").hide(), ba = setTimeout(function() {
            0 == c.html() ? $.ajax({
                    type: "get",
                    url: n + "/word/" + t + "/time/" + i,
                    success: function(t) {
                        o = '<h4 class="title-second"><span></span>' + Lang.hotsearch_word_apps + '<div class="timestr"> (' + i + ") </div></h4>", t && 1e4 == t.code && (t.data ? (o += "<ul>", $.each(t.data, function(a, e) {
                                s = e.app_name, r = e.icon || e.artwork_s, o += '<li><a href="/app/rank/appid/' + e.app_id + '" target="_blank"><div class="img"><img src="' + r + '" /><div class="triangle-tr-box"><div class="triangle-tr"></div></div><span class="num">' + d + "</span></div><p>" + s + "</p></a></li>", d++
                            }), o += "</ul>") : o += '<p class="no-result">' + Lang.hotsearch_word_apps_no_result + "</p>", o += '<div class="triangle-bak"><div class="triangle-b"></div></div>', c.html(o), a = parseInt(c.css("left")) + (e.width() - 6) / 2, c.css("left", a + "px"), $(".hotsearch-word-apps").hide(), c.show())
                    }
                }) : c.show()
        }, 300)
    }, function() {
        clearTimeout(ba);
        var a = $(this);
        wa = setTimeout(function() {
            a.find(".hotsearch-word-apps").hide()
        }, 300)
    }), footerFixed(), isMobile && mobileGotop(), $('[data-toggle="tooltip"]').tooltip({
        delay: {
            show: 50,
            hide: 100
        }
    }), $(".tip-area").click(function() {
        $('[data-toggle="tooltip"]').tooltip("toggle")
    }), window.chartData = {}, window.hasDataIdStr = "", window.currentKeywordid = [], window.isKeywordShowHour = 0, window.keywordShowHourTab = {}, $("img.lazy").lazyload();
    var $a = $(".activity-beta-box");
    if ($a.length) {
        var ya = +new Date,
            ka = 0,
            xa = !0,
            Ca = $a.data("name") || "";
        index = $a.data("index") || 0, Ca && (ka = parseInt($.cookie(Ca) || 0), xa = ka < ya + 1314e6 && ka < ya);
        var _a = function() {
            var a = function() {
                    var a = $a.data("edate");
                    if (a) a = new Date(a);
                    else {
                        var a = new Date;
                        a.setTime(a.getTime() + 2592e6)
                    }
                    $.cookie(Ca, +a, {
                        path: "/",
                        expires: a
                    })
                },
                e = function(a) {
                    return a < 10 ? "0" + a : a
                };
            setTimeout(function() {
                $a.removeClass("hide").show().addClass("show")
            }, 0), $a.on("click", ".activity-beta-nonotice, .activity-beta-button, .activity-beta-button-circle", function() {
                var e = $(this);
                e.hasClass("no-close") || $("body,html").animate({
                    scrollTop: 0
                }, 300, function() {
                    return 0 === parseInt($a.find(".activity-beta-content").css("top")) && ($a.css({
                            opacity: 1
                        }).addClass("activity-hide activity-hide-" + index), $(".activity-beta-open").show().addClass("activity-show"), a(), void setTimeout(function() {
                            $a.hide().removeClass("show")
                        }, 700))
                })
            });
            var t, n = new Date;
            t = n.getFullYear() + "-" + e(n.getMonth() + 1) + "-" + e(n.getDate()) + " 23:59:59", t = moment(t).valueOf(), n.setTime(n.getTime() + 864e5), $.cookie(Ca, t, {
                path: "/",
                expires: n
            })
        };
        if (xa) {
            var La = $(".activity-beta-content > img");
            La.length ? (La = La[0], La.complete || La.width ? _a() : La.onload = function() {
                        _a()
                    }) : _a()
        }
    }
    var Ta = $(".date-range-picker");
    Ta.length > 0 && Ta.map(function(a, e) {
        datePicker($(e))
    });
    var Da = $("#rank-list-more");
    if (Da.length > 0) {
        var Sa = !1;
        Da.find(".btn-default").on("click", function() {
            if (Sa) return !1;
            var a, e, t, n, i, o, s = Da,
                r = $(this),
                d = r.data("nomodifyhtml") || 0;
            return i = s.find(".spinner"),
                o = s.find(".btn-default"),
                n = s.data("url"),
                a = s.data("page"),
                t = s.data("size"),
                e = s.data("maxpage"),
            !(a > e) && (
                o.hide(),
                i.show(),
                    Sa = !0,
                void $.ajax({
                type: "get",
                url: n + (n.indexOf("?") == -1 ? "?" : "&") + "page=" + a,
                dataType: "html",
                success: function(n) {
                    return a++,
                        s.data("page", a),
                        Sa = !1, $(".rank-list").append(n),
                        $("img.lazy").lazyload(),
                        a > e ? (s.remove(), !1) :
                            (!d && s.find(".btn-default > span:eq(0)").html(Lang.show + ((a - 1) * t + 1) + " - " + a * t + Lang.staff), o.show(), void i.hide())
                }
            }))
        })
    }
    $(document).on("click", ".dropdown-menu.open a", function(a) {
        var e, t, n, i = $(this),
            o = i.parents("ul.dropdown-menu"),
            s = o.data("refresh") || 0,
            r = o.data("paramname"),
            d = o.data("cparam"),
            c = i.data("param"),
            l = new RegExp(r + "/" + d, "i");
        e = document.location.pathname, e.split("/").length < 3 && (e += "/index"), t = e.match(l), t ? e = e.replace(t, r + "/" + c) : e += "/" + r + "/" + c, n = window.location.protocol + "//" + window.location.hostname + e, s ? pjaxLoad(n) : window.location.href = n
    }), $(document).on("click", "#charts-ajax-data .dropdown-menu a,.charts-ajax-data .dropdown-menu a,#competi-search .dropdown-menu a", function() {
        var a = $(this),
            e = a.html(),
            t = a.parents("ul.dropdown-menu"),
            n = t.data("open") || 0,
            i = t.data("refresh") || 0,
            o = t.data("usually") || 0,
            s = a.parent(),
            r = t.data("paramname"),
            d = a.data("param"),
            c = a.parents(".charts-ajax-data").length ? a.parents(".charts-ajax-data") : a.parents("#charts-ajax-data"),
            l = c.data("ajaxurl"),
            p = c.data("thisurl"),
            u = c.data("querydata") || {};
        c.data("run");
        if (window.searchType = console.log(a.parents("ul").data("paramname")), window.chartData.title = c.data("title"), "string" == typeof u && (u = JSON.parse(u)), u[r] = d, c.data("querydata", JSON.stringify(u)), n) {
            if (!p) return !1;
            var h = "/";
            for (var m in u) h += m + "/" + u[m] + "/";
            if (h = h.slice(0, -1), i) {
                var f = p + h;
                return pjaxLoad(f), !1
            }
            location.href = p + h
        } else if (o) t.siblings("a").find(".name").html(e), s.addClass("active").siblings().removeClass("active"), $("#competi-search").submit();
        else {
            if (!l) return !1;
            t.siblings("a").find(".name").html(e), s.addClass("active").siblings().removeClass("active");
            var g = $("#searchHintsUrl");
            if (g.length > 0) {
                var f = g.attr("href");
                $.map(u, function(a, e) {
                    var t = new RegExp(e + "\\/\\w+", "i");
                    t = f.match(t), t && (f = f.replace(t, e + "/" + a))
                }), g.attr("href", f)
            }
            $("#hotDraw").length ? hotSearchDrawAction(l, u) : $(".invest-data-center").length ? ajaxRequestAction(a, y, u, l) : getChartsData(l, u)
        }
    });
    var ja = $("#charts-ajax-data");
    if (ja.length) {
        var Ba = ja.data("ajaxurl"),
            Ia = (ja.data("thisurl"), ja.data("querydata") || {}),
            Oa = parseInt(ja.data("run"));
        window.chartData.title = ja.data("title"), Ba && 0 !== Oa && ($("#hotDraw").length > 0 ? hotSearchDrawAction(Ba, Ia) : getChartsData(Ba, Ia))
    }
    var Ma = $("#charts2-ajax-data");
    if (Ma.length) {
        var Ba = Ma.data("ajaxurl"),
            Ia = (Ma.data("thisurl"), Ma.data("querydata") || {}),
            Oa = parseInt(Ma.data("run"));
        window.chartData.title = Ma.data("title"), Ba && 0 !== Oa && ($("#hotDraw").length > 0 ? hotSearchDrawAction(Ba, Ia) : getChartsData(Ba, Ia, $("#charts2")))
    }
    $(document).on("loadData", "#global-maps-charts-nav", function() {
        var a = $("#global-maps-charts"),
            e = $("#global-maps-charts-nav");
        $.ajax({
            type: "get",
            url: e.data("ajaxurl"),
            data: {
                device: e.find(".active").data("device")
            },
            dataType: "json",
            success: function(t) {
                $("#container").find(".spinner-bg").hide(), e.find(".active").data("data", JSON.stringify(t)), Pa(a, t), Fa($("#app-global-rank-list").find(".table"), t)
            }
        })
    }), $("#global-maps-charts-nav").trigger("loadData"), $(document).on("click", "#global-maps-charts-nav .device .tab", function() {
        var a = $(this),
            e = a.data("data") || "",
            t = $("#global-maps-charts"),
            n = $("#global-maps-charts-nav");
        $("#app-global-rank-list");
        a.siblings(".tab").removeClass("active"), a.addClass("active"), $("#global-maps-charts-switch").remove(), e ? (e = JSON.parse(e), Pa(t, e)) : ($("#container .global-maps-charts-box").find(".spinner-bg").show(), $.ajax({
                type: "get",
                url: n.data("ajaxurl"),
                data: {
                    device: a.data("device")
                },
                dataType: "json",
                success: function(e) {
                    $("#container .global-maps-charts-box").find(".spinner-bg").hide(), a.data("data", JSON.stringify(e)), Pa(t, e)
                }
            }))
    }), $(document).on("click", "#global-maps-charts-switch a", function() {
        var a = $(this);
        a.siblings(".tab").removeClass("active"), a.addClass("active");
        var e = $("#global-maps-charts"),
            t = $("#global-maps-charts-nav .device"),
            n = a.data("genreid"),
            i = t.find(".active").data("data");
        return i = JSON.parse(i), Pa(e, i, n), !1
    }), $(document).on("click", "#global-maps-table-nav .device .tab", function() {
        var a = $(this),
            e = a.data("device"),
            t = ($("#global-maps-charts"), $("#global-maps-charts-nav")),
            n = t.find('.device .tab[data-device="' + e + '"]').data("data") || "",
            i = $("#app-global-rank-list");
        a.siblings(".tab").removeClass("active"), a.addClass("active"), n.length ? (n = JSON.parse(n), Fa(i.find(".table"), n)) : ($("#container .global-maps-table-box").find(".spinner-bg").show(), $.ajax({
                type: "get",
                url: t.data("ajaxurl"),
                data: {
                    device: e
                },
                dataType: "json",
                success: function(a) {
                    $("#container .global-maps-table-box").find(".spinner-bg").hide(), t.find('.device .tab[data-device="' + e + '"]').data("data", JSON.stringify(a)), Fa($("#app-global-rank-list").find(".table"), a)
                }
            }))
    });
    var Pa = function(a, e, t) {
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
            t = t ? t : e.genreid;
            var o = "";
            $.each(e.list, function() {
                var a = this.list[t] ? this.list[t] : {};
                o || (o = a.genre), this.code = this.code.replace("VI", "VG"), n.push({
                    code: this.code,
                    sname: this.name,
                    flag: this.code.toLowerCase(),
                    value: a.ranking ? a.ranking : null
                })
            }), $.each(n, function() {
                this.genre = o;
                var a = this.value,
                    e = this.code,
                    t = this.sname;
                $.each(i, function() {
                    if (a >= this.min && a <= this.max) return this.country || (this.country = []), void this.country.push({
                        code: e,
                        name: t
                    })
                })
            }), Ra($("#app-global-rank-overview-list").find("table"), i);
            var s = $("#charts-appname").val() || "";
            s += " " + Lang.app_rankinfo_globalRank_title;
            var r = _exportingConfig(s);
            a.highcharts("Map", {
                chart: {
                    marginRight: 1,
                    backgroundColor: "",
                    events: {
                        load: function() {
                            if (a.append('<div class="float-logo"></div>'), !$("#global-maps-charts-nav .genre").length) {
                                var n = "",
                                    i = "";
                                n += '<div class="label-group genre" id="global-maps-charts-switch">', n += "<span>" + Lang.globalRank_nav_genre + ":</span>";
                                for (var o in e.genrelist) i = o == t ? "active" : "", n += '<a href="javascript:void(0);" class="tab ' + i + '" data-genreid="' + o + '">' + e.genrelist[o] + "</a>";
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
                        var a = "";
                        return a += "<table><tr>",
                            a += '<td style="padding: 0 2px;"><span style="top: 2px;" class="icon-flag icon-flag-' + this.point.flag + '"></span></td>',
                            a += '<td style="padding-right: 10px;"><span>' + this.point.sname + "</span></td>",
                            a += "<td>" + this.point.genre + "-" + this.point.value + "</td>",
                            a += "</tr></table>"
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
        Ra = function(a, e) {
            var t = a,
                n = [];
            if (!t) return !1;
            $.each(e, function() {
                var a = [];
                a.push('<span class="show-color" style="background-color: ' + this.color + ';"></span>' + (this.min == this.max ? this.min : this.min + " - " + this.max));
                var e = "";
                this.country && this.country.length && $.each(this.country, function() {
                    e += '<span class="icon-flag icon-flag-' + this.code.toLowerCase() + '" data-toggle="tooltip" title="' + this.name + '"></span>'
                }), a.push(e);
                var t = 0;
                this.country && this.country.length && (t = this.country.length), a.push(t), a.push(this.index), n.push(a)
            });
            var i = [];
            i.push({
                orderable: !1,
                data: function(a, e, t, n) {
                    return "sort" == e ? a[3] : a[0]
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
        Fa = function(a, e) {
            var t = a,
                n = [];
            if (!t) return !1;
            var i = {},
                o = "";
            $.each(e.list, function(a) {
                var t = [];
                t.push(this.name + "--" + this.code.toLowerCase() + "--" + a);
                for (var o in e.genrelist) {
                    var s = this.list[o] ? this.list[o] : {};
                    s.genre && (i[o] = s.genre + "(" + s.brand + ")");
                    var r = s.ranking ? s.ranking : "0";
                    t.push(r)
                }
                n.push(t)
            }), i[36] || (i[36] = e.genrelist[36]), o += '<th class="col-md-' + (window.isMobile ? 2 : 4) + '">' + Lang.globalRank_overview_table_th1 + "</th>";
            for (var s in e.genrelist) o += "<th>" + i[s] + "</th>";
            t.find("thead .large").html(o), t.hasClass("dataTable") && t.DataTable().clear();
            var r = [];
            $.each(n[0], function(a) {
                r.push({
                    orderable: !1,
                    data: function(e, t, n, i) {
                        var o = e[a];
                        return 0 == a ? (o = o.split("--"), "sort" == t ? o[2] : '<span class="icon-flag icon-flag-' + o[1] + '"></span>' + o[0]) : "sort" == t ? 0 == e[a] ? 9999 : e[a] : 0 == e[a] ? "-" : e[a]
                    },
                    targets: a
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
        var Ea = $(".charts-ul").data("titledate");
        window.chartData.titleDate = Ea ? Ea : Lang.date_range_1, window.chartData.isReport = 1, $(".charts-ul li").each(function(a, e) {
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
            var a = $(this),
                e = a.data("url"),
                t = $("#daily-cover-box"),
                n = t.find(".charts-select a.active").data("type") || 1;
            t.find(".spinner-bg").addClass("show").end().removeClass("hide").addClass("show show-animation"), $("#vip-b").show(), $.ajax({
                type: "get",
                url: e + "/type/" + n,
                success: function(a) {
                    t.find(".spinner-bg").removeClass("show");
                    var e = a.data || {};
                    drawCharts(e, t.find(".charts"))
                }
            })
        }), $(document).on("click", "#daily-cover-box .charts-select a", function() {
            var a = $(this),
                e = $("#show-daily-cover").data("url"),
                t = a.data("type"),
                n = $("#daily-cover-box");
            n.find(".spinner-bg").addClass("show"), a.addClass("active").siblings().removeClass("active"), $.ajax({
                type: "get",
                url: e + "/type/" + t,
                success: function(a) {
                    n.find(".spinner-bg").removeClass("show");
                    var e = a.data || {};
                    drawCharts(e, n.find(".charts"))
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
    $(document).on("click", ".nav-date-bar-action .nav-item", function(a) {
        a.preventDefault(), console.log($(this));
        var e = $(this),
            t = $("#charts-ajax-data"),
            n = $(".keyword-histroy.chart-tr"),
            i = (n.find(".histroy"), e.data("ajaxurl")),
            o = e.data("querydata") || {},
            s = e.data("type"),
            r = t.data("showhour"),
            d = n.data("wordid");
        if (!d) return !1;
        if (!r) return !1;
        "string" == typeof o && (o = JSON.parse(o)), o.word_id = d, e.addClass("active").siblings().removeClass("active"), t.data("ajaxurl", i);
        var c = ".date-position." + s;
        $(c).removeClass("hidden").siblings().addClass("hidden"), window.chartData.titleDate = e.data("showdate"), getChartsKeywordDataHour(i, o), window.keywordShowHourTab.type = s
    });
    var Aa;
    $(document).on("click", ".histroy", function(a) {
        var e = $(this),
            t = e.data("id"),
            n = e.parents("table"),
            i = n.data("type") || "keyword",
            o = "ajaxurl",
            s = "querydata",
            r = e.parents(".keyword-histroy") || e.parents("tr"),
            r = r.length > 0 ? r : e.parents("tr"),
            d = r.find(".sort-word a").html();
        "keyword" == i && (p(t, d), o = window.keywordShowHourTab.isDefault + window.keywordShowHourTab.type + "ajaxurl", s = window.keywordShowHourTab.isDefault + "querydata");
        var c = $("#charts-ajax-data"),
            l = (c.data("thisurl"), c.data(o)),
            u = c.data(s) || {};
        if ("string" == typeof u && (u = JSON.parse(u)), "undefined" == typeof window.chartData.list && (window.chartData.list = []), r.hasClass("chart-tr")) return $chartsTrBox.hide(), r.removeClass("chart-tr"), !1;
        if (!Aa) {
            var h = "report" == i ? 7 : 6;
            $chartsTrBox = $('<tr id="charts-tr" class="chart-tr"><td colspan="' + h + '"></td></tr>'), Aa = $("#charts-box"), $chartsTrBox.find("td").html(Aa)
        }
        "keyword" == i && (Aa.find(".date-range-picker").map(function() {
            datePicker($(this))
        }), Aa.find("." + window.keywordShowHourTab.type).removeClass("hidden").siblings().addClass("hidden")), $chartsTrBox.show(), Aa.show(), r.siblings().removeClass("chart-tr"), r.addClass("chart-tr").data("wordid", t), r.after($chartsTrBox), $chartsTrBox.addClass("show-animation");
        var m = isMobile ? r.offset().top - 49 + "rem" : r.offset().top - 57 + "px";
        if (setTimeout(function() {
                $("body").animate({
                    scrollTop: m
                }, 380)
            }, 260), "keyword" == i) $("#charts-appname").val(d), u.word_id = t, window.chartData.titleDate = window.keywordShowHourTab.defaultLang, getChartsKeywordDataHour(l, u);
        else if ("report" == i) u.fast_id = t, window.chartData.titleDate = window.keywordShowHourTab.defaultLang, getChartsData(l, u);
        else {
            u.sdate = e.data("sdate"), u.edate = e.data("edate");
            var f = Aa.find(".date-range-picker"),
                g = moment(u.sdate),
                v = moment(u.edate);
            f.data("date", u.sdate), f.data("edate", u.edate), f.find("span:eq(0)").html(g.format(Lang.format_time) + "~" + v.format(Lang.format_time)), datePicker(Aa.find(".date-range-picker")), window.chartData.titleDate = g.format(Lang.format_time) + Lang.to + v.format(Lang.format_time), getChartsData(l, u)
        }
    }), $("#sort").length && dataTables($("#sort"), 0), $("#sort_android").length && dataTables_android($("#sort_android"), 0), $(document).on("order.dt", "#sort_android", function() {
        if (!window.tableSort || !window.tableSort.order()[0]) return !1;
        var a, e, t, n = $(this),
            i = window.tableSort.order()[0][1];
        a = n.find("th.sort-handle"), e = a.find(".icon-up"), t = a.find(".icon-down"), "asc" == i ? e.addClass("active") && t.removeClass("active") : e.removeClass("active") && t.addClass("active")
    }), $(document).on("order.dt", "#sort", function() {
        if (!window.tableSort || !window.tableSort.order()[0]) return !1;
        var a, e, t, n = $(this),
            i = window.tableSort.order(),
            o = i[0][0],
            s = i[0][1];
        a = n.find("th:eq(" + o + ")"), e = a.find(".icon-up"), t = a.find(".icon-down"), $("#charts-tr").remove(), $(".chart-tr").removeClass("chart-tr"), a.siblings().find(".icon").removeClass("active"), "asc" == s ? (e.addClass("active"), t.removeClass("active")) : (e.removeClass("active"), t.addClass("active"))
    }), $(document).on("click", '.add-custom-keyword .btn[type="manage"]', function(a) {
        var e = $(this),
            t = e.data("url");
        return $addCompetiBg = $(".add-competi-bg"), $addCompetiSpinner = $addCompetiBg.find(".spinner-bg"), accountLimit = parseInt($addCompetiBg.find("#account-limit").html()), delUrl = $addCompetiBg.find("#custom-list").data("delurl"), $("html, body").animate({
            scrollTop: e.offset().top - 30 + "px"
        }, 100), $addCompetiBg.find(".add-competi").css({
            top: e.offset().top - $("#container").offset().top + e.height() + 30 + "px"
        }), $addCompetiBg.show(), $addCompetiSpinner.show(), $.ajax({
            type: "get",
            url: t,
            success: function(a) {
                if (a && 1e4 == a.code) {
                    $addCompetiSpinner.hide(), $addCompetiBg.find(".progress-bar").css("width", a.total_f + "%"), $addCompetiBg.find("#account-limit-current").html(a.total);
                    var e = "";
                    e += '<tr><th class="col-md-3">app</th><th class="col-md-1">' + Lang.usage_amout + '</th><th class="col-md-6">' + Lang.focus_words + '</th><th class="col-md-2">' + Lang.operation + "</th></tr>", $.map(a.list, function(t, n) {
                        e += '<tr data-id="' + n + '" class="custom-keyword-item">', e += '<td class="col-md-3"><div class="appinfo"><img src="' + t.appinfo.artwork_s + '" alt="' + t.appinfo.app_name + '"><div class="caption"><p><a target="_blank" href="' + t.appinfo.url + '">' + t.appinfo.app_name + '</a></p></div></div></td><td class="col-md-1"><span class="limit-num">' + t.num + "</span>/" + a.appLimit + "</td>", e += '<td class="col-md-7 text-left">', $.map(t.countrys, function(a, t) {
                            e += "<p><span>" + a.name + "</span>", $.map(a.items, function(a) {
                                e += '<a class="btn btn-default custom-remove" href="javascript:void(0);" data-type="wordid" data-id="' + a.word_id + '" data-country="' + t + '" role="button">' + a.word + '&nbsp;<span class="glyphicon remove-icon-white" aria-hidden="true"></span></a>'
                            }), e += "</p>"
                        }), e += "</td>", e += '<td class="col-md-1"><span class="glyphicon remove-icon custom-remove" aria-hidden="true" data-type="deleteall"></span></td>'
                    }), $addCompetiBg.find("#custom-list").html(e)
                } else $addCompetiBg.hide(), swal(a.msg)
            }
        }), !1
    }), $(document).on("click", ".competi-close", function() {
        var a = $(this).data("refresh");
        a && (Aa = void 0, "2" == a ? u() : refreshPage()), $addCompetiBg.hide()
    }), $(document).on("tap click", "#keyword-list .custom-remove, #custom-list .custom-remove, #keyword-change .custom-remove", function(a) {
        $addCompetiBg = $(".add-competi-bg"), $addCompetiSpinner = $addCompetiBg.find(".spinner-bg"), accountLimit = parseInt($addCompetiBg.find("#account-limit").html()), delUrl = $addCompetiBg.find("#custom-list").data("delurl"), country = $addCompetiBg.find("#custom-list").data("country") || "cn";
        var e = $(this),
            t = e.data("type"),
            n = e.parents(".custom-keyword-item"),
            i = n.find(".limit-num");
        appLimit = $addCompetiBg.find("#account-limit-current"), delappid = 0, thisappid = $("#appinfo-id").val(), word_id = e.data("id") || 0, country = e.data("country") || country, decNum = 1, appLimitCurrent = 0, "cancel" == t || "change" == t ? delappid = thisappid : (delappid = n.data("id"), "deleteall" == t && (country = !1)), country && (delUrl = delUrl + "/country/" + country), "cancel" == t && e.addClass("animation"), $.ajax({
            type: "get",
            url: delUrl,
            data: {
                appid: delappid,
                word_id: word_id
            },
            success: function(a) {
                a && 1e4 == a.code ? ($(".add-custom-keywords-tips-num").text(a.limit), "change" == t ? e.parents(".charts-box").remove() : "cancel" == t ? (e.removeClass("animation"), Aa = void 0, $("#charts-box").insertAfter(".aso100-nav-select.keyword:last").hide(), $.map(window.tableData, function(a, e) {
                                a[6] == word_id && (window.tableData[e][4] = 0)
                            }), e.addClass("add-custom-keyword-btn icon-top").removeClass("custom-remove icon-cancel").attr("data-original-title", "添加关注").html("置顶").parents("tr").removeClass("bg")) : ("wordid" == t ? (i.html(parseInt(i.html()) - decNum), e.remove(), 0 === parseInt(i.html()) && n.remove()) : (decNum = parseInt(i.html()), n.remove()), appLimitCurrent = parseInt(appLimit.html()) - decNum, $addCompetiBg.find(".progress-bar").css("width", +Math.round(100 * appLimitCurrent / accountLimit, 2) + "%"), appLimit.html(appLimitCurrent), thisappid == delappid && $(".competi-close").data("refresh", 1))) : swal(a.msg)
            }
        })
    }), $(document).on("submit", ".keyword-change form", function() {
        return !1
    }), $(document).on("input propertychange", ".add-custom-keywords-area textarea", function(a) {
        var e, t, n, i = $(this);
        e = i.val(), t = e.split(/\n+/), n = $(".add-custom-keywords-tips-num.hidden").text(), t.length > n ? i.val(e.substr(0, e.length - 1)) : "" == t[t.length - 1] ? $(".add-custom-keywords-tips-num.shown").text(n - t.length + 1) : $(".add-custom-keywords-tips-num.shown").text(n - t.length)
    }), $(document).on("tap click", ".add-custom-keywords .icon-guanbi", function(a) {
        return $(".add-custom-keywords").hide(), $(".add-custom-keywords").find('textarea[name="keywords"]').val(""), !1
    }), $(document).on("tap click", ".add-custom-keywords-btn", function(a) {
        var e, t, n, i, o = $(this);
        e = o.parents("form").find(".add-custom-keywords-area textarea"), t = e.val(), n = t.split(/\n+/), i = $(".add-custom-keywords-tips-num.hidden").text(), n.length > i ? e.val(t.substr(0, t.length - 1)) : "" == n[n.length - 1] ? $(".add-custom-keywords-tips-num.shown").text(i - n.length + 1) : $(".add-custom-keywords-tips-num.shown").text(i - n.length), o.parents("form").find(".add-custom-keywords").show()
    }), $(document).on("submit", ".add-custom-keyword form", function() {
        return $(".add-custom-keyword-btn").trigger("click"), !1
    }), $(document).on("tap click", ".add-custom-keyword-btn, .add-custom-keywords-sub", function(a) {
        var e = $(".add-custom-keyword"),
            t = e.find("form"),
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
        return "add" == l ? (s = c.data("keyword"), o = 1, u = c.data("id"), $.map(window.tableData, function(a, e) {
                a[6] == u && (u = a, u[4] = 1, h = e)
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
                success: function(a) {
                    isSubmiting = !1, c.removeClass("animation"), a && 1e4 == a.code ? "keywordchange" == p ? refreshPage() : (Aa = void 0, $("#charts-box").insertAfter(".aso100-nav-select.keyword:last").hide(), o ? c.addClass("custom-remove icon-cancel").removeClass("add-custom-keyword-btn icon-top").attr("data-original-title", "取消关注").html("取消").parents("tr").addClass("bg") : ($.each(a.data, function(a, e) {
                                    u = [e.word, e.rank, e.hints, e.search_no, 1, e.py, e.id, e.yrank - e.rank], $.each(window.tableData, function(a, t) {
                                        if (t[6] == e.id) return window.tableData.splice(a, 1), !1
                                    }), window.tableData.unshift(u)
                                }), window.tableSort.clear().rows.add(window.tableData).order([
                                    [5, "asc"],
                                    [1, "asc"]
                                ]).draw()), $(".add-custom-keywords-tips-num").text(a.limit)) : showOpenVipSwal(a.msg)
                }
            }), !1) : (isSubmiting = !1, !1)
    }), $(document).on("tap click", ".add-custom-keyword-btn-android", function(a) {
        if (isSubmiting) return !1;
        isSubmiting = !0;
        var e, t, n = $(this),
            i = n.attr("type"),
            o = n.data("pagename") || "keyword",
            s = {},
            r = "undefined",
            d = $("#android_addCustomUrl").val(),
            c = "GET";
        return "add" == i ? (e = n.data("keyword"), exist = 1, s = n.data("id"), $.map(window.tableData, function(a, e) {
                a[10] == s && (s = a, s[10] = 1, r = e)
            }), yesterday = $(".aso100-nav-select .navbar-nav[data-querydata]").data("querydata"), yesterday && ("string" == typeof yesterday && (yesterday = JSON.parse(yesterday)), yesterday = yesterday.ydate)) : "add-keyword" == n.data("type") ? e = n.parents("form").find('input[name="keyword"]').val() : (t = n.parents("form").find('textarea[name="keywords"]').val(), $(this).parents(".add-custom-keywords").hide(), n.parents("form").find('textarea[name="keywords"]').val("")), e || t ? (exist && n.addClass("animation"), $.ajax({
                type: c,
                url: d,
                data: {
                    keyword: e,
                    keywords: t,
                    appid: appid,
                    ydate: yesterday,
                    exist: exist
                },
                success: function(a) {
                    isSubmiting = !1, n.removeClass("animation"), a && 1e4 == a.code ? "keywordchange" == o ? refreshPage() : (Aa = void 0, $("#charts-box").insertAfter(".aso100-nav-select.keyword:last").hide(), n.addClass("custom-remove-android icon-cancel").removeClass("add-custom-keyword-btn-android icon-top").attr("data-original-title", "取消关注").html("取消").parents("tr").addClass("bg"), $(".add-custom-keywords-tips-num").text(a.limit)) : showOpenVipSwal(a.msg)
                }
            }), !1) : (isSubmiting = !1, !1)
    }), $(document).on("tap click", "#keyword-list .custom-remove-android", function(a) {
        $addCompetiBg = $(".add-competi-bg"), $addCompetiSpinner = $addCompetiBg.find(".spinner-bg"), accountLimit = parseInt($addCompetiBg.find("#account-limit").html()), delUrl = $("#android_delCustomUrl").val(), country = $addCompetiBg.find("#custom-list").data("country") || "cn";
        var e = $(this),
            t = e.data("type"),
            n = e.parents(".custom-keyword-item");
        n.find(".limit-num");
        appLimit = $addCompetiBg.find("#account-limit-current"), delappid = 0, thisappid = $("#appinfo-id").val(), word_id = e.data("id") || 0, country = e.data("country") || country, decNum = 1, appLimitCurrent = 0, "cancel" == t || "change" == t ? delappid = thisappid : (delappid = n.data("id"), "deleteall" == t && (country = !1)), country && (delUrl = delUrl + "/country/" + country), "cancel" == t && e.addClass("animation"), $.ajax({
            type: "get",
            url: delUrl,
            data: {
                appid: delappid,
                word_id: word_id
            },
            success: function(a) {
                a && 1e4 == a.code ? ($(".add-custom-keywords-tips-num").text(a.limit), "change" == t ? e.parents(".charts-box").remove() : "cancel" == t && (e.removeClass("animation"), Aa = void 0, $("#charts-box").insertAfter(".aso100-nav-select.keyword:last").hide(), e.addClass("add-custom-keyword-btn-android icon-top").removeClass("custom-remove-android icon-cancel").attr("data-original-title", "添加关注").html("置顶").parents("tr").removeClass("bg"))) : swal(a.msg)
            }
        })
    });
    var Na = $("#keyword-rank-more");
    Na.length && Na.find(".btn-custom").on("click", function() {
        var a = Na.data("ajaxurl"),
            e = Na.data("querydata"),
            t = Na.data("maxpage"),
            n = Na.data("page"),
            i = Na.find(".spinner"),
            o = Na.find(".btn-custom"),
            s = Na.data("vipurl");
        return !(n > t) && (o.hide(), i.show(), void $.ajax({
                type: "get",
                url: a + (a.indexOf("?") == -1 ? "?" : "&") + "page=" + n,
                data: e,
                dataType: "json",
                success: function(a) {
                    return n++, Na.data("page", n), $(".keyword-list .table").append(a.html), console.log(a.maxPage), 1 == a.maxPage ? o.hide() : o.show(), n > t && t < 100 ? (Na.append("<span>" + Lang.open_vip_tip[LangObj.openVipType] + '</span><a href="' + s + '" class="btn btn-custom">' + Lang.open_btn[LangObj.openVipType] + "</a>"), o.hide(), i.hide(), !1) : void i.hide()
                }
            }))
    });
    var qa = $(".keyword-rank .aso100-nav-select input");
    if (qa.length) {
        var Ha;
        qa.bind("input porpertychange", function() {
            clearTimeout(Ha), Ha = setTimeout(function() {
                var a = $("#keyword-rank-more"),
                    e = a.data("querydata");
                $(".keyword-list .table tbody").html(""), e.minHints = $("#minHints").val(), e.maxHints = $("#maxHints").val(), e.minResult = $("#minResult").val(), e.maxResult = $("#maxResult").val(), a.data("page", 1).data("querydata", e).find(".btn-custom").click()
            }, 2e3)
        })
    }
    var Wa = $(".load-more.load");
    Wa.length && Wa.find(".btn-more").on("click", function() {
        var a = Wa.data("ajaxurl"),
            e = Wa.data("querydata"),
            t = Wa.data("maxpage"),
            n = Wa.data("page"),
            i = Wa.find(".spinner");
        return button = Wa.find(".btn-more"), !(n > t) && (button.hide(), i.show(), void $.ajax({
            type: "get",
            url: a + (a.indexOf("?") == -1 ? "?" : "&") + "page=" + n,
            data: e,
            dataType: "html",
            success: function(a) {
                return n++, Wa.data("page", n), $(".load-more-warp").append(a), n > t ? (Wa.hide(), !1) : (button.show(), i.hide(), void s())
            }
        }))
    }), $searchListMore = $("#search-list-more"), $searchListMore.length && $searchListMore.find(".btn-default").on("click", function() {
        var a = $searchListMore.data("ajaxurl"),
            e = $searchListMore.data("querydata"),
            t = $searchListMore.data("maxpage"),
            n = $searchListMore.data("page"),
            i = $searchListMore.find(".spinner");
        return button = $searchListMore.find(".btn-default"), !(n > t) && (button.hide(), i.show(), void $.ajax({
            type: "get",
            url: a + (a.indexOf("?") == -1 ? "?" : "&") + "page=" + n,
            data: e,
            dataType: "html",
            success: function(a) {
                return n++, $searchListMore.data("page", n), $("#app-list").append(a), n > t ? ($searchListMore.hide(), !1) : (button.show(), i.hide(), void s())
            }
        }))
    });
    var Ua = $(".app-optimization textarea");
    if (Ua.length) {
        Ua.each(function() {
            $(this).css("height", $(this)[0].scrollHeight + "px"), $(this).siblings(".textarea-bg-text").css("height", $(this)[0].scrollHeight + "px"), $(this).parent().css("height", $(this)[0].scrollHeight + "px")
        });
        $('.app-optimization .btn[type="submit"]');
        Ua.bind("focus keyup input paste", function() {
            var a = $(this),
                e = a.val(),
                t = e.length,
                n = a.data("limit"),
                i = !0;
            a.css("height", a[0].scrollHeight + "px"), a.siblings(".textarea-bg-text").css("height", $(this)[0].scrollHeight + "px"), a.parent().css("height", a[0].scrollHeight + "px"), t > n ? (a.parent().siblings("label").find("em").addClass("text-danger").html(t), i = !1) : a.parent().siblings("label").find("em").removeClass("text-danger").html(t);
            var o = a.parents("form"),
                s = o.data("repeat") || "";
            if (s.length) {
                var r = new RegExp(s, "ig");
                e = e.replace(r, "<span>$&</span>"), e = e.replace(/\n/g, "<br />"), a.siblings(".textarea-bg-text").html(e)
            }
        })
    }
    $(document).on("submit", "form.investor", function(a) {
        preventDefault(a);
        var e = $(this),
            t = e.attr("action");
        if (t) {
            var n = e.find('input[name="investor_code"]').val();
            return n ? void $.ajax({
                    type: "POST",
                    url: t,
                    data: {
                        investor_code: n
                    },
                    success: function(a) {
                        1e4 != a.code ? swal({
                                title: a.msg,
                                type: "warning",
                                confirmButtonText: Lang.confirm_btn
                            }) : swal({
                                title: a.msg,
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
    }), $(document).on("click", ".auth-start", function(a) {
        var e = $(this);
        $(".wechat-subscribe").hide(), e.hide(), $(".auth-step.step-1").addClass("active"), $(".title-second").html('<span></span><a href="javascript:;">' + Lang.investors_certification_title + "></a>" + Lang.upload_card)
    }), $(document).on("change", ".auth-step.step-1 input[type=file]", function(a) {
        var e = $(this),
            t = e.parent(".upload");
        if (this.files && this.files[0]) {
            var n = this.files[0];
            if (n.size > 2097152) return swal({
                title: L("upload_img_limit"),
                confirmButtonText: Lang.confirm_btn
            }), !1;
            var i = new FileReader;
            i.onload = function() {
                var a = i.result,
                    n = t.clone(),
                    o = t.data("index"),
                    s = "picture-" + (o + 1),
                    r = $(".upload").length;
                r < 2 && (n.find("input").attr("id", s).end().find("label").attr("for", s).end().data("index", o + 1), n.insertAfter(t)), $('<div class="preview"><img src="' + a + '" alt=""><div class="remove"><span class="glyphicon-subscribe-remove"></span></div></div>').insertBefore(e)
            }, i.readAsDataURL(n)
        } else $('<div class="preview"><img src="' + this.value + '" alt=""><div class="remove"><span class="glyphicon-subscribe-remove"></span></div></div>').insertBefore(e)
    }), $(document).on("click", ".auth-step.step-1 .remove", function(a) {
        var e = $(this),
            t = e.parents(".upload");
        $(".preview").length < $(".upload").length ? t.remove() : (t.find(".preview").remove(), t.find("input[type=file]")[0].value = "")
    }), $(document).on("click", ".auth-step.step-1 .next", function(a) {
        if (isSubmiting) return !1;
        isSubmiting = !0;
        var e = $(this),
            t = e.data("submiturl"),
            n = e.parents(".auth-step.step-1"),
            i = n.find("input[type=file]"),
            o = n.data("uploadurl"),
            s = [];
        return $.map(i, function(a, e) {
            var t = ($(a), a.files[0]),
                n = new FormData;
            t && (n.append("qmfile", t), $.ajax({
                method: "POST",
                url: o,
                data: n,
                async: !1,
                processData: !1,
                contentType: !1,
                dataType: "json",
                success: function(a) {
                    "success" == a.code && s.push(a.url)
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
                success: function(a) {
                    isSubmiting = !1, 1e4 != a.code ? swal({
                            title: a.msg,
                            type: "warning",
                            confirmButtonText: Lang.confirm_btn
                        }) : (n.removeClass("active").next().addClass("active"), $(".title-second").html('<span></span><a href="javascript:;">' + Lang.investors_certification_title + '></a><a href="javascript:;">' + Lang.upload_card + "></a>" + Lang.email_authentication))
                }
            })
    }), $(document).on("click", ".title-second > a", function() {
        var a = $(this);
        a.hasClass("btn") || (1 == a.index() ? window.location.reload() : 2 == a.index() && ($(".auth-step.step-2").removeClass("active"), $(".auth-step.step-1").addClass("active"), $(".title-second").html('<span></span><a href="javascript:;">' + Lang.investors_certification_title + "></a>" + Lang.upload_card)))
    }), $(document).on("click", ".auth-step.step-2 .next", function(a) {
        if (isSubmiting) return !1;
        isSubmiting = !0;
        var e = $(this),
            t = e.data("submiturl"),
            n = e.parents(".auth-step.step-2").find("form"),
            i = n.find("input").val();
        return i && i.indexOf("@") != -1 ? void $.ajax({
                method: "POST",
                url: t,
                data: {
                    email: i
                },
                dataType: "json",
                success: function(a) {
                    isSubmiting = !1, 1e4 != a.code ? swal({
                            title: a.msg,
                            type: "warning",
                            confirmButtonText: Lang.confirm_btn
                        }) : swal({
                            title: a.msg,
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
    var za = $("#signin");
    za.length && accountPwd(za);
    var Ya = $("#findpwd");
    Ya.length && accountPwd(Ya);
    var Ja = $("#code-img,#code-img1");
    if (Ja.attr(".src")) {
        setTimeout(function() {
            loadCodeImage(Ja)
        }, 200)
    }
    $(document).on("click", "#code-img,#code-img1", function() {
        var a = $(this),
            e = a.attr("src"),
            t = a.attr("id");
        e.indexOf("?") != -1 ? e = e.replace(/\?.*/i, "?" + +new Date) : e += "?" + +new Date, a.attr("src", e), "code-img1" == t && $("#code-img").attr("src", e), "code-img" == t && $("#code-img1").attr("src", e)
    });
    var Ga = $("#signup");
    if (Ga.length) {
        var Xa, Va = Ga.find(".sign-msg");
        Ga.find("#submit").on("click", function() {
            clearTimeout(Xa);
            var a = !0,
                e = {};
            if (Ga.find("input.form-control").each(function() {
                    var t = $(this),
                        n = this.placeholder;
                    return "" == t.val() && "code" != this.name ? ("repassword" == this.name ? Va.html(Lang.password_verify_1).slideDown("fast") : Va.html(n + Lang.password_verify_2).slideDown("fast"), a = !1, !1) : void(e[this.name] = t.val())
                }), Ga.find(".has-error").length > 0 && (a = !1), !a) return !1;
            var t = Ga.attr("method") || "GET",
                n = Ga.attr("action"),
                i = Ga.attr("data-referrer");
            return $.ajax({
                type: t,
                url: n,
                data: e,
                dataType: "json",
                success: function(a) {
                    a && 1e4 == a.code ? (i && (window.location.href = i), Va.html(a.msg).slideUp("fast"), Ga.addClass("hide"), Za.removeClass("hide")) : (Va.html(a.msg).slideDown("fast"), a.needcode && ($("#code-img").trigger("click"), $("#code-img").parents(".form-group").removeClass("hide"), $("#code-img").parents(".form-group").find("input[name=code]").data("needcode", 1)))
                }
            }), !1
        });
        var Ka = Ga.data("checkurl");
        Ga.find("input").on("focus", function() {
            clearTimeout(Xa), Xa = setTimeout(function() {
                Ga.find(".has-error").length < 1 && Va.slideUp("fast")
            }, 500)
        }), Ga.find("input").on("blur", function() {
            var a = this.name,
                e = this.value,
                t = $(this),
                n = t.parents(".form-group"),
                i = t.siblings("span"),
                o = '<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>',
                s = '<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>';
            if (e = e.replace(/(^\s+)|(\s+$)/g, ""), this.value = e, "" == e) return this.value = "", n.removeClass("has-success has-feedback has-error"), i.length > 0 && i.removeClass("glyphicon-remove glyphicon-ok"), "phone" != a && "code" != a || $("#signup-send-code").addClass("btn-disabled"), !1;
            if ("phone" == a && $("#code").parents(".form-group").hasClass("has-success") && $("#signup-send-code").removeClass("disabled"), "username" == a || "email" == a || "code" == a || "phoneCode" == a) {
                var r = {
                    field: a,
                    value: e
                };
                "phoneCode" == a && (r.phone = $("#phone").val().trim()), $.ajax({
                    type: "get",
                    url: Ka,
                    data: r,
                    dataType: "json",
                    success: function(e) {
                        if (e && 1e4 == e.code) {
                            if (n.addClass("has-success has-feedback").removeClass("has-error"), i.length > 0 ? i.removeClass("glyphicon-remove").addClass("glyphicon-ok") : t.parent().append(o), "code" == a) {
                                var r = $("#phone").val();
                                r && (r = r.replace(/(^\s+)|(\s+$)/g, "")), r && $("#signup-send-code").removeClass("btn-disabled"), clearTimeout(Xa), Xa = setTimeout(function() {
                                    Ga.find(".has-error").length < 1 && Va.slideUp("fast")
                                }, 500)
                            }
                        } else n.addClass("has-error has-feedback").removeClass("has-success"), i.length > 0 ? i.removeClass("glyphicon-ok").addClass("glyphicon-remove") : t.parent().append(s), Va.html(e.msg).slideDown("fast"), "code" == a && ($("#signup-send-code").addClass("btn-disabled"), $("#code-img").trigger("click"))
                    }
                })
            }
            if ("repassword" == a) {
                var d = Ga.find('input[name="password"]').val();
                e != d ? (n.addClass("has-error has-feedback").removeClass("has-success"), i.length > 0 ? i.removeClass("glyphicon-ok").addClass("glyphicon-remove") : t.parent().append(s), Va.html(Lang.password_verify_1).slideDown("fast")) : (n.addClass("has-success has-feedback").removeClass("has-error"), i.length > 0 ? i.removeClass("glyphicon-remove").addClass("glyphicon-ok") : t.parent().append(o))
            }
        }), $(document).on("click", "#signup-voice-tip a", function(a) {
            $("#signup-send-code").data("type", "voice"), $("#signup-send-code").trigger("click")
        }), $(document).on("click", "#signup-send-code", function() {
            var a, e, t = $(this),
                n = $("#phone").val(),
                i = $("#code"),
                o = $("#signup-voice-tip"),
                s = Ga.find(".sign-msg");
            return n ? isPhone(n) ? i.data("needcode") && !i.parents(".form-group").find(".glyphicon-ok").length ? ("" == i.val() ? s.html("验证码" + Lang.password_verify_2).slideDown("fast") : s.html("验证码错误").slideDown("fast"), setTimeout(function() {
                            i.focus()
                        }, 500), !1) : (a = t.data("sendurl"), e = t.data("type"), void $.getJSON(a, {
                            phone: n,
                            type: e
                        }, function(a) {
                            if (1e4 == a.code) {
                                var n = 59,
                                    r = setInterval(function() {
                                        t.text(Lang.again_get + "(" + n--+")"), n < 0 && (t.removeClass("disabled"), t.text(Lang.get_code), clearInterval(r), o.slideDown())
                                    }, 1e3);
                                t.addClass("disabled"), t.text(Lang.again_get + "(60)"), "voice" == e && (s.addClass("success").html("请注意收听语言验证码").slideDown("fast"), setTimeout(function() {
                                    s.slideUp("fast")
                                }, 3e3))
                            } else 10012 == a.code ? a.needcode && ($("#code-img").parents(".form-group").removeClass("hide"), $("#code-img").parents(".form-group").find("input[name=code]").data("needcode", 1), $("#code-img").trigger("click"), i.focus()) : s.html(a.msg).slideDown("fast")
                        })) : (s.html("请输入正确的手机号码").slideDown("fast"), !1) : (s.html("请输入手机号码").slideDown("fast"), !1)
        })
    }
    var Za = $("#signup-company");
    Za.length && (Za.find("#checkboxInput").on("click", function() {
        $(this).prop("checked") ? Za.find("#company-submit").removeClass("disabled") : Za.find("#company-submit").addClass("disabled")
    }), Za.find("#company-submit").on("click", function() {
        clearTimeout(Xa);
        var a = Za.find(".sign-msg"),
            e = !0,
            t = {};
        if (Za.find("input.form-control").each(function() {
                var n = $(this),
                    i = n.data("empty") || 0,
                    o = this.placeholder;
                return "" != n.val() || i ? void(t[this.name] = n.val()) : (a.html(o + Lang.password_verify_2).slideDown("fast"), e = !1, !1)
            }), Za.find('input[type="checkbox"]').prop("checked") || (e = !1), !e) return !1;
        var n = Za.attr("method") || "GET",
            i = Za.attr("action");
        return $.ajax({
            type: n,
            url: i,
            data: t,
            dataType: "json",
            success: function(e) {
                if (e && 1e4 == e.code) if (a.html(e.msg).slideUp("fast"), a.addClass("success").html(e.msg).slideDown("fast"), "cn" == Lang.language_type) {
                    var t = $("#wechat-tip");
                    t.fadeIn();
                    var n = t.find("#signup-vip-email"),
                        i = $("#email").val() || "";
                    i.length && n.html(n.html().replace("你的注册邮箱", i)), t.find(".icon").on("click", function() {
                        var a = $(this);
                        a.hasClass("icon-left") ? a.parents(".wt-container-list").removeClass("qq") : a.parents(".wt-container-list").addClass("qq")
                    }), $("#wechat-tip-bg").show()
                } else setTimeout(function() {
                    document.location.href = "/"
                }, 1e3);
                else e.css && a.removeClass("success").addClass(e.css), a.html(e.msg).slideDown("fast")
            }
        }), !1
    })), u(), $(document).on("click", ".new-message-center", function() {
        var a = $(this),
            e = $(this).data("param"),
            t = $("#html-container");
        v(a, function(a) {
            t.empty().html(a)
        }, e)
    }), $(document).on("click", ".all-to-read", function() {
        $.get("/account/readAllMessage/", function(a) {
            window.location = "/account/setting/type/messageCenter"
        })
    }), $(document).on("click", " .show-msg-new", function() {
        var a = $(this),
            e = {},
            t = $("#html-container");
        e.id = a.data("id"), e.next = a.data("next") || 0, e.isread = a.data("isread") || "unread", v(a, function(a) {
            t.empty().html(a)
        }, e)
    }), $(document).on("click", ".new-message-page .pagination a", function(a) {
        a.preventDefault();
        var e = $(this),
            t = (e.html(), e.attr("href")),
            n = $("#html-container");
        $.ajax({
            url: t,
            type: "get",
            dataType: "html",
            error: function(a) {
                if (a && 403 == a.status) window.location.href = "/";
                else if (302 == a.status) {
                    var e = a.getResponseHeader("Url");
                    e ? window.location.href = e : window.location.href = "/"
                }
            },
            success: function(a) {
                n.empty().html(a)
            }
        })
    }), $(document).on("click", ".new_vip_page_list .pagination a", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.attr("href").split("=")[0],
            n = e.attr("href").split("=")[1] || 1,
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
            success: function(a) {
                var o = "";
                $.each(a, function(e, t) {
                    o += "<tr>", o += "<td>" + a[e].open_method + "</td>", o += "<td>" + a[e].vip_type + "</td>", o += "<td>" + a[e].days + "</td>", o += "<td>" + a[e].create_time + "</td>", o += "</tr>"
                }), console.log(n), n > 1 && s.removeClass("disabled").find("a").attr("href", t + "=" + (n - 1)), n < d - 2 && r.removeClass("disabled").find("a").attr("href", t + "=" + (parseInt(n) + 1)), 1 == n && s.addClass("disabled"), n == d - 2 && r.addClass("disabled"), e.parent().siblings().removeClass("active").end().addClass("active"), e.parent().hasClass("next") && e.parent().removeClass("active"), e.parent().hasClass("previous") && e.parent().removeClass("active"), i.find("tbody").html(o)
            },
            error: function(a, e, t) {
                console.log(e)
            }
        })
    }), $(document).on("click", ".add-competi-button", function() {
        if (t = 0, e = 130, window.isMobile) var a = $(this),
            e = a.data("scroll") || 400,
            t = a.data("offsettop") || a.offset().top - 220;
        $("html, body").animate({
            scrollTop: e + "px"
        }, 100), $addCompetiBg = $(".add-competi-bg"), $competiSearchList = $(".competi-search-list"), $pageButton = $(".text-center.page"), $addCompetiSpinner = $(".add-competi .spinner-bg"), $addCompetiBg.find(".add-competi").css({
            top: t + "px"
        }), $addCompetiBg.show(), search($addCompetiBg.find(".search-su"))
    }), $(document).on("submit", ".competi-search", function(a) {
        if (preventDefault(a), competiGetDataRun) return !1;
        var e = $(this),
            t = e.find("input[name=word]").val(),
            n = e.data("appid") || n,
            i = e.find(".dropdown-toggle.device .name").text();
        return !(!t || "" == t) && (Ba = e.prop("action"), searchWord = t, $addCompetiSpinner.show(), competiGetDataRun = !0, $.ajax({
                type: "get",
                url: Ba,
                data: {
                    search: t,
                    appid: n,
                    device: i.toLowerCase()
                },
                dataType: "json",
                success: function(a) {
                    competiGetDataRun = !1, currentPage = 1, $addCompetiSpinner.hide(), a.maxPage > 0 ? (competiMaxPage = a.maxPage, $competiSearchList.html(a.data), a.maxPage > 1 ? $pageButton.show() : $pageButton.hide()) : ($competiSearchList.html('<p class="text-center">' + Lang.no_data_1 + "</p>"), $pageButton.hide())
                }
            }), !1)
    }), $(document).on("click", ".text-center.page .btn-default", function(a) {
        if (preventDefault(a), competiGetDataRun) return !1;
        var e = $(this),
            t = e.data("type");
        return !e.hasClass("disable") && (currentPage = "next" == t ? currentPage + 1 : currentPage - 1, currentPage == competiMaxPage && $pageButton.find(".next").addClass("disable"), 1 == currentPage && $pageButton.find(".prev").addClass("disable"), currentPage > 1 && currentPage < competiMaxPage && $pageButton.find(".btn-default").removeClass("disable"), $addCompetiSpinner.show(), competiGetDataRun = !0, void $.ajax({
                type: "get",
                url: Ba,
                data: {
                    search: searchWord,
                    page: currentPage,
                    appid: appid
                },
                dataType: "json",
                success: function(a) {
                    $addCompetiSpinner.hide(), a.maxPage > 0 ? ($competiSearchList.html(a.data), competiGetDataRun = !1) : ($competiSearchList.html('<p class="text-center">' + Lang.no_data_2 + "</p>"), $pageButton.hide())
                }
            }))
    }), $(document).on("click", ".competi-search-list .btn-default, .btn-possibleAdd", function(a) {
        if (preventDefault(a), competiGetDataRun) return !1;
        var e = $(this),
            t = e.data("appid"),
            n = "/account/addCompeti",
            i = e.data("possible"),
            o = e.html();
        return $(".invest-data-center").length ? (k(e, n), !1) : !e.data("add") && (i || $addCompetiSpinner.show(), competiGetDataRun = !0, e.html(Lang.adding), void $.ajax({
                type: "get",
                url: n,
                data: {
                    appid: appid,
                    competiId: t
                },
                dataType: "json",
                success: function(a) {
                    i || $addCompetiSpinner.hide(), competiGetDataRun = !1, a && 1e4 == a.code ? (e.data("add", 1).html(Lang.added), e.addClass("disabled"), $(".competi-close").data("refresh", 1), i && refreshPage()) : (e.html(o), showOpenVipSwal(a.msg))
                }
            }))
    }), $(document).on("click", ".competi-list .delete-competi", function(a) {
        if (competiGetDataRun) return !1;
        var e = $(this),
            t = e.data("appid"),
            n = "/account/delCompeti",
            i = e.html();
        return !e.data("add") && (competiGetDataRun = !0, e.html(Lang.deleteing), void $.ajax({
                type: "get",
                url: n,
                data: {
                    appid: appid,
                    competiId: t
                },
                dataType: "json",
                success: function(a) {
                    competiGetDataRun = !1, a && 1e4 == a.code ? (e.parents(".table-striped").find(".competi-list").length < 2 && refreshPage(), e.parents(".competi-list").remove(), $(".competi .media-left >span").each(function(a, e) {
                            $(this).html(a + 1)
                        }), footerFixed()) : (e.html(i), swal({
                            title: a.msg,
                            confirmButtonText: Lang.confirm_btn
                        }))
                }
            }))
    }), $(document).on("click", ".competi-list .icon-asocompare", function(a) {
        var e, t = $(this),
            n = t.data("appid");
        return appid ? ($("#competiinfo").find("#asoCompare").addClass("active").siblings().removeClass("active"), e = "/app/asoCompare/appid/" + appid + "/competiId/" + n, void pjaxLoad(e)) : (refreshPage(), !1)
    }), $(document).on("click", ".thatapp", function(a) {
        var e = $(this);
        $("html, body").animate({
            scrollTop: "300px"
        }, 100), $addCompetiBg = $(".add-competi-bg"), $competiSearchList = $(".competi-search-list"), $pageButton = $(".text-center.page"), $addCompetiSpinner = $(".add-competi .spinner-bg"), $addCompetiBg.hide(), $addCompetiBg.find(".add-competi").css({
            top: e.offset().top - $("#container").offset().top + e.height() + 20 + "px"
        }), $addCompetiBg.show()
    }), $(document).on("click", ".add-competi.competi-list a", function(a) {
        $(".add-competi-bg").hide()
    }), $(document).on("mousewheel DOMMouseScroll", ".stop-default-scroll", function(a) {
        var e = $(this).find(".stop-default-scroll-box"),
            e = e.length ? e : $(this);
        wheelDelta = a.originalEvent.wheelDelta;
        var t = 0;
        if ($.map(e.children(), function(a, e) {
                t += $(a).outerHeight(!0)
            }), wheelDelta >= 0) {
            if (e.scrollTop() <= 0) return !1
        } else if (e.scrollTop() >= t - e.outerHeight()) return !1
    });
    var Qa = $(".search-su");
    Qa.length > 0 && search(Qa), $(document).on("click", ".export-data", function(a) {
        var e = $(this),
            t = e.data("limit"),
            n = e.data("disabled") || 0;
        if (t <= 0 && preventDefault(a), 1 == n) preventDefault(a), swal(Lang.export_data_tip_1);
        else {
            if ((e.attr("href").search("/keywordExport/") !== -1 || e.attr("href").search("/keywordExportPlatform/") !== -1) && (ae(e), $(".dataTables_empty").length)) return swal(Lang.app_keyword_aso_keyword_export_null), !1;
            if (e.attr("href").search("/keywordRankExport/") !== -1 && (ee(e), "" == $(".keyword-list .table tbody").html())) return swal(Lang.app_keyword_aso_keyword_export_null), !1;
            e.attr("href").search("/rankExport/") !== -1 && te(e), 2 == n ? (preventDefault(a), t -= 1, e.data("limit", t), t <= 0 && e.addClass("account-vip-status"), swal({
                    title: Lang.export_data_tip_2,
                    showConfirmButton: !0,
                    confirmButtonText: Lang.confirm_btn,
                    confirmButtonColor: "#0bb995",
                    showCancelButton: 1,
                    cancelButtonText: Lang.cancel_btn
                }, function(a) {
                    if (a) {
                        var n = e.attr("href");
                        n.indexOf("/") != -1 && (window.location.href = n), t -= 1, e.data("limit", t), t <= 0 && e.addClass("account-vip-status"), e.html(Lang.export_data_ing), e.data("disabled", 1), setTimeout(function() {
                            e.data("disabled", 2), e.html(Lang.export_data)
                        }, 3e3)
                    }
                })) : (t -= 1, e.data("limit", t), t <= 0 && e.addClass("account-vip-status"), e.html(Lang.export_data_ing), e.data("disabled", 1), setTimeout(function() {
                    e.data("disabled", 2), e.html(Lang.export_data)
                }, 3e3))
        }
    });
    var ae = function(a) {
            var e = {};
            e.minHints = $("#minHints").val() ? $("#minHints").val() : -1, e.maxHints = $("#maxHints").val() ? $("#maxHints").val() : -1, e.minResult = $("#minResult").val() ? $("#minResult").val() : -1, e.maxResult = $("#maxResult").val() ? $("#maxResult").val() : -1, e.minRank = $("#minRank").val() ? $("#minRank").val() : -1, e.maxRank = $("#maxRank").val() ? $("#maxRank").val() : -1, e.keyword = $("#keyword-list #sort_filter label input[type=search]").val() ? encodeURIComponent($("#keyword-list #sort_filter label input[type=search]").val()) : "";
            var t = "/minHints/" + e.minHints + "/maxHints/" + e.maxHints + "/minResult/" + e.minResult + "/maxResult/" + e.maxResult + "/minRank/" + e.minRank + "/maxRank/" + e.maxRank + "/keyword/" + e.keyword;
            a.attr("href", a.data("exporturl") + t)
        },
        ee = function(a) {
            var e = {};
            e.minHints = $("#minHints").val() ? $("#minHints").val() : -1, e.maxHints = $("#maxHints").val() ? $("#maxHints").val() : -1, e.minResult = $("#minResult").val() ? $("#minResult").val() : -1, e.maxResult = $("#maxResult").val() ? $("#maxResult").val() : -1;
            var t = "/minHints/" + e.minHints + "/maxHints/" + e.maxHints + "/minResult/" + e.minResult + "/maxResult/" + e.maxResult;
            a.attr("href", a.data("exporturl") + t)
        },
        te = function(a) {
            var e = $("#charts").find(".highcharts-legend-item"),
                t = "/itemstatus/";
            e && e.each(function() {
                t += $(this).is(".highcharts-legend-item-hidden") ? "0" : "1"
            }), a.attr("href", a.attr("href") + t)
        };
    if ($(document).on("click", ".account-vip-status", function(a) {
            var e = $(this);
            e.parents(".info-container");
            return preventDefault(a), window.isMobile ? swal({
                    title: Lang.account_vip_status_tip1,
                    confirmButtonText: Lang.confirm_btn,
                    cancelButtonText: !1
                }) : e.hasClass("export-data") ? e.hasClass("limit-vip-genre") ? swal(Lang.export_data_limit_vip_genre) : e.hasClass("limit-vip-date") ? swal(Lang.export_data_limit_vip_date) : showOpenVipSwal(Lang.account_vip_status_tip[LangObj.openVipType]) : showBuyVip(), !1
        }), $(document).on("click", "#buy-vip-type a", function() {
            var a = $(this),
                e = $("#buy-vip-expire");
            a.hasClass("active") || (e.data("expire") >= 0xe677d0686418 ? e.html("永久") : e.html(moment(e.data("expire")).add(a.data("date"), "month").format("YYYY-MM-DD")), $("#buy-vip-amount").html(a.data("amount")), a.siblings("a").removeClass("active").end().addClass("active"))
        }), $(document).on("click", "#buy-vip-style input", function() {
            var a = $(this),
                e = $("#buy-vip-type"),
                t = e.find("." + a.val()),
                n = t.find("a.active");
            vipExpire = $("#buy-vip-expire"), t.show().siblings().hide(), $("#buy-vip-amount").html(n.data("amount")), vipExpire.html(moment(vipExpire.data("expire")).add(n.data("date"), "month").format("YYYY-MM-DD"))
        }), $(document).on("click", "#buy-vip-submit", function() {
            var a = $("#buy-vip-style input:checked").val(),
                e = $("#buy-vip-type ." + a + " a.active").data("productid"),
                t = $(this),
                n = t.data("url");
            n = n + "/product_id/" + e + "?callback=" + encodeURIComponent(location.href), window.open(n)
        }), $(document).on("click", "#buy-vip-submit-bc", function() {
            var a = $(this),
                e = $("#buy-vip-style input:checked").val(),
                t = $("#buy-vip-type ." + e + " a.active").data("productid"),
                n = $("#beecloud-pay-type a.active").data("type"),
                i = a.data("action") + "/product_id/" + t + "/payChannel/" + n;
            a.data("action", i), v(a, buySubmit, "")
        }), $(document).on("click", ".buy-vip-cancel", function() {
            $("#buy-vip").hide(), $("#vip-b").hide()
        }), $(document).on("click", ".no-signin", function(a) {
            return preventDefault(a), swal({
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
        var ne = ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "hideMenuItems"];
        wx.config({
            debug: wechatConfig.debug || !1,
            appId: wechatConfig.appId,
            timestamp: wechatConfig.timestamp,
            nonceStr: wechatConfig.nonceStr,
            signature: wechatConfig.signature,
            jsApiList: wechatConfig.jsApiList || ne
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
    if ($(document).on("click", ".market-list a", function(a) {
            return preventDefault(a), pjaxLoad($(this).attr("href")), !1
        }), $("#app").length) {
        var ie, oe = !1;
        $.pjax.defaults.timeout = 4e3, $.pjax.defaults.timeout = 4e4, $(document).on("click", "a[data-pjax]", function(a) {
            if (preventDefault(a), oe) return !1;
            oe = !0;
            var e = $(this),
                t = e.parent("li"),
                n = t.data("parent") || "",
                i = e.data("pagename");
            return t.length < 1 && (t = $("#" + i), n = t.data("parent") || ""), $("#container").attr("data-name", i), t.addClass("active"), t.siblings().removeClass("open active"), isMobile && t.parent("ul").siblings("ul").find("li").removeClass("open active"), n && ($("#" + n).addClass("open active"), $("#" + n).siblings().removeClass("open active").find("li").removeClass("active")), $.support.pjax ? pjaxLoad(e.attr("href")) : document.location.href = e.attr("href"), !1
        }), $(document).on("pjax:success", function(a, e, t, n) {
            clearTimeout(ie), $(".info-container > .spinner-box").hide(100), oe = !1, H()
        }), $(document).on("pjax:beforeSend", function(a, e, t, n) {
            ie = setTimeout(function() {
                $(".info-container > .spinner-box").height($(".info-container > .container-box").outerHeight()).show()
            }, 100)
        })
    }
    $(document).on("pjax:success", function(a, e, t, n) {
        var i = n.getResponseHeader("Callback");
        i && i.indexOf("function") != -1 ? setTimeout(function() {
                var a = new Function("return " + i)();
                a()
            }, 100) : i && "function" == typeof window[i] && setTimeout(function() {
                var a = n.getResponseHeader("callbackParam") || "";
                a && (a = JSON.parse(a)), window[i](a)
            }, 100)
    }), $(document).on("click", "#nav-list .nav-title", function(a) {
        if (isMobile) return !1;
        var e = $(this),
            t = e.parent(),
            n = e.parents("#nav-list");
        t.hasClass("active") || n.find(".dropdown.active").siblings().not(t).removeClass("open"), t.hasClass("dropdown") && t.toggleClass("open")
    }), $(document).on("click", "#app .aso100-nav-label.screenimg .tab", function() {
        var a = $(this),
            e = a.data("imgstr") || "",
            t = a.data("platform") || "ios";
        if (imgHtml = "", a.siblings(".tab").removeClass("active"), a.addClass("active"), e) return e = "android" == t ? e.split("|") : e.split(","), e.map(function(a, e) {
            imgHtml += '<img src="' + a + '" />'
        }), $("#screenshot-box").html(imgHtml).css("left", "0"), $("#screenshot-left").removeClass("active"), $("#screenshot-right").addClass("active"), !1
    }), $(document).on("click", "#screenshot-left", function() {
        var a = $(this),
            e = $("#screenshot-box"),
            t = parseInt(e.css("left"));
        if (!a.hasClass("active")) return !1;
        var n = e.find("img"),
            i = n.width() + 5,
            o = e.parent().width(),
            s = 0;
        return i * n.length > o && (s = Math.ceil(o - i * n.length)), t += i, t >= 0 && (a.removeClass("active"), $("#screenshot-right").addClass("active")), e.animate({
            left: t + "px"
        }, 300), $("#screenshot-right").addClass("active"), !1
    }), $(document).on("click", "#screenshot-right", function() {
        var a = $(this),
            e = $("#screenshot-box"),
            t = parseInt(e.css("left"));
        if (!a.hasClass("active")) return !1;
        var n = e.find("img"),
            i = n.width() + 5,
            o = e.parent().width(),
            s = 0;
        return i * n.length > o && (s = Math.ceil(o - i * n.length)), t -= i, t <= s && (a.removeClass("active"), $("#screenshot-left").addClass("active")), e.animate({
            left: t + "px"
        }, 300), $("#screenshot-left").addClass("active"), !1
    }), $(".part-left ul li").bind("mouseover", function() {
        $(this).addClass("white"), $(this).children("span").addClass("green"), $(this).children("p").addClass("text-green")
    }), $(".part-left ul li").bind("mouseout", function() {
        $(this).removeClass("white"), $(this).children("span").removeClass("green"), $(this).children("p").removeClass("text-green")
    }), $(document).on("click", ".part-left ul li", function(a) {
        $(this).children("div").show()
    }), $(".part-left ul").click(function() {
        $(".part-left ul li").children("div").hide()
    }), $(".part-left ul li div p").mouseover(function() {
        $(this).children("span").addClass("green")
    }), $(".part-left ul li div p").mouseout(function() {
        $(this).children("span").removeClass("green")
    }), $(document).on("click tap", ".container-box .desc .more", function() {
        var a = $(this);
        a.parent().find("pre").css("max-height", "initial").end(), a.remove()
    }), $(document).on("click tap", ".version .more", function() {
        var a = $(this);
        a.parent().find("p").css("max-height", "initial").end(), a.remove()
    }), $(document).on("click", ".comment .pagination a,.plan .pagination a", function() {
        var a = $(this),
            e = a.attr("href"),
            t = a.parent();
        return !t.hasClass("disabled") && (e.indexOf("javascript") == -1 && (pjaxLoad(e), !1))
    }), $(document).on("click", "#show-add-itc-account", function() {
        var a, e, t, n = $(this),
            i = n.parents(".bind-itc-account-showdesc"),
            o = $("#bind-itc-account");
        i && i.length > 0 ? (t = i.offset().top, e = i.offset().left, a = {
                left: e + "px",
                top: t + "px"
            }, i.hide()) : (t = $(document).scrollTop() + ($(window).height() - o.height()) / 2, a = {
                marginLeft: "50%",
                left: "-" + o.width() / 2 + "px",
                top: t + "px"
            }, $("#vip-b").show()), o.css(a).show();
        var s = i.data("show") || "show";
        "hide" == s && i.hide()
    }), $(document).on("click", ".add-itc-account-cancle", function() {
        $("#bind-itc-account").hide();
        var a = $(".bind-itc-account-showdesc").data("show") || "show";
        "hide" == a ? $(".bind-itc-account-showdesc").hide() : $(".bind-itc-account-showdesc").show(), $("#vip-b").hide()
    }), $(document).on("click", "#bind-itc-account #checkboxInput", function() {
        $(this).prop("checked") ? $("#bind-itc-account-button").removeClass("disabled") : $("#bind-itc-account-button").addClass("disabled")
    }), $(document).on("click", "#bind-itc-account-button", function() {
        var a = $(this),
            e = a.data("url"),
            t = a.parents("#bind-itc-account"),
            n = t.find("#itc-email"),
            i = t.find("#itc-password");
        if (a.hasClass("disabled")) return !1;
        var o = n.val(),
            s = i.val();
        return o = o.replace(/(^\s*)|(\s*$)/g, ""), o && o.indexOf("@") != -1 ? s ? ($(".itc-bind-loading").css({
                    left: t.offset().left + "px",
                    top: t.offset().top + "px"
                }).show(), void $.ajax({
                    type: "post",
                    url: e,
                    data: {
                        appid: o,
                        password: s,
                        app_id: $("#appinfo-id").val()
                    },
                    dataType: "json",
                    success: function(a) {
                        if ($(".itc-bind-loading").hide(), a && 1e4 == a.code) {
                            var e, t = Lang.cancel_btn,
                                o = Lang.show_account,
                                s = !0;
                            a.notApp ? (e = Lang.itc_tip_1 + a.app_name + Lang.itc_tip_2, t = Lang.itc_tip_3) : (e = Lang.itc_tip_4, a.app_name || (o = Lang.confirm_btn, s = !1)), swal({
                                title: e,
                                showConfirmButton: !0,
                                confirmButtonText: o,
                                confirmButtonColor: "#0bb995",
                                showCancelButton: s,
                                cancelButtonText: t,
                                closeOnConfirm: !1,
                                html: !0
                            }, function(e) {
                                e ? s ? window.location.href = "/account/setting/type/settingItc" : window.location.reload() : (a.notApp && n.val(""), i.val(""))
                            })
                        } else i.val(""), 50005 == a.code ? swal({
                                title: a.msg,
                                showConfirmButton: !0,
                                confirmButtonText: Lang.itc_double_check_confirm,
                                confirmButtonColor: "#0bb995",
                                showCancelButton: !0,
                                cancelButtonText: Lang.itc_double_check_cancel,
                                closeOnConfirm: !1,
                                html: !0
                            }, function(a) {
                                a && window.open("https://support.apple.com/zh-cn/HT202664")
                            }) : swal(a.msg)
                    }
                })) : (swal(Lang.please_write_pwd), !1) : (swal({
                title: Lang.please_check + "Apple Id",
                confirmButtonText: Lang.confirm_btn
            }, function() {
                n.val("")
            }), !1)
    }), $(document).on("click", ".itc-manage-editer", function() {
        var a = $(this),
            e = a.parent(),
            t = e.data("itcid");
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
        var a = $(this),
            e = a.parents(".manage-itc-account").data("url");
        _parent = a.parent(), appleId = _parent.data("itcid"), swal({
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
                url: e,
                data: {
                    apple_id: appleId
                },
                dataType: "json",
                success: function(a) {
                    a && 1e4 == a.code ? swal({
                            title: Lang.itc_tip_7,
                            showConfirmButton: !0,
                            confirmButtonText: Lang.itc_tip_8,
                            cancelButtonText: Lang.cancel_btn,
                            confirmButtonColor: "#0bb995",
                            html: !0
                        }, function() {
                            window.location.reload()
                        }) : swal(a.msg)
                }
            })
        })
    }), $(document).on("click", ".itc-manage-submit", function() {
        var a = $(this),
            e = a.data("url"),
            t = a.parents(".itc-account-editer"),
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
                    url: e,
                    data: {
                        oldAppid: r,
                        appid: s,
                        password: d,
                        type: 1
                    },
                    dataType: "json",
                    success: function(a) {
                        $(".itc-bind-loading").removeClass("itc-account-modify").hide(), a && 1e4 == a.code ? swal({
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
                                title: a.msg,
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
    }), $(document).on("click", ".turnoff", function(a) {
        $(".itc-account-editer").hide(), $(".vip-b").hide()
    }), $(document).on("click", "#itc-filter-input", function(a) {
        var e = $(this),
            t = $(".itc .off-line");
        e.prop("checked") ? t.hide() : t.show()
    }), $(document).on("click", "#screenshot-box img", function() {
        if (window.isMobile) return !1;
        var a = document.getElementById("bombbox"),
            e = $(".aso100-nav-label.screenimg .tab.active").data("imgstr"),
            t = $(".aso100-nav-label.screenimg .tab.active").data("platform") || "ios";
        e = "ios" == t ? e.split(",") : e.split("|");
        var n = a.querySelector("img") || document.createElement("img"),
            i = a.querySelector("span"),
            o = $("#tab");
        i.style.position = "absolute", i.style.top = 0, i.style.right = 0, i.innerHTML = Lang.close, i.style.cursor = "pointer", n.src = e[$(this).index()], $(document).scrollTop(80);
        var s, r = $("#screenshot-box img").width(),
            d = $("#screenshot-box img").height(),
            c = $(window).height();
        s = 50, c >= 730 && (s = (c - o.height()) / 2), o.css({
            top: s + "px",
            marginLeft: -r + "px"
        }).show();
        var l = 2,
            p = d * l;
        c <= 2.5 * d && (p = c - 84, p >= d ? l = p / d : (l = 1.3, p = d)), n.style.height = d * l + "px", n.style.width = r * l + "px", a.appendChild(n), $(".vip-b").show().css({
            opacity: .8,
            background: "#000"
        }), startMove(a, {
            height: p
        }), $("#next").show(), $("#previous").show(), $(".close-popup").click(function() {
            $(".vip-b").hide(), o.hide(), $("#bombbox").css("height", 0), $("#next").hide(), $("#previous").hide()
        });
        var u = document.getElementById("next"),
            h = document.getElementById("previous"),
            m = $(this).index(),
            f = $("#screenshot-box img").length;
        0 == m && (h.style.display = "none"), m == f - 1 && (u.style.display = "none"), u.onclick = function() {
            h.style.display = "block", m++, n.src = e[m], m > f - 2 && (u.style.display = "none")
        }, h.onclick = function() {
            u.style.display = "block", m--, m < 1 && (h.style.display = "none"), n.src = e[m]
        }
    }), $(document).on("click", ".add-invoice", function() {
        var a = $(this),
            e = a.data("orderid");
        ordertype = a.data("ordertype"), $("#add-invoice-form input[name=orderid]").val(e), $("#add-invoice-form input[name=type]").val(ordertype), $(".vip-b").show(), $("#fill-in").show()
    }), $(document).on("click", "#add-invoice-submit", function() {
        var a, e, t, n, i, o, s = $("#add-invoice-form");
        return n = s.find("input[name=orderid]").val(), i = s.find("input[name=type]").val(), a = s.find("input[name=title]").val().replace(/(^\s*)|(\s*$)/g, ""), e = s.find("input[name=username]").val().replace(/(^\s*)|(\s*$)/g, ""), t = s.find("input[name=phone]").val().replace(/(^\s*)|(\s*$)/g, ""), o = s.find("input[name=email]").val().replace(/(^\s*)|(\s*$)/g, ""), taxnumber = s.find("input[name=taxnumber]").val().replace(/(^\s*)|(\s*$)/g, ""), a ? taxnumber ? e ? t ? o ? void $.ajax({
                                url: s.attr("action"),
                                type: "POST",
                                dataType: "json",
                                data: {
                                    orderid: n,
                                    type: i,
                                    title: a,
                                    username: e,
                                    phone: t,
                                    email: o,
                                    taxnumber: taxnumber
                                },
                                success: function(a) {
                                    1e4 == a.code ? swal({
                                            title: Lang.invoice_tip_5,
                                            confirmButtonText: Lang.confirm_btn
                                        }, function() {
                                            $("#fill-in").hide(), $(".vip-b").hide(), setTimeout(function() {
                                                window.location.reload()
                                            }, 200)
                                        }) : swal(a.msg)
                                }
                            }) : (swal(Lang.invoice_tip_7), !1) : (swal(Lang.invoice_tip_3), !1) : (swal(Lang.invoice_tip_2), !1) : (swal(Lang.invoice_tip_6), !1) : (swal(Lang.invoice_tip_1), !1)
    }), $(document).on("click", "#add-invoice-close", function() {
        $(".vip-b").hide(), $("#fill-in").hide()
    }), $(document).on("tap click", ".search-qr-code", function(a) {
        preventDefault(a), $(".intell").is(":hidden") ? ($(".intell").addClass("show"), $(".vip-b").addClass("qr-code").show(), _hmt.push(["_trackEvent", Lang.qrcode_tip, "none", "none"])) : ($(".intell").removeClass("show"), $(".vip-b").removeClass("qr-code").hide())
    }), $(document).on("tap click", ".vip-b.qr-code", function(a) {
        $(".intell").removeClass("show"), $(".vip-b").removeClass("qr-code").hide()
    }), $(document).on("click", '#jifen-receive a[href="javascript:;"]', function() {
        if (la) return !1;
        var a = $(this);
        if (a.hasClass("disabled")) return !1;
        var e = a.data("type"),
            t = a.data("jifen"),
            n = a.parents("#jifen-receive").data("url"),
            i = {};
        return !(!e || !n) && (i.type = e, la = !0, void $.ajax({
                type: "post",
                url: n,
                data: i,
                complete: function() {
                    la = !1
                },
                success: function(a) {
                    1e4 == a.code ? swal({
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
                            title: a.msg,
                            type: "error",
                            showCancelButton: !1,
                            confirmButtonColor: "#33ba95",
                            confirmButtonText: Lang.confirm_btn,
                            cancelButtonText: Lang.cancel_btn
                        })
                }
            }))
    }), $(document).on("click", "#jifen-exchange-vip a", function() {
        if (la) return !1;
        var a = $(this);
        if (a.hasClass("disabled")) return !1;
        var e = $("#current-jifen"),
            t = e.data("jifen") || 0;
        t = parseInt(t);
        var n = a.data("type"),
            i = a.data("title"),
            o = a.data("jifen"),
            s = a.parents("#jifen-exchange-vip").data("url"),
            r = {};
        return t < o ? (swal(Lang.points_tip_4), !1) : !(!n || !s) && (r.type = n, void swal({
                title: i,
                confirmButtonColor: "#33ba95",
                confirmButtonText: Lang.confirm_btn,
                cancelButtonText: Lang.cancel_btn,
                showCancelButton: !0
            }, function(a) {
                return !!a && (la = !0, void setTimeout(function() {
                        $.ajax({
                            type: "post",
                            url: s,
                            data: r,
                            complete: function() {
                                la = !1
                            },
                            success: function(a) {
                                1e4 == a.code ? swal({
                                        title: a.msg,
                                        type: "success",
                                        confirmButtonColor: "#33ba95",
                                        confirmButtonText: Lang.confirm_btn,
                                        cancelButtonText: Lang.cancel_btn
                                    }, function() {
                                        document.location.reload()
                                    }) : swal({
                                        title: a.msg,
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
    var se;
    $(document).on("ajaxComplete", function(a, e) {
        var t = e.getResponseHeader("Content-Analysis"),
            n = "/api/analysis";
        return !!t && (n += "?anl=" + t + "&t=" + +new Date, se || (se = document.createElement("img"), se.border = 0, se.style.display = "none", se.width = 1, se.height = 1, document.getElementsByTagName("head")[0].appendChild(se)), void(se.src = n))
    }), $(document).on("click", ".wechat-share-float p, .wechat-share-show", function(a) {
        wechatSharePop()
    }), window.isWechat && $(".wechat-open-safari-show").on("click", function(a) {
        var e, t = $(this);
        e = 0 == t.data("platform") ? ".open-safari" : ".open-broser", t.data("openbroser") && (a.preventDefault(), $(e).is(":hidden") ? ($(e).show(), $(".vip-b").addClass("wechat-share").show()) : ($(".vip-b").removeClass("wechat-share").hide(), $(e).hide()))
    }), $(document).on("tap click", ".vip-b.wechat-share, .arrow, .open-safari, .open-broser", function(a) {
        $(".vip-b").removeClass("wechat-share").hide(), $(".arrow").hide(), $(".open-safari").hide(), $(".open-broser").hide(), a.preventDefault()
    }), $(".wechat-share-show").hover(function() {
        "undefined" == typeof wechatConfig && $("#article-show-qrcode").show()
    }, function() {
        $("#article-show-qrcode").hide()
    }), $(document).on("click", ".message .show-msg", function() {
        var a = $(this),
            e = a.parents("tr"),
            t = e.data("id"),
            n = $(".msg-container");
        e.hasClass("read") || $.get("/account/readMessage/id/" + t, function(a) {
            e.addClass("read")
        });
        var i = e.find(".msg-content"),
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
        var a = $(this),
            e = a.parents(".msg-container");
        e.addClass("hide-animation"), setTimeout(function() {
            e.removeClass("show").removeClass("hide-animation")
        }, 300), window.isMobile || $(".vip-b").hide()
    }), $(".globalrank-list").length && !window.isMobile && ($(".appicon-name").hover(function() {
        var a = $(this).attr("class").match(/appid_(\d+)\s?/i)[1] || 0,
            e = ".appid_" + a;
        $(e).addClass("appicon-name-selected")
    }, function() {
        var a = $(this).attr("class").match(/appid_(\d+)\s?/i)[1] || 0,
            e = ".appid_" + a;
        $(e).removeClass("appicon-name-selected")
    }), $(".appicon-name").mousemove(function(a) {
        if (a.target.className.indexOf("tooltip") !== -1) {
            var e = $(a.target),
                t = a.offsetX,
                n = e.width();
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
        var a = $(this),
            e = a.data("name");
        a.addClass("active").siblings().removeClass("active"), $("#expand-method-list").removeClass("one two three").addClass(e), "three" == e && le(), ue($("#expand-detail-" + e))
    }), $(document).on("focus", "#expand-method-form-one input", function() {
        $(this).parents(".form-group").removeClass("has-error")
    }), $(document).on("submit", "#expand-method-form-one", function() {
        var a = $(this),
            e = a.find('input[type="text"]'),
            t = e.val();
        if (t = $.trim(t), !t) return !1;
        t = t.split(/,|，/);
        for (var n = [], i = 0, o = t.length; i < o; i++) {
            for (var s = i + 1; s < o; s++) t[i] === t[s] && (s = ++i);
            n.push(t[i])
        }
        if (t = n, t.length > 5) return e.parents(".form-group").addClass("has-error"), !1;
        $("#checkbox-operate-cover").prop("checked", !1);
        var r = $("#expand-detail-one");
        r.find(".spinner-bg").show();
        var d = "",
            c = "";
        $.map(t, function(a, e) {
            c || (c = a), d += '<a href="javascript:;" class="tab' + (0 == e ? " active" : "") + '">' + a + "</a>"
        }), r.find(".aso100-nav-label").html(d);
        var l = r.data("ajaxurl");
        return $.getJSON(l + "/" + c, function(a) {
            a.data.list;
            r.find(".aso100-nav-label a:eq(0)").data("data", a.data), de(r.find("table"), a.data.list), r.find(".spinner-bg").hide()
        }), r.removeClass("hide"), ue(r), !1
    }), $(document).on("click", "#expand-detail-one .aso100-nav-label .tab", function() {
        var a, e = $(this),
            t = e.html(),
            n = (+new Date, $("#expand-detail-one"));
        if (e.hasClass("life")) return !1;
        if (e.addClass("active life").siblings().removeClass("active life"), $("#checkbox-operate-cover").prop("checked", !1), a = e.data("data")) de(n.find("table"), a.list);
        else {
            n.find(".spinner-bg").show();
            var i = n.data("ajaxurl");
            $.getJSON(i + "/" + t, function(a) {
                e.data("data", a.data), de(n.find("table"), a.data.list), n.find(".spinner-bg").hide()
            })
        }
    }), $(document).on("click", "#expand-method-list .checkbox_all", function() {
        var a = $(this),
            e = a.parents(".table");
        e.find("tbody .aso-checkbox").not($(".disabled")).find("input").prop("checked", a.prop("checked"))
    }), $(document).on("click", "#checkbox-operate-cover", function() {
        var a = $(this),
            e = a.parents(".expand-detail"),
            t = e.find(".table").DataTable();
        a.prop("checked") ? t.columns(5).search("^\\d+$", !0, !1).draw() : t.columns(5).search("").draw()
    }), $(document).on("click", "#checkbox-operate-added", function() {
        var a = $(this);
        a.prop("checked") ? $(".disabled-row").hide() : $(".disabled-row").show()
    });
    var de = function(a, e) {
        var t = a,
            n = t.data("keywordurl"),
            i = t.data("hintsurl"),
            o = t.data("numberurl");
        return !!t && void t.DataTable({
                destroy: !0,
                data: e,
                order: [],
                lengthMenu: [100],
                lengthChange: !1,
                searching: !0,
                autoWidth: !1,
                createdRow: function(a, e, t) {
                    e[5] && $(a).addClass("hidden")
                },
                columnDefs: [{
                    orderable: !1,
                    data: function(a, e, t, n) {
                        var i = a[0],
                            o = "";
                        return a[5] && (o = "disabled"), '<div class="aso-checkbox ' + o + '"><input type="checkbox" name="word" id="checkbox_one_' + i + '" data-wordid="' + i + '" class="form-control checkbox_wordid" ' + o + '><label for="checkbox_one_' + i + '" class="' + o + '"><span></span></label></div>'
                    },
                    targets: 0
                }, {
                    orderable: !1,
                    data: function(a, e, t, i) {
                        if ("sort" === e) return a[5];
                        var o = a[1];
                        return '<a href="' + n + encodeURIComponent(o) + '" target="_blank">' + o + "</a>"
                    },
                    targets: 1
                }, {
                    data: function(a, e, t, n) {
                        return '<a class="number" href="' + i + a[0] + '" target="_blank">' + a[2] + "</a>"
                    },
                    targets: 2
                }, {
                    data: function(a, e, t, n) {
                        return '<a class="number" href="' + o + a[0] + '" target="_blank">' + a[3] + "</a>"
                    },
                    targets: 3
                }, {
                    data: function(a, e, t, n) {
                        return a[6]
                    },
                    targets: 4
                }, {
                    searchable: !0,
                    data: function(a, e, t, n) {
                        return "sort" === e ? a[4] : a[4] > 0 ? a[4] : Lang.keyword_not_covered
                    },
                    targets: 5
                }, {
                    orderable: !1,
                    data: function(a, e, t, n) {
                        return a[5] ? '<a href="javascript:;" data-wordid="' + a[0] + '" class="btn btn-default">' + Lang.keyword_cancel_add + "</a>" : '<a href="javascript:;" data-wordid="' + a[0] + '" class="btn btn-custom">' + Lang.keyword_add_repertory + "</a>"
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
        var a = $(this),
            e = a.parents("form").find(".search-app-list");
        e.children().length && e.show(), $("html, body").animate({
            scrollTop: "210px"
        }, 200)
    }), $(document).on("keydown", "#expand-detail-two .form-control", function(a) {
        13 == a.keyCode && a.preventDefault()
    }), $(document).on("keyup input paste", "#expand-detail-two .form-control", function() {
        var a = $(this),
            e = a.val(),
            t = a.parents("form"),
            n = t.find(".search-app-list"),
            i = window.listAppids || [];
        clearTimeout(window.searching), e = $.trim(e), !e && n.find(".search-title").length && n.html(n.data("html")).hide(), e && e.indexOf("'") === -1 && (window.searching = setTimeout(function() {
            var a = t.attr("action");
            a && $.getJSON(a + e, function(a) {
                if (1e4 == a.code) {
                    var t = '<span class="search-title">「' + e + "」" + Lang.keyword_search_result + "</span>";
                    a.list.length ? $.map(a.list, function(a, e) {
                            $.inArray(parseInt(a.app_id), i) > -1 || (t += '<li class="media item">', t += '<a href="javascript:;" data-appid="' + a.app_id + '">', t += '<div class="media-left media-middle">', t += '<img class="media-object" src="' + a.icon + '" alt="' + a.app_name + '">', t += "</div>", t += '<div class="media-body">', t += '<h4 class="media-heading">' + a.app_name + "</h4>", t += '<div class="media-auther">' + a.publisher + "</div>", t += "</div>", t += "</a>", t += "</li>")
                        }) : t += '<li class="media item no-data">' + Lang.search_no_result + "</li>", n.data("html") || n.data("html", n.html()), n.html(t).show()
                } else swal(a.msg)
            })
        }, 600))
    }), $(document).on("blur", "#expand-detail-two .form-control", function() {
        var a = $(this),
            e = $.trim(a.val()),
            t = a.parents("form").find(".search-app-list");
        !e && t.find(".search-title").length && t.hide()
    }), $(document).on("click", "#expand-detail-two .search-app-list .media a", function() {
        var a = $(this),
            e = a.parents(".search-app-list");
        appid = a.data("appid"), icon = a.find("img").attr("src"), appName = a.find(".media-heading").html(), publisher = a.find(".media-auther").html(), window.listAppids = window.listAppids || [];
        var t = $("#selected-app-list"),
            n = t.find(".col-md-10");
        if (n.children().length >= 3) return swal({
            title: Lang.keyword_expend_show_app
        }, function() {
            e.hide()
        }), !1;
        var i = "";
        i += '<div class="thumbnail">', i += '<img src="' + icon + '">', i += '<div class="caption">', i += '<p><a href="/app/rank/appid/' + appid + '" target="_blank">' + appName + "</a></p>", i += "</div>", i += '<div class="subscribe-modify" data-appid="' + appid + '"><span class="glyphicon-subscribe-remove"></span></div>', i += "</div>", $("#selected-app-list").show().find(".col-md-10").append(i), a.parent().addClass("hide appid" + appid), window.listAppids.push(appid), e.hide(), e.find(".competi").length == e.find(".competi.hide").length && e.find(".competi-title").hide(), e.find(".same").length == e.find(".same.hide").length && e.find(".same-title").hide()
    }), $(document).on("click", "#selected-app-list .subscribe-modify", function() {
        var a, e = $(this),
            t = e.data("appid"),
            n = e.parent();
        $("#expand-detail-two .search-app-list").find(".appid" + t).removeClass("hide appid" + t), n.siblings().length || $("#selected-app-list").hide(), n.remove(), $.inArray(t, window.listAppids) > -1 && (a = $.inArray(t, window.listAppids), window.listAppids.splice(a, 1))
    }), $(document).on("click", "#selected-app-list .btn", function() {
        var a = $(this),
            e = $("#selected-app-list"),
            t = e.find(".col-md-10").children(),
            n = [];
        if (!t.length) return !1;
        $.map(t, function(a) {
            n.push($(a).find(".subscribe-modify").data("appid"))
        });
        var i = $("#expand-detail-two");
        i.find(".spinner-bg").show(), i.find(".expand-detail").removeClass("hide");
        var o = a.data("ajaxurl");
        $.getJSON(o + n.join(","), function(a) {
            ce(i.find("table"), a.list), i.find(".spinner-bg").hide()
        })
    });
    var ce = function(a, e) {
            var t = a,
                n = $("#selected-app-list .col-md-10").children(),
                i = t.data("keywordurl"),
                o = t.data("hintsurl"),
                s = $("#app").data("appid");
            if (!t) return !1;
            t.find(".add-app").remove();
            var r = 3,
                d = [];
            $.map(n, function(a) {
                var e = $(a),
                    n = e.find(".subscribe-modify").data("appid"),
                    i = e.find("img").attr("src"),
                    o = e.find(".caption a").html(),
                    s = '<th class="col-md-1 add-app"><img src="' + i + '" data-toggle="tooltip" title="' + o + '"><i class="icon icon-up"></i><i class="icon icon-down"></i></th>';
                t.find(".large th:eq(" + r + ")").after(s), r++, d.push({
                    data: function(a, e, t, i) {
                        var o = JSON.parse(a[3]);
                        return o[n] ? o[n] : "-"
                    },
                    targets: r
                })
            }), t.hasClass("dataTable") && t.DataTable().clear(), d.push({
                orderable: !1,
                data: function(a, e, t, n) {
                    var i = a[0],
                        o = "";
                    return a[r] && (o = "disabled"), '<div class="aso-checkbox ' + o + '"><input type="checkbox" name="word" id="checkbox_two_' + i + '" data-wordid="' + i + '" class="form-control checkbox_wordid" ' + o + '><label for="checkbox_two_' + i + '" class="' + o + '"><span></span></label></div>'
                },
                targets: 0
            }), d.push({
                orderable: !1,
                data: function(a, e, t, n) {
                    var o = a[1];
                    return '<a href="' + i + encodeURIComponent(o) + '" target="_blank">' + o + "</a>"
                },
                targets: 1
            }), d.push({
                data: function(a, e, t, n) {
                    return '<a class="number" href="' + o + a[0] + '" target="_blank">' + a[2] + "</a>"
                },
                targets: 2
            }), d.push({
                data: function(a, e, t, n) {
                    var i = JSON.parse(a[3]);
                    return i[s] ? i[s] : "-"
                },
                targets: 3
            }), d.push({
                orderable: !1,
                data: function(a, e, t, n) {
                    return a[r] ? '<a href="javascript:;" data-wordid="' + a[0] + '" class="btn btn-default">' + Lang.keyword_cancel_add + "</a>" : '<a href="javascript:;" data-wordid="' + a[0] + '" class="btn btn-custom">' + Lang.keyword_add_repertory + "</a>"
                },
                targets: r + 1
            }), t.DataTable({
                destroy: !0,
                data: e,
                lengthMenu: [100, 1e3],
                lengthChange: !1,
                searching: !0,
                autoWidth: !1,
                createdRow: function(a, e, t) {
                    e[4] && $(a).addClass("hidden")
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
        le = function() {
            var a = $("#expand-detail-three"),
                e = a.data("ajaxurl");
            return !a.data("getdata") && (a.find(".spinner-bg").show(), a.data("getdata", 1), void $.getJSON(e, function(e) {
                    pe(a.find("table"), e.list), a.find(".spinner-bg").hide()
                }))
        },
        pe = function(a, e) {
            var t = a,
                n = ($("#selected-app-list .col-md-10").children(), t.data("keywordurl")),
                i = t.data("hintsurl"),
                o = t.data("numberurl");
            $("#app").data("appid");
            if (!t) return !1;
            t.hasClass("dataTable") && t.DataTable().clear();
            var s = [];
            s.push({
                orderable: !1,
                data: function(a, e, t, n) {
                    var i = a[0],
                        o = "";
                    return a[5] && (o = "disabled"), '<div class="aso-checkbox ' + o + '"><input type="checkbox" name="word" id="checkbox_three_' + i + '" data-wordid="' + i + '" class="form-control checkbox_wordid" ' + o + '><label for="checkbox_three_' + i + '" class="' + o + '"><span></span></label></div>'
                },
                targets: 0
            }), s.push({
                orderable: !1,
                data: function(a, e, t, i) {
                    var o = a[1];
                    return '<a href="' + n + encodeURIComponent(o) + '" target="_blank">' + o + "</a>"
                },
                targets: 1
            }), s.push({
                data: function(a, e, t, n) {
                    return '<a class="number" href="' + i + a[0] + '" target="_blank">' + a[2] + "</a>"
                },
                targets: 2
            }), s.push({
                data: function(a, e, t, n) {
                    return '<a class="number" href="' + o + a[0] + '" target="_blank">' + a[3] + "</a>"
                },
                targets: 3
            }), s.push({
                data: function(a, e, t, n) {
                    return a[4]
                },
                targets: 4
            }), s.push({
                orderable: !1,
                data: function(a, e, t, n) {
                    return a[5] ? '<a href="javascript:;" data-wordid="' + a[0] + '" class="btn btn-default">' + Lang.keyword_cancel_add + "</a>" : '<a href="javascript:;" data-wordid="' + a[0] + '" class="btn btn-custom">' + Lang.keyword_add_repertory + "</a>"
                },
                targets: 5
            }), t.DataTable({
                destroy: !0,
                data: e,
                lengthMenu: [100, 1e3],
                lengthChange: !1,
                searching: !0,
                autoWidth: !1,
                createdRow: function(a, e, t) {
                    e[5] && $(a).addClass("hidden")
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
        ue = function(a) {
            if (!a.length) return !1;
            $.fn.dataTable.ext.search = [];
            var e = a.find(".datatable-ext-search"),
                t = e.find(".ext-search-hints");
            t.length && $.fn.dataTable.ext.search.push(function(a, e, n) {
                var i = t.data("column"),
                    o = parseInt(t.find(".min").val(), 10),
                    s = parseInt(t.find(".max").val(), 10),
                    r = parseFloat(e[i]) || 0;
                return !!(isNaN(o) && isNaN(s) || isNaN(o) && r <= s || o <= r && isNaN(s) || o <= r && r <= s)
            });
            var n = e.find(".ext-search-result");
            n.length && $.fn.dataTable.ext.search.push(function(a, e, t) {
                var i = n.data("column"),
                    o = parseInt(n.find(".min").val(), 10),
                    s = parseInt(n.find(".max").val(), 10),
                    r = parseFloat(e[i]) || 0;
                return !!(isNaN(o) && isNaN(s) || isNaN(o) && r <= s || o <= r && isNaN(s) || o <= r && r <= s)
            });
            var i = e.find(".ext-search-rank");
            i.length && $.fn.dataTable.ext.search.push(function(a, e, t) {
                var n = i.data("column"),
                    o = parseInt(i.find(".min").val(), 10),
                    s = parseInt(i.find(".max").val(), 10),
                    r = parseFloat(e[n]) || 0;
                if ("string" == typeof n && n.indexOf(",") != -1) {
                    if (isNaN(o) && isNaN(s)) return !0;
                    var d = !1;
                    return n = n.split(","), $.map(n, function(a) {
                        a > e.length - 2 || (colValue = parseFloat(e[a]), isNaN(colValue) || (isNaN(o) && colValue <= s || isNaN(s) && o <= colValue || o <= colValue && colValue <= s) && (d = !0))
                    }), d
                }
                return !!(isNaN(o) && isNaN(s) || isNaN(o) && r <= s || o <= r && isNaN(s) || o <= r && r <= s)
            }), e.find(".btn-group input").on("keyup", function() {
                var t = $(this),
                    n = t.parents(".screen-nav");
                t.val() ? t.addClass("hasData") : t.removeClass("hasData"), n.find(".hasData").length ? e.find(".clear-screen").show() : e.find(".clear-screen").hide(), a.find(".table").DataTable().draw()
            }), e.find(".clear-screen").on("click", function() {
                e.find(".screen-nav input").val(""), a.find(".table").DataTable().draw(), $(this).hide()
            })
        };
    $(document).on("click", "#expand-method-list .table tbody td .btn", function() {
        var a, e, t, n = $(this),
            i = n.data("wordid"),
            o = $("#expand-method-list").data("addexpand"),
            s = $("#expand-method-list").data("deleteexpand"),
            r = $("#expand-detail-one .aso100-nav-label .tab.active");
        a = n.parents("tr").index(), n.hasClass("btn-default") ? $.getJSON(s + "/wordid/" + i, function(t) {
                1e4 == t.code ? (r.length && (e = r.data("data").list, e[a][5] = 0), n.html(Lang.keyword_add_repertory).addClass("btn-custom").removeClass("btn-default").blur(), n.parents("tr").find('input[type="checkbox"]').removeAttr("disabled"), n.parents("tr").find(".aso-checkbox").removeClass("disabled").find("label").removeClass("disabled")) : swal(t.msg)
            }) : (t = $("#container.container-keyword-expand .expand-method .method.active").data("values"), $.getJSON(o + i + "/source/" + t, function(t) {
                1e4 == t.code ? (r.length && (e = r.data("data").list, e[a][5] = 1), n.html(Lang.keyword_cancel_add).addClass("btn-default").removeClass("btn-custom").blur(), n.parents("tr").fadeOut().find('input[type="checkbox"]').attr("disabled", !0), n.parents("tr").find(".aso-checkbox").addClass("disabled").find("label").addClass("disabled")) : swal(t.msg)
            }))
    }), $(document).on("click", "#expand-method-list .add-expand-multi", function() {
        var a, e, t, n = $(this),
            i = $("#expand-method-list").data("addmultiexpand"),
            o = n.parents(".expand-detail").find(".table"),
            s = o.find(".checkbox_wordid:checked"),
            r = $("#expand-detail-one .aso100-nav-label .tab.active"),
            d = [];
        $.map(s, function(a) {
            var e = $(a),
                t = e.data("wordid");
            t && e.prop("checked") && !e.parents("tr").find(".btn").hasClass("btn-default") && d.push(t)
        }), d.length && (t = $("#container.container-keyword-expand .expand-method .method.active").data("values"), $.post(i, {
            words: d.join(","),
            source: t
        }, function(t) {
            $(".container-keyword-expand #checkbox_one_all, .container-keyword-expand #checkbox_two_all, .container-keyword-expand #checkbox_three_all").removeAttr("checked"), 1e4 == t.code ? $.map(s, function(n) {
                    var i = $(n);
                    r.length && (e = r.data("data").list, a = i.parents("tr").index(), e[a][5] = 1), i.parents("tr").addClass("hidden").find(".btn").html(Lang.keyword_cancel_add).addClass("btn-default").removeClass("btn-custom"), i.parents("tr").find('input[type="checkbox"]').removeAttr("checked").attr("disabled", !0), i.parents("tr").find(".aso-checkbox").addClass("disabled").find("label").addClass("disabled"), swal({
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
        var a, e, t, n, i, o, s, r = $(this),
            d = $("#repertory-box #name-box"),
            c = $("#repertory-box #keyword-box");
        a = r.data("state"), e = r.data("type"), n = r.data("id"), i = r.data("word");
        var l = $("#keyword-extend-user").data("updateurl") + r.data("id") + "/type/" + e;
        a && (l += "/state/" + a), $.getJSON(l, {}, function(l) {
            return 1e4 != l.code ? (swal(l.msg), !1) : void(1 == a ? (d.find(".empty-tips").hide(), r.data("state", 2), "word" == e ? (t = '<a href="javascript:;" class="btn btn-border change-word word-' + n + '" data-type="word" data-id="' + n + '">' + i + '<span class="iconfont icon-guanbi"></span></a>', c.append(t)) : (t = '<a href="javascript:;" class="btn btn-border change-word word-' + n + '" data-type="name" data-id="' + n + '">' + i + '<span class="iconfont icon-guanbi"></span></a>', d.append(t))) : ("word" == e ? (s = $(".table-word-" + n), o = c.find(".word-" + n)) : (s = $(".table-name-" + n), o = d.find(".word-" + n)), s.data("state", 1), s.removeAttr("checked"), o.fadeOut("fast", function() {
                        o.remove(), c.find("a").length || d.find("a").length || d.find(".empty-tips").show()
                    })))
        })
    }), $(document).on("click", "#keyword-repertory-container .extword-remove", function(a) {
        var e, t, n, i = $(this);
        e = i.data("id"), n = i.data("groupid"), t = $("#keyword-extend-user").data("deleteurl") + e, $.getJSON(t, {}, function(a) {
            return 1e4 != a.code ? (swal(a.msg), !1) : void f(e, n)
        })
    }), $(document).on("click", "#keyword-repertory-container #group-list-nav .group .remove-group", function(a) {
        var e, t, n, i = $(this);
        swal({
            title: Lang.keyword_expend_confirm_del_group,
            type: "warning",
            showCancelButton: !0
        }, function() {
            t = i.parent("a"), n = t.parent("div").data("delurl"), e = t.data("groupid"), $.ajax({
                url: n,
                type: "POST",
                dataType: "json",
                data: {
                    group_id: e
                }
            }).done(function(a) {
                return 1e4 != a.code ? (swal(a.msg), !1) : (t.prev().click(), t.remove(), $('.group-change-select option[value="' + e + '"]').remove(), $('#select-group-temp .select option[value="' + e + '"]').remove(), void 0)
            }).fail(function() {
                swal(Lang.request_error)
            })
        })
    }), h(), $(document).on("change", ".table-operate .group-change-select", function() {
        var a = $('.keyword-repertory-tr .aso-checkbox input[type="checkbox"]'),
            e = $(".group-change-select").val(),
            t = "",
            n = ($("#groupData"), $(".table-operate .group-change-select"));
        return e != -1 && (setInterval(function() {
                $("#select2-select-basic-single-results .select2-results__option--highlighted").attr("aria-selected", "false")
            }, 100), n.val(-1), $("#select2-select-basic-single-container").text(n.find("option:first-child").text()), a.each(function(a, e) {
                $(this).prop("checked") && (t += $(this).val() + ",")
            }), t = t.substring(0, t.length - 1), e ? void m(t, e, function() {
                    a.each(function(a, e) {
                        $(this).removeAttr("checked")
                    })
                }) : (swal(Lang.keyword_select2_placehoder), !1))
    }), $(document).on("click", ".table-operate .del-expand-multi", function() {
        var a, e = $(this),
            t = e.data("url"),
            n = $("#checkbox_all"),
            i = $('.keyword-repertory-tr .aso-checkbox input[type="checkbox"]'),
            o = "",
            s = "";
        return i.each(function(a, e) {
            $(this).prop("checked") && (o += $(this).val() + ",", s += $(this).data("groupid") + ",")
        }), o = o.substring(0, o.length - 1), s = s.substring(0, s.length - 1), o ? void $.ajax({
                url: t,
                type: "GET",
                dataType: "json",
                data: {
                    ids: o
                }
            }).done(function(e) {
                1e4 == e.code ? (s = s.split(","), $.each(o.split(","), function(e, t) {
                        a = s[e], f(t, a)
                    })) : swal(e.msg)
            }).fail(function() {
                swal(Lang.request_error)
            }).complete(function() {
                n.removeAttr("checked")
            }) : (swal(Lang.keyword_selct_word), !1)
    }), $(document).on("change", ".keyword-expand-list .group-change-select", function(a) {
        var e, t = $(this);
        e = t.parents("div.select-group-row").data("id"), m(e, t.val())
    }), $(document).on("click", "#group-list-nav .group", function(a) {
        a.preventDefault();
        var e, t, n = $(this),
            i = $("#checkbox_all");
        n.addClass("active life").siblings().removeClass("active life"), i.removeAttr("checked"), e = "." + n.data("classname"), t = $(e).val(), t = t ? $.parseJSON(t) : [], window.keywordExtend.clear().rows.add(t).draw()
    }), $(document).on("click", "#add-keyword-extend", function() {
        var a = $(this);
        a.addClass("disabled"), a.attr("disabled", !0);
        var e = a.data("url"),
            t = $('.aso100-nav-select input[name="keyword"]'),
            n = t.val();
        wordLang = t.attr("placeholder"), n || swal(wordLang), $.getJSON(e, {
            word: n
        }, function(e, n) {
            if (a.removeClass("disabled"), a.attr("disabled", !1), 1e4 != e.code) swal(e.msg);
            else {
                var i = $.parseJSON(e.groupData);
                tableData = $.parseJSON($(".groupData_0").val()), tableData.unshift(i), $(".groupData_0").val(JSON.stringify(window.tableData)), $($("#group-list-nav").children(".group").get(0)).click(), t.val("")
            }
        })
    }), $(document).on("click", "#checkbox_all", function(a) {
        var e = $('.keyword-repertory-tr .aso-checkbox input[type="checkbox"]');
        $(this).prop("checked") ? e.each(function(a, e) {
                $(this).prop("checked", !0)
            }) : e.each(function(a, e) {
                $(this).removeAttr("checked")
            })
    }), g(), $(document).on("click", "#repertory-box #go-help", function(a) {
        a.preventDefault();
        var e, t = $(this),
            n = $("#repertory-box");
        e = t.attr("href"), n.find(".change-word").length ? location.href = e : swal(Lang.keyword_not_selected)
    }), !
        function() {
            var a = $(".invite .preview-warp .preview-btn"),
                e = $(".invite .preview-warp .preview-show"),
                t = null,
                n = null;
            a.hover(function() {
                n = setTimeout(function() {
                    e.fadeIn(), t = t || e.position().left, a.addClass("first"), a.hasClass("first") && e.css("left", t + 8 + "px")
                }, 200)
            }, function() {
                clearTimeout(n), e.fadeOut()
            })
        }(), $(document).on("click", ".invite #btn-invite", function() {
        var a = $(this),
            e = a.parents("form"),
            t = e.find("input");
        return t.val() ? (a.addClass("disabled"), a.attr("disabled", !0), void $.ajax({
                type: "POST",
                url: e.attr("action"),
                data: e.serialize(),
                success: function(e) {
                    a.removeClass("disabled"), a.attr("disabled", !1), 1e4 == e.code && t.val(""), swal(e.msg)
                }
            })) : (swal("请输入邮箱地址"), !1)
    }), $(document).on("order.dt", ".keyword-list table.table", function() {
        var a = $(this),
            e = a.DataTable().order();
        if (!e.length) return !1;
        var t, n, i, o = e[0][0],
            s = e[0][1];
        t = a.find("th:eq(" + o + ")"), n = t.find(".icon-up"), i = t.find(".icon-down"), t.siblings().find(".icon").removeClass("active"), t.siblings().find(".iconfont").removeClass("active"), "asc" == s ? (n.addClass("active"), i.removeClass("active")) : (n.removeClass("active"), i.addClass("active"))
    });
    var he = !1;
    $(document).on("click", ".global-rank-info", function() {
        var a, e = ($(".global-rank-info"), $(" #global-maps-charts")),
            t = $("#global-maps-charts-nav"),
            n = $("#all-global-maps-charts-tr-inner-div .spinner-box"),
            i = $(this);
        e.hide(), t.hide();
        var o;
        he ? a = $(".all-global-maps-charts-tr") : (a = $('<tr class="all-global-maps-charts-tr  show-animation" style="display:none"><td colspan="5"></td></tr>'), a.find("td").html($("#all-global-maps-charts-tr-inner-div")), a.insertAfter(i.parents("tr")), he = !0), i.parents("tr").next().is(a) ? o = i.parents("tr").next().css("display") : (a.insertAfter(i.parents("tr")), o = "none"), "table-row" == o ? a.hide() : (a.show(), n.show()), $("html body").animate({
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
            success: function(a) {
                n.hide(), e.show(), t.show(), t.find(".active").data("data", JSON.stringify(a)), Pa(e, a)
            }
        })
    }), $(document).on("tap click", ".link-to-next", function(a) {
        return a && a.preventDefault ? a.preventDefault() : window.event.returnValue = !1, loginByAlert(this), !1
    }), $(document).on("tap click", "#alert-signIn", function(a) {
        if ("alert-signIn" == a.target.id || a.target.className.indexOf("alert-signIn-circle") != -1 || a.target.className.indexOf("alert-close") != -1) {
            var e = $("#alert-signIn");
            e.hide();
            var t = e.data("extendClass");
            return t && e.removeClass(t).data("extendClass", ""), !1
        }
    }), $(document).on("scroll", function(a) {
        $(document).scrollTop() > 235 ? $(".top-appinfo").fadeIn(400) : $(".top-appinfo").fadeOut(400)
    }), $(document).on("tap", ".container-keyword .more", function() {
        var a = $(".keyword-info");
        return a.css({
            maxHeight: "initial"
        }), $(this).hide(), !1
    }), $(document).on("tap", ".panel .panel-info-show", function() {
        var a = $(".panel .show-list"),
            e = $(".panel .panel-info-show .caret");
        return txt = $(".panel .panel-info-show .txt"), "收起" == txt.html() ? (a.removeClass("show-list-show-animation").addClass("show-list-hide-animation"), e.addClass("bottom-caret").removeClass("top-caret"), txt.html("展示全部")) : (a.removeClass("show-list-hide-animation").addClass("show-list-show-animation"), e.addClass("top-caret").removeClass("bottom-caret"), txt.html("收起")), !1
    });
    var me = $(".show-alert-btn .back-to-top"),
        fe = $(".show-alert-btn");
    $(".shopping-popup");
    me.click(function() {
        $("body,html").animate({
            scrollTop: 0
        }, 500)
    }), $(document).on("scroll", function(a) {
        var e = $(this).scrollTop();
        bottom = $(document).height() - e - $(window).height() - $(".footer").outerHeight(), e > 700 ? fe.addClass("animation-show") : fe.removeClass("animation-show"), bottom <= 0 && fe.css("bottom", Math.abs(bottom) + 30 + "px")
    }), clickToHide($(".submit-feedback-guanbi"), $(".alert-submit-feedback"));
    var ge = $(".show-alert-btn").find(".feedback"),
        ve = $(".alert-submit-feedback");
    ge.click(function(a) {
        ve.fadeIn(400)
    }), $(document).on("click", ".submit-feedback-btn", function(a) {
        var e = $(".alert-submit-feedback"),
            t = {};
        return t.texts = e.find("textarea").val(), t.current_url = window.location.href, t.texts ? (v($(this), function() {
                swal("反馈信息提交成功!")
            }, t), void e.fadeOut("fast")) : (swal("请填写反馈信息"), !1)
    }), $(document).on("click", ".alter-default", function(a) {
        a.target.className.indexOf("alter-default") != -1 && $(this).fadeOut("fast")
    }), $(document).on("click", "#dataCenter #dchMessageTitle .dchm-title-tab a", function(a) {
        a.preventDefault(), $("#dchMessageTitle .dchm-title-tab").removeClass("active"), $(this).parents(".dchm-title-tab").addClass("active")
    }), $(document).on("click", "#dataCenter .dcbcBodyIos .remarks-info .remark-action", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.parents(".remarks-info"),
            n = t.find(".remark-desc"),
            i = t.find(".remark-input");
        n.hide(), e.hide(), i.show(), i.find("input").val(n.text()).focus()
    }), $(document).on("blur", "#dataCenter .dcbcBodyIos .remarks-info .remark-input input", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.parents(".remarks-info"),
            n = t.find(".remark-desc"),
            i = t.data("appid"),
            o = t.find(".remark-input"),
            s = t.find(".remark-action"),
            r = t.find(".remark-input input").val(),
            d = $("#remarkSaveUrl").val();
        return n.text() == r ? (o.hide(), s.show(), n.show(), !1) : (datas = {
                appid: i,
                remark: r
            }, void ajaxRequestAction(e, b, datas, d))
    }), $(document).on("keydown", "#dataCenter .dcbcBodyIos .remarks-info .remark-input input", function(a) {
        13 == a.keyCode && ($(this).trigger("blur"), a.preventDefault())
    }), $(document).on("click", ".invest-data-center .dcbct-body-action-td .action-group, .setting-investment .si-action-edit", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.next(".group-change-warp");
        return !!t.find("li").length && void(t.hasClass("in") ? t.fadeOut("fast", function() {
                    $(this).removeClass("in")
                }) : t.fadeIn("fast", function() {
                    $(this).addClass("in")
                }))
    }), $(document).on("click", ".setting-investment .group-change-warp a", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.text(),
            n = e.parents(".group-change-warp"),
            i = e.parents("tr"),
            o = i.find("td:eq(3)");
        ajaxRequestAction($(this), function(a, e, i) {
            1e4 == a.code ? o.text(t) : swal(a.msg), n.hide().removeClass("in")
        })
    }), $(document).on("click", ".invest-data-center .group-change-warp a", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.parents(".group-change-warp"),
            n = t.data("appid"),
            i = e.data("groupid"),
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
            }).done(function(a) {
                1e4 == a.code ? (swal(a.msg), $(".nav-tabs li[data-groupid='" + i + "']").addClass("ajax-request"), 0 != o && (r.find(".dcbct-tbody-info-chart").length <= 1 ? r.remove() : d.remove())) : swal(a.msg), t.hide()
            }).fail(function(a) {
                swal(Lang.request_error)
            })
    }), $(document).on("click", ".invest-data-center .dcbcBodyIos .dcbct-body-action-td .action-top", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.data("id"),
            n = e.parents(".dcbct-tbody-info-chart"),
            i = n.data("appid"),
            o = $("#stickTopUrl").val(),
            s = parseInt($("#isStickTopPop").data("ispop")),
            r = $("#isStickTopPop").data("msg"),
            d = {};
        if (1 == t) return !1;
        var c = function() {
            d = {
                appid: i
            }, ajaxRequestAction(e, w, d, o)
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
    }), $(document).on("click", "#dataCenter #dcbcBodyIos .dcbct-body-action-td .action-info", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.find("i"),
            n = e.data("id"),
            i = $(".nav-tabs li.active a").attr("href"),
            o = $(i).find(".dcbct-body-info-chart-warp-" + n);
        if (chartEle = e.parents(".dcbct-tbody-info-chart"), t.hasClass("icon-xiangxia1")) {
            "none" != chartEle.find(".dcbct-body-compete-chart-warp").css("display") && chartEle.find(".action-compete").trigger("click"), e.html('<i class="iconfont icon-xiangshang1"></i>收起'), o.fadeIn("fast").addClass("show-animation");
            var s = isMobile ? chartEle.offset().top - 49 + "rem" : chartEle.offset().top - 57 + "px";
            if (setTimeout(function() {
                    $("body").animate({
                        scrollTop: s
                    }, 380)
                }, 260), chartEle.hasClass("data-ready")) return !1;
            dataCenterLoadChartData(chartEle)
        } else e.html('<i class="iconfont icon-xiangxia1"></i>展开'), o.fadeOut("fast")
    }), $(document).on("click", "#dataCenter #dcbcBodyIos .dcbc-table-body-competi .action-rank", function(a) {
        var e = $(this),
            t = e.data("datas"),
            n = t.competiId;
        if (navActiveId = $(".nav-tabs li.active a").attr("href"), chartWarp = $(navActiveId).find(".dcbct-body-competi-chart-tr-" + n), chartEle = chartWarp.find(".chart-data"), Ba = $("#competiRankUrl").val(), chartWarp.hasClass("in")) chartWarp.fadeOut("fast").removeClass("in");
        else {
            if (chartWarp.fadeIn("fast").addClass("show-animation in"), chartWarp.hasClass("data-ready")) return !1;
            params = {
                appid: n
            }, ajaxRequestAction(e, y, params, Ba)
        }
    }), $(document).on("click", ".invest-data-center .nav-tabs .remove-group", function(a) {
        a.preventDefault();
        var e, t, n, i, o = $(this);
        swal({
            title: Lang.keyword_expend_confirm_del_group,
            type: "warning",
            showCancelButton: !0
        }, function() {
            t = o.parents("li"), n = t.parents(".nav-tabs").data("delurl"), i = $(t.find("a").attr("href")), e = t.data("groupid"), groupChangeWarp = $(".group-change-warp ul"), $.ajax({
                url: n,
                type: "POST",
                dataType: "json",
                data: {
                    group_id: e
                }
            }).done(function(a) {
                return 1e4 != a.code ? (swal(a.msg), !1) : (t.prev().children("a").click(), t.remove(), i.remove(), groupChangeWarp.find('a[data-groupid="' + e + '"]').parent("li").remove(), void 0)
            }).fail(function() {
                swal(Lang.request_error)
            })
        })
    }), $(document).on("click", "#dataCenter #dcbcBodyIos .dcbct-body-action-td .action-compete", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.data("id"),
            n = $(".nav-tabs li.active a").attr("href"),
            i = $(n).find(".dcbct-body-compete-chart-warp-" + t),
            o = e.parents(".dcbct-tbody-info-chart"),
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
                success: function(a) {
                    var e = a.data;
                    1e4 == a.code ? (o.find(".dcbc-table-body-competi tbody").html(e.competiOutHTML), o.find(".dcbc-table-body-possible tbody").html(e.possibleOutHTML), o.find(".spinner-box").removeClass("show").addClass("animation-hide"), o.addClass("compite-data-ready"), i.find(".dcbctb-compete-chart-warp-td").css("height", "auto"), tooltipInit()) : swal(a.msg)
                }
            })
        }
    }), $(document).on("click", ".invest-data-center .aso100-nav-select .btn-add-app", function(a) {
        a.preventDefault(), offsetTop = $(this).offset().top - 200, $addCompetiBg = $(".add-competi-bg"), $competiSearchList = $(".competi-search-list"), $pageButton = $(".text-center.page"), $addCompetiSpinner = $(".add-competi .spinner-bg"), $addCompetiBg.find(".add-competi").css({
            top: offsetTop + "px"
        }), $addCompetiBg.show(), $addCompetiBg.find("form.competi-search").attr("action", "/account/addAppSearch"), $addCompetiBg.find(".competi-close").data("refresh", "2"), $addCompetiBg.find(".text-left").hide(), search($addCompetiBg.find(".search-su"))
    }), $(document).on("click", "#dataCenter #dcbcBodyIos .dcbct-body-compete-chart .add-compite", function(a) {
        a.preventDefault();
        var e, t = $(this),
            n = t.data("id"),
            i = t.parents(".dcbct-tbody-info-chart"),
            o = i.data("appid");
        offsetTop = $(this).offset().top - 100, $addCompetiBg = $(".add-competi-bg"), $competiSearchList = $(".competi-search-list"), e = $competiSearchList.data("indexid"), e && n != e && ($competiSearchList.html(""), $addCompetiBg.find(".search-su").val(""), $addCompetiBg.find(".page").hide()), $competiSearchList.data("appid", o), $competiSearchList.data("indexid", n), $pageButton = $(".text-center.page"), $addCompetiSpinner = $(".add-competi .spinner-bg"), $addCompetiBg.find(".add-competi").css({
            top: offsetTop + "px"
        }), $addCompetiBg.show(), search($addCompetiBg.find(".search-su"))
    }), $(document).on("click", ".dcbc-table-body-possible .dcbctb-action-td .action-add", function(a) {
        a.preventDefault();
        var e = "/account/addCompeti";
        ajaxRequestAction($(this), C, "", e)
    }), $(document).on("click", ".dcbc-table-body-competi .dcbctb-action-td .action-del", function(a) {
        a.preventDefault();
        var e = "/account/delCompeti";
        ajaxRequestAction($(this), C, "", e)
    }), $(document).on("click", ".setting-investment #si-form-submit", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.parents("form");
        ajaxSendForm(t, e)
    }), $(document).on("click", ".setting-investment .si-action-del", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.data("id"),
            n = $("#delInvestorUrl").val();
        swal({
            title: Lang.keyword_expend_confirm_del_group,
            showCancelButton: 1
        }, function() {
            ajaxRequestAction(e, be, {
                id: t
            }, n)
        })
    });
    var be = function(a, e, t) {
        1e4 == a.code ? e.parents("tr").remove() : swal(a.msg)
    };
    $(document).on("click", ".invest-data-center .main.aso100-nav-select .dropdown-menu a", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.attr("href"),
            n = $(".nav-tabs .active").data("groupid");
        e.addClass("active").siblings().removeClass("active"), _(t, n)
    }), $(document).on("click", ".nav-tabs .ajax-request a", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.parents("li").data("groupid"),
            n = $(".invest-data-center .aso100-nav-select .dropdown > a:first").attr("href");
        e.removeClass("ajax-request"), _(n, t)
    }), $(document).on("click", "#dataCenter #dcbcBodyIos .dcbct-info-nav .get-analysis-data .dropdown-menu a", function(a) {
        var e = $(this),
            t = e.html(),
            n = e.parents("ul.dropdown-menu"),
            i = e.parent(),
            o = n.data("paramname"),
            s = e.data("param"),
            r = e.parents(".get-analysis-data"),
            d = r.data("ajaxurl"),
            c = r.data("querydata") || {};
        if ("string" == typeof c && (c = JSON.parse(c)), c[o] = s, r.data("querydata", JSON.stringify(c)), !d) return !1;
        n.siblings("a").find(".name").html(t), i.addClass("active").siblings().removeClass("active");
        var l = r.parents(".dcbct-tbody-info-chart");
        l.find(".spinner-box").addClass("show"), dataCenterModifyRowData(l, d + "/row/1", c), dataCenterLoadChartData(l, d, c)
    }), $(document).on("click", "#dataCenter #dcbNavWord .dcbc-add-btn", function(a) {
        a.preventDefault();
        var e = $(this),
            t = $("#dataCenter #dcbNavWord"),
            n = e.data("url");
        return inputEle = e.prev(".dcbc-add-input"), keyword = inputEle.val(), dcbCopyWord = $("#dataCenter #dcbCopyWord .dcb-content-table").clone(), !! keyword && (e.attr("disabled", !0), void $.getJSON(n, {
            keyword: keyword
        }, function(a) {
            return e.attr("disabled", !1), 1e4 != a.code ? (swal(a.msg), !1) : (inputEle.val(""), dcbCopyWord.find(".word-text").text(keyword), dcbCopyWord.find("tbody").html(a.listHtml), dcbCopyWord.find(".dcbct-word-del").data("word", keyword), t.find(".dcb-content-no-data").addClass("hidden"), t.find(".dcb-content-add").after(dcbCopyWord), void $('[data-toggle="tooltip"]').tooltip({
                    delay: {
                        show: 55,
                        hide: 90
                    }
                }))
        }))
    }), $(document).on("click", "#dataCenter #dcbNavWord .dcbct-word-del", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.data("word"),
            n = $("#dataCenter #dcbNavWord"),
            i = e.data("url");
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
            }, function(a, t, i) {
                return 1e4 != a.code ? (swal(a.msg), !1) : (e.parents(".dcb-content-table-keyword").fadeOut().remove(), n.find(".dcb-content-table-keyword").length || n.find(".dcb-content-no-data").removeClass("hidden"), void swal(Lang.delete_app_succ_title, Lang.delete_word_succ_text, "success"))
            })
        })
    }), $(document).on("click", "#dataCenter #dchmMoreBtn", function(a) {
        $("#dataCenter #dchmBodyBlog").hasClass("active") ? window.open($(this).data("blogurl")) : window.open($(this).data("msgurl"))
    }), $(document).on("mouseenter", "#dataCenter .dcb-content-table-keyword .dcbc-table-body-rank td", function() {
        var a = $(this),
            e = a.parents(".dcbc-table-body-rank"),
            t = a.data("appid");
        e.find(".search-history-" + t).addClass("hover")
    }), $(document).on("mouseleave", "#dataCenter .dcb-content-table-keyword .dcbc-table-body-rank td", function() {
        var a = $(this),
            e = a.parents(".dcbc-table-body-rank");
        e.find("td").removeClass("hover")
    }), $(document).on("click", ".slide-down", function() {
        var a = $(this),
            e = a.parents(".list");
        a.addClass("slide-up").removeClass("slide-down").html('<i class="iconfont icon-xiangxia1"></i>展开'), e.removeClass("show").find(".app-data").removeClass("show show-animation").hide()
    }), $(document).on("click", ".slide-up", function() {
        var a = $(this),
            e = a.parents(".list"),
            t = e.find(".app-data"),
            n = isMobile ? e.offset().top - 49 + "rem" : e.offset().top - 57 + "px";
        setTimeout(function() {
            $("body").animate({
                scrollTop: n
            }, 380)
        }, 260), e.hasClass("data-ready") || (e.find(".spinner-box").addClass("show"), dataCenterLoadChartData(e)), a.addClass("slide-down").removeClass("slide-up").html('<i class="iconfont icon-xiangshang1"></i>收起'), e.addClass("show"), t.show().addClass("show-animation")
    }), $(document).on("webkitAnimationEnd", ".spinner-box", function() {
        var a = $(this);
        a.removeClass("show").removeClass("animation-hide")
    }), $(document).on("click", ".keyword-switch ul li", function(a) {
        var e = $(this);
        e.addClass("active").siblings().removeClass("active"), console.log(e.data("td"))
    });
    var we = !1;
    $(document).on("click", ".keyword-cover-info", function(a) {
        var e, t, n = $(this),
            i = $(".keyword-cover-rank-info .spinner-bg"),
            o = $(".keyword-cover-rank-info"),
            s = $(".charts"),
            r = o.find(".charts-select a.active").data("type") || 1;
        s.hide(), we ? e = $(".keyword-cover-rank-tr") : (e = $('<tr class="keyword-cover-rank-tr show-animation" style="display:none"><td colspan="6"></td></tr>'), e.find("td").html(o), e.insertAfter(n.parents("tr")), we = !0, o.show()), n.parents("tr").next().is(e) ? t = n.parents("tr").next().css("display") : (e.insertAfter(n.parents("tr")), t = "none"), "table-row" == t ? e.hide() : (e.show(), i.show()), $("html body").animate({
            scrollTop: n.parents("td").offset().top - 50 + "px"
        }, 500);
        var d = n.data("url");
        $.ajax({
            type: "get",
            url: d + "/type/" + r,
            success: function(a) {
                i.hide(), s.show();
                var e = a.data || {};
                drawCharts(e, o.find(".charts"))
            }
        })
    }), $(document).on("click", ".keyword-cover-rank-info .charts-select a", function(a) {
        a.preventDefault();
        var e = $(this);
        e.addClass("active").siblings().removeClass("active");
        var t = $(".keyword-cover-rank-info .spinner-bg"),
            n = $(".keyword-cover-rank-info"),
            i = $(".charts"),
            o = n.find(".charts-select a.active").data("type") || 1;
        t.show(), i.hide();
        var s = e.parents("tr").prev("tr").find(".keyword-cover-info").data("url");
        $.ajax({
            type: "get",
            url: s + "/type/" + o,
            success: function(a) {
                t.hide(), i.show();
                var e = a.data || {};
                drawCharts(e, n.find(".charts"))
            }
        })
    });
    var $e = $(".right-bottom-qrcode .qrcode");
    $(document).on("click", ".follow", function() {
        return $e.fadeIn(), !1
    }), $(document).on("click", function(a) {
        $e.is(":hidden") || $e.fadeOut()
    }), $(document).on("order.dt", "#mine-table", function() {
        var a = $(this),
            e = a.DataTable().order();
        if (!e.length) return !1;
        var t, n, i, o = e[0][0],
            s = e[0][1];
        t = a.find("th:eq(" + o + ")"), n = t.find(".icon-up"), i = t.find(".icon-down"), t.siblings().find(".icon").removeClass("active"), t.siblings().find(".iconfont").removeClass("active"), "asc" == s ? (n.addClass("active"), i.removeClass("active")) : (n.removeClass("active"), i.addClass("active"))
    }), $(document).on("order.dt", "#other-table", function() {
        var a = $(this),
            e = a.DataTable().order();
        if (!e.length) return !1;
        var t, n, i, o = e[0][0],
            s = e[0][1];
        t = a.find("th:eq(" + o + ")"), n = t.find(".icon-up"), i = t.find(".icon-down"), t.siblings().find(".icon").removeClass("active"), t.siblings().find(".iconfont").removeClass("active"), "asc" == s ? (n.addClass("active"), i.removeClass("active")) : (n.removeClass("active"), i.addClass("active"))
    });
    var Aa;
    $(document).on("click", ".app-list .media-info-history", function(a) {
        var e = $(this),
            t = e.data("wordid"),
            n = "ajaxurl",
            i = "querydata",
            o = e.parents(".media") || e.parents("div"),
            o = o.length > 0 ? o : e.parents("div");
        o.find(".sort-word a").html();
        p(t), n = window.keywordShowHourTab.isDefault + window.keywordShowHourTab.type + "ajaxurl", i = window.keywordShowHourTab.isDefault + "querydata";
        var s = $("#charts-ajax-data"),
            r = (s.data("thisurl"), s.data(n) + "/appid/" + e.data("appid")),
            d = s.data(i) || {};
        if ("string" == typeof d && (d = JSON.parse(d)), "undefined" == typeof window.chartData.list && (window.chartData.list = []), o.hasClass("chart-tr")) return $chartsDivBox.hide(), o.removeClass("chart-tr"), !1;
        Aa || ($chartsDivBox = $('<div class="media chart-tr"><div class="chart-box-div"></div></div>'), Aa = $("#charts-box"), $chartsDivBox.find(".chart-box-div").html(Aa)), Aa.find(".date-range-picker").map(function() {
            datePicker($(this))
        }), Aa.find("." + window.keywordShowHourTab.type).removeClass("hidden").siblings().addClass("hidden"), Aa.find(".nav-item-hour").data("ajaxurl", Aa.find(".nav-item-hour").data("ajaxurl") + "/appid/" + e.data("appid")), Aa.find(".nav-item-hour").data("defaultajaxurl", Aa.find(".nav-item-hour").data("defaultajaxurl") + "/appid/" + e.data("appid")), Aa.find(".nav-item-day").data("ajaxurl", Aa.find(".nav-item-day").data("ajaxurl") + "/appid/" + e.data("appid")), Aa.find(".nav-item-day").data("defaultajaxurl", Aa.find(".nav-item-day").data("defaultajaxurl") + "/appid/" + e.data("appid"));
        var c = Aa.find("#charts-ajax-data");
        c.data("ajaxurl", c.data("ajaxurl") + "/appid/" + e.data("appid")), c.data("defaultajaxurl", c.data("defaultajaxurl") + "/appid/" + e.data("appid")), c.data("defaulthourajaxurl", c.data("defaulthourajaxurl") + "/appid/" + e.data("appid")), c.data("defaultdayajaxurl", c.data("defaultdayajaxurl") + "/appid/" + e.data("appid")), c.data("thisurl", c.data("thisurl") + "/appid/" + e.data("appid")), $chartsDivBox.show(), Aa.show(), o.siblings().removeClass("chart-tr"), o.addClass("chart-tr").data("wordid", t), o.after($chartsDivBox), $chartsDivBox.addClass("show-animation").addClass("chart-tr");
        var l = isMobile ? o.offset().top - 49 + "rem" : o.offset().top - 57 + "px";
        setTimeout(function() {
            $("body").animate({
                scrollTop: l
            }, 380)
        }, 260), d.word_id = t;
        var u = e.data("appname"),
            h = u.indexOf("-") > 0 ? u.indexOf("-") : u.length;
        u = u.substr(0, h), $("#charts-appname").val(u), $("#charts-word").val(e.data("word")), window.chartData.titleDate = window.keywordShowHourTab.defaultLang, getChartsKeywordDataHour(r, d)
    }), $(document).on("click", ".app .platform-nav-tabs .addversion", function(a) {
        $(".add-android-ios-version").show()
    }), $(document).on("click", ".app .add-android-ios-version .icon-guanbi", function(a) {
        $(".add-android-ios-version").hide()
    }), $(document).on("click", ".app .add-android-ios-version .add-android-ios-version-sub", function(a) {
        var e = $(this),
            t = e.parents(".add-version-area").data("appid"),
            n = e.parents(".add-version-area").data("ajaxurl"),
            i = e.parents(".add-version-area").data("type"),
            o = e.siblings("textarea").val();
        return "" != o && ($(".add-android-ios-version").hide(), void $.ajax({
                url: n,
                type: "GET",
                dataType: "json",
                data: {
                    appid: t,
                    type: i,
                    link: o
                },
                success: function(a) {
                    a.data;
                    1e4 == a.code ? (swal({
                            title: "提交成功",
                            text: '<span style="color:#666; font-weight: 400;">&nbsp;&nbsp;&nbsp; 审核通过后，您将获得100积分，积分可用于兑换VIP特权 &nbsp;&nbsp;&nbsp;</span> <a href="/account/setting/type/settingJifen" style="color:#3e81bb; font-weight: 400;" target="_blank">积分中心</a>',
                            type: "success",
                            html: !0,
                            showConfirmButton: !0
                        }), e.siblings("textarea").val("")) : swal({
                            title: "提交失败",
                            text: '<span style="color:#666; font-weight: 400;">' + a.msg + "</span>",
                            html: !0,
                            type: "error",
                            showConfirmButton: !0
                        })
                }
            }))
    }), window.isMobile || $(document).on("click", ".wechat-switch > li.item", function(a) {
        a.preventDefault();
        var e = $(this);
        e.addClass("active").siblings().removeClass("active"), $("." + e.data("son")).show().siblings(".wechat-box").hide()
    }), $(document).on("click", ".wechat-switch a", function(a) {
        if (!isMobile) {
            a.preventDefault();
            var e = $(this),
                t = e.data("ajaxhref");
            u(t, function() {
                var a = $(".wechat-switch").data("ty");
                $(".ty" + a).addClass("active").siblings().removeClass("active"), Oe()
            })
        }
    }), $(document).on("click", ".wechat-display-one .img-icon .item-delete, .wechat-two .img-icon .item-delete, .wechat-display-three .img-icon .item-delete,.keyword-cover-use .app-list .img-icon .item-delete", function() {
        var a = $(this),
            e = a.data("appid"),
            t = a.data("subtype"),
            n = a.data("modifytype"),
            i = $(".appUrl").val(),
            o = {},
            s = a.parents(".app-list").is(".add-item-user-product") ? 0 : 1;
        return "noWechat" == t ? (i = $(".delUrl").val(), o = {
                app_id: e,
                "modify-type": n,
                type: t,
                compet: s
            }) : o = {
                app_id: e,
                "modify-type": n,
                type: t
            }, !a.hasClass("remove-ing") && (a.addClass("remove-ing"), void ajaxRequestAction(a, ye, o, i))
    }), $(document).on("click", ".alert-app .img-icon .item-delete", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.parents(".alert-app"),
            n = e.parents("li"),
            i = e.data("appid"),
            o = e.data("modifytype"),
            s = t.data("subtype"),
            r = $(".appUrl").val(),
            d = {},
            c = "";
        return ($(".alert-app-user-product").length || $(".alert-app-user-compet").length) && (c = e.parents(".alert-app").is(".alert-app-user-product") ? 0 : 1), $(".keyword-cover-use-adjust").length && (c = 1), "noWechat" == s ? (r = $(".delUrl").val(), d = {
                app_id: i,
                "modify-type": o,
                type: s,
                compet: c
            }) : d = {
                app_id: i,
                type: s,
                "modify-type": o
            }, !e.hasClass("remove-ing") && (e.addClass("remove-ing"), void ajaxRequestAction(e, function(a, e, t) {
            if (1e4 != a.code) swal(a.msg);
            else {
                n.remove();
                var r = window.isMobile ? 5 : 6,
                    d = $(".alert-app-top-main li").length,
                    c = ($(".left-arrow"), $(".right-arrow"));
                if (d <= r && c.hide(), $(".alert-app-plan-create").length) {
                    $(".plan .product-box");
                    $('.plan .product-list li[data-appid="' + i + '"]').remove()
                } else e = $('.item-delete[data-appid="' + i + '"][data-subtype="' + s + '"][data-modifytype="' + o + '"]'), ke(e, t)
            }
        }, d, r))
    });
    var ye = function(a, e, t) {
            return 1e4 != a.code ? (swal(a.msg), !1) : void ke(e, t)
        },
        ke = function(a, e) {
            var t = $(".wechat-switch li.active").find(".wechat-close"),
                n = $(".wechat-switch li.active").find(".wechat-open");
            if ($(".alert-default-list .myapp-info-item-" + e.app_id).removeClass("hidden"), 2 == e.type) a.parents(".img-icon").fadeOut(200, function() {
                $(this).remove();
                var a = $(".wechat-remind-one .img-icon"),
                    e = $(".select-one-time input:checked"),
                    i = $(".wechat-display-one .add-item-two .content-row");
                !a.length && e.length ? ($(".wechat-remind-one .unsubscribe").addClass("del-source").trigger("click"), i.length || (t.show(), n.hide())) : e.length || i.length || (t.show(), n.hide())
            });
            else if (3 == e.type || 5 == e.type) {
                var i = a.parents(".push-content").siblings(".push-time").find(".unsubscribe");
                removeEl = 3 == e.type ? a.parents(".content-row") : a.parents(".img-icon"), checkeEl = 3 == e.type ? a.parents(".add-item-three") : a.parents(".app-list"), removeEl.fadeOut(200, function() {
                    $(this).remove(), checkeEl.find(".img-icon").length || ($(".select-time input:checked").length && i.addClass("del-source").trigger("click"), t.show(), n.hide())
                })
            } else if (4 == e.type) {
                a.parents(".content-row").remove();
                var o = $(".select-one-time input:checked"),
                    s = $(".wechat-display-one .add-item-two .content-row");
                s.length || o.length || (t.show(), n.hide())
            } else "noWechat" == e.type ? a.parents(".app-list").is(".add-item-plan") ? (a.parents("tr").remove(), resetTableIndex(a.parents("tbody"))) : (a.parents(".img-icon").fadeOut(200, function() {
                        $(this).remove()
                    }), a.parents(".app-list").is(".add-item-user-product") ? $(".add-item-user-product").find(".img-icon").length <= 1 && $(".keyword-cover-use .add-content-mine").show() : a.parents(".app-list").is(".add-item-user-compet") ? $(".add-item-user-compet").find(".img-icon").length <= 3 && $(".keyword-cover-use .add-content-other").show() : a.parents(".app-list").is(".adjust-app") && $(".adjust-app").find(".img-icon").length <= 3 && $(".keyword-cover-use-adjust .add-content-adjust").show()) : swal(Lang.operation_exception)
        },
        xe = function(a, e) {
            var t, n = [],
                i = a.parents(".select-time").data("subtype"),
                o = $(".remindUrl").val(),
                s = a.parents(".select-time");
            if (t = 5 == i ? 1 : 3, s.find('input[name="push-time"]:checked').each(function(a, e) {
                    n[a] = parseInt($(e).val())
                }), n.length >= t) {
                if (s.hasClass("disabled") || s.addClass("disabled"), n.length > t) return a.prop("checked", !1), !1
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
                if (e) e(t);
                else if (1e4 != t.code) return swal(t.msg), !1;
                a.attr("disabled", !1)
            }).fail(function() {
                swal(Lang.request_error)
            })
        };
    $(document).on("click", ".select-time li input", function(a) {
        var e = $(this),
            t = e.parents("li").find(".success-signal").length ? e.parents("li").find(".success-signal") : '<span class="success-signal none"><i class="iconfont icon-chenggong"></i>保存成功</span>',
            n = e.parents(".push-time"),
            i = n.find(".unsubscribe"),
            o = $(".wechat-switch li.active"),
            s = e.parents(".select-time").data("subtype");
        return !_e() && (e.is(":checked") || e.parents(".select-time").find("input:checked").length ? !n.siblings(".push-content").find(".img-icon").length && e.is(":checked") ? (swal({
                        title: Lang.setting_subscribe_add_title,
                        showCancelButton: !0,
                        confirmButtonText: Lang.setting_subscribe_add_text
                    }, function() {
                        $('.wechat-content .add-content[data-subtype="' + s + '"]').trigger("click")
                    }), !1) : void xe(e, function(a) {
                        return 1e4 != a.code ? (swal(a.msg), !1) : (e.is(":checked") && (e.parents("li").append($(t)), e.parents("li").find(".success-signal").fadeIn(), setTimeout(function() {
                                e.parents("li").find(".success-signal").hide()
                            }, 1200)), void(e.parents(".select-time").find("li input:checked").length ? (i.show(), o.find(".wechat-close").hide().end().find(".wechat-open").show()) : "wechat-display-one" == o.data("son") ? ($(".lists-change .wechat-one-table .content-row").length || o.find(".wechat-close").show().end().find(".wechat-open").hide(), i.hide()) : (i.hide(), o.find(".wechat-close").show().end().find(".wechat-open").hide())))
                    }) : (a.preventDefault(), $(".alert-subscribe-remind").show().data("subtype", s), !1))
    }), $(document).on("click tap", ".wechat-remind-one .push-time .unsubscribe, .wechat-display-two .push-time .unsubscribe, .wechat-remind-two .push-time .unsubscribe", function() {
        var a, e, t, n = $(this),
            i = n.siblings(".select-time"),
            a = i.data("subtype");
        return !!a && (t = $(".remindUrl").val(), e = {
                type: a,
                remind: [],
                reason: []
            }, n.hasClass("del-source") ? (n.removeClass("del-source"), i.find("input:checked").length && ajaxRequestAction(n, Ce, e, t)) : $(".alert-subscribe-remind").show().data("subtype", a), !1)
    }), $(document).on("click", ".alert-subscribe-remind .cancel", function() {
        $(".alert-subscribe-remind").hide(), $('.alert-subscribe-remind-box .reason-form input[name="reason"]:checked').prop("checked", !1)
    }), $(document).on("click", ".alert-subscribe-remind .confirm", function() {
        var a = $(this),
            e = a.parents(".alert-subscribe-remind"),
            t = e.data("subtype"),
            n = $(".remindUrl").val(),
            i = [],
            o = {};
        o = {
            type: t,
            remind: [],
            reason: []
        }, e.find('.alert-subscribe-remind-box .reason-form input[name="reason"]:checked').each(function(a, e) {
            i.push($(e).val())
        }), o.reason = i.join(","), ajaxRequestAction(a, Ce, o, n)
    });
    var Ce = function(a, e, t) {
        if (1e4 != a.code) return swal(a.msg), !1;
        var n = $(".wechat-display-one .add-item-two .content-row"),
            i = $(".select-time"),
            o = $(".wechat-switch .active").find(".wechat-close"),
            s = $(".wechat-switch .active").find(".wechat-open");
        i.find("input").prop({
            checked: !1
        }), i.find("input").siblings(".success-signal").removeClass("fade"), i.hasClass("disabled") && i.removeClass("disabled"), i.siblings(".unsubscribe").hide(), o.show(), s.hide(), 2 == t.type && n.length && (s.show(), o.hide()), $(".alert-subscribe-remind").length && ($(".alert-subscribe-remind").hide(), $('.alert-subscribe-remind-box .reason-form input[name="reason"]:checked').prop("checked", !1))
    };
    $(document).on("click", ".one-select ul li", function() {
        var a = $(this),
            e = a.parents(".one-select"),
            t = a.parents(".content-row"),
            n = t.find(".td-one .img-icon").data("appid"),
            i = a.parents("ul").data("paramname"),
            o = $(".appFluxUrl").val(),
            s = a.text(),
            r = {};
        r = {
            param: s,
            paramName: i,
            app_id: n
        }, ajaxRequestAction(a, function() {
            e.find(".num").html(a.html()), e.removeClass("active"), e.find(".select-drop-list").hide()
        }, r, o)
    }), $(document).on("mouseover mouseout click", ".push-content-two-info .followed ul li:not(:last-child) ,.alert-keyword .alert-keyword-top ul li ", function(a) {
        var e = $(this);
        if ("mouseover" == a.type) e.find("i").show();
        else if ("mouseout" == a.type) e.find("i").hide();
        else if ("click" == a.type) {
            var t, n = e.data("appid"),
                i = e.data("wordid"),
                o = $(".delCustomUrl").val();
            t = {
                appid: n,
                word_id: i
            }, ajaxRequestAction($(this), function(a, e) {
                $('li[data-wordid="' + i + '"][data-appid="' + n + '"]').remove();
                var t = $('.push-content-two-info .content-row[data-appid="' + n + '"]'),
                    o = t.find(".td-two li").length;
                1 == o && (t.removeClass("followed").addClass("notfollow"), t.find(".td-two ul li").before('<li class="not-follow-info">未关注关键词。</li>'))
            }, t, o)
        }
    }), $(document).on("click", ".not-disturb", function(a) {
        var e = $(this),
            t = e.data("appid"),
            n = e.data("subtype"),
            i = e.is(":checked") ? 1 : 0,
            o = $(".disturbUrl").val(),
            s = {};
        s = {
            app_id: t,
            type: n,
            status: i
        }, ajaxRequestAction(e, "", s, o)
    }), $(document).on("click", ".wechat-display-four ul li>a,.wechat-display-five ul li>a", function() {
        var a, e, t = $(this),
            n = $(".timeingPushUrl").val(),
            i = t.data("type"),
            o = t.data("son"),
            s = t.hasClass("remove") ? 1 : 0;
        if (_e()) return !1;
        if (e = {
                type: i,
                modifytype: s,
                reason: []
            }, a = function() {
                $.ajax({
                    type: "POST",
                    data: e,
                    url: n,
                    success: function(a) {
                        1e4 == a.code ? (t.hasClass("remove") ? (t.removeClass("remove").html(Lang.subscribe_btn), $("li[data-son=" + o + "]").find(".wechat-close").show().end().find(".wechat-open").hide()) : (t.addClass("remove").html(Lang.unsubscribe_btn), $("li[data-son=" + o + "]").find(".wechat-close").hide().end().find(".wechat-open").show()), $(".alert-subscribe-remind").hide()) : 81004 == a.code ? swal({
                                    title: a.title,
                                    type: "error",
                                    showCancelButton: !0,
                                    confirmButtonColor: "#33ba95",
                                    confirmButtonText: Lang.certified_btn,
                                    cancelButtonColor: "#33ba95",
                                    cancelButtonText: Lang.cancel_btn,
                                    html: !0
                                }, function(a) {
                                    a && (document.location.href = "/account/setting/type/settingInvestor")
                                }) : swal({
                                    title: a.msg,
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
                return r.find('input[name="reason"]:checked').each(function(a, e) {
                    t.push($(e).val())
                }), e.reason = t.join(","), a(), l.unbind("click"), !1
            })
        } else a()
    });
    var _e = function() {
        var a = $(".wechat-bind-btn"),
            e = a.data("isbind");
        return !e && (isMobile ? swal({
                    title: "绑定后可添加微信订阅",
                    html: !0,
                    showCancelButton: !0,
                    confirmButtonText: "立即绑定"
                }, function() {
                    a.trigger("click")
                }) : a.trigger("click"), !0)
    };
    window.alertMyAppInit = function() {
        if ($(".alert-app").find(".alert-default-list").length >= 1) {
            var a = $(".alert-app .alert-default-list"),
                e = "";
            $.ajax({
                type: "GET",
                url: "/base/_getMyAppsAjax",
                success: function(t) {
                    1e4 == t.code && t.data && $.each(t.data, function(t, n) {
                        e = '<li class="myapp-info-item myapp-info-item-' + t + '"><a data-appid="' + n.app_id + '" data-type="post" href="javascript:;"><img src="' + n.icon + '" alt="' + n.app_name + '"><div class="addapp-info right"><p>' + n.app_name + "</p><p>" + n.publisher + "</p></div></a></li>", a.append(e)
                    })
                }
            })
        }
    }, alertMyAppInit(), $(document).on("click", ".settingSubscribe .add-content,.settingEmailSub .add-content,.keyword-cover-use .add-content-mine,.keyword-cover-use .add-content-other,.keyword-cover-use-adjust .add-content-adjust,.plan .add-content", function() {
        var a, e = $(this),
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
            u = $(".add-item-plan"),
            h = $(".add-item-plan-create"),
            m = e.data("subtype");
        if ("noWechat" != m && _e()) return !1;
        t.removeClass("alert-app-one alert-app-two alert-app-three alert-app-four alert-app-email alert-app-user-product alert-app-plan alert-app-user-adjust alert-app-plan-create"), e.hasClass("add-content-one") && t.addClass("alert-app-one"), e.hasClass("add-content-two") && t.addClass("alert-app-two"), e.hasClass("add-content-three") && t.addClass("alert-app-three"), e.hasClass("add-content-four") && t.addClass("alert-app-four"), e.hasClass("add-content-email") && t.addClass("alert-app-email"), e.hasClass("add-content-plan") && t.addClass("alert-app-plan"), e.hasClass("add-content-mine") && t.addClass("alert-app-user-product"), e.hasClass("add-content-other") && t.addClass("alert-app-user-compet"), e.hasClass("add-content-adjust") && t.addClass("alert-app-user-adjust"), e.hasClass("add-content-plan-create") && t.addClass("alert-app-plan-create"), n.hasClass("alert-app-one") && (a = i.find(".img-icon")), n.hasClass("alert-app-two") && (a = o.find(".img-icon")), n.hasClass("alert-app-three") && (a = s.find(".img-icon")), n.hasClass("alert-app-four") && (a = r.find(".img-icon")), n.hasClass("alert-app-email") && (a = d.find(".img-icon")), n.hasClass("alert-app-plan") && (a = u.find(".img-icon")), n.hasClass("alert-app-user-product") && (a = c.find(".img-icon")), n.hasClass("alert-app-user-compet") && (a = l.find(".img-icon")), n.hasClass("alert-app-user-adjust") && (a = p.find(".img-icon")), n.hasClass("alert-app-plan-create") && (a = h.find(".img-icon")), t.find(".alert-app-top-main").empty(), t.data("subtype", m), $(".alert-default-list .myapp-info-item").removeClass("hidden");
        var f = a.length;
        if (0 == f) {
            if (e.hasClass("add-content-mine")) var g = '<p class="null-info">未选择任何产品</p>';
            else if (e.hasClass("add-content-other") || e.hasClass("add-content-adjust")) var g = '<p class="null-info">未选择任何竞品</p>';
            else if (e.hasClass("add-content-plan")) var g = '<p class="null-info">未添加应用~</p>';
            else var g = '<p class="null-info">未添加订阅应用~</p>';
            t.find(".alert-app-top-main").append(g), t.find(".alert-app-top-main").css("-webkit-transition", "initial")
        } else t.find(".alert-app-top-main").css("-webkit-transition", "all 400ms"), e.hasClass("add-content-plan") ? a.each(function(a, e) {
                var n = $(e).data("appid"),
                    i = $(e).data("appname"),
                    o = $(e).find("img").attr("src");
                $(".alert-default-list .myapp-info-item-" + n).addClass("hidden");
                var s = '<img src="' + o + '" alt="' + i + '"><p><a class="app-name" target="_blank" href="javascript:;">' + i + '</a></p><a class="item-delete" data-appid="' + n + '" data-subtype="noWechat" data-modifytype="remove" data-type="post" data-url=""><i class="iconfont icon-guanbi"></i></a>',
                    r = '<li><div class="img-icon">' + s + "</div></li>";
                t.find(".alert-app-top-main").append(r)
            }) : e.hasClass("add-content-plan-create") ? a.each(function(a, e) {
                    var n = $(e).data("appid"),
                        i = $(e).find("a").html(),
                        o = $(e).find("img").attr("src");
                    $(".alert-default-list .myapp-info-item-" + n).addClass("hidden");
                    var s = '<img src="' + o + '" alt="' + i + '"><p><a class="app-name" target="_blank" href="javascript:;">' + i + '</a></p><a class="item-delete" data-appid="' + n + '" data-subtype="noWechat" data-modifytype="remove" data-type="post" data-url=""><i class="iconfont icon-guanbi"></i></a>',
                        r = '<li><div class="img-icon">' + s + "</div></li>";
                    t.find(".alert-app-top-main").append(r)
                }) : a.each(function(a, e) {
                    var n = $(e).data("appid");
                    $(".alert-default-list .myapp-info-item-" + n).addClass("hidden");
                    var i = '<li><div class="img-icon">' + $(e).html() + "</div></li>";
                    t.find(".alert-app-top-main").append(i)
                });
        e.hasClass("add-content-mine") ? t.find(".alert-app-title").html("选择您的产品") : (e.hasClass("add-content-other") || e.hasClass("add-content-adjust")) && t.find(".alert-app-title").html("选择您的竞品");
        var v;
        v = window.isMobile ? 5 : 6, $(".alert-app-top-main li").length <= v ? $(".app-arrow").hide() : $(".app-arrow").show(), $(".alert-app-top-main").css("webkit-transform", "translateX(0)").data("left", 0), t.find(".left-arrow").hide(), t.find(".img-icon>img").removeAttr("title"), t.fadeIn(400), $(".alert-app-bk").fadeIn(400), window.isMobile || $("body").css({
            overflow: "hidden"
        });
        var b = $(".alert-app-top-main");
        b.css("width", $(".show-app-top-main").css("width")), b.find("li").length > 5 && (ulMinWidth = b.find("li").length * (getInt(b.find("li").css("width")) + getInt(b.find("li:not(:first-child)").css("marginLeft"))), b.css("width", ulMinWidth + "px"));
        var w = $('.alert-app .alert-app-search input[name="word"]'),
            y = $(".alert-app .alert-app-list"),
            k = $(".alert-app .alert-hide-item");
        $(".alert-app .alert-default-list");
        k.hide(), y.empty(), w.val(""), search(w)
    }), $(document).on("submit", ".alert-app .alert-app-search-form", function(a) {
        a.preventDefault(), Le($(this))
    }), $(document).on("click", ".alert-app .alert-app-search-form .alert-app-search-btn", function(a) {
        a.preventDefault(), $(this).parents(".alert-app-search-form").submit()
    }), $(document).on("click", ".alert-app .alert-app-page-btn .paging-btn", function(a) {
        a.preventDefault(), Le($(this))
    });
    var Le = function(a) {
        if (competiGetDataRun) return !1;
        var e = a.parents(".alert-app"),
            t = e.find(".alert-app-search-form"),
            n = e.find(".spinner"),
            i = e.find(".alert-app-list"),
            o = e.find(".alert-app-page-btn"),
            s = o.data("page"),
            r = e.find(".alert-hide-item"),
            d = t.find("input[name=word]").val(),
            c = e.data("subtype");
        if (!d || "" == d) return !1;
        if (a.hasClass("alert-app-search-form")) s = 1, o.data("page", s);
        else {
            if (s = a.hasClass("pre-page") ? --s : ++s, a.hasClass("disabled")) return !1;
            o.data("page", s)
        }
        Ba = t.prop("action"), n.show(), competiGetDataRun = !0, $.ajax({
            type: "get",
            url: Ba,
            data: {
                search: d,
                page: s,
                type: c
            },
            dataType: "json",
            success: function(a) {
                competiGetDataRun = !1, n.hide(), maxPage = a.maxPage, maxPage ? (r.show(), o.data("maxpage", maxPage), i.html(a.data), maxPage > 1 ? (o.show(), 1 == s ? o.find(".pre-page").addClass("disabled").prop("disabled", !0) : s == maxPage ? o.find(".next-page").addClass("disabled").prop("disabled", !0) : o.find(".paging-btn").removeClass("disabled").prop("disabled", !1)) : o.hide()) : (i.html('<p class="text-center">' + Lang.no_data_1 + "</p>"), o.hide())
            }
        })
    };
    $(document).on("click", ".alert-app-close", function() {
        var a = $(this);
        $(".alert-app").fadeOut(400), $("body").css({
            overflow: "visible"
        }), a.parents(".alert-app").is(".alert-app-plan-create") && (location.href = "/plan/create")
    });
    var Te = !1;
    $(document).on("click tap", ".right-arrow", function() {
        var a = $(this);
        return T(a), !1
    });
    var De = !1;
    $(document).on("click tap", ".left-arrow", function() {
        var a = $(this);
        return D(a), !1
    }), $(document).on("click", ".alert-app .not-focus,.alert-app .alert-default-list li a", function() {
        var a, e = $(this),
            t = e.data("appid"),
            n = e.parents(".alert-app").data("subtype"),
            i = "",
            o = e.parents(".alert-app").is(".alert-app-user-product") ? 0 : 1;
        return "noWechat" == n ? (i = $(".addUrl").val(), a = {
                app_id: t,
                type: n,
                compet: o
            }) : (i = $(".appUrl").val(), a = {
                app_id: t,
                type: n
            }), !e.hasClass("add-ing") && (e.addClass("add-ing"), void ajaxRequestAction(e, Se, a, i))
    });
    var Se = function(a, e, t) {
        if (e.removeClass("add-ing"), 1e4 != a.code) return swal(a.msg), !1;
        var n, i, o, s, r;
        slider = $(".alert-app-top-main"), sliderLeft = slider.data("left") || 0, moveDistance = slider.find("li").length > 1 ? getInt(slider.find("li").css("width")) + getInt(slider.find("li:not(:first-child)").css("marginLeft")) : getInt(slider.find("li").length ? slider.find("li").css("width") : $(".show-app-top-main").css("width")), e.parents("li").hasClass("myapp-info-item") ? (o = e, e.parents("li").addClass("hidden"), window.isMobile || e.parents(".alert-default-list").hide()) : (o = e.parents("li"), e.removeClass("not-focus").addClass("focused"), $(".alert-default-list .myapp-info-item-" + t.app_id).addClass("hidden")), n = o.find("img").attr("src"), i = o.find(".addapp-info p:first-child()").text(), sliderLeft -= moveDistance, Te = !1, s = '<div class="img-icon" data-appid="' + t.app_id + '"><img src="' + n + '" alt="' + i + '"><p><a target="_blank" href="/app/rank/appid/' + t.app_id + '">' + i + '</a></p><div class="item-delete" data-appid="' + t.app_id + '" data-type="post" data-subtype="' + t.type + '" data-modifytype="remove"><i class="iconfont icon-guanbi"></i></div></div>', r = "<li>" + s + "</li>", slider.find("p.null-info").length && slider.empty(), slider.append($(r));
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
                a.keywordList.length ? ($.each(a.keywordList, function(a, e) {
                        h += '<li data-wordid="' + e.word_id + '" data-appid="' + t.app_id + '"><a href="javascript:;">' + e.word + '</a><i class="iconfont icon-guanbi"></i></li>'
                    }), h += '<li class="mobile-hide"><a href="javascript:;" class="add-keyword" data-subtype="3"><i class="iconfont icon-tianjia"></i>添加</a></li>', m = "followed") : h = '<li class="not-follow-info">未关注关键词。</li><li><a href="javascript:;" class="add-keyword mobile-hide"><i class="iconfont icon-tianjia "></i>添加</a></li>', s = '<div class="content-row ' + m + '" data-appid="' + t.app_id + '"><div class="td td-one">' + s + '<div class="mobile-add-keyword pc-hide"><a href="javascript:;" class="add-keyword" data-subtype="3"><i class="iconfont icon-tianjia"></i>添加关键词</a></div></div><div class="td td-two"><ul>' + h + "</ul></div></div>", $(".add-item-three").append($(s));
                break;
            case 4:
                var f = $(".lists-change .content-row-copy").html();
                f = f.replace(/###APPELINFO###/g, s), f = f.replace(/###APPID###/g, t.app_id), $(".add-item-two").append($(f)), $(".wechat-switch li.active").find(".wechat-close").hide().end().find(".wechat-open").show();
                break;
            case "noWechat":
                if (e.parents(".alert-app").is(".alert-app-plan")) {
                    order_btn = a.data.price > 1 ? "" : '<a href="javascript:;" data-appid="' + t.app_id + '" class="solid-btn add-order">下单</a>', a.data.price > 1 ? (a.data.app_search_price = "-", a.data.app_download_price = "-", order_btn = '<a href="javascript:;" onclick="swal(\'抱歉，应用价格大于1元的 App 暂不支持投放。\');" class="solid-btn add-order gray">下单</a>') : order_btn = '<a href="/plan/create/appid/' + t.app_id + '" data-target="create" class="solid-btn add-order a-pjax">下单</a>', s = '<tr><td class="num">N</td><td class="appinfo"><div class="app-detail"><a target="_blank" href="/app/rank/appid/' + t.app_id + '" class="img-icon" alt="' + i + '" data-appname="' + i + '" data-appid="' + t.app_id + '"><img src="' + n + '" class="icon"></a></div><div class="app-detail app-name"><a target="_blank" href="/app/rank/appid/' + t.app_id + '">' + i + '</a></div><div class="app-detail app-id"><a target="_blank" href="/app/rank/appid/' + t.app_id + '">' + t.app_id + "</a></div></td><td>" + a.data.app_search_price + "</td><td>" + a.data.app_download_price + "</td><td>" + a.data.rankInfo.rank_a_html + "</td><td>" + a.data.rankInfo.rank_c_html + '</td><td class="operate">' + order_btn + '<a href="javascript:;" data-appid="' + t.app_id + '" class="solid-btn del-app item-delete" data-subtype="noWechat" data-modifytype="remove">删除</a></td></tr>';
                    var g = $(".plan .table .add-item-plan");
                    g.append($(s)), resetTableIndex(g)
                } else if (e.parents(".alert-app").is(".alert-app-plan-create")) {
                    var s = '<li class="img-icon" data-appid="' + t.app_id + '"><a href="/plan/create/appid/' + t.app_id + '">' + i + '</a><img src="' + n + '" class="hide"></li>',
                        v = $(".plan .product-list");
                    v.append($(s))
                } else {
                    var b = $(".delUrl").val();
                    if (s = '<div class="img-icon" data-appid="' + t.app_id + '"><img src="' + n + '" alt="' + i + '"><p><a target="_blank" href="/app/rank/appid/' + t.app_id + '">' + i + '</a></p><a class="item-delete" data-url="' + b + "/appid/" + t.app_id + '" data-appid="' + t.app_id + '" data-type="post" data-subtype="' + t.type + '" data-modifytype="remove"><i class="iconfont icon-guanbi"></i></a></div>', r = "<li>" + s + "</li>", e.parents(".alert-app").is(".alert-app-user-product")) return $(".keyword-cover-use .add-item-user-product").append($(s)), $(".add-item-user-product").find(".img-icon").length >= 1 && $(".keyword-cover-use .add-content-mine").hide(), !1;
                    if (e.parents(".alert-app").is(".alert-app-user-compet")) return $(".keyword-cover-use .add-item-user-compet").append($(s)), $(".add-item-user-compet").find(".img-icon").length >= 3 && $(".keyword-cover-use .add-content-other").hide(), !1;
                    e.parents(".alert-app").is(".alert-app-user-adjust") && $(".adjust-app").find(".img-icon").length >= 2 && $(".keyword-cover-use-adjust .add-content-adjust").hide(), $(".content-item .app-list").append($(s))
                }
        }
        $(".select-time input:checked").length || $(".select-time li:eq(1) input").trigger("click")
    };
    $(document).on("click", ".wechat-two-content .add-keyword", function() {
        var a, e, t, n, i, o = $(this),
            s = $(".alert-keyword"),
            r = $(".alert-keyword-search img"),
            d = $(".alert-keyword-search .app-name"),
            c = $(".alert-keyword-bottom tbody.content-tbody"),
            l = $(".alert-keyword-bottom tbody.no-data-tbody"),
            p = $(".alert-keyword-bottom .show-more-keyword"),
            u = o.parents(".content-row"),
            h = u.find(".td-one");
        l.show(), c.hide(), a = h.find(".img-icon").data("appid"), t = h.find(".img-icon p").html(), e = h.find(".img-icon img").attr("src"), d.data("appid", a), d.html(t), r.attr("src", e), p.find("a").attr("href", p.find("a").data("href") + a), s.find(".alert-keyword-top ul").empty();
        var m = u.find(".td-two ul li.not-follow-info").length;
        1 == m ? (n = '<p class="null-info">未关注关键词~</p>', s.find(".alert-keyword-top ul").append(n)) : (n = u.find(".td-two ul").clone(), n.find("li.not-follow-info").length || (n.find("li:last").remove(), s.find(".alert-keyword-top ul").append(n.html()))), $.ajax({
            url: $(".getAppWordUrl").val(),
            type: "GET",
            dataType: "json",
            data: {
                appid: a
            }
        }).done(function(a) {
            1e4 != a.code ? swal(a.msg) : (i = "", $.each(a.keywordList, function(a, e) {
                    i += "<tr><td>" + e.word + "</td><td>" + e.ranking + "</td><td>" + e.hints + '</td><td><a href="javascript:;" data-keyword="' + e.word + '"><i class="iconfont icon-add"></i>添加</a></td></tr>'
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
        var a, e = $(this).parent(".alert-keyword table tr td:nth-child(4)"),
            t = $(".alert-keyword-search p.app-name").data("appid"),
            n = e.parent().find("td:nth-child(1)").html();
        return !e.hasClass("clicked") && (a = {
                keyword: n,
                appid: t
            }, void je(a, e))
    }), $(document).on("click", ".alert-keyword-container .add-btn", function() {
        var a, e = $(this),
            t = $(".alert-keyword-search p").data("appid"),
            n = e.siblings("input").val();
        a = {
            keyword: n,
            appid: t
        }, je(a, e)
    });
    var je = function(a, e) {
        return !e.hasClass("add-ing") && (e.addClass("add-ing"), void $.ajax({
                url: $(".addCustomKeywordUrl").val(),
                type: "post",
                data: a
            }).success(function(t) {
                if (e.removeClass("add-ing"), 1e4 == t.code) {
                    var n, i = $(".alert-keyword ul"),
                        o = $('.content-row[data-appid="' + a.appid + '"]');
                    i.find("p.null-info").length && i.empty(), e.hasClass("add-btn") || (e.addClass("clicked"), e.find("a").html("已添加"), o.hasClass("notfollow") && o.removeClass("notfollow").addClass("followed"), o.find("li.not-follow-info") && o.find("li.not-follow-info").remove()), n = "<li data-wordid=" + t.id + " data-appid=" + a.appid + '><a href="javascript:;">' + a.keyword + '</a><i class="iconfont icon-guanbi"></i></li>', i.append($(n)), o.find("li:last-child").before($(n))
                } else 40002 == t.code ? showOpenVipSwal(t.msg) : swal(t.msg)
            }))
    };
    $(document).on("focus", ".alert-app-search input", function() {
        if ($(this).val()) return !1;
        var a = $(".alert-default-list");
        a.find(".myapp-info-item:not(.hidden)").length && a.show()
    }), $(document).on("input", ".alert-app-search input", function() {
        var a = $(this),
            e = $(".alert-default-list");
        a.val() ? e.hide() : e.show()
    }), $(document).on("click", ".wechat-switch li.item", function() {
        var a = $(this),
            e = a.find("i"),
            t = $(".wechat-switch .open-one"),
            n = $(".wechat-switch .open-two");
        "wechat-display-four" == a.data("son") && (t.hasClass("active") ? t.removeClass("active") : t.addClass("active")), "wechat-display-five" == a.data("son") && (n.hasClass("active") ? n.removeClass("active") : n.addClass("active")), e = a.find("i"), e.hasClass("arrow-bottom") ? e.removeClass("arrow-bottom") : e.addClass("arrow-bottom")
    });
    var Be = function() {
            var a = window.navigator.userAgent,
                e = a.indexOf("MSIE ");
            if (e > 0) return parseInt(a.substring(e + 5, a.indexOf(".", e)), 10);
            var t = a.indexOf("Trident/");
            if (t > 0) {
                var n = a.indexOf("rv:");
                return parseInt(a.substring(n + 3, a.indexOf(".", n)), 10)
            }
            var i = a.indexOf("Edge/");
            return i > 0 && parseInt(a.substring(i + 5, a.indexOf(".", i)), 10)
        },
        Ie = function() {
            if (window.isMobile) return !1;
            var a = $(".wechat-switch").data("ty"),
                e = 20;
            Be() && (e = 0), 0 != a && 2 != a || Sortable.create($(".add-item-one .sortable-list")[0], {
                handle: "img",
                delay: e,
                draggable: ".img-icon",
                ghostClass: "placeholder-item",
                onEnd: function(a) {
                    t(a, 2)
                }
            }), 0 != a && 3 != a || Sortable.create($(".add-item-two")[0], {
                handle: "img",
                delay: e,
                draggable: ".content-row",
                ghostClass: "placeholder-item",
                filter: ".title-row",
                onEnd: function(a) {
                    t(a, 4)
                }
            }), 4 == a && Sortable.create($(".add-item-three")[0], {
                handle: "img",
                delay: e,
                ghostClass: "placeholder-item",
                draggable: ".content-row",
                filter: ".title-row",
                onEnd: function(a) {
                    t(a, 3)
                }
            }), 5 == a && Sortable.create($(".add-item-four .sortable-list")[0], {
                handle: "img",
                delay: e,
                ghostClass: "placeholder-item",
                draggable: ".img-icon",
                onEnd: function(a) {
                    t(a, 5)
                }
            });
            var t = function(a, e) {
                var t, n = $(a.to),
                    i = [];
                a.oldIndex > a.newIndex ? (minIndex = a.newIndex, maxIndex = a.oldIndex) : (minIndex = a.oldIndex, maxIndex = a.newIndex), $.map(n.find(".img-icon"), function(a, e) {
                    e >= minIndex && e <= maxIndex && (t = $(a).data("appid"), i.push([t, e + 1]))
                }), params = {
                    type: e,
                    sort: i
                }, $.ajax({
                    url: $(".subscribeAppSortUrl").val(),
                    type: "POST",
                    dataType: "json",
                    data: params
                }).done(function(a) {
                    1e4 != a.code && swal(a.msg)
                }).fail(function() {
                    swal(Lang.request_error)
                })
            }
        };
    $(document).on("click", ".add-item-two .one-select", function() {
        var a = $(this);
        a.addClass("active"), a.find(".select-drop-list").show()
    }), $(document).on("click", ".alert-app-bk", function() {
        var a = $(this);
        a.hide(), $(".alert-app").hide(), $("body").css("overflow", "visible"), a.parents(".alert-app").is(".alert-app-plan-create") && (location.href = "/plan/create")
    });
    var Oe = function() {
            Ie(), Me()
        },
        Me = function() {
            var a = $(".show-guide").val();
            1 == a && ($(".alert-guide").show(), $("body").css("overflow", "hidden"))
        },
        Pe = 1;
    $(document).on("click", ".settingSubscribe .alert-guide", function() {
        var a = $(this),
            e = $(".subscribeGuidLogUrl").val(),
            t = $(".alert-guide .step"),
            n = $(".alert-guide .step-one"),
            i = $(".alert-guide .step-two"),
            o = $(".alert-guide .step-three");
        switch (t.removeClass("active"), Pe++, Pe) {
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
                a.hide(), $.post(e)
        }
    }), $(document).on("click", ".email-sub .img-icon .item-delete", function() {
        var a = $(this),
            e = (a.data("appid"), a.data("url")),
            t = [];
        return !a.hasClass("remove-ing") && (a.addClass("remove-ing"), void ajaxRequestAction(a, Re, t, e))
    });
    var Re = function(a, e, t) {
        return 1e4 != a.code ? (swal(a.msg), e.removeClass("remove-ing"), !1) : void e.parent(".img-icon").remove()
    };
    if ($(document).on("click", "#beecloud-pay-type a", function(a) {
            var e = $(this);
            e.hasClass("active") || e.addClass("active").siblings("a").removeClass("active")
        }), $(document).on("click", ".keyword-cover-order .package-btn-group a", function(a) {
            var e = $(this),
                t = $(".keyword-cover-order .block-b .weixin"),
                n = $(".keyword-cover-order .block-b .zhifubao"),
                i = e.data("val"),
                o = e.data("img"),
                s = $(".keyword-cover-order .block-e .price"),
                r = $(".keyword-cover-order .block-e .discount-price"),
                d = $(".keyword-cover-order .svip-box"),
                c = $(".keyword-cover-order .redeem-code-box"),
                l = $(".keyword-cover-order .order-index #svip"),
                p = $(".keyword-cover-order .service-content"),
                u = $(".keyword-cover-order .service-time"),
                h = $(".keyword-cover-order .pay-info");
            switch (h.css("display", "none"), 1 == $("#insider").val() && (i = 0), s[0].innerHTML = l.is(":checked") ? 0 : i, t.show(), n.removeClass("offset"), e.addClass("active").siblings().removeClass("active"), "" == o ? r.empty() : r.html('(<img src="/public/app/images/keyword-cover/' + o + '">)'), d.hide(), c.hide(), u.html("付款成功即可使用一次服务，覆盖方案即时生成"), e.data("type")) {
                case "base":
                    p.html("AI 关键词优化师依托现金算法，为您的 App 提供 1 套专业关键词覆盖方案，用于苹果开发者 App 提交时的关键词填写。"), d.show(), c.show();
                    break;
                case "standard":
                    p.html('AI 关键词优化师依托现金算法，为您的 App 提供 3 套专业关键词覆盖方案，用于苹果开发者 App 提交时三个地区（中国、英国、澳大利亚）的关键词填写。<a href="javascript:;" class="select-three-info">为什么要填写三个地区的关键词？</a>');
                    break;
                case "senior":
                    t.hide(), n.addClass("offset active"), t.removeClass("active"), p.html("行业顶尖优化师，根据产品所处行业、核心功能、用户特征与具体推广需求，为您的 App 提供定制关键词覆盖方案。"), u.html("三个工作日内"), h.css("display", "block")
            }
        }), $(document).on("click", ".keyword-cover-order .block-b a", function(a) {
            var e = $(this);
            e.addClass("active").siblings().removeClass("active")
        }), $(document).on("click", ".keyword-cover-order .order-index #svip", function(a) {
            var e = $(this),
                t = $(".keyword-cover-order .block-e .price"),
                n = $(".keyword-cover-order .package-btn-group a.active");
            t[0].innerHTML = e.is(":checked") ? 0 : n.data("val")
        }), $(document).on("input", ".keyword-cover-order .redeem-code", function(a) {
            var e = $(this),
                t = $(".keyword-cover-order .block-e .price"),
                n = $(".keyword-cover-order .package-btn-group a.active");
            t[0].innerHTML = e.val().length <= 0 ? n.data("val") : 0
        }), clickToHide($(".keyword-cover-order .close-select-three-info"), $(".keyword-cover-order .popup-box")), clickToHide($(".keyword-cover-order .popup-box .popup-bk"), $(".keyword-cover-order .popup-box")), $(document).on("click", ".keyword-cover-order .select-three-info", function(a) {
            $(".keyword-cover-order .popup-box").show()
        }), $(document).on("click", ".keyword-cover-order .block-e a", function(a) {
            var e = ($(this), $(".keyword-cover-order .order-index #svip")),
                t = $(".keyword-cover-order .order-index #read"),
                n = $("#orderUrl").val(),
                i = $(".keyword-cover-order .package-btn-group a.active").data("type"),
                o = ~~e.is(":checked"),
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
                    success: function(a) {
                        1e4 == a.code ? 1 == a.callback ? buySubmit(a) : location.href = a.url : swal(a.msg)
                    }
                }) : (swal("请先阅读并同意服务协议书"), !1)
        }), $(document).on("click", ".keyword-cover-use-adjust .adjust-competitor .extend", function(a) {
            var e = $(this),
                t = e.parents(".adjust-competitor");
            t.hasClass("active") && !t.siblings(".adjust-competitor").hasClass("active") ? t.removeClass("active") : (t.addClass("active"), t.siblings(".adjust-competitor").removeClass("active"))
        }), $(document).on("click", ".keyword-cover-order-result .order-result-form .submit", function(a) {
            var e = ($(this), $(".keyword-cover-order-result #seniorUrl").val()),
                t = $(".keyword-cover-order-result .order-result-form .name").val(),
                n = $(".keyword-cover-order-result .order-result-form .email").val(),
                i = $(".keyword-cover-order-result .order-result-form .phone").val(),
                o = $(".keyword-cover-order-result .order-result-form .qqwx").val();
            return null == t || "" == t || void 0 == t ? (swal("姓名不能为空"), !1) : null == n || "" == n || void 0 == n ? (swal("邮箱不能为空"), !1) : null == i || "" == i || void 0 == i ? (swal("手机号不能为空"), !1) : null == o || "" == o || void 0 == o ? (swal("QQ/微信不能为空"), !1) : isEmail(n) ? isPhone(i) ? void $.ajax({
                                        type: "GET",
                                        url: e,
                                        data: {
                                            name: t,
                                            email: n,
                                            phone: i,
                                            qqwx: o
                                        },
                                        success: function(a) {
                                            1e4 == a.code ? swal({
                                                    title: "您已成功提交信息，我们将在1个工作日内与您联系。"
                                                }, function() {
                                                    location.href = a.url
                                                }) : swal("提交失败，请重新提交")
                                        }
                                    }) : (swal("手机号格式不符合规则"), !1) : (swal("邮箱格式不符合规则"), !1)
        }), $(document).on("click", ".keyword-cover-use .keyword-box", function(a) {
            var e = $(this),
                t = "",
                n = '<div class="input-box"><input type="text"></div>';
            (0 == e.find("li").length && 0 == e.find("input").length || 0 == e.find("input").length && 0 != $(a.target).has("li").length) && e.append(n), 0 != e.find("input").length && (t = e.find("input").val(), t.length && (e.append('<li><a href="javascript">' + t + '</a><i class="iconfont icon-guanbi"></i></li>'), e.find("div.input-box").remove())), e.find("input").focus(), $(document).on("keypress", function(a) {
                a.stopImmediatePropagation(), 13 == a.which && (t = e.find("input").val(), t.length && (e.append('<li><a href="javascript">' + t + '</a><i class="iconfont icon-guanbi"></i></li>'), e.find("div.input-box").remove()))
            })
        }), $(document).on("click", ".keyword-cover-use .keyword-box li>i", function(a) {
            var e = $(this),
                t = e.parents("li");
            t.remove()
        }), $(document).on("click", ".keyword-cover-use .confirm", function(a) {
            var e = ($(this), $(".keyword-cover-use .subUrl").val()),
                t = $(".keyword-cover-use .keyword-box li").length + 1,
                n = [],
                i = "";
            if (t > 11) return swal("当前输入的关键词超过10个，请修改！"), !1;
            for (var o = 1; o < t; o++) n.push($(".keyword-cover-use .keyword-box li:nth-child(" + o + ")>a").html());
            i = n.join(","), $.ajax({
                url: e,
                data: {
                    keywords: i
                },
                success: function(a) {
                    1e4 == a.code ? location.href = a.url : swal(a.msg)
                }
            })
        }), $(".keyword-cover-use-AI").length) {
        var Fe, Ee, Ae = $(".min"),
            Ne = $(".sec"),
            ra = $("#checkUrl").val(),
            qe = $("#countdown").val();
        setTimeout(S, 0);
        var He = setInterval(S, 1e3)
    }
    clickToHide($(".keyword-cover-use-complete .popup-close"), $(".keyword-cover-use-complete .popup-box")), clickToHide($(".keyword-cover-use-complete .popup-bk"), $(".keyword-cover-use-complete .popup-box")), $(document).on("click", ".keyword-cover-use-complete .plan-extend", function(a) {
        var e = $(this),
            t = e.siblings(".plan-content");
        "none" == t.css("display") ? (e.html("收起该组覆盖的关键词数量"), t.show()) : (e.html("查看该组覆盖的关键词数量"), t.hide())
    }), $(document).on("click", ".keyword-cover-use-adjust .adjust-self .user-adjust-keyword-list li>i", function(a) {
        var e = $(this),
            t = e.parents("li");
        t.remove()
    }), $(document).on("click", ".keyword-cover-use-adjust .del-adjust-keyword-list li a", function(a) {
        var e = $(this),
            t = e.parents("li");
        t.hasClass("active") ? t.removeClass("active") : t.addClass("active")
    }), $(document).on("click", ".keyword-cover-use-adjust .start-adjust", function(a) {
        var e = ($(this), $(".keyword-cover-use-adjust .subUrl").val()),
            t = [],
            n = "";
        $(".keyword-cover-use-adjust .user-adjust-keyword-list li a").each(function(a, e) {
            t.push($(e).html())
        }), n = t.join(",");
        var i = [],
            o = "";
        $(".keyword-cover-use-adjust .adjust-delete li.active a").each(function(a, e) {
            i.push($(e).html())
        }), o = i.join(","), $.ajax({
            url: e,
            data: {
                keywords: n,
                del_keywords: o
            },
            success: function(a) {
                1e4 == a.code ? location.href = a.url : swal(a.msg)
            }
        })
    }), $(document).on("click", ".keyword-cover-use-complete .no-satisfe-btn", function() {
        var a = $(".keyword-cover-use-complete .popup-no-box");
        a.show()
    }), $(document).on("click", ".keyword-cover-use-complete .yes-satisfe-btn", function() {
        var a = $(".keyword-cover-use-complete .popup-yes-box"),
            e = $(this).data("url");
        $.ajax({
            url: e,
            success: function(e) {
                1e4 == e.code ? a.show() : swal(data.msg)
            }
        })
    }), $(document).on("click", ".keyword-cover-use-complete .close-popup", function() {
        $(".keyword-cover-use-complete .popup-box").hide()
    }), $(document).on("click", ".setting-content .ai-plan", function(a) {
        var e = $(this),
            t = $(".setting-content .popup-box"),
            n = $(".setting-content .popup-box .popup-con"),
            i = $(".setting-content .popup-box .popup-con .info-title"),
            o = $(".setting-content .popup-box .keyword-one"),
            s = $(".setting-content .popup-box .keyword-two"),
            r = $(".setting-content .popup-box .keyword-three"),
            d = e.data("url"),
            c = e.data("keywords"),
            l = e.data("msg");
        if (d && d.length && (location.href = d), c && c.length) switch (c.length) {
            case 1:
                n.addClass("active"), i.html("关键词覆盖:"), o.html(c[0]), t.show();
                break;
            case 3:
                n.removeClass("active"), i.html("关键词覆盖1:"), o.html(c[0]), s.html(c[1]), r.html(c[2]), t.show()
        }
        l && l.length && swal(l)
    }), $(document).on("click", ".setting-content .popup-box .popup-con>i,.setting-content .popup-box .popup-bk", function(a) {
        $(".setting-content .popup-box").hide()
    }), $(".keyword-cover-use-js").length && ($(".add-item-user-product").find(".img-icon").length < 1 ? $(".keyword-cover-use .add-content-mine").show() : $(".keyword-cover-use .add-content-mine").hide(), $(".add-item-user-compet").find(".img-icon").length < 3 ? $(".keyword-cover-use .add-content-other").show() : $(".keyword-cover-use .add-content-other").hide()), $(".keyword-cover-use-adjust").length && ($(".adjust-app").find(".img-icon").length < 3 ? $(".keyword-cover-use-adjust .add-content-adjust").show() : $(".keyword-cover-use-adjust .add-content-adjust").hide()), $(document).on("click", ".plan .aso100-nav-select .dropdown-menu li a", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.data("param"),
            n = e.text(),
            i = e.parents(".dropdown"),
            o = i.find("input"),
            s = i.find(".dropdown-toggle .name");
        e.parent("li").addClass("active").siblings("li").removeClass("active"), o.val(t), s.text(n), 1 == e.data("jump") && pjaxLoad(e.attr("href"))
    }), $(document).on("click", ".plan .order-list-wrap .btn-wrap .btn-cancel,.plan .order-list-wrap .btn-wrap .btn-pause,.plan .order-list-wrap .btn-wrap .btn-restore", function(a) {
        a.preventDefault();
        var e = $(this),
            t = (e.data("action"), e.data("title"));
        return !e.hasClass("disabled") && void swal({
                title: t || "确认执行该操作吗？",
                type: "warning",
                showCancelButton: !0
            }, function() {
                e.addClass("disabled"), ajaxRequestAction(e, We)
            })
    });
    var We = function(a, e, t) {
        return $(e).removeClass("disabled"), 1e4 != a.code ? (swal(a.msg), !1) : void document.location.reload()
    };
    $(document).on("click", ".plan .order-create-wrap .product-list-wrap .product-box", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.parents(".product-list-wrap");
        t.find(".product-list").show()
    }), $(document).on("click", ".plan .order-create-wrap .time-range-wrap .show-date", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.parents(".time-range-wrap");
        t.find(".select-date").show(), e.hide(), oredrParam.editTime += 1
    });
    var Ue = function() {
        function a() {
            var a = 0,
                e = $(".plan .total-put-in-num").find("span"),
                t = $(".plan .null-input:not(:hidden)"),
                n = $(".plan .put-in-input:not(:hidden)");
            $.each(n, function(e, t) {
                "-" != $(t).val() && "" != $(t).val() && (a += parseInt($(t).val()))
            }), e.html(a);
            var i = $(".plan .btn-delete");
            1 == t.length && "" == t.val() ? i.hide() : i.show()
        }
        if ($(".plan .order-create-wrap").length) {
            var e = $(".plan .order-create-wrap");
            oredrParam = {
                source: e.data("source"),
                appId: e.find('input[name="appid"]').val(),
                appName: e.find('input[name="app_name"]').val(),
                device: e.find('input[name="device"]:checked').val(),
                orderCreateTimer: null,
                keywordBoxLiActive: e.find(".keyword-box li.active").data("son"),
                ajaxurl: e.find(".keyword-box li.active").data("ajaxurl"),
                loadurl: e.find(".keyword-box").data("loadurl"),
                loadingHtml: e.find(".copy-loading tbody").html(),
                loading: 0,
                isLazy: 0,
                orderType: 2,
                editTime: 0,
                waitPayOrder: e.data("waitpay")
            }, oredrParam.waitPayOrder && swal({
                title: "您有一笔订单未支付，请先支付或者取消后再提交新的订单。",
                type: "warning",
                showCancelButton: !0,
                confirmButtonText: "查看",
                closeOnConfirm: !1
            }, function() {
                window.location.href = "/plan/orderList"
            }), $(document).on("click", ".plan .order-create-wrap .btn-delete", function(e) {
                var t = $(this),
                    n = t.parents("tr"),
                    i = $(".plan .keyword-table-other tbody tr:not(:hidden)"),
                    o = t.parents(".keyword-table-other").find("tbody .keyword-input").eq(0),
                    s = t.parents(".keyword-table-other").find(".hints-item"),
                    r = t.parents(".keyword-table-other").find(".rank-item .txt"),
                    d = t.parents(".keyword-table-other").find(".recommend-item"),
                    c = t.parents(".keyword-table-other").find("tbody .put-in-input").eq(0);
                "block" == n.find(".select-date").css("display") && (oredrParam.editTime -= 1), i.length > 1 ? n.remove() : 1 == oredrParam.orderType ? c.val("") : (o.val(""), c.val(""), s.html("-"), r.html("-"), d.html("-")), a()
            }), $(document).on("click", ".plan .order-create-wrap .add-task", function(e) {
                var t = $(this),
                    n = 1 == oredrParam.orderType ? t.parents(".add-task-box").siblings(".download-item").find("tbody") : t.parents(".add-task-box").siblings(".keyword-item").find("tbody"),
                    i = $(".plan .order-create-wrap .copy-task-tr table tbody.task-" + oredrParam.orderType),
                    o = i.html();
                n.append(o), a()
            }), $(document).on("click", '.plan .order-create-wrap input[name="order_type"]', function(e) {
                var t = $(this),
                    n = t.val(),
                    i = ($(".keyword-table-other"), $(".plan .keyword-item")),
                    o = $(".plan .download-item"),
                    s = $(".plan .switch-item"),
                    r = $(".plan .create-info"),
                    d = $(".plan .keyword-box li.active>a");
                oredrParam.orderType = n, 1 == oredrParam.orderType ? (o.show(), i.hide(), s.hide(), r.hide()) : (i.show(), o.hide(), r.show(), d.trigger("click")), a()
            }), $(document).on("click", ".plan .order-create-wrap .confirm-sure", function(a) {
                a.preventDefault();
                var e = $(this),
                    t = e.text(),
                    n = $(".plan .order-create-wrap .order-create-form");
                return !e.hasClass("disabled") && (e.addClass("disabled").text("正在提交..."), void $.ajax({
                        url: n.attr("action"),
                        type: "POST",
                        data: n.serialize()
                    }).done(function(a) {
                        1e4 == a.code ? (e.removeClass("disabled").text("跳转支付页面..."), window.location.href = a.pay_url) : (swal(a.msg), e.removeClass("disabled").text(t))
                    }).fail(function() {
                        swal("请求失败")
                    }))
            }), $(document).on("click", ".plan .order-create-wrap .btn-save-time", function(a) {
                var e, t = $(this),
                    n = t.parents(".time-range-wrap"),
                    i = n.find(".stime"),
                    o = n.find(".etime"),
                    s = n.find(".show-date"),
                    r = n.find(".select-date"),
                    d = n.find(".start-d").val(),
                    c = n.find(".start-h").val(),
                    l = n.find(".start-m").val(),
                    p = n.find(".end-d").val(),
                    u = n.find(".end-h").val(),
                    h = n.find(".end-m").val(),
                    m = moment().format("YYYY");
                stiem = m + "-" + d + " " + c + ":" + l, etiem = m + "-" + p + " " + u + ":" + h, e = stiem + " - " + etiem, i.val(stiem), o.val(etiem), s.text(e).show(), r.hide(), oredrParam.editTime -= 1
            }), $(document).on("click", '.plan .order-create-wrap input[name="device"]', function(a) {
                oredrParam.device = $(this).val(), $(".keyword-table.switch-item tbody").removeClass("has-data")
            });
            var t = function() {
                    var a = $("." + oredrParam.keywordBoxLiActive + " tbody");
                    return !a.hasClass("has-data") && 1 != oredrParam.loading && (a.html(oredrParam.loadingHtml), oredrParam.loading = 1, void $.ajax({
                            url: oredrParam.loadurl,
                            type: "get",
                            data: {
                                appid: oredrParam.appId,
                                device: oredrParam.device,
                                method: oredrParam.keywordBoxLiActive
                            }
                        }).done(function(a) {
                            oredrParam.loading = 0, 1e4 == a.code ? n(a) : swal(a.msg)
                        }).fail(function() {
                            swal("加载出错")
                        }))
                },
                n = function(a) {
                    oredrParam.isLazy ? (i(a.list.recommendList, "item-recommmed"), i(a.list.usedList, "item-used"), oredrParam.isLazy = 0) : i(a.list, oredrParam.keywordBoxLiActive)
                },
                i = function(a, e) {
                    var t = $("." + e + " tbody"),
                        n = n || $(".copy-" + e + " tbody.has-data-tbody").clone(),
                        i = i || $(".copy-" + e + " tbody.no-data-tbody").clone();
                    t.addClass("has-data"), t.empty(), $.isEmptyObject(a) ? t.append(i.html()) : $.map(a, function(a, e) {
                            n.find(".checkbox-item .task-item").attr("id", "task-item-" + a.word_id), n.find(".checkbox-item label").attr("for", "task-item-" + a.word_id), n.find(".word").text(a.word), n.find(".hints").text(a.hints), n.find(".ranking").text(a.ranking), n.find(".recommend").text(a.recommend), t.append(n.html())
                        })
                };
            $(document).on("click", ".plan .keyword-box li>a", function(a) {
                var e = $(this);
                _parent = e.parent("li"), info = $(".plan .create-info"), son = _parent.data("son"), ajaxurl = _parent.data("ajaxurl"), info.hide(), e.parent("li").addClass("active").siblings().removeClass("active"), $("." + son).show().siblings(".switch-item").hide(), "item-add" == _parent.data("son") && info.show(), oredrParam.keywordBoxLiActive = son, oredrParam.ajaxurl = ajaxurl, "item-add" != oredrParam.keywordBoxLiActive && t()
            }), $(document).on("click", ".plan .order-create-wrap .switch-btn-wrap .btn-mulit-add", function(a) {
                var e = $(this);
                if ("item-add" == oredrParam.keywordBoxLiActive) {
                    var t = $(".switch-item.item-add").val();
                    o(e, t)
                } else {
                    var n = $(".switch-item." + oredrParam.keywordBoxLiActive),
                        i = [];
                    n.find(".task-item").each(function(a, e) {
                        $(e).prop("checked") && i.push($(e).parents("tr").find(".word").text())
                    }), o(e, i), $(".plan .order-create-wrap .all-task-check").prop("checked", !1), n.find(".task-item").prop("checked", !1)
                }
                e.blur()
            });
            var o = function(e, t) {
                    var n = $(".plan .order-create-wrap .copy-task-tr table tbody.task-" + oredrParam.orderType),
                        i = $(".plan .order-create-wrap .keyword-table-other.keyword-item tbody");
                    return !!t.length && (!e.hasClass("disabled") && (e.addClass("disabled"), void $.ajax({
                            url: oredrParam.ajaxurl,
                            data: {
                                appid: oredrParam.appId,
                                device: oredrParam.device,
                                word: t
                            },
                            type: "post",
                            success: function(t) {
                                e.removeClass("disabled"), 1e4 == t.code ? (task_list_clone = n.clone(), $.map(t.list, function(a, e) {
                                        "-" == a.ranking && (a.ranking = "未覆盖"), i.find("tr .keyword-input").val() ? (task_list_clone.find(".keyword-input").attr("type", "hidden").val(a.word).attr("type", "text"), task_list_clone.find(".hints-item").text(a.hints), task_list_clone.find(".rank-item .txt").text(a.ranking), task_list_clone.find(".rank-input").val(a.ranking), task_list_clone.find(".recommend-item").text(a.recommend), task_list_clone.find(".delivery-num-input").attr("type", "hidden").val(a.recommend).attr("type", "text"), i.append(task_list_clone.html())) : (i.find(".keyword-input").val(a.word), i.find(".hints-item").text(a.hints), i.find(".rank-item .txt").text(a.ranking), i.find(".rank-input").val(a.ranking), i.find(".recommend-item").text(a.recommend), i.find(".delivery-num-input").val(a.recommend))
                                    }), a()) : swal(t.msg)
                            }
                        })))
                },
                s = function() {
                    var a = O(oredrParam.appId) || [],
                        e = [];
                    return !(!a.length || "keyword" != oredrParam.source) && (oredrParam.ajaxurl = "/plan/moreDataByWord", $.map(a, function(a, t) {
                            e.push(a.keyword)
                        }), void o($(".plan .order-create-wrap .btn-mulit-add"), e))
                };
            s(), $(document).on("blur", ".plan .put-in-input", function() {
                a()
            }), $(document).on("click", ".plan .order-create-wrap .all-task-check", function(a) {
                var e = $(this),
                    t = e.parents(".switch-item"),
                    n = t.find(".task-item");
                n.each(function(a, t) {
                    $(t).prop("checked", e.prop("checked"))
                })
            }), $(document).on("input", ".plan .order-create-wrap .keyword-input", function(e) {
                e.preventDefault();
                var t, n = $(this),
                    i = n.parents("tr"),
                    o = n.parents(".keyword-table-other"),
                    s = o.data("moredata");
                $(".plan .keyword-table-other .btn-item.btn-delete");
                return t = n.val(), !! t.length && (clearTimeout(oredrParam.orderCreateTimer), void(oredrParam.orderCreateTimer = setTimeout(function() {
                    $.ajax({
                        url: s,
                        data: {
                            appid: oredrParam.appId,
                            device: oredrParam.device,
                            word: t
                        },
                        type: "get",
                        success: function(e) {
                            if (1e4 == e.code) {
                                var n = e.list[t];
                                n.showRanking = n.ranking, "-" == n.ranking && (n.showRanking = "未覆盖"), i.find(".hints-item").text(n.hints), i.find(".rank-item .txt").text(n.showRanking), i.find(".rank-input").val(n.ranking), i.find(".recommend-item").text(n.recommend), i.find(".delivery-num-input").val(n.recommend), a(), deleteBtns.show()
                            } else swal(e.msg)
                        }
                    })
                }, 500)))
            })
        }
    };
    Ue(), $(document).on("click", ".plan .pay-wrap .pay-btn", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.data("ajaxurl"),
            n = $('.plan .pay-wrap input[name="offer_code"]').val(),
            i = $(".plan .pay-wrap .pay-success-mode.active").data("type");
        return !e.hasClass("disabled") && (e.addClass("disabled"), void $.ajax({
                url: t,
                type: "POST",
                data: {
                    payChannel: i,
                    offer_code: n
                }
            }).done(function(a) {
                1e4 == a.code ? 1 == a.pay ? window.location.href = a.url : buySubmit(a) : swal(a.msg)
            }).fail(function() {
                swal("请求失败")
            }).always(function() {
                e.removeClass("disabled")
            }))
    }), $(document).on("click", ".plan .order-create-wrap .btn-submit", function(a) {
        a.preventDefault();
        var e, t = ($(this), $(".order-create-wrap .order-create-form")),
            n = $(".order-create-wrap .popup-confirm-box"),
            i = $(".order-create-wrap .popup-confirm-box .task-list"),
            o = $(".order-create-wrap .popup-confirm-box .confirm-device"),
            s = $(".order-create-wrap .popup-confirm-box .confirm-order-type"),
            r = $(".order-create-wrap .popup-confirm-box .order-amount");
        return oredrParam.editTime ? (swal("抱歉，您有修改的投放时间尚未保存，请保存后下单。"), !1) : void $.ajax({
                url: t.data("formaturl"),
                data: t.serialize(),
                type: "post",
                success: function(a) {
                    1e4 == a.code ? (o.text(a.data.device_desc), s.text(a.data.order_type_desc), r.text(a.data.order_amount), i.find("tbody").empty(), a.data.taskList.map(function(a, t) {
                            e = "<tr>", 2 == oredrParam.orderType && (e += "<td>" + a.word + "</td>"), e += "<td>" + a.delivery_num + "</td>", e += "<td>" + a.stime + " - " + a.etime + "</td>", e += "</tr>", i.find("tbody").append(e)
                        }), n.fadeIn()) : swal(a.msg)
                }
            })
    }), $(".plan .popup-box #planAgreement").click(function() {
        var a = $(this).data("url");
        $.ajax({
            url: a,
            data: {
                backurl: window.location.href
            },
            success: function(a) {
                1e4 == a.code ? location.href = a.url : swal(a.msg)
            }
        })
    }), $(document).on("click", ".plan .a-pjax", function(a) {
        var e = $(this),
            t = e.attr("href"),
            n = e.data("target");
        return $(".plan .plan-siderbar #" + n).addClass("active").siblings().removeClass("active"), pjaxLoad(t), !1
    }), $(document).on("click", ".plan .del-app", function(a) {
        var e = $(this),
            t = e.data("appid"),
            n = $(".delUrl").val(),
            i = e.parents("tbody");
        swal({
            title: "确定删除吗？",
            type: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            closeOnConfirm: !1
        }, function() {
            $.ajax({
                url: n,
                data: {
                    app_id: t
                },
                success: function(a) {
                    1e4 == a.code ? (e.parents("tr").remove(), resetTableIndex(i), swal.close()) : swal(a.msg)
                }
            })
        })
    }), $(document).on("click", ".plan .msg-close", function(a) {
        $(".plan .appinfo-prompt-msg").hide()
    }), $(document).on("click", ".plan .recharge-mode .pm", function(a) {
        var e = $(this);
        e.addClass("active").siblings().removeClass("active")
    }), $(document).on("click", ".plan .recharge-amount li a", function(a) {
        var e = $(this),
            t = $(".plan .input-account");
        t.val(""), e.parent().addClass("active").siblings().removeClass("active")
    }), $(".plan .input-account").focus(function() {
        $(".plan .recharge-amount li").each(function(a, e) {
            $(e).removeClass("active")
        })
    }), $(document).on("click", ".plan .recharge-wrap .recharge-btn", function(a) {
        var e = $(this);
        if (e.hasClass("animating")) return !1;
        e.addClass("animating");
        var t = $(".plan .input-account").val(),
            n = $(".plan .recharge-amount li.active a").html(),
            i = $(".plan #payUrl").val(),
            o = "" == t ? n : t,
            s = $(".plan .pm.active").data("type");
        $.ajax({
            url: i,
            data: {
                price: o,
                payChannel: s
            },
            success: function(a) {
                e.removeClass("animating"), 1e4 == a.code ? buySubmit(a) : swal(a.msg)
            }
        })
    }), $(document).on("click", ".plan .fix-info,.plan .add-box", function(a) {
        var e = $(this),
            t = $(".plan .popup-invoice-box"),
            n = (e.data("url"), $(".plan is-write").length ? "<span></span>修改发票信息" : "<span></span>填写发票信息");
        if ($(".plan .is-write").length) {
            var i = $(".plan .c-name").html(),
                o = $(".plan .c-duty").html(),
                s = $(".plan .p-email").html(),
                r = $(".plan .popup-invoice-box .name"),
                d = $(".plan .popup-invoice-box .duty"),
                c = $(".plan .popup-invoice-box .email");
            r.val(i), d.val(o), c.val(s)
        }
        t.find("h4").html(n), t.show()
    }), $(document).on("click", ".plan .popup-invoice-box .submit-duty", function(a) {
        var e = $(this),
            t = $(".plan .fix-info"),
            n = $(".plan .popup-invoice-box .name").val(),
            i = $(".plan .popup-invoice-box .duty").val(),
            o = $(".plan .popup-invoice-box .email").val(),
            s = e.data("url"),
            r = $(".plan .invoice-list");
        $(".plan .not-write").length && $(".plan .not-write");
        return "" == n || null == n || void 0 == n ? (swal("公司名称不能为空"), !1) : "" == i || null == i || void 0 == i ? (swal("公司名称不能为空"), !1) : "" == o || null == o || void 0 == o ? (swal("公司名称不能为空"), !1) : isEmail(o) ? void $.ajax({
                            url: s,
                            data: {
                                company: n,
                                tax_number: i,
                                email: o
                            },
                            success: function(a) {
                                if (1e4 == a.code) {
                                    t.html("修改信息"), e && e.hide();
                                    var e = '<li class="is-write"><i class="green-caret"></i><img class="invoice-img" src="/public//app/images/invoice.png" alt=""><p class="ic ic-first">公司名称：<span class="c-name">' + n + '</span></p><p class="ic">公司税号：<span class="c-duty">' + i + '</span></p><div class="divider-line-dashed"></div><p class="ic">个人邮箱：<span class="p-email">' + o + "</span></p></li>";
                                    r.html(e), swal({
                                        title: "提交成功"
                                    }, function(a) {
                                        a && $(".plan .popup-invoice-box i").trigger("click")
                                    })
                                } else swal(a.msg)
                            }
                        }) : (swal("邮箱格式不符合规则"), !1)
    }), $(document).on("click", ".plan .pay-success-mode", function(a) {
        var e = $(this);
        e.addClass("active").siblings().removeClass("active")
    }), $(document).on("click", ".plan .ta-rechange", function(a) {
        $(".plan .popup-not-enough-box").show()
    }), $(document).on("click", ".plan .use-coupon", function(a) {
        var e = $("#waitPay").val(),
            t = $(".plan-pay-list .smart-content-other>span");
        t.html(e), $(".plan .popup-coupon-box").show()
    }), $(document).on("click", ".plan .popup-coupon-box .verify-code", function(a) {
        var e = $(this);
        if (e.hasClass("animating")) return !1;
        e.addClass("animating");
        var t = $(".popup-coupon-box .code").val(),
            n = $(".plan .pay-wrap").data("oid"),
            i = $("#codeUrl").val(),
            o = $(".plan .plan-pay-list .coupon-amount"),
            s = $(".plan .plan-pay-list .hide-item"),
            r = $(".plan .use-coupon"),
            d = parseFloat($(".plan .total-money").find("span").html()),
            c = $(".plan .balance"),
            l = $(".plan .current-balance"),
            p = parseFloat(l.html()),
            u = $(".plan-pay-list .smart-content-other>span"),
            h = $(".plan .cancel-use-coupon"),
            m = $(".plan .popup-coupon-box");
        $.ajax({
            url: i,
            data: {
                code: t,
                oid: n
            },
            success: function(a) {
                if (e.removeClass("animating"), 1e4 == a.code) {
                    m.hide(), m.find('input[name="offer_code"]').val(t);
                    var n = parseFloat(a.price),
                        i = d - n,
                        l = n > d;
                    l ? (o.find("span").html(d), o.show(), c.html(0), s.hide()) : (o.find("span").html(n), o.show(), p >= i ? (c.html(i), s.hide()) : (c.html(p), u.html(i - p))), r.hide(), h.show()
                } else swal(a.msg)
            }
        })
    }), $(document).on("click", ".plan .cancel-use-coupon", function() {
        location.reload()
    }), $(document).on("click", ".plan .add-plan-invoice", function(a) {
        $(".popup-apply-invoice-box").show()
    }), $(document).on("click", ".plan .apply-invoice-confirm", function(a) {
        var e = $(this),
            t = e.data("url"),
            n = $(".pay-invoice-input").val();
        return n <= 0 ? (swal("请输入大于0的开票金额"), !1) : void $.ajax({
                url: t,
                data: {
                    amount: n
                },
                success: function(a) {
                    1e4 == a.code ? pjaxLoad(window.location.href) : swal(a.msg)
                }
            })
    });
    var ze = [],
        Ye = {},
        Je = !1;
    window.keywordDetailPageInit = A, $(".show-alert-btn .shopping").length && (window.onload = function() {
        A()
    }), $(document).on("click", ".keyword-histroy .shopping-cart", function(a) {
        var e = $(this),
            t = e.parents(".keyword-histroy"),
            n = e.data("id"),
            i = t.find("td").eq(0).find("a").html(),
            o = t.find("td").eq(3).find("a").html(),
            s = t.find("td").eq(1).html();
        if (F(), e.hasClass("active")) return swal("该关键词已经添加"), !1;
        e.addClass("active");
        var r = a.clientX,
            d = a.clientY,
            c = ($(".show-alert-btn>.shopping"), $(window).width() - 50),
            l = $(window).height() - 300,
            p = $("<p></p>").css({
                position: "fixed",
                height: "16px",
                width: "16px",
                "border-radius": "50%",
                "font-size": "12px",
                "text-align": "center",
                "background-color": "#ff2828",
                color: "#fff",
                "font-weight": "700",
                "z-index": "9999"
            });
        $("body").append(p), p.fly({
            start: {
                left: r,
                top: d
            },
            end: {
                left: c,
                top: l,
                width: 0,
                height: 0
            },
            onEnd: function() {
                p.remove()
            }
        }), Ye = {
            keywordId: n,
            keyword: i,
            heatNum: o,
            rank: s
        }, ze.push(Ye), M(ze.length);
        var u = $(".shopping .shopping-popup .shopping-main>ul"),
            h = "<li data-keywordid=" + n + '><p><span class="ellipsis">' + i + '</span><i class="iconfont icon-guanbi shopping-item-close"></i></p><p>' + o + "</p><p>" + s + "</p></li>";
        u.append(h), P(), I(ze), ze.length <= 1 && 0 == Je && j()
    }), $(document).on("click", ".shopping .shopping-item-close", function(a) {
        var e = $(this),
            t = e.parents("li").data("keywordid"),
            n = $("#keyword-list .shopping-cart");
        $.each(n, function(a, e) {
            $(e).data("id") == t && $(e).removeClass("active")
        });
        for (var i = 0; i < ze.length; i++) ze[i].keywordId == t && ze.splice(i, 1);
        ze.length || (E(), R()), I(ze), M(ze.length), e.parents("li").remove()
    }), $(document).on("click", ".shopping .all-empty", function(a) {
        var e = $("#keyword-list .shopping-cart"),
            t = $(".shopping .shopping-popup .shopping-main>ul");
        t.find("li:not(.not-del)").remove(), $.each(e, function(a, e) {
            $(e).removeClass("active")
        }), E(), R(), ze.splice(0, ze.length), I(ze), M(ze.length)
    }), $(document).on("click", ".shopping .go-put-in", function(a) {
        var e = $(this),
            t = e.data("url");
        return 0 == ze.length ? (swal("投放不能为空"), !1) : (I(ze), void(location.href = t))
    }), $(document).on("click", ".shopping .zhitou", function(a) {
        var e = $(".shopping-popup .shopping-main"),
            t = $(".show-alert-btn .shopping-popup");
        2 == e.find("li").length ? (E(), R()) : (F(), P()), t.is(":hidden") ? j() : B()
    }), $(document).on("click", ".shopping-popup .fold", function(a) {
        Je = !0, B()
    }), $(document).on("click", ".plan .zhaohang", function() {
        $(".popup-zhaoshang-box").show()
    })
}),
    $(document).on("click", ".popup-bk", function(a) {
    $(".popup-box").hide()
}),
    $(document).on("click", ".popup-con .popup-close", function(a) {
    $(".popup-box").hide()
}),
    $(document).on("click", ".popup-con .popup-other-close", function(a) {
    $(".popup-box").hide()
}), centerModals(), $(window).on("resize", centerModals), moreBtnShow(), $("#keyword-list").length && $("#is_android").length ? dataSearchPush_android() : dataSearchPush(), $(document).on("tap click", ".keyword-summary .word-num", function() {
    var a = $(this);
    $("html,body").animate({
        scrollTop: $("#keyword-list").offset().top - 180
    }, 200);
    var e = $("#keyword-list");
    e.find(".spinner-bg").addClass("show").find(".spinner").addClass("show"), e.find(".table").find(".table-body").addClass("hide"), setTimeout(function() {
        e.find(".spinner-bg").removeClass("show").find(".spinner").removeClass("show"), e.find(".table").find(".table-body").removeClass("hide");
        var t = a.parent("tr"),
            n = t.data("hintsmin") || "",
            i = t.data("hintsmax") || "",
            o = a.data("rankmin") || "",
            s = a.data("rankmax") || "";
        $("#minHints").val(n), $("#maxHints").val(i), $("#minRank").val(o), $("#maxRank").val(s), $(".screen-nav .btn-group input").keyup()
    }, 200)
}), $(document).on("tap click", ".keyword-summary .vs-table a", function() {
    var a = $(this),
        e = "." + a.data("class"),
        t = ".title-forth .title-" + a.data("type"),
        n = $(e).val();
    return 0 != n.length && ($(".title-forth .title-mark").hide(), $(t).show(), $("#return-show").show(), $(".rank-title").text($(".rank-title").data(a.data("type"))), $(".export-excel,.add-custom-keyword").hide(), n = $.parseJSON(n), window.diff = 1, void window.tableSort.clear().rows.add(n).draw())
}), $(document).on("tap click", "#return-show", function() {
    $(this).hide(), $(".title-forth .title-mark").hide(), $(".export-excel,.add-custom-keyword").show(), $(".rank-title").text($(".rank-title").data("normal")), window.diff = 0, window.tableSort.clear().rows.add(window.tableData).draw()
}), $.fn.dataTableExt.oSort["chinese-asc"] = function(a, e) {
    return a.localeCompare(e)
}, $.fn.dataTableExt.oSort["chinese-desc"] = function(a, e) {
    return e.localeCompare(a)
}, data = $("#table-optimization-data").html(), data && createTableOptKeyword(data), $(document).on("order.dt", "#opt-keyword-sort", function() {
    if (!window.tableSortOpt || !window.tableSortOpt.order()[0]) return !1;
    var a, e, t, n, i = $(this),
        o = window.tableSortOpt.order(),
        s = o[0][0];
    a = i.find("th:eq(" + s + ")"), e = a.attr("class"), t = a.find(".icon-up"), n = a.find(".icon-down"), a.siblings().find(".icon").removeClass("active"), "sorting_asc" == e ? (t.addClass("active"), n.removeClass("active")) : (t.removeClass("active"), n.addClass("active"))
}), window.searchType = "", downSources(), $("#hotDraw").length > 0, keywordRepertory(), showChangePd(), detect(), base_info_show(), commentFold(), window.clientShare = function() {
    var a = "app://share?title=" + encodeURIComponent(wechatShare.title) + "&content=" + wechatShare.desc + "&url=" + encodeURIComponent(wechatShare.link) + "&image=" + encodeURIComponent(wechatShare.imgUrl) + "&t=" + +new Date;
    location.href = a
}, window.analysis = function(a, e) {
    var n = "/api/eventAnalysis?c=" + a + "&a=" + e;
    n += "&u=" + encodeURIComponent(document.location.href), n += "&r=" + encodeURIComponent(document.referrer);
    var i = new Image,
        o = "aso100_log_" + Math.floor(2147483648 * Math.random()).toString(36);
    window[o] = i, i.onload = i.onerror = i.onabort = function() {
        i.onload = i.onerror = i.onabort = t, i = window[o] = t
    }, i.src = n
};