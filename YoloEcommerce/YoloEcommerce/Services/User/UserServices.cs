using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using YoloEcommerce.DTO.User;
using YoloEcommerce.Entities;
using YoloEcommerce.Helper;
using YoloEcommerce.Interface.User;

namespace YoloEcommerce.Services.User
{
    public class UserServices : IUserServices
    {
        private readonly MyDbContext _context;
        public UserServices(MyDbContext context)
        {
            _context = context;
        }
        //get user
        public UserDTO getUserById (int id)
        {
            var query = _context.Users.Select(x => new UserDTO
            {
                Id = x.Id,
                Username = x.Username,
                Password = x.Password,
                Email = x.Email,
                Fullname = x.Fullname,
                Address = x.Address,
                Phone = x.Phone,
                IdRole = x.IdRole,

            }).SingleOrDefault(u => u.Id == id);
            return query;
        }
        public string activeUser (int id)
        {
            var query = _context.Users.SingleOrDefault(x=>x.Id == id);  
            if(query == null)
            {
                return "Không có tài khoản này!";
            }
            else
            {
                query.Status = 2;
                _context.SaveChanges();
                return "Bạn đã kích hoạt tài khoản thành công, vui lòng trở lại trang web và đăng nhập";
            }
        }
        public UserDTO checkUserByName (string name)
        {
            var query = _context.Users.Select(x => new UserDTO
            {
                Id = x.Id,
                Username = x.Username,
                Password = x.Password,
                Email = x.Email,
                Fullname = x.Fullname,
                Address = x.Address,
                Phone = x.Phone,
                IdRole = x.IdRole,
                Status = x.Status
            }).SingleOrDefault(u => u.Username == name);
            if(query == null)
            {
                return null;
            }
            else
            {
                return query;
            }
        }
        public string createUser (UserDTO user)
        {
            var query = _context.Users.SingleOrDefault(x=>x.Email == user.Email);
            var query1 = _context.Users.SingleOrDefault(x => x.Username == user.Username);
            var query2 = _context.Users.SingleOrDefault(x => x.Phone == user.Phone);
            if (query != null)
            {
                return "Email này đã được đăng ký, vui lòng đăng ký email khác";
            }
            if (query1 != null)
            {
                return "Username này đã được đăng ký, vui lòng đăng ký Username khác";
            }
            if (query2 != null)
            {
                return "Số điện thoại này đã được đăng ký, vui lòng đăng ký bằng số điện thoại khác khác";
            }
            var newUser = new YoloEcommerce.Entities.User();
            newUser.Username = user.Username;
            newUser.Password = user.Password;
            newUser.Email = user.Email;
            newUser.Fullname = user.Fullname;
            newUser.Address = user.Address;
            newUser.Phone = user.Phone;
            newUser.Status = 1;
            newUser.IdRole = user.IdRole;
            _context.Users.Add(newUser);
            _context.SaveChanges();
            var activationUrl = $"https://localhost:44324/api/User/ActiveUser?id={newUser.Id}";
            if (newUser.Id != null) {
                var emailContent = $"Để kích hoạt tài khoản, vui lòng nhấp vào <a href=\"{activationUrl}\">Tại đây</a> để kích hoạt tài khoản của bạn.";
                SendMail.SendMailUser(newUser.Email, "Confirm your account", emailContent, "");
            }
            
            return newUser.Id.ToString();
        }
        public string updateUser(UserUpdateDTO user)
        {

            var query2 = _context.Users.SingleOrDefault(x => x.Id == user.Id);
            if (query2 == null)
            {
                return "Tài khoản không tồn tại trong hệ thống";
            }
            else
            {
               /* if(query2.Email ==  user.Email)
                {
                    query2.Email = user.Email;
                }
                else
                {
                    var query = _context.Users.SingleOrDefault(x=>x.Email== user.Email);
                    if(query == null)
                    {
                        query2.Email= user.Email;
                    }
                    else
                    {
                        return "Email này đã tồn tại trong hệ thống";
                    }
                }
                if (query2.Username == user.Username)
                {
                    query2.Username = user.Username;
                }
                else
                {
                    var query = _context.Users.SingleOrDefault(x => x.Username == user.Username);
                    if (query == null)
                    {
                        query2.Username = user.Username;
                    }
                    else
                    {
                        return "Username này đã tồn tại trong hệ thống";
                    }
                }
                query2.Password = user.Password;*/
                var checkPhone = _context.Users.FirstOrDefault(x=>x.Phone == user.Phone&&x.Id!=user.Id);
                if(checkPhone == null)
                {
                    query2.Fullname = user.Fullname;
                    query2.Address = user.Address;
                    query2.Phone = user.Phone;
                }
                else
                {
                    return "Số điện thoại đã tồn tại trong hệ thống, vui lòng nhập số điện thoại khác";
                }
                //query2.IdRole = user.IdRole;
                //query2.Status = (int)user.Status;
                _context.SaveChanges();
                return "Update thành công tài khoản";
            }
            
            
            
        }
        public string changeStatusUser(int id, int status)
        {
            var query = _context.Users.SingleOrDefault(x=>x.Id == id);
            if(query == null)
            {
                return "Không có tài khoản này trong hệ thống";
            }
            else
            {
                query.Status = status;
                _context.SaveChanges();
                return "Cập nhập trạng thái thành công";
            }
        }
        public bool changePassword (ChangePassDTO dto)
        {
            var query = _context.Users.SingleOrDefault(x=>x.Id==dto.Id);
            if (query == null)
            {
                return false;
            }
            else
            {
                query.Password = dto.Passnew;
                _context.SaveChanges();
                return true;
            }
        }
        public List<UserDTO> getAllUser(UserFilter dto)
        {
            var query = _context.Users.Select(x => new UserDTO
            {
                Id = x.Id,
                Username = x.Username,
                Password = x.Password,
                Email = x.Email,
                Fullname = x.Fullname,
                Address = x.Address,
                Phone = x.Phone,
                IdRole = x.IdRole,
                Status = x.Status,
            }).Where(x=>x.IdRole!=2).ToList();
            if (!string.IsNullOrEmpty(dto.Name))
            {
                query = query.Where(x=>x.Fullname.ToLower().Contains(dto.Name.ToLower())).ToList();
            }
            
            return query;
        }
        public bool changeStatus(int id, bool isCheck)
        {
            try
            {
                var query = _context.Users.SingleOrDefault(x => x.Id == id);
                if (isCheck == false)
                {
                    query.Status = 1;
                    _context.SaveChanges();
                }
                else
                {
                    query.Status = 2;
                    _context.SaveChanges();
                }
                return true;
            }catch(Exception ex)
            {
                return false;
            }
            
        }
    }
}
