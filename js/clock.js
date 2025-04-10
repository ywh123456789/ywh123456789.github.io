function clockUpdateTime(e, c) {
    let a = "#000";
    switch (e.now.icon) {
        case "100": a = "#fdcc45"; break;
        case "101": a = "#fe6976"; break;
        case "102":
        case "103": a = "#fe7f5b"; break;
        case "104":
        case "150":
        case "151":
        case "152":
        case "153":
        case "154":
        case "800":
        case "801":
        case "802":
        case "803":
        case "804":
        case "805":
        case "806":
        case "807": a = "#2152d1"; break;
        case "300":
        case "301":
        case "305":
        case "306":
        case "307":
        case "308":
        case "309":
        case "310":
        case "311":
        case "312":
        case "313":
        case "314":
        case "315":
        case "316":
        case "317":
        case "318":
        case "350":
        case "351":
        case "399": a = "#49b1f5"; break;
        case "302":
        case "303":
        case "304": a = "#fdcc46"; break;
        case "400":
        case "401":
        case "402":
        case "403":
        case "404":
        case "405":
        case "406":
        case "407":
        case "408":
        case "409":
        case "410":
        case "456":
        case "457":
        case "499": a = "#a3c2dc"; break;
        case "500":
        case "501":
        case "502":
        case "503":
        case "504":
        case "507":
        case "508":
        case "509":
        case "510":
        case "511":
        case "512":
        case "513":
        case "514":
        case "515": a = "#97acba"; break;
        case "900":
        case "999": a = "red"; break;
        case "901": a = "#179fff";
    }

    var t = document.getElementById("hexo_electric_clock");
    clock_box_html = `
        <div class="clock-row">
            <span id="card-clock-clockdate" class="card-clock-clockdate"></span>
            <span class="card-clock-weather"><i class="qi-${e.now.icon}-fill" style="color: ${a}"></i> ${e.now.text} <span>${e.now.temp}</span> ℃</span>
            <span class="card-clock-humidity">💧 ${e.now.humidity}%</span>
        </div>
        <div class="clock-row">
            <span id="card-clock-time" class="card-clock-time"></span>
        </div>
        <div class="clock-row">
            <span class="card-clock-windDir"> <i class="qi-gale"></i> ${e.now.windDir}</span>
            <span class="card-clock-location">${c}</span>
            <span id="card-clock-dackorlight" class="card-clock-dackorlight"></span>
        </div>
    `;

    var s = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
        n = document.getElementById("card-clock-loading");

    function r() {
        var e,
            c = new Date,
            a = o(c.getHours(), 2) + ":" + o(c.getMinutes(), 2) + ":" + o(c.getSeconds(), 2),
            t = o(c.getFullYear(), 4) + "-" + o(c.getMonth() + 1, 2) + "-" + o(c.getDate(), 2) + " " + s[c.getDay()],
            n = c.getHours();
        
        if (n > 12) {
            n -= 12;
            e = " P M";
        } else {
            e = " A M";
        }
        
        if (document.getElementById("card-clock-time")) {
            var r = document.getElementById("card-clock-time"),
                l = document.getElementById("card-clock-clockdate"),
                i = document.getElementById("card-clock-dackorlight");
            r.innerHTML = a;
            l.innerHTML = t;
            i.innerHTML = e;
        }
    }

    function o(e, c) {
        for (var a = "", t = 0; t < c; t++) a += "0";
        return (a + e).slice(-c);
    }

    n && (n.innerHTML = "");
    t.innerHTML = clock_box_html;
    setInterval(r, 1e3);
    r();
}

function getIpInfo() {
    let e = { city: "深圳市", qweather_url: "" };
    
    if ("true" === clock_default_rectangle_enable && e) {
        fetch(`https://restapi.amap.com/v3/geocode/regeo?key=${gaud_map_key}&location=${clock_rectangle}`)
            .then((e => e.json()))
            .then((e => {
                if ("1" === e.status) {
                    const c = e.regeocode.addressComponent;
                    return Array.isArray(c.city) ? c.province : c.city;
                }
            }))
            .then((c => {
                fetch(`https://devapi.qweather.com/v7/weather/now?location=${clock_rectangle}&key=${qweather_key}`)
                    .then((e => e.json()))
                    .then((a => {
                        if (document.getElementById("hexo_electric_clock")) {
                            clockUpdateTime(a, Array.isArray(c) ? e.city : c);
                        }
                    }));
            }));
    } else {
        fetch(`https://restapi.amap.com/v3/ip?key=${gaud_map_key}`)
            .then((e => e.json()))
            .then((c => {
                let a = Array.isArray(c.rectangle) ? clock_rectangle : c.rectangle.split(";")[0];
                e.qweather_url = `https://devapi.qweather.com/v7/weather/now?location=${a}&key=${qweather_key}`;
                
                if (Array.isArray(c.rectangle)) {
                    fetch(`https://restapi.amap.com/v3/geocode/regeo?key=${gaud_map_key}&location=${clock_rectangle}`)
                        .then((e => e.json()))
                        .then((a => {
                            if ("1" === a.status) {
                                const c = a.regeocode.addressComponent;
                                e.city = Array.isArray(c.city) ? c.province : c.city;
                            }
                            return c;
                        }))
                        .then((c => {
                            fetch(e.qweather_url)
                                .then((e => e.json()))
                                .then((a => {
                                    if (document.getElementById("hexo_electric_clock")) {
                                        clockUpdateTime(a, Array.isArray(c.city) ? e.city : c.city);
                                    }
                                }));
                        }));
                } else {
                    fetch(e.qweather_url)
                        .then((e => e.json()))
                        .then((a => {
                            if (document.getElementById("hexo_electric_clock")) {
                                clockUpdateTime(a, Array.isArray(c.city) ? e.city : c.city);
                            }
                        }));
                }
            }));
    }
}

getIpInfo();