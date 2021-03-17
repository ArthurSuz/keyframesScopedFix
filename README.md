fix(compiler-sfc): scope Id should not be attached to the Rules in the keyframes
https://github.com/vuejs/vue-next/pull/3308

---

Vue3.0.7 bug temporary solution, through `plugins` to repair;

```
// vite.congfig.js
import keyframesScopedFix from 'keyframes-scoped-fix';
module.exports = {
    ...
    plugins: [keyframesScopedFix()],
    ...
}
```