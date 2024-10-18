// utils/globalClickHandler.ts

import { Ref, onMounted, onBeforeUnmount } from 'vue';

export function useGlobalClickHandler(
  refs: Array<Ref<HTMLElement | null>>,
  callback: () => void
) {
  const handleClick = (event: MouseEvent) => {
    let clickedInside = false;

    for (const ref of refs) {
      const el = ref.value;
      if (el && el.contains(event.target as Node)) {
        clickedInside = true;
        break;
      }
    }

    if (!clickedInside) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleClick);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClick);
  });
}