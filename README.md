Esta API foi desenvolvida com o intuito de listar e filtrar usuários vindos de uma base de dados.

Contendo filtros por: 
- Nome
- Email
- Faixa etária
- Idade Específica
- Sexo (Masculino/ Feminino)
- Regiões (norte, nordeste, centro-oeste, sudeste e sul)
- Estados
- Cidades
- Cep
- Rua
- Celular
- Telefone
- Ordem alfabética

Para utilizá-la você precisará ter instalado Xampp/ Wamp ou outro parecido, e colocar a pasta dentro de htdocs/ www respectivamente.

#Caso queira utilizar a API sem mexer no código fonte.
Dentro da pasta 'js' renomeie o arquivo 'people.json' para 'people_old' 
Crie um arquivo .json com o nome 'people.json' com a seguinte estrutura

{"results":
	[{
	"gender":"female",
	"name":{"title":"mrs","first":"ione","last":"da costa"},
	"location":{
				"street":"8614 avenida vinícius de morais",
				"city":"ponta grossa",
				"state":"rondônia",
				"postcode":97701,
				"coordinates":{
								"latitude":"-76.3253",
								"longitude":"137.9437"
								},
				"timezone":{
							"offset":"-1:00",
							"description":"Azores, Cape Verde Islands"
							}
				},
	"email":"ione.dacosta@example.com",
	"dob":{
			"date":"1968-01-24T18:03:23Z",
			"age":50
			},
	"registered":{
				"date":"2004-01-23T23:54:33Z",
				"age":14
				},
	"phone":"(01) 5415-5648",
	"cell":"(10) 8264-5550",
	"picture":{
				"large":"https://randomuser.me/api/portraits/women/46.jpg",
				"medium":"https://randomuser.me/api/portraits/med/women/46.jpg",
				"thumbnail":"https://randomuser.me/api/portraits/thumb/women/46.jpg"
				}
	}]
}

#Caso queira utilizar outro arquivo json e alterar o código fonte.
Dentro da pasta 'js' crie um arquivo .json com a estrutura descrita acima.
No arquivo 'sript.js' na linha 26 altere o nome do arquivo de 'people.json' para o nome do seu arquivo
Na pasta raiz, no arquivo 'index.html' na linha 150 altere o nome do arquivo 'people.json' para o nome do seu arquivo .json

#Com o Xampp/ Wamp ligado, vá no navegador e digite http://localhost/lista

