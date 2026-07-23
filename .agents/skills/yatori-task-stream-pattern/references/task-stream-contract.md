# 任务流契约

以 `src/components/TaskInlineItem.tsx` 为准。

## 生命周期

1. 组件先根据当前状态判断要不要拉快照
2. `running` / `stopping` 启动任务详情轮询
3. 每次请求只接受当前组件仍需要的结果
4. 终态仍拉一次快照，补齐最终进度和结果
5. 卸载时清掉 interval 和 timeout

## 数据规则

- `progress.status ?? task.status` 作为有效状态
- 用 `updatedAt` 防止旧包覆盖新包
- `percent` 优先由 `completedUnits / totalUnits` 推导

## 鉴权规则

- 401 不在子层重复 toast，统一走 `onUnauthorized`
- 统一走 `onUnauthorized`

## React 规则

- 请求处理逻辑用 `useEffectEvent` 或稳定回调
- effect 只负责轮询和清理
- 不把每个闭包都塞进依赖数组里导致计时器反复重建

## 适合抽成 hook 的时机

- 两个以上组件都要轮询任务详情
- 同样的请求、终态和旧数据保护逻辑重复两次以上
- 组件本身已经被流逻辑压得看不清
