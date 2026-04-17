class Marker {
    public int solve(int A, int B) {
        int result = 0;
        result = result | (1 << A);
        result = result | (1 << B);
        return result;
    }

    public boolean isCorrect(int A, int B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}





