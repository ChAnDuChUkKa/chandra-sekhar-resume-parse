export function validateParsedData(data: any) {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const skill of data.skills) {
    if (!skill.level) {
      errors.push(`Skill '${skill.name}' is missing a proficiency level.`);
    }
  }

  for (const job of data.work_experience) {
    const start = new Date(job.start);
    const end = new Date(job.end);
    if (start > end) {
      errors.push(
        `Work experience at '${job.company}' has invalid date range (${job.start} - ${job.end}).`
      );
    }
  }

  return { errors, warnings };
}