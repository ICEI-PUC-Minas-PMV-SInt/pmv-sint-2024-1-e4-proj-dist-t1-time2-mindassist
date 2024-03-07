using mindassist.api.Models;

namespace mindassist.api
{
    public static class DbInitializer
    {
        public static void Initialize(MindAssistContext context)
        {
            // Ensure the database is created
            context.Database.EnsureCreated();

            // Check if there is already data in the database
            if (context.Users.Any())
            {
                return; // The database has already been seeded
            }

            // Create some fake users
            var users = new User[]
            {
                new User { Username = "Alice" },
                new User { Username = "Bob" },
                new User { Username = "Charlie" }
            };
            context.Users.AddRange(users);
            context.SaveChanges();

            // Create some fake chats and messages
            var chats = new Chat[]
            {
                new Chat { Name = "Chat 1", UserId = users[0].Id, CreatedTimestamp = DateTime.Now },
                new Chat { Name = "Chat 2", UserId = users[1].Id, CreatedTimestamp = DateTime.Now },
                new Chat { Name = "Chat 3", UserId = users[2].Id, CreatedTimestamp = DateTime.Now }
            };
            context.Chats.AddRange(chats);
            context.SaveChanges();

            var messages = new ChatMessage[]
            {
                new ChatMessage { Prompt = "Hello", Response = "Hi there!", ChatId = chats[0].Id, Timestamp = DateTime.Now },
                new ChatMessage { Prompt = "How are you?", Response = "I'm good, thanks!", ChatId = chats[1].Id, Timestamp = DateTime.Now },
                new ChatMessage { Prompt = "What's up?", Response = "Not much, you?", ChatId = chats[2].Id, Timestamp = DateTime.Now }
            };
            context.ChatMessages.AddRange(messages);
            context.SaveChanges();
        }
    }

}
