export default {
    mounted(el, binding) {
      // binding.value 即指令绑定的值，比如传入的动画类名：v-fade="'fade-up'"
      const animationClass = binding.value || 'fade-up';
  
      // 先给元素加一个初始的透明度等，确保它在未进入视窗时是隐形的
      el.style.opacity = 0;
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 进入视窗后，给元素添加动画类名，触发 CSS 动画
            el.classList.add(animationClass);
            // 观察一次就够了，防止滚动出可视区又移除等操作
            observer.unobserve(el);
          }
        });
      }, {
        threshold: 0.2,
      });
  
      observer.observe(el);
      // 为了能在组件卸载时断开监听，把 observer 挂在 el 上
      el._fadeObserver = observer;
    },
  
    unmounted(el) {
      if (el._fadeObserver) {
        el._fadeObserver.disconnect();
        delete el._fadeObserver;
      }
    }
  };
  