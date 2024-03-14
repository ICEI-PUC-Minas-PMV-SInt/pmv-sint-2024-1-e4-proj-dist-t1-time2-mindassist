using mindassist.api.Models;

namespace mindassist.api
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
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
                new User { Username = "Lucas" },
                new User { Username = "João" },
                new User { Username = "John" }
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
                new ChatMessage { Prompt = "Olá", Response = "Olá!Tudo bem?", ChatId = chats[0].Id, Timestamp = DateTime.Now },
                new ChatMessage { Prompt = "Como você está?", Response = "Estou bem, obrigado. E você?", ChatId = chats[1].Id, Timestamp = DateTime.Now },
                new ChatMessage { Prompt = "Novidades?", Response = "Não muitas, e você?", ChatId = chats[2].Id, Timestamp = DateTime.Now },
                new ChatMessage { Prompt = "O mesmo. Sobre o que você gostaria de falar hoje?", Response = "Você quem manda! Podemos falar desde psicologia até física!", ChatId = chats[2].Id, Timestamp = DateTime.Now },
                new ChatMessage { Prompt = "Hmmm. Cansei!", Response = "Podemos conversar quando você quiser!", ChatId = chats[2].Id, Timestamp = DateTime.Now }
            };
            context.ChatMessages.AddRange(messages);
            context.SaveChanges();
        }
    }

}
