namespace mindassist.api.Models
{
    public class Chat
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public DateTime CreatedTimestamp { get; set; }
        public List<ChatMessage> Messages { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
