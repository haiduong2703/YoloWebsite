using System.Collections.Generic;
using YoloEcommerce.DTO.User;

namespace YoloEcommerce.Interface.User
{
    public interface IUserServices
    {
        UserDTO getUserById(int id);
        string createUser(UserDTO user);
        string updateUser(UserUpdateDTO user);
        string changeStatusUser(int id, int status);
        UserDTO checkUserByName(string name);
        string activeUser(int id);
        bool changePassword(ChangePassDTO dto);
        public List<UserDTO> getAllUser(UserFilter dto);
        bool changeStatus(int id, bool isCheck);
    }
}
