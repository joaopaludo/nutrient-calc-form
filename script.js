
// * Exibe ou oculta o campo de atividade física conforme o usuário seleciona no radio

const atividadeForm = document.querySelector('#atividade-form');
const radioPraticaAtividade = document.querySelector('input[name="pratica_atividade"][value="sim"]');
const radioNaoPraticaAtividade = document.querySelector('input[name="pratica_atividade"][value="nao"]');

document.querySelectorAll('input[name="pratica_atividade"]').forEach(radio => {
    radio.addEventListener('change', function () {
        if (radioPraticaAtividade.checked) {
            atividadeForm.style.display = 'block';
        } else if (radioNaoPraticaAtividade.checked) {
            atividadeForm.style.display = 'none';
        }
    });
});

atividadeForm.style.display = 'none';


// * Realiza o cálculo de macros

document.querySelector('#form-macros').addEventListener('submit', function (e) {
    e.preventDefault();
    const idade = Number(document.querySelector('#idade').value);
    const sexo = document.querySelector('input[name="sexo"]:checked').id;
    const peso = Number(document.querySelector('#peso').value);
    const altura = Number(document.querySelector('#altura').value) / 100;
    const praticaAtividade = document.querySelector('input[name="pratica_atividade"]:checked').value;
    const nivelAtividade = document.querySelector('#nivel-atividade').value;
    const divAviso = document.querySelector('#aviso-atividade-fisica');
    const responseDiv = document.querySelector('#form-response');

    responseDiv.style.display = 'block';
    responseDiv.innerHTML = '';

    let tmb;
    if (sexo === 'sexo_masc') {
        tmb = 88.36 + (13.4 * peso) + (4.8 * (altura * 100)) - (5.7 * idade);
    } else {
        tmb = 447.6 + (9.2 * peso) + (3.1 * (altura * 100)) - (4.3 * idade);
    }

    let fatorAtividade;
    if (praticaAtividade === 'nao') {
        fatorAtividade = 1.2;
        divAviso.style.display = 'block';
    } else {
        divAviso.style.display = 'none';

        switch (nivelAtividade) {
            case 'pouco_ativo':
                fatorAtividade = 1.375;
                break;
            case 'moderado':
                fatorAtividade = 1.55;
                break;
            case 'ativo':
                fatorAtividade = 1.725;
                break;
            case 'atleta':
                fatorAtividade = 1.9;
                break;
            default:
                fatorAtividade = 1.2;
        }
    }

    const caloriasManutencao = tmb * fatorAtividade;
    const caloriasDeficit = caloriasManutencao - 500;
    const caloriasExcesso = caloriasManutencao + 500;

    function calcularMacros(calorias) {
        const proteinas = (calorias * 0.3) / 4;
        const carboidratos = (calorias * 0.5) / 4;
        const gorduras = (calorias * 0.2) / 9;
        return {
            proteinas: Math.round(proteinas),
            carboidratos: Math.round(carboidratos),
            gorduras: Math.round(gorduras)
        };
    }

    const macrosManutencao = calcularMacros(caloriasManutencao);
    const macrosDeficit = calcularMacros(caloriasDeficit);
    const macrosExcesso = calcularMacros(caloriasExcesso);

    responseDiv.innerHTML += `
        <div class="results-container">
            <h3 class="results-title">Resultados de Macronutrientes</h3>
            <div class="results-section">
                <h4 class="results-subtitle">Manutenção:</h4>
                <p><strong>Calorias:</strong> ${Math.round(caloriasManutencao)} kcal/dia</p>
                <p>Proteínas: ${macrosManutencao.proteinas}g</p>
                <p>Carboidratos: ${macrosManutencao.carboidratos}g</p>
                <p>Gorduras: ${macrosManutencao.gorduras}g</p>
            </div>
            <div class="results-section">
                <h4 class="results-subtitle">Perda de peso:</h4>
                <p><strong>Calorias:</strong> ${Math.round(caloriasDeficit)} kcal/dia</p>
                <p>Proteínas: ${macrosDeficit.proteinas}g</p>
                <p>Carboidratos: ${macrosDeficit.carboidratos}g</p>
                <p>Gorduras: ${macrosDeficit.gorduras}g</p>
            </div>
            <div class="results-section">
                <h4 class="results-subtitle">Ganho de peso:</h4>
                <p><strong>Calorias:</strong> ${Math.round(caloriasExcesso)} kcal/dia</p>
                <p>Proteínas: ${macrosExcesso.proteinas}g</p>
                <p>Carboidratos: ${macrosExcesso.carboidratos}g</p>
                <p>Gorduras: ${macrosExcesso.gorduras}g</p>
            </div>
        </div>
    `;
});
