import java.util.*;

class Marker {
    // Find shortest distances from source to all nodes using Dijkstra's algorithm
    public int[] solve(int A, int[][] B, int C) {
        // Build adjacency list
        List<List<int[]>> graph = new ArrayList<>();
        for (int i = 0; i < A; i++) {
            graph.add(new ArrayList<>());
        }
        
        for (int[] edge : B) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];
            graph.get(u).add(new int[]{v, w});
            graph.get(v).add(new int[]{u, w});
        }
        
        // Initialize distance array
        int[] distances = new int[A];
        Arrays.fill(distances, Integer.MAX_VALUE);
        distances[C] = 0;
        
        // Priority queue: (distance, node)
        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        minHeap.offer(new int[]{0, C});
        
        // Dijkstra's algorithm
        while (!minHeap.isEmpty()) {
            int[] current = minHeap.poll();
            int currentDistance = current[0];
            int currentNode = current[1];
            
            // Skip if the current distance is greater than the recorded distance
            if (currentDistance > distances[currentNode]) {
                continue;
            }
            
            // Explore neighbors
            for (int[] neighbor : graph.get(currentNode)) {
                int neighborNode = neighbor[0];
                int weight = neighbor[1];
                int newDistance = currentDistance + weight;
                
                if (newDistance < distances[neighborNode]) {
                    distances[neighborNode] = newDistance;
                    minHeap.offer(new int[]{newDistance, neighborNode});
                }
            }
        }
        
        // Replace Integer.MAX_VALUE with -1 for unreachable nodes
        for (int i = 0; i < A; i++) {
            if (distances[i] == Integer.MAX_VALUE) {
                distances[i] = -1;
            }
        }
        
        return distances;
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int[][] B, int C, int[] output) {
        int[] expected = solve(A, B, C);
        if (expected.length != output.length) {
            return false;
        }
        for (int i = 0; i < expected.length; i++) {
            if (expected[i] != output[i]) {
                return false;
            }
        }
        return true;
    }
}

