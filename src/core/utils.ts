import { JSDOM } from "jsdom";

import { decode } from "html-entities";

export function sanitizeString(str: string): string {
  // Replace invalid characters with an empty string
  const sanitized = str.replace(/[^\w.-]/g, "");
  // Trim any remaining whitespace
  return sanitized.trim().replace(/-/g, "__");
}

export function formatPath(path: string): string {
  return path.replace(/\\/g, "/");
}

/**
 * Adds a script tag with the specified source to the given HTML code.
 * 在给定的HTML代码中添加带有指定源的脚本标签。
 *
 * @param {string} htmlCode - The HTML code to which the script tag will be added.
 *                           将要添加脚本标签的HTML代码。
 * @param {string} scriptSrc - The source URL of the script to be added.
 *                           要添加的脚本的源URL。
 * @param {"head" | "body" | "head-prepend" | "body-prepend"} position - The position where the script tag should be inserted.
 *                                                                    脚本标签应该插入的位置。
 *                                                                    Possible values: "head", "body", "head-prepend", "body-prepend".
 *                                                                    可能的值: "head", "body", "head-prepend", "body-prepend"。
 * @returns {string} Returns the modified HTML code with the added script tag.
 *                  返回带有添加的脚本标签的修改后的HTML代码。
 */
export function addScriptToHtmlCode(htmlCode: string, scriptSrc: string, position: "head" | "body" | "head-prepend" | "body-prepend" = "head-prepend"): string {
  // Create a DOM environment using jsdom
  const dom = new JSDOM(htmlCode);

  // Create a new script element
  const scriptElement = dom.window.document.createElement("script");
  scriptElement.src = scriptSrc;
  scriptElement.type = "module";

  // Get the target element where the script tag should be inserted
  const targetElement = (position === "body" || position === "body-prepend")
    ? dom.window.document.body
    : dom.window.document.head;

  if (position === "head-prepend" || position === "body-prepend") {
    // Prepend the script tag to the target element
    targetElement.insertBefore(scriptElement, targetElement.firstChild);
  } else {
    // Append the script tag to the target element
    targetElement.appendChild(scriptElement);
  }

  // Serialize the updated HTML code
  const updatedHtmlCode = dom.serialize();

  return updatedHtmlCode;
}

/**
 * Decode HTML entities (HTML实体编码) in a string.
 * 解码字符串中的HTML实体编码。
 *
 * @param {string} encodedString - The string containing HTML entities to decode.
 *                                包含需要解码的HTML实体编码的字符串。
 * @returns {string} Returns the decoded string.
 *                  返回解码后的字符串。
 */
export function decodeHtmlEntities(encodedString: string): string {
  return decode(encodedString, { level: "xml", scope: "strict" });
}
