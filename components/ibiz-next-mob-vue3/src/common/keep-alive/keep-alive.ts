/* eslint-disable */
import {
  callWithAsyncErrorHandling,
  cloneVNode,
  ComponentInternalInstance,
  ComponentOptions,
  ConcreteComponent,
  getCurrentInstance,
  isVNode,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  SetupContext,
  TransitionHooks,
  VNode,
  VNodeProps,
  watch,
} from 'vue';
import { getComponentName, queuePostFlushCb } from './scheduler';

const __DEV__ = true;

export const enum ShapeFlags {
  ELEMENT = 1,
  FUNCTIONAL_COMPONENT = 1 << 1,
  STATEFUL_COMPONENT = 1 << 2,
  TEXT_CHILDREN = 1 << 3,
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT,
}

export const enum MoveType {
  ENTER,
  LEAVE,
  REORDER
}

export interface ComponentRenderContext {
  [key: string]: any;
  _: ComponentInternalInstance;
}

type MatchPattern = string | RegExp | (string | RegExp)[];

export interface KeepAliveProps {
  keyList: string[];
  include?: MatchPattern;
  exclude?: MatchPattern;
  max?: number | string;
}

type CacheKey = string | number | symbol | ConcreteComponent;
type Cache = Map<CacheKey, VNode>;
type Keys = Set<CacheKey>;

export const isKeepAlive = (vnode: VNode): boolean =>
  (vnode.type as any).__isKeepAlive;

