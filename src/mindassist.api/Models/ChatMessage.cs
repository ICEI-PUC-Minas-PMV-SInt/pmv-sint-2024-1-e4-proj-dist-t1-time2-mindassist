namespace mindassist.api.Models
{
    public class ChatMessage
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Prompt { get; set; }
        public string Response { get; set; }
        public DateTime Timestamp { get; set; }
        public Guid ChatId { get; set; }
    }
}
