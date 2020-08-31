const af = require('./exemplo.json')
var LinkedList = require('LinkedList')

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


function aloca_matriz(tam_matriz){
    // Cria uma matriz vazia.
    let matriz = []
    for(i = 0; i < tam_matriz; i++){
        for(j = 0; j < tam_matriz; j++){
            matriz[i] = []
        }
    }
    return matriz
}

/*
    Recebe a matriz, o seu tamanho e um vetor estado que contem [q1,q2] por exemplo
    retorna TRUE se os estados forem marcados.
*/

function verificaEstadoMarcado(matriz, tam_matriz, estado){

    /*
        Gambiarra pra transformar ["q1", "q2", "q3"] de estados
        apenas em numeros ficando [1 ,2 ,3]
    */
    for(i = 0; i < estado.length; i++){
        estado[i] = parseInt(estado[i].substring(1))
    }

    /*
        Percorre a matriz em busca de marcaçoes e verifica se o estado dado está contido la.
    */

    for(i = 0; i < tam_matriz; i++){
        for(j = 0; j < tam_matriz; j++){
            if(matriz[i][j] !== undefined && matriz[i][j] == 'x'){
                if(matriz[estado[0]][estado[1]] == 'x' || matriz[estado[1]][estado[0]] == 'x'){
                    return true
                }
            }
        }
    }
    return false;
}

function minimiza(transicoes, estados, estado_final){
    let tam_matriz = estados.length
    let matriz_min = aloca_matriz(tam_matriz)

    // Atribui undefined para os estados repetidos
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
        Gambiarra pra transformar ["q1", "q2", "q3"] de estados_finais
        apenas em numeros ficando [1 ,2 ,3]
    */
    for(i = 0; i < estado_final.length; i++){
        estado_final[i] = parseInt(estado_final[i].substring(1))
    }

    /*

        Percorre a matriz e verifica
        os estados finais para serem marcados.
        'x' [marcados] são os estados nao equivalentes. final e não final
        'xx' são os estados restantes para analise

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
                        matriz_min[i][j] = "" 
                    }                   
                })
            }
        }
    }

    /*
        Imprime o conjunto de estados possiveis para analise
        e estados ja marcados
    */
    for(i = 0; i < tam_matriz; i++){
        for(j = 0; j < tam_matriz; j++){
            if(matriz_min[i][j] !== undefined && matriz_min[i][j] != 'x'){
                console.log(`Analisando <q${i}, q${j}> :`)
                /* 

                    Salva os pares de estados em um mapa para analise posterior

                */
                let vec_aux = new Map()
                af.alfabeto.map(letra => {
                    let aux = []
                    af.transicoes[letra].map(transicao => {
                        if(transicao[`q${i}`] || transicao[`q${j}`]){
                            aux.push(transicao)
                        }
                    })
                    vec_aux.set(letra, aux)
                })

                /*
                    Varre o vetor auxiliar e identifica as transicoes
                    colocando em um unico vetor
                */

            
                console.log(vec_aux)
                console.log("\n")
            }
        }
    }

    console.table(matriz_min)

    return matriz_min
}

// chamando a funcao para teste
minimiza(af.transicoes, af.estados, af.estado_final)
