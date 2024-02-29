using todoz.api.Models;

namespace todoz.api.Repositories;

public static class TodosInMemory
{
    static List<Todo> Todos { get; }
    static int nextId = 3;
    static TodosInMemory()
    {
        Todos = new List<Todo>
        {
            new Todo { Id = 1, Title = "Aprender C#", Description = "Estudar a estrutura básica do C#", IsComplete = false },
            new Todo { Id = 2, Title = "Construir uma aplicação", Description = "Utilizar o .net", IsComplete = false }
        };
    }

    public static List<Todo> GetAll() => Todos; 

    public static Todo? Get(int id) => Todos.FirstOrDefault(t => t.Id == id); 

    public static void Add(Todo todo)
    {
        todo.Id = nextId++; 
        Todos.Add(todo); 
    }

    public static void Delete(int id)
    {
        var todo = Get(id); 
        if (todo is null)
            return; 

        Todos.Remove(todo); 
    }

    public static void Update(Todo todo)
    {
        var index = Todos.FindIndex(t => t.Id == todo.Id); 
        if (index == -1)
            return; 

        Todos[index] = todo; 
    }
}
