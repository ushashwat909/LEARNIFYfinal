import java.util.*;

class Marker {
    // Return B closest points to origin
    public List<List<Integer>> solve(int[][] A, int B) {
        // Calculate squared distance (no need for sqrt since we're just comparing)
        List<int[]> points = new ArrayList<>();
        for (int i = 0; i < A.length; i++) {
            points.add(new int[]{A[i][0], A[i][1]});
        }
        
        // Sort by squared distance from origin
        Collections.sort(points, (a, b) -> {
            long distA = (long)a[0] * a[0] + (long)a[1] * a[1];
            long distB = (long)b[0] * b[0] + (long)b[1] * b[1];
            return Long.compare(distA, distB);
        });
        
        // Return first B points
        List<List<Integer>> result = new ArrayList<>();
        for (int i = 0; i < B; i++) {
            List<Integer> point = new ArrayList<>();
            point.add(points.get(i)[0]);
            point.add(points.get(i)[1]);
            result.add(point);
        }
        
        return result;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[][] A, int B, List<List<Integer>> output) {
        List<List<Integer>> expected = solve(A, B);
        
        // Sort both lists for comparison (order doesn't matter)
        expected.sort((a, b) -> {
            int cmp = Integer.compare(a.get(0), b.get(0));
            if (cmp != 0) return cmp;
            return Integer.compare(a.get(1), b.get(1));
        });
        
        List<List<Integer>> sortedOutput = new ArrayList<>(output);
        sortedOutput.sort((a, b) -> {
            int cmp = Integer.compare(a.get(0), b.get(0));
            if (cmp != 0) return cmp;
            return Integer.compare(a.get(1), b.get(1));
        });
        
        if (expected.size() != sortedOutput.size()) {
            return false;
        }
        
        for (int i = 0; i < expected.size(); i++) {
            List<Integer> exp = expected.get(i);
            List<Integer> out = sortedOutput.get(i);
            
            if (exp.size() != out.size()) {
                return false;
            }
            
            for (int j = 0; j < exp.size(); j++) {
                if (!exp.get(j).equals(out.get(j))) {
                    return false;
                }
            }
        }
        
        return true;
    }
}





