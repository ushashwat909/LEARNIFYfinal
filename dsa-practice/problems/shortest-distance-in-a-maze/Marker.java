import java.util.*;

class Marker {
    // Find shortest distance using Dijkstra's algorithm
    public int solve(int[][] A, int[] B, int[] C) {
        int rows = A.length;
        int cols = A[0].length;
        int startX = B[0];
        int startY = B[1];
        int destX = C[0];
        int destY = C[1];
        
        // Directions: Up, Down, Left, Right
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        
        // Priority queue for Dijkstra's algorithm: (distance, x, y)
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        heap.offer(new int[]{0, startX, startY});
        
        Set<String> visited = new HashSet<>();
        
        while (!heap.isEmpty()) {
            int[] current = heap.poll();
            int dist = current[0];
            int x = current[1];
            int y = current[2];
            
            String key = x + "," + y;
            if (visited.contains(key)) {
                continue;
            }
            visited.add(key);
            
            // If we reach the destination
            if (x == destX && y == destY) {
                return dist;
            }
            
            // Explore all directions
            for (int[] dir : directions) {
                int dx = dir[0];
                int dy = dir[1];
                int nx = x;
                int ny = y;
                int steps = 0;
                
                // Roll until hitting a wall
                while (nx + dx >= 0 && nx + dx < rows && 
                       ny + dy >= 0 && ny + dy < cols && 
                       A[nx + dx][ny + dy] == 0) {
                    nx += dx;
                    ny += dy;
                    steps++;
                }
                
                String nextKey = nx + "," + ny;
                if (!visited.contains(nextKey)) {
                    heap.offer(new int[]{dist + steps, nx, ny});
                }
            }
        }
        
        // If destination is not reachable
        return -1;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[][] A, int[] B, int[] C, int output) {
        int expected = solve(A, B, C);
        return expected == output;
    }
}

