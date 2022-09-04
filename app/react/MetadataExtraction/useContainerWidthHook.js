"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.useContainerWidth = useContainerWidth;var _react = require("react");

function useContainerWidth(containerRef) {
  const [containerWidth, setWidth] = (0, _react.useState)(0);

  (0, _react.useLayoutEffect)(() => {
    const readWidth = () => {var _containerRef$current;
      setWidth(((_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.offsetWidth) || 0);
    };

    readWidth();

    window.addEventListener('resize', readWidth);
    return () => {
      window.removeEventListener('resize', readWidth);
    };
  }, []);

  return containerWidth;
}