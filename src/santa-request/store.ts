import { Global, Injectable } from '@nestjs/common';
import { InMemoryStore } from '../library/store/in-memory';
import { SantaRequest } from './class';

@Global()
@Injectable()
export class SantaRequestStore extends InMemoryStore<SantaRequest> {}
