  dados = [''];
  select = [''];
  lista = [''];
  idadesBanco = [''];
  minMaxIdade = [''];
  estadosBanco = [''];
  estadosRegioes = [''];
  idsFiltrados=[''];
  listaFiltrados = [''];

  regioes = {
    '0' : ['Paraná','Rio Grande do Sul','Santa Catarina'],//sul
    '1' : ['Espírito Santo','Minas Gerais','Rio de Janeiro','São Paulo'],//sudeste
    '2' : ['Goiás','Mato Grosso','Mato Grosso do Sul','Distrito Federal'],//centroOeste
    '3' : ['Acre','Amapá','Amazonas','Pará','Rondônia','Roraima','Tocantins'],//norte
    '4' : ['Alagoas','Bahia','Ceará','Maranhão','Paraíba','Pernambuco','Piauí','Rio Grande do Norte','Sergipe'],//nordeste
    '5' : ['PR','RS','SC'],//sul
    '6' : ['ES','MG','RJ','SP'],//sudeste
    '7' : ['GO','MT','MS','DF'],//centroOeste
    '8' : ['AC','AP','AM','PA','RO','RR','TO'],//norte
    '9' : ['AL','BA','CE','MA','PB','PE','PI','RN','SE']//nordeste
  };

  map={"â":"a","Â":"A","à":"a","À":"A","á":"a","Á":"A","ã":"a","Ã":"A","ê":"e","Ê":"E","è":"e","È":"E","é":"e","É":"E","î":"i","Î":"I","ì":"i","Ì":"I","í":"i","Í":"I","õ":"o","Õ":"O","ô":"o","Ô":"O","ò":"o","Ò":"O","ó":"o","Ó":"O","ü":"u","Ü":"U","û":"u","Û":"U","ú":"u","Ú":"U","ù":"u","Ù":"U","ç":"c","Ç":"C"};

  $.getJSON("js/people.json", function(data) { //pegar os dados do people.json
    results = data.results;
    allCities = [''];
    ids = '';

    for (var i = 0; i < results.length; i++) {

      nome = results[i].name.first +' '+ results[i].name.last; //concatenar first e last name

      nomeSemAcentos = nome.replace(/[\W\[\] ]/g,function(a){return map[a]||a}); // retornar nomes sem acentos
      
      lista[i] = nomeSemAcentos+'-'+i; //indexar o id ao lado dos nomes para ordem alfabética

      if (results[i].dob.age > 1) { idade = results[i].dob.age + ' anos';}else{ idade = results[i].dob.age + ' ano';} //texto ANOS para idade maior que 1

      ids += i+','; //criando string de ids

      dados[i] = {
        id: i,
        nome: nome,    
        idadeString: idade,        
        cell: results[i].cell,
        cellONumb: results[i].cell.replace(/\D/g, ''),
        email: results[i].email,
        phone: results[i].phone,
        phoneONumb: results[i].phone.replace(/\D/g, ''),
        gender: results[i].gender,
        idadeNum: results[i].dob.age,    
        idadeTxt: results[i].dob.age.toString(),    
        foto: results[i].picture.large,        
        city: results[i].location.city,
        state: results[i].location.state,
        street: results[i].location.street,
        streetOText: results[i].location.street.replace(/[0-9]/g,''),
        postCode: results[i].location.postcode.toString()
      };

      idadesBanco[i] = results[i].dob.age, 
      allCities[i] = results[i].location.city;
      estadosBanco[i] = results[i].location.state;

      idsFiltrados[i] = dados[i];
    }

    paginacao(ids); //default listar tudo

    minMaxIdade['min'] = Math.min(...idadesBanco); //identifica menor idade no array
    minMaxIdade['max'] = Math.max(...idadesBanco); //identifica maior idade no array

    contador = 0;
    for (var i = 0; i < 5; i++) { //percorre o array regioes para identificar qual estado é de cada regiao
      for (var j = 0; j < regioes[i].length; j++) {
        estadosRegioes[contador] = regioes[i][j];
        contador++;
      }
    }


    select['estados'] = estadosRegioes.sort(); //coloca os estaos na ordem alfabética
    select['cidades'] = [ ...new Set( allCities.sort() ) ];//coloca as cidades em ordem alfabética
    
    constroiIdade(minMaxIdade);
    constroiEstados(select);
    constroiCidades(select);
  });
  
  function constroiIdade(idade){
    campoIdadeMin = document.getElementById('idadeMin');
    campoIdadeMax = document.getElementById('idadeMax');
    campoIdade = document.getElementById('idadeExt');
    
    //por ser um input do tipo range, define-se o minimo e o máximo, e os values  respectivos para cada range

    campoIdadeMin.min = idade.min; 
    campoIdadeMin.max = idade.max;
    campoIdadeMin.value = idade.min;
    document.getElementById('ageOutputIdMin').value = idade.min;

    campoIdadeMax.min = idade.min;
    campoIdadeMax.max = idade.max;
    campoIdadeMax.value = idade.max;
    document.getElementById('ageOutputIdMax').value = idade.max;

    campoIdade.min = idade.min;
    campoIdade.max = idade.max;
    campoIdade.value = idade.min;
    document.getElementById('ageOutputIdExt').value = idade.min;
  }

  function constroiEstados(select){
    saida = ['<option value="" selected>Todos</option>'];

    for (var i = 0; i < select['estados'].length; i++) {

      saida += '<option value="'+ select['estados'][i].toLowerCase() +'">'+ select['estados'][i] +'</option>'; //constrói os options do select estados
    }
    document.getElementById('estados').innerHTML = saida; 
  }

  function constroiCidades(select){
    saida = ['<option value="" selected>Todas</option>'];

    for (var i = 0; i < select['cidades'].length; i++) {

      saida += '<option value="'+ select['cidades'][i] +'">'+ select['cidades'][i] +'</option>'; //constrói os options do select cidades
    }
    document.getElementById('cidades').innerHTML = saida; 
  }

  function constroiUsuarios(id){ // esssa função recebe o id do usuario e retorna o objeto de listagem na lista para html
    saida='';
    if(id!=''){ //verifica se o id enviado não está em branco

      saida += '<div id="#'+ dados[id].id +'" class="col-md-12 '+ dados[id].gender+'" onclick="perfil(this);">';
      saida += '<div class="row margens">';
      saida += '<div class="col-md-2 col-12 d-flex justify-content-center">';
      saida += '<img src="'+ dados[id].foto +'">';
      saida += '</div>';
      saida += '<div class="col-md-10">';
      saida += '<div class="row">';
      saida += '<div class="col-md-12 cap">'+ dados[id].nome +' • '+ dados[id].idadeString +' </div>';
      saida += '<div class="col-md-12">'+ dados[id].email +'</div>';
      saida += '<div class="col-md-12">Cel: '+ dados[id].cell+'</div>';
      saida += '<div class="col-md-12">Tel: '+ dados[id].phone +'</div>';
      saida += '<div class="col-md-12 cap">'+ dados[id].city +' - '+ dados[id].state +'</div>';
      saida += '</div>';
      saida += '</div>';
      saida += '</div>';
      saida += '</div>';
      
      return saida; 
    }
  }

  function paginacao(ids){ //essa função recebe os ids em string, e cria a paginação
    saida = [''];
    pessoas = [''];
    arrIds = [''];
    lim = 20;
    cont = 0;
    pag = 1;

    arrIds = ids.split(","); //transforma a string em array
    var totalPag = Math.trunc(arrIds.length/20); //calcula o total de paginas

    for (var i = 0; i < arrIds.length; i++) {//percorre o array de ids recebidos
      if (arrIds[i] != arrIds[i-1]) {//verifica se a posição atual é diferente da anterior

        if (totalPag==0 && arrIds.length == i) {//quando os resultados da busca são menores que 20 registros
          pessoas[cont] += constroiUsuarios(arrIds[i]);//variavel pessoas na posição 0 recebe os usuarios construidos
        }

        if (i < lim && pag == 1) {//limite setado em 20, porém como a posição 0 conta, i tem que ser menor e contará as 20 posições para a primeira pagina
          pessoas[cont] += constroiUsuarios(arrIds[i]);
        }
        if (i >= lim && i < (lim*pag)) {//caso i for maior ou igual ao limite E i menor que pagina multiplicado por limite (para calcular o restante das paginas)
          pessoas[cont] += constroiUsuarios(arrIds[i]);
        }
        if (i == (lim*pag)) {//caso i for igual à ultima posição da listagem
          pessoas[arrIds.length] += constroiUsuarios(arrIds[i])
        }
        if(i==19){//para os primeiros 20 da listagem, pagina e contador aumentam 1
          pag++;
          cont++;
        }
        if (i==(lim*pag) && pag>1) {//para os restantes da listagem, pagina e contador aumentam 1
          pag++;
          cont++;
        }

      } 
    } 


    if (totalPag != 0 && arrIds.length > 20 && pessoas.length > 0){ //verifica se o total de paginas é diferente de 0 para listar todas as páginas
      for (var j = 0; j < totalPag; j++) {
        if (j == 0) {
          var ativo = 'active';
        }else if (j > 0){
          ativo = 'hide';
        }
        saida += '<div id="P'+(j+1)+'" class="'+ativo+'"">';
        saida += pessoas[j].replace("undefined", '');
        saida += '</div>';
      }
    } 
    if (totalPag==0 && arrIds.length < 19 ) { //verifica se total de paginas é 0 para construir apenas uma página
      saida = '';
      saida = '<div id="P1" class="ativo"">'+pessoas[0].replace("undefined", '')+'</div>';
    }

    if (ids == '') {//caso não tenha ids na string, exibe mensagem de não existente
      saida = '<div class="row notFind"><div class="col-md-12 d-flex align-items-center">Poxa, nada por aqui... Tente modificar seus filtros!</div></div>';
    }

    document.getElementById('lista').innerHTML = saida; //popula a lista com paginação

    if(totalPag==0 && arrIds.length<=19){//se o total de páginas é 0, cria somente 1 botão na paginação
      componentes = '<li class="page-item" id="menorLi"><a class="page-link" id="menor" onclick="mostraPag(this)">1</a></li>';
      document.getElementById('pagination').innerHTML = componentes;
    }

    if(totalPag > 0 && arrIds.length > 19){//se o total de páginas é maior que 0 e os resultados são maiores que 20
      componentes='';
      for (var k = 0; k <= totalPag; k++) {//criação dos botões de paginação
        if (k == 1) {
          componentes += '<li class="page-item hide" id="primLi"><a class="page-link" id="prim" onclick="mostraPag(this)">1</a></li>';
          componentes += '<li class="page-item hide" id="menosTLi"><a class="page-link" id="menosT" onclick="mostraPag(this)"><<</a></li>';
          componentes += '<li class="page-item hide" id="antLi"><a class="page-link" id="ant" onclick="mostraPag(this)">Prev</a></li>';
          componentes += '<li class="page-item" id="menorLi"><a class="page-link" id="menor" onclick="mostraPag(this)">1</a></li>';
        }else if (k == 2) {
          componentes += '<li class="page-item" id="meioLi"><a class="page-link" id="meio" onclick="mostraPag(this)">2</a></li>';
          var pgesp = '<input type="text" class="form-control" id="pgEsp" onkeyup="mostraPag(this)">';
          document.getElementById('divPgEsp').innerHTML = pgesp;
        }else if (k == 3) {
          componentes += '<li class="page-item" id="maiorLi"><a class="page-link" id="maior" onclick="mostraPag(this)">3</a></li>';
        }else if (k == 4) {
          componentes += '<li class="page-item" id="proxLi"><a class="page-link" id="prox" onclick="mostraPag(this)">Next</a></li>';
        }else if (k == 5) {
          componentes += '<li class="page-item" id="maisTLi"><a class="page-link" id="maisT" onclick="mostraPag(this)">>></a></li>';
        }else if (k == totalPag) {
          componentes += '<li class="page-item" id="ultLi"><a class="page-link" id="ult" onclick="mostraPag(this)">'+totalPag+'</a></li>'; 
        }
      }
      document.getElementById('pagination').innerHTML = componentes; //insere a paginação na div
    }
  }
  
  function mostraPag(obj){//recebe o obj clicado e gerencia a paginação

    //verifica se a posição é válida
    if (document.getElementById('prim')!=null){
      prim = parseInt(document.getElementById('prim').text);
    }
    if (document.getElementById('menor')!=null){
      menor = parseInt(document.getElementById('menor').text);
    }
    if (document.getElementById('maior')!=null){
      maior = parseInt(document.getElementById('maior').text);
    }
    if (document.getElementById('ult')!=null){
      ult = parseInt(document.getElementById('ult').text);
    }
    if (document.getElementById('meio')!=null){
      meio = parseInt(document.getElementById('meio').text);
    }

    id = obj.id;
    num = parseInt(obj.text);

    if (id!='maisT'&&id!='menosT') {//os botoes de avançar/retroceder 3 páginas não podem receber a classe disabled
      document.querySelectorAll('.page-item').forEach(el => el.classList.remove('hiden'));//seleciona todos is page-item e remove a classe hiden
      document.querySelectorAll('.page-item').forEach(el => el.classList.remove('disabled'));//seleciona todos is page-item e remove a classe disabled
      if (id != 'prox'&&id != 'ant'&&id!='prim'&&id!='ult') {//os botoes de prieira/ultima/proxima/anterior não podem receber a classe disabled
        document.getElementById(id+'Li').classList.add("disabled");//adiciona a classe disabled para o botão clicado
      }
    }

    if (id == 'prim' || id == 'menor' || id == 'meio' || id == 'maior' || id == 'ult') {
      document.querySelectorAll('.active').forEach(el => el.classList.add('hide'));
      document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
      document.getElementById('P'+obj.text).classList.remove('hide'); //para a página que está ativa, a esconde
      document.getElementById('P'+obj.text).classList.add('active');//e mostra a página de acordo com seu id

      //controle dos botões que aparecem na paginação quando essa função é chamada
      if (id=='prim') {
        document.getElementById('menor').text = prim;
        document.getElementById('meio').text = prim+1;
        document.getElementById('maior').text = prim+2;
      }
      if (num == ult || id == ult) {
        document.getElementById('meio').text = ult-1;
        document.getElementById('menor').text = ult-2;
        document.getElementById('maior').text = ult;
        document.getElementById('ultLi').classList.add('hide');
        document.getElementById('proxLi').classList.add('hide');
        document.getElementById('maisTLi').classList.add('hide');
        document.getElementById('primLi').classList.remove('hide');
        document.getElementById('antLi').classList.remove('hide');
        document.getElementById('menosTLi').classList.remove('hide');

      }
      else if (meio == ult-1) {
        document.getElementById('ultLi').classList.add('hide');
        document.getElementById('proxLi').classList.add('hide');
        document.getElementById('maisTLi').classList.add('hide');
        document.getElementById('primLi').classList.remove('hide');
        document.getElementById('antLi').classList.remove('hide');
        document.getElementById('menosTLi').classList.remove('hide');
      }
      else if (num == prim) {
        document.getElementById('primLi').classList.add('hide');
        document.getElementById('antLi').classList.add('hide');
        document.getElementById('menosTLi').classList.add('hide');
        document.getElementById('ultLi').classList.remove('hide');
        document.getElementById('proxLi').classList.remove('hide');
        document.getElementById('maisTLi').classList.remove('hide');
      }else if (num > prim +3)  {
        document.getElementById('primLi').classList.remove('hide');
        document.getElementById('antLi').classList.remove('hide');
        document.getElementById('menosTLi').classList.remove('hide');
      }
      else if (maior == prim+2) {
        document.getElementById('primLi').classList.add('hide');
        document.getElementById('antLi').classList.add('hide');
        document.getElementById('menosTLi').classList.add('hide');
      }else{
        document.getElementById('primLi').classList.remove('hide');
        document.getElementById('antLi').classList.remove('hide');
        document.getElementById('menosTLi').classList.remove('hide');
      }

    }
    else if(id == 'prox'){

      if (maior != ult) {
        document.getElementById('meio').text = meio + 1;
        document.getElementById('menor').text = menor + 1;
        document.getElementById('maior').text = maior + 1;
        maior = maior + 1;
        document.querySelectorAll('.active').forEach(el => el.classList.add('hide'));
        document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
        document.getElementById('P'+maior).classList.remove('hide');
        document.getElementById('P'+maior).classList.add('active');

        if(menor == maior-3){
          document.getElementById('primLi').classList.remove('hide');
          document.getElementById('antLi').classList.remove('hide');
          document.getElementById('menosTLi').classList.remove('hide');
        }
        else if(meio == ult || maior == ult){
          document.getElementById('primLi').classList.remove('hide');
          document.getElementById('antLi').classList.remove('hide');
          document.getElementById('menosTLi').classList.remove('hide');
        }
      }
      if(maior == ult){
        document.getElementById('maisTLi').classList.add('hide');
        document.getElementById('proxLi').classList.add('hide');
        document.getElementById('ultLi').classList.add('hide');
      }else{
        document.getElementById('maisTLi').classList.remove('hide');
        document.getElementById('proxLi').classList.remove('hide');
        document.getElementById('ultLi').classList.remove('hide');
      }
    }
    else if(id == 'ant'){

      if (menor != prim) {
        document.getElementById('meio').text = meio - 1;
        document.getElementById('menor').text = menor - 1;
        document.getElementById('maior').text = maior - 1;
        menor = menor - 1;
        document.querySelectorAll('.active').forEach(el => el.classList.add('hide'));
        document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
        document.getElementById('P'+menor).classList.remove('hide');
        document.getElementById('P'+menor).classList.add('active');
      }
      if(menor == prim){
        document.getElementById('menosTLi').classList.add('hide');
        document.getElementById('antLi').classList.add('hide');
        document.getElementById('primLi').classList.add('hide');
      }else{
        document.getElementById('menosTLi').classList.remove('hide');
        document.getElementById('antLi').classList.remove('hide');
        document.getElementById('primLi').classList.remove('hide');
      }
    }
    else if(id == 'pgEsp'){
      num = obj.value;
      if (num <= ult && num >= 1) {
        document.querySelectorAll('.active').forEach(el => el.classList.add('hide'));
        document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
        document.getElementById('P'+num).classList.remove('hide');
        document.getElementById('P'+num).classList.add('active');
      }else if(num == ''){
        document.querySelectorAll('.active').forEach(el => el.classList.add('hide'));
        document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
        document.getElementById('P1').classList.remove('hide');
        document.getElementById('P1').classList.add('active');
      }
    }
    else if(id == 'maisT'){
      document.getElementById('meio').text = meio + 3;
      document.getElementById('menor').text = menor + 3;
      document.getElementById('maior').text = maior + 3;
      if(meio == ult-3){
        document.getElementById('maiorLi').classList.add('hide');
        document.getElementById('maisTLi').classList.add('hide');
        document.getElementById('proxLi').classList.add('hide');
        document.getElementById('ultLi').classList.add('hide');
        document.getElementById('menosTLi').classList.remove('hide');
        document.getElementById('antLi').classList.remove('hide');
        document.getElementById('primLi').classList.remove('hide');
      }else if(meio != ult){
        document.getElementById('maiorLi').classList.remove('hide');
        document.getElementById('maisTLi').classList.remove('hide');
        document.getElementById('proxLi').classList.remove('hide');
        document.getElementById('ultLi').classList.remove('hide');
      }

    }
    else if(id == 'menosT'){
      document.getElementById('meio').text = meio - 3;
      document.getElementById('menor').text = menor - 3;
      document.getElementById('maior').text = maior - 3;
      if(meio == ult-2){
        document.getElementById('maiorLi').classList.add('hide');
        document.getElementById('maisTLi').classList.add('hide');
        document.getElementById('proxLi').classList.add('hide');
        document.getElementById('ultLi').classList.add('hide');
        
      }else{
        document.getElementById('maiorLi').classList.remove('hide');
        document.getElementById('maisTLi').classList.remove('hide');
        document.getElementById('proxLi').classList.remove('hide');
        document.getElementById('ultLi').classList.remove('hide');
      }

    }
  }

  function filtrar(obj){
    ids='';

    //pega os valores dos campos
    nome = document.getElementById('nome').value.toLowerCase();
    email = document.getElementById('email').value;
    estado = document.getElementById('estados').value.toString();
    cidade = document.getElementById('cidades').value.toString();
    cep = document.getElementById('cep').value;
    rua = document.getElementById('rua').value;
    cel = document.getElementById('cel').value.toString();
    tel = document.getElementById('tel').value.toString();
    
    //cria um array de informações para percorre o array de dados
    filters = [
    o => o.nome.includes(nome),
    o => o.email.includes(email),
    o => o.state.includes(estado),
    o => o.city.includes(cidade),
    o => o.postCode.includes(cep),
    o => o.streetOText.includes(rua),
    o => o.cellONumb.includes(cel),
    o => o.phoneONumb.includes(tel)
    ];

    idsFiltrados = dados.filter(o => filters.every(fn => fn(o))); //filtra o array, percorrendo e comparando os valores aos que foram passados ao array filters
    
    for (var i = 0; i < idsFiltrados.length; i++) {//cria uma string de ids filtrados
      ids += idsFiltrados[i].id+',';
    }

    paginacao(ids);//chama a função paginação
  }

  function filtroFaixaEt(){
    ids = '';
    min = document.getElementById("ageOutputIdMin");
    max = document.getElementById("ageOutputIdMax");

    if (max.value <= min.value) {
      max.classList.add("erro"); //se idadeMaxima for maior que idadeMinima, adiciona classe de erro ao output da idade maxima
    }else{
      max.classList.remove("erro"); //remove classe de erro

      if (idsFiltrados.length < dados.length) {
        for (var i = 0; i < idsFiltrados.length; i++) {
          idade = idsFiltrados[i].idadeNum;
          if (idade >= min.value && idade <= max.value) { // percorre array idsFiltrados em busca de idades entre indices min/max
            ids += idsFiltrados[i].id+',';
          }
        }
      }
      else if(idsFiltrados.length == dados.length){
        for (var i = 0; i < dados.length; i++) {        
          idade = dados[i].idadeNum;
          if (idade >= min.value && idade <= max.value) { // percorre array dados em busca de idades entre indices min/max
            ids += dados[i].id+',';
          }
        }
      }
      paginacao(ids);      
    }
  }

  function filtroIdade(obj){
    ids = '';
    pesquisa = obj.value;


    if (idsFiltrados.length < dados.length) {
      for (var i = 0; i < idsFiltrados.length; i++) {
        idade = idsFiltrados[i].idadeNum;

        if (idade == pesquisa) {
          ids += idsFiltrados[i].id+','; // percorre array idsFiltrados em busca de idades iguais ao indice de pesquisa
        }
      }
    }
    else if(idsFiltrados.length == dados.length){
      for (var i = 0; i < dados.length; i++) {
        idade = dados[i].idadeNum;

        if (idade == pesquisa) {
          ids += dados[i].id+',';
        }   
      }
    }

    paginacao(ids);
  }

  function filtroSexo(obj){
    ids = '';
    pesquisa = '';


    if (idsFiltrados.length < dados.length) {
      for (var i = 0; i < idsFiltrados.length; i++) {
        gender = idsFiltrados[i].gender;

        // percorre array idsFiltrados em busca dos generos checando ids dos botoes

        if (gender == 'male' && obj.id == 'masc') {
          ids += idsFiltrados[i].id+',';
        }
        else if (gender == 'female' && obj.id == 'fem') {
          ids += idsFiltrados[i].id+',';
        }
        else if (obj.id == 'ambos') {
          ids += idsFiltrados[i].id+',';
        }
      }
    }
    else if(idsFiltrados.length == dados.length){
      for (var i = 0; i < dados.length; i++) {
        gender = dados[i].gender;

        // percorre array dados em busca dos generos checando ids dos botoes

        if (gender == 'male' && obj.id == 'masc') {
          ids += dados[i].id+',';
        }
        else if (gender == 'female' && obj.id == 'fem') {
          ids += dados[i].id+',';
        }
        else if (obj.id == 'ambos') {
          ids += dados[i].id+',';
        }
      }
    }

    paginacao(ids);
  }

  function filtroRegiao(regiao){
    ids = '';
    estados = [''];

    //se tem alguma regiao selecionada
    if (regiao != '') {

      //percorre array de regiao e joga em estados
      for (var i = 0; i < regioes[regiao].length; i++) {
        estados[i] = regioes[regiao][i];
      }

      if (idsFiltrados.length < dados.length) {
        for (var i = 0; i < idsFiltrados.length; i++) {
          estado = idsFiltrados[i].state;
          for (var j = 0; j < estados.length; j++) {
            if (estado == estados[j].toLowerCase()) {
              ids += idsFiltrados[i].id+','; //looping dentro de looping para pegar ids que o campo .location.state está contido na regiao pesquisada
            } 
          }
        }
      }
      else if(idsFiltrados.length == dados.length){
        for (var i = 0; i < dados.length; i++) {
          estado = dados[i].state;
          for (var j = 0; j < estados.length; j++) {
            if (estado == estados[j].toLowerCase()) {
              ids += dados[i].id+',';
            } 
          }
        }   
      }

      for (var i = 0; i < 1; i++) {
        select['estados'] = [''];
        for (var j = 0; j < regioes[regiao].length; j++) {
          select['estados'][j] = regioes[regiao][j];
        }
      }
      constroiEstados(select); //constrói lista de estados de acordo com regiao
    }
    else if (regiao == '' ){//se região = Todas, lista tudo

      if (idsFiltrados.length < dados.length) {
        for (var i = 0; i < idsFiltrados.length; i++) {
          ids += idsFiltrados[i].id+',';
        }
      }
      else if(idsFiltrados.length == dados.length){
        for (var i = 0; i < dados.length; i++) {
          ids += dados[i].id+',';      
        }
      }      

      select['estados'] = estadosRegioes.sort();
      constroiEstados(select);
    }
    paginacao(ids);
  }

  function filtroAlfabetica(obj){
    ids = '';
    temp = [''];
    nomesAZ = [''];
    nomesAZFiltrados = [''];


    for (var i = 0; i < idsFiltrados.length; i++) {
      nome = idsFiltrados[i].nome;
      nomeSemAcentos = nome.replace(/[\W\[\] ]/g,function(a){return map[a]||a});

      listaFiltrados[i] = nomeSemAcentos+'-'+idsFiltrados[i].id;//percorre array idsFiltrados e concatena os nomes sem acento com respectivos ids
    }


    if (obj.id == 'cresc') {
      nomesAZ = lista.sort();
      nomesAZFiltrados = listaFiltrados.sort(); //ordem alfabética A_Z
    }
    else if (obj.id == 'decresc'){
      nomesAZ = lista.sort().reverse();
      nomesAZFiltrados = listaFiltrados.sort().reverse(); //ordem alfabética Z_A
    }


    if (idsFiltrados.length < dados.length) {
      for (var i = 0; i < idsFiltrados.length; i++) {
        if (obj.id == 'nenhum'){
          ids += idsFiltrados[i].id+',';
        }

        if(obj.id == 'decresc' || obj.id == 'cresc'){
          temp[i] = nomesAZFiltrados[i].replace(/[^0-9]/g,''); //remove letras e caracteres não numéricos dos nomes filtrados
          ids += temp[i]+',';
        }
      }
    }
    else if(idsFiltrados.length == dados.length){
      for (var i = 0; i < dados.length; i++) {
        if (obj.id == 'nenhum'){
          ids += dados[i].id+',';
        }

        if(obj.id == 'decresc' || obj.id == 'cresc'){
          temp[i] = nomesAZ[i].replace(/[^0-9]/g,''); //remove letras e caracteres não numéricos dos nomes filtrados
          ids += temp[i]+',';
        }

      }
    }
    paginacao(ids);
  }

  function perfil(obj){ //constrói perfil
    id = obj.id.substring(1);

    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < regioes[i].length; j++) {
        if(dados[id].location.state == regioes[i][j].toLowerCase()){
          var uf = regioes[i+5][j] //percorre arary regioes e array estados para determinar UF do estado
        }
      }
    }

    dados = '<div class="row">';
    dados += '<div class="col-md-12 lista">';
    dados += '<div class="d-flex row">';
    dados += '<div class="col-12 d-flex justify-content-end" onclick="perfilHide()" style="cursor:pointer;color:rgb(202,23,69);z-index:9999"><i class="fas fa-times-circle fa-2x"></i></div>';
    dados += '<div class="col-md-4 col-12 d-flex justify-content-center" style="margin-top:-20px;margin-bottom:20px">';
    dados += '<img src="' + dados[id].picture.large +'">';
    dados += '</div>';
    dados += '<div class="col-md-8" style="margin-top:-20px;margin-bottom:20px">';
    dados += '<div class="row d-flex">';
    dados += '<div class="col-md-10 cap"><b>'+ dados[id].nome +'</b> • '+ dados[id].idade +'</div>';
    dados += '</div>';
    dados += '<div class="row">';
    dados += '<div class="col-md-12">'+ dados[id].email +'</div>';
    dados += '</div>';
    dados += '<div class="row">';
    dados += '<div class="col-md-12 col-12">Cel: '+dados[id].cell+'</div>';
    dados += '<div class="col-md-12 col-12">Tel: '+ dados[id].phone +'</div>';
    dados += '</div>';
    dados += '<div class="row">';
    dados += '<div class="col-md-12 cap">'+ dados[id].location.street +'</div>';
    dados += '</div>';
    dados += '<div class="row">';
    dados += '<div class="col-md-12 cap">'+ dados[id].location.city +' - '+ uf +', '+ dados[id].location.postcode +'</div>';
    dados += '</div>';
    dados += '</div>';
    dados += '</div>';
    dados += '</div>';
    dados += '</div>';


    document.getElementById('fundoPreto').innerHTML = dados;

    //faz a transição para aparecer o perfil
    document.getElementById('fundoPreto').style.transitionProperty = "height";
    document.getElementById('fundoPreto').style.height = "100%";
  }

  function perfilHide(){
    //faz a transição para recolher o perfil
    document.getElementById('fundoPreto').style.transitionProperty = "height";
    document.getElementById('fundoPreto').style.height = "0%";
  }

  function showFiltros(){
    //faz a transição para aparecer os filtros na versão mobile
    window.scrollTo(0, 0);
    document.getElementById('flutuante').style.display = 'none';
    document.getElementById('filtros').style.display = 'block';
  }
  function hideFiltros(){
    //faz a transição para recolher os filtros na versão mobile
    document.getElementById('flutuante').style.display = 'block';
    document.getElementById('filtros').style.display = 'none';
  }

  function width(){
    //controla o display de filtros no desktop
    if(screen.width > 767){
      document.getElementById('filtros').style.display = 'block';
    }
  }

  var s = 0;
  function showPaginacao(obj){
    //controla a pagina;'ao para aparecer sempre no desktop, e aparecer no m0obile somente se chamada a função
    if(screen.width > 767){
      document.getElementById('paginacaoEnd').style.transitionProperty = "height";
      document.getElementById('paginacaoEnd').style.height = "50px";
    }else{
      if(s == 0){
        document.getElementById('paginacaoEnd').style.transitionProperty = "height";
        document.getElementById('paginacaoEnd').style.height = "150px";
        document.getElementById('flutuante').style.transitionProperty = "bottom";
        document.getElementById('flutuante').style.bottom = "160px";
        s++
      }
      else if (s == 1) {
        document.getElementById('paginacaoEnd').style.transitionProperty = "height";
        document.getElementById('paginacaoEnd').style.height = "0px";
        document.getElementById('flutuante').style.transitionProperty = "bottom";
        document.getElementById('flutuante').style.bottom = "10px";
        s--;
      }
    }
  }