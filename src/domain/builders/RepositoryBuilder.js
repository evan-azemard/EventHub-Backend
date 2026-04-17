export class RepositoryBuilder {
    repository;
    setRepository(repository) {
        this.repository = repository;
        return this;
    }
    build() {
        if (!this.repository) {
            throw new Error('Repository must be set');
        }
        return this.repository;
    }
}
//# sourceMappingURL=RepositoryBuilder.js.map