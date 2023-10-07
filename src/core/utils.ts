import { logger } from "@kirklin/logger";

export function sanitizeString(str: string): string {
  // Replace invalid characters with an empty string
  const sanitized = str.replace(/[^\w.-]/g, "");
  // Trim any remaining whitespace
  return sanitized.trim().replace(/-/g, "__");
}

export function formatPath(path: string): string {
  return path.replace(/\\/g, "/");
}

// 添加<head>标签到HTML代码中
export function addHeadTag(code: string) {
  // 检查是否已经有<head>标签
  if (code.includes("<head>")) {
    // console.log("已经存在<head>标签");
    return code;
  }

  // 如果没有<head>标签，添加一个空的<head>标签
  const headTag = "<head></head>";
  return code.replace(/<html[^>]*>/i, `$&${headTag}`);
}

// 添加JS脚本到<head>标签中
export function addScriptToHead(code: string, scriptSrc: string) {
  // 使用正则表达式匹配<head>标签
  const headRegex = /<head[^>]*>/i;
  const match = code.match(headRegex);

  if (match) {
    // 匹配到<head>标签
    const headTag = match[0];
    const jsScript = `<script crossorigin src="${scriptSrc}"></script>`;

    // 在<head>标签内部末尾插入JS脚本
    const transformedCode = code.replace(headTag, headTag + jsScript);
    return transformedCode;
  } else {
    // 如果没有匹配到<head>标签，可能是无效的HTML代码
    logger.error("无法找到<head>标签");
    return code;
  }
}
