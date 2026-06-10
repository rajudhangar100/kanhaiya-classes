export async function generateStudentId(
  standard,
  count
) {
  const sequence =
    String(count + 1).padStart(
      3,
      "0"
    );

  return `${standard}${sequence}`;
}