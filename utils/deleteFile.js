import { unlinkSync, existsSync } from 'fs';
/**
 * Función para borrar un archivo en una ruta específica.
 * @param {string} filePath Ruta completa del archivo que se desea borrar.
 * @returns {boolean} `true` si el archivo se borró correctamente, `false` si no.
 */
export const deleteFile = (filePath) => {
    try {
        if (existsSync(filePath)) {
            unlinkSync(filePath);
            //console.log(`Archivo ${filePath} borrado exitosamente.`);
            return true;
        } else {
            //console.log(`El archivo ${filePath} no existe.`);
            return false;
        }
    } catch (error) {
        console.error(`Error al intentar borrar el archivo ${filePath}:`, error);
        return false;
    }
};