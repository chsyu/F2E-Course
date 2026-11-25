# Ma：Web App Manifest 教學說明

> 對應範例：`wkD/Ma_PWAFireBlog`  
> 系列位置：**Ma（可安裝外觀）→ Mb（Service Worker）→ Mc（離線快取）**

本篇只講 **Ma 的 `manifest.webmanifest`**：它決定「這是什麼 App、圖示長怎樣、開啟後像不像原生應用」。Ma **還沒有** Service Worker，也還沒做離線。

---

## 1. 為什麼先教 Manifest？

PWA 常被拆成三塊能力：

| 能力 | 關鍵技術 | 本系列 |
|------|----------|--------|
| 可安裝、有 App 名稱與圖示 | Web App Manifest | **Ma** |
| 背景攔截網路、可更新 | Service Worker | Mb |
| 離線仍能開殼頁／快取資源 | Cache API + SW 策略 | Mc |

Manifest 是一份 **JSON**，告訴瀏覽器與作業系統：

- 這個網站叫什麼、圖示用哪張
- 從主畫面點進去要開哪一頁
- 要以瀏覽器分頁、還是接近原生 App 的視窗顯示

沒有 Manifest，就很難被辨識成「可安裝的 Web App」。

---

## 2. HTML 怎麼接上 Manifest？

每個頁面的 `<head>` 都要連到同一份 Manifest（Ma 的 `index.html`／`blog.html`／`upload.html` 皆有）：

```html
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#00979c">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="FireBlog">
<link rel="apple-touch-icon" href="icons/icon-192.png">
```

| 標記 | 用途 |
|------|------|
| `link rel="manifest"` | **必要**：指向 Web App Manifest |
| `theme-color` | 瀏覽器 UI（如網址列）色調；宜與 Manifest 的 `theme_color` 一致 |
| `apple-*` / `apple-touch-icon` | **iOS Safari** 對 Manifest 支援較不完整，需額外補圖示與標題 |

課堂提醒：用 **Live Server / `localhost` / HTTPS** 開啟，不要用 `file://` 直接開檔，否則安裝條件通常不成立。

---

## 3. Ma 的 Manifest 全文對照

檔案：`manifest.webmanifest`

