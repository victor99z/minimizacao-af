const af = require('./exemplo.json')
// Json nao usado por enquanto ver mais tarde...


estados = ["q0", "q1", "q2", "q3"]
alfabeto = ["a", "b"]
transicoes = [
    ["q1", "q2"],
    ["q3", "q2"],
    ["q1", "q2"],
    ["q3", "q2"]
]
estado_inicial = ["q0"]
estado_final = ["q1", "q2", "q3"]

/*

    As transicoes do af foram armazenadas em uma matriz da seguinte 
    forma:

    i   	a	 b
    q0	    q1	q2	
    q1	    q3	q2
    q2	    q1	q2
    q3	    q3	q2
    :       :   :
    qn      q   q

*/

function minimiza(transicoes, estados, estado_final){
    let tam_matriz = estados.length
    let matriz_min = []

    // Cria uma matriz vazia.
    for(i = 0; i < tam_matriz; i++){
        for(j = 0; j < tam_matriz; j++){
            matriz_min[i] = []
        }
    }

    // Removendo casos da matriz repetidos.
    for(i = 0; i < tam_matriz; i++){
        for(j = 0; j < tam_matriz; j++){
            if(i > j){
                matriz_min[i][j] = ""
            }else{
                matriz_min[i][j] = undefined
            }
        }
    }

    /*
        Gambiarra pra transformar ["q1", "q2", "q3"]
        apenas em numeros ficando [1 ,2 ,3]
    */
    for(i = 0; i < estado_final.length; i++){
        estado_final[i] = parseInt(estado_final[i].substring(1))
    }

    /*

        Percorre a matriz, atribui undefined para os estados repetidos e verifica
        os estados finais para serem marcados.
        'xx' são os estados marcados.

    */
    for(i = 0; i < tam_matriz; i++){
        for(j = 0; j < tam_matriz; j++){
            if(matriz_min[i][j] !== undefined){
                estado_final.map( e => {
                    if(e == i){
                            matriz_min[i][j] = "x"
                    }                   
                })
                estado_final.map( e => {
                    if(e == j){
                            console.log(`Par: <${i},${j}> marcado`)
                            matriz_min[i][j] = "x" + matriz_min[i][j]
                    }                   
                })
            }
        }
    }



    console.table(matriz_min)

    return matriz_min
}

// chamando a funcao para teste
minimiza(transicoes, estados, estado_final)

/*
    Mapeia as transicoes, e verifica se tem algum estado sem
    transicoes de a,b.

*/
function verificaTotal(transicoes){
    transicoes.map(obj => {
        for(i = 0; i < obj.length; i++){
            if(obj[i].length == 0){
                console.log("Não total")
                return false
            }
        }
    })
    return true
}
