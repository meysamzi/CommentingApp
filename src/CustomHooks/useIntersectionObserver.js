import { useEffect, useState } from "react";

const useIntersectionObserver = (element) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setInView(entry.isIntersecting);
    });
    observer.observe(element.current);
  }, []);
  return inView;
};

export default useIntersectionObserver;
