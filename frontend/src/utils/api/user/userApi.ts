// src/api/userApi.js
import { getAuthUser } from "src/auth/authUser";
import instance from "src/config/axiosConfig";
import { User } from "src/models/User";
import { UserFilters } from "src/models/UserFilters";


export async function createUser(user: User) {
  try {
    const response = await instance.post(`/api/user`, user);
    console.log("response.data from createUser");
    console.log(response.data);
    return response.data; // Optionally return the created user
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to create user: ${error}`);
  }
}

export async function updateUser(id: number, user: User) {
  try {
    const response = await instance.put(`/api/user/${id}`, user);
    console.log("response.data from updateUser");
    console.log(response.data);
    return response.data; // Optionally return the updated user
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to update user: ${error}`);
  }
}

export async function getUserById(id: string) {
  try {
    const response = await instance.get(`/api/user/${id}`);
    console.log("response.data from getUserById");
    console.log(response.data);
    return response.data; // Optionally return the fetched user
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to get user: ${error}`);
  }
}

export async function getUserByUserName(userName: string) {
  try {
    const response = await instance.get(`/api/user/username/${userName}`);
    console.log("response.data from getUserByUserName");
    console.log(response.data);
    return response.data; // Optionally return the fetched user
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to get user by user Name : ${error}`);
  }
}


export async function getAllUsers() {
  try {
    const response = await instance.get(`/api/user/all`);
    console.log("response.data from getAllUsers");
    console.log(response.data);
    return response.data; // Optionally return the fetched user
  } catch (error) {
    // Handle errors here if needed
    throw new Error(`Failed to get all users : ${error}`);
  }
}



export async function uploadUserPhoto(file) {

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await instance.post(`/api/user/photo/${getAuthUser()?.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log("response.data from uploadUserPhoto");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error(`Failed to upload image: ${error}`);
  }
}


// export async function getUserByManagerId( ): Promise<User[]> {
//     try {
//       // Make the GET request
//       const response = await instance.get<User[]>(
//         `/api/user/getUsers?managerId=${userId}`
//       );
  
//       const users = response.data;
//       users.forEach(async (item)=>{
//         item.nbrCaseAffected = await getNbrCaseByUser(item.id);        
//     })
//       console.log("Agents : ",users);

//       return users;
//     } catch (error) {
//       // Handle errors here if needed
//       throw new Error(`Failed to fetch data users: ${error}`);
//     }
//   }
export async function getUserByManagerId(): Promise<User[]> {
  try {
      // Make the GET request
      const response = await instance.get<User[]>(
          `/api/user/getUsers?managerId=${getAuthUser()?.id}`
      );

      const users = response.data;
 console.log("users from api call : ",users);
      // Fetch number of cases affected for each user
      const usersWithCases = await Promise.all(users.map(async (user) => {
          try {
              // Fetch number of cases affected for the current user
              const nbrCaseAffected = await getNbrCaseByUser(user.id);
              // Update the user object with the number of cases affected
              return { ...user, nbrCaseAffected };
          } catch (error) {
              console.error(`Failed to fetch cases for user ${user.id}:`, error);
              // If fetching fails, return the user without the number of cases affected
              return { ...user, nbrCaseAffected: undefined };
          }
      }));

      console.log("Agents : ", usersWithCases);
      return usersWithCases;
  } catch (error) {
      // Handle errors here if needed
      throw new Error(`Failed to fetch data users: ${error}`);
  }
}


  export async function getNbrCaseByUser(id : number ) {
    try {
      // Make the GET request
      const response = await instance.get<number>(
        `/api/user/nbrCaseForUser?userId=${id}`
      );
  
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Handle errors here if needed
      throw new Error(`Failed to fetch data nbrcaseforuser: ${error}`);
    }
  }


  // export async function filterUsersUsingOneArg(
  //   searchKeyWord: string
  // ): Promise<User[]> {
  //   try {
  //     // Make the GET request
  //     const response = await instance.get<User[]>(
  //       `/api/user/filter/oneArg?userConnectedId=${userId}&searchKeyWord=${searchKeyWord}`
  //     );
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     // Handle errors here if needed
  //     throw new Error(`Failed to fetch data: ${error}`);
  //   }
  // }
  export async function filterUsersUsingOneArg(searchKeyWord: string): Promise<User[]> {
    try {
      // Make the GET request
      const response = await instance.get<User[]>(
        `/api/user/filter/oneArg?userConnectedId=${getAuthUser()?.id}&searchKeyWord=${searchKeyWord}`
      );
  
      const users = response.data;
  
      // Fetch number of cases affected for each user
      const usersWithCases = await Promise.all(users.map(async (user) => {
        try {
          // Fetch number of cases affected for the current user
          const nbrCaseAffected = await getNbrCaseByUser(user.id);
          // Update the user object with the number of cases affected
          return { ...user, nbrCaseAffected };
        } catch (error) {
          console.error(`Failed to fetch cases for user ${user.id}:`, error);
          // If fetching fails, return the user without the number of cases affected
          return { ...user, nbrCaseAffected: undefined };
        }
      }));
  
      console.log("Filtered Users : ", usersWithCases);
      return usersWithCases;
    } catch (error) {
      // Handle errors here if needed
      throw new Error(`Failed to fetch data: ${error}`);
    }
  }



  // export async function filterUsersUsingMultiCriteria(
  //   filters: UserFilters
  // ): Promise<User[]> {
  //   try {
  //     // Make the GET request
  //     const response = await instance.get<User[]>(
  //       `/api/user/filter/multiCriteria?userConnectedId=${userId}&userId=${filters.userId}&firstname=${filters.firstnameUser}&lastname=${filters.lastnameUser}`
  //     );
  
  //     console.log("filterd user by many filters ", filters);
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     // Handle errors here if needed
  //     throw new Error(`Failed to fetch data: ${error}`);
  //   }
  // }

  export async function filterUsersUsingMultiCriteria(
    filters: UserFilters
  ): Promise<User[]> {
    try {
      // Make the GET request
      const response = await instance.get<User[]>(
        `/api/user/filter/multiCriteria?userConnectedId=${getAuthUser()?.id}&userId=${filters.userId}&firstname=${filters.firstnameUser}&lastname=${filters.lastnameUser}`
      );
  
      const users = response.data;
  
      // Fetch number of cases affected for each user
      const usersWithCases = await Promise.all(users.map(async (user) => {
        try {
          // Fetch number of cases affected for the current user
          const nbrCaseAffected = await getNbrCaseByUser(user.id);
          // Update the user object with the number of cases affected
          return { ...user, nbrCaseAffected };
        } catch (error) {
          console.error(`Failed to fetch cases for user ${user.id}:`, error);
          // If fetching fails, return the user without the number of cases affected
          return { ...user, nbrCaseAffected: undefined };
        }
      }));
  
      console.log("Filtered Users by multi-criteria: ", usersWithCases);
      return usersWithCases;
    } catch (error) {
      // Handle errors here if needed
      throw new Error(`Failed to fetch data: ${error}`);
    }
  }
  