
function limpaClasse(){
    var erro = document.getElementById("erro").classList;
    var sucesso = document.getElementById("sucesso").classList;

   //limpa todas as classes de erro para nao precisar atualizar a pagina para realizar um novo teste
        erro.remove('alert-danger');
        erro.remove('alert');
        document.getElementById("erroEmail").innerHTML = "";
        document.getElementById("erroData").innerHTML = "";
        document.getElementById("erroNumero").innerHTML = "";
    
    
        sucesso.remove('alert-success');
        sucesso.remove('alert');
        document.getElementById("sucessoTexto").innerHTML = "";
      
    
    // chama a função que verifica os dados
    return verifica ();
}


function verifica (){

    //capturando os dados inseridos no formulario e inserindo-as em variaveis para serem utilizadas na função
    var email = document.getElementById("email").value;
    var numero = document.getElementById("numero").value;
    var data = document.getElementById("data").value;
    var nome = document.getElementById("nome").value;
    var sobrenome = document.getElementById("sobrenome").value;
    var senha = document.getElementById("senha").value;

    // contator de erro
    // o erro é incrementado a cada erro para no final verificar
    var contadorErro = 0;

    // Variaveis que são inseridas as mensagens de erro ou sucesso
    var erro = document.getElementById("erro").classList;
    var sucesso = document.getElementById("sucesso").classList;

    // faz uma verificação em todos os campos, se pelo menos um estiver vazio, aparece o alerta de que todos os campos devem ser preenchidos
    // utilizado o operador OR ( || ) para conseguir essa validação de todos os campos e saber se pelo menos um está vazio
    if ((!email) || (!numero) || (!data) || (!nome) || (!sobrenome) || (!senha)){
        alert("Preencha todos os campos obrigatórios!");
        contadorErro++;
    }

    // Regex para validação do email
    // [^\s@] ---> verifica se uma string começa com um ou mais caracteres que não são espaços em branco e não são "@" (o nome de usuário do email),  
    // +@     ---> seguido pelo símbolo "@" 
    // [^\s@] ---> e depois por um ou mais caracteres que não são espaços em branco e não são "@" (o domínio do email), 
    // \.     ---> e termina com um ponto 
    // [^\s@] --->  seguido por um ou mais caracteres que não são espaços em branco e não são "@" (a extensão do domínio do email).
    var verificaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //se não validar ou se o campo estiver vazio entra no if
    if (!verificaEmail.test(email) && email!='') {
        // insere no campo erroEmail do HTMl o texto abaixo
        document.getElementById("erroEmail").innerHTML = "Email inválido. Por favor, insira um email válido.";
        // adiciona uma classe alert ao campo "erro" que é o ID de uma tag <p> do HTML
        erro.add('alert');
        // adiciona a class alert-danger ao mesmo campo "erro", essas classes foram utilizadas para deixar o campo vermelho, 
        // indicando o erro, são classes do bootstrap
        erro.add('alert-danger');
        contadorErro++;
    }

    // esse padrão de código dos erros e sucesso, segue nos próximos códigos e a explicação para todos é a mesma citada acima.


    // regex para validação do número de telefone 
    // (?:\+|00)?    ---> Corresponde a zero ou uma ocorrência do caractere "+" ou "00" (indicando que o número pode começar com o prefixo internacional).
    // (55)          ---> Corresponde ao código de país brasileiro "55".
    // \s?           ---> Corresponde a zero ou um espaço em branco após o código de país.
    // \(?           ---> Corresponde a zero ou um parêntese de abertura "(" (permitindo que o DDD seja colocado entre parênteses).
    // ([1-9][0-9])  ---> Corresponde a um código de área válido no Brasil, que consiste em dois dígitos, sendo o primeiro um dígito de 1 a 9 e o segundo um dígito de 0 a 9
    // \)?           --->  Corresponde a zero ou um parêntese de fechamento ")" (para permitir que o DDD seja colocado entre parênteses).
    // \s?           ---> Corresponde a zero ou um espaço em branco após o DDD.
    // (?:9\d|[2-9]) ---> Corresponde a um dígito 9 seguido por qualquer dígito (para números de celular) ou a um dígito de 2 a 9 (para números fixos).
    // \d{3}         --->  Corresponde a exatamente três dígitos após o prefixo
    // (\d{4})       ---> Esta parte corresponde aos quatro últimos dígitos do número de telefone.

    var verificaNumero = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
    if(!verificaNumero.test(numero) && numero>1){
        document.getElementById("erroNumero").innerHTML = "Número de celular inválido. Por favor, insira um número válido.";
        erro.add('alert');
        erro.add('alert-danger');
        contadorErro++;
    }


    // Regex para validação de data
    // 0[1-9]     ---> Corresponde a dias de 01 a 09, onde o primeiro dígito é 0 e o segundo dígito varia de 1 a 9.
    // [12][0-9]  ---> Corresponde a dias de 10 a 29, onde o primeiro dígito é 1 ou 2, e o segundo dígito varia de 0 a 9.
    // 3[01]      ---> Corresponde a dias de 30 a 31, onde o primeiro dígito é 3 e o segundo dígito é 0 ou 1.
    // [- /.]     ---> Isso corresponde a um dos caracteres separadores possíveis, ou seja, um hífen, espaço, ponto ou barra.
    // 0[1-9]     ---> Corresponde a meses de 01 a 09, onde o primeiro dígito é 0 e o segundo dígito varia de 1 a 9.
    // 1[012]     ---> Corresponde a meses de 10 a 12, onde o primeiro dígito é 1 e o segundo dígito é 0, 1 ou 2.
    // [- /.]     ---> Mais uma vez, isso corresponde a um dos caracteres separadores possíveis.
    // (19|20)    ---> Corresponde a "19" ou "20" como os dois primeiros dígitos do ano.
    // \d\d       ---> Corresponde aos dois últimos dígitos do ano, ou seja, qualquer combinação de dois dígitos.

    var verificaData = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/    ;
    if(!verificaData.test(data) && data!=''){
        document.getElementById("erroData").innerHTML = "Data inválida. Por favor, insira uma data válida.";
        erro.add('alert');
        erro.add('alert-danger');
        contadorErro++;
    }

// verifica se houve algum campo com erro
// se nao houve, traz a mensagem de sucesso
    if (contadorErro == 0){            
            document.getElementById("sucessoTexto").innerHTML = "Dados enviados com sucesso!";
            sucesso.add('alert')
            sucesso.add('alert-success')
    }
}


