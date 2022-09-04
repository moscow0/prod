"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.IsTopicClassificationReachable = IsTopicClassificationReachable;exports.useThesaurusNames = exports.tcServer = exports.RPC_DEADLINE_MS = void 0;var _isReachable = _interopRequireDefault(require("is-reachable"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const { TOPIC_CLASSIFICATION_URL } = process.env;
const tcServer = TOPIC_CLASSIFICATION_URL || 'http://localhost:5005';exports.tcServer = tcServer;
const useThesaurusNames = true;exports.useThesaurusNames = useThesaurusNames;

const RPC_DEADLINE_MS = 1000;exports.RPC_DEADLINE_MS = RPC_DEADLINE_MS;

async function IsTopicClassificationReachable() {
  if (!tcServer || tcServer === 'none') {
    return false;
  }
  return (0, _isReachable.default)(tcServer, { timeout: RPC_DEADLINE_MS });
}