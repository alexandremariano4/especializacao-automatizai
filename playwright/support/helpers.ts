export function gerarOrderId() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';

    const gerarLetras = (tamanho:any) =>
        Array.from({ length: tamanho }, () =>
            letras.charAt(Math.floor(Math.random() * letras.length))
        ).join('');

    const gerarNumeros = (tamanho:any) =>
        Array.from({ length: tamanho }, () =>
            numeros.charAt(Math.floor(Math.random() * numeros.length))
        ).join('');

    const prefixo = gerarLetras(3);
    const sufixo = gerarLetras(3) + gerarNumeros(3);

    return `${prefixo}-${sufixo}`;
}