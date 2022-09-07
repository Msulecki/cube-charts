const addTimeToNode = (
  target: HTMLElement | SVGSVGElement,
  valueInMs: number
) => {
  const seconds = Math.floor(valueInMs / 100);
  const milliseconds = Number.isFinite(valueInMs)
    ? '.' + valueInMs.toString().slice(-2)
    : '';

  const isHTMLNode = target instanceof HTMLElement;

  const millisecondsNode = isHTMLNode
    ? document.createElement('span')
    : document.createElementNS('http://www.w3.org/2000/svg', 'tspan');

  millisecondsNode.textContent = milliseconds;

  target.textContent = Number.isFinite(seconds) ? seconds.toString() : '--';
  target.appendChild(millisecondsNode);
};
export default addTimeToNode;
