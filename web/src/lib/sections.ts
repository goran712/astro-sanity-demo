// Unique, non-empty CSS of all Custom Code sections, so the layout can put it in <head>.
export function getCustomCss(sections: { _type: string; css?: string }[] = []): string[] {
  const css = sections
    .filter((section) => section._type === 'customCode' && section.css?.trim())
    .map((section) => section.css as string);
  return [...new Set(css)];
}
