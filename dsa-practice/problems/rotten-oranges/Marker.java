import java.util.*;

class Marker {
    // Find minimum minutes to rot all oranges using BFS
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
        
        // Directions: Up, Down, Left, Right
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        
        // Initialize queue with all rotten oranges
        Queue<int[]> queue = new LinkedList<>();
        int freshCount = 0;
        
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 2) {
                    queue.offer(new int[]{i, j, 0}); // (row, col, minute)
                } else if (grid[i][j] == 1) {
                    freshCount++;
                }
            }
        }
        
        // BFS to rot fresh oranges
        int minutes = 0;
        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            int i = cell[0];
            int j = cell[1];
            minutes = cell[2];
            
            for (int[] dir : directions) {
                int ni = i + dir[0];
                int nj = j + dir[1];
                
                if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && grid[ni][nj] == 1) {
                    grid[ni][nj] = 2; // Rot this orange
                    freshCount--;
                    queue.offer(new int[]{ni, nj, minutes + 1});
                }
            }
        }
        
        // If there are still fresh oranges, return -1
        return (freshCount > 0) ? -1 : minutes;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[][] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}

