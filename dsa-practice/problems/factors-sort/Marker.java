import java.util.*;
class Marker {
    // Returns array sorted by number of factors, then by value
    public int[] solve(int[] A) {
        int[] arr = A.clone(); // Work with a copy to avoid modifying original
        
        // Custom comparator using Integer array for sorting
        Integer[] arrInteger = new Integer[arr.length];
        for (int i = 0; i < arr.length; i++) {
            arrInteger[i] = arr[i];
        }
        
        Arrays.sort(arrInteger, new Comparator<Integer>() {
            @Override
            public int compare(Integer n1, Integer n2) {
                int a = countFactors(n1);
                int b = countFactors(n2);
                if (a < b) {
                    return -1;
                } else if (b < a) {
                    return 1;
                } else {
                    // If factors are equal, compare by value
                    return Integer.compare(n1, n2);
                }
            }
        });
        
        // Convert back to int array
        for (int i = 0; i < arr.length; i++) {
            arr[i] = arrInteger[i];
        }
        return arr;
    }
    
    private int countFactors(int n) {
        int cnt = 0;
        int sqrtN = (int) Math.sqrt(n);
        for (int i = 1; i <= sqrtN; i++) {
            if (n % i == 0) {
                if (i == n / i) {
                    cnt += 1;
                } else {
                    cnt += 2;
                }
            }
        }
        return cnt;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int[] output) {
        int[] expected = solve(A);
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





