/**
 * @typedef {object} Node
 * @property {{ x: number, y: number }} position - The current position of the node.
 */

/**
 * @typedef {object} XYPosition
 * @property {number} x - The target x-coordinate.
 * @property {number} y - The target y-coordinate.
 */

/**
 * @typedef {object} AnimateOptions
 * @property {number} [duration=300] - Total time for the transition in milliseconds.
 * @property {(t: number) => number} [easing] - Easing function that maps a normalized time (0 to 1)
 *                                              to another value (0 to 1). Defaults to linear if not provided.
 * @property {() => void} [onFinished] - Callback fired when the transition completes.
 * @property {(position: XYPosition) => void} [onAnimate] - Callback fired on each animation frame.
 */

/**
 * Creates a function that animates a node from its current position to a given target position.
 *
 * @returns {(node: Node, position: XYPosition, options?: AnimateOptions) => void}
 *          A function that, when invoked, starts the animation.
 */
export function useAnimateNode() {
  return (node, position, options = {}) => {
    const startX = node.position.x
    const startY = node.position.y
    const endX = position.x
    const endY = position.y

    const duration = typeof options.duration === 'number' ? options.duration : 300
    const easing = typeof options.easing === 'function' ? options.easing : (t) => t
    const startTime = performance.now()

    /**
     * Runs one animation frame, updating the node's position based on the elapsed time.
     */
    function animate() {
      const currentTime = performance.now()
      const elapsed = currentTime - startTime
      const t = Math.min(elapsed / duration, 1)
      const easedT = easing(t)

      options.onAnimate({
        x: startX + (endX - startX) * easedT,
        y: startY + (endY - startY) * easedT,
      })

      if (t < 1) {
        requestAnimationFrame(animate)
      } else if (typeof options.onFinished === 'function') {
        options.onFinished()
      }
    }

    // Start the animation
    requestAnimationFrame(animate)
  }
}
