import 'dotenv/config';
import { send } from './services/emailService.js';

send({
  email: 'rireke6876@chotunai.com',
  subject: 'Test',
  html: '123'
})