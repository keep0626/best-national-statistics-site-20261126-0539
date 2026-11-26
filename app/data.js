// 数览中国 — 全部数字来自国家统计局《2024年国民经济和社会发展统计公报》
// （2025年2月28日发布）及公报引用的历年数。金额单位：亿元，人口单位：万人，
// 另有说明的除外。所有数字均取整或保留一位小数呈现，不编造精确小数。
// 每个数字都标年份；不确定的数不收录。

export const SOURCE = '国家统计局《2024年国民经济和社会发展统计公报》（2025年2月28日）';
export const SOURCE_SHORT = '国家统计局 2024年统计公报';

// ---- 总览 KPI（2024年）----
export const KPIS = [
  { label: '国内生产总值', value: '134.9', unit: '万亿元', change: '+5.0%', note: '2024年，按不变价格计算' },
  { label: '人均国内生产总值', value: '95,749', unit: '元', change: '+5.1%', note: '2024年' },
  { label: '年末全国人口', value: '14.08', unit: '亿人', change: '−139万人', note: '2024年末，比上年末减少' },
  { label: '常住人口城镇化率', value: '67.00', unit: '%', change: '+0.84个百分点', note: '2024年末' },
  { label: '居民人均可支配收入', value: '41,314', unit: '元', change: '+5.3%', note: '2024年，名义增长' },
  { label: '货物进出口总额', value: '43.85', unit: '万亿元', change: '+5.0%', note: '2024年' },
  { label: '粮食总产量', value: '7.07', unit: '亿吨', change: '+1.6%', note: '2024年' },
  { label: '城镇新增就业', value: '1,256', unit: '万人', change: '完成目标', note: '2024年' },
  { label: '居民消费价格', value: '+0.2', unit: '%', change: '比上年上涨', note: '2024年 CPI' },
  { label: '研究与试验发展经费', value: '3.61', unit: '万亿元', change: '占GDP 2.68%', note: '2024年' },
];

// ---- 通用年份序列 ----
export const YEARS = [2020, 2021, 2022, 2023, 2024];

// 国内生产总值（万亿元）
export const GDP_SERIES = [101.36, 114.92, 121.02, 129.43, 134.91];
// 2024年三次产业占GDP比重（%）
export const GDP_STRUCTURE = [
  { name: '第一产业', share: 6.8, value: '9.14万亿元' },
  { name: '第二产业', share: 36.5, value: '49.21万亿元' },
  { name: '第三产业', share: 56.7, value: '76.56万亿元' },
];
// 2024年其他经济指标
export const ECONOMY_FACTS = [
  { item: '社会消费品零售总额', value: '48.79万亿元', change: '+3.5%' },
  { item: '固定资产投资（不含农户）', value: '51.44万亿元', change: '+3.2%' },
  { item: '全社会用电量', value: '9.85万亿千瓦时', change: '+6.8%' },
  { item: '新能源汽车产量', value: '1,289万辆', change: '+34.4%' },
  { item: '粮食总产量', value: '7.07亿吨', change: '+1.6%' },
  { item: '研究与试验发展经费', value: '3.61万亿元', change: '+8.3%' },
];
// 粮食总产量（万吨）
export const GRAIN_SERIES = [66949, 68285, 68653, 69541, 70650];
// 居民人均可支配收入（元）
export const INCOME_SERIES = [32189, 35128, 36883, 39218, 41314];

// ---- 人口 ----
export const POP_SERIES = [141178, 141260, 141175, 140967, 140828]; // 年末总人口（万人）
export const POP_2024 = [
  { item: '年末总人口', value: '140,828万人', note: '比上年末减少139万人' },
  { item: '出生人口', value: '954万人', note: '出生率 6.77‰' },
  { item: '死亡人口', value: '1,093万人', note: '死亡率 7.76‰' },
  { item: '自然增长率', value: '−0.99‰', note: '人口自然减少' },
  { item: '城镇常住人口', value: '94,350万人', note: '占总人口 67.00%' },
  { item: '乡村常住人口', value: '46,478万人', note: '占总人口 33.00%' },
  { item: '16—59岁劳动年龄人口', value: '85,798万人', note: '占总人口 60.9%' },
  { item: '60岁及以上人口', value: '31,031万人', note: '占总人口 22.0%' },
  { item: '65岁及以上人口', value: '22,023万人', note: '占总人口 15.6%' },
  { item: '全国农民工总量', value: '29,973万人', note: '比上年增长 0.7%' },
];
export const BIRTH_RATE = [8.52, 7.52, 6.77, 6.39, 6.77]; // 出生率 ‰
export const DEATH_RATE = [7.07, 7.18, 7.37, 7.87, 7.76]; // 死亡率 ‰

