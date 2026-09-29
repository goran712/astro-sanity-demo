// Types for the env vars read from studio/.env (avoids needing @types/node).
declare const process: {
  env: {
    SANITY_STUDIO_PROJECT_ID?: string
    SANITY_STUDIO_DATASET?: string
  }
}
