export const sendWarningEmail = async (student: { id: string; name: string; email: string }) => {
  try {
   
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Warning email sent to:', student.email);
    return { success: true, message: `Warning email sent to ${student.name}` };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, message: 'Failed to send email' };
  }
};

export const sendBulkWarningEmails = async (studentsWithLowAttendance: Array<{student: { id: string; name: string; email: string }}>) => {
  const results = [];
  
  for (const { student } of studentsWithLowAttendance) {
    const result = await sendWarningEmail(student);
    results.push({ student: student.name, ...result });
  }
  
  return results;
};