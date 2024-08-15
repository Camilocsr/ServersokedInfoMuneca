<div align="center">

## Camilo Solano Rodriguez

![Camilo Solano Rodriguez](https://raw.githubusercontent.com/Camilocsr/reactportafoli/main/src/images/csr.png?token=GHSAT0AAAAAACVYZ7VTXPDKUO6GYI6GXXIWZV3RAUA)

### Redes Sociales

[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/camilosolanorodriguez/)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/camilosolanoro/)
[![Sitio Web](https://img.shields.io/badge/Camilo-000000?style=for-the-badge&logo=google-chrome&logoColor=white)](http://camilosolanorodriguez.com)

---

### Contacto

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:camilosolanorodiguez@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/+573136368783)

---

# Proyecto Server para Dar informacion.

Este proyecto es un servidor que se encarga de dar informacion sobre lo que tu decees con el entrenamiento de IA.

## Características

- **Peticiones WebSocked**: El servidor responde a un envio de audio en base 64
- **Integraciones para sintesys de voz**: Este servidor cuenta con integraciones para la sintesys de voz.
- - **Integraciones para reconocimiento de voz**: Este servidor cuenta con integraciones para el reconocimiento de voz.
- **Audio en tiempo real**: este servidor puede dar respuestas rapidas y multiples procesos para lograr la comunicacion con el cliente.

## Tecnologías Utilizadas

- **node.js**: Motor de desarrollo para crear todo el server.
- **WebSocket**: Para la comunicación en tiempo real entre el cliente (Unity) y el servidor.
- **Elevenlabs**: Esto sirve para sistetisar voces.
- **AsembblyAI**: Esto sirve para el reconocimiento de voz. en este momento no se usa pero el codigo de su integracion esta en el proyecto.
- **OpenIA**: OpenIA se usa para dar informacion sobre lo que se solicite.
- **Wisper**: Wisper se usa para SpeechToText.
- **Elevenlabs**: Elevenlabs se usa para clonar voces y para sistetisar el texto.
- **JavaScript**: Lenguaje de programacion utilizado en el proceso.

## Instalación

1. **Clonar el repositorio**:
   ```sh
   git clone https://github.com/Camilocsr/ServersokedInfoMuneca.git
   ```
2. **Entra a la carpeta**:
   ```sh
   cd ServersokedInfoMuneca
   ```

3. **Instalacion del server**:
   - Instala todo el peyecto con el siguiente commando.
      ```bash
      npm install
      ```
   > [!Note]
   > En dado caso de que se genere un error revisa la consola o instala las dependencias manualmente.

4. **Revisa la documentacion del servidor**:
   - Este servidor fue creado en conjunto con un proyecto en unity el cual resive la info de este server pero eso no significa que no pueda ser usado en otros proyectos: [Proyecto de unity](https://github.com/Camilocsr/UnityIsaccMuneca.git)