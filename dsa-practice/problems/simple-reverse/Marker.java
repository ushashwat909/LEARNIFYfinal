class Marker {
    // Reverse the string using two pointers
    public String solve(String A) {
        char[] arr = A.toCharArray();
        int n = arr.length;
        int i = 0;
        int j = n - 1;
        
        // Swap characters from both ends
        while (i < j) {
            char temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j--;
        }
        
        return new String(arr);
    }

    // Compare the output with expected result
    public boolean isCorrect(String A, String output) {
        String expected = solve(A);
        return expected.equals(output);
    }
}

