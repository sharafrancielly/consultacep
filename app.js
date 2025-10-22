function limparCampos(dados) {
    document.getElementById("cep").value = '';
    document.getElementById("estado").value = '';
    document.getElementById("cidade").value = '';
    document.getElementById("bairro").value = '';
    document.getElementById("endereco").value = '';
}

function dadosTela(dados) {
    document.getElementById("estado").value = dados.uf || '';
    document.getElementById("cidade").value = dados.localidade || '';
    document.getElementById("bairro").value = dados.bairro || '';
    document.getElementById("endereco").value = dados.logradouro || '';
}

function capturarDado() {
    let inputCep = document.getElementById("cep").value;
    const cepLimpo = inputCep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
        alert("Por favor, digite um CEP válido com 8 dígitos.");
        limparCampos();
        return;
    }

    buscarAPI(cepLimpo);
    console.log(`Buscando CEP: ${cepLimpo}`);
    
}

async function buscarAPI(inputCep) {
    const url = `https://viacep.com.br/ws/${inputCep}/json/`;

    try {
        const response = await fetch(url);
    
        if (!response.ok) {
            throw new Error(`Erro de rede ou CEP não encontrado (Status: ${response.status})`);
        }

        const dados = await response.json();
        
        if (dados.erro) {
            throw new Error('CEP não encontrado ou inválido.');
        }

        dadosTela(dados);
        
    } catch (error) {
        console.error("Erro ao buscar o CEP:", error.message);
        alert(`Erro na busca: ${error.message}`);
        limparCampos(); 
    }
}