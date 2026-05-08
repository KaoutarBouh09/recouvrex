package com.recouvrex.process.service.impl;

import com.recouvrex.process.model.User;
import com.recouvrex.process.model.enums.UserStatusEnum;
import com.recouvrex.process.repository.UserRepository;
import com.recouvrex.process.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.BeanUtils;
import com.recouvrex.process.utils.UserSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User save(User user) {
        return null;
    }

    @Override
    public List<User> findByManager(Long managerId) {
     /*   User manager = userRepository.findById(managerId).orElse(null);
        if(manager!=null) {
            return null; //userRepository.findByManager(manager);
        }else{
            return Collections.emptyList();
        }*/
        return userRepository.findByManagerIdAndStatus(managerId, UserStatusEnum.ACTIVE);

    }

    @Override
    public Long countCaseByUser(Long userId) {
        return userRepository.countCaseByUser(userId);
    }

    @Override
    public List<User> filterUsersUsingOneArg(Long userConnectedId, String searchKeyWord) {
        Specification<User> spec = UserSpecifications.filterUsersUsingOneArg(userConnectedId,searchKeyWord);
        return userRepository.findAll(spec);
    }

    @Override
    public List<User> FilterUsersByMultiCriteria(Long userConnectedId, String userId, String firstnameUser, String lastnameUser) {
        Specification<User> spec = UserSpecifications.FilterUserByMultiCriteria(userConnectedId,userId,firstnameUser,lastnameUser);
       return  userRepository.findAll(spec);
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // @Override
    // public User updateUser(Long id, User userDetails) {
    //     Optional<User> userOptional = userRepository.findById(id);
    //     if (userOptional.isPresent()) {
    //         User user = userOptional.get();
    //         user.setIdentificationNumber(userDetails.getIdentificationNumber());
    //         user.setUserName(userDetails.getUserName());
    //         user.setFirstName(userDetails.getFirstName());
    //         user.setLastName(userDetails.getLastName());
    //         user.setProfile(userDetails.getProfile());
    //         user.setManager(userDetails.getManager());
    //         return userRepository.save(user);
    //     } else {
    //         return null;
    //     }
    // }

      @Override
    public User updateUser(Long id, User userDetails) {
        // Find the existing entity from the database
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));

        // Use BeanUtils to copy properties from userDetails to existingUser, ignoring ID and profile
        BeanUtils.copyProperties(userDetails, existingUser, "id", "profile", "manager");

        // Update profile and manager separately if they are provided
        if (userDetails.getProfile() != null) {
            existingUser.setProfile(userDetails.getProfile());
        }
        if (userDetails.getManager() != null) {
            existingUser.setManager(userDetails.getManager());
        }

        // Save the updated entity back to the database
        return userRepository.save(existingUser);
    }
    

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User getUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    @Override
    public User updateUserPhoto(Long userId, String photoUrl) {
        // Find the existing user from the database
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        // Update the user's photo URL
        existingUser.setPhoto(photoUrl);

        // Save the updated user back to the database
        return userRepository.save(existingUser);
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    
}
