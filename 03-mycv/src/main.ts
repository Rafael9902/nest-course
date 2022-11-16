import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const cookieSession = require('cookie-session');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

	app.use(cookieSession({
		keys: ['asdfghj']
	}));

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true })
  );

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
