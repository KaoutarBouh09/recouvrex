package com.recouvrex.process.service;

import com.recouvrex.process.model.ThirdParty;
import com.recouvrex.process.model.User;

import java.util.List;

public interface UserService {

     List<User> findAll();

     User save(User user);

    List<User> findByManager(Long managerId);

     Long countCaseByUser(Long userId);

    List<User> filterUsersUsingOneArg(Long userConnectedId, String searchKeyWord);

    List<User> FilterUsersByMultiCriteria(Long userConnectedId, String userId, String firstnameUser,
                                                   String lastnameUser);


    User createUser(User user);

    User updateUser(Long id, User userDetails);

    User getUserById(Long id);

    User getUserByUserName(String userName); 

    User updateUserPhoto(Long userId, String photoUrl);

    List<User> findAllUsers();



}
