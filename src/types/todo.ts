

  export interface ToDoList {
    id: number;
    Message: string;  // Assuming 'Message' instead of 'title' based on your data model
    Priority: Priority;
    Category: Category;
  }
  

  export enum Priority {
    Low = "Low",
    Medium = "Medium",
    High = "High",
  }
  
  export enum Category {
    Work = "Work",
    Personal = "Personal",
  }
  

  export const todoListData: ToDoList[] = [
    {
      id: 1,
      Message: "Complete React project",
      Priority: Priority.High,
      Category: Category.Work,
    },
    {
      id: 2,
      Message: "Buy groceries",
      Priority: Priority.Medium,
      Category: Category.Personal,
    },
    {
      id: 3,
      Message: "Morning workout",
      Priority: Priority.High,
      Category: Category.Personal,
    },
    {
      id: 4,
      Message: "Prepare for client meeting",
      Priority: Priority.High,
      Category: Category.Work,
    },
    {
      id: 5,
      Message: "Read a book",
      Priority: Priority.Low,
      Category: Category.Personal,
    },
    {
        id: 6,
        Message: "Read a book",
        Priority: Priority.Low,
        Category: Category.Personal,
      },
  ];

  export const initialFormData: ToDoList = {
    id: 1,
    Message: "",
    Priority: Priority.Medium,
    Category: Category.Work,
  };

  export interface Credentials {
    username: string;
    password: string;
  }


  export const transformApiResponseToToDoList = (apiResponse: any): ToDoList[] => {
    if (!apiResponse || !apiResponse.$values) {
      throw new Error("Invalid API response format");
    }
  
    return apiResponse.$values.map((item: any) => ({
      id: item.id,
      Message: item.message,  // Mapping API's 'message' to 'Message'
      Priority: item.priority as Priority,  // Type assertion for enum
      Category: item.category as Category,  // Type assertion for enum
    }));
  };