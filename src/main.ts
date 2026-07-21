import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Pokemon Teams API')
    .setDescription(
      'API para gerenciamento de treinadores, times e Pokémon, com integração à PokéAPI.',
    )
    .setVersion('1.0')
    .addTag('Pokemon', 'Consultas de Pokémon realizadas na PokéAPI')
    .addTag('Trainers', 'Gerenciamento de treinadores')
    .addTag('Teams', 'Gerenciamento dos times dos treinadores')
    .addTag('Team Pokémon', 'Gerenciamento dos Pokémon associados a cada time')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Pokemon Teams API',
  });

  await app.listen(3000);
}

bootstrap();
