export const findByTestAttr = (wrapper, attrValue) => wrapper.find(`[data-test="${attrValue}"]`);