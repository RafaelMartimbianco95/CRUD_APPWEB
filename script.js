
  //Seta o banco de dados
    var db = [{"id": "0", "descricao": "Teste", "quantidade": 0 }];

  //seta a variavel idAtualiza
    var idAtualiza = null;


  //Quando abrir, monta a tabela
    document.addEventListener("DOMContentLoaded", function() {
      Monta();
    });


  //insere um novo dado no banco
    function New(){
      let id = document.getElementById("newId");
      let descr = document.getElementById("newDes");
      let qt = document.getElementById("newQt");

      if(id.value == "" || descr.value == "" || qt.value == ""){
        swal("Preencha todos os campos do INSERT!");
      }else{
        if(requestId(id.value) != false){
          swal("Esse ID já está cadastrado!");
        }else{
          db.push({
            "id":id.value,
            "descricao": descr.value,
            "quantidade":qt.value
          });
          id.value = "";
          descr.value = "";
          qt.value = "";
          swal("Item cadastrado com sucesso!");
          Monta();
        }
      }
    }

//funcao buscaUp
  function buscaUp(idBusca){
    if(requestId(idBusca) == false){
      swal("ID não encontrado!");
      document.getElementById("upDes").disabled = true;
      document.getElementById("upQt").disabled = true;
      document.getElementById("upDes").value = "";
      document.getElementById("upQt").value = "";
    }else{
      let requisicao = requestId(idBusca);
      idAtualiza = idBusca;
      document.getElementById("upDes").value = requisicao.descricao;
      document.getElementById("upQt").value = requisicao.quantidade;
      document.getElementById("upDes").disabled = false;
      document.getElementById("upQt").disabled = false;
    }
  }

  //atualiza um dado
  function upDate(){
    const inputId = document.getElementById("upId");
    const inputDes = document.getElementById("upDes");
    const inputQt = document.getElementById("upQt");

    if(inputId.value == "" || inputDes.value == "" || inputQt.value == ""){
      swal("Preencha todos os campos!");
    }else{
        const req = requestId(idAtualiza);
        req.id = inputId.value;
        req.descricao = inputDes.value;
        req.quantidade = inputQt.value;

        Monta();

        inputId.value = "";
        inputDes.value = "";
        inputQt.value = "";
        inputDes.disabled = true;
        inputQt.disabled = true;
        swal('Item atualizado com sucesso!')
    }
  }

  //funcao buscaDel
  function buscaDel(idBusca){
    if(requestId(idBusca) == false){
      swal("ID não encontrado!");
      document.getElementById("delDes").value = "";
      document.getElementById("delQt").value = "";
    }else{
      let requisicao = requestId(idBusca);
      document.getElementById("delDes").value = requisicao.descricao;
      document.getElementById("delQt").value = requisicao.quantidade;

    }
  }


  //deleta o item
  function deleteItem(){
    const inputId = document.getElementById("delId");
    const inputDes = document.getElementById("delDes");
    const inputQt = document.getElementById("delQt");

    if(inputId.value == ""){
      swal("Informe o ID!");
    }else{
      for(i=0; i<db.length; i++){
        if(db[i].id == inputId.value){
          swal("[" + db[i].id + "]" + db[i].descricao + " - deletado com sucesso!");
          db.splice(i, 1);
          inputId.value = "";
          inputDes.value = "";
          inputQt.value = "";
          var encontrado = true;
          Monta();
          break;
        }
      }
      if(encontrado == false){
        swal("Ocorreu um erro ao tentar encontrar o ID informado! Nenhum dado foi excluido.");
        Monta();
      }
    }
  }


  //verifica se o Id existe
  function requestId(idItem){
    for(i=0; i<db.length; i++){
      if(db[i].id == idItem){
        return db[i];
      }
    }
    return false;
  }

  //Função para montar a tabela
    function Monta(){
      let montador = "";
      for(i = 0; i<db.length; i++){
        let iId = db[i].id;
        let iDesc = db[i].descricao;
        let iQt = db[i].quantidade;

        montador += "<tr><td>"+iId+"</td><td>"+iDesc+"</td><td>"+iQt+"</td></tr>";
      }

      document.getElementById("tabela").innerHTML = "<th>ID</th><th>DESCRIÇÃO</th><th>QUANTIDADE</th>"+ montador;
    }
