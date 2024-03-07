using Microsoft.EntityFrameworkCore;
using mindassist.api.Models;

namespace mindassist.api
{
    public class MindAssistContext : DbContext
    {
        public DbSet<Chat> Chats { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<User> Users { get; set; }

        public MindAssistContext(DbContextOptions<MindAssistContext> options) : base(options)
        {
        }
    }
}
