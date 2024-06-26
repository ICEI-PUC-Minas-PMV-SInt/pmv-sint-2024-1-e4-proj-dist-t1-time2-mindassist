namespace mindassist.api.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Username { get; set; }
        public string Password { get; set; }
        public List<Chat> Chats { get; set; }

    }
}
