"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
const validateInput = (input) => {
    if (/^([A-Za-z\-\_\d])+$/.test(input))
        return true;
    else
        return "Project name may only include letters, numbers, underscores and hashes.";
};
exports.validateInput = validateInput;
//# sourceMappingURL=index.js.map