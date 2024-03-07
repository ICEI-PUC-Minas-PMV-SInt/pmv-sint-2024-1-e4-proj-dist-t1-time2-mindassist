using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mindassist.api.Models;

namespace mindassist.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly MindAssistContext _context;

        public ChatController(MindAssistContext context)
        {
            _context = context;
        }

        // GET: api/Chat
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chat>>> GetChats()
        {
            return await _context.Chats.Include(c => c.Messages).ToListAsync();
        }

        // GET: api/Chat/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Chat>> GetChat(Guid id)
        {
            var chat = await _context.Chats.Include(c => c.Messages).FirstOrDefaultAsync(c => c.Id == id);

            if (chat == null)
            {
                return NotFound();
            }

            return chat;
        }

        // POST: api/Chat
        [HttpPost]
        public async Task<ActionResult<Chat>> PostChat(Chat chat)
        {
            _context.Chats.Add(chat);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetChat), new { id = chat.Id }, chat);
        }

        // PUT: api/Chat/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChat(Guid id, Chat chat)
        {
            if (id != chat.Id)
            {
                return BadRequest();
            }

            _context.Entry(chat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChatExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Chat/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChat(Guid id)
        {
            var chat = await _context.Chats.FindAsync(id);
            if (chat == null)
            {
                return NotFound();
            }

            _context.Chats.Remove(chat);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Chat/5/Message
        [HttpPost("{chatId}/Message")]
        public async Task<ActionResult<ChatMessage>> PostChatMessage(Guid chatId, ChatMessage chatMessage)
        {
            var chat = await _context.Chats.FindAsync(chatId);
            if (chat == null)
            {
                return NotFound();
            }

            chatMessage.ChatId = chatId;
            _context.ChatMessages.Add(chatMessage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChat", new { id = chatId }, chatMessage);
        }

        private bool ChatExists(Guid id)
        {
            return _context.Chats.Any(e => e.Id == id);
        }
    }
}
