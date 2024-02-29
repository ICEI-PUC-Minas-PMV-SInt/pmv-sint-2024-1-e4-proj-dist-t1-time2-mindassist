# Trade-offs de Características de Qualidade

As categorias de requisitos não-funcionais para o produto de software "FocusFlow", conforme o modelo FURPS+, seriam:

1. **Usabilidade**: 
   
   a. O sistema deve ser fácil de usar com uma interface intuitiva e amigável, permitindo que 90% dos usuários realizem tarefas sem precisar de assistência após uma única sessão de treinamento.

2. **Desempenho**: 
   
   a. O sistema deve ser altamente responsivo às ações do usuário, garantindo que o tempo de resposta para qualquer interação não ultrapasse 2 segundos, independentemente do número de tarefas que está sendo gerenciado.

   b. O sistema deve possuir escalabilidade horizontal através do desacoplamento, alcançada pela implementação de APIs RESTful.

3. **Confiabilidade**: 
   
   a. O sistema deve ser robusto e livre de erros, sendo equipado com mecanismos para enfrentar falhas, garantir a recuperação de dados e assegurar uma disponibilidade de 99,9%, o que significa que ele não deve exceder 8,76 horas de inatividade por ano.
   
   b. O sistema deve requerer a autenticação de usuários para acessar suas tarefas e configurações pessoais, suportando um mecanismo robusto, como autenticação de dois fatores, para garantir acesso seguro às informações. Em relação à segurança, após três tentativas de login falhas, o usuário é bloqueado temporariamente para evitar tentativas de força bruta. Além disso, as senhas são armazenadas com segurança usando técnicas de hash e sal.

4. **Suportabilidade**: 
   
   a. O sistema deve ser projetado de forma a facilitar futuras atualizações e manutenção, garantindo que todas as solicitações de suporte sejam respondidas dentro de 24 horas.

A importância relativa de cada categoria:

| Categoria | Usabilidade | Desempenho | Confiabilidade | Suportabilidade |
| --- | --- | --- | --- | --- |
| Usabilidade | - | > | > | > |
| Desempenho | < | - | < | > |
| Confiabilidade | < | > | - | > |
| Suportabilidade | < | < | < | - |

> Nesta matriz, o sinal ">" indica que a categoria da linha é mais importante que a categoria da coluna, e o sinal "<" indica que a categoria da linha é menos importante que a categoria da coluna. Por exemplo, a Usabilidade é considerada mais importante que o Desempenho, Confiabilidade e Suportabilidade, enquanto o Desempenho é considerado mais importante que a Suportabilidade, mas menos importante que a Usabilidade e Confiabilidade, e assim por diante.