const KeepAliveImpl = {
  name: `IBizKeepAlive`,

  // Marker for special handling inside the renderer. We are not using a ===
  // check directly on KeepAlive in the renderer, because importing it directly
  // would prevent it from being tree-shaken.
  __isKeepAlive: true,

  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number],
    keyList:[Array]
  },

  setup(props: KeepAliveProps, { slots }: SetupContext) {
    const instance = getCurrentInstance()! as any;
    // KeepAlive communicates with the instantiated renderer via the
    // ctx where the renderer passes in its internals,
    // and the KeepAlive instance exposes activate/deactivate implementations.
    // The whole point of this is to avoid importing KeepAlive directly in the
    // renderer to facilitate tree-shaking.
    const sharedContext = instance.ctx;

    const cache: Cache = new Map();
    const keys: Keys = new Set();
    let current: VNode | null = null;

    if (__DEV__) {
      (instance as any).__v_cache = cache;
    }

    const parentSuspense = instance.suspense;

    const {
      renderer: {
        p: patch,
        m: move,
        um: _unmount,
        o: { createElement },
      },
    } = sharedContext;

    const storageContainer = createElement('div');

    sharedContext.activate = (vnode: any, container: any, anchor: any, isSVG: any, optimized: any) => {
      const instance = vnode.component!
      move(vnode, container, anchor, MoveType.ENTER, parentSuspense)
      // in case props have changed
      patch(
        instance.vnode,
        vnode,
        container,
        anchor,
        instance,
        parentSuspense,
        isSVG,
        vnode.slotScopeIds,
        optimized
      )
      queuePostRenderEffect(() => {
        instance.isDeactivated = false
        if (instance.a) {
          invokeArrayFns(instance.a)
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeMounted
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance.parent, vnode)
        }
      })
      if (__DEV__) {
        // Update components tree
        devtoolsComponentAdded(instance)
      }
    }

    sharedContext.deactivate = (vnode: VNode) => {
      const instance = vnode.component!
      move(vnode, storageContainer, null, MoveType.LEAVE, parentSuspense)
      queuePostRenderEffect(() => {
        if ((instance as any).da) {
          invokeArrayFns((instance as any).da)
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance.parent, vnode)
        }
        instance.isDeactivated = true
      })
      if (__DEV__) {
        // Update components tree
        devtoolsComponentAdded(instance)
      }
    }

    function unmount(vnode: VNode) {
      // reset the shapeFlag so it can be properly unmounted
      resetShapeFlag(vnode);
      _unmount(vnode, instance, parentSuspense, true);
    }

    function pruneCache(filter?: (name: string) => boolean) {
      cache.forEach((vnode, key) => {
        const name = getComponentName(vnode.type as ConcreteComponent);
        if (name && (!filter || !filter(name))) {
          pruneCacheEntry(key);
        }
      });
    }

    function pruneCache2(filter?: (name: string) => boolean) {
      cache.forEach((vnode, key) => {
        const name = vnode.key as string;
        // 这边根据keyList确定删除哪个
        // console.log(11, vnode, vnode.key, (filter && filter(name)));
        if (name && (filter && filter(name))) {
          pruneCacheEntry(key);
        }
      });
    }

    function pruneCacheEntry(key: CacheKey) {
      const cached = cache.get(key) as VNode;
      if (!current || cached.type !== current.type) {
        unmount(cached);
      } else if (current) {
        // current active instance should no longer be kept-alive.
        // we can't unmount it now but it might be later, so reset its flag now.
        resetShapeFlag(current);
      }
      cache.delete(key);
      keys.delete(key);
    }

    // prune cache on include/exclude prop change
    watch(
      () => [props.include, props.exclude, props.keyList],
      ([include, exclude, keyList]) => {
        include && pruneCache(name => matches(include, name));
        exclude && pruneCache(name => !matches(exclude, name));
        keyList && pruneCache2(name => !matches(keyList, name));
      },
      // prune post-render after `current` has been updated
      { flush: 'post', deep: true },
    );

    // cache sub tree after render
    let pendingCacheKey: CacheKey | null = null;
    const cacheSubtree = () => {
      // fix #1621, the pendingCacheKey could be 0
      if (pendingCacheKey != null) {
        cache.set(pendingCacheKey, getInnerChild(instance.subTree));
      }
    };
    onMounted(cacheSubtree);
    onUpdated(cacheSubtree);

    onBeforeUnmount(() => {
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const key in cache) {
        pruneCacheEntry(key);
      }
    });

    return () => {
      pendingCacheKey = null;

      if (!slots.default) {
        return null;
      }

      const children = slots.default();
      const rawVNode = children[0];
      if (children.length > 1) {
        console.log(`KeepAlive should contain exactly one component child.`);
        current = null;
        return children;
      }
      if (
        !isVNode(rawVNode) ||
        (!(rawVNode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) &&
          !(rawVNode.shapeFlag & ShapeFlags.SUSPENSE))
      ) {
        current = null;
        return rawVNode;
      }

      let vnode = getInnerChild(rawVNode);
      const comp = vnode.type as ConcreteComponent;

      // for async components, name check should be based in its loaded
      // inner component if available
      const name = getComponentName(
        isAsyncWrapper(vnode)
          ? (vnode.type as ComponentOptions).__asyncResolved || {}
          : comp,
      );

      const { include, exclude, max, keyList } = props;

      // 获取第一个子组件上面的key
      const slotKey = vnode.key;
      // 如果 componentName 没有作为keep-alive被包含进来，直接返回
      if (
        // 包括并且不匹配的
        (include && (!name || !matches(include, name))) ||
        // 排除并且匹配的
        (exclude && name && matches(exclude, name)) ||
        // keyList中存在并且不匹配的
        (keyList && !slotKey && !matches(keyList, slotKey))
      ) {
        current = vnode;
        return rawVNode;
      }

      const key = vnode.key == null ? comp : vnode.key;
      const cachedVNode = cache.get(key);

      // clone vnode if it's reused because we are going to mutate it
      if (vnode.el) {
        vnode = cloneVNode(vnode);
        if (rawVNode.shapeFlag & ShapeFlags.SUSPENSE) {
          (rawVNode as any).ssContent = vnode;
        }
      }
      // #1513 it's possible for the returned vnode to be cloned due to attr
      // fallthrough or scopeId, so the vnode here may not be the final vnode
      // that is mounted. Instead of caching it directly, we store the pending
      // key and cache `instance.subTree` (the normalized vnode) in
      // beforeMount/beforeUpdate hooks.
      pendingCacheKey = key;

      if (cachedVNode) {
        // copy over mounted state
        vnode.el = cachedVNode.el;
        vnode.component = cachedVNode.component;
        if (vnode.transition) {
          // recursively update transition hooks on subTree
          setTransitionHooks(vnode, vnode.transition!);
        }
        // avoid vnode being mounted as fresh
        vnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE;
        // make this key the freshest
        keys.delete(key);
        keys.add(key);
      } else {
        keys.add(key);
        // prune oldest entry
        if (max && keys.size > parseInt(max as string, 10)) {
          pruneCacheEntry(keys.values().next().value);
        }
      }
      // avoid vnode being unmounted
      vnode.shapeFlag |= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;

      current = vnode;
      vnode.keepAlive = true;
      vnode.curPath = slotKey;
      return vnode;
    };
  },
};


