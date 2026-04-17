import java.util.*;
class Marker {
    // Print all possible paths from top-left to bottom-right using backtracking
    public List<String> PrintAllPaths(int A, int B) {
        List<String> result = new ArrayList<>();
        StringBuilder path = new StringBuilder();
        backtrack(0, 0, A, B, path, result);
        return result;
    }
    
    private void backtrack(int x, int y, int A, int B, StringBuilder path, List<String> result) {
        // Base case: reached bottom-right corner
        if (x == A - 1 && y == B - 1) {
            result.add(path.toString());
            return;
        }
        
        // Try moving Down first (to maintain lexicographical order)
        if (x < A - 1) {
            path.append('D');
            backtrack(x + 1, y, A, B, path, result);
            path.deleteCharAt(path.length() - 1); // Backtrack
        }
        
        // Try moving Right
        if (y < B - 1) {
            path.append('R');
            backtrack(x, y + 1, A, B, path, result);
            path.deleteCharAt(path.length() - 1); // Backtrack
        }
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int B, List<String> output) {
        List<String> expected = PrintAllPaths(A, B);
        
        // Sort both lists for comparison (paths should already be in lexicographical order)
        Collections.sort(expected);
        List<String> outputCopy = new ArrayList<>(output);
        Collections.sort(outputCopy);
        
        if (expected.size() != outputCopy.size()) {
            return false;
        }
        
        for (int i = 0; i < expected.size(); i++) {
            if (!expected.get(i).equals(outputCopy.get(i))) {
                return false;
            }
        }
        
        return true;
    }
}

