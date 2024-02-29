using Microsoft.AspNetCore.Mvc;

using todoz.api.Models;
using todoz.api.Repositories;

namespace todoz.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        public TodoController()
        {
        }

        [HttpGet]
        public ActionResult<List<Todo>> GetAll() =>
            TodosInMemory.GetAll();

        [HttpGet("{id}")]
        public ActionResult<Todo> Get(int id)
        {
            var todo = TodosInMemory.Get(id);

            if (todo == null)
                return NotFound();

            return todo;
        }

        [HttpPost]
        public IActionResult Create(Todo todo)
        {
            TodosInMemory.Add(todo);
            return CreatedAtAction(nameof(Get), new { id = todo.Id }, todo);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Todo todo)
        {
            if (id != todo.Id)
                return BadRequest();

            var existingTodo = TodosInMemory.Get(id);
            if (existingTodo is null)
                return NotFound();

            TodosInMemory.Update(todo);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todo = TodosInMemory.Get(id);

            if (todo is null)
                return NotFound();

            TodosInMemory.Delete(id);

            return NoContent();
        }
    }
}
