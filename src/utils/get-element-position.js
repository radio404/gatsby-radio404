const getElementPosition = (element, withScroll=false) => {
  let node = element,
      left = node.offsetLeft,
      top = node.offsetTop;

  node = node.parentNode;

  do {

    try {
      let styles = getComputedStyle(node);

      if (styles) {
        const position = styles.getPropertyValue('position');

        if(withScroll){
          left -= node.scrollLeft;
          top -= node.scrollTop;
        }

        if (/relative|absolute|fixed/.test(position)) {
          left += parseInt(styles.getPropertyValue('border-left-width'), 10);
          top += parseInt(styles.getPropertyValue('border-top-width'), 10);

          left += node.offsetLeft;
          top += node.offsetTop;
        }

        node = position === 'fixed' ? null : node.parentNode;
      } else {
        node = node.parentNode;
      }
    }catch(err){
      node = null;
    }

  } while (node);

  return { left: left, top: top };
}

export default getElementPosition;