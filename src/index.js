import MagicString from 'magic-string';
import { createFilter } from '@rollup/pluginutils';
// fix vue 3.0.7 keyframes remove scoped
export default function keyframesScopedFix(options = {}) {
    const filter = createFilter(options.include, options.exclude);
    const pattern = new RegExp('(from|\\d{1,3}%|to)(\\[data-v-.+){','g');
    return {
        name: 'keyframesScopedFix',
        transform(code, id) {
            if (!filter(id)) return null;
            return executeReplacement(code);
        }
    };
    function executeReplacement(code) {
        const magicString = new MagicString(code);
        if (!codeHasReplacements(code, magicString)) return null;
        return { code: magicString.toString() };
    }
    function codeHasReplacements(code, magicString) {
        let result = false;
        let match;
        while ((match = pattern.exec(code))) {
            result = true;
            const start = match.index;
            const end = start + match[0].length;
            const replacement = String(match[0].replace(/\[\S+\]/g, ''));
            magicString.overwrite(start, end, replacement);
        }
        return result;
    }
}