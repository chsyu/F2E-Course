/**
 * 模擬本地化工具模組（js/vendor/format.js）
 *
 * 教學重點：
 * 在 No-Build 離線教室環境下，共用的工具函式或本地套件可放在專案的 vendor 資料夾，
 * 讓各個模組透過相對路徑直接 import 使用。
 */

export const VENDOR_NAME = 'vendor/format.js';
export const VENDOR_VERSION = '1.0.0-local';

const zhDateFormatter = new Intl.DateTimeFormat('zh-TW', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export const formatDateZh = (isoDate) => {
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return isoDate;
  }
  return zhDateFormatter.format(parsed);
};
