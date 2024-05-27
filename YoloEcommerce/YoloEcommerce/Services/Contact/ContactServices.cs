using System;
using System.Collections.Generic;
using System.Linq;
using YoloEcommerce.DTO.Contact;
using YoloEcommerce.Entities;
using YoloEcommerce.Helper;
using YoloEcommerce.Interface.Contact;

namespace YoloEcommerce.Services.Contact
{
    public class ContactServices : IContactServices
    {
        private readonly MyDbContext _context;
        public ContactServices(MyDbContext context)
        {
            _context = context;
        }
        public string createContact (ContactDTO dto)
        {
            var contactNew = new Entities.Contact();
            contactNew.CustomerName = dto.CustomerName;
            contactNew.CustomerPhone = dto.CustomerPhone;
            contactNew.CustomerEmail = dto.CustomerEmail;
            contactNew.Request = dto.Request;
            contactNew.SendDate = DateTime.Now;
            contactNew.Status = 1;
            _context.Contacts.Add(contactNew);
            _context.SaveChanges();
            return contactNew.Id.ToString();
        }
        public List<ContactDTO> getAllContact()
        {

            var query = (from c in _context.Contacts
                         select new ContactDTO
                         {
                             Id = c.Id,
                             CustomerEmail = c.CustomerEmail,
                             CustomerPhone = c.CustomerPhone,
                             CustomerName = c.CustomerName,
                             Request = c.Request,
                             SendDate = c.SendDate,
                             Status = c.Status,
                             Reply = c.Reply
                         }).ToList();
            return query;
        }
        public ContactDTO getContactById(int id )
        {

            var query = (from c in _context.Contacts
                         select new ContactDTO
                         {
                             Id = c.Id,
                             CustomerEmail = c.CustomerEmail,
                             CustomerPhone = c.CustomerPhone,
                             CustomerName = c.CustomerName,
                             Request = c.Request,
                             SendDate = c.SendDate,
                             Status = c.Status,
                             Reply = c.Reply
                         }).SingleOrDefault(x=>x.Id==id);
            return query;
        }
        public bool DeletedContact(int id)
        {
            var query = _context.Contacts.SingleOrDefault(x => x.Id == id);
            if (query != null)
            {
                _context.Remove(query);
                _context.SaveChanges();
                return true;
            }
            return false;
        }
        public bool reply(ContactReply dto)
        {
            var query = _context.Contacts.SingleOrDefault(x=>x.Id==dto.Id);
            if (query != null)
            {
                query.Reply = dto.Reply;
                query.Status = 2;
                var emailContent = dto.Reply;
                _context.SaveChanges();
                SendMail.SendMailUser(query.CustomerEmail, "Respond to contact from Yolo store", emailContent, "");
                return true;
            }
            return false;
        }

    }
}
