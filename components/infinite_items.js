// 参考:无尽滚动的复杂度 -- 来自 Google 大神的拆解
// https://getpocket.com/a/read/1716193304
// 代码:
// https://github.com/GoogleChromeLabs/ui-element-samples/blob/gh-pages/infinite-scroller/scripts/infinite-scroll.js


// 实例化的 element 数量
const RUNWAY_ITEMS = 20;

// 实例化的 element 数量(反方向)
const RUNWAY_ITEMS_OPPOSITE = 5;

// 额外可以滚动的pixel
const SCROLL_RUNWAY = 2000;

// 替换 tombstones 的fade 动画时间
const ANIMATION_DURATION_MS = 200;


class InfiniteScrollerSource {
    constructor(){}


}
