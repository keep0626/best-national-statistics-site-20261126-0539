# 数览中国 · 2024年国家统计

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/keep0626/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/keep0626/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

一个原创的纯静态国家统计小站：国家是中国，数字全部来自国家统计局《2024年国民经济和社会发展统计公报》（2025年2月28日），按公报取整呈现，每个数字标年份、站内注明来源。

## 栏目

- **总览**：2024年十大 headline 指标卡片 + GDP 五年图
- **人口**：年末总人口、出生率/死亡率、年龄结构、农民工
- **经济**：GDP 五年走势、三次产业结构、粮食产量、主要经济指标
- **就业**：城镇新增就业、调查失业率、人均可支配收入（城乡）
- **物价**：CPI / PPI 五年涨幅、2024年分项
- **贸易**：进出口总额、出口/进口、顺差、民营企业与“一带一路”
- **地区**：2024年生产总值前八省份，可排序、可搜索

## 怎么做到的

- 纯静态站，`app/` 下无构建步骤；所有脚本、样式、字体、图片都在 `app/` 内，零网络请求。
- 图表全部手写 SVG（`app/charts.js`），不用外部图表库；配色与排版原创。
- Hash 路由（`#/overview` 等），桌面 Chrome 与手机均可打开。
- `main.ts`（Node 22，标准库 only）把 `app/` 与 `screenshots/` 复制到输出目录，并用 `vendor/makefun-frontend.ts` 写 `dossier.json`。

## 本地运行

```sh
python3 -m http.server 8080 --directory app
# 打开 http://localhost:8080/
```

提交产物检查：

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```
