export function getFibonacciNumbers(n: number): number[][] {
  if (n === 0) {
    return [[1]];
  }
  if (n === 1) {
    return [[1], [1, 1]];
  }
  const steps: number[][] = [[1], [1, 1]];
  const arr: number[] = [1, 1];
  for (let i = 2; i <= n; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
    steps.push([...arr]);
  }
  return steps;
}
