const fs = require('fs/promises');
const path = require('path');

async function moveFile() {
  const meusArgumentos = process.argv.slice(2); // [arq.txt, ./someDir/]
  const [origem, destino] = meusArgumentos;
  let eDiretory = false;

  if (meusArgumentos.length !== 2) {
    // eslint-disable-next-line no-console
    console.error('The number of arguments is different from two.');

    return;
  }

  const caminhoOrigemAbs = path.resolve(origem);
  const caminhoDestinoAbs = path.resolve(destino);
  const nomeDoArquivo = path.basename(origem); // arq.txt

  if (caminhoOrigemAbs === caminhoDestinoAbs) {
    return;
  }

  try {
    const statsDest = await fs.stat(caminhoDestinoAbs);

    if (statsDest.isDirectory() === true) {
      eDiretory = true;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
  }

  try {
    const stats = await fs.stat(caminhoOrigemAbs);

    if (stats.isFile() === true) {
      if (eDiretory) {
        const destMove = path.join(caminhoDestinoAbs, nomeDoArquivo);

        await fs.rename(caminhoOrigemAbs, destMove);
      } else {
        // se nao for um diretorio, renomeia
        await fs.rename(caminhoOrigemAbs, caminhoDestinoAbs);
      }
    } else {
      // eslint-disable-next-line no-console
      console.error('A origem não é um arquivo');

      return '';
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

moveFile();

module.exports = { moveFile };
