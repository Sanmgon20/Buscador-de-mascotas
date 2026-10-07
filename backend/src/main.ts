import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir peticiones desde el frontend (React / Vite)
  app.enableCors({
    origin: '*', // O podés poner tu URL de Vercel: 'https://tu-app.vercel.app'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🐾 Backend corriendo en http://localhost:${port}`);
}
bootstrap();
