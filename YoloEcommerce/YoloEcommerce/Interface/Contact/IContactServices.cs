using System.Collections.Generic;
using YoloEcommerce.DTO.Contact;

namespace YoloEcommerce.Interface.Contact
{
    public interface IContactServices
    {
        List<ContactDTO> getAllContact();
        string createContact(ContactDTO dto);
        ContactDTO getContactById(int id);
        bool reply(ContactReply dto);
        bool DeletedContact(int id);
    }
}
