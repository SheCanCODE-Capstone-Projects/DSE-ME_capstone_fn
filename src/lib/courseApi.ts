export const createCourse = async (courseData: any) => {
  const response = await fetch('${BASE_URL}/courses', {
    method: "POST",
    body: JSON.stringify(courseData),
    headers: {
  "Content-Type": "application/json",
} 

  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create course");
  }

  return response.json();
};

export const getCourses = async () => {
  const token = localStorage.getItem("token"); 

  const response = await fetch('${BASE_URL}/courses', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }

  return response.json();
};
