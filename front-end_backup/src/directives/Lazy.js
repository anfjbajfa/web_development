// lazy.js
export default {
    mounted(el) {
      // 元素挂载时执行
      const imgArr = Array.from(el.getElementsByTagName("img"));
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("开始观察");
            console.log(entry)
            const targetImg = entry.target;
            // 使用自定义属性存储的实际图片地址
            targetImg.src = targetImg._actualSrc || "";
            observer.unobserve(targetImg);
          }
        });
      });
  
      for (let img of imgArr) {
        // 通过变量存储实际的图片地址
        img._actualSrc = img.src;
        img.src = ""; // 设置占位
        observer.observe(img);
      }
  
      // 把 observer 存到元素或别的地方
      el._lazyObserver = observer;
    },
  
    unmounted(el) {
      // 元素卸载时执行
      if (el._lazyObserver) {
        el._lazyObserver.disconnect();
        el._lazyObserver = null;
      }
    },
  };
  