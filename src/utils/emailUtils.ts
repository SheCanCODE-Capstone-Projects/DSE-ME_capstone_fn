import { Student } from '@/types/attendance';

export const sendWarningEmail = async (student: Student, attendanceDays: number, monthName: string) => {
  try {
   
    const emailData = {
      to: student.email,
      subject: `Attendance Warning - ${monthName}`,
      body: `
        Dear ${student.name},
        
        This is to inform you that your attendance for ${monthName} is below the required minimum.
        
        Current Attendance: ${attendanceDays} days
        Required Minimum: 6 days
        
        Please ensure regular attendance to avoid academic consequences.
        
        Best regards,
        Academic Administration
      `
    };

    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Warning email sent to:', student.email);
    return { success: true, message: `Warning email sent to ${student.name}` };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, message: 'Failed to send email' };
  }
};

export const sendBulkWarningEmails = async (studentsWithLowAttendance: Array<{student: Student, attendanceDays: number}>, monthName: string) => {
  const results = [];
  
  for (const { student, attendanceDays } of studentsWithLowAttendance) {
    const result = await sendWarningEmail(student, attendanceDays, monthName);
    results.push({ student: student.name, ...result });
  }
  
  return results;
};