// lib/analyzeLog.ts

export function analyzeLogContent(log: string): string[] {
    const issues: string[] = [];
  
    const lines = log.split("\n");
  
    lines.forEach((line, index) => {
      const lower = line.toLowerCase();
  
      if (lower.includes("select * from") || lower.includes("union select")) {
        issues.push(`Line ${index + 1}: Possible SQL Injection`);
      }
  
      if (lower.includes("<script>") || lower.includes("javascript:")) {
        issues.push(`Line ${index + 1}: Possible XSS Attack`);
      }
  
      if (lower.includes("unauthorized") || lower.includes("forbidden")) {
        issues.push(`Line ${index + 1}: Unauthorized access attempt`);
      }
  
      if (lower.includes("error") && lower.includes("exception")) {
        issues.push(`Line ${index + 1}: Unhandled exception error`);
      }
  
      if (lower.includes("root login") || lower.includes("admin login")) {
        issues.push(`Line ${index + 1}: Sensitive account access`);
      }
  
      if (lower.includes("exec(") || lower.includes("system(")) {
        issues.push(`Line ${index + 1}: Possible command injection`);
      }
  
      if (lower.includes("drop table") || lower.includes("truncate")) {
        issues.push(`Line ${index + 1}: Possible destructive SQL command`);
      }
    });
  
    return issues.length > 0 ? issues : ["No major vulnerabilities found."];
  }
  