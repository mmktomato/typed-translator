import { MessageResourceContainer } from "./util";

const compareInerfaceNames = (
  leftFilename: string, leftInterfaceNames: string[],
  rightFilename: string, rightInterfaceNames: string[],
) => {
  leftInterfaceNames.forEach(leftInterfaceName => {
    if (!rightInterfaceNames.includes(leftInterfaceName)) {
      throw new Error(`"${leftFilename}" has the key "${leftInterfaceName}" but "${rightFilename}" does not.`);
    }
  });
};

const compareSet = (
  interfaceName: string,
  leftFilename: string, leftSet: Set<string>,
  rightFilename: string, rightSet: Set<string>,
) => {
  Array.from(leftSet).forEach(leftValue => {
    if (!rightSet.has(leftValue)) {
      throw new Error(`"${leftFilename}" has the value "${leftValue}" in "${interfaceName}" but "${rightFilename}" does not.`);
    }
  });
};

const compareTwo = (left: MessageResourceContainer, right: MessageResourceContainer) => {
  // interface names
  const leftInterfaceNames = Object.keys(left.messageResource);
  const rightInterfaceNames = Object.keys(right.messageResource);

  compareInerfaceNames(left.filename, leftInterfaceNames, right.filename, rightInterfaceNames);
  compareInerfaceNames(right.filename, rightInterfaceNames, left.filename, leftInterfaceNames);

  // `leftInterfaceNames` and `rightInterfaceNames` have exactly same contents.

  // values
  leftInterfaceNames.forEach(interfaceName => {
    const leftValues = left.messageResource[interfaceName];
    const rightValues = right.messageResource[interfaceName];

    compareSet(interfaceName, left.filename, leftValues, right.filename, rightValues);
    compareSet(interfaceName, right.filename, rightValues, left.filename, leftValues);
  });
};

// TODO: write unit test.
export const compareMessageResourceContainers = (messageResourceContainers: MessageResourceContainer[]) => {
  if (messageResourceContainers.length < 2) {
    return;
  }

  messageResourceContainers.reduce((prev, cur) => {
    compareTwo(prev, cur);
    return cur;
  });
};
