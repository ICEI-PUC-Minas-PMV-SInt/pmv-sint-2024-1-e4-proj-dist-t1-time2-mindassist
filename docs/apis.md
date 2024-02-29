# Especificação de APIs

> A especificação de APIs descreve os principais endpoints da API RESTful do produto
> de software, os métodos HTTP associados a cada endpoint, suas descrições, os formatos
> de respostas, os parâmetros de URL esperados e o mecanismo de autenticação e autorização 
> utilizado.

| Endpoint                             | Método | Descrição                                      | Parâmetros                        | Formato da Resposta | Autenticação e Autorização |
|--------------------------------------|--------|------------------------------------------------|-----------------------------------|---------------------|----------------------------|
| /api/users/{user_id}/tasks/          | GET    | Obter todas as tarefas cadastradas             | user_id (string)                  | JSON                | JWT Token                  |
| /api/users/{user_id}/tasks/{task_id} | POST   | Criar uma nova tarefa                          | user_id (string) task_id (string) | JSON                | JWT Token                  |
| /api/users/{user_id}/tasks/{task_id} | GET    | Obter detalhes de uma tarefa específica        | user_id (string) task_id (string) | JSON                | JWT Token                  |
| /api/users/{user_id}/tasks/{task_id} | PUT    | Atualizar os detalhes de uma tarefa específica | user_id (string) task_id (string) | JSON                | JWT Token                  |
| /api/users/{user_id}/tasks/{task_id} | DELETE | Excluir uma tarefa específica                  | user_id (string) task_id (string) | JSON                | JWT Token                  |

[Retorna](../README.md)