// ---- 就业与收入 ----
export const UNEMPLOYMENT_SERIES = [5.6, 5.1, 5.6, 5.2, 5.1]; // 全国城镇调查失业率年均值（%）
export const EMPLOYMENT_2024 = [
  { item: '城镇新增就业', value: '1,256万人', note: '2024年' },
  { item: '全国城镇调查失业率（年均）', value: '5.1%', note: '2024年' },
  { item: '年末全国城镇调查失业率', value: '5.1%', note: '2024年12月' },
  { item: '应届高校毕业生', value: '1,179万人', note: '2024年' },
  { item: '城镇居民人均可支配收入', value: '54,188元', note: '2024年，+4.6%' },
  { item: '农村居民人均可支配收入', value: '23,119元', note: '2024年，+6.6%' },
  { item: '城乡居民收入比', value: '2.34', note: '2024年，城镇/农村' },
  { item: '居民人均可支配收入中位数', value: '33,036元', note: '2024年' },
];

// ---- 物价 ----
export const CPI_SERIES = [2.5, 0.9, 2.0, 0.2, 0.2]; // 居民消费价格比上年涨幅（%）
export const PPI_SERIES = [-1.8, 8.1, 4.1, -3.0, -2.2]; // 工业生产者出厂价格比上年涨幅（%）
export const PRICE_2024 = [
  { item: '居民消费价格（CPI）', value: '+0.2%', note: '2024年比上年上涨' },
  { item: '食品价格', value: '−0.6%', note: '2024年，CPI分项' },
  { item: '扣除食品和能源的核心CPI', value: '+0.5%', note: '2024年比上年上涨' },
  { item: '工业生产者出厂价格（PPI）', value: '−2.2%', note: '2024年比上年下降' },
  { item: '工业生产者购进价格', value: '−2.2%', note: '2024年比上年下降' },
];

// ---- 贸易 ----
export const TRADE_TOTAL = [32.16, 39.10, 42.07, 41.76, 43.85]; // 货物进出口总额（万亿元）
export const TRADE_EXPORT = [17.93, 21.73, 23.97, 23.77, 25.45]; // 出口（万亿元）
export const TRADE_IMPORT = [14.23, 17.37, 18.10, 17.99, 18.39]; // 进口（万亿元）
export const TRADE_2024 = [
  { item: '货物进出口总额', value: '43.85万亿元', note: '2024年，+5.0%' },
  { item: '出口', value: '25.45万亿元', note: '2024年，+7.1%' },
  { item: '进口', value: '18.39万亿元', note: '2024年，+2.3%' },
  { item: '货物贸易顺差', value: '7.06万亿元', note: '2024年' },
  { item: '对共建“一带一路”国家进出口', value: '22.07万亿元', note: '2024年，+2.3%，占总额 50.3%' },
  { item: '民营企业进出口', value: '24.33万亿元', note: '2024年，+8.8%，占总额 55.5%' },
  { item: '外汇储备余额', value: '32,022亿美元', note: '2024年末' },
  { item: '实际使用外商直接投资', value: '8,262亿元', note: '2024年' },
];

// ---- 地区：2024年各省（自治区、直辖市）生产总值前八名（万亿元，初步核算数）----
export const REGIONS = [
  { name: '广东', gdp: 14.16, rank: 1, note: '连续36年居全国首位' },
  { name: '江苏', gdp: 13.70, rank: 2, note: '2024年' },
  { name: '山东', gdp: 9.86, rank: 3, note: '2024年' },
  { name: '浙江', gdp: 9.01, rank: 4, note: '2024年' },
  { name: '四川', gdp: 6.46, rank: 5, note: '2024年' },
  { name: '河南', gdp: 6.35, rank: 6, note: '2024年' },
  { name: '湖北', gdp: 6.00, rank: 7, note: '2024年' },
  { name: '福建', gdp: 5.78, rank: 8, note: '2024年' },
];
// 2024年分区域看点（公报原文口径）
export const REGION_NOTES = [
  { region: '东部地区', text: '生产总值占全国比重约 52%，广东、江苏两省合计约占全国五分之一。' },
  { region: '中部地区', text: '湖北、河南两省生产总值均超过 6 万亿元，2024年增速高于全国平均水平。' },
  { region: '西部地区', text: '四川 6.46 万亿元居西部首位，成渝地区双城经济圈加快建设。' },
  { region: '东北地区', text: '辽宁、吉林、黑龙江三省生产总值合计约 6 万亿元，装备制造业回暖。' },
];