// export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files
export const IBizKeepAlive = KeepAliveImpl as any as {
  __isKeepAlive: true;
  new (): {
    $props: VNodeProps & KeepAliveProps;
  };
};

function matches(pattern: MatchPattern, name: string): boolean {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  }
  if (typeof pattern === 'string') {
    return pattern.split(',').includes(name);
  }
  if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */
  return false;
}

function resetShapeFlag(vnode: VNode) {
  // bitwise operations to remove keep alive flags
  vnode.shapeFlag &= ~ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE;
  vnode.shapeFlag &= ~ShapeFlags.COMPONENT_KEPT_ALIVE;
}

function getInnerChild(vnode: VNode) {
  return vnode.shapeFlag & ShapeFlags.SUSPENSE ? (vnode as any).ssContent! : vnode;
}


function isRegExp(v:MatchPattern) {
  return Object.prototype.toString.call(v) === '[object RegExp]';
}


export const isAsyncWrapper = (i: ComponentInternalInstance | VNode): boolean =>
!!(i.type as ComponentOptions).__asyncLoader

export function setTransitionHooks(vnode: VNode, hooks: TransitionHooks) {
  if (vnode.shapeFlag & ShapeFlags.COMPONENT && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks)
  } else {
    vnode.transition = hooks
  }
}

export const invokeArrayFns = (fns: Function[], arg?: any) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg)
  }
}

export const queuePostRenderEffect = queuePostFlushCb;

export function invokeVNodeHook(
  hook: any,
  instance: ComponentInternalInstance | null,
  vnode: VNode,
  prevVNode: VNode | null = null
) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ])
}

const enum DevtoolsHooks {
  APP_INIT = 'app:init',
  APP_UNMOUNT = 'app:unmount',
  COMPONENT_UPDATED = 'component:updated',
  COMPONENT_ADDED = 'component:added',
  COMPONENT_REMOVED = 'component:removed',
  COMPONENT_EMIT = 'component:emit',
  PERFORMANCE_START = 'perf:start',
  PERFORMANCE_END = 'perf:end'
}

export const devtoolsComponentAdded = /*#__PURE__*/ createDevtoolsComponentHook(
  DevtoolsHooks.COMPONENT_ADDED
)

function createDevtoolsComponentHook(hook: DevtoolsHooks) {
  return (component: ComponentInternalInstance) => {
    emit(
      hook,
      component.appContext.app,
      component.uid,
      component.parent ? component.parent.uid : undefined,
      component
    )
  }
}

function emit(event: string, ...args: any[]) {
  if ((window as any).__VUE_DEVTOOLS_GLOBAL_HOOK__) {
    (window as any).__VUE_DEVTOOLS_GLOBAL_HOOK__.emit(event, ...args)
  }
}
