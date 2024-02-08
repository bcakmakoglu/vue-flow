import { ref, toRef, toValue } from 'vue'
import { useVueFlow } from '@vue-flow/core'

/**
 * Composable to simulate running a process tree.
 *
 * It loops through each node, pretends to run an async process, and updates the node's data indicating whether the process has finished.
 * When one node finishes, the next one starts.
 *
 * When a node has multiple descendants, it will run them in parallel.
 */
export function useRunProcess({ graph: dagreGraph, cancelOnError = true }) {
  const { updateNodeData, getConnectedEdges } = useVueFlow()

  const graph = toRef(() => toValue(dagreGraph))

  const isRunning = ref(false)

  const executedNodes = new Set()

  const runningTasks = new Map()

  const upcomingTasks = new Set()

  async function runNode(node, isStart = false) {
    if (executedNodes.has(node.id)) {
      return
    }

    // save the upcoming task in case it gets cancelled before we even start it
    upcomingTasks.add(node.id)

    const incomers = getConnectedEdges(node.id).filter((connection) => connection.target === node.id)

    // wait for edge animations to finish before starting the process
    await Promise.all(incomers.map((incomer) => until(() => !incomer.data.isAnimating)))

    // remove the upcoming task since we are about to start it
    upcomingTasks.clear()

    if (!isRunning.value) {
      // The process was stopped
      return
    }

    // mark the node as executed, so it doesn't run again
    executedNodes.add(node.id)

    updateNodeData(node.id, { isRunning: true, isFinished: false, hasError: false, isCancelled: false })

    // simulate an async process with a random timeout between 1-2 seconds
    const delay = Math.floor(Math.random() * 2000) + 1000

    return new Promise((resolve) => {
      const timeout = setTimeout(
        async () => {
          const children = graph.value.successors(node.id)

          // randomly decide whether the node will throw an error
          const willThrowError = Math.random() < 0.15

          // we avoid throwing an error on the starting node
          if (!isStart && willThrowError) {
            updateNodeData(node.id, { isRunning: false, hasError: true })

            if (toValue(cancelOnError)) {
              await skipDescendants(node.id)
              runningTasks.delete(node.id)

              resolve()
              return
            }
          }

          updateNodeData(node.id, { isRunning: false, isFinished: true })

          runningTasks.delete(node.id)

          if (children.length > 0) {
            // run the process on the children in parallel
            await Promise.all(children.map((id) => runNode({ id })))
          }

          resolve()
        },
        // if this is a starting node, we don't want to wait
        isStart ? 0 : delay,
      )

      // save the timeout so we can cancel it if needed
      runningTasks.set(node.id, timeout)
    })
  }

  async function run(nodes) {
    if (isRunning.value) {
      return
    }

    reset(nodes)

    isRunning.value = true

    // get all starting nodes (nodes with no predecessors)
    const startingNodes = nodes.filter((node) => graph.value.predecessors(node.id)?.length === 0)

    // run the process on all starting nodes in parallel
    await Promise.all(startingNodes.map((node) => runNode(node, true)))

    clear()
  }

  function reset(nodes) {
    clear()

    for (const node of nodes) {
      updateNodeData(node.id, { isRunning: false, isFinished: false, hasError: false, isSkipped: false, isCancelled: false })
    }
  }

  async function skipDescendants(nodeId) {
    const children = graph.value.successors(nodeId)

    for (const child of children) {
      updateNodeData(child, { isRunning: false, isSkipped: true })
      await skipDescendants(child)
    }
  }

  async function stop() {
    isRunning.value = false

    for (const nodeId of upcomingTasks) {
      clearTimeout(runningTasks.get(nodeId))
      runningTasks.delete(nodeId)
      updateNodeData(nodeId, { isRunning: false, isFinished: false, hasError: false, isSkipped: false, isCancelled: true })
      await skipDescendants(nodeId)
    }

    for (const [nodeId, task] of runningTasks) {
      clearTimeout(task)
      runningTasks.delete(nodeId)
      updateNodeData(nodeId, { isRunning: false, isFinished: false, hasError: false, isSkipped: false, isCancelled: true })
      await skipDescendants(nodeId)
    }

    executedNodes.clear()
    upcomingTasks.clear()
  }

  function clear() {
    isRunning.value = false
    executedNodes.clear()
    runningTasks.clear()
  }

  return { run, stop, reset, isRunning }
}

async function until(condition) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (condition()) {
        clearInterval(interval)
        resolve()
      }
    }, 100)
  })
}
