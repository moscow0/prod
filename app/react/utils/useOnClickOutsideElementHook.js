"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.useOnClickOutsideElement = useOnClickOutsideElement;var _react = require("react");

function useOnClickOutsideElement(
ref,
cb)
{
  (0, _react.useEffect)(() => {
    const onClickHandler = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      cb(event);
    };

    document.addEventListener('click', onClickHandler);
    return () => {
      document.removeEventListener('click', onClickHandler);
    };
  }, [ref, cb]);
}