```json
{
  "name": "FireBlog",
  "short_name": "FireBlog",
  "description": "Firebase 部落格 PWA",
  "start_url": "./index.html",
  "scope": "./",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#00979c",
  "theme_color": "#00979c",
  "lang": "zh-TW",
  "dir": "ltr",
  "icons": [
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

副檔名可用 `.webmanifest` 或 `.json`；重點是伺服器要以正確 MIME（`application/manifest+json`）提供，且路徑與 `link` 一致。

---

## 4. 欄位說明（上課可逐項講）

### 4.1 名稱與描述

| 欄位 | Ma 的值 | 說明 |
|------|---------|------|
| `name` | `"FireBlog"` | 完整名稱；安裝對話、App 清單等較寬處顯示 |
| `short_name` | `"FireBlog"` | 主畫面圖示下方等空間較窄處；建議 ≤ 12 字元感覺較不易被截斷 |
| `description` | `"Firebase 部落格 PWA"` | 簡短說明 App 用途（商店／安裝相關 UI 可能用到） |

**設定重點**：至少提供 `name` 或 `short_name` 其一（Chromium 安裝條件要求）。兩者都寫較保險。

### 4.2 啟動與範圍

| 欄位 | Ma 的值 | 說明 |
|------|---------|------|
| `start_url` | `"./index.html"` | 從主畫面／Dock 開啟時載入的網址 |
| `scope` | `"./"` | 哪些路徑算「在 App 內」；超出 scope 的連結常會跳出成一般瀏覽器分頁 |

**設定重點**：

- `start_url` 必須落在 `scope` 內。
- Ma 用相對路徑 `./`，適合「整個資料夾就是一個 App」的靜態範例。
- 若之後改 `start_url`（例如加 query），可能影響瀏覽器判斷「是否已安裝同一 App」；正式專案可另設 `id` 固定身分（Ma 未使用，進階再提即可）。

### 4.3 顯示模式與方向

| 欄位 | Ma 的值 | 說明 |
|------|---------|------|
| `display` | `"standalone"` | 隱藏網址列等瀏覽器 UI，看起來像獨立 App |
| `orientation` | `"portrait-primary"` | 偏好直向（手機部落格閱讀較常見） |

常見 `display` 對照：

| 值 | 感覺 |
|----|------|
| `fullscreen` | 幾乎全螢幕 |
| `standalone` | 最像原生 App（Ma 採用） |
| `minimal-ui` | 保留少量瀏覽器控制 |
| `browser` | 一般分頁（幾乎不像「已安裝 App」） |

**設定重點**：要符合 Chromium「可安裝」條件，`display` 需為 `fullscreen`、`standalone`、`minimal-ui` 或 `window-controls-overlay` 之一（不要用 `browser` 當安裝目標）。

### 4.4 色彩

| 欄位 | Ma 的值 | 說明 |
|------|---------|------|
| `background_color` | `"#00979c"` | 啟動畫面／樣式載入前的背景，減少白閃 |
| `theme_color` | `"#00979c"` | 系統／瀏覽器 UI 強調色；宜與 HTML `<meta name="theme-color">` 一致 |

### 4.5 語系

| 欄位 | Ma 的值 | 說明 |
|------|---------|------|
| `lang` | `"zh-TW"` | 預設語言 |
| `dir` | `"ltr"` | 文字方向（左到右） |

### 4.6 圖示 `icons`（最容易踩雷）

Ma 準備了三種宣告：

1. **192×192、`purpose: "any"`** — 一般用途（主畫面等）
2. **512×512、`purpose: "any"`** — 較大尺寸（安裝畫面、高解析度）
3. **512×512、`purpose: "maskable"`** — 給會「裁切成圓／圓角方」的系統（如 Android 自適應圖示）

每個 icon 物件建議都寫齊：

- `src`：圖檔路徑
- `sizes`：如 `"192x192"`、`"512x512"`
- `type`：如 `"image/png"`
- `purpose`：`"any"` 或 `"maskable"`（可分開宣告，如本範例）

**設定重點（課堂必講）**：

- Chromium 安裝條件通常要求 icons 中要有 **192** 與 **512**。
- `maskable` 圖的重要內容應放在中央「安全區」（約內縮，避免被裁掉）。本範例為簡化，`any` 與 `maskable` 共用同一張 512 圖；正式產品建議另做一張專用 maskable。
- 路徑相對於 Manifest 檔案位置；圖檔必須真的存在且可被下載。

---

## 5. 安裝條件與課堂驗收（對齊 Ma）

### 5.1 與 Manifest 直接相關（Ma 要滿足）

在 Chromium（Chrome／Edge 等）上，可安裝的 Manifest 大致需包含：

- [x] `name` 或 `short_name`
- [x] `start_url`
- [x] `display`（非 `browser`）
- [x] `icons` 含 192 與 512
- [x] 未把 `prefer_related_applications` 設成偏好原生 App（Ma 未寫此欄，正確）

再加上執行環境：

- [x] **HTTPS** 或本機 **`localhost` / `127.0.0.1`**
- [ ] 尚未安裝過同一個 App

### 5.2 Ma 刻意不做的事（避免同學混淆）

| 項目 | Ma | 之後 |
|------|----|------|
| Service Worker | 無 | Mb 註冊；Mc 才做快取 |
| 頁內「安裝 App」按鈕 | 無 | Mb 用 `beforeinstallprompt` |
| 離線可用 | 無 | Mc |

因此 Ma 的驗收建議是：

1. DevTools → **Application** → **Manifest**，確認無錯誤、圖示能預覽。
2. 以 `localhost` 開啟後，用瀏覽器選單嘗試「安裝 FireBlog」／「安裝應用程式」。
3. 安裝後從主畫面開啟，應進 `index.html`，且外觀接近 `standalone`（無一般網址列）。

> 說明：自動跳出安裝提示還可能受「使用時長／互動」等 engagement 影響；Ma 沒做自訂按鈕，課堂以 **Application 面板 + 瀏覽器選單安裝** 驗收最穩。

---

## 6. 常見錯誤（除錯清單）

| 現象 | 可能原因 |
|------|----------|
| Manifest 面板空白或 404 | `href` 路徑錯、檔名大小寫不符、未用本機伺服器 |
| 沒有安裝選項 | 不是 HTTPS／localhost；缺 192／512；`display` 不合法；已安裝過 |
| 圖示破圖或空白 | `src` 錯、檔案未部署、`sizes`／實際像素不符 |
| 開啟 App 卻進錯頁 | `start_url` 寫錯或相對路徑基準搞混 |
| 點站內連結卻跳出瀏覽器 | 目標 URL 超出 `scope` |
| iPhone 主畫面圖示不對 | 只改 Manifest 不夠，需確認 `apple-touch-icon` |

---

## 7. 課堂演示建議（約 15–20 分鐘）

1. 打開 `manifest.webmanifest`，對照第 4 節逐欄講「為什麼要寫」。
2. 打開任一 HTML，指出 `link rel="manifest"` 與 `theme-color`／Apple meta 的分工。
3. Chrome DevTools → Application → Manifest，現場看解析結果與 icon。
4. Live Server 開啟 → 選單安裝 → 主畫面啟動，對照 `start_url` 與 `standalone`。
5. 結語預告：Mb 會加 SW 與自訂安裝鈕；Mc 才會斷網仍能開殼頁。

---

## 8. 延伸閱讀

- [MDN：Making PWAs installable](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)
- [MDN：Web app manifest members](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest)
- [web.dev：Add a web app manifest](https://web.dev/articles/add-manifest)
- [web.dev：Installability criteria](https://web.dev/articles/install-criteria)

---

## 9. 一句話總結

**Ma 的 Manifest 負責「品牌、圖示、啟動頁、顯示模式」；把它設對，網站才具備「可安裝成 App」的外觀條件。真正的背景攔截與離線，是 Mb／Mc 的下一課。**
