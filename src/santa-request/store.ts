import { Global, Injectable } from '@nestjs/common';
import { InMemoryStore } from '../library/store/in-memory';
import { SantaRequest } from './class/SantaRequest';

@Global()
@Injectable()
export class SantaRequestStore extends InMemoryStore<SantaRequest> {}
