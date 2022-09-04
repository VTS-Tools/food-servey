var array = ["/ho-chi-minh", "/ha-noi", "/da-nang", "/can-tho", "/khanh-hoa", "/vung-tau",
    "/hai-phong", "/binh-thuan", "/lam-dong", "/dong-nai", "/quang-ninh", "/hue", "/binh-duong",
    "/hai-duong", "/ninh-thuan", "/nam-dinh", "/tien-giang", "/phu-quoc", "/kon-tum", "/quang-nam",
    "/lao-cai", "/nghe-an", "/long-an", "/binh-dinh", "/phu-yen", "/an-giang", "/dak-lak", "/thanh-hoa",
    "/kien-giang", "/quang-ngai", "/gia-lai", "/tay-ninh", "/vinh-long", "/ca-mau", "/dong-thap",
    "/quang-binh", "/ben-tre", "/quang-tri", "/binh-phuoc", "/soc-trang", "/vinh-phuc", "/tra-vinh",
    "/bac-ninh", "/ninh-binh", "/bac-lieu", "/thai-nguyen", "/ha-tinh", "/bac-giang", "/hau-giang",
    "/phu-tho", "/thai-binh", "/son-la", "/lang-son", "/hoa-binh", "/hung-yen", "/ha-giang", "/dak-nong",
    "/tuyen-quang", "/yen-bai", "/ha-nam", "/dien-bien", "/cao-bang", "/lai-chau", "/bac-kan", "/bangkok",
    "/nonthaburi", "/nakhon-ratchasima", "/prachuap-khiri-khan", "/samut-prakan", "/Krabi", "/Chachoengsao",
    "/mae-hong-son", "/pattaya", "/chiangmai", "/phuket", "/jakarta", "/bali", "/Yogyakarta", "/bandung",
    "/taipei", "/Chiayi-county", "/kaohsiung-city", "/Hualien-county", "/Pingtung-county", "/taoyuan-city",
    "/Taichung-city", "/phnom-penh", "/siem-reap", "/kampot", "/kampong-cham", "/kampong-speu", "/kampong-thom",
    "/Koh-kong", "/preah-sihanouk", "/svay-rieng", "/prey-veng", "/krong-bavet", "/Malacca", "/Johor",
    "/Selangor", "/Kedah", "/Pahang", "/Penang", "/Terengganu", "/kuala-lumpur", "/putra-jaya", "/tokyo",
    "/kyoto", "/osaka", "/Kyushu", "/yangon", "/Mandalay", "/Sagaing", "/Shan", "/metro-manila", "/quezon",
    "/New%20South%20Wales", "/Victoria", "/Queensland", "/South%20Australia", "/Western%20Australia",
    "/california", "/washington", "/new-york", "/ontario", "/Gyeongqi-Do", "/seoul", "/vientiane",
    "/guangdong", "/singapore", "/hong-kong"
];

const request = require('request');
const cheerio = require('cheerio');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const fs = require('fs-extra');

var q = "cafe";
var res_file = "cafe";

var url = "https://www.foody.vn/{address}/food/dia-diem?ss=header_search_form&q=" + q;

var data = {};
async(() => {
    array.forEach(it => {
        var newURL = url.replace("{address}", it.substr(1));
        var n = await (new Promise((resolve, reject) => {
            request({
                url: newURL,
                headers: {
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                    // "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
                    "Cache-Control": "max-age=0",
                    "Connection": "keep-alive",
                    "Host": "www.foody.vn",
                    "Upgrade-Insecure-Requests": 1,
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
                }
            }, (error, response, body) => {
                if (error) {
                    console.error("URL %s ERROR", it);
                    // console.error(error);
                    reject();
                } else {
                    $ = cheerio.load(body);
                    var s = $('.result-status-count > div > span').text();
                    var n = Number(s.replace('.', ''));
                    console.log("%s : %d", it, n);
                    resolve(n);
                }
            })
        }))
        data[it.substr(1)] = n;
    });
    fs.outputFile('./result-' + res_file + '.json', JSON.stringify(data, null, 4));
})();