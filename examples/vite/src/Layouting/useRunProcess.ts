import type { Node } from '@vue-flow/core'
import { useVueFlow } from '@vue-flow/core'

/**
 * Composable to simulate running a process tree.
 *
 * It loops through each node, pretends to run an async process, and updates the node's data indicating whether the process has finished.
 * When one node finishes, the next one starts.
 *
 * When a node has multiple descendants, it will run them in parallel.
 */
export function useRunProcess() {
  const { updateNodeData } = useVueFlow()

  const running = ref(false)
  const executedNodes = new Set<string>()

  async function runNode(node: { id: string }, dagreGraph: dagre.graphlib.Graph) {
    if (executedNodes.has(node.id)) {
      return
    }

    executedNodes.add(node.id)

    updateNodeData(node.id, { isRunning: true, isFinished: false, hasError: false })

    // Simulate an async process with a random timeout between 1 and 3 seconds
    const delay = Math.floor(Math.random() * 2000) + 1000
    await new Promise((resolve) => setTimeout(resolve, delay))

    const children = dagreGraph.successors(node.id) as unknown as string[]

    // Randomly decide whether the node will throw an error
    const willThrowError = Math.random() < 0.15

    if (willThrowError) {
      updateNodeData(node.id, { isRunning: false, hasError: true })

      await skipDescendants(node.id, dagreGraph)
      return
    }

    updateNodeData(node.id, { isRunning: false, isFinished: true })

    // Run the process on the children in parallel
    await Promise.all(
      children.map((id) => {
        return runNode({ id }, dagreGraph)
      }),
    )
  }

  async function run(nodes: Node[], dagreGraph: dagre.graphlib.Graph) {
    if (running.value) {
      return
    }

    reset(nodes)

    running.value = true

    // Get all starting nodes (nodes with no predecessors)
    const startingNodes = nodes.filter((node) => dagreGraph.predecessors(node.id)?.length === 0)

    // Run the process on all starting nodes in parallel
    await Promise.all(startingNodes.map((node) => runNode(node, dagreGraph)))

    running.value = false
    executedNodes.clear()
  }

  function reset(nodes: Node[]) {
    for (const node of nodes) {
      updateNodeData(node.id, { isRunning: false, isFinished: false, hasError: false, isSkipped: false })
    }
  }

  async function skipDescendants(nodeId: string, dagreGraph: dagre.graphlib.Graph) {
    const children = dagreGraph.successors(nodeId) as unknown as string[]

    for (const child of children) {
      updateNodeData(child, { isRunning: false, isSkipped: true })
      await skipDescendants(child, dagreGraph)
    }
  }

  return { run, running }
}
