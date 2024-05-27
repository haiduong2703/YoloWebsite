using System;
using System.Net;
using System.Net.Mail;
namespace YoloEcommerce.Helper
{
    public class SendMail
    {
        public static bool SendMailUser (string to, string subject, string body, string attachFile)
        {
            try {
                MailMessage msg = new MailMessage(ConstantHelperEmail.emailSender, to, subject, body);
                msg.IsBodyHtml = true;
                using (var client = new  SmtpClient (ConstantHelperEmail.hostEmail, ConstantHelperEmail.portEmail)) { 
                    client.EnableSsl = true;

                    if(!string.IsNullOrEmpty(attachFile) ) {
                        Attachment attachment = new Attachment(attachFile);
                        msg.Attachments.Add(attachment);
                    }

                    NetworkCredential credential = new NetworkCredential(ConstantHelperEmail.emailSender, ConstantHelperEmail.passwordSender);
                    client.UseDefaultCredentials = false;
                    client.Credentials = credential;
                    client.Send (msg);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine (ex.ToString ());
                return false;
            }
            return true;
        }
    }
}
