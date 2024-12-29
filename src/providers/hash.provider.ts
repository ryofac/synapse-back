export interface HashProvider {
  hash(input: string): Promise<string>;
  verify(hash: string, payload: string): Promise<boolean>;
}
