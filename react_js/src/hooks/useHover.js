import { useEffect, useState } from "react";

const useHover = ref => {
  const
    [isHovering, setIsHovering] = useState(false),
    on = () => setIsHovering(true),
    off = () => setIsHovering(false);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    
    node.addEventListener('mouseenter', on);
    node.addEventListener('mousemove', on);
    node.addEventListener('mouseleave', off);
    return () => {
      node.removeEventListener('mouseenter', on);
      node.removeEventListener('mousemove', on);
      node.removeEventListener('mouseleave', off);
    }
  }, [ref]);

  return isHovering;
};

export default useHover;