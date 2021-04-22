# 抽奖插件

lucky-canvas 的 React 组件

```tsx
import { LuckyWheel, LuckyGrid } from 'react-lucky-canvas';

export default function Test() {
  return (
    <div>
      // 大转盘抽奖
      <LuckyWheel width={300} {...LuckyWheelProps}></LuckyWheel>
      // 九宫格抽奖
      <LuckyGrid width={300} {...LuckyGridProps}></LuckyGrid>
    </div>
  );
}
```

[lucky-canvas 文档](https://100px.net/docs/grid/blocks.html)

[示例](https://jian263994241.github.io/react-lucky-canvas/storybook-static)
