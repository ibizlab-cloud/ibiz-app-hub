import { onMounted, onBeforeUnmount } from 'vue';

/**
 *  监听popstate事件
 * @param callback
 */
export const usePopstateListener = (callback: () => void): void => {
  const handlePopstate = () => {
    callback();
  };

  onMounted(() => {
    window.addEventListener('popstate', handlePopstate);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('popstate', handlePopstate);
  });
};
