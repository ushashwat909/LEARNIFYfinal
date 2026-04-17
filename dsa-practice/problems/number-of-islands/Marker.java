import java.util.*;

class Marker {
    // Count number of islands using BFS
    public int solve(int[][] A) {
        if (A == null || A.length == 0 || A[0].length == 0) {
            return 0;
        }
        
        // Clone the matrix to avoid modifying the original
        int rows = A.length;
        int cols = A[0].length;
        int[][] grid = new int[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                grid[i][j] = A[i][j];
            }
        }
        
        // All 8 directions: up, down, left, right, and 4 diagonals
        int[][] directions = {
            {-1, 0}, {1, 0}, {0, -1}, {0, 1},
            {-1, -1}, {-1, 1}, {1, -1}, {1, 1}
        };
        
        int islandCount = 0;
        
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 1) {
                    // Start BFS for a new island
                    bfs(grid, i, j, rows, cols, directions);
                    islandCount++;
                }
            }
        }
        
        return islandCount;
    }
    
    private void bfs(int[][] grid, int startI, int startJ, int rows, int cols, int[][] directions) {
        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[]{startI, startJ});
        grid[startI][startJ] = 0; // Mark as visited
        
        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            int i = cell[0];
            int j = cell[1];
            
            for (int[] dir : directions) {
                int ni = i + dir[0];
                int nj = j + dir[1];
                
                if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && grid[ni][nj] == 1) {
                    grid[ni][nj] = 0; // Mark as visited
                    queue.offer(new int[]{ni, nj});
                }
            }
        }
    }

    // Compare the output with expected result
    public boolean isCorrect(int[][] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}

