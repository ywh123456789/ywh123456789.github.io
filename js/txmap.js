// 全局变量，用于存储IP定位数据
let ipLoacation;

// GET请求获取IP和位置信息
$.ajax({
    type: 'get',
    url: 'https://apis.map.qq.com/ws/location/v1/ip',
    data: {
        key: 'B7FBZ-X67CZ-WWXXC-7TJ4D-KVDBS-HJB2Y', // 你的腾讯地图API Key
        output: 'jsonp',
    },
    dataType: 'jsonp',
    success: function (res) {
        ipLoacation = res;
        showWelcome(); // 请求成功后调用显示欢迎信息的函数
    },
    error: function (err) {
        console.log('IP定位请求失败:', err);
    }
});

// 计算两点间距离的函数
function getDistance(e1, n1, e2, n2) {
    const R = 6371; // 地球半径（公里）
    const { sin, cos, asin, PI, hypot } = Math;
    let getPoint = (e, n) => {
        e *= PI / 180;
        n *= PI / 180;
        return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) };
    };

    let a = getPoint(e1, n1);
    let b = getPoint(e2, n2);
    let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z);
    let r = asin(c / 2) * 2 * R;
    return Math.round(r);
}

// 显示欢迎信息的函数
function showWelcome() {
    // 计算与站长的距离（这里用你的经纬度）
    let dist = getDistance(114.414724, 30.515977, ipLoacation.result.location.lng, ipLoacation.result.location.lat);
    let pos = ipLoacation.result.ad_info.nation;
    let ip = ipLoacation.result.ip;

    // 处理IP地址：如果包含冒号（IPv6），则缩短显示
    if (ip.includes(':')) {
        ip = ip.split(':').slice(0, 4).join(':') + '...'; // 缩短IPv6地址
    }

    let posdesc;
    // 根据国家、省份、城市信息自定义欢迎语
    switch (ipLoacation.result.ad_info.nation) {
        case "日本":
            posdesc = "樱花飘落如雪，拉面热气扑鼻，动漫街头正热闹。";
            break;
        case "美国":
            posdesc = "自由女神在纽约港挥手，加州阳光洒满金门桥。";
            break;
        case "英国":
            posdesc = "伦敦眼缓缓转，泰晤士河映着大本钟的影子。";
            break;
        case "俄罗斯":
            posdesc = "伏特加一口闷，西伯利亚的雪覆盖红场壮景。";
            break;
        case "法国":
            posdesc = "巴黎街头飘来法棍香，埃菲尔塔刺破云层。";
            break;
        case "德国":
            posdesc = "慕尼黑啤酒节人声鼎沸，黑森林藏着童话小屋。";
            break;
        case "澳大利亚":
            posdesc = "袋鼠蹦跳在草原，大堡礁下鱼群穿梭如画。";
            break;
        case "加拿大":
            posdesc = "枫叶染红秋天，多伦多塔俯瞰尼亚加拉瀑布。";
            break;
        case "韩国":
            posdesc = "首尔街头泡菜汤咕嘟响，炸鸡配韩剧最对味。";
            break;
        case "意大利":
            posdesc = "罗马斗兽场回响千年，意面卷着托斯卡纳阳光。";
            break;
        case "巴西":
            posdesc = "里约热舞狂欢节，亚马逊深处绿意遮天。";
            break;
        case "印度":
            posdesc = "泰姬陵沐浴月光，咖喱香从恒河边飘来。";
            break;
        case "中国":
            pos = ipLoacation.result.ad_info.province + " " + ipLoacation.result.ad_info.city + " " + ipLoacation.result.ad_info.district;
            ip = ipLoacation.result.ip; // 更新IP（已处理过IPv6）
            if (ip.includes(':')) {
                ip = ip.split(':').slice(0, 4).join(':') + '...'; // 再次确保IP格式
            }
            switch (ipLoacation.result.ad_info.province) {
                case "北京市":
                    posdesc = "北——京——欢迎你~~~";
                    break;
                case "天津市":
                    posdesc = "讲段相声吧。";
                    break;
                case "河北省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "石家庄市":
                            posdesc = "驴肉火烧一口咬下去，正定古塔影子斜。";
                            break;
                        case "唐山市":
                            posdesc = "皮影戏咿呀开唱，曹妃甸湿地飞鸟成群。";
                            break;
                        case "秦皇岛市":
                            posdesc = "山海关巍然屹立，北戴河海浪拍岸声声。";
                            break;
                        case "邯郸市":
                            posdesc = "成语典故从娲皇宫传出，老城小吃热气腾腾。";
                            break;
                        case "邢台市":
                            posdesc = "邢窑白瓷闪耀如玉，崆山溶洞藏着奇景。";
                            break;
                        case "保定市":
                            posdesc = "直隶总督府威严不倒，白洋淀荷花开满湖。";
                            break;
                        case "张家口市":
                            posdesc = "冬奥滑雪激情四射，坝上草原羊群漫步。";
                            break;
                        case "承德市":
                            posdesc = "避暑山庄凉风徐来，普陀宗乘庙钟声悠。";
                            break;
                        case "沧州市":
                            posdesc = "铁狮子镇守千年，吴桥杂技翻腾空中。";
                            break;
                        case "廊坊市":
                            posdesc = "香河肉饼滋滋冒油，霸州温泉暖身舒心。";
                            break;
                        case "衡水市":
                            posdesc = "衡水老白干一口辣喉，湖畔芦苇随风摇曳。";
                            break;
                        default:
                            posdesc = "山势巍巍成壁垒，天下雄关。";
                            break;
                    }
                    break;
                case "山西省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "太原市":
                            posdesc = "晋祠古树参天，汾河水畔刀削面热腾腾。";
                            break;
                        case "大同市":
                            posdesc = "云冈石窟佛像庄严，凉粉滑溜入口即化。";
                            break;
                        case "阳泉市":
                            posdesc = "娘子关守着太行险，焖子煎得外焦里嫩。";
                            break;
                        case "长治市":
                            posdesc = "太行山风吹过，潞城甩饼香飘十里外。";
                            break;
                        case "晋城市":
                            posdesc = "皇城相府气派非凡，泽州手工挂面细如丝。";
                            break;
                        case "朔州市":
                            posdesc = "朔州老城墙斑驳，右玉羊杂汤暖胃又香。";
                            break;
                        case "晋中市":
                            posdesc = "平遥古城夜色迷离，乔氏大院醋香扑鼻。";
                            break;
                        case "运城市":
                            posdesc = "解州关帝庙香火旺，盐湖漂浮如梦似幻。";
                            break;
                        case "忻州市":
                            posdesc = "五台山晨钟暮鼓，雁门关外蒸肉冒热气。";
                            break;
                        case "临汾市":
                            posdesc = "尧庙诉说华夏根，洪洞大槐树下牛肉面香。";
                            break;
                        case "吕梁市":
                            posdesc = "汾酒醉倒八方客，碛口古镇黄河水滔滔。";
                            break;
                        default:
                            posdesc = "展开坐具长三尺，已占山河。";
                            break;
                    }
                    break;
                case "内蒙古自治区":
                    switch (ipLoacation.result.ad_info.city) {
                        case "呼和浩特市":
                            posdesc = "青城草原马蹄响，大召寺里炖羊肉飘香。";
                            break;
                        case "包头市":
                            posdesc = "鹿城莜面窝窝软，五当召藏着草原禅意。";
                            break;
                        case "乌海市":
                            posdesc = "黄河奔流入蒙地，乌海湖边葡萄甜如蜜。";
                            break;
                        case "赤峰市":
                            posdesc = "红山文化石器古，乌兰布统烤全羊正香。";
                            break;
                        case "通辽市":
                            posdesc = "科尔沁风吹草低，珠日河牧场奶茶暖心。";
                            break;
                        case "鄂尔多斯市":
                            posdesc = "成陵祭奠成吉思汗，康巴什街头羊绒披身。";
                            break;
                        case "呼伦贝尔市":
                            posdesc = "呼伦湖水映蓝天，满洲里套娃笑脸迎人。";
                            break;
                        case "巴彦淖尔市":
                            posdesc = "河套平原瓜果熟，乌梁素海鸟儿翩翩飞。";
                            break;
                        case "乌兰察布市":
                            posdesc = "火山群奇石嶙峋，凉城莜面烤羊腿正热。";
                            break;
                        case "兴安盟":
                            posdesc = "阿尔山温泉冒热气，乌兰浩特马奶酒醇厚。";
                            break;
                        case "锡林郭勒盟":
                            posdesc = "锡林九曲弯如画，马头琴声伴奶酪香。";
                            break;
                        case "阿拉善盟":
                            posdesc = "巴丹吉林沙海壮，额济纳胡杨金黄耀眼。";
                            break;
                        default:
                            posdesc = "天苍苍野茫茫，风吹草低。";
                            break;
                    }
                    break;
                case "辽宁省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "沈阳市":
                            posdesc = "故宫满族风情浓，鸡架烤得焦香扑鼻。";
                            break;
                        case "大连市":
                            posdesc = "星海湾海风轻拂，旅顺军港海鲜满桌。";
                            break;
                        case "鞍山市":
                            posdesc = "千山绿意盎然，玉佛苑里烧鸡香四溢。";
                            break;
                        case "抚顺市":
                            posdesc = "雷锋精神代代传，麻辣拌热气扑鼻来。";
                            break;
                        case "本溪市":
                            posdesc = "水洞奇幻如仙境，枫叶红遍吊锅热乎乎。";
                            break;
                        case "丹东市":
                            posdesc = "鸭绿江边望朝鲜，虎山长城黄椅山幽静。";
                            break;
                        case "锦州市":
                            posdesc = "辽沈战役硝烟散，笔架山潮烧烤正香。";
                            break;
                        case "营口市":
                            posdesc = "鲅鱼圈渔船归港，望儿山下温泉冒热气。";
                            break;
                        case "阜新市":
                            posdesc = "玛瑙雕琢精美绝，海棠山上羊肉汤滚烫。";
                            break;
                        case "辽阳市":
                            posdesc = "白塔公园古韵存，弓长岭温泉疙瘩汤暖身。";
                            break;
                        case "盘锦市":
                            posdesc = "红海滩如火如荼，盘锦大米河蟹肥又美。";
                            break;
                        case "铁岭市":
                            posdesc = "赵本山小品笑声起，二人转配烧鸡正地道。";
                            break;
                        case "朝阳市":
                            posdesc = "牛河梁遗址悠远，凤凰山下烤全羊飘香。";
                            break;
                        case "葫芦岛市":
                            posdesc = "兴城古城墙斑驳，菊花岛海风关东糖甜。";
                            break;
                        default:
                            posdesc = "我想吃烤鸡架！";
                            break;
                    }
                    break;
                case "吉林省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "长春市":
                            posdesc = "伪满皇宫诉历史，净月潭边饺子热腾腾。";
                            break;
                        case "吉林市":
                            posdesc = "雾凇挂满松花江，烤冷面香气扑鼻来。";
                            break;
                        case "四平市":
                            posdesc = "四平战役硝烟散，叶赫古城熏鸡正香。";
                            break;
                        case "辽源市":
                            posdesc = "东辽河水清如镜，龙首山下袜子织得忙。";
                            break;
                        case "通化市":
                            posdesc = "杨靖宇英魂不散，集安古墓人参鸡汤浓。";
                            break;
                        case "白山市":
                            posdesc = "长白山天池神秘，抚松人参江源烤鱼香。";
                            break;
                        case "松原市":
                            posdesc = "查干湖冬捕鱼跃，前郭蒙古风情鱼宴鲜。";
                            break;
                        case "白城市":
                            posdesc = "向海湿地鹤舞翩翩，大安嫩江洮儿河酒醇。";
                            break;
                        case "延边朝鲜族自治州":
                            posdesc = "延吉冷面酸辣爽，图们边境辣白菜飘香。";
                            break;
                        default:
                            posdesc = "状元阁就是东北烧烤之王。";
                            break;
                    }
                    break;
                case "黑龙江省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "哈尔滨市":
                            posdesc = "冰雪大世界灯火明，中央大街红肠面包香。";
                            break;
                        case "齐齐哈尔市":
                            posdesc = "扎龙湿地鹤影飞，烤肉串蘸大酱真地道。";
                            break;
                        case "鸡西市":
                            posdesc = "兴凯湖水天一色，冷面辣菜暖胃又开胃。";
                            break;
                        case "鹤岗市":
                            posdesc = "煤城岁月悠悠过，界江松子俄罗斯风情。";
                            break;
                        case "双鸭山市":
                            posdesc = "北秀公园绿意浓，饶河乌苏里江鱼蜂蜜甜。";
                            break;
                        case "大庆市":
                            posdesc = "油田铁人精神在，湿地公园烧烤烟袅袅。";
                            break;
                        case "伊春市":
                            posdesc = "林都森林氧气足，汤旺河石林红松果香。";
                            break;
                        case "佳木斯市":
                            posdesc = "赫哲鱼皮画精巧，三江口湿地炖江鱼鲜。";
                            break;
                        case "七台河市":
                            posdesc = "桃山湖畔宁静美，滑雪场里辣酱面热乎。";
                            break;
                        case "牡丹江市":
                            posdesc = "镜泊湖瀑布轰鸣，雪乡雪景烤鹿肉正香。";
                            break;
                        case "黑河市":
                            posdesc = "中俄边境风情浓，五大连池温泉酱骨头。";
                            break;
                        case "绥化市":
                            posdesc = "寒地黑土稻米香，北林红肠青冈笨鸡蛋。";
                            break;
                        case "大兴安岭地区":
                            posdesc = "漠河极光梦幻现，加格达奇林海狍子肉香。";
                            break;
                        default:
                            posdesc = "很喜欢哈尔滨大剧院。";
                            break;
                    }
                    break;
                case "上海市":
                    posdesc = "外滩夜景灯火璀璨，生煎小笼包热气腾腾。";
                    break;
                case "江苏省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "南京市":
                            posdesc = "夫子庙灯会人声鼎沸，鸭血粉丝汤暖胃香浓。";
                            break;
                        case "无锡市":
                            posdesc = "太湖鼋头渚风光美，无锡排骨甜滋滋入味。";
                            break;
                        case "徐州市":
                            posdesc = "云龙湖畔山水依，烙馍卷羊肉汤热乎乎。";
                            break;
                        case "常州市":
                            posdesc = "天宁寺钟声悠扬，淹城春秋乐园梳篦精。";
                            break;
                        case "苏州市":
                            posdesc = "拙政园里江南韵，小笼包咬下去满口汤汁。";
                            break;
                        case "南通市":
                            posdesc = "濠河夜景如诗画，狼山风吹海门羊肉香。";
                            break;
                        case "连云港市":
                            posdesc = "花果山猴王故里，连岛海鲜海州鱼汤鲜。";
                            break;
                        case "淮安市":
                            posdesc = "周恩来故里肃穆，淮扬菜精致盱眙龙虾红。";
                            break;
                        case "盐城市":
                            posdesc = "丹顶鹤飞大纵湖，阜宁大糕黏糯鱼汤鲜。";
                            break;
                        case "扬州市":
                            posdesc = "瘦西湖烟雨朦胧，炒饭三丁包子香喷喷。";
                            break;
                        case "镇江市":
                            posdesc = "金山寺香火袅袅，镇江醋酸锅盖面滑溜。";
                            break;
                        case "泰州市":
                            posdesc = "梅兰芳戏曲飘香，溱湖湿地鱼饼味悠长。";
                            break;
                        case "宿迁市":
                            posdesc = "项王故里霸气存，骆马湖鱼鲜洋河酒醇厚。";
                            break;
                        default:
                            posdesc = "散装是必须要散装的。";
                            break;
                    }
                    break;
                case "浙江省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "杭州市":
                            posdesc = "西湖断桥残雪美，龙井茶香叫花鸡酥嫩。";
                            break;
                        case "宁波市":
                            posdesc = "天一阁书香悠远，奉化水蜜桃甜汤团软。";
                            break;
                        case "温州市":
                            posdesc = "雁荡山奇峰耸立，楠溪江水清瓯菜味美。";
                            break;
                        case "嘉兴市":
                            posdesc = "南湖红船载历史，乌镇水乡粽子糯又香。";
                            break;
                        case "湖州市":
                            posdesc = "南浔古镇石桥静，安吉竹海莫干山清幽。";
                            break;
                        case "绍兴市":
                            posdesc = "鲁迅故里书卷气，黄酒温热臭豆腐扑鼻。";
                            break;
                        case "金华市":
                            posdesc = "双龙洞凉风习习，义乌小商品火腿香四溢。";
                            break;
                        case "衢州市":
                            posdesc = "江郎山奇峰突兀，开化根雕衢州烤饼脆。";
                            break;
                        case "舟山市":
                            posdesc = "普陀山佛光普照，嵊泗海鲜定海黄鱼鲜嫩。";
                            break;
                        case "台州市":
                            posdesc = "天台山道风清幽，椒江海鲜仙居杨梅甜。";
                            break;
                        case "丽水市":
                            posdesc = "云和梯田如画卷，遂昌金矿龙泉青瓷美。";
                            break;
                        default:
                            posdesc = "东风渐绿西湖柳，雁已还人未南归。";
                            break;
                    }
                    break;
                case "安徽省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "合肥市":
                            posdesc = "包公祠里正气存，三河古镇臭鳜鱼飘香。";
                            break;
                        case "芜湖市":
                            posdesc = "方特乐园笑声起，镜湖夜色酥糖甜入心。";
                            break;
                        case "蚌埠市":
                            posdesc = "龙子湖水波荡漾，怀远石榴烧饼夹香肉。";
                            break;
                        case "淮南市":
                            posdesc = "八公山豆腐滑嫩，寿县古城牛肉汤滚烫。";
                            break;
                        case "马鞍山市":
                            posdesc = "采石矶江风吹过，当涂青山河蟹肥又鲜。";
                            break;
                        case "淮北市":
                            posdesc = "相山绿树成荫，濉溪老酒羊肉串辣香。";
                            break;
                        case "铜陵市":
                            posdesc = "铜官山铜韵悠长，天井湖美铜陵姜香浓。";
                            break;
                        case "安庆市":
                            posdesc = "天柱山峰峦叠翠，迎江寺钟桐城小花香。";
                            break;
                        case "黄山市":
                            posdesc = "黄山云海叹为观止，屯溪老街徽菜毛峰茶。";
                            break;
                        case "滁州市":
                            posdesc = "琅琊山醉翁亭幽，全椒辣椒明光绿豆甜。";
                            break;
                        case "阜阳市":
                            posdesc = "颍州西湖古韵长，太和板面剪纸技艺精。";
                            break;
                        case "宿州市":
                            posdesc = "皇藏峪森林清幽，砀山酥梨萧县葡萄甜。";
                            break;
                        case "六安市":
                            posdesc = "天堂寨云雾缭绕，霍山竹笋六安瓜片香。";
                            break;
                        case "亳州市":
                            posdesc = "华佗故里药香浓，涡阳老子文化药材丰。";
                            break;
                        case "池州市":
                            posdesc = "九华山佛音袅袅，青阳九子岩石台牯牛降。";
                            break;
                        case "宣城市":
                            posdesc = "敬亭山诗意无穷，绩溪徽菜宣纸墨香浓。";
                            break;
                        default:
                            posdesc = "蚌埠住了，芜湖起飞。";
                            break;
                    }
                    break;
                case "福建省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "福州市":
                            posdesc = "三坊七巷古韵深，鼓山云雾鱼丸汤热乎。";
                            break;
                        case "厦门市":
                            posdesc = "鼓浪屿琴声悠扬，南普陀素饼沙茶面香浓。";
                            break;
                        case "莆田市":
                            posdesc = "湄洲岛妈祖护佑，荔枝甜美卤面软又香。";
                            break;
                        case "三明市":
                            posdesc = "泰宁丹霞地貌奇，永安桃源洞沙县小吃香。";
                            break;
                        case "泉州市":
                            posdesc = "清源山道风清幽，开元寺塔面线糊浓郁。";
                            break;
                        case "漳州市":
                            posdesc = "东山岛海浪拍岸，云水谣土楼卤鸭香扑鼻。";
                            break;
                        case "南平市":
                            posdesc = "武夷山茶香四溢，建瓯板鸭邵武古镇宁静。";
                            break;
                        case "龙岩市":
                            posdesc = "永定土楼雄伟立，长汀客家连城花生香。";
                            break;
                        case "宁德市":
                            posdesc = "太姥山奇石嶙峋，福鼎白茶霞浦海景美。";
                            break;
                        default:
                            posdesc = "井邑白云间，岩城远带山。";
                            break;
                    }
                    break;
                case "江西省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "南昌市":
                            posdesc = "滕王阁诗意盎然，八一广场瓦罐汤热乎乎。";
                            break;
                        case "景德镇市":
                            posdesc = "瓷都窑火千年旺，浮梁古村青花瓷耀眼。";
                            break;
                        case "萍乡市":
                            posdesc = "武功山云海翻腾，安源红色辣椒炒肉香。";
                            break;
                        case "九江市":
                            posdesc = "庐山云雾如仙境，浔阳江鱼鲜庐山茶清香。";
                            break;
                        case "新余市":
                            posdesc = "仙女湖传说浪漫，分宜板鸭新余蜜桔甜。";
                            break;
                        case "鹰潭市":
                            posdesc = "龙虎山道风肃穆，贵溪铜韵麻糍软又香。";
                            break;
                        case "赣州市":
                            posdesc = "瑞金红色摇篮地，赣南脐橙客家围屋美。";
                            break;
                        case "吉安市":
                            posdesc = "井冈山翠竹连天，吉安擂茶庐陵文化浓。";
                            break;
                        case "宜春市":
                            posdesc = "明月山温泉暖身，袁州腊肉宜春粉滑嫩。";
                            break;
                        case "抚州市":
                            posdesc = "才子之乡文风盛，临川牛杂南丰蜜桔甜。";
                            break;
                        case "上饶市":
                            posdesc = "三清山道风清幽，婺源油菜花弋阳年糕香。";
                            break;
                        default:
                            posdesc = "落霞与孤鹜齐飞，秋水共长天一色。";
                            break;
                    }
                    break;
                case "山东省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "济南市":
                            posdesc = "趵突泉水汩汩涌，大明湖畔荷花开满池。";
                            break;
                        case "青岛市":
                            posdesc = "栈桥海风吹过脸，啤酒泡沫海鲜满桌香。";
                            break;
                        case "淄博市":
                            posdesc = "齐国故都遗迹深，周村烧饼博山菜飘香。";
                            break;
                        case "枣庄市":
                            posdesc = "台儿庄古城夜色浓，滕州土豆辣子鸡热乎。";
                            break;
                        case "东营市":
                            posdesc = "黄河入海波涛响，垦利大闸蟹咸鸭蛋香。";
                            break;
                        case "烟台市":
                            posdesc = "蓬莱仙境云雾绕，长岛海鲜烟台苹果甜。";
                            break;
                        case "潍坊市":
                            posdesc = "风筝飞满潍坊天，青州古城潍县萝卜脆。";
                            break;
                        case "济宁市":
                            posdesc = "孔孟之乡书声朗，曲阜孔庙微山湖鱼鲜。";
                            break;
                        case "泰安市":
                            posdesc = "泰山日出云海奇，岱庙古松豆腐宴飘香。";
                            break;
                        case "威海市":
                            posdesc = "刘公岛海风轻拂，荣成海带威海海参鲜。";
                            break;
                        case "日照市":
                            posdesc = "日出东方红霞满，五莲山风绿茶清香浓。";
                            break;
                        case "临沂市":
                            posdesc = "蒙山云雾缭绕间，沂水煎饼临沂炒鸡香。";
                            break;
                        case "德州市":
                            posdesc = "运河古道水悠悠，乐陵小枣扒鸡香喷喷。";
                            break;
                        case "聊城市":
                            posdesc = "东昌湖水映月光，阳谷烧饼水浒英雄传。";
                            break;
                        case "滨州市":
                            posdesc = "孙子故里兵法深，邹平烧饼滨州锅子饼。";
                            break;
                        case "菏泽市":
                            posdesc = "牡丹花开满城香，曹州羊肉汤水煎包热。";
                            break;
                        default:
                            posdesc = "遥望齐州九点烟，一泓海水杯中泻。";
                            break;
                    }
                    break;
                case "河南省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "郑州市":
                            posdesc = "嵩山少林拳声响，烩面热气胡辣汤辣喉。";
                            break;
                        case "开封市":
                            posdesc = "清明上河图重现，包公祠前灌汤包冒热气。";
                            break;
                        case "洛阳市":
                            posdesc = "龙门石窟佛光照，牡丹花艳水席香满桌。";
                            break;
                        case "平顶山市":
                            posdesc = "尧山风光绿意浓，汝州汝瓷叶县烩面香。";
                            break;
                        case "安阳市":
                            posdesc = "殷墟甲骨文诉古，红旗渠水扁粉菜滚烫。";
                            break;
                        case "鹤壁市":
                            posdesc = "淇河水清鱼儿跃，浚县庙会石子馍香脆。";
                            break;
                        case "新乡市":
                            posdesc = "太行山雄伟入云，辉县烧鸡新乡烩面浓。";
                            break;
                        case "焦作市":
                            posdesc = "云台山瀑布飞流，沁阳驴肉武陟油茶香。";
                            break;
                        case "濮阳市":
                            posdesc = "濮阳杂技翻腾空，范县大锅菜龙碑悠远。";
                            break;
                        case "许昌市":
                            posdesc = "灞陵桥关羽英姿，鄢陵花海许昌烩面香。";
                            break;
                        case "漯河市":
                            posdesc = "沙澧河风光旖旎，舞阳贾湖酒辣子鸡热。";
                            break;
                        case "三门峡市":
                            posdesc = "仰韶文化彩陶古，灵宝苹果陕县羊肉汤。";
                            break;
                        case "南阳市":
                            posdesc = "卧龙岗诸葛遗风，南阳烩面镇平玉雕美。";
                            break;
                        case "商丘市":
                            posdesc = "火神台祭祀声响，永城芒砀山牛肉汤滚烫。";
                            break;
                        case "信阳市":
                            posdesc = "鸡公山夏日清凉，信阳毛尖焖鸡香扑鼻。";
                            break;
                        case "周口市":
                            posdesc = "太昊陵古木参天，淮阳泥泥狗周口烧饼香。";
                            break;
                        case "驻马店市":
                            posdesc = "嵖岈山奇石嶙峋，确山凉粉汝南臭豆腐香。";
                            break;
                        case "济源市":
                            posdesc = "王屋山道风清幽，土馍香脆黄河鲤鱼鲜。";
                            break;
                        default:
                            posdesc = "可否带我品尝河南烩面啦？";
                            break;
                    }
                    break;
                case "湖北省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "武汉市":
                            posdesc = "黄鹤楼上江风吹，热干面香江汉路夜市。";
                            break;
                        case "黄石市":
                            posdesc = "西塞山前江水流，大冶铜绿山炒米香浓。";
                            break;
                        case "十堰市":
                            posdesc = "武当山道风悠远，丹江口鱼宴竹溪绿茶香。";
                            break;
                        case "宜昌市":
                            posdesc = "三峡大坝气势宏，秭归脐橙宜昌烤鱼鲜。";
                            break;
                        case "襄阳市":
                            posdesc = "古隆中诸葛遗迹，襄阳牛肉面唐城夜色美。";
                            break;
                        case "鄂州市":
                            posdesc = "吴王城古韵悠长，梁子湖鱼鲜武昌鱼香浓。";
                            break;
                        case "荆门市":
                            posdesc = "明显陵古木森森，钟祥蟠龙菜沙洋花似海。";
                            break;
                        case "孝感市":
                            posdesc = "董永故里孝感深，米酒甜香麻糖脆又香。";
                            break;
                        case "荆州市":
                            posdesc = "荆州古城墙巍峨，洪湖莲藕监利黄鳝鲜。";
                            break;
                        case "黄冈市":
                            posdesc = "东坡赤壁诗意浓，麻城杜鹃黄梅戏悠扬。";
                            break;
                        case "咸宁市":
                            posdesc = "赤壁温泉暖身心，通山竹笋咸宁桂花香。";
                            break;
                        case "随州市":
                            posdesc = "炎帝神农祭坛古，大洪山风随州香菇香。";
                            break;
                        case "恩施土家族苗族自治州":
                            posdesc = "恩施大峡谷云雾绕，利川莼菜土家舞翩翩。";
                            break;
                        case "仙桃市":
                            posdesc = "排湖湿地风光美，仙桃蒸菜毛嘴卤鸡香。";
                            break;
                        case "潜江市":
                            posdesc = "龙虾红遍潜江街，烧鸡热乎油焖虾鲜美。";
                            break;
                        case "天门市":
                            posdesc = "陆羽茶肆香袅袅，天门蒸菜黄潭米粉滑。";
                            break;
                        case "神农架林区":
                            posdesc = "神农顶林海茫茫，野人传说木鱼香菇鲜。";
                            break;
                        default:
                            posdesc = "来碗热干面！";
                            break;
                    }
                    break;
                case "湖南省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "长沙市":
                            posdesc = "橘子洲头烟火美，臭豆腐香湘江夜景明。";
                            break;
                        case "株洲市":
                            posdesc = "炎帝陵前祭祖声，醴陵瓷器株洲炒粉香。";
                            break;
                        case "湘潭市":
                            posdesc = "韶山伟人故里静，槟榔嚼着臭干子辣喉。";
                            break;
                        case "衡阳市":
                            posdesc = "衡山云雾缭绕间，南岳香火衡阳米粉滑。";
                            break;
                        case "邵阳市":
                            posdesc = "崀山丹霞奇峰立，猪血丸子宝庆竹刻美。";
                            break;
                        case "岳阳市":
                            posdesc = "岳阳楼下洞庭阔，鱼宴鲜美君山银针香。";
                            break;
                        case "常德市":
                            posdesc = "桃花源里人间静，津市牛肉粉常德米粉香。";
                            break;
                        case "张家界市":
                            posdesc = "武陵源峰刺苍穹，天门山玻璃栈道三下锅。";
                            break;
                        case "益阳市":
                            posdesc = "洞庭湖畔渔歌起，安化黑茶益阳擂茶香。";
                            break;
                        case "郴州市":
                            posdesc = "东江湖雾气袅袅，苏仙岭幽莽山蟒蛇奇。";
                            break;
                        case "永州市":
                            posdesc = "舜帝陵前古木森，江永女书零陵臭豆腐香。";
                            break;
                        case "怀化市":
                            posdesc = "洪江古商城夜色浓，芷江抗战侗族大歌扬。";
                            break;
                        case "娄底市":
                            posdesc = "梅山文化神秘深，冷水江钢娄底米粉滑。";
                            break;
                        case "湘西土家族苗族自治州":
                            posdesc = "凤凰古城灯火明，芙蓉镇米豆腐苗鼓响。";
                            break;
                        default:
                            posdesc = "74751，长沙斯塔克。";
                            break;
                    }
                    break;
                case "广东省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "广州市":
                            posdesc = "广州塔夜色迷人，早茶一口烧腊满嘴香。";
                            break;
                        case "深圳市":
                            posdesc = "科技之城灯火亮，蛇口海风吹来鱼丸汤。";
                            break;
                        case "珠海市":
                            posdesc = "情侣路海浪轻拍，横琴蚝香飘满渔女像。";
                            break;
                        case "汕头市":
                            posdesc = "老街骑楼诉往事，牛肉丸汤咕嘟冒热气。";
                            break;
                        case "佛山市":
                            posdesc = "祖庙香火祈福声，醒狮舞动黄飞鸿故里。";
                            break;
                        case "韶关市":
                            posdesc = "丹霞山红岩耸立，南华寺禅意曲江鱼头香。";
                            break;
                        case "湛江市":
                            posdesc = "硇洲岛海风咸湿，吴川鸡焖得满屋飘香。";
                            break;
                        case "肇庆市":
                            posdesc = "七星岩湖光潋滟，端砚刻字裹蒸粽黏香。";
                            break;
                        case "江门市":
                            posdesc = "开平碉楼如画卷，台山海鲜陈皮鸭汤浓。";
                            break;
                        case "茂名市":
                            posdesc = "放鸡岛海水清澈，荔枝熟透电白海鲜鲜。";
                            break;
                        case "惠州市":
                            posdesc = "西湖水映罗浮山，惠东海龟东江盐焗鸡。";
                            break;
                        case "梅州市":
                            posdesc = "客家围屋炊烟起，梅江桥下酿豆腐飘香。";
                            break;
                        case "汕尾市":
                            posdesc = "红海湾浪花翻滚，陆丰鱼露海丰甜粿香。";
                            break;
                        case "河源市":
                            posdesc = "万绿湖水清如镜，龙川牛筋糕客家菜香浓。";
                            break;
                        case "阳江市":
                            posdesc = "海陵岛沙滩绵延，阳春鸡啼刀削豆腐滑。";
                            break;
                        case "清远市":
                            posdesc = "漂流激荡英西峰，瑶族风情清新鸡汤香。";
                            break;
                        case "东莞市":
                            posdesc = "工厂烟囱林立间，厚街腊肠烧鹅香扑鼻。";
                            break;
                        case "中山市":
                            posdesc = "孙中山故居静谧，石岐乳鸽酥脆满口香。";
                            break;
                        case "潮州市":
                            posdesc = "牌坊街古韵悠长，潮州工夫茶配牛肉火锅。";
                            break;
                        case "揭阳市":
                            posdesc = "榕江水绕揭西山，普宁豆干卤鹅香四溢。";
                            break;
                        case "云浮市":
                            posdesc = "天露山云雾缭绕，罗定肉桂炖鸡暖胃香。";
                            break;
                        default:
                            posdesc = "老板来两斤福建人。";
                            break;
                    }
                    break;
                case "广西壮族自治区":
                    switch (ipLoacation.result.ad_info.city) {
                        case "南宁市":
                            posdesc = "青秀山绿意盎然，老友粉酸辣扑鼻香。";
                            break;
                        case "柳州市":
                            posdesc = "柳江夜色灯影晃，螺蛳粉热气熏得人流泪。";
                            break;
                        case "桂林市":
                            posdesc = "漓江山水画卷开，阳朔米粉桂花酒清香。";
                            break;
                        case "梧州市":
                            posdesc = "骑楼城里岁月深，六堡茶浓龟苓膏甜凉。";
                            break;
                        case "北海市":
                            posdesc = "银滩浪花白如雪，涠洲岛上海鲜烤得香。";
                            break;
                        case "防城港市":
                            posdesc = "京族哈亭歌声起，金滩海风东兴鱼露香。";
                            break;
                        case "钦州市":
                            posdesc = "三娘湾海豚嬉戏，灵山荔枝坭兴陶古朴。";
                            break;
                        case "贵港市":
                            posdesc = "平天山下荷花艳，桂平米粉罗秀豆腐香。";
                            break;
                        case "玉林市":
                            posdesc = "玉州街头牛腩粉，容县沙田柚甜又多汁。";
                            break;
                        case "百色市":
                            posdesc = "右江水绕红城静，乐业天坑芒果甜如蜜。";
                            break;
                        case "贺州市":
                            posdesc = "姑婆山瀑布飞流，八步米粉黄姚古镇幽。";
                            break;
                        case "河池市":
                            posdesc = "巴马长寿水清甜，凤山溶洞宜州刘三姐。";
                            break;
                        case "来宾市":
                            posdesc = "金秀瑶山云雾绕，合山米粉象州辣椒香。";
                            break;
                        case "崇左市":
                            posdesc = "德天瀑布轰鸣响，凭祥边关大明山雾浓。";
                            break;
                        default:
                            posdesc = "桂林山水甲天下。";
                            break;
                    }
                    break;
                case "海南省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "海口市":
                            posdesc = "骑楼老街椰风吹，椰子鸡汤热气扑鼻来。";
                            break;
                        case "三亚市":
                            posdesc = "天涯海角浪花白，鹿回头下海鲜香四溢。";
                            break;
                        case "三沙市":
                            posdesc = "西沙群岛珊瑚美，南沙海风渔歌声声响。";
                            break;
                        case "儋州市":
                            posdesc = "东坡书院墨香存，儋耳火山和乐蟹鲜嫩。";
                            break;
                        case "五指山市":
                            posdesc = "五指山巅云雾绕，黎族竹饭清香扑鼻来。";
                            break;
                        case "琼海市":
                            posdesc = "博鳌海风拂面来，椰子饭香万泉河水清。";
                            break;
                        case "文昌市":
                            posdesc = "航天城里火箭起，文昌鸡嫩椰汁甜又香。";
                            break;
                        case "万宁市":
                            posdesc = "兴隆咖啡飘香远，东山岭上和乐蟹鲜美。";
                            break;
                        case "东方市":
                            posdesc = "鱼鳞洲海浪拍岸，感恩鸡饭香气满街巷。";
                            break;
                        case "定安县":
                            posdesc = "百里百村荔枝红，定安粽子咸鸭蛋黏香。";
                            break;
                        case "屯昌县":
                            posdesc = "南吕岭下椰树摇，屯昌猪脚姜盐味浓郁。";
                            break;
                        case "澄迈县":
                            posdesc = "福山咖啡香四溢，老城桥头富硒米饭香。";
                            break;
                        case "临高县":
                            posdesc = "临高乳猪皮脆嫩，新盈港边渔家乐鲜香。";
                            break;
                        case "白沙黎族自治县":
                            posdesc = "白沙绿茶清香冽，黎族山歌响彻山林间。";
                            break;
                        case "昌江黎族自治县":
                            posdesc = "棋子湾海风轻拂，霸王岭下木棉花开艳。";
                            break;
                        case "乐东黎族自治县":
                            posdesc = "龙沐湾夕阳如画，尖峰岭里香蕉甜又香。";
                            break;
                        case "陵水黎族自治县":
                            posdesc = "南湾猴岛猴儿跳，分界洲海鲜椰饭香扑鼻。";
                            break;
                        case "保亭黎族苗族自治县":
                            posdesc = "七仙岭温泉冒热气，槟榔谷里苗歌声悠扬。";
                            break;
                        case "琼中黎族苗族自治县":
                            posdesc = "黎母山绿意葱茏，什寒村里竹筒饭飘香。";
                            break;
                        default:
                            posdesc = "朝观日出逐白浪，夕看云起收霞光。";
                            break;
                    }
                    break;
                case "四川省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "成都市":
                            posdesc = "熊猫懒卧竹林间，火锅麻辣串串香满街。";
                            break;
                        case "自贡市":
                            posdesc = "盐井深藏千年史，恐龙骨架辣椒炒肉香。";
                            break;
                        case "攀枝花市":
                            posdesc = "阳光洒满攀西地，芒果甜熟米易烤鱼香。";
                            break;
                        case "泸州市":
                            posdesc = "泸州老窖醉人香，江阳夜市烧烤烟袅袅。";
                            break;
                        case "德阳市":
                            posdesc = "三星堆青铜神秘，旌湖水清什邡板鸭香。";
                            break;
                        case "绵阳市":
                            posdesc = "涪江水绕科技城，江油肥肠李白故里幽。";
                            break;
                        case "广元市":
                            posdesc = "剑门关险蜀道难，朝天核桃利州豆腐香。";
                            break;
                        case "遂宁市":
                            posdesc = "观音湖水波光闪，蓬溪书法射洪米粉香。";
                            break;
                        case "内江市":
                            posdesc = "甜城糖香满街巷，隆昌豆花资中兔子鲜。";
                            break;
                        case "乐山市":
                            posdesc = "峨眉山佛光普照，乐山大佛下钵钵鸡辣香。";
                            break;
                        case "南充市":
                            posdesc = "阆中古城灯火明，丝绸飘香张飞牛肉干。";
                            break;
                        case "眉山市":
                            posdesc = "东坡故里泡菜香，三苏祠里瓦屋山云绕。";
                            break;
                        case "宜宾市":
                            posdesc = "五粮液醇香扑鼻，翠屏山下燃面辣得爽。";
                            break;
                        case "广安市":
                            posdesc = "小平故里红旗飘，华蓥山险武胜火锅香。";
                            break;
                        case "达州市":
                            posdesc = "巴山夜雨湿衣裳，宣汉米粉通川腊肉香。";
                            break;
                        case "雅安市":
                            posdesc = "雨城蒙顶茶清香，碧峰峡里鱼头汤滚烫。";
                            break;
                        case "巴中市":
                            posdesc = "恩阳古镇石桥静，光雾山红叶巴山腊肉香。";
                            break;
                        case "资阳市":
                            posdesc = "安岳柠檬酸爽口，乐至烧烤雁江陈毅故里。";
                            break;
                        case "阿坝藏族羌族自治州":
                            posdesc = "九寨沟水碧如玉，黄龙彩池酥油茶飘香。";
                            break;
                        case "甘孜藏族自治州":
                            posdesc = "康定情歌响山间，稻城亚丁酥油饼香浓。";
                            break;
                        case "凉山彝族自治州":
                            posdesc = "泸沽湖水映彝歌，西昌烤鱼邛海月色明。";
                            break;
                        default:
                            posdesc = "康康川妹子。";
                            break;
                    }
                    break;
                case "贵州省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "贵阳市":
                            posdesc = "花溪湿地清风吹，丝娃娃酸汤鱼辣得欢。";
                            break;
                        case "六盘水市":
                            posdesc = "乌蒙山巅凉风起，盘州火腿水城羊肉粉香。";
                            break;
                        case "遵义市":
                            posdesc = "赤水瀑布轰鸣响，茅台酒醇遵义辣鸡面。";
                            break;
                        case "安顺市":
                            posdesc = "黄果树水帘洞奇，镇宁布依地戏蜡染美。";
                            break;
                        case "毕节市":
                            posdesc = "织金溶洞钟乳奇，百里杜鹃花开豆干香。";
                            break;
                        case "铜仁市":
                            posdesc = "梵净山云雾缭绕，思南米粉江口豆腐干香。";
                            break;
                        case "黔东南苗族侗族自治州":
                            posdesc = "凯里酸汤鱼辣喉，侗寨鼓楼苗歌响山间。";
                            break;
                        case "黔南布依族苗族自治州":
                            posdesc = "荔波小七孔水清，瓮安草塘布依米酒香。";
                            break;
                        case "黔西南布依族苗族自治州":
                            posdesc = "兴义万峰林如画，马岭河峡谷鸡辣角鲜香。";
                            break;
                        default:
                            posdesc = "茅台，学生，再塞200。";
                            break;
                    }
                    break;
                case "云南省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "昆明市":
                            posdesc = "翠湖春城花满枝，过桥米线热气扑鼻来。";
                            break;
                        case "曲靖市":
                            posdesc = "珠江源头水潺潺，宣威火腿麒麟汽锅鸡。";
                            break;
                        case "玉溪市":
                            posdesc = "抚仙湖水清如镜，烟草飘香聂耳故里幽。";
                            break;
                        case "保山市":
                            posdesc = "腾冲热海蒸汽升，和顺古镇潞江咖啡香。";
                            break;
                        case "昭通市":
                            posdesc = "大山包黑颈鹤飞，昭阳苹果天麻炖鸡香。";
                            break;
                        case "丽江市":
                            posdesc = "玉龙雪山白云绕，古城酒吧纳西烤鱼香。";
                            break;
                        case "普洱市":
                            posdesc = "茶园连绵普洱香，景迈山下傣族竹筒饭。";
                            break;
                        case "临沧市":
                            posdesc = "沧江水绕茶山绿，佤族木鼓响鸡肉烂饭。";
                            break;
                        case "楚雄彝族自治州":
                            posdesc = "彝人古镇火把明，禄丰恐龙元谋菌子香。";
                            break;
                        case "红河哈尼族彝族自治州":
                            posdesc = "元阳梯田云雾间，建水豆腐蒙自米线香。";
                            break;
                        case "文山壮族苗族自治州":
                            posdesc = "普者黑湖荷花艳，丘北辣椒麻栗坡药膳。";
                            break;
                        case "西双版纳傣族自治州":
                            posdesc = "傣族泼水笑声起，勐腊热带水果烤鱼香。";
                            break;
                        case "大理白族自治州":
                            posdesc = "洱海月色苍山静，大理三道茶烧饵块香。";
                            break;
                        case "德宏傣族景颇族自治州":
                            posdesc = "瑞丽边关孔雀舞，芒市傣味景颇手抓饭。";
                            break;
                        case "怒江傈僳族自治州":
                            posdesc = "怒江峡谷水激荡，福贡傈僳腊肉石板粑粑。";
                            break;
                        case "迪庆藏族自治州":
                            posdesc = "香格里拉雪山静，藏民酥油茶松茸汤香浓。";
                            break;
                        default:
                            posdesc = "玉龙飞舞云缠绕，万仞冰川直耸天。";
                            break;
                    }
                    break;
                case "西藏自治区":
                    switch (ipLoacation.result.ad_info.city) {
                        case "拉萨市":
                            posdesc = "布达拉宫金顶耀，甜茶馆里酥油茶飘香。";
                            break;
                        case "日喀则市":
                            posdesc = "珠峰脚下风雪狂，扎什伦布寺里糌粑香。";
                            break;
                        case "昌都市":
                            posdesc = "然乌湖水映雪山，强巴林寺藏香猪肉香。";
                            break;
                        case "林芝市":
                            posdesc = "桃花开满雅鲁藏布江，南迦巴瓦酥油饼香浓。";
                            break;
                        case "山南市":
                            posdesc = "桑耶寺钟声悠扬，雍布拉康下青稞酒醇香。";
                            break;
                        case "那曲市":
                            posdesc = "羌塘草原牦牛跑，那曲虫草酥油茶暖身。";
                            break;
                        case "阿里地区":
                            posdesc = "冈仁波齐朝圣路，札达土林羊肉汤滚烫。";
                            break;
                        default:
                            posdesc = "躺在茫茫草原上，仰望蓝天。";
                            break;
                    }
                    break;
                case "陕西省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "西安市":
                            posdesc = "兵马俑列阵森严，肉夹馍香回民街夜色浓。";
                            break;
                        case "铜川市":
                            posdesc = "耀州瓷器烧千年，药王山下陈炉豆腐香。";
                            break;
                        case "宝鸡市":
                            posdesc = "太白山云雾缭绕，岐山臊子面辣得直流汗。";
                            break;
                        case "咸阳市":
                            posdesc = "乾陵石像肃穆立，泾阳茯茶三原金线油塔。";
                            break;
                        case "渭南市":
                            posdesc = "华山险峰刺云霄，富平柿饼大荔冬枣甜。";
                            break;
                        case "延安市":
                            posdesc = "窑洞黄土红旗飘，宝塔山下羊肉泡馍香。";
                            break;
                        case "汉中市":
                            posdesc = "汉江水绕褒斜道，勉县烤鱼汉中热米皮。";
                            break;
                        case "榆林市":
                            posdesc = "沙漠边城榆阳古，佳县小米靖边羊肉香。";
                            break;
                        case "安康市":
                            posdesc = "瀛湖水清鱼儿跃，平利茶叶岚皋魔芋香。";
                            break;
                        case "商洛市":
                            posdesc = "金丝峡谷云雾深，商南核桃柞水木耳香。";
                            break;
                        default:
                            posdesc = "来份臊子面加馍。";
                            break;
                    }
                    break;
                case "甘肃省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "兰州市":
                            posdesc = "黄河水畔拉面香，白塔山下牛肉汤滚烫。";
                            break;
                        case "嘉峪关市":
                            posdesc = "长城尽头雄关立，戈壁风吹烧烤羊肉香。";
                            break;
                        case "金昌市":
                            posdesc = "金川镍都灯火明，永昌驴肉当归炖鸡香。";
                            break;
                        case "白银市":
                            posdesc = "黄河石林奇景现，会宁红军扁豆面香浓。";
                            break;
                        case "天水市":
                            posdesc = "麦积山佛窟幽深，秦州呱呱天水花牛苹果。";
                            break;
                        case "武威市":
                            posdesc = "凉州古城汉墓静，民勤沙枣雷台葡萄酒香。";
                            break;
                        case "张掖市":
                            posdesc = "丹霞地貌色彩艳，山丹马场肃南羊肉香。";
                            break;
                        case "平凉市":
                            posdesc = "崆峒山道风清幽，泾川苹果静宁烧鸡香。";
                            break;
                        case "酒泉市":
                            posdesc = "敦煌莫高窟壁画，玉门油田瓜州蜜瓜甜。";
                            break;
                        case "庆阳市":
                            posdesc = "周祖陵前黄土厚，庆城药材环县羊羔肉。";
                            break;
                        case "定西市":
                            posdesc = "渭水源头马铃薯，陇西药材岷县当归香。";
                            break;
                        case "陇南市":
                            posdesc = "武都花椒辣满口，成县核桃文县绿茶香。";
                            break;
                        case "临夏回族自治州":
                            posdesc = "黄河三峡水激荡，东乡手抓永靖酿皮香。";
                            break;
                        case "甘南藏族自治州":
                            posdesc = "拉卜楞寺转经声，夏河草原酥油茶飘香。";
                            break;
                        default:
                            posdesc = "羌笛何须怨杨柳，春风不度玉门关。";
                            break;
                    }
                    break;
                case "青海省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "西宁市":
                            posdesc = "塔尔寺彩绘鲜艳，湟中酩馏酒酿皮子香浓。";
                            break;
                        case "海东市":
                            posdesc = "互助土族彩虹乡，乐都柳湾青稞酒飘香。";
                            break;
                        case "海北藏族自治州":
                            posdesc = "祁连山下牧歌响，门源油菜花海酥油香。";
                            break;
                        case "黄南藏族自治州":
                            posdesc = "热贡唐卡画艺精，尖扎藏药同仁酥油茶。";
                            break;
                        case "海南藏族自治州":
                            posdesc = "龙羊峡水天一色，贵德梨花牦牛肉干香。";
                            break;
                        case "果洛藏族自治州":
                            posdesc = "玛多黄河源头静，阿尼玛卿雪山糌粑香。";
                            break;
                        case "玉树藏族自治州":
                            posdesc = "玉树地震重生地，文成公主庙酥油茶暖身。";
                            break;
                        case "海西蒙古族藏族自治州":
                            posdesc = "柴达木盐湖闪耀，德令哈尕海牛肉干香浓。";
                            break;
                        default:
                            posdesc = "牛肉干和老酸奶都好好吃。";
                            break;
                    }
                    break;
                case "宁夏回族自治区":
                    switch (ipLoacation.result.ad_info.city) {
                        case "银川市":
                            posdesc = "贺兰山下葡萄甜，西夏王陵羊肉泡馍香。";
                            break;
                        case "石嘴山市":
                            posdesc = "大武口煤城灯火，平罗枸杞惠农羊杂碎。";
                            break;
                        case "吴忠市":
                            posdesc = "黄河水灌青铜峡，利通滩羊同心手抓香。";
                            break;
                        case "固原市":
                            posdesc = "六盘山红军足迹，泾源蜂蜜彭阳荞面香。";
                            break;
                        case "中卫市":
                            posdesc = "沙坡头黄沙漫天，高庙古钟腾格里羊肉香。";
                            break;
                        default:
                            posdesc = "大漠孤烟直，长河落日圆。";
                            break;
                    }
                    break;
                case "新疆维吾尔自治区":
                    switch (ipLoacation.result.ad_info.city) {
                        case "乌鲁木齐市":
                            posdesc = "天山雪峰刺苍穹，大巴扎里烤羊肉飘香。";
                            break;
                        case "克拉玛依市":
                            posdesc = "油城黑油山静谧，魔鬼城风蚀羊肉串辣香。";
                            break;
                        case "吐鲁番市":
                            posdesc = "火焰山热浪滚滚，葡萄架下哈密瓜甜如蜜。";
                            break;
                        case "哈密市":
                            posdesc = "哈密瓜甜汁满口，巴里坤草原烤全羊香浓。";
                            break;
                        case "昌吉回族自治州":
                            posdesc = "天山天池碧水映，阜康烤肉呼图壁酿皮香。";
                            break;
                        case "博尔塔拉蒙古族自治州":
                            posdesc = "赛里木湖蓝如宝石，博乐烤鱼精河枸杞甜。";
                            break;
                        case "巴音郭楞蒙古族自治州":
                            posdesc = "罗布泊边胡杨立，库尔勒香梨焉耆马奶酒。";
                            break;
                        case "阿克苏地区":
                            posdesc = "塔里木河灌果园，温宿核桃阿克苏苹果甜。";
                            break;
                        case "克孜勒苏柯尔克孜族自治州":
                            posdesc = "帕米尔高原鹰飞，阿图什无花果烤包子香。";
                            break;
                        case "喀什地区":
                            posdesc = "艾提尕尔清真寺，喀什老城馕饼羊肉香。";
                            break;
                        case "和田地区":
                            posdesc = "和田玉石温润美，沙漠公路羊肉抓饭香浓。";
                            break;
                        case "伊犁哈萨克族自治州":
                            posdesc = "那拉提草原风吹，伊宁熏马肠果子沟花海。";
                            break;
                        case "塔城地区":
                            posdesc = "额敏河水清如镜，塔城馕坑烤肉沙湾辣子鸡。";
                            break;
                        case "阿勒泰地区":
                            posdesc = "喀纳斯湖水怪传，福海烤鱼布尔津奶酪香。";
                            break;
                        case "石河子市":
                            posdesc = "军垦绿洲棉花白，石河子桃甜烤羊腿飘香。";
                            break;
                        default:
                            posdesc = "驼铃古道丝绸路，胡马犹闻唐汉风。";
                            break;
                    }
                    break;
                case "台湾省":
                    switch (ipLoacation.result.ad_info.city) {
                        case "台北市":
                            posdesc = "101大楼刺夜空，士林夜市珍珠奶茶香。";
                            break;
                        case "新北市":
                            posdesc = "九份老街灯笼明，淡水渔港卤肉饭扑鼻。";
                            break;
                        case "桃园市":
                            posdesc = "大溪豆干香满街，石门水库鱼汤鲜又甜。";
                            break;
                        case "台中市":
                            posdesc = "逢甲夜市热闹非凡，太阳饼酥台中米糕香。";
                            break;
                        case "台南市":
                            posdesc = "安平古堡诉往事，担仔面香赤崁楼夜色。";
                            break;
                        case "高雄市":
                            posdesc = "爱河夜景波光闪，旗津海鲜六合夜市香。";
                            break;
                        default:
                            posdesc = "我在这头，大陆在那头。";
                            break;
                    }
                    break;
                case "香港特别行政区":
                    posdesc = "维港夜景璀璨如星，烧鹅酥脆港式奶茶香。";
                    break;
                case "澳门特别行政区":
                    posdesc = "大三巴牌坊诉沧桑，葡式蛋挞赌城灯火明。";
                    break;
                default:
                    posdesc = "带我去你的城市逛逛吧！";
                    break;
            }
            break;
        default:
            posdesc = "带我去你的国家逛逛吧。";
            break;
    }

    // 根据本地时间切换欢迎语
    let timeChange;
    let date = new Date();
    if (date.getHours() >= 5 && date.getHours() < 11) timeChange = "<span>上午好</span>，一日之计在于晨！";
    else if (date.getHours() >= 11 && date.getHours() < 13) timeChange = "<span>中午好</span>，该摸鱼吃午饭了。";
    else if (date.getHours() >= 13 && date.getHours() < 15) timeChange = "<span>下午好</span>，懒懒地睡个午觉吧！";
    else if (date.getHours() >= 15 && date.getHours() < 16) timeChange = "<span>三点几啦</span>，一起饮茶呀！";
    else if (date.getHours() >= 16 && date.getHours() < 19) timeChange = "<span>夕阳无限好！</span>";
    else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<span>晚上好</span>，夜生活嗨起来！";
    else timeChange = "夜深了，早点休息，少熬夜。";

    // 将欢迎信息写入页面
    try {
        document.getElementById("welcome-info").innerHTML =
            `<b><center>🎉 欢迎信息 🎉</center>  来自 <span style="color:#97e6f2">${pos}</span> 的小伙伴，${timeChange}您现在距离站长约 <span style="color:#97e6f2">${dist}</span> 公里，当前的IP地址为： <span style="color:#97e6f2">${ip}</span>， ${posdesc}</b>`;
    } catch (err) {
        console.log("无法获取#welcome-info元素:", err);
    }
}

// 页面加载时执行
window.onload = showWelcome;

// 如果使用Pjax，监听Pjax完成事件
document.addEventListener('pjax:complete', showWelcome);